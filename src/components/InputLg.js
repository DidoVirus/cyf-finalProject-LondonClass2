
import React, { Component } from "react";
import Button from "./Button.js";

class InputLg extends Component {
      constructor (props){
        super(props);
        this.state ={
          value:'Please write an essay about your favorite DOM element'
        }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
   alert('An essay was submitted: ' + this.state.value);
 }
    render(){
        return(
        <div class="form-group" >
            <label for="exampleFormControlTextarea1">{this.props.head}</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={this.state.value} onChange={this.handleChange} handleSubmit={this.handleSubmit}/>
        </div>
        )
      }
    }

    export default InputLg;
