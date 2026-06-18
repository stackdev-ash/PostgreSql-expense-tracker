import { Request, Response } from "express";
import { pool } from "../config/db";

export const getUser = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM users");

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch user",
    });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM users WHERE u_id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch user",
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { fname, lname, email } = req.body;

    if (!fname || !lname || !email) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO users(fname,lname,email)
       VALUES($1,$2,$3)
       RETURNING *`,
      [fname, lname, email],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create user",
    });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const { fname, lname, email } = req.body;

    const result = await pool.query(
      `UPDATE users
       SET fname = $1,
           lname = $2,
           email = $3
       WHERE u_id = $4
       RETURNING *`,
      [fname, lname, email, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update user",
    });
  }
};


export const deleteUser = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM users
       WHERE u_id = $1
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    res.status(200).json({
      message: "user deleted",
      user: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete user",
    });
  }
};