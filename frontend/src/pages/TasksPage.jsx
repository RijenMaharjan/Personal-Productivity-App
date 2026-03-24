import { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../utils/api';
import TaskItem from '../components/TaskItem';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';

const TasksPage = () => {
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDesc, setNewTaskDesc] = useState('');
    const [priority, setPriority] = useState('medium');
    const [tag, setTag] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await getTasks();
            setTasks(res.data);
        } catch (error) {
            toast.error('Failed to fetch tasks');
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;
        try {
            const res = await createTask({ title: newTaskTitle, description: newTaskDesc, priority, tag });
            setTasks([res.data, ...tasks]);
            setNewTaskTitle('');
            setNewTaskDesc('');
            setTag('');
            toast.success('Task added');
        } catch (error) {
            toast.error('Failed to create task');
        }
    };

    const handleToggle = async (task) => {
        const updatedStatus = !task.done;
        try {
            await updateTask(task.id, { done: updatedStatus });
            setTasks(tasks.map(t => t.id === task.id ? { ...t, done: updatedStatus } : t));
        } catch (error) {
            toast.error('Failed to update task');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            setTasks(tasks.filter(t => t.id !== id));
            toast.success('Task deleted');
        } catch (error) {
            toast.error('Failed to delete task');
        }
    };

    const pendingTasks = tasks.filter(t => !t.done);
    const completedTasks = tasks.filter(t => t.done);

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tasks</h1>
                <p className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">Manage your daily to-dos.</p>
            </div>

            <form onSubmit={handleCreate} className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 border border-gray-100 dark:border-gray-700">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <input
                            type="text"
                            placeholder="What needs to be done?"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            className="w-full text-lg border-0 border-b-2 border-transparent hover:border-gray-200 focus:border-indigo-500 focus:ring-0 bg-transparent dark:text-white dark:placeholder-gray-400 px-0 py-2 transition-colors"
                            required
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <input
                            type="text"
                            placeholder="Description (optional)"
                            value={newTaskDesc}
                            onChange={(e) => setNewTaskDesc(e.target.value)}
                            className="w-full text-sm border-0 border-b border-transparent hover:border-gray-200 focus:border-indigo-500 focus:ring-0 bg-transparent dark:text-gray-300 dark:placeholder-gray-500 px-0 py-1 transition-colors"
                        />
                    </div>
                    <div>
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                            <option value="low">Low Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="high">High Priority</option>
                        </select>
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Tag (e.g., Work)"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                            className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        <button
                            type="submit"
                            className="inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 whitespace-nowrap"
                        >
                            <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                            Add Task
                        </button>
                    </div>
                </div>
            </form>

            <div className="space-y-6">
                {pendingTasks.length > 0 && (
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Pending</h2>
                        <div>
                            {pendingTasks.map(task => (
                                <TaskItem key={task.id} task={task} onToggle={handleToggle} onDelete={handleDelete} />
                            ))}
                        </div>
                    </div>
                )}

                {completedTasks.length > 0 && (
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Completed</h2>
                        <div className="opacity-75">
                            {completedTasks.map(task => (
                                <TaskItem key={task.id} task={task} onToggle={handleToggle} onDelete={handleDelete} />
                            ))}
                        </div>
                    </div>
                )}

                {tasks.length === 0 && (
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                        No tasks yet. Create one above!
                    </div>
                )}
            </div>
        </div>
    );
};

export default TasksPage;
