import React, { Component } from 'react';
import { Container, Card, CardTitle, CardText, Row, Col, Button } from 'reactstrap';
import Header from '../components/Header'
import Footer from '../components/Footer'
import moment from 'moment';


 var now = moment()

export default class OrganiserInterface extends Component {
    state = {
        students: [],
        mentors: [],
        userTimestamps: [],
        booked: [],
        user: []

    }


    componentDidMount() {
        this.getAllSlots()  
    }

    getAllSlots = async () => {
        const fetchAllSlots = await fetch('http://localhost:2500/api/getslots', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        const responseAllSlots = await fetchAllSlots.json();
        let getStudents = [];
        let getMentors = []
        let finalStudent=[]
        responseAllSlots[0].map(role => role.role_student ? getStudents.push(role)
            : role.role_mentor ? getMentors.push(role)
                : null)
        let sortedStudends = getStudents.sort((a, b) => a.start_timestamp > b.start_timestamp)
        let removedPastSLot = sortedStudends.map(slots => moment(slots.start_timestamp) > now ? finalStudent.push(slots) : '' )
        this.setState({
            students: finalStudent,
            mentors: getMentors,
            user: responseAllSlots[1]
        })


    }

    handleDeleteSlot = async (e) => {
        var conf = window.confirm('are you sure you want to delete this slot')
        if (conf == true) {
            let slotId = e.target.value
            const fetchDelet = await fetch('http://localhost:2500/api/delslots', {
                method: 'POST',
                credentials: 'include',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({
                    "slot": slotId
                })

            })
            const response = fetchDelet.json()
            this.getAllSlots()
        }
    }

    handeEmail = async (sEmail, mEmail, slot, note) => {
        const fetchEmail = await fetch('http://localhost:2500/api/sendmail', {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                "studentEmail": sEmail,
                "mentorEmail": mEmail,
                "slotTime": slot,
                "note": note
            })

        })

        this.setState({
            sent: true
        })

    }
    handleLogOut = async () => {
        const fetchLogOut = await fetch('http://localhost:2500/api/logout', {
            method: 'GET',
            credentials: 'Include',
            mode: 'cors',
        })
    }




    render() {

        if (!this.state.user.role_organiser || this.state.user == null) {
            return (
                <h1> you have to be an organiser to have access to this page</h1>
            )
        } else {
            return (
                <Container>
                    <Header title={"CONVIENT"}/>
                    <div className="pl-4"></div>
                    <h2 className='p-4'>DASHBOARD</h2>
                    <div>
                        <h1>Students’ Availability</h1>
                    </div>
                    <Row>
                        {this.state.students.map((data, index) =>
                            <Card className={moment() >= moment(data.start_timestamp) ? 'cardsAvailable cardInactive' : "cardsAvailable"} key={index} >

                                <CardTitle>
                                    {data.github_username}
                                </CardTitle>
                                <img id='cardImageStudent' src={data.github_avatar_url} alt='picture profile' />
                                <CardText>

                                    available times :
                                    <p className="timestamps">
                                        {moment(data.start_timestamp).format("dddd, Do MMMM  , hha")}
                                    </p>
                                    <p>{data.note}</p>

                                </CardText>
                                <Button onClick={this.handleDeleteSlot} value={data.slot_id}>Delete the slot</Button>

                            </Card>
                        )}
                    </Row>
                    <Col className="mentorsSection">
                        <hr />
                        <div>
                            <h1> Mentors’ Availability</h1>
                        </div>
                        <Row>
                            {this.state.mentors.map((mentor, index) =>
                                <Card className='cardsAvailable' key={index}>
                                    <CardTitle id="cardTitle">
                                        {mentor.github_username}
                                    </CardTitle>
                                    <img id='cardImageStudent' src={mentor.github_avatar_url} alt="picture profile" />
                                    <CardText>
                                        available times :  {moment(mentor.start_timestamp).format("dddd, MMMM Do , hh,a")}
                                    </CardText>
                                    <Button onClick={this.handleDeleteSlot} value={mentor.slot_id}>Delete the slot</Button>

                                </Card>
                            )}
                        </Row>
                    </Col>
                    <hr />

                    <Col className="mentorsSection">
                        <div>
                            <h1>Upcoming Meetings</h1>
                        </div>
                        <Row >
                            {this.state.students.map((student, index) => this.state.mentors.map((mentor, index2) =>
                                student.start_timestamp === mentor.start_timestamp ?

                                    <Card className={this.state.sent ? 'cardsAvailable cardInactive' : 'cardsAvailable'} key={index}>
                                        <CardTitle>
                                            Match
                                            </CardTitle>
                                        <img src={mentor.github_avatar_url} id='cardImageStudent' />

                                        <CardText>
                                            Sudent: <span className="matchStudent" >{student.github_username}</span> match with mentor: <span className="matchStudent" >{mentor.github_username}</span>
                                        </CardText>
                                        <img src={student.github_avatar_url} id='cardImageStudent' />
                                        <CardText className="timestamps" >
                                            available times : <span className="matchStudent" > {moment(mentor.start_timestamp).format("dddd, MMMM Do , hh,a")}</span>
                                        </CardText>
                                        <Button onClick={(e) => this.handeEmail(student.github_email, mentor.github_email, moment(mentor.start_timestamp).format("dddd, MMMM Do , hh,a"), student.note)} >send email</Button>

                                    </Card> : "")

                            )}
                        </Row>
                    </Col>



                    {/* <Button onClick={this.handleLogOut} >logOut </Button> */}
                    <Footer/>

                </Container>

            )
        }


    }
}