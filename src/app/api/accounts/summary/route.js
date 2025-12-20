import connectDB from '@/lib/mongodb';
import AccountTransaction from '@/models/AccountTransaction';
import { verifyToken } from '@/lib/authHelper';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        await connectDB();
        const auth = await verifyToken(request);
        if (auth.error) return NextResponse.json({ msg: auth.error }, { status: auth.status });

        const result = await AccountTransaction.aggregate([
            {
                $group: {
                    _id: "$type",
                    total: { $sum: "$amount" }
                }
            }
        ]);

        const summary = {
            credit: 0,
            debit: 0,
            balance: 0
        };

        result.forEach(item => {
            if (item._id === 'credit') summary.credit = item.total;
            if (item._id === 'debit') summary.debit = item.total;
        });

        summary.balance = summary.credit - summary.debit;
        return NextResponse.json(summary);
    } catch (err) {
        console.error(err.message);
        return NextResponse.json({ msg: 'Server error' }, { status: 500 });
    }
}
