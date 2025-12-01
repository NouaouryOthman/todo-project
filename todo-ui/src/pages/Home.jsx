import { useEffect, useState } from "react";
import TaskBoard from "../components/Task/TaskBoard";
import { getTasks } from "../services/task.service";
import logo from "../assets/renault-logo.png";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks().then(({ data }) => {
      setTasks(data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="flex items-center space-x-4 mb-6">
        <img src={logo} alt="logo" className="h-16 w-auto" />
        <h1 className="text-4xl font-bold text-gray-800">Task Manager</h1>
      </div>

      <TaskBoard tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
