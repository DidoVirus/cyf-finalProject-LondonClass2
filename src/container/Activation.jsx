import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import "./Home.css";
import Button from "../components/Button.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import Input from "../components/Input.js";

function Activation(){
return (
<div className="container-fluid border border-dark rounded p-2">
    <div>
        <Header title={"CONVIENT"}/>
    </div>
    <div>
        <h2 lassName="p-3">VERIFICATION</h2>
        <p>Please enter your verification code to complete your registration.if you haven't been given a code yet.</p><p className="text-primary">please contact the organisers.</p>
    </div>
    <div className="p-5">
        <Input />
    </div>
    <div className="col-md-6">
        <Button  button={"submit"}/>
    </div>
    <div>
        <Footer />
    </div>
</div>
)}

export default Activation;