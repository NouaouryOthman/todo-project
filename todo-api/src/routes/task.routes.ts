import { Router } from "express";
import {
  deleteTask,
  getTask,
  getTasks,
  upsertTask,
} from "../controllers/task.controller";
import { validate } from "../middlewares/validate.middleware";
import { createTaskSchema, idParamSchema } from "../dtos/task.schema";

const router = Router();

router.post("/", validate(createTaskSchema), upsertTask);
router.get("/", getTasks);
router.get("/:id", validate(idParamSchema, "params"), getTask)
router.put(
  "/:id",
  validate(idParamSchema, "params"),
  validate(createTaskSchema),
  upsertTask
);
router.delete("/:id", validate(idParamSchema, "params"), deleteTask);

export default router;
