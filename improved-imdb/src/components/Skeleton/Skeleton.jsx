import React from 'react';

const SkeletonPulse = () => (
  <div className="animate-pulse-skeleton">
    <div className="h-full w-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-[length:400%_100%]"></div>
  </div>
);

export const MovieCardSkeleton = () => {
  return (
    <div className="relative rounded-lg overflow-hidden h-72 bg-gray-900">
      <SkeletonPulse />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="rounded-lg p-3 bg-black/30 backdrop-blur-sm">
          <div className="h-5 w-2/3 mb-2 bg-gray-700 rounded"></div>
          <div className="flex justify-between">
            <div className="h-4 w-10 bg-gray-700 rounded"></div>
            <div className="h-4 w-12 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MovieRowSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 my-8 px-4">
    {[...Array(5)].map((_, index) => (
      <MovieCardSkeleton key={index} />
    ))}
  </div>
);

export const ProfileSkeleton = () => (
  <div className="flex items-center space-x-4 p-4 bg-gray-900 rounded-lg animate-pulse">
    <div className="rounded-full h-12 w-12 bg-gray-700"></div>
    <div className="flex-1 space-y-2">
      <div className="h-4 w-2/3 bg-gray-700 rounded"></div>
      <div className="h-3 w-1/2 bg-gray-700 rounded"></div>
    </div>
  </div>
);

export const DetailSkeleton = () => (
  <div className="animate-pulse space-y-4 p-6 bg-gray-900 rounded-lg">
    <div className="h-8 w-3/4 bg-gray-700 rounded mb-6"></div>
    <div className="flex space-x-6">
      <div className="h-64 w-44 bg-gray-800 rounded"></div>
      <div className="flex-1 space-y-4">
        <div className="h-4 w-full bg-gray-700 rounded"></div>
        <div className="h-4 w-full bg-gray-700 rounded"></div>
        <div className="h-4 w-3/4 bg-gray-700 rounded"></div>
        <div className="h-4 w-1/2 bg-gray-700 rounded"></div>
        <div className="h-10 w-36 mt-4 bg-gray-700 rounded"></div>
      </div>
    </div>
  </div>
);

export default {
  MovieCardSkeleton,
  MovieRowSkeleton,
  ProfileSkeleton,
  DetailSkeleton
}; 