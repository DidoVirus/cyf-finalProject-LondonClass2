import React, { Component } from "react";
import Button from "./Button.js";
import CalenderButton from "./CalenderButton.js";
import moment from "moment";
class Calender extends Component {
    constructor(props) {
        super(props);
        this.state ={
            collectData: [],
        }
    }
    period = (time) => {
        if (time ==="9AM-12PM"){
            return "MORNING";
        } else if( time === "12PM-6PM"){
            return "AFTERNOON";
        } else {
            return "EVENING";
        }
    }
    bookedDays = (day, time) => {
        var start_timestamp;
      if (time ==="9AM-12PM"){
        start_timestamp = moment(day,"DD/MM/YYYY" ).add(9, 'hours').format()
      } else if( time === "12PM-6PM"){
        start_timestamp = moment(day,"DD/MM/YYYY" ).add(12, 'hours').format()
      } else {
        start_timestamp = moment(day,"DD/MM/YYYY" ).add(18, 'hours').format()
      }
         const pullItArray =this.state.collectData.push({"start_timestamp":start_timestamp});
         this.props.getData(this.state.collectData);
    }
    render() {
        var day1 = moment().format("DD/MM/YYYY");
        var day2 = moment().add(1, 'days').format("DD/MM/YYYY");
        var day3 = moment().add(2, 'days').format("DD/MM/YYYY");
        var day4 = moment().add(3, 'days').format("DD/MM/YYYY");
        var day5 = moment().add(4, 'days').format("DD/MM/YYYY");
        var day6 = moment().add(5, 'days').format("DD/MM/YYYY");
        var day7 = moment().add(6, 'days').format("DD/MM/YYYY");
        var day8 = moment().add(7, 'days').format("DD/MM/YYYY");
        var day9 = moment().add(8, 'days').format("DD/MM/YYYY");
        var day10 = moment().add(9, 'days').format("DD/MM/YYYY");
        var day11 = moment().add(10, 'days').format("DD/MM/YYYY");
        var day12 = moment().add(11, 'days').format("DD/MM/YYYY");
        var day13 = moment().add(12, 'days').format("DD/MM/YYYY");
        var day14 = moment().add(13, 'days').format("DD/MM/YYYY");

        const noDays = 7;
        const dayInTheWeek = [day1,day2,day3,day4,day5,day6,day7,day8,day9,day10,day11,day12,day13,day14];
        const timeInDay=["9AM-12PM","12PM-6PM","6PM-8PM"];
        // this.props.getData(this.state.collectData)
        // console.log(this.state.collectData);
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
                    <th className="periodOfDay" scope="row">{this.period(time)}</th>
                    {dayInTheWeek.map((day)=>{
                    return   <td><CalenderButton bookedDays={this.bookedDays} day={day} value={time} booked={false}/></td>;
                })}
                   </tr>
            })}
    </tbody>
   </table>
      );
    }
}
export default Calender;
