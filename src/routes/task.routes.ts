import { Router } from "express";
import {
  createTask,
  getTasks,
  updateTask,
  toggleTask,
  deleteTask,
} from "../controllers/task.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// All task routes require authentication
router.use(authMiddleware);

// Get all tasks for the user
router.get("/", getTasks);

// Create a new task
router.post("/", createTask);

// Toggle task status (more specific route first)
router.patch("/:id/toggle", toggleTask);

// Update task title
router.patch("/:id", updateTask);

// Delete a task
router.delete("/:id", deleteTask);

export default router;
