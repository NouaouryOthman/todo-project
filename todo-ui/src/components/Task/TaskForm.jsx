import { useState } from "react";
import { addTask } from "../../services/task.service";

export default function TaskForm({ onSubmit }) {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (event) => {
    console.log(isAdding);
    setIsAdding(true);
    console.log(isAdding);
    const newTask = { ...formData };
    event.preventDefault();

    addTask(newTask).then(({ data }) => {
      onSubmit({ ...data })
      setIsAdding(false)
    }).catch(error => {
      console.error(`Failed to add Task: ${error}`);
      setIsAdding(false);
    })
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
      <button type="submit" className="text-green-600 text-sm disabled:text-gray-500" disabled={isAdding}>
        Add Task
      </button>
    </form>
  );
}
