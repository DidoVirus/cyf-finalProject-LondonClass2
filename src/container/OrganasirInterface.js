import React, { Component } from 'react';
import { Container, Card, CardTitle, CardText, Row, Col, Button } from 'reactstrap';
import moment from 'moment';
// import dbs from '../../config/db'

// var pool = dbs.getPool()


export default class OrganasirInterface extends Component {
    state = {
        students: [],
        mentors: [],
        userTimestamps: []
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
                'Content-Type': 'application/json'
            }
        });
        const responseAllSlots = await fetchAllSlots.json();
        let getStudents = [];
        let getMentors = []
        responseAllSlots.map(role => role.role_student ? getStudents.push(role)
            : role.role_mentor ? getMentors.push(role)
                : null)
        let sortedStudends = getStudents.sort((a,b) => a.start_timestamp> b.start_timestamp)        
        this.setState({
            students: sortedStudends,
            mentors: getMentors
        })

    }

    handleDeleteSlot = async (e) => {
        let slotId = e.target.value
        const fetchDelet = await fetch('http://localhost:2500/api/delslots', {
            method: 'POST',
            credentials: 'include',
            mode:'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },body: JSON.stringify({
                "slot": slotId
            })

        })
        const response = fetchDelet.json()
        console.log(fetchDelet)
        this.getAllSlots()
    }



    render() {
        return (
            <Container>
                <div>
                    <h1> Studenst Avalibility</h1>
                </div>
                <Row>
                    {this.state.students.map(data =>
                    <Card className={moment() >= moment(data.start_timestamp) ? 'cardsAvailable cardInactive' : "cardsAvailable" } key={data.user_id} >
                    
                            <CardTitle>
                                {data.github_username}
                            </CardTitle>
                            <img id='cardImageStudent' src={data.github_avatar_url} alt='picture profile' />
                            <CardText>
                                available times :
                                    <p className="timestamps">
                                            {moment(data.start_timestamp).format("dddd, MMMM Do , hh,a")}                                          
                                    </p>
                            </CardText>
                            <Button onClick={this.handleDeleteSlot} value={data.slot_id}>x</Button>

                        </Card>
                    )}
                </Row>
                <Col className="mentorsSection">
                    <hr />
                    <div>
                        <h1> Mentors Avalibility</h1>
                    </div>
                    <Row>
                        {this.state.mentors.map(mentor =>
                            <Card className='cardsAvailable'>
                                <CardTitle id="cardTitle">
                                    {mentor.github_username}
                                </CardTitle>
                                <img id='cardImageStudent' src={mentor.github_avatar_url} alt="picture profile" />
                                <CardText>
                                    available times :  {moment(mentor.start_timestamp).format("dddd, MMMM Do , hh,a")}
                                </CardText>

                            </Card>
                        )}
                    </Row>
                </Col>


            </Container>

        )


    }
}