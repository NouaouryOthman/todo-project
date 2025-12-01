import express from "express";
import cors from "cors";
import taskRoutes from "./routes/task.routes";
import dotenv from "dotenv";
import { AppDataSource } from "./database/data-source";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { notFoundHandler } from "./middlewares/notFound.middleware";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/tasks", taskRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const port = Number(process.env["PORT"]) || 8080;

AppDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log("Server running on http://localhost:8080");
    });
  })
  .catch((err) => console.error("DB connection error", err));
