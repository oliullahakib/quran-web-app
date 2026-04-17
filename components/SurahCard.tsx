import React, { memo } from 'react'
import Link from 'next/link'
import { Surah } from '@/lib/quran'

type SurahCardProps = {
  surah: Omit<Surah, 'verses'>
}

function SurahCard({ surah }: SurahCardProps) {
  return (
    <Link 
      href={`/surah/${surah.id}`}
      className="group relative p-6 bg-white border border-emerald-100 rounded-2xl transition-all duration-300 hover:border-accent hover:shadow-[0_20px_50px_rgba(6,78,59,0.1)] overflow-hidden"
    >
      {/* Decorative Background Pattern */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-12 -mt-12 opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
      
      <div className="flex justify-between items-start relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center bg-emerald-50 text-accent font-black rounded-xl border border-emerald-100 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
            {surah.id}
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 transition-colors duration-300 group-hover:text-primary">
              {surah.transliteration}
            </h3>
            <p className="text-slate-500 text-sm font-medium">
              {surah.translation}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <span className="font-arabic-dynamic text-3xl text-primary block group-hover:text-accent transition-colors duration-300">
            {surah.name}
          </span>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 block">
            {surah.total_verses} Verses
          </span>
        </div>
      </div>
      
      {/* "Read Surah" indicator appearing on hover */}
      <div className="mt-6 flex items-center gap-2 text-accent font-bold text-xs opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 relative z-10">
        <span>READ SURAH</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </div>
    </Link>
  )
}

export default memo(SurahCard)
