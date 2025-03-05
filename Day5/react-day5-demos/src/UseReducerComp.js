
import React, { useReducer } from 'react'

const reducer = (state, action)=>
{
  if(action.type=='INC')
      return state+10;
    else if(action.type=='DEC')
        return state-10;
    else
    return state;
}
export const UseReducerComp = () => {
    const initialValue = 10;
    const [count,dispatch ]   = useReducer(reducer, initialValue);
  return (
    <div>UseReducerComp
        <h1> Count {count} </h1> 
        <button onClick = {()=>dispatch({type:'INC'})}> Increment Count </button><br/>
        <button onClick = {()=>dispatch({type:'DEC'})}> Decrement Count </button><br/>
        
    </div>
  )
}
