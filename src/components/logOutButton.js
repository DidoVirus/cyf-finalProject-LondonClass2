import React, { Component } from 'react';
import { Button,  NavLink, } from 'reactstrap';

export default class LogOutButton extends Component {


  handleLogOut = async () => {
             const logingout = await fetch('http://localhost:2500/auth/logout', {
                 method: 'GET',
                 credentials: 'include',
                 mode: 'cors',
             })
     }

  render() {
    return (
      <div>
        <NavLink onClick={this.handleLogOut}>Log out</NavLink>
      </div>

    )
  }



}
