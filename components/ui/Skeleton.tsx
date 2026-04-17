import React from 'react'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div 
      className={`bg-emerald-50 rounded-lg animate-pulse ${className}`} 
      aria-hidden="true"
    />
  )
}

export function SurahCardSkeleton() {
  return (
    <div className="p-6 bg-white border border-emerald-50 rounded-2xl flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4 w-full">
          <Skeleton className="w-12 h-12 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-3 w-32 opacity-60" />
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-2 w-10 opacity-60" />
        </div>
      </div>
      <Skeleton className="h-4 w-full mt-2" />
    </div>
  )
}

export function VerseSkeleton() {
  return (
    <div className="p-10 md:p-14 bg-white border border-emerald-50 rounded-[2.5rem] space-y-10">
      <div className="flex justify-between items-start">
        <Skeleton className="w-12 h-12 rounded-2xl" />
        <div className="flex gap-3">
          <Skeleton className="h-10 w-20 rounded-xl" />
          <Skeleton className="h-10 w-10 rounded-xl" />
        </div>
      </div>
      <div className="space-y-4 flex flex-col items-end">
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-10 w-3/4 rounded-lg" />
      </div>
      <div className="pt-10 border-t border-emerald-50 space-y-3">
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-5/6 rounded-md" />
      </div>
    </div>
  )
}
