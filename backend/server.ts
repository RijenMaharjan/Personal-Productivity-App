import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDb } from './utils/db';

import taskRoutes from './routes/tasks';
import habitRoutes from './routes/habits';
import noteRoutes from './routes/notes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Initialize Database
initDb();

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/notes', noteRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date() });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
