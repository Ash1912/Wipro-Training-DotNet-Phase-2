import { isClickableInput } from '@testing-library/user-event/dist/utils'
import React, { Component } from 'react'

export default class Product2 extends Component {
    constructor(props)
    {
         super(props)
         console.log(("constructor of Product has been called"))
        this.state={
        productId:"",
        price:0,
        isCart:true
     }
        }
        componentDidMount()
        {
            console.log("componentDidMount of Product called")
        }
        addToCart= (pid)=>
        {
          this.setState({productId:pid, price : this.state.price+1});
        }
        componentDidUpdate() {
        console.log("componentDidUpdate of product called")
        } 
        removeCart = () =>
        {
           console.log("Remove called")
           this.setState({isCart:false});
        }
  render() {
    
    console.log("render of product called")
    return (
      <div>Product2 
        <br/>
        <b>  PRICE : {this.state.price} </b>
        <button onClick={()=>this.addToCart(1)}> Add to Cart </button>
        <button onClick={()=>this.addToCart(2)}> Add to Cart </button>
        <button onClick={()=>this.addToCart(3)}> Add to Cart </button>
        
        <Cart2 productId={this.state.productId} price={this.state.price+10}/>
      <br/> 
      <button onClick={this.removeCart}> Remove Cart </button>
       {!this.state.isCart && <h2> Cart has been removed</h2>}
       {this.state.isCart && <Cart2 productId={this.state.productId} price={this.state.price}/>} 
      </div>
    )
  }
}

export class Cart2 extends Component
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
    static getDerivedStateFromProps(props, state)
    {
      console.log("getDerivedStateFromProps called")
      if(props.price!= state.price)
      {
        console.log("current price is different  ")
        return {price : props.price}
      }
      else 
      {
        console.log("current price is same  ")
      
      return null;
      }
    }
    shouldComponentUpdate(nextProps, nextState)
    {
      if(this.props.price!= nextProps.price)
        {
      
      console.log("shouldComponentUpdate called")
       return true;
        }
        else 
        return false;
    }
    Update = ()=>
    {
        this.setState({count:this.state.count+10})
    }
    componentDidUpdate(prevProp, prevState)
    {
      if(this.props.productId!= prevProp.productId)
      {
        console.log("Prev Prop : " + prevProp.price)
        console.log("Prev State : " + prevState.price)
         console.log("componentDidUpdate of cart called")
    }
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
    componentWillUnmount()
    {
    console.log("Cart has been removed")
}
}