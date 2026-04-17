import React from 'react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFCF0] px-6 text-center">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] scale-110 pointer-events-none -z-10"></div>
      
      <div className="relative mb-10">
        <div className="absolute inset-0 bg-emerald-100/50 blur-3xl rounded-full scale-150"></div>
        <div className="relative w-32 h-32 bg-white rounded-3xl shadow-2xl flex items-center justify-center text-primary rotate-3 transition-transform hover:rotate-6 border border-emerald-50">
          <span className="font-arabic text-6xl opacity-20 absolute -z-10">لَا</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
        </div>
      </div>

      <h2 className="text-4xl md:text-5xl font-black text-primary mb-4 tracking-tight">
        Content not found
      </h2>
      <p className="text-slate-500 max-w-md mb-10 leading-relaxed font-medium">
        The page or Surah you are looking for has been moved or does not exist. 
        Please explore the main index to find what you are looking for.
      </p>

      <Link
        href="/"
        className="px-10 py-5 bg-emerald-950 text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-emerald-900 transition-all shadow-2xl shadow-emerald-900/20 hover:-translate-y-1 block"
      >
        Return to Surah Index
      </Link>
      
      <div className="mt-16 text-[10px] text-slate-300 font-bold uppercase tracking-widest">
        &quot;Every soul shall taste death&quot; • {new Date().getFullYear()}
      </div>
    </div>
  )
}
