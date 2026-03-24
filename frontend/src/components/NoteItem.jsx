import { FiTrash2 } from 'react-icons/fi';
import { format, parseISO } from 'date-fns';

const NoteItem = ({ note, onDelete }) => {
    return (
        <div className="bg-yellow-50 dark:bg-amber-900/20 shadow-sm border border-yellow-100 dark:border-amber-700/50 rounded-lg p-5 flex flex-col mb-4 transition-transform hover:-translate-y-1">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white break-words pr-4">{note.title}</h3>
                <button
                    onClick={() => onDelete(note.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    title="Delete note"
                >
                    <FiTrash2 className="w-5 h-5 flex-shrink-0" />
                </button>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap flex-1 mb-4">
                {note.content}
            </p>
            <div className="text-xs text-gray-500 dark:text-gray-400 text-right mt-auto">
                {format(parseISO(note.updated_at || note.created_at || new Date().toISOString()), 'MMM d, yyyy - h:mm a')}
            </div>
        </div>
    );
};

export default NoteItem;
