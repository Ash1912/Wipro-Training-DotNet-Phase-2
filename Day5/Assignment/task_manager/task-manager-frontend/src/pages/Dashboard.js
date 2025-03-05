import TaskForm from "../components/AddTask";
import TaskList from "../components/TaskList";

const Dashboard = () => {
  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h2 className="text-center">Task Manager</h2>
        <TaskForm />
        <TaskList />
      </div>
    </div>
  );
};

export default Dashboard;
