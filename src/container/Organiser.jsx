import React, {Component} from 'react';
import "./Home.css";
import OrganiserForm from "../components/OrganiserForm.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";


function Organiser(){
return (
<div className="container-fluid border border-dark rounded p-2">
    <div>
        <Header title={"CONVIENT"}/>
    </div>
    <div className="pl-4">
        <div className="pl-4">
         <OrganiserForm />
        </div>
        <div>
            <Footer />
        </div>
    </div>
</div>
)}

export default Organiser;

{/* <div className="submit pb-5">
<Button  onClick={() =>{
fetch('http://localhost:2500/auth/sloted',{ method: 'post',body:JSON.stringify(123)})
.then(response => {console.log(response)} )
.catch( error => {console.log('error occur', error);
})}} button={"SUBMIT"} /> */}
