import React from "react";

function Header(props){
    return(
        <div className='col' >
            <h5 className=" conv text-center text-primary">{props.title}</h5>
        </div>
    )}

   
export default Header;
