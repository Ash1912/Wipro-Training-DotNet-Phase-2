import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deposit, withdraw } from './Actions/amoutSlice'
 //  import { bindActionCreators } from 'redux'
export const Shop = () => {
    const dispatch = useDispatch();
    // const {DepositMoney,WithdrawMoney } = 
    // bindActionCreators(actionCreators, dispatch);
   
    const amount = useSelector((state)=>state.amount.value )
  return (
    <div>Shop
<h1>    Amount ====== {amount} </h1>

<button onClick={()=>dispatch(deposit(100))}> Deposit Money </button>
<button onClick={()=>dispatch(withdraw(20))}> withdraw Money </button>

    </div>
  )
}
