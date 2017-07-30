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

class PostJob extends Component {
  
  constructor(){
    super();
    
  
this.state = {
    userid: null,
    job : [],
    name: null,
     error: null
  };
}

componentDidMount(){
  firebase.auth().onAuthStateChanged(()=>{

// //       this.setState((prev)=>({
// //      jobs: prev.jobs.concat(job) 
// //  } ))
    var userId = firebase.auth().currentUser.uid;
//     // console.log(userId);
     this.setState({userId: userId}); 

//     console.log(userId);
      const rootRef= firebase.database().ref();
    const speedRef = rootRef.child('users/'+userId);
    speedRef.on('value',snap => {

      var username = snap.val().name;
      // var userObj = snap.val();
      // console.log(userObj)
      // this.setState({user: userObj});
       this.setState({name: username});
      //  console.log(this.state.user);
      // this.refs.name.value= this.user.name; 
    });
//   })
this.setState({  job: 'jobData'} );
});
}


postJob(ev){
 ev.preventDefault();
  
    const jobTitle= this.refs.jobTitle.value;
    const sal= this.refs.sal.value;
    const desc= this.refs.desc.value;
    var jobData = {
        title: jobTitle,
        salary:sal,
        desc :desc,
        uid:this.state.userId,
         companyName:this.state.name
    };
console.log(jobData);
 
if(jobTitle ==='' ||  sal ==='' || desc ===''  ){
    this.setState({ error: "** ALL FIELDS ARE REQUIRED" });
    this.refs.jobTitle.focus();
//  alert("all fields are required");
   }else{
     
    //  var userId = firebase.auth().currentUser.uid;
//  var userId = "XH0agfzeijcCDYnMX1ff1JfJLRT2";
//       firebase.database().ref().push(){
//     //   ...this.state.user,
//       // name:(name || this.state.user.name),
//       // email:(email  || this.state.user.name)
//     //   name:name,
//     //  education:education ,
//     //  gpa:gpa ,
//     // skills:skills ,
//     // overview:overview 
//      title: jobTitle,
//         salary:sal,
//         desc :desc,
//         userId: 
     
//      });
this.setState((prev)=>({
     job: jobData }),
function() {
  var applications ="";
  // console.log( this.state.jobData);
  // console.log( this.state.job);
    // do something with new state
   var ref= firebase.database().ref('jobs')
 ref.push(
      
 jobData
   
     );
 
//   firebase.database().ref('jobs/'+key+'/applications/').set({
//     name: 'a'}
//   );
});

            alert("job has been posted successfully");
  //  }
 
   }

}

  render() {
    return (
    <div>   
      <div className="containerList">
        <h1> POST JOBS </h1>
        <span id="error">{this.state.error}</span >
      <input className = "jobTitle" type="text" ref="jobTitle" placeholder="Job Title" /><br />
       <input className = "sal"  type="text" ref="sal" placeholder="Salary" /><br />
       <input className = "desc" type="text" ref="desc" placeholder="Job Description" /><br />
       <button onClick={this.postJob.bind(this)}>POST</button>
      </div>
    </div>
    );
  }
}
export default PostJob;