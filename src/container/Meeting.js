
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import "./Home.css";
import Calender from "../components/Calender.js";
import Header from "../components/Header.js";
// import InputLg from "../components/InputLg.js";
import Footer from "../components/Footer.js";
import Button from "../components/Button.js";
import { Form, FormControl } from 'react-bootstrap';
import { NavLink} from 'react-router-dom';


class Meeting extends Component {
    constructor(props) {
        super(props);
        // This is not anybody's change (ghosts did it I think <Ahmed>)
        // it was like that before "start_timestamp":this.state.collectedData
        this.state = {collectedData:[],value:""};
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
    .then(response=>response.json())
    .then(resp=>console.log(resp))
    .catch(err => console.log(err))
  }
render () {
    return (
<div className="container-fluid ">
    <div>
        <Header title={"CONVENIENT"}/>
    </div>
    <div className="pl-4">
        <div className="pl-4 col-md-5">
            <h5 className="p-4">Meeting Request</h5>
            <p className="pl-4">What Would Like To Discuss?</p>
            <div className="pl-4">
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={this.state.value} onChange={this.handleChange}/>
            </div>
        </div>
        <div className="pl-4">
            <div className="p-4">
                <div className="row">
                    <Calender getData={ this.getData }/>
                </div>
                <div className="submit pb-5">
                    <NavLink to="/Displayslots"><Button  onClick={ this.getSlots} button={"SUBMIT"} /></NavLink>
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
