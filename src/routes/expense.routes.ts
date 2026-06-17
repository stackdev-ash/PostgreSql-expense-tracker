import { Router } from "express";
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpenseById,
} from "../controllers/expense.controller";

const router = Router();

router.get("/", getExpenses);

router.get("/:id", getExpenseById);

router.post("/", createExpense);

router.put("/:id", updateExpense);

router.delete("/:id", deleteExpense);

export default router;
