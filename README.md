# findash

A finance dashboard I built for my internship application at Zorvyn. Built with React + TypeScript + Vite, using Recharts for charts and Tailwind CSS v4 for styling.

## What's in it

- Login page with role selection (Admin or Viewer)
- Summary cards showing balance, income, expenses with trend indicators
- Balance trend chart (area chart, last 6 months)
- Expense breakdown donut chart
- Transaction table with search + category filtering + column sorting
- Role-based access — admins can add/delete transactions and export CSV, viewers are read-only
- Dark/light mode toggle
- Mobile responsive sidebar (collapses to a drawer)

## Running it

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`. Use the quick-fill buttons on the login page to demo both roles.

## Demo credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@zorvyn.io | admin123 |
| Viewer | viewer@zorvyn.io | viewer123 |

## How the role system works

When you log in, you pick Admin or Viewer. That choice gets stored in a React context (`AuthContext`). Every component that needs to gate something just reads `isAdmin` from that context — no libraries needed, just a simple boolean.

Viewer users see a "View Only" badge in the sidebar and the Add/Delete/Export buttons are greyed out and disabled.

## Technical decisions and things I ran into

**Recharts responsiveness** — Getting the charts to actually resize on small screens took me a bit. I had to wrap everything in `<ResponsiveContainer>` and set fixed heights instead of percentages. The donut chart especially was finicky with the center label overlay (positioned absolute inside a relative wrapper).

**verbatimModuleSyntax in tsconfig** — Vite's default tsconfig has `verbatimModuleSyntax: true` which means you can't import a TypeScript `type` the same way you import a value. Every interface/type has to use `import type { ... }` or you get a runtime module error. Took me a bit to figure out why the app was erroring.

**Dark mode** — I went with Tailwind's class-based dark mode (adding/removing the `dark` class on `<html>`) rather than `prefers-color-scheme` so the user can toggle it manually without it resetting on reload. Default is dark since it looks better for a finance dashboard.

**Why Context and not Zustand** — I started with Zustand but realized the state is simple enough that a basic React context works fine. No need to add another dependency for something this straightforward.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4
- Recharts
- Lucide React
- React Router v7
