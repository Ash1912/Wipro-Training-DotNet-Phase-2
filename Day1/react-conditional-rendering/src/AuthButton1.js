import React from 'react'

export default function AuthButton1(props) {
    let {isLoggedIn} = props;
    switch(isLoggedIn)
    {
        case true:
            {
            return <button> Logout </button>
            break;
             }
            case false :
                {
                    return <button> Login </button>
                break;
                }
                default:
                    {
                        return null;
                    }

    }
  
  
}
