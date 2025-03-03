import React, { Component } from 'react'

export default class UserForm2 extends Component {
    
    /**
     *
     */
    constructor(props) {
        super(props);
        this.name = React.createRef();
        this.address = React.createRef();
        this.email = React.createRef();
      
        
    }
    SubmitData = (event)=>
        {
            event.preventDefault();
            console.log(this.name.current.value)
            console.log(this.address.current.value)
            console.log(this.email.current.value)
        }
  render() {
    return (
      <div>UserForm2
        <form onSubmit={this.SubmitData}>
            <label> Enter Name </label>
            <input type='text' ref={this.name}/>
            <br/>
            <label> Enter Address </label>
            <input type='text' ref={this.address}/>
            <br/>
            <label> Enter Email </label>
            <input type='text' ref={this.email}/>
            <br/>
        <button type='submit'> Submit Form </button>
             
        </form>

      </div>
    )
  }
}
