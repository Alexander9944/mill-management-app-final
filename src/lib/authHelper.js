import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function verifyToken(request) {
    const token = request.headers.get('x-auth-token');

    if (!token) {
        return { error: 'No token, authorization denied', status: 401 };
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return { user: decoded.user };
    } catch (e) {
        return { error: 'Token is not valid', status: 400 };
    }
}
