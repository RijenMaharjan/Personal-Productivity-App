import { Request, Response } from 'express';
import { TaskModel } from '../models/taskModel';

export const getTasks = (req: Request, res: Response) => {
    TaskModel.getAll((err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

export const createTask = (req: Request, res: Response) => {
    if (!req.body.title) return res.status(400).json({ error: 'Title is required' });
    TaskModel.create(req.body, (err, id) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id, ...req.body });
    });
};

export const updateTask = (req: Request, res: Response) => {
    TaskModel.update(Number(req.params.id), req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Task updated' });
    });
};

export const deleteTask = (req: Request, res: Response) => {
    TaskModel.delete(Number(req.params.id), (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Task deleted' });
    });
};
