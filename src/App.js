import React, {Component} from "react";
import './App.css';
import API from "./services/API";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
//import logo from './logo.svg';

import Profile from "./controllers/Profile"
import UserSubmissions from "./controllers/UserSubmissions";
import UserComments from "./controllers/UserComments";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      user: {},
    }
  }

  componentDidMount() {
    API.get('/profile/3').then((res) => {
      this.setState({
        user: res.data,
        loading: false,
      });
    });
  }

  render() {
    const {loading, user} = this.state;
    /*
    <Route exact path="/profile/:id/submissions" component={UserSubmissions} />
    <Route exact path="/profile/:id/thread" component={UserComments} />
    <Route exact path="/profile/:id/upvotedsubmissions" component={UpvotedSubmissions} />
    <Route exact path="/profile/:id/upvotedcomments" component={UpvotedComments} />
    */
    return (
      loading ? <></> :
          <>
            <div style={{height: '10px'}}></div>
            <div className="col-md">
              <div className="container">
                <nav className="mb-1 nav navbar-expand-lg navbar-light bg-hacker-news">
                  <ul className="navbar-nav ml-2">
                    <li className="nav-item">
                      <img src='../public/y18.gif' alt=""/>
                    </li>
                    <li className="nav-item">
                      <a className='hacker-news-nav' style={{fontWeight: 'bold'}} href="/news">
                        Hacker News
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className='hacker-news-nav' style={{fontWeight: 'bold'}} href="/news/newest">
                        Newest
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className='hacker-news-nav' style={{fontWeight: 'bold'}} href="/comment">
                        Comments
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className='hacker-news-nav' style={{fontWeight: 'bold'}} href={'/profile/' + user.id + '/thread'}>
                        Threads
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className='hacker-news-nav' style={{fontWeight: 'bold'}} href="/news/ask">
                        Ask
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className='hacker-news-nav' style={{fontWeight: 'bold'}} href={'/profile/' + user.id + '/submissions'}>
                        Submits
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className='hacker-news-nav' style={{fontWeight: 'bold', paddingLeft: 180 }} href='/profile/3'>
                        {user.username}
                      </a>
                    </li>
                  </ul>
                </nav>
                <Router>
                    <Routes>
                      <Route path="/profile/:id" element={<Profile user={user}/>}/>
                      <Route exact path="/profile/:id/submissions" element={<UserSubmissions/>} />
                      <Route exact path="/profile/:id/thread" element={<UserComments/>} />
                    </Routes>
                </Router>
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
