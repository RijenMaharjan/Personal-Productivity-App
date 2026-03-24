import { useState, useEffect } from 'react';
import { getNotes, createNote, deleteNote } from '../utils/api';
import NoteItem from '../components/NoteItem';
import toast from 'react-hot-toast';
import { FiSave } from 'react-icons/fi';

const NotesPage = () => {
    const [notes, setNotes] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const res = await getNotes();
            setNotes(res.data);
        } catch (error) {
            toast.error('Failed to fetch notes');
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!newTitle.trim()) return;
        try {
            const res = await createNote({ title: newTitle, content: newContent });
            setNotes([res.data, ...notes]);
            setNewTitle('');
            setNewContent('');
            toast.success('Note saved');
        } catch (error) {
            toast.error('Failed to save note');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteNote(id);
            setNotes(notes.filter(n => n.id !== id));
            toast.success('Note deleted');
        } catch (error) {
            toast.error('Failed to delete note');
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Journal / Notes</h1>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Jot down your daily thoughts and ideas.</p>
            </div>

            <form onSubmit={handleCreate} className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 border border-gray-100 dark:border-gray-700">
                <div className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Note Title"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="block w-full text-lg border-0 border-b-2 border-transparent hover:border-gray-200 focus:border-amber-500 focus:ring-0 bg-transparent dark:text-white dark:placeholder-gray-400 px-0 py-2 transition-colors font-semibold"
                            required
                        />
                    </div>
                    <div>
                        <textarea
                            placeholder="What's on your mind?..."
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                            rows={4}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm resize-y"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                        >
                            <FiSave className="-ml-1 mr-2 h-5 w-5" />
                            Save Note
                        </button>
                    </div>
                </div>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map(note => (
                    <NoteItem key={note.id} note={note} onDelete={handleDelete} />
                ))}
            </div>

            {notes.length === 0 && (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400 w-full col-span-full">
                    Your journal is empty. Write your first note!
                </div>
            )}
        </div>
    );
};

export default NotesPage;
