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

        const { shopName, totalAmount, amountPaid, notes, dueDate } = await request.json();

        const newRecord = new CreditRecord({
            shopName,
            totalAmount,
            amountPaid,
            notes,
            dueDate
        });

        await newRecord.save();
        return NextResponse.json(newRecord);
    } catch (err) {
        console.error('Credits POST Error:', err);
        return NextResponse.json({ msg: 'Server error', error: err.message }, { status: 500 });
    }
}
