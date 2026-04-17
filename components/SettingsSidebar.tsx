'use client'

import React from 'react'
import { useQuran } from '@/store/QuranContext'

export default function SettingsSidebar() {
  const { 
    isSettingsOpen, 
    setIsSettingsOpen, 
    arabicFontSize, 
    setArabicFontSize, 
    translationFontSize, 
    setTranslationFontSize, 
    arabicFontFamily, 
    setArabicFontFamily 
  } = useQuran()

  if (!isSettingsOpen) return null

  return (
    <div className="fixed inset-0 z-100 flex justify-end overflow-hidden">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-emerald-950/20 backdrop-blur-sm transition-opacity animate-in fade-in"
        onClick={() => setIsSettingsOpen(false)}
      />
      
      {/* Sidebar Panel */}
      <div className="relative w-full max-w-sm bg-white shadow-2xl animate-in slide-in-from-right duration-500 overflow-y-auto">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-emerald-50">
            <h2 className="text-xl font-black text-primary tracking-tight">Reading Settings</h2>
            <button 
              onClick={() => setIsSettingsOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-emerald-50 text-slate-400 hover:text-primary transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

          <div className="p-8 space-y-12">
            {/* Arabic Font Selection */}
            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Arabic Script Style</label>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { id: 'amiri', name: 'Amiri (Classic)', preview: 'القرآن الكريم' },
                  { id: 'scheherazade', name: 'Scheherazade (Modern)', preview: 'القرآن الكريم' }
                ].map((font) => (
                  <button
                    key={font.id}
                    onClick={() => setArabicFontFamily(font.id)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all duration-300 ${
                      arabicFontFamily === font.id 
                      ? 'border-accent bg-emerald-50/50 shadow-md' 
                      : 'border-emerald-50 hover:border-emerald-200'
                    }`}
                  >
                    <span className="text-sm font-bold text-slate-800 block mb-2">{font.name}</span>
                    <span className={`text-2xl block ${font.id === 'amiri' ? 'font-arabic' : 'font-arabic-alt'} text-primary`}>
                      {font.preview}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Arabic Font Size Control */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Arabic Font Size</label>
                <span className="text-sm font-bold text-accent">{arabicFontSize}px</span>
              </div>
              <input 
                type="range" 
                min="24" 
                max="80" 
                value={arabicFontSize} 
                onChange={(e) => setArabicFontSize(parseInt(e.target.value))}
                className="w-full h-2 bg-emerald-50 rounded-lg appearance-none cursor-pointer accent-accent"
              />
              <p className="text-[10px] text-slate-400 font-medium text-center">Drag to adjust the readability of Arabic scripture</p>
            </div>

            {/* Translation Font Size Control */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Translation Size</label>
                <span className="text-sm font-bold text-accent">{translationFontSize}px</span>
              </div>
              <input 
                type="range" 
                min="12" 
                max="32" 
                value={translationFontSize} 
                onChange={(e) => setTranslationFontSize(parseInt(e.target.value))}
                className="w-full h-2 bg-emerald-50 rounded-lg appearance-none cursor-pointer accent-accent"
              />
              <p className="text-[10px] text-slate-400 font-medium text-center">Adjust the size of the English translation</p>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-auto p-6 bg-emerald-50/30 border-t border-emerald-50">
            <button 
              onClick={() => {
                setArabicFontSize(36)
                setTranslationFontSize(18)
                setArabicFontFamily('amiri')
              }}
              className="w-full py-4 rounded-2xl bg-white border border-emerald-100 text-sm font-bold text-primary hover:border-accent hover:text-accent transition-all duration-300"
            >
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
