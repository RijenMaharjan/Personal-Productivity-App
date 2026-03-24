import db from '../utils/db';

export interface Task {
    id?: number;
    title: string;
    description?: string;
    priority?: string;
    tag?: string;
    done?: boolean;
}

export const TaskModel = {
    getAll: (callback: (err: Error | null, rows: any[]) => void) => {
        db.all(`SELECT * FROM tasks ORDER BY created_at DESC`, [], callback);
    },

    create: (task: Task, callback: (err: Error | null, id?: number) => void) => {
        const { title, description = '', priority = 'medium', tag = '' } = task;
        db.run(
            `INSERT INTO tasks (title, description, priority, tag, done) VALUES (?, ?, ?, ?, 0)`,
            [title, description, priority, tag],
            function (err) {
                callback(err, this?.lastID);
            }
        );
    },

    update: (id: number, task: Partial<Task>, callback: (err: Error | null) => void) => {
        const fields = [];
        const values = [];
        if (task.title !== undefined) { fields.push('title = ?'); values.push(task.title); }
        if (task.description !== undefined) { fields.push('description = ?'); values.push(task.description); }
        if (task.priority !== undefined) { fields.push('priority = ?'); values.push(task.priority); }
        if (task.tag !== undefined) { fields.push('tag = ?'); values.push(task.tag); }
        if (task.done !== undefined) { fields.push('done = ?'); values.push(task.done ? 1 : 0); }

        if (fields.length === 0) return callback(null);

        fields.push("updated_at = CURRENT_TIMESTAMP");
        values.push(id);

        db.run(`UPDATE tasks SET ${fields.join(', ')} WHERE id = ?`, values, callback);
    },

    delete: (id: number, callback: (err: Error | null) => void) => {
        db.run(`DELETE FROM tasks WHERE id = ?`, [id], callback);
    }
};
