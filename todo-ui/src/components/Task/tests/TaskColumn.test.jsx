import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import TaskColumn from "../TaskColumn";

describe("TaskColumn", () => {
  let tasks;
  let setTasks;
  let allTasks;

  beforeEach(() => {
    tasks = [
      {
        id: "1",
        title: "Task 1",
        description: "Description 1",
        status: "TO_DO",
      },
      {
        id: "2",
        title: "Task 2",
        description: "Description 2",
        status: "TO_DO",
      },
    ];
    allTasks = tasks;
    setTasks = vi.fn();
  });

  it("should render the column with the tasks", () => {
    render(
      <TaskColumn
        status="TO_DO"
        title="To Do"
        tasks={tasks}
        setTasks={setTasks}
        allTasks={allTasks}
      />
    );

    expect(screen.getByText("To Do")).toBeInTheDocument();
  });
});
