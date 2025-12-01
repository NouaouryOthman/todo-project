import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { addTask } from "../../../services/task.service";
import TaskForm from "../TaskForm";

vi.mock("../../../services/task.service", () => ({
  addTask: vi.fn(),
}));

describe("TaskForm", () => {
  let onSubmit;

  beforeEach(() => {
    onSubmit = vi.fn();
    addTask.mockResolvedValue({
      data: { id: "1", title: "Test Task", description: "Test description" },
    });
  });

  it("should render the form with title and description inputs", () => {
    render(<TaskForm onSubmit={onSubmit} />);

    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
    expect(screen.getByText("Add Task")).toBeInTheDocument();
  });

  it("should update the form data when inputs are changed", () => {
    render(<TaskForm onSubmit={onSubmit} />);

    const titleInput = screen.getByPlaceholderText("Title");
    const descriptionInput = screen.getByPlaceholderText("Description");

    fireEvent.change(titleInput, { target: { value: "New Task" } });
    fireEvent.change(descriptionInput, {
      target: { value: "New Task Description" },
    });

    expect(titleInput.value).toBe("New Task");
    expect(descriptionInput.value).toBe("New Task Description");
  });

  it("should call the `onSubmit` function with the correct task data when form is submitted", async () => {
    render(<TaskForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "New Task" },
    });
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "New Task Description" },
    });

    fireEvent.click(screen.getByText("Add Task"));

    await waitFor(() => {
      expect(addTask).toHaveBeenCalledWith({
        title: "New Task",
        description: "New Task Description",
      });
      expect(onSubmit).toHaveBeenCalledWith({
        id: "1",
        title: "Test Task",
        description: "Test description",
      });
    });
  });

  it("should not call `onSubmit` if the form is invalid", async () => {
    render(<TaskForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "Task Description" },
    });

    fireEvent.click(screen.getByText("Add Task"));

    await waitFor(() => {
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });
});
