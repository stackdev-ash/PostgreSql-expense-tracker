import { Request, Response } from "express";
import { pool } from "../config/db";

export const getExpenses = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM expenses");

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch expenses",
    });
  }
};

export const getExpenseById = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM expenses WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch expense",
    });
  }
};

export const createExpense = async (req: Request, res: Response) => {
  try {
    const { title, amount, category } = req.body;

    if (!title || !amount || !category) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO expenses(title,amount,category)
       VALUES($1,$2,$3)
       RETURNING *`,
      [title, amount, category],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create expense",
    });
  }
};

export const updateExpense = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const { title, amount, category } = req.body;

    const result = await pool.query(
      `UPDATE expenses
       SET title = $1,
           amount = $2,
           category = $3
       WHERE id = $4
       RETURNING *`,
      [title, amount, category, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update expense",
    });
  }
};

export const deleteExpense = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM expenses
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.status(200).json({
      message: "Expense deleted",
      expense: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete expense",
    });
  }
};