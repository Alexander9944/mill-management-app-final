import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { verifyToken } from '@/lib/authHelper';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        await connectDB();
        const auth = await verifyToken(request);

        if (auth.error) {
            return NextResponse.json({ msg: auth.error }, { status: auth.status });
        }

        const user = await User.findById(auth.user.id).select('-password');
        return NextResponse.json(user);

    } catch (err) {
        console.error(err.message);
        return NextResponse.json({ msg: 'Server error' }, { status: 500 });
    }
}
