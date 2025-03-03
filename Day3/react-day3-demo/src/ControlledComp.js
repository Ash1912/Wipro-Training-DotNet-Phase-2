import React, { Component } from 'react'

export default class ControlledComp extends Component {
  state=
  {
  name:""
  } 
  handleChange=(event)=>
  {
    console.log(event.target.value)
    // this.setState({name:event.target.value});
    this.setState({name:event.target.value.toUpperCase()})
  }
   render() {
    return (
      <div>
        ControlledComp
        <input type='text' value={this.state.name}
        onChange={this.handleChange}/>;
        
        </div>
    )
  }
}
