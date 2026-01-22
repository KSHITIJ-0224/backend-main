import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "https://frontend-sepia-gamma-35.vercel.app",
    ],
    credentials: true,
  })
);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Backend is running!", version: "1.0.0" });
});

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

export default app;
