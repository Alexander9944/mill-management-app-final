import connectDB from '@/lib/mongodb';
import AccountTransaction from '@/models/AccountTransaction';
import { verifyToken } from '@/lib/authHelper';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
    try {
        await connectDB();
        const auth = await verifyToken(request);
        if (auth.error) return NextResponse.json({ msg: auth.error }, { status: auth.status });

        const { id } = await params;
        const data = await request.json();

        let transaction = await AccountTransaction.findById(id);
        if (!transaction) return NextResponse.json({ msg: 'Transaction not found' }, { status: 404 });

        Object.keys(data).forEach(key => {
            if (data[key] !== undefined) {
                transaction[key] = data[key];
            }
        });

        await transaction.save();
        return NextResponse.json(transaction);
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
        const transaction = await AccountTransaction.findById(id);
        if (!transaction) return NextResponse.json({ msg: 'Transaction not found' }, { status: 404 });

        await transaction.deleteOne();
        return NextResponse.json({ msg: 'Transaction removed' });
    } catch (err) {
        console.error(err.message);
        return NextResponse.json({ msg: 'Server error' }, { status: 500 });
    }
}
