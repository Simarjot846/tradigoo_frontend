'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log full error only to console (dev tools)
    console.error('Global Error:', error);
  }, [error]);

  return (
    <html>
      <body className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-md w-full space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>

          <h1 className="text-3xl font-bold">Something went wrong</h1>

          <p className="text-zinc-400">
            We encountered an unexpected issue. This has been logged and will be fixed shortly.
          </p>

          <Button
            onClick={() => reset()}
            className="w-full bg-white text-black hover:bg-zinc-200 font-semibold"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reload Page
          </Button>
        </div>
      </body>
    </html>
  );
}
