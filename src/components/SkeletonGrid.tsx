export function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-navy/10 overflow-hidden shadow-card animate-pulse flex flex-col h-full"
        >
          <div className="aspect-[16/10] w-full bg-navy/10" />
          <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="h-3 bg-navy/10 rounded w-1/3" />
                <div className="h-3 bg-navy/10 rounded w-1/4" />
              </div>
              <div className="h-5 bg-navy/15 rounded w-3/4" />
              <div className="h-10 bg-coral/10 rounded w-full" />
              <div className="h-3 bg-navy/10 rounded w-full" />
              <div className="h-3 bg-navy/10 rounded w-4/5" />
            </div>
            <div className="pt-3 border-t border-navy/5 flex justify-between">
              <div className="h-4 bg-navy/10 rounded w-1/3" />
              <div className="h-4 bg-navy/10 rounded w-1/4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

