import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Login from "./Login"
import Signup from "./Signup"

class Studentdetails extends Component {

  constructor() {
    super();
    this.state = {
      user: null,
      error: null
      // name: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(() => {
      var userId = firebase.auth().currentUser.uid;
      // console.log(userId);
      // var userId = "XH0agfzeijcCDYnMX1ff1JfJLRT2";

      console.log(userId);
      const rootRef = firebase.database().ref();
      const speedRef = rootRef.child('users/' + userId);
      speedRef.on('value', snap => {


        var userObj = snap.val();

        this.setState({ user: userObj });

        this.refs.name.value = this.state.user.name;
        this.refs.education.value = this.state.user.education;
        this.refs.gpa.value = this.state.user.gpa;
        this.refs.skills.value = this.state.user.skills;
        this.refs.overview.value = this.state.user.overview;
        if (this.state.user.education == undefined) this.refs.education.value = "";
        if (this.state.user.gpa == undefined) this.refs.gpa.value = "";
        if (this.state.user.skills == undefined) this.refs.skills.value = "";
        if (this.state.user.overview == undefined) this.refs.overview.value = "";
      });
    })
  }

  update() {
    const name = this.refs.name.value;
    const education = this.refs.education.value;
    const gpa = this.refs.gpa.value;
    const skills = this.refs.skills.value;
    const overview = this.refs.overview.value;
    if (name === '' || education === '' || gpa === '' || skills === '' || overview === '') {
      this.setState({ error: "** ALL FIELDS ARE REQUIRED" });
      this.refs.name.focus();
      // alert("all fields are required");
    } else {

      var userId = firebase.auth().currentUser.uid;
      firebase.database().ref('/users/' + userId).set({
        ...this.state.user,

        name: name,
        education: education,
        gpa: gpa,
        skills: skills,
        overview: overview

      });


      alert("Data has been updated success")
      this.props.history.push('/Student');
    }

  }


  render() {
    return (
      <div className="containerList">
        <h1>EDIT STUDENT DETAILS</h1>
        <span id="error">{this.state.error}</span >
        <input className="name" type="text" ref="name" placeholder="Full Name" /><br />
        <input className="education" type="text" ref="education" placeholder="Education" /><br />
        <input className="gpa" type="text" ref="gpa" placeholder="GPA" /><br />
        <input className="skills" type="text" ref="skills" placeholder="Skills" /><br />
        <input className="overview" type="text" ref="overview" placeholder="Overview" /><br /><br />
        <button onClick={this.update.bind(this)}>UPDATE</button>
      </div>
    );
  }
}
export default Studentdetails;