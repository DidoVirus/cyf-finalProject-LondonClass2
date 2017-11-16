import React, { Component } from 'react';

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
        console.log(this.props.day ,this.props.value);
        //this.props.getValue(this.props.value);
        this.setState({
            booked: !this.state.booked,
        })
    }
    render(){
        const value = this.props;
        
        return(
            <button className={"btn " +this.changeButtonColor()} onClick={this.returnValue}>{this.props.value} {this.props.booked}</button>
        )

    }
}

export default CalenderButton;