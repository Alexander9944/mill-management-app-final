import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        await connectDB();
        const { username, password } = await request.json();

        const user = await User.findOne({ username });
        if (!user) {
            return NextResponse.json({ msg: 'Invalid Credentials' }, { status: 400 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ msg: 'Invalid Credentials' }, { status: 400 });
        }

        const payload = {
            user: {
                id: user._id
            }
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return NextResponse.json({
            token,
            user: { id: user._id, username: user.username, role: user.role }
        });

    } catch (err) {
        console.error(err.message);
        return NextResponse.json({ msg: 'Server error' }, { status: 500 });
    }
}
