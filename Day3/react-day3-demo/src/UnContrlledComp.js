import React, { Component } from 'react'

export default class UnContrlledComp extends Component {
    /**
     *
     */
    constructor(props) {
        super(props);
        this.name= React.createRef();
    }
   render() {
   
 
    return (
      <div>   UnControlledComp

    <input type='text' ref={this.name}/>
     
      </div>
    )
  }
}
