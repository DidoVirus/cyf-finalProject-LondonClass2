import React from "react";
import Button from "./Button.js";
import { NavLink} from 'react-router-dom';

function Login(props){
    return(
        <div className="col col-md-6 text-center">
            <h3 className="text-center">{props.message}</h3>
            <hr />
            <a className="btn btn-primary btn-lg mx-auto" href="http://localhost:2500/auth/github">{props.button}</a>

        </div>
    )}
    export default Login;
