
import React, { Component } from "react";

class Input extends Component {
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
        <div class="col">
            <input type="text" class="form-control" placeholder="Enter Your Activation code"  onChange={this.handleInput} />
        </div>
    
    )}
}
   
export default Input;
