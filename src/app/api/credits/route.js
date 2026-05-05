import connectDB from '@/lib/mongodb';
import CreditRecord from '@/models/CreditRecord';
import { verifyToken } from '@/lib/authHelper';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        await connectDB();
        const auth = await verifyToken(request);
        if (auth.error) return NextResponse.json({ msg: auth.error }, { status: auth.status });

        const records = await CreditRecord.find().sort({ createdAt: -1 });
        return NextResponse.json(records);
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

        const body = await request.json();
        const { shopName, totalAmount, amountPaid, notes, dueDate } = body;

        const newRecord = new CreditRecord({
            shopName,
            totalAmount: Number(totalAmount) || 0,
            amountPaid: Number(amountPaid) || 0,
            notes,
            dueDate
        });

        await newRecord.save();
        return NextResponse.json(newRecord);
    } catch (err) {
        console.error('Credits POST Error Details:', {
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
