import React, { Component } from 'react'

export default class Product extends Component {
    constructor(props)
    {
         super(props)
         console.log(("constructor of Product has been called"))
        this.state={
        productId:"",
        price:0
     }
        }
        componentDidMount()
        {
            console.log("componentDidMount of Product called")
        }
  render() {
    
    console.log("render of product called")
    return (
      <div>Product
        <Cart/>
      </div>
    )
  }
}

export class Cart extends Component
{
    constructor(props)
    {
        super(props)
        console.log("constructor of Cart called")
        this.state=
        {
        count:0
        }
    }
    Update = ()=>
    {
        this.setState({count:this.state.count+10})
    }
    componentDidUpdate()
    {
         console.log("componentDidUpdate of cart called")
    }
    componentDidMount()
    {
        console.log("componentDidMount of Cart called")
    }
    render(){
        console.log("render of Cart called")
        return(
      <> <h1> Cart </h1>
      <b> Count : {this.state.count} </b>
      <button onClick={this.Update}> Update Qty </button> </>
        )
    }
}