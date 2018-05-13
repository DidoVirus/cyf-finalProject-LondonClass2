import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Button from "../components/Button.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import { NavLink} from 'react-router-dom';

function Dashboard(props){
return (
<div className="container-fluid ">
    <div>
        <Header title={"CONVENIENT"}/>
    </div>
    <div className="pl-5">
        <div className="pl-4">
            <h2 className="p-4">DASHBOARD</h2>
            <p className="p-4">At present, you have no upcoming meetings scheduled</p>
        </div>
        <div className="col-md-5 submit pb-5">
         <NavLink to={"/Meeting"}><Button button={"Book a meeting"}  /></NavLink>
        </div>
        <div>
            <Footer />
        </div>
    </div>
</div>
)}

export default Dashboard;
