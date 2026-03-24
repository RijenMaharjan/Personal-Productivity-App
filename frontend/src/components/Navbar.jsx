import { Link, useLocation } from 'react-router-dom';
import { FiCheckSquare, FiRepeat, FiFileText, FiSun, FiMoon } from 'react-icons/fi';

const Navbar = ({ darkMode, toggleDarkMode }) => {
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/', icon: FiCheckSquare },
        { name: 'Tasks', path: '/tasks', icon: FiCheckSquare },
        { name: 'Habits', path: '/habits', icon: FiRepeat },
        { name: 'Notes', path: '/notes', icon: FiFileText },
    ];

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                                ProdApp
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        className={`${isActive
                                                ? 'border-indigo-500 text-gray-900 dark:text-white'
                                                : 'border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white'
                                            } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                    >
                                        <Icon className="mr-2 h-4 w-4" />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-gray-100 dark:bg-gray-700"
                        >
                            <span className="sr-only">Toggle dark mode</span>
                            {darkMode ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu (simplified) */}
            <div className="sm:hidden border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex justify-around p-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'
                                } flex flex-col items-center p-2`}
                        >
                            <Icon className="h-6 w-6" />
                            <span className="text-xs mt-1">{item.name}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default Navbar;
