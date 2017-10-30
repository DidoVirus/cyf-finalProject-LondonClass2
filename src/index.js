import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Header from './components/Header';
import Home from './container/Home.jsx';
import Activation from './container/Activation.jsx';

ReactDOM.render(<Activation />, document.getElementById('root'));

registerServiceWorker();
