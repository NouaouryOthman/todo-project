import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import TaskBoard from "../TaskBoard";
import { updateTask } from "../../../services/task.service";

vi.mock("../../../services/task.service", () => ({
  updateTask: vi.fn(),
}));

describe("TaskBoard", () => {
  let tasks;
  let setTasks;

  beforeEach(() => {
    tasks = [
      { id: "1", title: "Task 1", status: "TO_DO" },
      { id: "2", title: "Task 2", status: "IN_PROGRESS" },
      { id: "3", title: "Task 3", status: "DONE" },
    ];
    setTasks = vi.fn();
  });

  it("should render the TaskBoard with columns", () => {
    render(<TaskBoard tasks={tasks} setTasks={setTasks} />);

    expect(screen.getByText("To Do")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.getByText("Task 3")).toBeInTheDocument();
  });

  it("should update task status after drag and drop", async () => {
    render(<TaskBoard tasks={tasks} setTasks={setTasks} />);

    const todoTask = screen.getByTestId("TO_DO-1");

    fireEvent.pointerDown(todoTask, { clientX: -340, clientY: 32 });
    console.log(todoTask);
    fireEvent.pointerMove(window, { clientX: 336, clientY: -47 });
    fireEvent.pointerUp(window);

    console.log(todoTask.parentElement.id);
  });

  it("should not update task status if over status is the same as active status", async () => {
    render(<TaskBoard tasks={tasks} setTasks={setTasks} />);

    const todoTask = screen.getByText("Task 1");
    const todoColumn = screen.getByText("To Do");

    fireEvent.dragStart(todoTask);
    fireEvent.dragOver(todoColumn);
    fireEvent.drop(todoColumn);

    expect(updateTask).not.toHaveBeenCalled();
    expect(setTasks).not.toHaveBeenCalled();
  });
});
