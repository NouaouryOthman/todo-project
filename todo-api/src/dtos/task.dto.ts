import { TaskStatus } from "./task.enum";

export interface TaskDto {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}
