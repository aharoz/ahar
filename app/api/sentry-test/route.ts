import * as Sentry from '@sentry/nextjs';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        throw new Error('Bu bir API test hatasıdır!');
    } catch (error) {
        Sentry.captureException(error);
        return NextResponse.json(
            { error: 'Bir hata oluştu' },
            { status: 500 }
        );
    }
} 