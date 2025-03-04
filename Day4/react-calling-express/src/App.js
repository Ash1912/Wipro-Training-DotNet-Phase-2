import logo from './logo.svg';
import './App.css';
import {AddUser} from './AddUser';
import { User } from './User';
import {AddEditUser} from './AddEditUser';

function App() {
  return (
    <div className="App">
      <User/>
      {/* <AddUser/> */}
      <AddEditUser/>
    </div>
  );
}

export default App;
