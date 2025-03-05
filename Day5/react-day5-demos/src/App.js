import logo from './logo.svg';
import './App.css';
import {UseStateComp} from './UseStateComp';
import {UseReducerComp} from './UseReducerComp';
import { ParentComp } from './ParentComp';
function App() {
  return (
    <div className="App">
     
     {/* <UseStateComp /> */}
     {/* <UseReducerComp/> */}
     <ParentComp/>
    </div>
  );
}

export default App;
