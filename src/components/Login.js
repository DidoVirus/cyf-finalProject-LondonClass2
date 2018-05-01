import React from "react";
import Button from "./Button.js";
import { NavLink} from 'react-router-dom';

function Login(props){
    return(
        <div className="col text-center">
            <h6 className="h-3 text-center">{props.message}</h6>
            <a className="btn btn-primary  mx-auto" href={props.link}>{props.button}</a>
            <hr />

        </div>
    )}
export default Login;
