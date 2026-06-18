import express from 'express'
import cors from 'cors'

import expenseRoutes from "./routes/expense.routes";
import expenseFilterRoutes from "./routes/expense.filter.route";
import userRoutes from './routes/user.routes';
import userExpenseRoutes from './routes/userexpense.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/expenses", expenseRoutes);
app.use("/expenses", expenseFilterRoutes);

app.use("/users", userExpenseRoutes);
app.use("/users", userRoutes);

export default app;