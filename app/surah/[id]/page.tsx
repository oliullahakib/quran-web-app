import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getSurahById } from '@/lib/quran'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function SurahPage({ params }: PageProps) {
  const { id } = await params
  const surahId = parseInt(id)
  
  if (isNaN(surahId)) notFound()
  
  const surah = getSurahById(surahId)
  
  if (!surah) notFound()

  return (
    <div className="flex-1 flex flex-col items-center bg-secondary/30">
      <header className="w-full bg-emerald-900 py-12 px-6 text-center text-secondary shadow-inner relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
        
        <Link 
          href="/" 
          className="absolute left-6 top-6 text-secondary/60 hover:text-secondary flex items-center gap-2 text-sm transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Back to List
        </Link>
        
        <h1 className="font-arabic text-5xl md:text-6xl mb-4 animate-fade-in">{surah.name}</h1>
        <h2 className="text-2xl font-bold tracking-tight">{surah.transliteration}</h2>
        <p className="opacity-70 text-sm mt-2 uppercase tracking-widest">
          {surah.translation} • {surah.type} • {surah.total_verses} Ayahs
        </p>
      </header>

      <section className="w-full max-w-4xl py-12 px-6 flex flex-col gap-8">
        {/* Bismillah (except for Surah At-Tawbah #9 and Fatihah #1 already has it in first verse) */}
        {surah.id !== 1 && surah.id !== 9 && (
          <div className="text-center py-8 mb-4">
            <p className="font-arabic text-4xl text-primary">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          </div>
        )}

        {surah.verses?.map((verse) => (
          <div 
            key={verse.id}
            id={`verse-${verse.id}`}
            className="p-8 bg-white border border-emerald-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-6">
              <span className="w-10 h-10 flex items-center justify-center bg-emerald-50 text-accent font-bold rounded-full text-sm border border-emerald-100">
                {verse.id}
              </span>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 hover:bg-emerald-50 rounded-lg text-emerald-900 transition-colors" title="Play Ayah">
                   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </button>
                <button className="p-2 hover:bg-emerald-50 rounded-lg text-emerald-900 transition-colors" title="Bookmark">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                </button>
              </div>
            </div>
            
            <p className="font-arabic text-3xl md:text-4xl text-right leading-[2.5] mb-8 text-primary">
              {verse.text}
            </p>
            
            <p className="text-slate-600 leading-relaxed text-lg border-t border-emerald-50 pt-6">
              {verse.translation}
            </p>
          </div>
        ))}
      </section>

      {/* Navigation entre surahs */}
      <div className="w-full max-w-4xl px-6 py-12 flex justify-between border-t border-emerald-100 mt-8 mb-20">
        {surah.id > 1 ? (
          <Link href={`/surah/${surah.id - 1}`} className="flex flex-col items-start gap-1 p-4 rounded-xl hover:bg-white transition-colors group">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Previous Surah</span>
            <span className="text-primary font-bold group-hover:text-accent">← #{surah.id - 1}</span>
          </Link>
        ) : <div />}

        {surah.id < 114 ? (
          <Link href={`/surah/${surah.id + 1}`} className="flex flex-col items-end gap-1 p-4 rounded-xl hover:bg-white transition-colors group">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Next Surah</span>
            <span className="text-primary font-bold group-hover:text-accent">#{surah.id + 1} →</span>
          </Link>
        ) : <div />}
      </div>
    </div>
  )
}
