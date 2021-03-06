import React, { Component, Fragment } from 'react';
import { Container, Card, CardTitle, CardText, Row, Col, Button } from 'reactstrap';
import Header from '../components/Header'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'

import moment from 'moment';
moment.locale('en-GB')



var now = moment()

export default class OrganiserInterface extends Component {
    state = {
        students: [],
        mentors: [],
        userTimestamps: [],
        user: [],
        MatchStudent: [],
        matchMentor: [],
        match: []

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
        let finalStudent = []
        responseAllSlots[0].map(role => role.role_student ? getStudents.push(role)
            : role.role_mentor ? getMentors.push(role)
                : null)
        let sortedStudends = getStudents.sort((a, b) => a.start_timestamp > b.start_timestamp)
        let removedPastSLot = sortedStudends.map(slots => moment(slots.start_timestamp) > now ? finalStudent.push(slots) : '')
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

    // CT stands for Convenient Table

    runMatchMaking = async () => {
        const fetchCT = await fetch(`http://localhost:2500/api/match`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        const dataFromCT = await fetchCT.json()
        let usersId = []
        dataFromCT.map(user => usersId.push(user.mentor_slot_id, user.student_slot_id))

        const fetchUsers = await fetch(`http://localhost:2500/api/slots/${usersId}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        const dataFromUsers = await fetchUsers.json()
        let matchMentors = []
        let matchStudents = []
        let match = []
        dataFromCT.map(timeCT =>

            dataFromUsers.map(users => {
                timeCT.convenient_time === users.start_timestamp && timeCT.mentor_slot_id === users.slot_id ? matchMentors.push(users) : null
                timeCT.convenient_time === users.start_timestamp && timeCT.student_slot_id === users.slot_id ? matchStudents.push(users) : null

            }))
        for (let i = 0; i < matchMentors.length; i++) {
            match.push([matchMentors[i], matchStudents[i]])

        }
        this.setState({
            matchMentor: matchMentors,
            matchStudents: matchStudents,
            match: match
        })
        console.log(match)


    }


    render() {
        // if (!this.state.user.role_organiser || this.state.user == null) {
        //     return (
        //         <h1> you have to be an organiser to have access to this page</h1>
        //     )
        // } else {
        return (
            <Fragment>
                <NavBar pageInfo={"Admin Panel"} color={"dark"} />
                <Container >
                    <div id='meeting_content'>
                        <Col className="mentorsSection">
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
                        </Col>

                        <Col className="mentorsSection">
                            <hr />
                            <div>
                                <h1>Mentors’ Availability</h1>
                            </div>
                            <Row>
                                {this.state.mentors.map((mentor, index) =>
                                    <Card className='cardsAvailable' key={index}>
                                        <CardTitle id="cardTitle">
                                            {mentor.github_username}
                                        </CardTitle>
                                        <img id='cardImageStudent' src={mentor.github_avatar_url} alt="picture profile" />
                                        <CardText>
                                            {moment(mentor.start_timestamp).format("dddd Do MMMM, ha")}
                                        </CardText>
                                        <Button onClick={this.handleDeleteSlot} value={mentor.slot_id}>Remove</Button>

                                    </Card>
                                )}
                            </Row>
                        </Col>
                        <hr />

                        <Col className="mentorsSection">
                            <div>
                                <h1>Upcoming Meetings</h1>
                            </div>
                            <div>
                                <br /><Button onClick={this.runMatchMaking}>Run Matchmaking Process</Button>
                            </div>
                            <Row >
                                {this.state.match.map(first =>

                                    <Card className={this.state.sent ? 'cardsAvailable cardInactive' : 'cardsAvailable'} >
                                        <CardTitle>
                                            Match
                                            </CardTitle>
                                        <img src={first[0].github_avatar_url} id='cardImageStudent' />

                                        <CardText>
                                            Student: <span className="matchStudent" >{first[1].github_username}</span> meeting with: <span className="matchStudent" >{first[0].github_username}</span>
                                        </CardText>
                                        <img src={first[1].github_avatar_url} id='cardImageStudent' />
                                        <CardText className="timestamps" >
                                            <span className="matchStudent" > {moment(first[0].start_timestamp).format("dddd, Do MMMM  , hha")}</span>
                                        </CardText>
                                        <Button onClick={(e) => this.handeEmail(first[1].github_email, first[0].github_email, moment(first[0].start_timestamp).format("dddd Do MMMM, ha"), first[1].note)} >Re-send email</Button>

                                    </Card>

                                )}
                            </Row>
                        </Col>



                        {/* <Button onClick={this.handleLogOut} >logOut </Button> */}
                        <Footer />
                    </div>
                </Container>
            </Fragment>

        )
    }



}