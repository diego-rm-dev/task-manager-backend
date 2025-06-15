import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { TaskService } from "../services/task.service";
import Task from "../models/task.model";

const router = Router();
const taskController = new TaskController(new TaskService(Task));

router.post("/", taskController.createTask);
router.get("/:id", taskController.findTaskById);
router.get("/", taskController.findAllTasks);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);
                        
export default router;