import React from 'react'
import { Link } from 'react-router-dom'
export const Links = () => {
  return (
         <div style={{fontFamily:"Arial,sans-serif"}}>
            <nav
            style={{
                backgroundColor: "#333",
                padding:"10px",
                display:"flex",
                justifyContent:"center",
            }}> 
                <ul
                style={{
                    listStyle:"none",
                    display:"flex",
                    gap:"20px",
                    padding:"0",
                    margin:"0"

                }}>
                    <li> <Link to="/aboutus" style={linkStyles}> About Us </Link></li>
                    <li> <Link to="/contactus" style={linkStyles}> Contact Us </Link></li>
                    <li> <Link to="/users" style={linkStyles}> List of Users </Link></li>
                    <li> <Link to="/users/:id" style={linkStyles}> Get User </Link></li>
                 
                    <li> <Link to="/users/add" style={linkStyles}> Create User </Link></li>
                </ul>
            </nav>
        </div>
   )
}

const linkStyles={
    textDecoration :"none",
    color:"white",
    fontSize:"18px",
    fontWeight:"bold"
};