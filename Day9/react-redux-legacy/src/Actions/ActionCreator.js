export const WithdrawMoney =(amount)=>
{
    console.log("Amount is " + amount)
    return(dispatch)=>{
         dispatch({
            type:'withdraw',
            payload:amount
         })
    }
}

export const DepositMoney =(amount)=>
    {
        console.log("Amount is " + amount)
        return(dispatch)=>{
             dispatch({
                type:'deposit',
                payload:amount
             })
        }
    }
    
    