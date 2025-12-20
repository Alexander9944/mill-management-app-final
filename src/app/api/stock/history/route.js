import connectDB from '@/lib/mongodb';
import Stock from '@/models/Stock';
import StockTransaction from '@/models/StockTransaction';
import { verifyToken } from '@/lib/authHelper';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        await connectDB();
        const auth = await verifyToken(request);
        if (auth.error) return NextResponse.json({ msg: auth.error }, { status: auth.status });

        const { searchParams } = new URL(request.url);
        const stockId = searchParams.get('stockId');

        const query = {};
        if (stockId) {
            query.stockId = stockId;
        }

        const transactions = await StockTransaction.find(query)
            .populate('stockId', ['name', 'unit'])
            .sort({ date: -1 });

        return NextResponse.json(transactions);
    } catch (err) {
        console.error(err.message);
        return NextResponse.json({ msg: 'Server error' }, { status: 500 });
    }
}
