import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { FaSun, FaMoon } from "react-icons/fa";

const App = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);
  
  return (
    <div className="container">
      <div className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? <FaMoon size={24} /> : <FaSun size={24} />}
      </div>
      <h1>Task Dashboard</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default App;