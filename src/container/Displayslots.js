import React from 'react';
import ReactDOM from 'react-dom';
import {Col , Row} from 'reactstrap'
import "./Home.css";
import Button from "../components/Button.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import { NavLink} from 'react-router-dom';
import Image from "../components/Image.js";
import moment from 'moment'

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
    }

  })
  const responseSlots = await fetchSlots.json()
  this.setState({
    slots:responseSlots.rows
  })
}

render(){
  console.log(this.state.slots)
  return(
    <div className="container-fluid border border-dark rounded p-2">
        <div>
            <Header title={"CONVIENT"}/>
        </div>
        <div className="pl-5">
            <div className="xpl-4">
                <h2 className="p-4">BOOKED AVAILABILITY</h2>
                <Image />

                <p className="p-4">HERE YOUR UPCOMING AVAILABILITY</p>
                <Row >
                {this.state.slots.map(time =>
                <Col>
                  <p className='timeSlot'> {moment(time.start_timestamp).format("dddd, Do MMMM  , hha")}</p>
                  </Col>
                  )}
                  
                  </Row>
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
