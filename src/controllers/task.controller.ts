import { Request, Response } from "express";
import prisma from "../utils/prisma";

export const createTask = async (req: Request, res: Response) => {
  const { title } = req.body;
  const userId = (req as any).userId;

  if (!title || !title.trim()) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const task = await prisma.task.create({
      data: {
        title: title.trim(),
        userId,
      },
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to create task" });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { page = "1", limit = "5", search = "", status = "all" } = req.query;

  const pageNum = Math.max(1, parseInt(page as string) || 1);
  const limitNum = Math.min(100, Math.max(1, parseInt(limit as string) || 5));
  const skip = (pageNum - 1) * limitNum;

  try {
    const where: any = { userId };

    if (search && typeof search === "string" && search.trim()) {
      where.title = {
        contains: search.trim(),
      };
    }

    if (status && status !== "all") {
      where.status = status as string;
    }

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { id: "desc" },
      }),
      prisma.task.count({ where }),
    ]);

    res.json({
      tasks,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const { title } = req.body;

  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) },
    });

    if (!task || task.userId !== userId) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { title: title.trim() },
    });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Failed to update task" });
  }
};

export const toggleTask = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) },
    });

    if (!task || task.userId !== userId) {
      return res.status(404).json({ message: "Task not found" });
    }

    const newStatus = task.status === "pending" ? "done" : "pending";

    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { status: newStatus },
    });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Failed to toggle task" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) },
    });

    if (!task || task.userId !== userId) {
      return res.status(404).json({ message: "Task not found" });
    }

    await prisma.task.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
};
