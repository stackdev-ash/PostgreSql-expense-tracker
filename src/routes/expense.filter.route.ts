import { Router } from "express";
import {
  searchExpenses,
  filterExpenses,
  sortExpenses,
  paginateExpenses,
  getExpenseStats,
  categoryAnalytics
} from "../controllers/expense.filter.controller";

const router = Router();

router.get("/search", searchExpenses);

router.get("/filter", filterExpenses);

router.get("/sort", sortExpenses);

router.get("/paginate", paginateExpenses);

router.get("/stats", getExpenseStats);

router.get("/analytics/category", categoryAnalytics);

export default router;