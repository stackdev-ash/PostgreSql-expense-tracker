import app from "./app";
import { pool } from './config/db';

const PORT = process.env.PORT || 8000;

async function startServer() {
  try {
    const result = await pool.query("SELECT NOW()");

    console.log("Database Connected");
    console.log(result.rows);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database Connection Failed:", error);
  }
}

startServer();