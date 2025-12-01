import { NotFound } from "http-errors";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Repository } from "typeorm";
import { TaskEntity } from "../../entities/task.entity";
import { TaskService } from "../task.service";
import { TaskStatus } from "../../dtos/task.enum";

const produceTask = () => {
  return {
    id: "test Id",
    title: "test name",
    description: "test description",
    status: TaskStatus.TO_DO,
    createdAt: new Date(),
  };
};

const mockRepository = {
  create: vi.fn(),
  save: vi.fn(),
  find: vi.fn(),
  delete: vi.fn(),
  exists: vi.fn(),
};

const mockDataSource = {
  getRepository: vi.fn().mockImplementation(() => mockRepository),
};

describe("Task Service", () => {
  let service: TaskService;

  let mockTaskRepo: Repository<TaskEntity>;

  beforeEach(() => {
    vi.clearAllMocks();

    mockTaskRepo = mockDataSource.getRepository(TaskEntity);

    service = new TaskService(mockTaskRepo);
  });

  it("should return all tasks", async () => {
    const mockTasks = [produceTask()];

    vi.mocked(mockTaskRepo.find).mockResolvedValue(mockTasks);

    expect(service.getTasks()).resolves.toEqual(mockTasks);
  });

  it("should create a task", async () => {
    const task = produceTask();

    vi.mocked(mockTaskRepo.create).mockReturnValue(task);
    vi.mocked(mockTaskRepo.save).mockResolvedValue(task);

    expect(service.upsertTask(task)).resolves.toStrictEqual(task);
    expect(mockTaskRepo.create).toHaveBeenCalledWith({
      ...task,
      id: undefined,
    });
    expect(mockTaskRepo.save).toHaveBeenCalledWith(task);
  });

  it("should update a task", async () => {
    const task = produceTask();

    vi.mocked(mockTaskRepo.create).mockReturnValue(task);
    vi.mocked(mockTaskRepo.save).mockResolvedValue(task);

    vi.mocked(mockTaskRepo.exists).mockResolvedValue(true);

    await expect(service.upsertTask(task, task.id)).resolves.toStrictEqual(
      task
    );

    expect(mockTaskRepo.create).toHaveBeenCalledWith({
      ...task,
      id: task.id,
    });

    expect(mockTaskRepo.save).toHaveBeenCalledWith({ ...task });
  });

  it("should delete task if it exists", async () => {
    const id = "123";
    vi.mocked(mockTaskRepo.exists).mockResolvedValue(true);
    vi.mocked(mockTaskRepo.delete).mockResolvedValue({ raw: "", affected: 1 });

    await service.deleteTask(id);

    expect(mockTaskRepo.delete).toHaveBeenCalledWith(id);
  });

  it("should throw if task doesn't exist when upserting", async () => {
    (mockTaskRepo.exists as any).mockResolvedValue(false);

    expect(service.upsertTask(produceTask(), "123")).rejects.toThrow(NotFound);
  });

  it("should throw if task doesn't exist when deleting", async () => {
    (mockTaskRepo.exists as any).mockResolvedValue(false);

    expect(service.deleteTask("123")).rejects.toThrow(NotFound);
  });
});
