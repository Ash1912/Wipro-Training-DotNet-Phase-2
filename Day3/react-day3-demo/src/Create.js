import React, { Component } from 'react'

export default class Create extends Component {
    state=
    { 
        First_Name:"",
        Last_Name:"",
        Email :""
    }
    handleChange=(event)=>{
         this.setState({[event.target.name]:event.target.value})
    }
    handleSubmit = (event)=>
    {
        console.log("add")
 event.preventDefault();
        fetch("https://reqres.in/api/users",
            {
                method:"POST",
                headers:
                {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body : JSON.stringify(this.state)
            })  .then((resp)=>
                {
                    console.log(resp)
                 resp.json((response)=>
                {
                     console.log(response)
                })
    })

    }
  render() {
    return (
      <div>Create
<form onSubmit={this.handleSubmit}>
    <div>
        <label> Enter First Name </label>
        <input type="text" name="First_Name" value={this.state.First_Name} onChange={this.handleChange}/>
    </div>
    
    <div>
        <label> Enter Last Name </label>
        <input type="text" name="Last_Name" value={this.state.Last_Name} onChange={this.handleChange}/>
    </div>
    
    <div>
        <label> Enter Email </label>
        <input type="text" name="Email" value={this.state.Email} onChange={this.handleChange}/>
    </div>
    <button type='submit'> Add New User </button>
</form>

      </div>
    )
  }
}
