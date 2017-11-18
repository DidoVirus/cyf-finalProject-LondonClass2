import React from "react";
import Button from "./Button.js";

function Login(props){
    return(
        <div className="col col-md-6 text-center">
            <h3 className="text-center">{props.message}</h3>
            <hr />
            <Button onClick="http://localhost:2500/auth/github" button={props.button}/>
        </div>
    )}
    export default Login;
