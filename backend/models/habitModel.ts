import db from '../utils/db';

export interface Habit {
    id?: number;
    name: string;
    frequency?: string;
    streak?: number;
    last_completed?: string | null;
}

export const HabitModel = {
    getAll: (callback: (err: Error | null, rows: any[]) => void) => {
        db.all(`SELECT * FROM habits ORDER BY created_at DESC`, [], callback);
    },

    create: (habit: Habit, callback: (err: Error | null, id?: number) => void) => {
        const { name, frequency = 'daily' } = habit;
        db.run(
            `INSERT INTO habits (name, frequency, streak) VALUES (?, ?, 0)`,
            [name, frequency],
            function (err) {
                callback(err, this?.lastID);
            }
        );
    },

    update: (id: number, habit: Partial<Habit>, callback: (err: Error | null) => void) => {
        const fields = [];
        const values = [];
        if (habit.name !== undefined) { fields.push('name = ?'); values.push(habit.name); }
        if (habit.frequency !== undefined) { fields.push('frequency = ?'); values.push(habit.frequency); }
        if (habit.streak !== undefined) { fields.push('streak = ?'); values.push(habit.streak); }
        if (habit.last_completed !== undefined) { fields.push('last_completed = ?'); values.push(habit.last_completed); }

        if (fields.length === 0) return callback(null);

        fields.push("updated_at = CURRENT_TIMESTAMP");
        values.push(id);

        db.run(`UPDATE habits SET ${fields.join(', ')} WHERE id = ?`, values, callback);
    },

    delete: (id: number, callback: (err: Error | null) => void) => {
        db.run(`DELETE FROM habits WHERE id = ?`, [id], callback);
    }
};
