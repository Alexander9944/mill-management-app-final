import connectDB from '@/lib/mongodb';
import Todo from '@/models/Todo';
import { verifyToken } from '@/lib/authHelper';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        await connectDB();
        const auth = await verifyToken(request);
        if (auth.error) return NextResponse.json({ msg: auth.error }, { status: auth.status });

        const todos = await Todo.find().sort({ expectedCompletionDate: 1 });
        return NextResponse.json(todos);
    } catch (err) {
        console.error(err.message);
        return NextResponse.json({ msg: 'Server error' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await connectDB();
        const auth = await verifyToken(request);
        if (auth.error) return NextResponse.json({ msg: auth.error }, { status: auth.status });

        const { task, expectedCompletionDate } = await request.json();
        const newTodo = new Todo({
            task,
            expectedCompletionDate
        });
        const todo = await newTodo.save();
        return NextResponse.json(todo);
    } catch (err) {
        console.error(err.message);
        return NextResponse.json({ msg: 'Server error' }, { status: 500 });
    }
}
