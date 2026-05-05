import connectDB from '@/lib/mongodb';
import CreditRecord from '@/models/CreditRecord';
import { verifyToken } from '@/lib/authHelper';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
    try {
        await connectDB();
        const auth = await verifyToken(request);
        if (auth.error) return NextResponse.json({ msg: auth.error }, { status: auth.status });

        const { id } = await params;
        const data = await request.json();

        let record = await CreditRecord.findById(id);
        if (!record) return NextResponse.json({ msg: 'Record not found' }, { status: 404 });

        // Update fields
        if (data.shopName !== undefined) record.shopName = data.shopName;
        if (data.totalAmount !== undefined) record.totalAmount = Number(data.totalAmount);
        if (data.amountPaid !== undefined) record.amountPaid = Number(data.amountPaid);
        if (data.notes !== undefined) record.notes = data.notes;
        if (data.dueDate !== undefined) record.dueDate = data.dueDate;
        if (data.status !== undefined) record.status = data.status;

        await record.save();
        return NextResponse.json(record);
    } catch (err) {
        console.error('Credits PUT Error Details:', {
            message: err.message,
            stack: err.stack,
            error: err
        });
        return NextResponse.json({ 
            msg: 'Server error', 
            error: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const auth = await verifyToken(request);
        if (auth.error) return NextResponse.json({ msg: auth.error }, { status: auth.status });

        const { id } = await params;
        const record = await CreditRecord.findById(id);
        if (!record) return NextResponse.json({ msg: 'Record not found' }, { status: 404 });

        await record.deleteOne();
        return NextResponse.json({ msg: 'Record removed' });
    } catch (err) {
        console.error('Credits DELETE Error Details:', {
            message: err.message,
            stack: err.stack,
            error: err
        });
        return NextResponse.json({ 
            msg: 'Server error', 
            error: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        }, { status: 500 });
    }
}
