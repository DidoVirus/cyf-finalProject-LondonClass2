import React, {Component} from 'react';
import {Button} from 'reactstrap'
import ReactDOM from 'react-dom';
import Calender from "../components/Calender.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
// import Button from "../components/Button.js";
import NavBar from '../components/NavBar'
import { Form, FormControl } from 'react-bootstrap';
import { NavLink} from 'react-router-dom';
import moment from 'moment'
moment.locale('en-GB')


class Meeting extends Component {
    constructor(props) {
        super(props);

        this.state = {collectedData: [],value:""};
        this.getData = this.getData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        console.log(this.state);
    }

    handleChange(event) {
    this.setState({value: event.target.value});
  }
    getData(data) {
        this.setState({

          collectedData: data,

    })
    }
    getSlots = () => {
      if(this.state.value === ""){
        alert('Please select at least one slot to continue')
      }else if (this.state.collectedData.length === 0){
        alert('Please select at least one slot to continue')
      }else{
        console.log('hi')
          fetch('http://localhost:2500/api/slots', {
            method: 'POST',
            credentials: 'include',
            mode:'cors',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "user_availability":this.state.collectedData,
            "note":this.state.value
          })
        })
        .then(
          response=>{response.json()

              console.log('hi',response )
          }
      )
        .then(resp=>console.log(resp))
        .catch(err => console.log(err))
      }



  }
render () {
  console.log(this.state.collectData)
  var undi = undefined
    return (
<div className="container-fluid ">
<NavBar pageInfo={"Request Meeting"}/>

    <div className="pl-4" id='meeting_content'>
        <div className="">
            <h2 className="p-4">Request Meeting</h2>

            <p className="p-4">To request a meeting, enter a topic of discussion and select the slots in which you're available.</p>

            <h4 className="pl-4">What would you like to discuss?</h4>
            <div className="pl-4">
              <textarea class="form-control" className="pl-4" id="meeting-subject" rows="3" cols="50" value={this.state.value} onChange={this.handleChange}/>
            </div>
        </div>
        <div className="pl-4">
            <div className="p-4">
                <div className="row">
                <h4>Select time slots</h4>
                    <Calender getData={ this.getData }/>
                </div>
                <div className="submit pb-5">
                
                    <NavLink to="/Displayslots">
                    <Button onClick={ this.getSlots} color="primary" block disabled={(this.state.value === "" || this.state.collectedData.length===0) ? true : false}>Save</Button>
                  </NavLink>
                </div>
            </div>
        </div>
        <div>
            <Footer />
        </div>
    </div>
</div>
    )
}

}
export default Meeting;
