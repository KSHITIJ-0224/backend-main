import { Router } from "express";
import {
  register,
  login,
  refresh,
  logout,
} from "../controllers/auth.controller";

const router = Router();

// Health check
router.get("/", (req, res) => {
  res.json({ message: "Auth routes working" });
});

// Combined auth endpoint - determine action based on query param
router.post("/", async (req, res) => {
  try {
    const { action } = req.query; // ?action=register, login, refresh, or logout
    
    if (action === "register") {
      return register(req, res);
    } else if (action === "login") {
      return login(req, res);
    } else if (action === "refresh") {
      return refresh(req, res);
    } else if (action === "logout") {
      return logout(req, res);
    } else {
      return res.status(400).json({ message: "Action required: ?action=register|login|refresh|logout" });
    }
  } catch (error) {
    console.error("Auth route error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
