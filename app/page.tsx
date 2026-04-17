'use client'

import { useQuran } from '@/store/QuranContext'
import SurahCard from '@/components/SurahCard'
import SearchResultCard from '@/components/SearchResultCard'
import Link from 'next/link'
import { SurahCardSkeleton } from '@/components/ui/Skeleton'

export default function Home() {
  const { 
    surahs, 
    searchResults, 
    searchQuery, 
    setSearchQuery, 
    debouncedQuery,
    isLoading 
  } = useQuran()

  const isSearching = searchQuery.length >= 3
  const isResultsEmpty = isSearching && debouncedQuery.length >= 3 && searchResults.length === 0

  return (
    <div className="flex-1 flex flex-col items-center bg-[#FCFBF8]">
      {/* Premium Hero Section with Search */}
      <section className="w-full relative py-20 md:py-32 px-6 flex flex-col items-center text-center overflow-hidden bg-emerald-950">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] scale-110 pointer-events-none"></div>
        <div className="absolute top-0 w-full h-px bg-linear-to-r from-transparent via-accent/30 to-transparent"></div>
        <div className="absolute -top-24 w-96 h-96 bg-accent/20 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl w-full">
          <span className="text-secondary/60 font-arabic text-4xl mb-6 block animate-fade-in">القرآن الكريم</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
            The Noble Quran
          </h1>
          
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-accent/50 to-emerald-500/50 rounded-2xl blur opacity-20 group-focus-within:opacity-100 transition duration-500"></div>
            <div className="relative flex items-center bg-white rounded-2xl overflow-hidden shadow-2xl transition-all duration-300">
              <div className="pl-6 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </div>
              <input 
                type="text" 
                placeholder="Search ayahs by meaning... (e.g. 'Peace', 'Mercy')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-16 px-6 bg-transparent text-primary font-medium focus:outline-none placeholder:text-slate-300"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="pr-6 text-slate-400 hover:text-primary transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              )}
            </div>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {['Patience', 'Gratitude', 'Light', 'Success'].map((tag) => (
              <button 
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-secondary/60 uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="w-full max-w-7xl py-16 md:py-24 px-6 min-h-[600px]">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {Array.from({ length: 9 }).map((_, i) => (
              <SurahCardSkeleton key={i} />
            ))}
          </div>
        ) : isSearching ? (
          /* Search Results View */
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-end justify-between mb-12 px-2">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-primary tracking-tight">
                  Search Results
                </h2>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">
                  {searchResults.length} matches found for &quot;{debouncedQuery}&quot;
                </p>
              </div>
              <button 
                onClick={() => setSearchQuery('')}
                className="text-xs font-bold text-accent uppercase tracking-widest hover:underline"
              >
                Clear Search
              </button>
            </div>

            {isResultsEmpty ? (
              <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in-95 duration-500">
                <div className="relative mb-10">
                  <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full scale-150"></div>
                  <div className="relative w-32 h-32 bg-white rounded-3xl shadow-2xl flex items-center justify-center text-accent rotate-3 transition-transform hover:rotate-6">
                     <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                  </div>
                </div>
                <h3 className="text-2xl font-black text-primary mb-3">Verse not found</h3>
                <p className="text-slate-500 max-w-sm mb-10 leading-relaxed font-medium">
                  We couldn&apos;t find any matches for <span className="text-accent">&quot;{debouncedQuery}&quot;</span>. 
                  Try searching for keywords like &apos;Peace&apos;, &apos;Mercy&apos;, or &apos;Paradise&apos;.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {['Jannah', 'Dua', 'Forgiveness'].map(term => (
                    <button 
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="px-6 py-3 bg-emerald-50 text-primary rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all transform hover:-translate-y-1"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {searchResults.map((result, idx) => (
                  <SearchResultCard key={`${result.surahId}-${result.id}-${idx}`} result={result} query={debouncedQuery} />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Default Surah List View */
          <div className="animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 px-2">
              <div className="relative">
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-1 h-12 bg-accent rounded-full hidden md:block"></div>
                <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tight">
                  Chapters
                </h2>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2 ml-1">
                  Complete Surah Index (114)
                </p>
              </div>
              
              <div className="flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                <span className="w-10 h-px bg-slate-200"></span>
                <span>Uthmani Script • Saheeh Intl</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {surahs.map((surah) => (
                <SurahCard key={surah.id} surah={surah} />
              ))}
            </div>
          </div>
        )}
      </section>
      
      {/* Footer */}
      <footer className="w-full py-16 border-t border-emerald-100 bg-white flex flex-col items-center">
        <div className="w-12 h-12 bg-emerald-950 text-accent rounded-xl flex items-center justify-center font-arabic text-2xl mb-8">
          ق
        </div>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mb-2">
          Al-Quran Web Application
        </p>
        <p className="text-slate-300 text-[10px] font-medium tracking-widest">
          &copy; {new Date().getFullYear()} • BUILT FOR SPIRITUAL CLARITY
        </p>
      </footer>
    </div>
  )
}
