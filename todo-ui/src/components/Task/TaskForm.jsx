import { useState } from "react";
import { addTask } from "../../services/task.service";

export default function TaskForm({ onSubmit }) {
  const [formData, setFormData] = useState({ title: "", description: "" });

  const handleSubmit = () => {
    const newTask = { ...formData };

    addTask(newTask).then(({ data }) => onSubmit({ ...data }));
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <input
        required
        className="w-full mb-1 p-1 border"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <textarea
        className="w-full mb-1 p-1 border"
        placeholder="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
      <button type="submit" className="text-green-600 text-sm">
        Add Task
      </button>
    </form>
  );
}
