import { Request, Response } from "express";
import { pool } from "../config/db";

export const getUserExpenses = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT *
       FROM expenses
       WHERE u_id = $1`,
      [id]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch user expenses",
    });
  }
};

export const getUserAnalytics = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await pool.query(`
      SELECT
      u.u_id,
      u.fname,
      u.lname,
      COUNT(e.e_id) AS total_transactions,
      SUM(e.amount) AS total_spent
      FROM users u
      INNER JOIN expenses e
      ON u.u_id = e.u_id
      GROUP BY u.u_id,u.fname,u.lname
      ORDER BY total_spent DESC
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch analytics",
    });
  }
};

export const getExpensesWithUsers = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await pool.query(`
      SELECT
      e.e_id,
      e.title,
      e.amount,
      e.category,
      u.u_id,
      u.fname,
      u.lname,
      u.email
      FROM expenses e
      INNER JOIN users u
      ON e.u_id = u.u_id
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch expenses",
    });
  }
};

export const getUserSummary = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT
      u.u_id,
      u.fname,
      u.lname,
      COUNT(e.e_id) AS total_transactions,
      COALESCE(SUM(e.amount), 0) AS total_spent
      FROM users u
      LEFT JOIN expenses e
      ON u.u_id = e.u_id
      WHERE u.u_id = $1
      GROUP BY u.u_id, u.fname, u.lname
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch user summary",
    });
  }
};