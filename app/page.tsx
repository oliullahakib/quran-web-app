import Link from 'next/link'
import { getAllSurahs } from '@/lib/quran'

export default function Home() {
  const surahs = getAllSurahs()

  return (
    <div className="flex-1 flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-20 px-4 flex flex-col items-center text-center bg-emerald-900 text-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] pointer-events-none"></div>
        
        <h1 className="font-arabic text-6xl md:text-8xl mb-6 animate-fade-in">
          القرآن الكريم
        </h1>
        <p className="font-sans text-xl md:text-2xl font-light tracking-wide max-w-2xl opacity-90 mb-10">
          The Noble Quran — A beautiful and modern reading experience for the soul.
        </p>
        
        <div className="flex gap-4">
          <Link 
            href="/surah/1" 
            className="px-8 py-3 bg-accent text-white rounded-full font-medium transition-transform hover:scale-105 active:scale-95 shadow-lg"
          >
            Start Reading
          </Link>
          <button className="px-8 py-3 border border-secondary/30 rounded-full font-medium hover:bg-secondary/10 transition-colors">
            View Bookmark
          </button>
        </div>
      </section>

      {/* Surah List Section */}
      <section className="w-full max-w-6xl py-20 px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-2">Surah List</h2>
            <div className="w-20 h-1 bg-accent"></div>
          </div>
          <p className="text-slate-500 font-medium">114 Chapters</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {surahs.map((surah) => (
            <Link 
              key={surah.id}
              href={`/surah/${surah.id}`}
              className="group p-6 bg-white border border-emerald-100 rounded-2xl hover:border-accent hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-bold text-accent bg-emerald-50 px-3 py-1 rounded-full">
                  #{surah.id}
                </span>
                <span className="font-arabic text-2xl text-primary group-hover:text-accent transition-colors">
                  {surah.name}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-800">{surah.transliteration}</h3>
              <p className="text-slate-500 text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                {surah.translation} • {surah.total_verses} Verses
              </p>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Footer Placeholder */}
      <footer className="w-full py-10 border-t border-emerald-100 bg-emerald-50/50 mt-auto flex flex-col items-center">
        <p className="text-primary/60 text-sm">
          &copy; {new Date().getFullYear()} Al-Quran Web App. Built with spiritual excellence.
        </p>
      </footer>
    </div>
  )
}
