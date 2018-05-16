import React, { Component } from 'react';
import moment from 'moment';
moment.locale('en-GB')



class CalenderButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            booked: this.props.booked,
            slots: this.props.selectedTime

        }
    }
    changeButtonColor = () => {
        return this.state.booked ? "btn-outline-success" : "btn-primary"
    }
    makeDisable = () => {
        var timeMachMorning = moment(this.props.day, "DD/MM/YYYY").add(9, 'hours').format()
        var timeMachAfternoon = moment(this.props.day, "DD/MM/YYYY").add(12, 'hours').format()
        var timeMachEvning = moment(this.props.day, "DD/MM/YYYY").add(18, 'hours').format()


        console.log(timeMachMorning , this.props.value ==="9AM-12PM" , this.props.value)
        this.state.slots.map(selected => {
            this.props.value === "9AM-12PM" && timeMachMorning === selected ?
            //    <button className={"btn-outline-danger"}></button> : null
               console.log('hi') : null
            // this.props.value === "12PM-6PM" && timeMachAfternoon === selected ?
            //     "btn-outline-danger" : null
            // this.props.value === "12PM-6PM" && timeMachEvning === selected ?
            //     "btn-outline-danger" : null



        })
    }
componentDidMount(){
    this.makeDisable()
}


    returnValue = () => {
        this.props.bookedDays(this.props.day, this.props.value);
        console.log(moment(this.props.day, "DD/MM/YYYY").add(18, 'hours').format());
        //this.props.getValue(this.props.value);
        this.setState({
            booked: !this.state.booked,
        })
    }
    render() {
        const value = this.props;

        return (

            <button className={"btn " + this.changeButtonColor() } onClick={this.returnValue} >{this.props.value} {this.props.booked}</button>
        )

    }
}

export default CalenderButton;
