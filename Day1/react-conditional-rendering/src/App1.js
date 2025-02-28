import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
 export default class App1 extends Component  {
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
    let AuthButton;
    if(isLoggedIn){
        AuthButton=<button> Logout </button>
    }
    else 
    {
    AuthButton=<button> Login </button>
    }
    return(
        <div className="App">
      <h1> Demo showing Conditional Rendering </h1>
       {AuthButton}
    </div>
    )
}
}
 
