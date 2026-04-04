# findash

A finance dashboard I built for my internship application at Zorvyn. It's built with React + TypeScript + Vite and uses Recharts for the charts.

## What's in it

- Login page with role selection (Admin or Viewer)
- Summary cards showing balance, income, expenses
- Balance trend chart (area chart, last 6 months)
- Expense breakdown donut chart
- Transaction table with search + category filtering
- Role-based access — admins can add/delete transactions and export CSV, viewers are read-only
- Dark/light mode toggle

## Running it

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

## How the role system works

When you log in, you pick either Admin or Viewer. That gets stored in a React context (`AuthContext`). Components check `isAdmin` from that context to decide whether to show certain buttons or not.

Viewer users see a "View Only" badge in the sidebar and the Add/Delete/Export buttons are greyed out.

**Demo credentials:**

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@zorvyn.io | admin123 |
| Viewer | viewer@zorvyn.io | viewer123 |

Or just click the quick-fill buttons on the login page.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4
- Recharts
- Lucide React
- React Router v7
