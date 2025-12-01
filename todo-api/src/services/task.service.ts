import { Repository } from "typeorm";
import { TaskDto } from "../dtos/task.dto";
import { TaskEntity } from "../entities/task.entity";
import { NotFound } from "http-errors";

export class TaskService {
  constructor(private readonly _taskRepo: Repository<TaskEntity>) {}

  async upsertTask(task: TaskDto, id?: string) {
    if (id) {
      await this.checkTaskExists(id);
    }

    const createTask = this._taskRepo.create({ ...task, id });
    return this._taskRepo.save(createTask);
  }

  getTasks() {
    return this._taskRepo.find({ order: { createdAt: "DESC" } });
  }

  async getTask(id: string) {
    await this.checkTaskExists(id);
    return this._taskRepo.findOneBy({ id });
  }

  async deleteTask(id: string) {
    await this.checkTaskExists(id);
    await this._taskRepo.delete(id);
  }

  private async checkTaskExists(id: string) {
    const exists = await this._taskRepo.exists({ where: { id } });

    if (!exists) throw NotFound(JSON.stringify(`Task with ID ${id} not found`));
  }
}
