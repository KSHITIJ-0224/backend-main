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

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;
