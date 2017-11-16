import React, { Component } from "react";
import Button from "./Button.js";
import CalenderButton from "./CalenderButton.js";

class Calender extends Component {
    constructor(props) {
        super(props);

    }

    period = () => {
        if(document.getElementsByClassName('periodOfDay')){
            return "MORNING";
        } else if(this.time ="12PM-6PM"){
            return "AFTERNOON";
        } {
            return "EVENING";
        }
    }


    render() {
        const noDays = 7;
        const dayInTheWeek = ["MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY","SUNDAY"];
        const timeInDay=["9AM-12PM","12PM-6PM","6PM-8PM"];

        
      return(
        <table className="table table-responsive">
        <thead>
            <tr>
                <th></th>
                {dayInTheWeek.map((day)=>{
                    return <th>{day}</th>;
                })}
            </tr>
        </thead>
        <tbody>
            {timeInDay.map((time) =>{
                return <tr>
                    <th className="periodOfDay" scope="row">{this.period()}</th>
                    {dayInTheWeek.map((day)=>{
                    return   <td><CalenderButton  day={day} value={time} booked={false}/></td>;
                })}
                   </tr> 

            })}
    </tbody>
   </table>
      );
    }
}

export default Calender;
