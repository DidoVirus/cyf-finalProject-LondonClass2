import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import "./Home.css";
import Calender from "../components/Calender.js";
import Header from "../components/Header.js";
import InputLg from "../components/InputLg.js";
import Footer from "../components/Footer.js";
import Button from "../components/Button.js";
import { Form, FormControl } from 'react-bootstrap';


class Meeting extends Component {
    constructor(props) {
        super(props);
        this.state = { collectedData: null };
        this.getData = this.getData.bind(this);
    }

    // ComponentWillMount() {

    // }
    getData(data) {
        this.setState({
            collectedData: Object.assign({},data),
        });
    }
render () {
    return ( 
<div className="container-fluid border border-dark rounded p-4">
    <div>
        <Header title={"CONVENIENT"}/>
    </div>
    <div className="pl-4">
        <div className="pl-4 col-md-5">
            <h2 className="p-4">Meeting Request</h2>
            <p className="pl-4">What Would Like To Discuss?</p>
            <div className="pl-4">
                <InputLg />
            </div>
        </div>
        <div className="pl-4">
            <div className="p-4">
                <div className="row"> 
                    <Calender getData={ this.getData }/>
                </div>
                <div className="submit pb-5">
                    <Button  onClick={ () => console.log( this.state.collectedData) } button={"SUBMIT"} />
                </div>
            </div>
        </div>
        <div>
            <Footer />
        </div>
    </div>
</div>
    )
}

}
export default Meeting;
