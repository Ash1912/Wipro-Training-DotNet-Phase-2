import React from 'react'

import { useContext } from 'react'
import colorConext from './ColorContext'
export const Child2 = () => {

    const {appColor, changeColor} = useContext(colorConext);
  return (
    <div><h1> I am Child2 , using color </h1>
   <h2 style={{color:appColor}}> COlor is {appColor} </h2>
   <button onClick={changeColor}> Update Color from Child Comp </button>
    </div>
  )
}
