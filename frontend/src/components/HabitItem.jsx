import { FiCheck, FiTrash2, FiClock } from 'react-icons/fi';
import { format, isToday, parseISO } from 'date-fns';

const HabitItem = ({ habit, onComplete, onDelete }) => {
    const lastCompletedDate = habit.last_completed ? parseISO(habit.last_completed) : null;
    const completedToday = lastCompletedDate ? isToday(lastCompletedDate) : false;

    return (
        <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 rounded-lg p-5 flex items-center justify-between mb-4">
            <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{habit.name}</h3>
                <div className="flex gap-4 mt-2">
                    <span className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <FiClock className="mr-1 h-3 w-3" />
                        {habit.frequency}
                    </span>
                    <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                        Streak: {habit.streak} 🔥
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={() => onComplete(habit)}
                    disabled={completedToday}
                    className={`flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full transition-colors ${completedToday
                            ? 'bg-emerald-100 text-emerald-500 dark:bg-emerald-900/40 dark:text-emerald-400 cursor-not-allowed'
                            : 'border-2 border-gray-300 dark:border-gray-600 text-transparent hover:border-emerald-500 hover:text-emerald-500 dark:hover:border-emerald-400 dark:hover:text-emerald-400'
                        }`}
                    title={completedToday ? 'Completed for today' : 'Mark complete'}
                >
                    <FiCheck className="w-5 h-5" />
                </button>

                <button
                    onClick={() => onDelete(habit.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-2"
                    title="Delete habit"
                >
                    <FiTrash2 className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default HabitItem;
