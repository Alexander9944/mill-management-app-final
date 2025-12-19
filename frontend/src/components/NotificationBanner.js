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

                // Tasks due today or tomorrow
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
        <div className="mb-4 space-y-1.5 animate-fade-in">
            {upcomingTasks.map(task => (
                <div key={task._id} className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-2 flex items-center justify-between glow-pulse">
                    <div className="flex items-center gap-2">
                        <span className="text-lg">⏰</span>
                        <div>
                            <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest leading-none mb-0.5">Critical Milestone</p>
                            <p className="text-[11px] font-bold text-text-primary mb-0">{task.task} ends on {new Date(task.expectedCompletionDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
