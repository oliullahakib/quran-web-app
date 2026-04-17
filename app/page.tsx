import { getAllSurahs } from '@/lib/quran'
import SurahCard from '@/components/SurahCard'
import Link from 'next/link'

export default function Home() {
  const surahs = getAllSurahs()

  return (
    <div className="flex-1 flex flex-col items-center bg-[#FCFBF8]">
      {/* Premium Hero Section */}
      <section className="w-full relative py-24 md:py-32 px-6 flex flex-col items-center text-center overflow-hidden bg-emerald-950">
        {/* Dynamic Background elements */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] scale-110 pointer-events-none"></div>
        <div className="absolute top-0 w-full h-px bg-linear-to-r from-transparent via-accent/30 to-transparent"></div>
        <div className="absolute -top-24 w-96 h-96 bg-accent/20 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl">
          <span className="text-accent font-bold text-xs uppercase tracking-[0.3em] mb-4 block">The Noble Revelation</span>
          <h1 className="font-arabic text-6xl md:text-8xl mb-8 text-secondary drop-shadow-sm leading-tight">
            القرآن الكريم
          </h1>
          <p className="font-sans text-lg md:text-xl font-light text-emerald-50/80 max-w-2xl mx-auto mb-12 leading-relaxed tracking-wide">
            Experience the divine message through a minimal, spiritual interface designed for deep reflection and clarity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 items-center justify-center">
            <Link 
              href="/surah/1" 
              className="group h-14 px-10 bg-accent text-white rounded-full font-bold flex items-center gap-3 transition-all duration-300 hover:bg-amber-700 hover:shadow-[0_10px_30px_rgba(180,83,9,0.3)] hover:-translate-y-1"
            >
              <span>START READING</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
            <button className="h-14 px-10 border border-emerald-50/20 text-emerald-50/90 rounded-full font-bold hover:bg-emerald-50/10 transition-all duration-300">
              LEARN MORE
            </button>
          </div>
        </div>
      </section>

      {/* Surah List Section */}
      <section className="w-full max-w-7xl py-24 px-6">
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
