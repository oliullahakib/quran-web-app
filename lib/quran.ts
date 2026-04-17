import quranData from '../data/quran.json'

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

// Type for the full dataset (array of surahs)
const quran: Surah[] = quranData as Surah[]

/**
 * Returns a list of all surahs with metadata (without verses to keep it lightweight)
 */
export const getAllSurahs = (): Omit<Surah, 'verses'>[] => {
  return quran.map(({ verses, ...surah }) => surah)
}

/**
 * Returns a single surah by its ID
 */
export const getSurahById = (id: number): Surah | undefined => {
  return quran.find((s) => s.id === id)
}

/**
 * Searches across all ayahs' English translations
 * @param query - The search string
 * @returns Array of matching ayahs with their surah context
 */
export interface SearchResult extends Verse {
  surahId: number
  surahName: string
}

export const searchAyahs = (query: string): SearchResult[] => {
  if (!query || query.length < 3) return []

  const results: SearchResult[] = []
  const lowerQuery = query.toLowerCase()

  for (const surah of quran) {
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
 * Searches across all surah names (transliteration, Arabic name, and translation)
 * @param query - The search string
 * @returns Array of matching surahs
 */
export const searchSurahs = (query: string): Omit<Surah, 'verses'>[] => {
  if (!query || query.length < 2) return []

  const lowerQuery = query.toLowerCase()

  return quran
    .filter((s) => 
      s.transliteration.toLowerCase().includes(lowerQuery) ||
      s.name.toLowerCase().includes(lowerQuery) ||
      s.translation.toLowerCase().includes(lowerQuery)
    )
    .map(({ verses, ...surah }) => surah)
}
