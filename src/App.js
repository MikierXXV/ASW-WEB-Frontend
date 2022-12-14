import React, {Component} from "react";
import './App.css';
import API from "./services/API";
import {Redirect, Route, Switch} from "react-router-dom";
//import "boostrap/dist/css/bootstrap.min.css";
//import "boostrap/dist/css/bootstrap.min.js";
import logo from './logo.svg';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      user: {},
    }
  }

  render() {
    const {loading, user} = this.state;
    return (
        loading ? <></>:
            <>
              <div style={{height: '10px'}}></div>
              <div className="col-md">
                <div className="container">
                  <nav className="mb-1 nav navbar-expand-lg bg-hacker-news">
                    <ul className="navbar-nav ml-2">
                      <li className="nav-item">
                        <a className='navbar-brand' style={{fontWeight: 'bold'}} href="/news">
                          Hacker News
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className='navbar-brand' style={{fontWeight: 'bold'}} href="/news/newest">
                          Newest
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className='navbar-brand' style={{fontWeight: 'bold'}} href="/comment">
                          Comments
                        </a>
                      </li>
                      { user.id == null } ?
                      <li className="nav-item">
                        <a className='navbar-brand' style={{fontWeight: 'bold'}} href="/login">
                          Threads
                        </a>
                      </li> :
                      <li className="nav-item">
                        <a className='navbar-brand' style={{fontWeight: 'bold'}} href={'/profile/' + user.id + '/thread'}>
                          Threads
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className='navbar-brand' style={{fontWeight: 'bold'}} href="/news/ask">
                          Ask
                        </a>
                      </li>
                      { user.id == null } ?
                      <li className="nav-item">
                        <a className='navbar-brand' style={{fontWeight: 'bold'}} href="/login">
                          Submits
                        </a>
                      </li> :
                      <li className="nav-item">
                        <a className='navbar-brand' style={{fontWeight: 'bold'}} href={'/profile/' + user.id + '/submissions'}>
                          Submits
                        </a>
                      </li>
                      { user.id == null } ?
                      <li className="nav-item">
                        <a className='navbar-brand' style={{fontWeight: 'bold'}} href="/login">
                          Login
                        </a>
                      </li> :
                      <li className="nav-item">
                        <a className='navbar-brand' style={{fontWeight: 'bold'}} href={'/profile/' + user.id }>
                          {user.username}
                        </a>
                      </li>
                    </ul>
                  </nav>
                  <Switch>

                  </Switch>
                </div>
              </div>
            </>
    );
  }
}


/*
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
}*/

export default App;
