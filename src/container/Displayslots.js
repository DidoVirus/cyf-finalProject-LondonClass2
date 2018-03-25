import React from 'react';
import ReactDOM from 'react-dom';
import "./Home.css";

// import Button from "../components/Button.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import { NavLink} from 'react-router-dom';
import Image from "../components/Image.js";
import { Container, Card, CardTitle, CardText, Row, Col, Button } from 'reactstrap';
import OrganasirInterface from "./OrganasirInterface.js"
import moment from 'moment';

export class Displayslots extends React.Component {
  constructor (props){
      super(props);
      this.state = {
          slots : [],
      }
  }

  componentDidMount(){
    this.getSlots()
}

getSlots = async () =>{
  const fetchSlots=  await fetch('http://localhost:2500/api/slots',{
          method: 'GET',
          credentials: 'include',
          mode:'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
    }})

  const responseSlots = await fetchSlots.json();
  this.setState({
    slots:responseSlots.rows
  })
}

render() {
  console.log(this.state.slots.map(time => time.github_username))
  let username = this.state.slots.map(time => time.github_username);
  let images = this.state.slots.map(time => time.github_avatar_url);
    console.log('am',username)
    let name = username[0]
    let image = images[0]

  return (
      <Container>
          <div>
              <h1> booked slots for {name}</h1>
                <img id='userimage' src={image} alt='picture profile' />

          </div>
          <Row>
              {this.state.slots.map(data =>
              <Card className= "slotsback" key={data.user_id} >

                      <CardText>
                          available times :
                              <p className="slotsviews">
                                      {moment(data.start_timestamp).format("dddd, MMMM Do , hh,a")}
                              </p>
                      </CardText>

                  </Card>
              )}
          </Row>


      </Container>

  )
}
}
