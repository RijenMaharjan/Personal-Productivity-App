import { useState, useEffect } from 'react';
import { getHabits, createHabit, updateHabit, deleteHabit } from '../utils/api';
import HabitItem from '../components/HabitItem';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';

const HabitsPage = () => {
    const [habits, setHabits] = useState([]);
    const [newHabitName, setNewHabitName] = useState('');
    const [frequency, setFrequency] = useState('daily');

    useEffect(() => {
        fetchHabits();
    }, []);

    const fetchHabits = async () => {
        try {
            const res = await getHabits();
            setHabits(res.data);
        } catch (error) {
            toast.error('Failed to fetch habits');
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!newHabitName.trim()) return;
        try {
            const res = await createHabit({ name: newHabitName, frequency });
            setHabits([res.data, ...habits]);
            setNewHabitName('');
            toast.success('Habit added');
        } catch (error) {
            toast.error('Failed to create habit');
        }
    };

    const handleComplete = async (habit) => {
        try {
            const newStreak = (habit.streak || 0) + 1;
            const now = new Date().toISOString();
            await updateHabit(habit.id, { streak: newStreak, last_completed: now });
            setHabits(habits.map(h => h.id === habit.id ? { ...h, streak: newStreak, last_completed: now } : h));
            toast.success('Awesome! Streak updated 🔥');
        } catch (error) {
            toast.error('Failed to update habit');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteHabit(id);
            setHabits(habits.filter(h => h.id !== id));
            toast.success('Habit deleted');
        } catch (error) {
            toast.error('Failed to delete habit');
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Habits</h1>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Track and build your daily routines.</p>
            </div>

            <form onSubmit={handleCreate} className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 border border-gray-100 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Habit Name</label>
                        <input
                            type="text"
                            placeholder="e.g., Drink Water, Read 10 pages"
                            value={newHabitName}
                            onChange={(e) => setNewHabitName(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                            required
                        />
                    </div>
                    <div className="w-full sm:w-48">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Frequency</label>
                        <select
                            value={frequency}
                            onChange={(e) => setFrequency(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                        >
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full sm:w-auto mt-4 sm:mt-0 inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    >
                        <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                        Add Habit
                    </button>
                </div>
            </form>

            <div className="space-y-4">
                {habits.map(habit => (
                    <HabitItem key={habit.id} habit={habit} onComplete={handleComplete} onDelete={handleDelete} />
                ))}

                {habits.length === 0 && (
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                        No habits yet. Start tracking today!
                    </div>
                )}
            </div>
        </div>
    );
};

export default HabitsPage;
