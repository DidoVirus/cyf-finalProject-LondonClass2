import React from "react";

function Image(props){
    return(
        <div>
            <img src={require("../container/cyflogo.png")} alt="cyflogo" className="border border-primary rounded mx-auto d-block"/>
        </div>
    )}

   
export default Image;