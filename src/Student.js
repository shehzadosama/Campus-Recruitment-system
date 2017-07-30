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
import Studentdetails from "./Studentdetails"

class Student extends Component {
  constructor() {
    super();


    this.state = {
      user: null,
      userType:null
    };


    
  }
  componentDidMount() {
    
   
    firebase.auth().onAuthStateChanged(() => {
      
       if(null===firebase.auth().currentUser){
           
            this.props.history.push('/Login');
       }else{
     
      var userId = firebase.auth().currentUser.uid;
      const rootRef = firebase.database().ref();
      const speedRef = rootRef.child('users/' + userId);
      speedRef.on('value', snap => {

        var userName = snap.val().name
        var userType = snap.val().type
        this.setState({ user: userName })
         this.setState({ userType: userType})
          console.log(this.state.userType,'type')
          if(this.state.userType ==='com')   {
            
            this.props.history.push('/Company');
          }
        else  if(this.state.userType ==='admin')   {
            
            this.props.history.push('/Admin');
          }
      })
      }
    })
   
  }


 signOut() {
  //  var flag = true;
    var userId = firebase.auth().currentUser.uid;
      // var userId = "q4UQ9k63mKTPzoOmgk5mmxaxU393";
    // console.log(user);
    if (userId) {
      // alert(userId + " is signed in");
      firebase.auth().signOut().then(function () {
        //  this.setState({ user: "" });
          alert("signOut successfully");
          
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
      //     <div>   
      // {this.state.user?       
      <div>
        <h1>WELCOME TO STUDENT PANEL  </h1> 
        <button onClick={this.signOut.bind(this)}> SIGN OUT </button>
        <h2 className="username">{this.state.user}</h2>
        <h2>Personal Info</h2>
        <p><Link to="/Student/Studentdetails">Edit details</Link></p>
        <p><Link to="/Student/ListJobs">View All Jobs</Link></p>
        <p><Link to="/Student/CompanyList">View companies</Link></p>
      </div>
      //   :
      //   <h1>
      //     loading...
      //   </h1>
      //   }
      // </div>
    );
  }
}
export default Student;