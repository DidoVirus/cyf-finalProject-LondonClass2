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
    <div>
        <Header title={"CONVENIENT"}/>
    </div>
    <div className="p-3">
        <Image />
    </div>
    <div className="p-4">
        <div className="row">
            <Login  message={"LOGIN"} button={"Sign in with GitHub"} link={"http://localhost:2500/auth/github"} />
            <Login message={"NEED ANY HELP?"} button={"Contact Organiser"} link={"http://localhost:3000/Organiser"}/>
        </div>
    </div>
    <div>
        <Footer />
    </div>
</div>
)}
}
export default Home;
