import React from 'react'
import { useSelector } from 'react-redux'

export const AboutUs = () => {
    const amount = useSelector(state => state.amount)
  return (
    <div>AboutUs
        <h1> Value of Amount is  {amount} </h1>
    </div>
  )
}
