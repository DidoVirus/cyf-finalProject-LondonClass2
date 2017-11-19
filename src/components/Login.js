import React from "react";
import Button from "./Button.js";
import { NavLink} from 'react-router-dom';

function Login(props){
    return(
        <div className="col col-md-6 text-center">
            <h3 className="text-center">{props.message}</h3>
            <hr />
            <NavLink to="/organiser"><Button  button={props.button}/></NavLink>
        </div>
    )}
    export default Login;
