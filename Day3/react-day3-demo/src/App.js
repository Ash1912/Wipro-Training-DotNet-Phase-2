import logo from './logo.svg';
import './App.css';
import ControlledComp from './ControlledComp';
import Add1 from './Add1';
import UserForm from './UserForm';
import UnContrlledComp   from './UnContrlledComp';
import UserForm2 from './UserForm2';
import FetchApiDemo from './FetchApiDemo';
import Create from './Create';
import AxiosGet  from './AxiosGet';
import AxiosCreate from './AxiosCreate'
function App() {
  return (
    <div className="App">
      {/* <ControlledComp/> */}
      {/* <Add1/> */}
      {/* <UserForm/> */}
      {/* <UnContrlledComp/> */}
      {/* <UserForm2/> */}
      {/* <FetchApiDemo />
      <Create/> */}
      <AxiosGet/>
      <AxiosCreate/>
    </div>
  );
}

// we call service in 2 ways 
// 1. SYNCHRONOUS , blocking mode 
// 2. ASYNCH , CALLBACK METHODS , non-blocking mode
// 1. xhr, promises, fetchapi, async await  

export default App;
