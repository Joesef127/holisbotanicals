import React from 'react';
import Skeleton from '../Skeleton';

/** Mirrors the full-screen botanical hero with centered headline + badge + button */
const HomeHeroSkeleton: React.FC = () => (
  <div className="relative isolate w-full min-h-screen flex flex-col items-center justify-center gap-6 px-4 bg-[#102d24] overflow-hidden">
    {/* Subtle pulsing background skeleton layer */}
    <div className="absolute inset-0 -z-10 bg-[#0c221b] animate-pulse" />

    {/* Holis badge */}
    <Skeleton className="h-7 w-44 rounded-full bg-white/15" />

    {/* Headline */}
    <div className="flex flex-col items-center gap-3 w-full max-w-2xl my-2">
      <Skeleton className="h-10 sm:h-14 w-4/5 rounded-xl bg-white/15" />
      <Skeleton className="h-10 sm:h-14 w-3/5 rounded-xl bg-white/15" />
    </div>

    {/* Sub-text lines */}
    <div className="flex flex-col items-center gap-2 w-full max-w-xl">
      <Skeleton className="h-4 w-full rounded bg-white/10" />
      <Skeleton className="h-4 w-4/5 rounded bg-white/10" />
    </div>

    {/* CTA button */}
    <Skeleton className="h-12 w-52 rounded-full bg-white/20 mt-4" />
  </div>
);

export default HomeHeroSkeleton;
