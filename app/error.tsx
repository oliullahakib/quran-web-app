'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFCF0] px-6 text-center">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] scale-110 pointer-events-none -z-10"></div>
      
      <div className="relative mb-10">
        <div className="absolute inset-0 bg-red-100/50 blur-3xl rounded-full scale-150"></div>
        <div className="relative w-24 h-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center text-red-500 rotate-3 transition-transform hover:rotate-6 border border-emerald-50">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
      </div>

      <h2 className="text-3xl md:text-4xl font-black text-primary mb-4 tracking-tight">
        Unexpected interruption
      </h2>
      <p className="text-slate-500 max-w-md mb-10 leading-relaxed font-medium">
        Something went wrong while accessing the content. This could be a temporary issue. 
        Please try resetting the view or return to the main index.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={() => reset()}
          className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-emerald-900 transition-all shadow-xl shadow-emerald-900/10 hover:-translate-y-1"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="w-full sm:w-auto px-8 py-4 bg-white border border-emerald-100 text-primary rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-emerald-50 transition-all hover:-translate-y-1"
        >
          Back to Index
        </Link>
      </div>

      {error.digest && (
        <p className="mt-12 text-[10px] text-slate-300 font-mono tracking-widest">
          ERROR_ID: {error.digest}
        </p>
      )}
    </div>
  )
}
