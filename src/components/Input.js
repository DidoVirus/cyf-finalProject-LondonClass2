
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
      <form action="http://localhost:2500/auth/verif" method="post">
        <span className="verification-label">Code:</span> <input type="text" name="id" className="verification-code" /><br/><br/>
        <button className="btn btn-primary btn-lg mx-auto" type="submit">Submit</button>
      </form>

    )}
}

export default Input;
