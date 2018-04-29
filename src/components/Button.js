import React from 'react';


const Button = props =>
<button  onClick={props.onClick} className="col btn btn-primary mx-auto">{props.button}</button>


export default Button;