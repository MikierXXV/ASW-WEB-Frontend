import React, {Component} from "react";
import './App.css';
import API from "./services/API";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
//import logo from './logo.svg';

import Profile from "./controllers/Profile";
import IndexSubmissions from "./controllers/IndexSubmissions";
import NewSubmissions from "./controllers/NewSubmissions";
import AskSubmissions from "./controllers/AskSubmissions";
import UserSubmissions from "./controllers/UserSubmissions";
import UserComments from "./controllers/UserComments";
import UpvotedComments from "./controllers/UpvotedComments";
import UpvotedSubmissions from "./controllers/UpvotedSubmissions";
import EditSubmission from "./components/submissions/EditSubmission";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      user: {},
    }
  }

  componentDidMount() {
    API.get('/profile/1').then((res) => {
      this.setState({
        user: res.data,
        loading: false,
      });
    });
  }

  render() {
    const {loading, user} = this.state;
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
                      <a className='hacker-news-nav' style={{fontWeight: 'bold'}} href={'/news/1/'}>
                        Submits
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className='hacker-news-nav' style={{fontWeight: 'bold', paddingLeft: 180 }} href='/profile/1'>
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
                      <Route exact path="/profile/:id/upvotedcomments" element={<UpvotedComments/>} />
                      <Route exact path="/profile/:id/upvotedsubmissions" element={<UpvotedSubmissions/>} />
                      <Route exact path="/news/" element={<IndexSubmissions/>}/>
                      <Route exact path="/news/newest/" element={<NewSubmissions/>}/>
                      <Route exact path="/news/ask" element={<AskSubmissions/>}/>
                      <Route exact path="/news/:id/" element={<EditSubmission/>} />
                    </Routes>
                </Router>
              </div>
            </div>
          </>
    );
  }
}

export default App;
