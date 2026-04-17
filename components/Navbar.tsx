'use client'

import Link from 'next/link'
import { useSettings } from '@/store/SettingsContext'
import dynamic from 'next/dynamic'

const SettingsSidebar = dynamic(() => import('./SettingsSidebar'), {
  ssr: false, // Sidebar only exists on client interaction
})

export default function Navbar() {
  const { setIsSettingsOpen } = useSettings()

  return (
    <nav className="h-20 w-full border-b border-emerald-50 bg-white/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-6 md:px-12">
      <Link href="/" className="flex items-center gap-3 group">
        <div className="w-10 h-10 bg-emerald-950 text-accent rounded-xl flex items-center justify-center font-arabic text-xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-emerald-900/10">
          ق
        </div>
        <span className="text-xl font-black text-primary tracking-tighter">AL-QURAN</span>
      </Link>
      
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-8 mr-4">
          <Link href="/" className="text-xs font-bold text-slate-600 hover:text-orange-800 transition-colors tracking-widest uppercase">Home Index</Link>
          <Link href="/surah/1" className="text-xs font-bold text-slate-600 hover:text-orange-800 transition-colors tracking-widest uppercase">Start Reading</Link>
        </div>
        
        <button 
          onClick={() => setIsSettingsOpen(true)}
          className="h-11 px-5 bg-white border border-emerald-50 hover:border-accent hover:shadow-xl hover:shadow-emerald-900/5 rounded-2xl text-primary text-[10px] font-bold uppercase tracking-widest flex items-center gap-2.5 transition-all duration-300 group"
          title="Reading Settings"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-90 transition-transform duration-500"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>
          <span className="hidden sm:inline">Settings</span>
        </button>
      </div>

      <SettingsSidebar />
    </nav>
  )
}
