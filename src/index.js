import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Header from './components/Header';
import Home from './container/Home.jsx';
import Activation from './container/Activation.jsx';
import Dashboard from './container/Dashboard.jsx';
import Meeting from './container/Meeting.js';




ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
