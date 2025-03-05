import React, { useState } from 'react'
import colorConext from './ColorContext'
import { Child1 } from './Child1';

export const ParentComp = () => {
    const [color, setColor] = useState("green");
    const updateColor =()=>
    {
        setColor("red");
    }
  return (
    <div>
        <h1> I am ParentComp, initialzing color varaible to {color} </h1>
        <colorConext.Provider value={{appColor : color, changeColor:updateColor }}>
        <Child1/>
        </colorConext.Provider>

    </div>
  )
}
