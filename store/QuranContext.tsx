'use client'

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { getAllSurahs, searchAyahs, searchSurahs, Surah, SearchResult } from '@/lib/quran'
import useDebounce from '@/hooks/useDebounce'

export interface Bookmark {
  id: number
  surahId: number
  surahName: string
  translation: string
}

interface QuranContextType {
  surahs: Omit<Surah, 'verses'>[]
  matchedSurahs: Omit<Surah, 'verses'>[]
  searchResults: SearchResult[]
  searchQuery: string
  setSearchQuery: (query: string) => void
  debouncedQuery: string
  isLoading: boolean
  isSettingsOpen?: never // Removed, use useSettings() instead
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


  // Bookmarks State
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])

  const debouncedQuery = useDebounce(searchQuery, 400)

  // Initialize and Load Persistence
  useEffect(() => {
    const data = getAllSurahs()
    setSurahs(data)
    setIsLoading(false)

    // Load from localStorage
    const savedBookmarks = localStorage.getItem('bookmarks')
    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks))
  }, [])


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

  const matchedSurahs = useMemo(() => {
    return searchSurahs(debouncedQuery)
  }, [debouncedQuery])

  const value = useMemo(() => ({
    surahs,
    matchedSurahs,
    searchResults,
    searchQuery,
    setSearchQuery,
    debouncedQuery,
    isLoading,
    bookmarks,
    toggleBookmark,
    isBookmarked,
  }), [surahs, matchedSurahs, searchResults, searchQuery, debouncedQuery, isLoading, bookmarks])

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
