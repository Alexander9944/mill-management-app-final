import connectDB from '@/lib/mongodb';
import Stock from '@/models/Stock';
import StockTransaction from '@/models/StockTransaction';
import { verifyToken } from '@/lib/authHelper';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
    try {
        await connectDB();
        const auth = await verifyToken(request);
        if (auth.error) return NextResponse.json({ msg: auth.error }, { status: auth.status });

        const { id } = await params;
        const { quantity, remarks } = await request.json();

        const transaction = await StockTransaction.findById(id);
        if (!transaction) return NextResponse.json({ msg: 'Transaction not found' }, { status: 404 });

        const stock = await Stock.findById(transaction.stockId);
        if (!stock) return NextResponse.json({ msg: 'Linked stock not found' }, { status: 404 });

        const oldQty = transaction.quantity;
        const newQty = Number(quantity);
        const diff = newQty - oldQty;

        if (transaction.type === 'add') {
            stock.quantity += diff;
        } else {
            if (stock.quantity < diff) return NextResponse.json({ msg: 'Insufficient stock for this adjustment' }, { status: 400 });
            stock.quantity -= diff;
        }

        transaction.quantity = newQty;
        transaction.remarks = remarks !== undefined ? remarks : transaction.remarks;
        stock.lastUpdated = Date.now();

        await stock.save();
        await transaction.save();

        return NextResponse.json({ stock, transaction });
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
        const transaction = await StockTransaction.findById(id);
        if (!transaction) return NextResponse.json({ msg: 'Transaction not found' }, { status: 404 });

        const stock = await Stock.findById(transaction.stockId);
        if (stock) {
            if (transaction.type === 'add') {
                stock.quantity -= transaction.quantity;
            } else {
                stock.quantity += transaction.quantity;
            }
            await stock.save();
        }

        await transaction.deleteOne();
        return NextResponse.json({ msg: 'Transaction deleted and stock reverted' });
    } catch (err) {
        console.error(err.message);
        return NextResponse.json({ msg: 'Server error' }, { status: 500 });
    }
}
