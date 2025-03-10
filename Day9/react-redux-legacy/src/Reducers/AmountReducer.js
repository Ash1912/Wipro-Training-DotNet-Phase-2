
const initAnmount =100;

const amountReducer = (state =initAnmount, action)=>
{
    if(action.type==='withdraw')
        return state - action.payload
    else if(action.type==='deposit')
        return state + action.payload
    else
    return state;

}

export default amountReducer