import React, { Component } from 'react'

export default class Add1 extends Component {
    state=
    {
         num1:0,
         num2:0,
         result:0
    }

    HandleNum1 =(event)=>{
        this.setState({num1:event.target.value})
    }

    HandleNum2= (event)=>{
        this.setState({num2:event.target.value})
    }

    handleSubmit= (event)=>{
        event.preventDefault();
     this.setState({result: parseInt(this.state.num1) +parseInt(this.state.num2)})   
    }
  render() {
    return (
      <div>Add1
        <form onSubmit={this.handleSubmit}>
            <label> Enter No1 </label>
            <input type='number' value={this.state.num1} onChange={this.HandleNum1}/>
            <br/>
            <label> enter No2</label>
            <input type='number' value={this.state.num2} onChange={this.HandleNum2}/>
            <br/>
            <input type='number' value={this.state.result}/> 
            <button type='submit'> Add </button>
        </form>
      </div>
    )
  }
}
