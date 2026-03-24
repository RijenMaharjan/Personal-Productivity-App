import { FiSquare, FiCheckSquare, FiTrash2 } from 'react-icons/fi';

const TaskItem = ({ task, onToggle, onDelete }) => {
    return (
        <div className={`p-4 mb-3 border rounded-lg shadow-sm flex items-start justify-between transition-colors ${task.done ? 'bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700' : 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-600'}`}>
            <div className="flex items-start gap-4">
                <button
                    onClick={() => onToggle(task)}
                    className={`mt-1 focus:outline-none ${task.done ? 'text-indigo-500' : 'text-gray-400 hover:text-indigo-500 transition-colors'}`}
                >
                    {task.done ? <FiCheckSquare className="w-6 h-6" /> : <FiSquare className="w-6 h-6" />}
                </button>
                <div>
                    <h3 className={`font-medium ${task.done ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-gray-100'}`}>
                        {task.title}
                    </h3>
                    {task.description && (
                        <p className={`text-sm mt-1 ${task.done ? 'text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-300'}`}>
                            {task.description}
                        </p>
                    )}
                    <div className="flex gap-2 mt-2">
                        {task.priority && (
                            <span className={`text-xs px-2 py-1 rounded-full ${task.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                                {task.priority}
                            </span>
                        )}
                        {task.tag && (
                            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                                {task.tag}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <button
                onClick={() => onDelete(task.id)}
                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                title="Delete task"
            >
                <FiTrash2 className="w-5 h-5" />
            </button>
        </div>
    );
};

export default TaskItem;
