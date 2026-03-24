import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import TasksPage from './pages/TasksPage';
import HabitsPage from './pages/HabitsPage';
import NotesPage from './pages/NotesPage';

function App() {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    return (
        <Router>
            <div className="min-h-screen flex flex-col">
                <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
                <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/tasks" element={<TasksPage />} />
                        <Route path="/habits" element={<HabitsPage />} />
                        <Route path="/notes" element={<NotesPage />} />
                    </Routes>
                </main>
                <Toaster position="bottom-right" />
            </div>
        </Router>
    );
}

export default App;
