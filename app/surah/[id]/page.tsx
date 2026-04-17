import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getSurahById } from '@/lib/quran'

interface PageProps {
  params: Promise<{ id: string }>
}

/**
 * Statically generate routes for all 114 Surahs at build time.
 */
export async function generateStaticParams() {
  return Array.from({ length: 114 }, (_, i) => ({
    id: (i + 1).toString(),
  }))
}

export default async function SurahPage({ params }: PageProps) {
  const { id } = await params
  const surahId = parseInt(id)
  
  if (isNaN(surahId)) notFound()
  
  const surah = getSurahById(surahId)
  
  if (!surah) notFound()

  return (
    <div className="flex-1 flex flex-col items-center bg-[#FCFBF8]">
      {/* Refined Header */}
      <header className="w-full bg-emerald-950 py-16 md:py-24 px-6 text-center text-secondary shadow-inner relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] scale-110 pointer-events-none"></div>
        <div className="absolute bottom-0 w-full h-px bg-linear-to-r from-transparent via-accent/30 to-transparent"></div>
        
        <Link 
          href="/" 
          className="absolute left-6 top-8 text-secondary/60 hover:text-secondary flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all hover:-translate-x-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Back to Index
        </Link>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="font-arabic text-6xl md:text-8xl mb-6 text-secondary animate-fade-in">{surah.name}</h1>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">{surah.transliteration}</h2>
          <div className="flex items-center justify-center gap-3 text-accent font-bold text-xs uppercase tracking-[0.2em] opacity-80">
            <span>{surah.translation}</span>
            <span className="w-1 h-1 bg-accent rounded-full"></span>
            <span>{surah.type}</span>
            <span className="w-1 h-1 bg-accent rounded-full"></span>
            <span>{surah.total_verses} Ayahs</span>
          </div>
        </div>
      </header>

      <section className="w-full max-w-5xl py-16 px-6 flex flex-col gap-10">
        {/* Bismillah Rendering */}
        {surah.id !== 1 && surah.id !== 9 && (
          <div className="text-center py-12 mb-6 relative">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-50 -z-10"></div>
            <p className="font-arabic text-4xl md:text-5xl text-primary drop-shadow-sm">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
          </div>
        )}

        {surah.verses?.map((verse) => (
          <div 
            key={verse.id}
            id={`verse-${verse.id}`}
            className="group p-10 md:p-14 bg-white border border-emerald-50 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden"
          >
            {/* Background verse number indicator */}
            <div className="absolute -left-4 -top-4 text-emerald-50/40 font-black text-8xl pointer-events-none group-hover:text-emerald-50 transition-colors duration-500">
              {verse.id}
            </div>

            <div className="flex justify-between items-start mb-10 relative z-10">
              <div className="w-12 h-12 flex items-center justify-center bg-emerald-50 text-accent font-black rounded-2xl text-sm border border-emerald-100 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                {verse.id}
              </div>
              <div className="flex gap-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <button className="h-10 px-4 bg-emerald-50 hover:bg-emerald-100 rounded-xl text-primary text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-colors">
                   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                   Play
                </button>
                <button className="h-10 w-10 bg-emerald-50 hover:bg-emerald-100 rounded-xl text-primary flex items-center justify-center transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                </button>
              </div>
            </div>
            
            <p className="font-arabic text-4xl md:text-6xl text-right leading-[2.2] md:leading-[2.5] mb-12 text-slate-800 transition-colors duration-500 group-hover:text-primary relative z-10">
              {verse.text}
            </p>
            
            <div className="relative pt-10">
              <div className="absolute top-0 left-0 w-12 h-1 bg-accent rounded-full"></div>
              <p className="text-slate-600 leading-loose text-xl md:text-2xl font-light">
                {verse.translation}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Modern Surah Navigation */}
      <div className="w-full max-w-5xl px-6 py-20 flex flex-col md:flex-row gap-6 md:justify-between border-t border-emerald-100 mt-12 mb-20">
        {surah.id > 1 ? (
          <Link 
            href={`/surah/${surah.id - 1}`} 
            className="flex-1 flex items-center gap-6 p-8 bg-white border border-emerald-50 rounded-3xl hover:border-accent hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-1">Previous Surah</span>
              <span className="text-lg font-bold text-primary group-hover:text-accent transition-colors">Surah #{surah.id - 1}</span>
            </div>
          </Link>
        ) : <div className="flex-1" />}

        {surah.id < 114 ? (
          <Link 
            href={`/surah/${surah.id + 1}`} 
            className="flex-1 flex items-center justify-end gap-6 p-8 bg-white border border-emerald-50 rounded-3xl hover:border-accent hover:shadow-lg transition-all group text-right"
          >
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-1">Next Surah</span>
              <span className="text-lg font-bold text-primary group-hover:text-accent transition-colors">Surah #{surah.id + 1}</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          </Link>
        ) : <div className="flex-1" />}
      </div>
    </div>
  )
}
