import React, { memo } from 'react'
import Link from 'next/link'
import { SearchResult } from '@/lib/quran'
import TextHighlighter from './TextHighlighter'

interface SearchResultCardProps {
  result: SearchResult
  query: string
}

/**
 * Displays an individual search result with context and highlighted text.
 */
function SearchResultCard({ result, query }: SearchResultCardProps) {
  return (
    <Link 
      href={`/surah/${result.surahId}#verse-${result.id}`}
      className="group block p-6 bg-white border border-emerald-50 rounded-3xl hover:border-accent hover:shadow-xl transition-all duration-300 relative overflow-hidden"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center bg-emerald-50 text-accent font-black rounded-xl border border-emerald-100 group-hover:bg-accent group-hover:text-white transition-colors duration-300 text-xs">
            {result.id}
          </div>
          <div>
            <h4 className="text-sm font-bold text-primary tracking-tight">
              {result.surahName}
            </h4>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Surah #{result.surahId} • Ayah #{result.id}
            </p>
          </div>
        </div>
        
        <div className="font-arabic-dynamic text-xl text-primary/40 group-hover:text-accent/60 transition-colors">
          {/* We could potentially show Arabic here if we pass it in SearchResult */}
          ﴾{result.id}﴿
        </div>
      </div>
      
      <div className="relative pl-4">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-emerald-100 group-hover:bg-accent transition-colors rounded-full"></div>
        <p 
          className="text-slate-600 leading-relaxed font-light"
          style={{ fontSize: 'calc(var(--translation-font-size) * 0.9)' }}
        >
          <TextHighlighter text={result.translation} highlight={query} />
        </p>
      </div>
      
      <div className="mt-4 flex items-center gap-1.5 text-accent font-bold text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">
        <span>Go to verse</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </div>
    </Link>
  )
}

export default memo(SearchResultCard)
