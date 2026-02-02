import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black px-6 py-10">
      
      {/* Fake Navbar spacing */}
      <div className="h-[72px]" />

      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Page Title */}
        <div className="space-y-3">
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-4 w-96" />
        </div>

        {/* Cards Grid (like dashboard / marketplace) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 space-y-4"
            >
              <Skeleton className="h-40 w-full rounded-xl" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
