import { updateTask } from "../../services/task.service";
import TaskColumn from "./TaskColumn";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

const COLUMNS = [
  { title: "To Do", status: "TO_DO" },
  { title: "In Progress", status: "IN_PROGRESS" },
  { title: "Done", status: "DONE" },
];

export default function TaskBoard({ tasks, setTasks }) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.data.current.status === over.id) return;

    updateTask(active.id, { ...active.data.current, status: over.id }).then(
      () => {
        const updatedTasks = tasks.map((task) =>
          task.id === active.id ? { ...task, status: over.id } : task
        );
        setTasks(updatedTasks);
      }
    );
  };

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <div className="flex gap-4 justify-center">
        {COLUMNS.map((col) => (
          <TaskColumn
            key={col.status}
            status={col.status}
            title={col.title}
            tasks={tasks.filter((task) => task.status === col.status)}
            setTasks={setTasks}
            allTasks={tasks}
          />
        ))}
      </div>
    </DndContext>
  );
}
