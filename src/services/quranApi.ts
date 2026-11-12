/**
 * Quran API Service
 *
 * Fetches Quran data from the Al Quran Cloud API (https://api.alquran.cloud/v2).
 * Provides methods for surahs, ayahs, search, and audio recitations.
 */

const BASE_URL = 'https://api.alquran.cloud/v1';

// ─── Types & Interfaces ────────────────────────────────────────────────────────

export interface Surah {
  number: number;
  name: string;             // Arabic name
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
}

export interface Ayah {
  number: number;            // Global ayah number
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean | { id: number; recommended: boolean; obligatory: boolean };
}

export interface SurahDetail {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: 'Meccan' | 'Medinan';
  numberOfAyahs: number;
  ayahs: Ayah[];
  edition?: Edition;
}

export interface Edition {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: 'text' | 'audio';
  type: 'quran' | 'translation' | 'versebyverse' | 'tafsir';
}

export interface SearchResult {
  count: number;
  matches: SearchMatch[];
}

export interface SearchMatch {
  number: number;
  text: string;
  numberInSurah: number;
  surah: Surah;
  edition: Edition;
}

interface ApiResponse<T> {
  code: number;
  status: string;
  data: T;
}

// ─── Available Reciters ─────────────────────────────────────────────────────────

export interface Reciter {
  identifier: string;
  name: string;
  nameAr: string;
}

export const RECITERS: Reciter[] = [
  {
    identifier: 'ar.alafasy',
    name: 'Mishary Rashid Alafasy',
    nameAr: 'مشاري راشد العفاسي',
  },
  {
    identifier: 'ar.abdulbasitmurattal',
    name: 'Abdul Basit (Murattal)',
    nameAr: 'عبد الباسط عبد الصمد - مرتل',
  },
  {
    identifier: 'ar.abdullahbasfar',
    name: 'Abdullah Basfar',
    nameAr: 'عبد الله بصفر',
  },
  {
    identifier: 'ar.abdurrahmaansudais',
    name: 'Abdurrahmaan As-Sudais',
    nameAr: 'عبد الرحمن السديس',
  },
  {
    identifier: 'ar.haboremahmoudalihassanaljazairi',
    name: 'Hani Ar-Rifai',
    nameAr: 'هاني الرفاعي',
  },
  {
    identifier: 'ar.husaboremary',
    name: 'Husary',
    nameAr: 'محمود خليل الحصري',
  },
  {
    identifier: 'ar.maaborheralmueaqly',
    name: 'Maher Al Muaiqly',
    nameAr: 'ماهر المعيقلي',
  },
  {
    identifier: 'ar.minshawimujawwad',
    name: 'Minshawi (Mujawwad)',
    nameAr: 'محمد صديق المنشاوي - مجود',
  },
  {
    identifier: 'ar.saaborelmajeed',
    name: 'Saad Al-Ghamdi',
    nameAr: 'سعد الغامدي',
  },
  {
    identifier: 'ar.parhizgar',
    name: 'Parhizgar',
    nameAr: 'شهريار پرهيزگار',
  },
];

// ─── API Helper ─────────────────────────────────────────────────────────────────

/**
 * Generic fetch wrapper with error handling.
 */
async function apiFetch<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const json: ApiResponse<T> = await response.json();

    if (json.code !== 200) {
      throw new Error(`API error: ${json.status}`);
    }

    return json.data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('لا يوجد اتصال بالإنترنت. يرجى التحقق من الاتصال والمحاولة مرة أخرى.');
    }
    throw error;
  }
}

// ─── Surah Methods ──────────────────────────────────────────────────────────────

/**
 * Get the list of all 114 Surahs.
 */
export async function getSurahList(): Promise<Surah[]> {
  return apiFetch<Surah[]>('/surah');
}

/**
 * Get a specific Surah with all its Ayahs.
 *
 * @param surahNumber - Surah number (1–114)
 * @param edition - Optional edition identifier (default: Arabic Quran text)
 *                  Examples: 'quran-uthmani', 'ar.alafasy' (audio), 'en.asad' (translation)
 */
export async function getSurah(
  surahNumber: number,
  edition: string = 'quran-uthmani'
): Promise<SurahDetail> {
  if (surahNumber < 1 || surahNumber > 114) {
    throw new Error('رقم السورة يجب أن يكون بين ١ و ١١٤');
  }
  return apiFetch<SurahDetail>(`/surah/${surahNumber}/${edition}`);
}

