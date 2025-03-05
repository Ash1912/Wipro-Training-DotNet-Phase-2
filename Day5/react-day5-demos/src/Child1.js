import React from 'react'
import { Child2 } from './Child2'
export const Child1 = () => {
  return (
    <div><h1> I am Child1 Component, calling Child2, but not
        using color variable</h1> 
        <Child2/>

    </div>
  )
}
