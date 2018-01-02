import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import "./Home.css";
import Button from "../components/Button.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import Input from "../components/Input.js";
import { NavLink} from 'react-router-dom';



function Activation(){
return (
<div className="container-fluid border border-dark rounded p-2">
    <div>
        <Header title={"CONVIENT"}/>
    </div>
    <div className="pl-5">
        <div className="pl-4">
            <h2 className="p-4">VERIFICATION</h2>
            <p className="p-4">Please enter your verification code to complete your registration.if you haven't been given a code yet.</p>
            <a className="text-primary pl-4">please contact the organisers.</a>
        </div>
        <div className="p-4 form-group col-md-4 input">
            <Input />
        </div>
        <div className="col-md-4 pl-4 submit pb-5">
        <NavLink to="/Dashboard"></NavLink>
        </div>
        <div>
            <Footer />
        </div>
    </div>
</div>
)}

export default Activation;
