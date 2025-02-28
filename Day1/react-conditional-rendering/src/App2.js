import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
 export default class App2 extends Component  {
  constructor(props)
  {
     super(props);
     {
      this.state=
      {
        isLoggedIn:true
      }
     }
  }
  render()
  {
    let {isLoggedIn} = this.state;
     
    return(
        <div className="App">
      <h1> Demo showing Conditional Rendering </h1>
        {isLoggedIn ? <button> Logout </button> 
        : <button> Login </button>}
    </div>
    )
}
}
 
