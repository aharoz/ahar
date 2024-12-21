import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

const RATE_LIMIT_WINDOW = 60 * 60; // 1 saat
const MAX_REQUESTS = 5; // Her IP için maksimum istek sayısı

export async function rateLimiter(req: NextRequest) {
  try {
    const ip = req.ip || 'anonymous';
    const key = `rate-limit:${ip}`;

    const requests = await redis.incr(key);
    
    if (requests === 1) {
      await redis.expire(key, RATE_LIMIT_WINDOW);
    }

    if (requests > MAX_REQUESTS) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    const remaining = MAX_REQUESTS - requests;
    const reset = await redis.ttl(key);

    return NextResponse.next({
      headers: {
        'X-RateLimit-Limit': MAX_REQUESTS.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': reset.toString(),
      },
    });
  } catch (error) {
    console.error('Rate limiting error:', error);
    return NextResponse.next();
  }
} 