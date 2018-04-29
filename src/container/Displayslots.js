import React from 'react';
import ReactDOM from 'react-dom';
import {Col , Row} from 'reactstrap'
import "./Home.css";
// import Button from "../components/Button.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import { NavLink} from 'react-router-dom';
import Image from "../components/Image.js";
import { Container, Card, CardTitle, CardText, Row, Col, Button } from 'reactstrap';
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

handleLogOut = async () => {
           const logingout = await fetch('http://localhost:2500/auth/logout', {
               method: 'GET',
               credentials: 'include',
               mode: 'cors',
           })
   }

getSlots = async () =>{
  const fetchSlots=  await fetch('http://localhost:2500/api/slots',{
      method: 'GET',
      credentials: 'include',
      mode:'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }

  })
  const responseSlots = await fetchSlots.json()
  this.setState({
    slots:responseSlots.rows
  })
}



render(){
  return(
    <div className="container-fluid border border-dark rounded p-2">
        <div>
            <NavLink to="/"><Button onClick={this.handleLogOut}>LOG OUT</Button></NavLink>
            <Header title={"CONVIENT"}/>
        </div>
        <div className="pl-5">
            <div className="pl-4">
                <h2 className="p-4">BOOKED AVAILABILITY</h2>
                <Image />

                <p className="p-4">HERE YOUR UPCOMING AVAILABILITY</p>
                  {this.state.slots.map(time =>
                    <img      src={time.github_avatar_url }/>
                    )}

            </div>
            <Col>
             <a className="col btn btn-primary mx-auto" href="http://localhost:2500/auth/meeting">BOOK MEETING</a>
             {/* <Button  onClick={ this.getSlots} button={"SUBMIT"} /> */}
           </Col>
            <div>
                <Footer />
            </div>
        </div>
    </div>
  )
}
}