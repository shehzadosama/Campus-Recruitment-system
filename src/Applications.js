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

class Applications extends Component {
  constructor(){
  super();
this.state = {
      user: null,
      jobs:[],
     jobApplications: [],

    };
}


  componentDidMount() {
   var keys= this.props.keys ;
    var applicants = [];

var applications;
var data;
    firebase.auth().onAuthStateChanged(() => {
      var userId = firebase.auth().currentUser.uid;

      var i = 0;
      firebase.database().ref('/jobs/'+keys+'/applications').on("value", function (snapshot) {
        // snapshot.key();
        //  var exists = false;  
       applicants = snapshot.val();
      //  console.log(  applicants)
  //        keys = Object.keys(snapshot.val());
  //        for(var i=0;i<keys.length;i++)  {

  //        firebase.database().ref('/jobs/'+keys[i]+'/applications/').on("value", function (snapshot) {
  //  applications= Object.keys(snapshot.val());
  //  console.log(applications)
  //        });
  //        }
  //       for(var i=0;i<applications.length;i++)  {

  //        firebase.database().ref('/jobs/'+keys[i]+'/applications/'+applications[i]).on("value", function (snapshot) {
  //  data[i]= snapshot.val();
  
  //        });
  //        }
        //  console.log(data)
        // snapshot.forEach(function (childSnapshot) {
        //   // if(userId === childSnapshot.val().uid){
        //   // alert(childSnapshot.val().desc);
        //   // alert(childSnapshot.val().salary);
        //   //  alert(childSnapshot.val().title);
        //   obj[i] = childSnapshot.val();


        //   // obj='ssss'
        //   // alert();

        //   //  console.log(this.state.job)
        //   // }
        //   i++;

        // })
        // this.a(obj);
        // console.log(obj);
        // this.setState({ jobs: obj });
         this.setState({ jobApplications: applicants });
         console.log(this.state.jobApplications);
        // //  this.setState({ job: obj} );
        // console.log(this.state.jobs)
        //  console.log(this.state.jobApplications)
      }.bind(this)
      );
    });
  }




  render() {
       var application = "";
    var btn = "";
    var key;
    console.log(this.state.jobApplications);

    if (this.state. jobApplications !== null) {
      application = Object.keys(this.state.jobApplications ).map((key) => {
      //  console.log(application);
        return (
          <li >
           <p>Student name: {this.state. jobApplications[key].name}</p>
            <p>Email: {this.state. jobApplications[key].email}</p> 
           {/* <p>Description: {this.state. jobApplications[key].desc}</p> */} 
            {/* <p>  {btn}</p>    */}
        </li>
        )
      })
    }
    else {
      return (
       
          <li>
           NO APPLICANTS AVAILABLE
        </li>
        
      )
    }
    return (
    <div >
        <h1>Applications</h1>
         <ul className="theList">
          {application}
        </ul> 
      </div>
    );
  }
}
export default Applications;