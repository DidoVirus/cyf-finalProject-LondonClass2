import React, { Component } from "react";
import Button from "./Button.js";
import CalenderButton from "./CalenderButton.js";
import moment from "moment";
moment.locale('en-GB')

class Calender extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collectData: [],
            slots:[]
        }

        this.fetchSlots = this.fetchSlots.bind(this);

    }

    componentDidMount(){
      this.fetchSlots();
  }

    fetchSlots = async () =>{
      const getSlots=  await fetch('http://localhost:2500/api/slots',{
          method: 'GET',
          credentials: 'include',
          mode:'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }

      })
      const responseSlots = await getSlots.json()
      this.setState({
        slots:responseSlots.rows.map(time => moment(time.start_timestamp).format())

      })
    }


    period = (time) => {
        if (time === "9:00-12:00") {
            return "Morning";
        } else if (time === "12:00-18:00") {
            return "Afternoon";
        } else {
            return "Evening";
        }
    }
    bookedDays = (day, time) => {
        var start_timestamp;
        if (time === "9:00-12:00") {
            start_timestamp = moment(day, "DD/MM").add(9, 'hours').format()
        } else if (time === "12:00-18:00") {
            start_timestamp = moment(day, "DD/MM").add(12, 'hours').format()
        } else {
            start_timestamp = moment(day, "DD/MM").add(18, 'hours').format()
        }
        const pullItArray = this.state.collectData.push({ "start_timestamp": start_timestamp });
          this.props.getData(this.state.collectData);
    }
    render() {
      console.log("am them",this.state.collectData)
        var day1 = moment().format("DD/MM");
        var day2 = moment().add(1, 'days').format("DD/MM");
        var day3 = moment().add(2, 'days').format("DD/MM");
        var day4 = moment().add(3, 'days').format("DD/MM");
        var day5 = moment().add(4, 'days').format("DD/MM");
        var day6 = moment().add(5, 'days').format("DD/MM");
        var day7 = moment().add(6, 'days').format("DD/MM");
        var day8 = moment().add(7, 'days').format("DD/MM");
        var day9 = moment().add(8, 'days').format("DD/MM");
        var day10 = moment().add(9, 'days').format("DD/MM");
        var day11 = moment().add(10, 'days').format("DD/MM");
        var day12 = moment().add(11, 'days').format("DD/MM");
        var day13 = moment().add(12, 'days').format("DD/MM");
        var day14 = moment().add(13, 'days').format("DD/MM");

        const noDays = 7;
        const dayInTheWeek = [day1, day2, day3, day4, day5, day6, day7, day8, day9, day10, day11, day12, day13, day14];
        const timeInDay = ["9:00-12:00", "12:00-18:00", "18:00-20:00"];

        return (
            <table className="table table-responsive calendar-table">
                <thead>
                    <tr>
                        <th></th>
                        {dayInTheWeek.map((day) => {
                            return <th>{day}</th>;
                        })}
                    </tr>
                    {timeInDay.map((time) => {
                        return <tr>
                            <td className="periodOfDay" scope="row">{this.period(time)}</td>
                            {dayInTheWeek.map((day) => {
                                return <th><CalenderButton bookedDays={this.bookedDays} day={day} value={time} booked={false} selectedTime = {this.state.slots} /></th>;
                            })}
                        </tr>
                    })}
                </thead>
                <tbody> 

                </tbody>
            </table>
        );
    }
}
export default Calender
