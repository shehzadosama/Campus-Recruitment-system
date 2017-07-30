import React, { Component } from 'react';
import logo from './logo.svg';
// import './App.css';
import * as firebase from 'firebase';
import Login from "./Login"
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


class Signup extends Component {
  constructor() {
    super();
    this.state = {

      error: null,
      info :null
    };
  }



  signUp() {
    const FullName = this.refs.txtName.value;
    const email = this.refs.txtEmail.value;
    const password = this.refs.txtPassword.value;
    var userType;

    if (FullName === '' || email === '' || password === '') {
      // alert("all fields are required");
      this.setState({ info: "" });
      this.setState({ error: "** ALL FIELDS ARE REQUIRED" });
      this.refs.txtName.focus();
    } else {
      firebase.auth().createUserWithEmailAndPassword(email, password).then((res) => {
        // console.log(res);
        if (this.refs.type_student.checked) {
          userType = this.refs.type_student.value;
        } else if (this.refs.type_company.checked) {
          userType = this.refs.type_company.value;
        }
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + userId).set({
          name: FullName,
          email: email,
          pass: password,
          type: userType

        });
        // alert("account created successfully");
         this.setState({ error: "" });
          this.setState({ info: "ACCOUNT CREATED" });
           this.refs.txtName.focus();
           this.refs.txtName.value="";
     this.refs.txtEmail.value="";
     this.refs.txtPassword.value="";
      }
      ).catch(function (error) {
        // Handle Errors here.
        // var errorCode = error.code;
          this.setState({ error: error.message});
        // console.log(errorMessage);
      }.bind(this));
    }
  }



  render() {
    return (
      <div className="container">

        <h1>SIGNUP FORM</h1>
        <span id="error">{this.state.error}</span >
          <span id="info">{this.state.info}</span >
        <input className="txtName" type="text" ref="txtName" placeholder="Full Name" />  <br />  <br />
        <input className="txtEmail" type="email" ref="txtEmail" placeholder="Email" /><br /> <br />
        <input className="txtPassword" type="password" ref="txtPassword" placeholder="Password" /><br /> <br />
        <input type="radio" name="userType" ref="type_student" value='std' checked /> &nbsp;Student  &nbsp;&nbsp; &nbsp;&nbsp;
<input type="radio" name="userType" ref="type_company" value='com' />&nbsp; Company <br /> <br />
        <button ref="btnLogin" onClick={this.signUp.bind(this)}>SIGN UP</button>
        Already have a account ? <Link to="/">SIGN-IN</Link><br /> <br />
      </div>
    );
  }
}
export default Signup;
