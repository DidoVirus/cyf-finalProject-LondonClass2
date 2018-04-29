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
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export class Dashboard extends React.Component {
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
    <div className="pl-5">
        <div>
            <Header title={"CONVIENT" }/>
        </div>
        <div className="pl-5">
            <div className="xpl-4">
                <h2 className="p-4">BOOKED AVAILABILITY</h2>
                <div className="center">
                    <Image />
                </div>

                <p className="p-4">HERE YOUR UPCOMING AVAILABILITY</p>
              <div className="p-4">
                <Dropdown >
                    <DropdownToggle caret color="success">
                          BOOKED SLOTS
                    </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>{this.state.slots.map(time =>
                      {time>moment()?
                    <Row>
                      <p className='timeSlot'> {moment(time.start_timestamp).format("dddd, Do MMMM  , hha")}</p>
                    </Row>
                  :null}
                      )}
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
            <br></br>

            <div className="pl-5">
            <Col>
             <a className="col btn btn-primary mx-auto" href="http://localhost:2500/auth/meeting">BOOK MEETING</a>
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

export default Dashboard;
