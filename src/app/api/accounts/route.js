import connectDB from '@/lib/mongodb';
import AccountTransaction from '@/models/AccountTransaction';
import { verifyToken } from '@/lib/authHelper';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        await connectDB();
        const auth = await verifyToken(request);
        if (auth.error) return NextResponse.json({ msg: auth.error }, { status: auth.status });

        const transactions = await AccountTransaction.find().sort({ date: -1 });
        return NextResponse.json(transactions);
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

        const { type, category, quantity, pricePerUnit, amount, remarks, date } = await request.json();

        if (amount !== undefined && Number(amount) < 0) {
            return NextResponse.json({ msg: 'Amount cannot be negative' }, { status: 400 });
        }
        if (quantity !== undefined && quantity !== null && Number(quantity) < 0) {
            return NextResponse.json({ msg: 'Quantity cannot be negative' }, { status: 400 });
        }
        if (pricePerUnit !== undefined && pricePerUnit !== null && Number(pricePerUnit) < 0) {
            return NextResponse.json({ msg: 'Price per unit cannot be negative' }, { status: 400 });
        }

        const newTransaction = new AccountTransaction({
            type,
            category,
            quantity,
            pricePerUnit,
            amount,
            remarks,
            date: date || Date.now()
        });

        const transaction = await newTransaction.save();
        return NextResponse.json(transaction);
    } catch (err) {
        console.error(err.message);
        return NextResponse.json({ msg: 'Server error' }, { status: 500 });
    }
}
