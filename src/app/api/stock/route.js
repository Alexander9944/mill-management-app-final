import connectDB from '@/lib/mongodb';
import Stock from '@/models/Stock';
import { verifyToken } from '@/lib/authHelper';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        await connectDB();
        const auth = await verifyToken(request);
        if (auth.error) return NextResponse.json({ msg: auth.error }, { status: auth.status });

        const stocks = await Stock.find().sort({ name: 1 });
        return NextResponse.json(stocks);
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

        const { name, unit, notes } = await request.json();
        let stock = await Stock.findOne({ name });
        if (stock) {
            return NextResponse.json({ msg: 'Stock already exists' }, { status: 400 });
        }
        stock = new Stock({ name, unit, notes });
        await stock.save();
        return NextResponse.json(stock);
    } catch (err) {
        console.error(err.message);
        return NextResponse.json({ msg: 'Server error' }, { status: 500 });
    }
}
