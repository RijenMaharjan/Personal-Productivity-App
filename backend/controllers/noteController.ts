import { Request, Response } from 'express';
import { NoteModel } from '../models/noteModel';

export const getNotes = (req: Request, res: Response) => {
    NoteModel.getAll((err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

export const createNote = (req: Request, res: Response) => {
    if (!req.body.title) return res.status(400).json({ error: 'Title is required' });
    NoteModel.create(req.body, (err, id) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id, ...req.body });
    });
};

export const updateNote = (req: Request, res: Response) => {
    NoteModel.update(Number(req.params.id), req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Note updated' });
    });
};

export const deleteNote = (req: Request, res: Response) => {
    NoteModel.delete(Number(req.params.id), (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Note deleted' });
    });
};
