import React from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import { Links } from './Links'
import { AboutUs } from './AboutUs'
import { ContactUs } from './ContactUs'
import { User } from './User'
import { AddEditUser } from './AddEditUser'

export const App1 = () => {
  return (
    <div> 
        <BrowserRouter>
        <div style={{fontFamily:"Arial,sans-serif"}}>
            <nav
            style={{
                backgroundColor: "#333",
                padding:"10px",
                display:"flex",
                justifyContent:"center",
            }}></nav>
        <Links/>
        <div style={
            {
                display:"flex",
                justifyContent:"center",
                padding:"20px"}}
            
        >
            
          <Routes>
            <Route path="/aboutus" element={<AboutUs/>}></Route>
            <Route path="/contactus" element={<ContactUs/>}></Route>
            <Route path='/users' element={<User/>}></Route>
            <Route path='/edituser/:id' element={<AddEditUser/>}></Route>
            <Route path='/users/add' element={<AddEditUser/>}></Route>
          </Routes>
          </div>
        
          </div>
        </BrowserRouter>
    </div>
  )
}
