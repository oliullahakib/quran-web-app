import Link from 'next/link'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function SurahPage({ params }: PageProps) {
  const { id } = await params

  // In a real app, you would fetch data here based on the id
  const surahName = "Al-Fatihah" // Placeholder
  const surahArabic = "الفاتحة" // Placeholder

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
        
        <h1 className="font-arabic text-5xl mb-4">{surahArabic}</h1>
        <h2 className="text-2xl font-bold tracking-tight">{surahName}</h2>
        <p className="opacity-70 text-sm mt-2 uppercase tracking-widest">Surah #{id}</p>
      </header>

      <section className="w-full max-w-4xl py-12 px-6 flex flex-col gap-8">
        {/* Placeholder for Ayahs */}
        {[1, 2, 3, 4, 5, 6, 7].map((verseNum) => (
          <div 
            key={verseNum}
            className="p-8 bg-white border border-emerald-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-6">
              <span className="w-10 h-10 flex items-center justify-center bg-emerald-50 text-accent font-bold rounded-full text-sm">
                {verseNum}
              </span>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 hover:bg-emerald-50 rounded-lg text-emerald-900">
                   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </button>
                <button className="p-2 hover:bg-emerald-50 rounded-lg text-emerald-900">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </button>
              </div>
            </div>
            
            <p className="font-arabic text-3xl md:text-4xl text-right leading-loose mb-6 text-primary">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            
            <p className="text-slate-600 leading-relaxed text-lg">
              In the name of Allah, the Entirely Merciful, the Especially Merciful.
            </p>
          </div>
        ))}
      </section>
    </div>
  )
}
