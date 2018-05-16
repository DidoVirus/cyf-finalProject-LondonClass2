
import React from 'react';
import ReactDOM from 'react-dom';
import {Col , Row} from 'reactstrap'
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import { NavLink} from 'react-router-dom';
import Image from "../components/Image.js";
import NavBar from '../components/NavBar'
import moment from 'moment'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
const now = moment().format()



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

deleteSlots= async(e) =>{
  var conf = window.confirm('Are you sure you want to delete this slot?')
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
      this.getSlots()
  }
}
render(){
  return(
    <div className="pl-5">

        <NavBar pageInfo={"Dashboard"}/>
        <div className="pl-5">
            <div className="xpl-4">
                <h2 className="p-4"></h2>
                <div className="center">
                    {/* <Image /> */}
                    {/* <img src={} */}
                </div>

                <p className="p-4">Welcome! Your booked meetings and availability will be shown below.</p>
              <div className="p-4">
                <Row >
                <h3>Upcoming Availability</h3>
                {this.state.slots.map(time => moment(time.start_timestamp).format() > now ?
                <Col>
                  <Button className='timeSlot' color="primary" size="lg" onClick={this.deleteSlots} value={time.slot_id}> {moment(time.start_timestamp).format("dddd Do MMMM, ha")} </Button>
                  </Col>

                  : null)}

                  </Row>
              </div>
            </div>
            <br></br>

            <div className="pl-5">
            <Col>
             <a className="col btn btn-primary mx-auto home-button" href="http://localhost:2500/auth/meeting">Book Meeting</a>
           </Col>
           </div>

            <div>
                <Footer />
            </div>
        </div>
    </div>
  )
}
}
