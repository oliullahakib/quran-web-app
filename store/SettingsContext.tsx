'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface Settings {
  arabicFontSize: number
  translationFontSize: number
  arabicFontFamily: string
}

interface SettingsContextType extends Settings {
  setArabicFontSize: (size: number) => void
  setTranslationFontSize: (size: number) => void
  setArabicFontFamily: (font: string) => void
  isSettingsOpen: boolean
  setIsSettingsOpen: (open: boolean) => void
  resetSettings: () => void
}

const DEFAULT_SETTINGS: Settings = {
  arabicFontSize: 36,
  translationFontSize: 18,
  arabicFontFamily: 'amiri',
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [arabicFontSize, setArabicFontSize] = useState(DEFAULT_SETTINGS.arabicFontSize)
  const [translationFontSize, setTranslationFontSize] = useState(DEFAULT_SETTINGS.translationFontSize)
  const [arabicFontFamily, setArabicFontFamily] = useState(DEFAULT_SETTINGS.arabicFontFamily)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // 1. Initial Load (on mount)
  useEffect(() => {
    // Load from localStorage
    const savedArabicSize = localStorage.getItem('arabicFontSize')
    const savedTranslationSize = localStorage.getItem('translationFontSize')
    const savedFontFamily = localStorage.getItem('arabicFontFamily')

    if (savedArabicSize) setArabicFontSize(parseInt(savedArabicSize))
    if (savedTranslationSize) setTranslationFontSize(parseInt(savedTranslationSize))
    if (savedFontFamily) setArabicFontFamily(savedFontFamily)
    
    // Mark as initialized so saving effects can start
    setIsInitialized(true)
  }, [])

  // 2. Sync to CSS Variables (Always run on client to ensure styles are correct)
  useEffect(() => {
    if (!isInitialized) return
    document.documentElement.style.setProperty('--arabic-font-size', `${arabicFontSize}px`)
  }, [arabicFontSize, isInitialized])

  useEffect(() => {
    if (!isInitialized) return
    document.documentElement.style.setProperty('--translation-font-size', `${translationFontSize}px`)
  }, [translationFontSize, isInitialized])

  useEffect(() => {
    if (!isInitialized) return
    const fontValue = arabicFontFamily === 'amiri' ? 'var(--font-amiri)' : 'var(--font-scheherazade)'
    document.documentElement.style.setProperty('--font-arabic-family', fontValue)
  }, [arabicFontFamily, isInitialized])

  // 3. Persist to localStorage (Only after initialization to avoid overwriting)
  useEffect(() => {
    if (!isInitialized) return
    localStorage.setItem('arabicFontSize', arabicFontSize.toString())
    localStorage.setItem('translationFontSize', translationFontSize.toString())
    localStorage.setItem('arabicFontFamily', arabicFontFamily)
  }, [arabicFontSize, translationFontSize, arabicFontFamily, isInitialized])

  const resetSettings = () => {
    setArabicFontSize(DEFAULT_SETTINGS.arabicFontSize)
    setTranslationFontSize(DEFAULT_SETTINGS.translationFontSize)
    setArabicFontFamily(DEFAULT_SETTINGS.arabicFontFamily)
  }

  const value = React.useMemo(() => ({
    arabicFontSize,
    setArabicFontSize,
    translationFontSize,
    setTranslationFontSize,
    arabicFontFamily,
    setArabicFontFamily,
    isSettingsOpen,
    setIsSettingsOpen,
    resetSettings,
  }), [
    arabicFontSize, 
    translationFontSize, 
    arabicFontFamily, 
    isSettingsOpen
  ])

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}
