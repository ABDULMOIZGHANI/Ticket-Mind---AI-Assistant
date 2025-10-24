import express from "express";
import {
  signup,
  login,
  logout,
  updateUser,
  gertUser
} from "../controller/user.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

router.post("/update-user", authenticate, updateUser);
router.get("/users", authenticate, gertUser);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
