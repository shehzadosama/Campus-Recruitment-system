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

class CompanyList extends Component {
  constructor() {
    super();
    this.state = {
      // user: null,
      // name: null,
      companies: [],
      userType: null
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
        // var userObj = snap.val();
        // console.log(userObj)
        this.setState({ userType: type });
        //  this.setState({name: username});
        // console.log(this.state.userType);
        // this.refs.name.value= this.user.name; 
      });

      var i = 0;
      firebase.database().ref('/users/').orderByChild("type").equalTo('com').on("value", function (snapshot) {
        obj = snapshot.val();
        //  var exists = false;
        // snapshot.forEach(function (childSnapshot) {
        //   // if ('com' === childSnapshot.val().type) {
        //     // alert(childSnapshot.val().desc);
        //     // alert(childSnapshot.val().salary);
        //     //  alert(childSnapshot.val().title);
        //     obj[i] = childSnapshot.val();     
        //   // }
        //   i++;

        // })

        this.setState({ companies: obj });
        //  this.setState({ job: obj} );
        // console.log(this.state.companies)
      }.bind(this)
      );
    });
  }
  deleteCompany(key) {
    var uid;
    console.log(key);
    // firebase.database().ref().child('jobs/' + key).on('value', snap => {

    //     uid= snap.val().companyName
        
      
       
    //   });
  //  console.log(uid);
    firebase.database().ref('users/' + key).remove();
    var record ;

    var r;
    var i=0;
    var root = firebase.database().ref('/jobs/');
    root.orderByChild("uid").equalTo(key).on("value", function (snapshot) {
if(snapshot.val()){

 record= Object.keys(snapshot.val());
for(var i=0;i<record.length;i++) firebase.database().ref('/jobs/'+record[i]).remove(); 
}
// r = record;
//  console.log(r.key);
    
    //  firebase.database().ref('/jobs/'+record).remove();
    //    snapshot.forEach(function(data) {

    //    record[i++] = Object.keys(data.val()); 

      
    //     // root.child(data.key()).remove();
      
    // });
     console.log(record);
    }.bind(this))

 
    // root.orderByChild("uid").equalTo(key).remove();
  }
  // display() {
  //   //  alert('in display');
  //   // this.deleteJob();
  //   var btn = "";
  //   // var studentList = this.state.students.map(this.createTasks);
  //   if (this.state.userType === 'admin') {
  //     btn = <button onClick={this.deleteJob.bind(this)}>DELETE</button>;
  //   }

  //   var companiesList = this.state.companies.map((item) => <li>NAME:   {item.name}<br />EMAIL:   {item.email}<br /> {btn}<br /><br /></li>
  //   );
  //   return companiesList;
  // }

  render() {
    var company = "";
    var btn = "";
    var key;

    if (this.state.companies !== null) {
      company = Object.keys(this.state.companies).map((key) => {
        if (this.state.userType === 'admin') {
          btn = <button onClick={this.deleteCompany.bind(this, key)}>DELETE</button>;
        }
        return (
          <li >
            <p>Company Name: {this.state.companies[key].name}</p>
            <p>Email: {this.state.companies[key].email}</p>
            <p>  {btn}</p>   
          </li>
        )
      })
    }
    else {
      return (
       
          <li>
           NO COMPANIES AVAILABLE
        </li>
        
      )
    }
    // function createTasks(item) {
    //   return <div><li>NAME:   {item.name}<br />EMAIL:   {item.email}<br /></li><br />
    //   </div>
    // }
    // var jobList = this.state.companies.map(createTasks);
    return (
      <div className="containerList">
        <h1>Companies list</h1>
        <ul className="theList">
          {company}
        </ul>
      </div>
    );
  }
}
export default CompanyList;