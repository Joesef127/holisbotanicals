import React from 'react';
import Skeleton from '../Skeleton';

/** Mirrors the full-screen parallax hero on the product page */
const ProductHeroSkeleton: React.FC = () => (
  <div className="relative w-full h-screen flex flex-col items-center justify-center gap-6 px-4">
    <Skeleton className="h-6 w-40 rounded-full " />
    <div className="flex flex-col items-center gap-3 w-full max-w-2xl">
      <Skeleton className="h-12 w-4/5 " />
      <Skeleton className="h-12 w-3/5 " />
    </div>
    <Skeleton className="h-5 w-80 max-w-full " />
    {/* stats row */}
    <div className="flex gap-8 mt-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-2">
          <Skeleton className="h-8 w-16 " />
          <Skeleton className="h-3 w-20 " />
        </div>
      ))}
    </div>
    <div className="flex gap-4 mt-2">
      <Skeleton className="h-12 w-44 rounded-full " />
      <Skeleton className="h-12 w-32 rounded-full " />
    </div>
  </div>
);

export default ProductHeroSkeleton;
