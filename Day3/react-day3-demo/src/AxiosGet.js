import axios from "axios";

import React, { Component } from 'react'

export default class AxiosGet extends Component {
    state=
    {
        persons:[]
    }
    
    componentDidMount() { 
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(res =>
        {  const persons = res.data;
            this.setState({persons})
        }
        )
     }
  render() {
    return (
      <div> <h1> List of Users  </h1> 
      <ul>
        {
         this.state.persons
         .map(person=>
         <li key={person.id}> {person.name} </li>
         )
        } </ul></div>
    )
  }
}
