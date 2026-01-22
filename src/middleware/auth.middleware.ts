import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.slice(7);

  try {
    const payload = jwt.verify(token, process.env.ACCESS_SECRET!) as any;
    (req as any).userId = payload.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
