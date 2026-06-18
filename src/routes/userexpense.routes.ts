import { Router } from "express";
import {
  getExpensesWithUsers,
  getUserAnalytics,
  getUserExpenses,
  getUserSummary
} from "../controllers/userexpense.controller";

const router = Router();

router.get("/analytics/spending", getUserAnalytics);

router.get("/with-users", getExpensesWithUsers);

router.get("/:id/summary", getUserSummary);

router.get("/:id/expenses", getUserExpenses);

export default router;
