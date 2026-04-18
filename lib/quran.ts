
export interface Verse {
  id: number
  text: string
  translation: string
}

export interface Surah {
  id: number
  name: string
  transliteration: string
  translation: string
  type: string
  total_verses: number
  verses?: Verse[]
}

export interface SearchResult extends Verse {
  surahId: number
  surahName: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5500'

/**
 * Global cache for surahs to avoid redundant fetches in the same session
 */
let cachedSurahs: Surah[] | null = null

/**
 * Fetches all surahs from the API
 */
export const fetchAllData = async (): Promise<Surah[]> => {
  if (cachedSurahs) return cachedSurahs

  try {
    const res = await fetch(`${API_URL}/surahs`, {
      next: { revalidate: 3600 } // Cache for 1 hour in Next.js
    })
    
    if (!res.ok) throw new Error('Failed to fetch Quran data')
    
    const data = await res.json()
    cachedSurahs = data
    return data
  } catch (error) {
    console.error('Error fetching Quran data:', error)
    return []
  }
}

/**
 * Returns a list of all surahs with metadata (without verses to keep it lightweight if possible)
 */
export const getAllSurahs = async (): Promise<Omit<Surah, 'verses'>[]> => {
  const surahs = await fetchAllData()
  return surahs.map(({ verses, ...surah }) => surah)
}

/**
 * Returns a single surah by its ID
 */
export const getSurahById = async (id: number): Promise<Surah | undefined> => {
  const surahs = await fetchAllData()
  return surahs.find((s) => s.id === id)
}

/**
 * Searches across all ayahs' English translations
 */
export const searchAyahs = async (query: string): Promise<SearchResult[]> => {
  if (!query || query.length < 3) return []

  const surahs = await fetchAllData()
  const results: SearchResult[] = []
  const lowerQuery = query.toLowerCase()

  for (const surah of surahs) {
    if (surah.verses) {
      for (const verse of surah.verses) {
        if (verse.translation.toLowerCase().includes(lowerQuery)) {
          results.push({
            ...verse,
            surahId: surah.id,
            surahName: surah.transliteration,
          })
        }
      }
    }
  }

  return results
}

/**
 * Searches across all surah names
 */
export const searchSurahs = async (query: string): Promise<Omit<Surah, 'verses'>[]> => {
  if (!query || query.length < 2) return []

  const surahs = await fetchAllData()
  const lowerQuery = query.toLowerCase()

  return surahs
    .filter((s) => 
      s.transliteration.toLowerCase().includes(lowerQuery) ||
      s.name.toLowerCase().includes(lowerQuery) ||
      s.translation.toLowerCase().includes(lowerQuery)
    )
    .map(({ verses, ...surah }) => surah)
}
