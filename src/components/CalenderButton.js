import React, { Component } from 'react';
import moment from 'moment';


class CalenderButton extends Component {
    constructor (props){
        super(props);
        this.state ={
            booked: this.props.booked,
        }
    }
    changeButtonColor = ()=> {
        return this.state.booked ? "btn-outline-success" : "btn-primary"
    }


    returnValue = () => {
        this.props.bookedDays(this.props.day,this.props.value);

        this.setState({
            booked: !this.state.booked,
        })
    }
    render(){
        const value = this.props;

        return(
            <button className={"btn " +this.changeButtonColor()} onClick={this.returnValue}> {this.props.value} {this.props.booked}</button>
        )

    }
}

export default CalenderButton;
