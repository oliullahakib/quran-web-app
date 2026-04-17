import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="w-full h-20 border-b border-emerald-100 bg-white/80 backdrop-blur-md sticky top-0 z-50 px-6 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-10 h-10 bg-emerald-900 rounded-lg flex items-center justify-center text-secondary font-arabic text-2xl">
          ق
        </div>
        <span className="font-bold text-primary tracking-tight text-xl">Al-Quran</span>
      </Link>
      
      <div className="hidden md:flex items-center gap-8">
        <Link href="/" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Home</Link>
        <Link href="/surah" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Surahs</Link>
        <Link href="/bookmarks" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Bookmarks</Link>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-500 hover:bg-emerald-50 rounded-full transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </button>
        <button className="bg-primary text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-emerald-800 transition-colors shadow-sm">
          Sign In
        </button>
      </div>
    </nav>
  )
}
