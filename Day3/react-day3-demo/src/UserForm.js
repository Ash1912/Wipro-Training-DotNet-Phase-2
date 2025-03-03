import React, { Component } from 'react'

export default class UserForm extends Component {
    state=
    { name :"",
        address:"",
        email :"",
        phone:""
    };
    HandleChange =(event)=>
    {
        this.setState({[event.target.name]:event.target.value})
    }
    handleSubmit =(event)=>{
        event.preventDefault();
        console.log(JSON.stringify(this.state))
    }
  render() {
    return (
      <div>UserForm
    <form onSubmit={this.handleSubmit}>
        <label for="txtName"> Enter Name </label>
        <input type="text" name="name" value={this.state.name} onChange={this.HandleChange}/>
        <br/>
        <label for="txtAddress"> Enter Address </label>
        <input type="text" name="address" value={this.state.address} onChange={this.HandleChange}/>
        <br/>
        <label for="txtEmail"> Enter Email </label>
        <input type="email" name="email" value={this.state.email} onChange={this.HandleChange}/>
        <br/>
        <label for="txtPhone"> Enter Phone Number </label>
        <input type="text" name="phone" value={this.state.phone} onChange={this.HandleChange}/>
        <br/>
        <button type='submit'> Register User </button>
    </form>

      </div>
    )
  }
}
