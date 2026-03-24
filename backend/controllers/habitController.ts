import { Request, Response } from 'express';
import { HabitModel } from '../models/habitModel';

export const getHabits = (req: Request, res: Response) => {
    HabitModel.getAll((err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

export const createHabit = (req: Request, res: Response) => {
    if (!req.body.name) return res.status(400).json({ error: 'Name is required' });
    HabitModel.create(req.body, (err, id) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id, streak: 0, ...req.body });
    });
};

export const updateHabit = (req: Request, res: Response) => {
    HabitModel.update(Number(req.params.id), req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Habit updated' });
    });
};

export const deleteHabit = (req: Request, res: Response) => {
    HabitModel.delete(Number(req.params.id), (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Habit deleted' });
    });
};
