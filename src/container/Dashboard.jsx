import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import "./Home.css";
import Button from "../components/Button.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import { NavLink} from 'react-router-dom';
import Image from "../components/Image";

function Dashboard(props){
return (
<div className="container-fluid border border-dark rounded p-2">
    <div>
        <Header title={"CONVIENT"}/>
    </div>
    <div className="pl-5">
        <div className="pl-4">
            <h2 className="p-4">DASHBOARD</h2>
            <Image />
            <p className="p-4">You have no upcoming meeting conformed.</p>
            <a className="text-primary pl-4">Please Book here</a>

        </div>
        <div className="col-md-5 submit pb-5">
         <NavLink to={"/Meeting/" + props.user}><Button button={"Book a meeting"}  /></NavLink>
        </div>
        <div className="col-md-5  submit pb-5">
        <NavLink to="/Meeting"><Button  button={"Mark availability"}/></NavLink>
        </div>
        <div>
            <Footer />
        </div>
    </div>
</div>
)}

export default Dashboard;
