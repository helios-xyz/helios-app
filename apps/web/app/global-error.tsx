'use client';

import { Button } from '@repo/design-system/components/ui/button';
import { fonts } from '@repo/design-system/lib/fonts';
import type NextError from 'next/error';

type GlobalErrorProperties = {
  readonly error: NextError & { digest?: string };
  readonly reset: () => void;
};

const GlobalError = ({ error, reset }: GlobalErrorProperties) => {
  return (
    <html lang="en" className={fonts}>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold">Something went wrong!</h1>
            <p className="text-gray-600">We apologize for the inconvenience.</p>
            <Button onClick={reset}>Try again</Button>
          </div>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;
