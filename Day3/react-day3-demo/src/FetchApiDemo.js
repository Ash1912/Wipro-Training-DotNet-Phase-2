import React, { Component } from 'react'

export default class FetchApiDemo extends Component {
    state=
    {
        users : null 
    }
    // events during life cycle
    componentDidMount() { 
        // synatx of fetch api
        // fetch(url)
        // .then(res){ convert res to json form} 
        // .then(response) {consume response}

        fetch("https://reqres.in/api/users")
        .then((res)=> res.json()
        
    .then((response)=>{
    console.log(response.data)
    this.setState({users:response.data})
    })
    )
     
}
  render() {
    return (
      <div>
        <h1> List of Users </h1>
             {
             this.state.users? 
             this.state.users.map((user, i)=>
            
                 <p> {i+1} ---- {user.first_name} -- {user.email}</p>
            )
        : <h2>  No users </h2>}
      </div>
    )
  }
}
