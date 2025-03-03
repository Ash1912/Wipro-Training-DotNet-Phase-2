import React, { Component } from 'react'
import axios from 'axios'
export default class AxiosCreate extends Component {
    state=
    { 
        name:"",
        email :""
    }
    handleChange=(event)=>{
         this.setState({[event.target.name]:event.target.value})
    }
    handleSubmit = (event)=>
    {
         
 event.preventDefault();
 const user = {
    name : this.state.name,
    email : this.state.email}
 
        axios.post("https://jsonplaceholder.typicode.com/users",{user})
             .then((resp)=>
                {
                    console.log(resp)
                    console.log(resp.data)
                })
 
    }
  render() {
    return (
      <div>Create
<form onSubmit={this.handleSubmit}>
    <div>
        <label> Enter Name </label>
        <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
    </div>
      
    
    <div>
        <label> Enter Email </label>
        <input type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
    </div>
    <button type='submit'> Add New User </button>
</form>

      </div>
    )
  }
}
