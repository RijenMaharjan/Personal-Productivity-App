import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTasks, getHabits, getNotes } from '../utils/api';
import toast from 'react-hot-toast';
import { FiCheckCircle, FiClock, FiFileText } from 'react-icons/fi';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [habits, setHabits] = useState([]);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [tasksRes, habitsRes, notesRes] = await Promise.all([
                    getTasks(),
                    getHabits(),
                    getNotes()
                ]);
                setTasks(tasksRes.data);
                setHabits(habitsRes.data);
                setNotes(notesRes.data);
            } catch (error) {
                toast.error('Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div className="animate-pulse flex items-center justify-center h-64">Loading...</div>;
    }

    const pendingTasks = tasks.filter(t => !t.done);
    const completedTasks = tasks.filter(t => t.done);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Good Morning!</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Tasks Summary */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Tasks Overview</h2>
                        <FiCheckCircle className="text-indigo-500 h-6 w-6" />
                    </div>
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">{pendingTasks.length}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xl font-semibold text-green-600 dark:text-green-400">{completedTasks.length}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
                        </div>
                    </div>
                    <div className="mt-6">
                        <Link to="/tasks" className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 font-medium">View all tasks &rarr;</Link>
                    </div>
                </div>

                {/* Habits Summary */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Active Habits</h2>
                        <FiClock className="text-emerald-500 h-6 w-6" />
                    </div>
                    <div className="space-y-3">
                        {habits.slice(0, 3).map(habit => (
                            <div key={habit.id} className="flex justify-between items-center">
                                <span className="text-gray-700 dark:text-gray-200">{habit.name}</span>
                                <span className="py-1 px-2 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                                    {habit.streak} streak
                                </span>
                            </div>
                        ))}
                        {habits.length === 0 && <p className="text-sm text-gray-500">No habits tracked yet.</p>}
                    </div>
                    <div className="mt-6">
                        <Link to="/habits" className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 font-medium">Manage habits &rarr;</Link>
                    </div>
                </div>

                {/* Notes Summary */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Recent Notes</h2>
                        <FiFileText className="text-amber-500 h-6 w-6" />
                    </div>
                    <div className="space-y-3">
                        {notes.slice(0, 3).map(note => (
                            <div key={note.id} className="text-gray-700 dark:text-gray-200 truncate">
                                • {note.title}
                            </div>
                        ))}
                        {notes.length === 0 && <p className="text-sm text-gray-500">No recent notes.</p>}
                    </div>
                    <div className="mt-6">
                        <Link to="/notes" className="text-sm text-amber-600 dark:text-amber-400 hover:text-amber-800 font-medium">Go to notes &rarr;</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
