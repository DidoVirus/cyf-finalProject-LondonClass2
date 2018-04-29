import React, { Component } from 'react';
import { BrowserRouter, Route} from "react-router-dom";
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Header from './components/Header';
import Home from './container/Home.jsx';
import Activation from './container/Activation.jsx';
import Dashboard from './container/Dashboard.jsx';
import Meeting from './container/Meeting.js';
import {Displayslots} from './container/Displayslots.js';
import Organiser from './container/Organiser.jsx';
import OrganasirInterface from './container/OrganasirInterface'
import './index.css';
import './App.css'


const App = () => (
  <BrowserRouter>
    <div className="container">
      <Route  exact path="/" component={Home} />
      <Route path="/activation" component={Activation} />
      <Route path="/dashboard" component={Dashboard}/>
      <Route path="/meeting" component={Meeting} />
      <Route path="/Displayslots" component={Displayslots} />
      <Route path="/organiser" component={Organiser} />
      <Route path="/admin" component={OrganasirInterface} />

    </div>
  </BrowserRouter>
);


export default App;
