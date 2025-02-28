import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
// import { AuthButton } from './AuthButton';
import AuthButton1 from './AuthButton1';
export default class App extends Component  {
  constructor(props)
  {
     super(props);
     {
      this.state=
      {
        isLoggedIn:false
      }
     }
  }
  render()
  {
    // let {isLoggedIn} = this.state;
    // const renderAuthButton = ()=>{
    //    if(isLoggedIn)
    //    {
    //     return <button> Logout </button>
    //    }
    //    else 
    //    {
    //     return <button> Login </button>
    //    }
    // }
  return (
    <div className="App">
      <h1> Demo showing Conditional Rendering </h1>
       {/* <button> Login </button>
       <button> Logout </button> */}
       {/* {renderAuthButton()}  */}
       <AuthButton1 isLoggedIn={this.state.isLoggedIn}/>
    </div>
  );
}
}
 
