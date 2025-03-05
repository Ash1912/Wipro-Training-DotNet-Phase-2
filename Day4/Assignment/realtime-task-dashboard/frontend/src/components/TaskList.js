import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const { tasks, notification } = useContext(TaskContext);

  return (
    <div className="task-list">
      {notification && <p className="notification">{notification}</p>}
      {tasks.length ? (
        tasks.map((task) => <TaskItem key={task.id} task={task} />)
      ) : (
        <p className="empty-message">No tasks available. Add a new task!</p>
      )}
    </div>
  );
};

export default TaskList;