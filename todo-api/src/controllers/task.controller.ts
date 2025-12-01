import { Request, Response } from "express";
import { TaskService } from "../services/task.service";
import { AppDataSource } from "../database/data-source";
import { TaskEntity } from "../entities/task.entity";

const taskRepo = AppDataSource.getRepository(TaskEntity);
const taskService = new TaskService(taskRepo);

export const upsertTask = async (req: Request, res: Response) => {
  const task = await taskService.upsertTask(req.body, req.params.id);
  const statusCode = req.params.id ? 200 : 201;
  res.status(statusCode).json(task);
};

export const getTasks = async (_: Request, res: Response) => {
  const tasks = await taskService.getTasks();
  res.status(200).json(tasks);
};

export const getTask = async (req: Request, res: Response) => {
  const task = await taskService.getTask(req.params.id);
  res.status(200).json(task);
};

export const deleteTask = async (req: Request, res: Response) => {
  await taskService.deleteTask(req.params.id);
  res.status(204).end();
};

export const updateTask = async (req: Request, res: Response) => {
  const tasks = await taskService.upsertTask(req.body, req.params.id);
  res.status(200).json(tasks);
};
