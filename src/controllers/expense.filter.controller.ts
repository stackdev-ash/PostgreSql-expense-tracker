import { Request, Response } from "express";
import { pool } from "../config/db";

export const searchExpenses = async (
  req: Request,
  res: Response
) => {
  try {
    const { title } = req.query;

    const result = await pool.query(
      `SELECT *
       FROM expenses
       WHERE title ILIKE $1`,
      [`%${title}%`]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({
      message: "Search failed",
    });
  }
};

export const filterExpenses = async (
  req: Request,
  res: Response
) => {
  try {
    const { category } = req.query;

    const result = await pool.query(
      `SELECT *
       FROM expenses
       WHERE category = $1`,
      [category]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({
      message: "Filter failed",
    });
  }
};

export const sortExpenses = async (
  req: Request,
  res: Response
) => {
  try {
    const { order } = req.query;

    const query =
      order === "asc"
        ? `SELECT * FROM expenses ORDER BY amount ASC`
        : `SELECT * FROM expenses ORDER BY amount DESC`;

    const result = await pool.query(query);

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({
      message: "Sorting failed",
    });
  }
};

export const paginateExpenses = async (
  req: Request,
  res: Response
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const offset = (page - 1) * limit;

    const result = await pool.query(
      `SELECT *
       FROM expenses
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({
      message: "Pagination failed",
    });
  }
};

export const getExpenseStats = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await pool.query(`
      SELECT
        COUNT(*) AS total_expenses,
        SUM(amount) AS total_amount,
        AVG(amount) AS average_amount,
        MAX(amount) AS highest_expense,
        MIN(amount) AS lowest_expense
      FROM expenses
    `);

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Stats failed",
    });
  }
};

export const categoryAnalytics = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await pool.query(`
      SELECT
        category,
        COUNT(*) AS total_transactions,
        SUM(amount) AS total_spent,
        AVG(amount) AS average_spent
      FROM expenses
      GROUP BY category
      ORDER BY total_spent DESC
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({
      message: "Analytics failed",
    });
  }
};