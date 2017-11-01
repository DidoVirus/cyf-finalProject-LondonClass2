
import React from "react";

function InputLg(props){
    return(
    <div class="form-group">
        <label for="exampleFormControlTextarea1">{props.head}</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
    </div>
    )}

   
export default InputLg;
