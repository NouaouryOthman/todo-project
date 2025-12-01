import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { TaskEntity } from "../entities/task.entity";
import { Migration1764580294081 } from "./migrations/1764580294081-Migration";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env["DB_HOST"],
  url: process.env["DB_URL"],
  port: Number(process.env["DB_PORT"]) || 5432,
  username: process.env["DB_USERNAME"],
  password: process.env["DB_PASSWORD"],
  database: process.env["DB_NAME"],
  synchronize: false,
  logging: false,
  entities: [TaskEntity],
  migrations: [Migration1764580294081],
});
