import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
  
  export default class NavBar extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        isOpen: false
      };
    }
    toggle = () =>{
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
    render() {
      return (

          <Navbar color="light" light expand="lg" fixed='fix'>
            <NavbarBrand href="/" id='header_title'>Convenient</NavbarBrand>
            <NavbarBrand id='pageTitle'>{this.props.pageInfo}</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/admin">Admin</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/meeting">mark availability</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/Displayslots">display slots</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>

      );
    }
  }