import { mixed, object, string } from "yup";
import { TaskStatus } from "./task.enum";

export const createTaskSchema = object({
  title: string().required(),
  description: string().optional().nullable(),
  status: mixed<TaskStatus>().optional(),
});

export const idParamSchema = object({
  id: string().uuid().required(),
});
