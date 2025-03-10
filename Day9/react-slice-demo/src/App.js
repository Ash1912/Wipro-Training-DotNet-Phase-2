import logo from './logo.svg';
import './App.css';
import {ContactUs}  from './ContactUs';
import {AboutUs} from './AboutUs';
import { Links } from './Links';
import { Shop } from './Shop';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
