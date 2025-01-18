import { env } from '@/env';
import { parseError } from '@repo/observability/error';
import { secure } from '@repo/security';
import {
  noseconeMiddleware,
  noseconeOptions,
  noseconeOptionsWithToolbar,
} from '@repo/security/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: ['/((?!_next/static|_next/image|ingest|favicon.ico).*)'],
};

const securityHeaders = env.FLAGS_SECRET
  ? noseconeMiddleware(noseconeOptionsWithToolbar)
  : noseconeMiddleware(noseconeOptions);

export default async function middleware(request: NextRequest) {
  if (!env.ARCJET_KEY) {
    return securityHeaders();
  }

  try {
    await secure(
      [
        'CATEGORY:SEARCH_ENGINE',
        'CATEGORY:PREVIEW',
        'CATEGORY:MONITOR',
      ],
      request
    );

    return securityHeaders();
  } catch (error) {
    const message = parseError(error);
    return NextResponse.json({ error: message }, { status: 403 });
  }
}
