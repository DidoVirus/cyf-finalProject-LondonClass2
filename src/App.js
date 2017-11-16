import React, { Component } from 'react';
import Home from './container/Home.jsx';
import Activation from './container/Activation.jsx';
import Dashboard from './container/Dashboard.jsx';
import Meeting from './container/Meeting.js';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <Meeting />
    );
  }
}

export default App;
