import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const initialState = 
{
    name:"",
    email:"",
    contact:""
}


export const AddEditUser = () => {
    const[state, setState] = useState(initialState);
    const{name, email, contact} = state;
    // const id = "98886485-7b27-4737-bb4a-1ee58b2b770b";
     const {id} = useParams(); 
     console.log("ID is " + id)
    useEffect(()=>
    {
         if(id)
            getSingleUserById(id)
    },[id])

    const getSingleUserById= (id)=>
    {
        console.log(" in getSingleUserById" + id);
       
    axios.get("http://localhost:8000/api/users/"+id)
    .then(response=>
    {
        console.log(response.data)
        setState({...response.data})
    })
    .catch(error=>
    {
         console.log("Error fetching data")
    })
    }
    
    const handleChange =(e)=>{
        let{name, value} = e.target;
        setState({...state, [name]:value})
            console.log("state is " + state)
        
    }
    const HandleSubmit = (e)=>
    {
        e.preventDefault();

        console.log("state " + state)
        if(!name || !email || !contact)
             alert("please provide details")
            else 
            {
                if(!id)
            {
            AddUser(state)
            }
            else 
            {
                UpdateUser(state,id)
            }

        }
    }
const AddUser = (user)=>
{
        axios.post("http://localhost:8000/api/users/add", user)
        .then((response)=>
        {
            console.log(response.data)
        })
    }
    
    
const UpdateUser = (user,id)=>
    {
        console.log("IN update")
            axios.put("http://localhost:8000/api/users/edit/"+id, user)
            .then((response)=>
            {
                console.log(response.data)
            })
        }
        
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
