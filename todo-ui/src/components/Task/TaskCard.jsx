import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { deleteTask, updateTask } from "../../services/task.service";
import toaster from "react-hot-toast";

export default function TaskCard({ task, setTasks, allTasks }) {
  const [isEditing, setIsEditing] = useState(false);

  const [edited, setEdited] = useState({
    id: task.id,
    title: task.title,
    description: task.description,
  });

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: task,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  const handleUpdate = () => {
    updateTask(task.id, { ...task, ...edited })
      .then(() => {
        const updated = allTasks.map((t) =>
          t.id === task.id ? { ...t, ...edited } : t
        );
        toaster.success("Task updated successfully!");
        setTasks(updated);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error(error);
        toaster.error("Failed to update task.");
      });
  };

  const handleDelete = () => {
    deleteTask(task.id)
      .then(() => {
        setTasks((oldTasks) => oldTasks.filter((t) => t.id !== task.id));
        toaster.success("Task deleted successfully!");
      })
      .catch((error) => {
        toaster.error("Failed to delete task.");
        console.error(error);
      });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-gray-100 rounded-md p-2 mb-2"
      data-testid={task.status + "-" + task.id}
    >
      {isEditing ? (
        <>
          <input
            className="w-full mb-1 p-1 border"
            value={edited.title}
            onChange={(e) => setEdited({ ...edited, title: e.target.value })}
          />
          <textarea
            className="w-full mb-1 p-1 border"
            value={edited.description}
            onChange={(e) =>
              setEdited({ ...edited, description: e.target.value })
            }
          />
          <button
            onClick={handleUpdate}
            className="text-green-600 text-sm mr-2"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="text-gray-600 text-sm"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <h3 className="font-semibold">{task.title}</h3>
          <p className="text-sm text-gray-600">{task.description}</p>
          <div className="mt-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 text-sm mr-2"
            >
              Edit
            </button>
            <button onClick={handleDelete} className="text-red-600 text-sm">
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
