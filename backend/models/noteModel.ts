import db from '../utils/db';

export interface Note {
    id?: number;
    title: string;
    content: string;
}

export const NoteModel = {
    getAll: (callback: (err: Error | null, rows: any[]) => void) => {
        db.all(`SELECT * FROM notes ORDER BY updated_at DESC`, [], callback);
    },

    create: (note: Note, callback: (err: Error | null, id?: number) => void) => {
        const { title, content } = note;
        db.run(
            `INSERT INTO notes (title, content) VALUES (?, ?)`,
            [title, content],
            function (err) {
                callback(err, this?.lastID);
            }
        );
    },

    update: (id: number, note: Partial<Note>, callback: (err: Error | null) => void) => {
        const fields = [];
        const values = [];
        if (note.title !== undefined) { fields.push('title = ?'); values.push(note.title); }
        if (note.content !== undefined) { fields.push('content = ?'); values.push(note.content); }

        if (fields.length === 0) return callback(null);

        fields.push("updated_at = CURRENT_TIMESTAMP");
        values.push(id);

        db.run(`UPDATE notes SET ${fields.join(', ')} WHERE id = ?`, values, callback);
    },

    delete: (id: number, callback: (err: Error | null) => void) => {
        db.run(`DELETE FROM notes WHERE id = ?`, [id], callback);
    }
};
