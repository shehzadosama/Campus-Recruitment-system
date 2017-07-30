import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import * as firebase from 'firebase';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Login from "./Login"
import Signup from "./Signup"
import Student from "./Student"
import Company from "./Company"
import Studentdetails from "./Studentdetails"
import ListJobs from "./ListJobs"
import CompanyList from "./CompanyList"
import PostJob from "./PostJob"
import PostedJobs from "./PostedJobs"
import StudentList from "./StudentList"
import Admin from "./Admin"
import Applications from "./Applications"
import './style.css';
class App extends Component {
  constructor() {
    super();
    this.state = {

    };
  }



  render() {


    return (
      // <h1> {this.state.id}</h1>   
      <div >
        <Router>
          <div >

            <Route exact path="/" component={Login} />
            <Route path="/Login" component={Login} />
            <Route path="/Student" component={Student} />
            <Route path="/Signup" component={Signup} />
            <Route path="/Company" component={Company} />
            <Route path="/Student/Studentdetails" component={Studentdetails} />
            <Route path="/Student/ListJobs" component={ListJobs} />
            <Route path="/Student/CompanyList" component={CompanyList} />
            <Route path="/Company/PostJob" component={PostJob} />
            <Route path="/Company/PostedJobs" component={PostedJobs} />
            <Route path="/Company/StudentList" component={StudentList} />
           <Route path="/Company/Applications" component={Applications} />
            <Route path="/Admin" component={Admin} />
            <Route path="/Admin/StudentList" component={StudentList} />
            <Route path="/Admin/ListJobs" component={ListJobs} />
            <Route path="/Admin/CompanyList" component={CompanyList} />


          </div>

        </Router>
      </div>
    );
  }
}

export default App;
