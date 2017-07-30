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
import Applications from "./Applications"
class PostedJobs extends Component {

  constructor() {
    super();

    this.state = {
      job: []

    };
  }

  componentDidMount() {
    var obj = [];

    firebase.auth().onAuthStateChanged(() => {
      var userId = firebase.auth().currentUser.uid;

      var i = 0;
      firebase.database().ref('/jobs/').orderByChild("uid").equalTo(userId).on("value", function (snapshot) {
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
        this.setState({ job: obj });
        //  this.setState({ job: obj} );
        console.log(this.state.job)
      }.bind(this)
      );
    });
  }



  deleteJob(key) {

    // console.log(key);
    firebase.database().ref('jobs/' + key).remove();
  }
  display() {
    //  alert('in display');
    // this.deleteJob();






    //      var i=0;
    //     var jobList = Object.keys(this.state.job).map(  (item,i) =><li>JOB TITLE:   {item.title}<br />SALARY:   {item.salary}<br />JOB DESC:    {item.desc} <button onClick={this.deleteJob.bind(this,item)}>DELETE</button><br /> <br /><br /></li>
    // );
    //     return jobList;
  }


  render() {
    var job = "";
    if (this.state.job !== null) {
      job = Object.keys(this.state.job).map((key) => {
        return (
          <li >

            {/* <p>Company Name: {this.state.job[key].Name}</p> */}
            <p>Job Title: {this.state.job[key].title}</p>
            <p>Salary: {this.state.job[key].salary}</p>
            <p>Description: {this.state.job[key].desc}</p>
            <button  onClick={this.deleteJob.bind(this, key)}>Remove</button>
                {/* <button  onClick={this.applications.bind(this, key)}> </button> */}

                  <Applications keys={key}/>  
          </li>
        )
      })
    }
    else {
      return (
        <li>

          no jobs
        </li>
      )
    }
    return (
      <div className="containerList">
        <h1> MY POSTED JOBS :</h1>
        <ul className="theList">
          {job}
        </ul>

      </div>
    );
  }
}
export default PostedJobs;