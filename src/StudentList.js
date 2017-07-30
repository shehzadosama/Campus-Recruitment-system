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

class StudentList extends Component {
  
  constructor(){
    super();
    
  
this.state = {
    userType: null,
    name: null,
    students: []
  };
}

componentDidMount(){
  
  firebase.auth().onAuthStateChanged(()=>{
    var userId = firebase.auth().currentUser.uid;
    // console.log(userId);
    // var userId = "DtVsNyGbBkS52zIhsL2XxpAMS962";

    // console.log(userId);
      const rootRef= firebase.database().ref();
    const speedRef = rootRef.child('users/'+userId);
    speedRef.on('value',snap => {

      var type = snap.val().type
      // var userObj = snap.val();
      // console.log(userObj)
      this.setState({userType: type});
      //  this.setState({name: username});
       console.log(this.state.userType);
      // this.refs.name.value= this.user.name; 
    });
  })

var obj=[];
  // firebase.auth().onAuthStateChanged(()=>{
  //   // var userId = firebase.auth().currentUser.uid;
  //   // console.log(userId);
    // var userId = "TQWfTYxcPKVtaBWQcT31LmcBq0g2";
// this.setState({ name: obj });
     
var i = 0;
 firebase.database().ref('/users/').orderByChild("type").equalTo('std').on("value",function(snapshot) {
  
  //  var exists = false;
    // snapshot.forEach(function(childSnapshot){ 
    //  if('std' === childSnapshot.val().type){
      // alert(childSnapshot.val().desc);
      // alert(childSnapshot.val().salary);
      //  alert(childSnapshot.val().title);
      // obj[i]=  childSnapshot.val();
      obj = snapshot.val();
    //  }
      // obj='ssss'
      // alert();
     
    //  console.log(this.state.job)
    
    //  i++;

  //  })
  // this.a(obj);
  // console.log(obj);
    this.setState({ students: obj}  );
//  this.setState({ job: obj} );
  console.log(this.state.students)
}.bind(this)
);
}


  // createTasks(item) {
  //   // this.deleteJob(); 
  //   //  console.log(this.state.userType)
  //     return <li>NAME:  {item.name}<br />Email: {item.email} <br />Education: {item.education} <br /> GPA: {item.education} <br /> Overview: {item.overview} <br /> <br /><br /> </li>
      
  //       // {if(this.state.userType==='admin') 
  //     //  <button >DELETE</button> 
  //   //  console(this.state.userType)
  //     }
    deleteStudent(){
    //   console.log(key);
    // firebase.database().ref('jobs/' + key).remove();
    }
//   display(){
//     //  alert('in display');
//       // this.deleteJob();
//      console.log(this.state.userType);
//      var btn=""
//     // var studentList = this.state.students.map(this.createTasks);
//     if(this.state.userType==='admin')
// {
//   btn = <button onClick={this.deleteStudent.bind(this)}>DELETE</button> ;
// }
    
//      var studentList = this.state.students.map( (item) =><li>NAME:  {item.name}<br />Email: {item.email} <br />Education: {item.education} <br /> GPA: {item.education} <br /> Overview: {item.overview}  <br />
      
//        <br />  <br /><br /> {btn}</li>);
//     return studentList;
//   }


deleteStudent(key){
   console.log(key);
    firebase.database().ref('users/' + key).remove();
}



  render() {

    var students = "";
var btn="";
 var key;
    
    if (this.state.students !== null) {
      students= Object.keys(this.state.students).map((key) => {
        if(this.state.userType==='admin')
{
  btn= <button onClick={this.deleteStudent.bind(this,key)}>DELETE</button> ;
}
        return (
          <li className="view">

            {/* <p>Company Name: {this.state.job[key].Name}</p> */}
            <p>NAME:  {this.state.students[key].name}</p>
            <p>  Email:  {this.state.students[key].email}</p>
              <p>   Education:  {this.state.students[key].education}</p>
               <p> GPA:  {this.state.students[key].gpa}</p>
                <p>Overview: {this.state.students[key].overview}</p>
           <p>  {btn}</p>
            {/* <button className="apply" onClick={this.deleteCompany.bind(this, key)}>Remove</button> */}
          </li>
        )
      })
    }
    else {
      return (
        

         <li>
          NO STUDENTS AVAILABLE
        </li>
       
      )
    }
 
    //  function createTasks(item) {
    //   return <div><li>NAME:  {item.name} <br />
    //   Email: {item.email} <br />
    //   Education: {item.education} <br />
    //   GPA: {item.education} <br />
    // Overview: {item.overview} <br />
    //    </li><br /> 
     
    //   </div>
    // // onClick ={this.viewData.bind(this)}
    // }
    //  var jobList = this.state.students.map(createTasks);
     
    return (
    <div className="containerList">   
     
        <h1> STUDENT LIST </h1>
        <ul className="theList">
      {students} </ul>
       
      </div>
    );
  }
}
export default StudentList;