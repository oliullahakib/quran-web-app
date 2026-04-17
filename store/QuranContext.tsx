'use client'

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { getAllSurahs, searchAyahs, Surah, SearchResult } from '@/lib/quran'
import useDebounce from '@/hooks/useDebounce'

export interface Bookmark {
  id: number
  surahId: number
  surahName: string
  translation: string
}

interface QuranContextType {
  surahs: Omit<Surah, 'verses'>[]
  searchResults: SearchResult[]
  searchQuery: string
  setSearchQuery: (query: string) => void
  debouncedQuery: string
  isLoading: boolean
  // Settings
  arabicFontSize: number
  setArabicFontSize: (size: number) => void
  translationFontSize: number
  setTranslationFontSize: (size: number) => void
  arabicFontFamily: string
  setArabicFontFamily: (font: string) => void
  isSettingsOpen: boolean
  setIsSettingsOpen: (open: boolean) => void
  // Bookmarks
  bookmarks: Bookmark[]
  toggleBookmark: (bookmark: Bookmark) => void
  isBookmarked: (surahId: number, verseId: number) => boolean
}

const QuranContext = createContext<QuranContextType | undefined>(undefined)

export function QuranProvider({ children }: { children: React.ReactNode }) {
  const [surahs, setSurahs] = useState<Omit<Surah, 'verses'>[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Settings State
  const [arabicFontSize, setArabicFontSize] = useState(36)
  const [translationFontSize, setTranslationFontSize] = useState(18)
  const [arabicFontFamily, setArabicFontFamily] = useState('amiri')
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  // Bookmarks State
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])

  const debouncedQuery = useDebounce(searchQuery, 400)

  // Initialize and Load Persistence
  useEffect(() => {
    const data = getAllSurahs()
    setSurahs(data)
    setIsLoading(false)

    // Load from localStorage
    const savedArabicSize = localStorage.getItem('arabicFontSize')
    const savedTranslationSize = localStorage.getItem('translationFontSize')
    const savedFontFamily = localStorage.getItem('arabicFontFamily')
    const savedBookmarks = localStorage.getItem('bookmarks')

    if (savedArabicSize) setArabicFontSize(parseInt(savedArabicSize))
    if (savedTranslationSize) setTranslationFontSize(parseInt(savedTranslationSize))
    if (savedFontFamily) setArabicFontFamily(savedFontFamily)
    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks))
  }, [])

  // Sync settings and bookmarks to localStorage
  useEffect(() => {
    document.documentElement.style.setProperty('--arabic-font-size', `${arabicFontSize}px`)
    localStorage.setItem('arabicFontSize', arabicFontSize.toString())
  }, [arabicFontSize])

  useEffect(() => {
    document.documentElement.style.setProperty('--translation-font-size', `${translationFontSize}px`)
    localStorage.setItem('translationFontSize', translationFontSize.toString())
  }, [translationFontSize])

  useEffect(() => {
    const fontValue = arabicFontFamily === 'amiri' ? 'var(--font-amiri)' : 'var(--font-scheherazade)'
    document.documentElement.style.setProperty('--font-arabic-family', fontValue)
    localStorage.setItem('arabicFontFamily', arabicFontFamily)
  }, [arabicFontFamily])

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }, [bookmarks])

  const toggleBookmark = (bookmark: Bookmark) => {
    setBookmarks((prev) => {
      const exists = prev.find((b) => b.id === bookmark.id && b.surahId === bookmark.surahId)
      if (exists) {
        return prev.filter((b) => !(b.id === bookmark.id && b.surahId === bookmark.surahId))
      }
      return [...prev, bookmark]
    })
  }

  const isBookmarked = (surahId: number, verseId: number) => {
    return !!bookmarks.find((b) => b.id === verseId && b.surahId === surahId)
  }

  const searchResults = useMemo(() => {
    return searchAyahs(debouncedQuery)
  }, [debouncedQuery])

  const value = {
    surahs,
    searchResults,
    searchQuery,
    setSearchQuery,
    debouncedQuery,
    isLoading,
    arabicFontSize,
    setArabicFontSize,
    translationFontSize,
    setTranslationFontSize,
    arabicFontFamily,
    setArabicFontFamily,
    isSettingsOpen,
    setIsSettingsOpen,
    bookmarks,
    toggleBookmark,
    isBookmarked,
  }

  return (
    <QuranContext.Provider value={value}>
      {children}
    </QuranContext.Provider>
  )
}

export function useQuran() {
  const context = useContext(QuranContext)
  if (context === undefined) {
    throw new Error('useQuran must be used within a QuranProvider')
  }
  return context
}
