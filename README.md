# PostgreSQL Expense Tracker API

A simple Expense Tracker REST API built with Node.js, Express, TypeScript, and PostgreSQL.

## Features

* Create Expense
* Get All Expenses
* Get Expense By ID
* Update Expense
* Delete Expense
* Search Expenses
* Filter By Category
* Sort Expenses
* Pagination
* Expense Statistics
* Category Analytics

## Tech Stack

* Node.js
* Express.js
* TypeScript
* PostgreSQL
* pg

## Installation

```bash
git clone <repository-url>
cd postgresql-expense-tracker

npm install
```

Create a `.env` file:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/expense_tracker
PORT=5000
```

Run the server:

```bash
npm run dev
```

## API Endpoints

| Method | Endpoint                          |
| ------ | --------------------------------- |
| POST   | /expenses                         |
| GET    | /expenses                         |
| GET    | /expenses/:id                     |
| PUT    | /expenses/:id                     |
| DELETE | /expenses/:id                     |
| GET    | /expenses/search?title=keyword    |
| GET    | /expenses/filter?category=food    |
| GET    | /expenses/sort?order=asc          |
| GET    | /expenses/paginate?page=1&limit=5 |
| GET    | /expenses/stats                   |
| GET    | /expenses/analytics/category      |

## Learning Outcomes

This project helped me learn:

* PostgreSQL CRUD Operations
* SQL Queries
* Filtering & Searching
* Sorting & Pagination
* Aggregate Functions
* GROUP BY Queries
* Express + PostgreSQL Integration
* TypeScript Backend Development

```
```
