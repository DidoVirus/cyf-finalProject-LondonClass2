import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import "./Home.css";
import Button from "../components/Button.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";

function Dashboard(){
return (
<div className="container-fluid border border-dark rounded p-2">
    <div>
        <Header title={"CONVIENT"}/>
    </div>
    <div className="pl-5">
        <div className="pl-4">
            <h2 className="p-4">DASHBOARD</h2>
            <p className="p-4">You have no upcoming meeting conformed.</p>
            <a className="text-primary pl-4">Please Book here</a>
        </div>
        <div className="col-md-5 submit pb-5">
            <Button button={"Book a meeting"} />
        </div>
        <div className="col-md-5  submit pb-5">
            <Button  button={"Mark availability"}/>
        </div>
        <div>
            <Footer />
        </div>
    </div>
</div>
)}

export default Dashboard;