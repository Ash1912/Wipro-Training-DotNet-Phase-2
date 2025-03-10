import React from 'react'
import { useSelector } from 'react-redux'
export const ContactUs = () => {

       const amount = useSelector((state) => state.amount.value)
   
  return (
    <div>ContactUs

        <h1> Value of amount is {amount} </h1>

    </div>
  )
}
