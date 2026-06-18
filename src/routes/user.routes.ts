import { Router } from "express";
import {
  getUser,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/user.controller";

const router = Router();

router.get("/", getUser);

router.get("/:id", getUserById);

router.post("/", createUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
