import React from "react";
import Button from "./Button.js";
import { NavLink} from 'react-router-dom';

function Login(props){
    return(
        <div className="col text-center">
            <h6 className="h-3 text-center">{props.message}</h6>
            <a className="btn btn-primary  mx-auto" href="http://localhost:2500/auth/github">{props.button}</a>
            <hr />

        </div>
    )}
export default Login;
