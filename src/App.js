import React, {Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
//import "boostrap/dist/css/bootstrap.min.css";
//import "boostrap/dist/css/bootstrap.min.js";
import './App.css';
import API from "./services/API";
import logo from './logo.svg';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
