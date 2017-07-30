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

class ListJobs extends Component {
  constructor() {
    super();
    this.state = {
      job: [],
      userType: null,
      user: null

    };
  }


  componentDidMount() {
    var obj = [];
    firebase.auth().onAuthStateChanged(() => {
      var userId = firebase.auth().currentUser.uid;
      //   // console.log(userId);
      // var userId = "TQWfTYxcPKVtaBWQcT31LmcBq0g2";
      const rootRef = firebase.database().ref();
      const speedRef = rootRef.child('users/' + userId);
      speedRef.on('value', snap => {

        var type = snap.val().type
        var userDetails = snap.val();
        // console.log(userObj)
        this.setState({ userType: type });
         this.setState({user: userDetails});
        console.log(this.state.user);
        // this.refs.name.value= this.user.name; 
      });
      firebase.database().ref('/jobs/').on('value',function (snapshot) {
        // var i = 0;
        obj = snapshot.val();
        // obj = snapshot.val();
        //  var exists = false;
        // snapshot.forEach(function (childSnapshot) {
        //   // if (userId === childSnapshot.val().uid) {
        //   // alert(childSnapshot.val().desc);
        //   // alert(childSnapshot.val().salary);
        //   //  alert(childSnapshot.val().title);
        //   obj[i] = childSnapshot.val();
        //   // }
        //   i++;

        // })
        this.setState({ job: obj });

        // console.log(this.state.job)
      }.bind(this)
      );
    });
  }

  deleteJob(key) {
    console.log(key);
    firebase.database().ref('jobs/' + key).remove();
  }

 applyJob(key) {
   var obj=[]
var userId = firebase.auth().currentUser.uid;
  firebase.database().ref('/jobs/'+key+'/applications').orderByChild("uid").equalTo(userId).on("value", function (snapshot) {
        // snapshot.key();
        //  var exists = false;  
        obj = snapshot.val();
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
        console.log(obj);
        // this.setState({ job: obj });
        //  this.setState({ job: obj} );
        // console.log(this.state.job)
      }.bind(this)
      );
  if(obj ===null){
   
     firebase.database().ref('/jobs/' + key+'/applications').push({
        // ...this.state.user,
uid: userId,
        name: this.state.user.name,
         email: this.state.user.email,
        // education: this.state.user.education,
        // gpa: this.state.user.gpa,
        // skills: this.state.user.skills,
        // overview: this.state.user.overview

      });
    // console.log(key);
    // firebase.database().ref('jobs/' + key).remove();

    alert("applied job");
  }
  else{
    alert("you have already applied to this job");
  }
  }
  // display(){

  //      console.log(this.state.userType);
  //      var btn="";
  //     // var studentList = this.state.students.map(this.createTasks);
  //     if(this.state.userType==='admin')
  // {
  //   btn = <button onClick={this.deleteJob.bind(this)}>DELETE</button> ;
  // }

  //      var studentList = this.state.job.map( (item) =><li>JOB TITLE:   {item.title}<br />SALARY:   {item.salary}<br />JOB DESC:    {item.desc} <br />

  //        <br />   {btn}<br /></li>);
  //     return studentList;
  //   }


  render() {
    var jobs = "";
    var btn = "";
    var key;

    if (this.state.job !== null) {
      jobs = Object.keys(this.state.job).map((key) => {
        if (this.state.userType === 'admin') {
          btn = <button onClick={this.deleteJob.bind(this, key)}>DELETE</button>;
        }
        else if (this.state.userType === 'std') {
          btn = <button onClick={this.applyJob.bind(this, key)}>APPLY</button>;
        }
        return (

          <li >
            <p>Company Name: {this.state.job[key].companyName}</p>
            <p>Job Title: {this.state.job[key].title}</p>
            <p>Salary: {this.state.job[key].salary}</p>
            <p>Description: {this.state.job[key].desc}</p>
            <p>  {btn}</p>
          </li>
        )
      });
    }
    else {
      return (
        <li>
          NO JOBS AVAILABLE
        </li>
      )
    }



    // function createTasks(item) {
    //   return <div><li>JOB TITLE:   {item.title}<br />SALARY:   {item.salary}<br />JOB DESC:    {item.desc}</li><br />
    //   </div>
    // }
    // var jobList = this.state.job.map(createTasks);
    return (
      <div className="containerList">
        <h1> ALL  JOBS :</h1>
        <ul className="theList">
          {jobs}
        </ul>
      </div>
    );
  }
}
export default ListJobs;