import { noseconeMiddleware, noseconeOptions } from '@repo/security/middleware';
import { type NextRequest } from 'next/server';

export const config = {
  matcher: ['/((?!_next/static|_next/image|ingest|favicon.ico).*)'],
};

export default async function middleware(request: NextRequest) {
  const response = await noseconeMiddleware(noseconeOptions);
  return response;
}
