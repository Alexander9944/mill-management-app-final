import connectDB from '@/lib/mongodb';
import Stock from '@/models/Stock';
import StockTransaction from '@/models/StockTransaction';
import { verifyToken } from '@/lib/authHelper';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        await connectDB();
        const auth = await verifyToken(request);
        if (auth.error) return NextResponse.json({ msg: auth.error }, { status: auth.status });

        const { stockId, type, quantity, remarks } = await request.json();

        let stock = await Stock.findById(stockId);
        if (!stock) {
            return NextResponse.json({ msg: 'Stock not found' }, { status: 404 });
        }

        const qty = Number(quantity);
        if (type === 'remove' && stock.quantity < qty) {
            return NextResponse.json({ msg: 'Insufficient stock' }, { status: 400 });
        }

        if (type === 'add') {
            stock.quantity += qty;
        } else if (type === 'remove') {
            stock.quantity -= qty;
        }
        stock.lastUpdated = Date.now();
        await stock.save();

        const transaction = new StockTransaction({
            stockId,
            type,
            quantity: qty,
            remarks
        });
        await transaction.save();

        return NextResponse.json({ stock, transaction });

    } catch (err) {
        console.error(err.message);
        return NextResponse.json({ msg: 'Server error' }, { status: 500 });
    }
}
