import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
 import { actionCreators } from './Actions/Index'
 import { bindActionCreators } from 'redux'
export const Shop = () => {
    const dispatch = useDispatch();
    const {DepositMoney,WithdrawMoney } = 
    bindActionCreators(actionCreators, dispatch);
   
    const amount = useSelector(state=>state.amount)
  return (
    <div>Shop
<h1>    Amount ====== {amount} </h1>
{/* <button onClick={()=>dispatch(actionCreators.DepositMoney(100))}> Deposit Money </button>
<button onClick={()=>dispatch(actionCreators.WithdrawMoney(20))}> withdraw Money </button> */}
<button onClick={()=>DepositMoney(100)}> Deposit Money </button>
<button onClick={()=>WithdrawMoney(20)}> withdraw Money </button>

    </div>
  )
}
