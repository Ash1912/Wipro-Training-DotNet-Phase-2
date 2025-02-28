export const AuthButton = (props)=>{
    let{isLoggedIn} = props;
    if(isLoggedIn)
    {
     return <button> Logout </button>
    }
    else 
    {
     return <button> Login </button>
    }
 }