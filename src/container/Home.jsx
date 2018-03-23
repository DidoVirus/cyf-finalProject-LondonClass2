import React, {Component} from 'react';
import "./Home.css";
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
<div className="container-fluid border border-dark rounded p-2">
    <div>
        <Header title={"CONVENIENT"}/>
    </div>
    <div className="p-3">
        <Image />
    </div>
    <div className="p-4">
        <div className="row">
            <Login  message={"LOGIN"} button={"Login with github"}  />
            <Login message={"NEED ANY HELP?"} button={"Contact Organiser"} onClick={this.signup} />
        </div>
    </div>
    <div>
        <Footer />
    </div>
</div>
)}
}
export default Home;
