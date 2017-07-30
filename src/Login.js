import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';

import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

// import Signup from "./Signup"
import Student from "./Student"
import './style.css';
// import Company from "./Company"
class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      error: null
    };

  }
   componentDidMount() {

      firebase.auth().onAuthStateChanged(() => {

        // const userId = firebase.auth().currentUser.uid;
        //  var userType ;
        // console.log(userId);
        // var userId = "XH0agfzeijcCDYnMX1ff1JfJLRT2";
        // console.log(userId);
        if(firebase.auth().currentUser){
  // alert("");
 const userId = firebase.auth().currentUser.uid;
         var userType ;
         const rootRef= firebase.database().ref();
      const speedRef = rootRef.child('users/'+userId);
      speedRef.on('value',snap => {

          userType= snap.val().type

    //  alert(userType);
     if(userType === 'std'){    
  //  alert("USER ALREADY SIGN IN, You will be redirected to STUDENT PANEL  ");

  //             setTimeout(
  // redirect
  //             ,3000);
     this.props.history.push('/Student');
     }else if(userType === 'com'){
      //  alert("USER ALREADY SIGN IN, You will be redirected to COMPANY PANEL  ");
       this.props.history.push('/Company');
     }
  // function redirect(){
  //   this.props.history.push('/Student');
  // }


      });
      }
      });
    }


  login() {

    var email = "";
    var password = "";
    email = this.refs.txtEmail.value;
    password = this.refs.txtPassword.value;
    var userId = ""
    var userType;
    if (email === '' || password === '') {
      // alert("all fields are required");
      this.setState({ error: "** ALL FIELDS ARE REQUIRED" });
      this.refs.txtEmail.focus();
    } else {
      
      firebase.auth().signInWithEmailAndPassword(email, password).then((res) => {
        // console.log(res);
        var userId = firebase.auth().currentUser.uid;
        const rootRef = firebase.database().ref();
        const speedRef = rootRef.child('users/' + userId);
        speedRef.on('value', snap => {

          userType = snap.val().type

           
          if (userType === 'std') {
            this.props.history.push('/Student');
          } else if (userType === 'com') {
            this.props.history.push('/Company');
          } else if (userType === 'admin') {
            this.props.history.push('/Admin');
          }
        });

      }
      ).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
          // alert("Wrong password.'");
          this.setState({ error: "Wrong password." });
        } else if (errorMessage) {
          // alert(errorMessage);
          this.setState({ error: errorMessage });

        }
      }.bind(this));

    }

  }

  render() {
    return (
      <div className="container">

        <h1 >LOGIN FORM </h1>
        <span id="error">{this.state.error}</span >
        <input className="txtEmail" type="email" ref="txtEmail" placeholder="Email" />  <br />
        <input className="txtPassword" type="password" ref="txtPassword" placeholder="Password" /><br /> <br />
        <button ref="btnLogin" onClick={this.login.bind(this)}>LOGIN</button>
        Not Already a User ? <Link to="/signup">SIGN UP NOW</Link><br /> <br />
      </div>
    );
  }
}
export default Login;
