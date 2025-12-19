'use client';

import { useState, useEffect } from 'react';
import { todos } from '@/lib/api';

export default function NotificationBanner() {
    const [upcomingTasks, setUpcomingTasks] = useState([]);

    useEffect(() => {
        const fetchAndFilter = async () => {
            try {
                const response = await todos.getAll();
                const now = new Date();
                const tomorrow = new Date();
                tomorrow.setDate(now.getDate() + 1);

                const filtered = response.data.filter(t => {
                    const dueDate = new Date(t.expectedCompletionDate);
                    return !t.completed && (
                        dueDate.toDateString() === now.toDateString() ||
                        dueDate.toDateString() === tomorrow.toDateString()
                    );
                });
                setUpcomingTasks(filtered);
            } catch (err) {
                console.error(err);
            }
        };
        fetchAndFilter();
    }, []);

    if (upcomingTasks.length === 0) return null;

    return (
        <div className="mb-8 space-y-4 animate-fade-in">
            {upcomingTasks.map(task => (
                <div key={task._id} className="bg-amber-600/10 border-2 border-amber-500/50 rounded-2xl px-6 py-4 flex items-center justify-between glow-pulse shadow-xl">
                    <div className="flex items-center gap-4">
                        <span className="text-3xl">⏰</span>
                        <div>
                            <p className="text-xs font-black text-amber-700 uppercase tracking-[0.2em] mb-1">High Priority Alert</p>
                            <p className="text-base font-black text-text-primary">{task.task} is due on {new Date(task.expectedCompletionDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
