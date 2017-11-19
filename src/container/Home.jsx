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

verification = () => {
    axios.get('../routes/auth-routes/github')
    .then(result => {
          this.context.router.push('/Activation')
        })

    .catch( error => {
        console.log("error fetching", error)
    });
}

 signup = () => {
    this.props.alert("please email to organisar  cyf@gmail.com");
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
            <Login  message={"LOGIN"} button={"Login With Github"}  onClick={this.verification()} />
            <Login message={"NEED ANY HELP?"} button={"Contact Organisar"} onClick={this.signup} />
        </div>
    </div>
    <div>
        <Footer />
    </div>
</div>
)}
}
export default Home;
