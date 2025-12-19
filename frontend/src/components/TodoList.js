'use client';

import { useState, useEffect } from 'react';
import { todos } from '@/lib/api';

export default function TodoList() {
    const [taskList, setTaskList] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [expectedDate, setExpectedDate] = useState('');
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

    const handleAddTodo = async (e) => {
        e.preventDefault();
        if (!newTask || !expectedDate) return;

        try {
            await todos.create(newTask, expectedDate);
            setNewTask('');
            setExpectedDate('');
            fetchTodos();
        } catch (err) {
            alert('Failed to add task');
        }
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
        <div className="glass rounded-2xl p-4 h-full flex flex-col min-h-[400px]">
            <h2 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2 text-text-primary">
                <span className="p-1.5 bg-indigo-500/10 rounded-lg text-indigo-500">📝</span>
                Production Todos
            </h2>

            <form onSubmit={handleAddTodo} className="space-y-2 mb-4">
                <input
                    type="text"
                    placeholder="New Task..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    className="w-full bg-input-bg border border-border-color rounded-xl p-2 text-xs focus:ring-1 focus:ring-violet-500 outline-none transition-all text-input-text font-medium"
                />
                <div className="flex gap-2">
                    <input
                        type="date"
                        value={expectedDate}
                        onChange={(e) => setExpectedDate(e.target.value)}
                        className="flex-1 bg-input-bg border border-border-color rounded-xl p-2 text-xs focus:ring-1 focus:ring-violet-500 outline-none transition-all text-input-text"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl font-bold text-[10px] uppercase text-white hover:scale-105 active:scale-95 transition-all shadow-md"
                    >
                        Add
                    </button>
                </div>
            </form>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                {loading ? (
                    <div className="text-center py-4 text-text-secondary text-[10px]">Syncing...</div>
                ) : taskList.length === 0 ? (
                    <div className="text-center py-4 text-text-secondary text-[10px] italic opacity-50">Zero Tasks ✨</div>
                ) : (
                    taskList.map((task) => (
                        <div
                            key={task._id}
                            className={`group p-2.5 rounded-xl border transition-all duration-200 flex items-center justify-between ${task.completed
                                    ? 'bg-emerald-500/5 border-emerald-500/10 opacity-50'
                                    : 'bg-white/5 border-border-color hover:border-violet-500/30'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => toggleComplete(task)}
                                    className={`w-4 h-4 rounded flex items-center justify-center transition-all ${task.completed ? 'bg-emerald-500' : 'border border-border-color hover:border-violet-500'
                                        }`}
                                >
                                    {task.completed && (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </button>
                                <div>
                                    <p className={`text-[11px] font-bold tracking-tight ${task.completed ? 'line-through text-text-secondary' : 'text-text-primary'}`}>
                                        {task.task}
                                    </p>
                                    <p className="text-[8px] text-text-secondary italic uppercase tracking-wider font-bold">
                                        Due: {new Date(task.expectedCompletionDate).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => deleteTodo(task._id)}
                                className="opacity-0 group-hover:opacity-100 p-1 text-red-500/40 hover:text-red-500 transition-all font-bold text-lg"
                            >
                                &times;
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
