import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import TaskCard from "../TaskCard";

vi.mock("../../../services/task.service", () => ({
  updateTask: vi.fn(),
  deleteTask: vi.fn(),
}));

describe("TaskCard", () => {
  let task;
  let setTasks;
  let allTasks;

  beforeEach(() => {
    task = {
      id: "1",
      title: "Test Task",
      description: "Test description",
      status: "TO_DO",
    };
    allTasks = [task];
    setTasks = vi.fn();
  });

  it("should render the task card with title and description", () => {
    render(<TaskCard task={task} setTasks={setTasks} allTasks={allTasks} />);

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();

    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it('should switch to edit mode when clicking the "Edit" button', () => {
    render(<TaskCard task={task} setTasks={setTasks} allTasks={allTasks} />);

    fireEvent.click(screen.getByText("Edit"));

    expect(screen.getByDisplayValue("Test Task")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test description")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it('should cancel editing when clicking "Cancel" in edit mode', () => {
    render(<TaskCard task={task} setTasks={setTasks} allTasks={allTasks} />);

    fireEvent.click(screen.getByText("Edit"));

    fireEvent.click(screen.getByText("Cancel"));

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
    expect(screen.queryByDisplayValue("Updated Task")).not.toBeInTheDocument();
    expect(
      screen.queryByDisplayValue("Updated description")
    ).not.toBeInTheDocument();
  });
});
