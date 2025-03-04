import React from 'react'
import axios from 'axios'
import { useState } from 'react'


const initialState = 
{
    name:"",
    email:"",
    contact:""
}


export const AddUser = () => {
    const handleChange =(e)=>{
        let{name, value} = e.target;
        setState({...state, [name]:value})
            console.log("state is " + state)
        
    }
    const HandleSubmit = (e)=>
    {
        console.log("state " + state)
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/add", state)
        .then((response)=>
        {
            console.log(response.data)
        })
    }
    const[state, setState] = useState(initialState);
    const{name, email, contact} = state;
  return (
    <div> <h1> Create a User </h1> 
    <form onSubmit={HandleSubmit}>
        <div className='mb-3'>
            <label className='col-form-label'> Name </label>
            <input className='fomr-control' type='text' name="name" value={name} onChange={handleChange}/>
        </div>
        <div className='mb-3'>
            <label className='col-form-label'> Email </label>
            <input className='fomr-control' type='text' name="email" value={email} onChange={handleChange}/>
        </div>
        <div className='mb-3'>     
            <label className='col-form-label'> Contact </label>
            <input className='fomr-control' type='text' name="contact" value={contact} onChange={handleChange}/>
        </div>
        <div>
            <button type='submit' className='btn btn-success'> Add User </button>
        </div>
        
    </form>
    </div>
  )
}
