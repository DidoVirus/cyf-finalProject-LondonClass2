import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import "./Home.css";
import Button from "../components/Button.js";
import Header from "../components/Header.js";
import Login from "../components/Login.js";
import Image from "../components/Image.js";
import Footer from "../components/Footer.js";

var buttons =[
    {
        message:"GET YOUR ACTIVATION CODE",
        button:"Login with Github",
        id:1,
    },{
        message:"NEED ANY HELP?",
        button:"Contact Organiser",
        id:2,
    }
]

function Home(){
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
            {posts.map((post) => {
                return <Login message={post.message} button />
            })}
            <Login  message={"LOGIN"} button={"Login With Github"}/>
            <Login message={"NEED ANY HELP?"} button={"Contact Organisar"}/>
        </div>
    </div>
    <div>
        <Footer />
    </div>
</div>
)}

export default Home;
