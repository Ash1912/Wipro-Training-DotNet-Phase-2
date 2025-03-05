
import React, { useState } from 'react'

export const UseStateComp = () => {
    const [count, setCount] = useState(0);

  return (
    <div>UseReducerComp

        <h1> Count is {count} </h1>
        <button onClick={()=>setCount(count+10)}> Increment Count </button>
    </div>
  )
}
