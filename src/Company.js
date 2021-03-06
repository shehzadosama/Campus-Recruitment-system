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

class Company extends Component {
  constructor(){
  super();
this.state = {
      user: null
    };
}

componentDidMount() {
    // alert();
   
    firebase.auth().onAuthStateChanged(() => {
      // var userId = firebase.auth().currentUser.uid;
       if(null===firebase.auth().currentUser){
            // alert()
            this.props.history.push('/Login');
       }else{
      //  console.log(userId)
      // if(null===firebase.auth().currentUser.uid){
      //   alert()
      // }
      // console.log(userId);
      // var userId = "q4UQ9k63mKTPzoOmgk5mmxaxU393";
      // console.log(userId);
      var userId = firebase.auth().currentUser.uid;
      const rootRef = firebase.database().ref();
      const speedRef = rootRef.child('users/' + userId);
      speedRef.on('value', snap => {

        var userName = snap.val().name
        var userType = snap.val().type
        this.setState({ user: userName })
         this.setState({ userType: userType})
          console.log(this.state.userType,'type')
          if(this.state.userType ==='std')   {
            
            this.props.history.push('/Student');
          }
        else  if(this.state.userType ==='admin')   {
            
            this.props.history.push('/Admin');
          }
      })
      }
    })
   
  }


signOut() {
   var flag = true;
    var userId = firebase.auth().currentUser.uid;
      // var userId = "q4UQ9k63mKTPzoOmgk5mmxaxU393";
    // console.log(user);
    if (userId) {
      // alert(userId + " is signed in");
      firebase.auth().signOut().then(function () {
        //  this.setState({ user: "" });
          alert("signOut success");
          
        // return flag;
      
        //  alert("signOut success");
      // return true;
          this.props.history.push('/Login');
      }.bind(this)).catch(function (error) {
        alert("An error happened");
      });
    } else {
      alert("No user is signed in");
      // this.props.history.push('/Signup');
        // this.props.history.push('/Login');


    }
      
   
  }


  render() {
    
    return (
    <div>   
        <h1>WELCOME TO Company PANEL</h1>
  <button onClick={this.signOut.bind(this)}> SIGN OUT </button>
       
         <h2>Personal Info</h2>
          <h2 className="username">{this.state.user}</h2>
        <p><Link to="/Company/PostJob">Post Jobs</Link></p>
        <p><Link to="/Company/PostedJobs">My posted jobs</Link></p>
        <p><Link to="/Company/StudentList">Students</Link></p>
        
      </div>
    );
  }
}
export default Company;