import React, {Component} from 'react';
import "./Home.css";
import Header from "../components/Header.js";
import Login from "../components/Login.js";
import Organiser from "../components/OrganiserForm.js";
import Image from "../components/Image.js";
import Footer from "../components/Footer.js";
import axios from "axios";
import { NavLink} from 'react-router-dom';
import Button from "../components/Button.js";


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
          <Login  button={"Sign in with GitHub"}  />
          <NavLink to="/organiser"><Button  button={"Contact Organiser"} /></NavLink>

        </div>
    </div>
    <div>
        <Footer />
    </div>
</div>
)}
}
export default Home;