/**
 * Get a specific Surah in multiple editions at once (e.g., Arabic + translation).
 *
 * @param surahNumber - Surah number (1–114)
 * @param editions - Array of edition identifiers
 */
export async function getSurahMultiEdition(
  surahNumber: number,
  editions: string[]
): Promise<SurahDetail[]> {
  if (surahNumber < 1 || surahNumber > 114) {
    throw new Error('رقم السورة يجب أن يكون بين ١ و ١١٤');
  }
  const editionStr = editions.join(',');
  return apiFetch<SurahDetail[]>(`/surah/${surahNumber}/editions/${editionStr}`);
}

// ─── Ayah Methods ───────────────────────────────────────────────────────────────

/**
 * Get a specific Ayah by reference.
 *
 * @param reference - Ayah reference: global number (1–6236) or "surah:ayah" format (e.g., "2:255")
 * @param edition - Optional edition identifier
 */
export async function getAyah(
  reference: string | number,
  edition: string = 'quran-uthmani'
): Promise<Ayah & { surah: Surah; edition: Edition }> {
  return apiFetch(`/ayah/${reference}/${edition}`);
}

/**
 * Get a Juz (para) of the Quran.
 *
 * @param juzNumber - Juz number (1–30)
 * @param edition - Optional edition identifier
 */
export async function getJuz(
  juzNumber: number,
  edition: string = 'quran-uthmani'
): Promise<{ number: number; ayahs: Ayah[] }> {
  if (juzNumber < 1 || juzNumber > 30) {
    throw new Error('رقم الجزء يجب أن يكون بين ١ و ٣٠');
  }
  return apiFetch(`/juz/${juzNumber}/${edition}`);
}

// ─── Search ─────────────────────────────────────────────────────────────────────

/**
 * Search the Quran for a specific text query.
 *
 * @param query - The search query (Arabic text or transliteration)
 * @param edition - Edition to search in (default: Arabic Quran text)
 * @param surahNumber - Optional: limit search to a specific Surah
 */
export async function searchQuran(
  query: string,
  edition: string = 'quran-uthmani',
  surahNumber?: number
): Promise<SearchResult> {
  const surahParam = surahNumber ? `/${surahNumber}` : '/all';
  const data = await apiFetch<{ count: number; matches: SearchMatch[] }>(
    `/search/${encodeURIComponent(query)}${surahParam}/${edition}`
  );
  return {
    count: data.count,
    matches: data.matches,
  };
}

// ─── Audio ──────────────────────────────────────────────────────────────────────

/**
 * Get the audio edition details for a specific surah and reciter.
 * Returns the Surah with ayahs that each contain audio URLs.
 *
 * @param surahNumber - Surah number (1–114)
 * @param reciterIdentifier - Reciter edition identifier (e.g., 'ar.alafasy')
 */
export async function getAudioUrl(
  surahNumber: number,
  reciterIdentifier: string = 'ar.alafasy'
): Promise<SurahDetail> {
  if (surahNumber < 1 || surahNumber > 114) {
    throw new Error('رقم السورة يجب أن يكون بين ١ و ١١٤');
  }
  return apiFetch<SurahDetail>(`/surah/${surahNumber}/${reciterIdentifier}`);
}

/**
 * Get a single Ayah's audio.
 *
 * @param reference - Ayah reference (global number or "surah:ayah")
 * @param reciterIdentifier - Reciter edition identifier
 */
export async function getAyahAudio(
  reference: string | number,
  reciterIdentifier: string = 'ar.alafasy'
): Promise<Ayah & { audio: string; surah: Surah }> {
  return apiFetch(`/ayah/${reference}/${reciterIdentifier}`);
}

// ─── Random Ayah ────────────────────────────────────────────────────────────────

/**
 * Get a random Ayah from the Quran.
 * Useful for daily verse widgets or inspiration cards.
 *
 * @param edition - Optional edition identifier
 */
export async function getRandomAyah(
  edition: string = 'quran-uthmani'
): Promise<Ayah & { surah: Surah }> {
  // Generate a random ayah number between 1 and 6236
  const randomNumber = Math.floor(Math.random() * 6236) + 1;
  return apiFetch(`/ayah/${randomNumber}/${edition}`);
}
