'use client';

import { useState, useEffect } from 'react';
import { todos } from '@/lib/api';

export default function TodoList() {
    const [taskList, setTaskList] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [expectedDate, setExpectedDate] = useState('');
    const [editingTodo, setEditingTodo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await todos.getAll();
            setTaskList(response.data);
        } catch (err) {
            console.error('Failed to fetch todos:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newTask || !expectedDate) return;

        try {
            if (editingTodo) {
                await todos.update(editingTodo._id, { task: newTask, expectedCompletionDate: expectedDate });
                setEditingTodo(null);
            } else {
                await todos.create(newTask, expectedDate);
            }
            setNewTask('');
            setExpectedDate('');
            fetchTodos();
        } catch (err) {
            alert('Operation failed');
        }
    };

    const startEditing = (todo) => {
        setEditingTodo(todo);
        setNewTask(todo.task);
        setExpectedDate(new Date(todo.expectedCompletionDate).toISOString().split('T')[0]);
    };

    const toggleComplete = async (todo) => {
        try {
            await todos.update(todo._id, { completed: !todo.completed });
            fetchTodos();
        } catch (err) {
            alert('Failed to update task');
        }
    };

    const deleteTodo = async (id) => {
        if (!confirm('Delete this task?')) return;
        try {
            await todos.delete(id);
            fetchTodos();
        } catch (err) {
            alert('Failed to delete task');
        }
    };

    return (
        <div className="glass rounded-[2rem] p-6 flex flex-col h-[800px] border-2 border-border-color shadow-2xl overflow-hidden w-full">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-6 flex items-center justify-between text-text-primary">
                <div className="flex items-center gap-2">
                    <span className="p-2 bg-indigo-500/20 rounded-xl text-indigo-600 text-lg">📝</span>
                    Production Queue
                </div>
                {editingTodo && (
                    <button onClick={() => { setEditingTodo(null); setNewTask(''); setExpectedDate(''); }} className="text-[9px] font-black bg-red-500/20 text-red-600 px-3 py-1 rounded-lg uppercase border-2 border-red-500/30">Cancel</button>
                )}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 mb-6 bg-white/5 p-5 rounded-2xl border-2 border-border-color">
                <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">{editingTodo ? 'Modify Entry' : 'Manual Entry'}</p>
                <input
                    type="text"
                    placeholder="Describe mission..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    className="w-full bg-input-bg border-2 border-border-color rounded-2xl p-3 text-base focus:ring-2 focus:ring-violet-500 outline-none transition-all text-input-text font-black"
                />
                <div className="flex flex-col gap-3">
                    <input
                        type="date"
                        value={expectedDate}
                        onChange={(e) => setExpectedDate(e.target.value)}
                        className="w-full bg-input-bg border-2 border-border-color rounded-2xl p-3 text-base focus:ring-2 focus:ring-violet-500 outline-none transition-all text-input-text font-black"
                    />
                    <button
                        type="submit"
                        className={`w-full py-4 rounded-2xl font-black text-xs uppercase text-white hover:scale-105 active:scale-95 transition-all shadow-xl ${editingTodo ? 'bg-amber-600' : 'bg-gradient-to-r from-violet-600 to-indigo-600'}`}
                    >
                        {editingTodo ? 'Update Mission' : 'Commit Mission'}
                    </button>
                </div>
            </form>

            <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
                {loading ? (
                    <div className="text-center py-10 text-text-secondary text-xs font-black uppercase tracking-widest animate-pulse">Scanning Queue...</div>
                ) : taskList.length === 0 ? (
                    <div className="text-center py-20 text-text-secondary text-xs italic font-black opacity-40 uppercase tracking-[0.2em]">Zero Missions Scheduled</div>
                ) : (
                    taskList.map((task) => (
                        <div
                            key={task._id}
                            className={`group p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col gap-4 ${task.completed
                                    ? 'bg-emerald-500/10 border-emerald-500/20 opacity-60'
                                    : 'bg-white/5 border-border-color hover:border-violet-500/50'
                                } ${editingTodo?._id === task._id ? 'ring-2 ring-amber-500' : ''}`}
                        >
                            <div className="flex items-start gap-3">
                                <button
                                    onClick={() => toggleComplete(task)}
                                    className={`w-6 h-6 rounded-lg flex-shrink-0 flex items-center justify-center transition-all border-2 mt-1 ${task.completed ? 'bg-emerald-600 border-emerald-600' : 'border-border-color hover:border-violet-500'
                                        }`}
                                >
                                    {task.completed && (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </button>
                                <div className="flex-1 min-w-0">
                                    <p className={`text-base font-black tracking-tight break-words ${task.completed ? 'line-through text-text-secondary' : 'text-text-primary'}`}>
                                        {task.task}
                                    </p>
                                    <p className="text-[10px] text-text-secondary italic uppercase tracking-widest font-black mt-1">
                                        Deadline: {new Date(task.expectedCompletionDate).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                                <button
                                    onClick={() => startEditing(task)}
                                    className="flex-1 flex items-center justify-center gap-2 py-2 text-amber-500 hover:bg-amber-500/20 rounded-xl transition-all border-2 border-amber-500/20 shadow-md"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                    <span className="text-[9px] font-black uppercase">Edit</span>
                                </button>
                                <button
                                    onClick={() => deleteTodo(task._id)}
                                    className="flex-1 flex items-center justify-center gap-2 py-2 text-red-500 hover:bg-red-500/20 rounded-xl transition-all border-2 border-red-500/20 shadow-md"
                                >
                                    <span className="text-xl leading-none">&times;</span>
                                    <span className="text-[9px] font-black uppercase">Delete</span>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
