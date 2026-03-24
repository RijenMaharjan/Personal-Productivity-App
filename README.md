# Personal Productivity App

A full-stack Personal Productivity App featuring Tasks, Habits, and Notes. It uses a React + Vite frontend styled with Tailwind CSS, and a Node.js + Express backend powered by SQLite.

## Project Structure
- `backend/`: Node.js, Express, SQLite, TypeScript.
- `frontend/`: React, Vite, Tailwind CSS v4, Axios, React Router.

## Running Locally

### 1. Start the Backend
Open a terminal and run:
```bash
cd backend
npm install
npm run dev
```
The server will start on `http://localhost:5000` and automatically create the SQLite database file in `backend/db/database.sqlite`.

### 2. Start the Frontend
Open a new terminal window and run:
```bash
cd frontend
npm install
npm run dev
```
The React app will be available at `http://localhost:5173` (or the port Vite outputs).

### 3. Usage
- Open your browser to the frontend URL.
- Create Tasks, track Habits, and jot down Notes. Data corresponds directly to the API endpoints and is permanently saved in the local SQLite database.
- Toggle between Light and Dark mode using the button on the top right.

## Scaling Features (Optional)
To expand this app in the future:
1. **Authentication**: Add JWT-based auth and standard login endpoints. Add `user_id` to each model item.
2. **Chart Analytics**: Integrate `chart.js` or `recharts` to render a bar chart visualization of habit streaks directly in the Dashboard.
3. **Database Migration tool**: Move from standard `sqlite3` driver to an ORM like `Prisma` to manage scalable migrations and better typings schemas.
4. **Push Notifications**: Integrate Service Workers and Web Push to trigger notifications.
