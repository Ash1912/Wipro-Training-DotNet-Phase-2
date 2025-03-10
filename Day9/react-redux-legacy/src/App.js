import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { AboutUs } from './AboutUs';
import { ContactUs } from './ContactUs';
import { Shop } from './Shop';

import {Links}  from './Links';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Links/>
      <Routes>
        <Route path="/aboutus" element={<AboutUs/>}/>
        
        <Route path="/contactus" element={<ContactUs/>}/>
        
        <Route path="/shop" element={<Shop/>}/>
        </Routes></BrowserRouter>
         </div>
  );
}

export default App;
