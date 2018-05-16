import React, {Component} from 'react';
import Header from "../components/Header.js";
import Login from "../components/Login.js";
import Image from "../components/Image.js";
import Footer from "../components/Footer.js";
import axios from "axios";
class Home extends Component {
    constructor(props) {
        super(props);
    }

render () {
return (
<div className="container-fluid">
<div className="text-center cyf-logo">
    <img src="./asset/CYFlogo.png" alt="logo" className='logo'/>
</div>
    <div className="text-center">
        {/* <Header title={"CONVENIENT"}/> */}
        <h1 className='title' >CONVENIENT</h1>
        <h2 className="subheading">Mentor Meeting Booking System</h2>
        <p className='subtitle'>Book a meeting with a mentor using the Convenient booking system. Get started by logging in below.</p>

    </div>

    <div className="p-4">
        <div className="row login">
            <Login message={"Login"} button={"Sign in with GitHub"}  />
            <Login message={"Need help?"} button={"Contact Organiser"} onClick={this.signup} />
        </div>
        <hr />
    </div>
    <div className='foot'>
        <Footer />
    </div>
</div>
)}
}
export default Home;
