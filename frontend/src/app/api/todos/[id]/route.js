import connectDB from '@/lib/mongodb';
import Todo from '@/models/Todo';
import { verifyToken } from '@/lib/authHelper';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
    try {
        await connectDB();
        const auth = await verifyToken(request);
        if (auth.error) return NextResponse.json({ msg: auth.error }, { status: auth.status });

        const { id } = await params;
        const data = await request.json();

        let todo = await Todo.findById(id);
        if (!todo) return NextResponse.json({ msg: 'Todo not found' }, { status: 404 });

        Object.keys(data).forEach(key => {
            if (data[key] !== undefined) {
                todo[key] = data[key];
            }
        });

        await todo.save();
        return NextResponse.json(todo);
    } catch (err) {
        console.error(err.message);
        return NextResponse.json({ msg: 'Server error' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const auth = await verifyToken(request);
        if (auth.error) return NextResponse.json({ msg: auth.error }, { status: auth.status });

        const { id } = await params;
        const todo = await Todo.findById(id);
        if (!todo) return NextResponse.json({ msg: 'Todo not found' }, { status: 404 });

        await todo.deleteOne();
        return NextResponse.json({ msg: 'Todo removed' });
    } catch (err) {
        console.error(err.message);
        return NextResponse.json({ msg: 'Server error' }, { status: 500 });
    }
}
