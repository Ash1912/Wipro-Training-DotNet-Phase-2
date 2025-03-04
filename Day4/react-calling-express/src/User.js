import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';
export const User = () => {
 const[users, setUsers] = useState([]);
 const navigate =  useNavigate();
 useEffect(()=>
{
    axios.get("http://localhost:8000/api/users")
    .then(response=>
    {
        console.log(response.data)
         setUsers(response.data)
    })
    .catch(error=>
    {
         console.log("Error fetching data")
    }
    )
},[])

  const DeleteUser = (id)=>
  {
    axios.delete("http://localhost:8000/api/users/delete/"+ id)
    .then(response=>
    {
      console.log(response.data)
    }
    )
  }
  const EditUser = (id)=>
    {
      navigate("/edituser/"+id);
    }
    return  (
    <div> <h1>List of Users </h1>
    <table className='table table-success table-striped'>
      <thead>
      <th> Name </th>
      <th> EMail </th>
      <th> Contact Number </th>
      <th> </th>
      <th> </th>
      </thead> 
      <tbody>
        {users.map(user=>(
          
            <tr>
              <td> {user.name} </td>
              <td> {user.email} </td>
              <td> {user.contact} </td>
              <td> <button type="button" onClick={()=>DeleteUser(user.id)} className='btn btn-danger'> Delete User </button></td>
              <td> <button type="button" onClick={()=>EditUser(user.id)} className='btn btn-success'> Edit User </button></td>
     
            </tr>
          )
        )}  
      </tbody> 
      </table> </div>
  )
}
