
import React, { Component } from "react";

class InputLg extends Component {
    constructor (props){
        super(props);
        this.state ={
        }
    }

handleInput = (e) => {
    console.log(e.target.value);    
}


render(){
    return(
    <div class="form-group" >
        <label for="exampleFormControlTextarea1">{this.props.head}</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={this.handleInput}></textarea>
    </div>
    )}
}
   
export default InputLg;
