import React, { useState } from "react";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import { useDroppable } from "@dnd-kit/core";

export default function TaskColumn({
  status,
  title,
  tasks,
  setTasks,
  allTasks,
}) {
  const [showForm, setShowForm] = useState(false);
  const { setNodeRef } = useDroppable({ id: status });

  const handleAdd = (newTask) => {
    setTasks([newTask, ...allTasks]);
    setShowForm(false);
  };

  return (
    <div
      ref={setNodeRef}
      className="bg-white rounded-xl shadow-md p-4 w-80"
      data-testid={status}
      id={status}
    >
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {status === "TO_DO" && (
        <button
          onClick={() => setShowForm(!showForm)}
          className="mt-4 text-blue-600 hover:underline"
        >
          {showForm ? "-" : "+"} Add Task
        </button>
      )}
      {showForm && <TaskForm onSubmit={handleAdd} />}
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          setTasks={setTasks}
          allTasks={allTasks}
        />
      ))}
    </div>
  );
}
