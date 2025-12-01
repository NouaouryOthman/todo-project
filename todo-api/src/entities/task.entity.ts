import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TaskStatus } from "../dtos/task.enum";

@Entity("tasks")
export class TaskEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", nullable: false })
  title!: string;

  @Column({ type: "varchar", nullable: true })
  description!: string;

  @Column({ type: "enum", enum: TaskStatus, default: TaskStatus.TO_DO })
  status!: TaskStatus;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;
}
