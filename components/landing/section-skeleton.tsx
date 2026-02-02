import { Skeleton } from "@/components/ui/skeleton";

export function SectionSkeleton() {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-6xl space-y-10">
        <Skeleton className="h-10 w-64 mx-auto" />
        <Skeleton className="h-4 w-96 mx-auto" />

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-8 rounded-3xl border border-zinc-200 dark:border-white/10 space-y-6"
            >
              <Skeleton className="h-32 w-full rounded-xl" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
