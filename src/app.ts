import express from 'express'
import cors from 'cors'

import expenseRoutes from "./routes/expense.routes";
import expenseFilterRoutes from "./routes/expense.filter.route";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/expenses", expenseRoutes);
app.use("/expense", expenseFilterRoutes);

export default app;