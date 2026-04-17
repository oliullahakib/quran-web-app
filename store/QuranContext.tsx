'use client'

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { getAllSurahs, searchAyahs, Surah, SearchResult } from '@/lib/quran'
import useDebounce from '@/hooks/useDebounce'

interface QuranContextType {
  surahs: Omit<Surah, 'verses'>[]
  searchResults: SearchResult[]
  searchQuery: string
  setSearchQuery: (query: string) => void
  debouncedQuery: string
  isLoading: boolean
}

const QuranContext = createContext<QuranContextType | undefined>(undefined)

export function QuranProvider({ children }: { children: React.ReactNode }) {
  const [surahs, setSurahs] = useState<Omit<Surah, 'verses'>[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const debouncedQuery = useDebounce(searchQuery, 400)

  useEffect(() => {
    // Initialize surah list
    const data = getAllSurahs()
    setSurahs(data)
    setIsLoading(false)
  }, [])

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
