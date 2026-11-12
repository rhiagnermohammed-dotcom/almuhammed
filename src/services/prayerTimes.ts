/**
 * Prayer Times Calculator
 *
 * Implements astronomical calculations for Islamic prayer times.
 * Based on solar position equations (declination, equation of time)
 * with support for multiple calculation methods and juristic schools.
 */

// ─── Types & Interfaces ────────────────────────────────────────────────────────

export interface PrayerTimes {
  fajr: string;     // HH:MM format
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export interface PrayerTimesConfig {
  latitude: number;
  longitude: number;
  method: CalculationMethod;
  asrJuristic: 0 | 1; // 0 = Standard (Shafi'i/Maliki/Hanbali), 1 = Hanafi
}

export enum CalculationMethod {
  MWL = 'MWL',
  ISNA = 'ISNA',
  Egypt = 'Egypt',
  Makkah = 'Makkah',
  Karachi = 'Karachi',
  Tehran = 'Tehran',
}

/** Fajr angle, Isha angle (negative means minutes after Maghrib) */
interface MethodParams {
  fajrAngle: number;
  ishaAngle: number;
  ishaMinutes: number; // 0 if using angle, >0 if fixed minutes after Maghrib
}

// ─── Calculation Method Parameters ─────────────────────────────────────────────

const METHOD_PARAMS: Record<CalculationMethod, MethodParams> = {
  [CalculationMethod.MWL]:     { fajrAngle: 18,   ishaAngle: 17,   ishaMinutes: 0 },
  [CalculationMethod.ISNA]:    { fajrAngle: 15,   ishaAngle: 15,   ishaMinutes: 0 },
  [CalculationMethod.Egypt]:   { fajrAngle: 19.5, ishaAngle: 17.5, ishaMinutes: 0 },
  [CalculationMethod.Makkah]:  { fajrAngle: 18.5, ishaAngle: 0,    ishaMinutes: 90 },
  [CalculationMethod.Karachi]: { fajrAngle: 18,   ishaAngle: 18,   ishaMinutes: 0 },
  [CalculationMethod.Tehran]:  { fajrAngle: 17.7, ishaAngle: 14,   ishaMinutes: 0 },
};

// ─── Math Helpers ───────────────────────────────────────────────────────────────

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

function dtr(degrees: number): number {
  return degrees * DEG_TO_RAD;
}

function rtd(radians: number): number {
  return radians * RAD_TO_DEG;
}

function sin(degrees: number): number {
  return Math.sin(dtr(degrees));
}

function cos(degrees: number): number {
  return Math.cos(dtr(degrees));
}

function tan(degrees: number): number {
  return Math.tan(dtr(degrees));
}

function arcsin(x: number): number {
  return rtd(Math.asin(x));
}

function arccos(x: number): number {
  return rtd(Math.acos(x));
}

function arctan2(y: number, x: number): number {
  return rtd(Math.atan2(y, x));
}

/** Fix angle to be in [0, 360) range */
function fixAngle(angle: number): number {
  return ((angle % 360) + 360) % 360;
}

/** Fix hour to be in [0, 24) range */
function fixHour(hour: number): number {
  return ((hour % 24) + 24) % 24;
}

// ─── Solar Position Calculations ────────────────────────────────────────────────

/**
 * Calculate the Julian Date for a given calendar date.
 */
function julianDate(year: number, month: number, day: number): number {
  if (month <= 2) {
    year -= 1;
    month += 12;
  }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (year + 4716)) +
         Math.floor(30.6001 * (month + 1)) +
         day + B - 1524.5;
}

/**
 * Calculate sun declination and equation of time for a given Julian date.
 */
function sunPosition(jd: number): { declination: number; equationOfTime: number } {
  const D = jd - 2451545.0; // Days since J2000.0

  // Mean anomaly of the Sun
  const g = fixAngle(357.529 + 0.98560028 * D);

  // Mean longitude of the Sun
  const q = fixAngle(280.459 + 0.98564736 * D);

  // Ecliptic longitude of the Sun
  const L = fixAngle(q + 1.915 * sin(g) + 0.020 * sin(2 * g));

  // Obliquity of the ecliptic
  const e = 23.439 - 0.00000036 * D;

  // Right ascension (in degrees)
  const RA = arctan2(cos(e) * sin(L), cos(L)) / 15;

  // Equation of time (in hours)
  const equationOfTime = q / 15 - fixHour(RA);

  // Sun declination
  const declination = arcsin(sin(e) * sin(L));

  return { declination, equationOfTime };
}

// ─── Prayer Time Computation ────────────────────────────────────────────────────

/**
 * Compute the time at which the sun is at a given angle below the horizon.
 * direction: 'CW' for afternoon/evening (positive offset from noon),
 *            'CCW' for morning (negative offset from noon).
 */
function sunAngleTime(
  angle: number,
  latitude: number,
  declination: number,
  direction: 'CW' | 'CCW'
): number {
  const cosAngle =
    (-sin(angle) - sin(latitude) * sin(declination)) /
    (cos(latitude) * cos(declination));

  // Clamp to [-1, 1] to avoid NaN at extreme latitudes
  const clamped = Math.max(-1, Math.min(1, cosAngle));
  const hourAngle = arccos(clamped) / 15;

  return direction === 'CCW' ? -hourAngle : hourAngle;
}

/**
 * Calculate the Asr time using the shadow length factor.
 * Shafi'i: shadow = object height (factor = 1)
 * Hanafi:  shadow = 2 × object height (factor = 2)
 */
function asrTime(
  juristic: 0 | 1,
  latitude: number,
  declination: number
): number {
  const factor = juristic === 0 ? 1 : 2;
  const angle = -arccos(
    (sin(arccos(1 / (factor + tan(Math.abs(latitude - declination))))) -
      sin(latitude) * sin(declination)) /
    (cos(latitude) * cos(declination))
  ) as number;

  // Use the proper formula: the sun angle for Asr
  const d = declination;
  const acot = (x: number) => arctan2(1, x);
  const asrAngle = acot(factor + tan(Math.abs(latitude - d)));

  const cosHA =
    (sin(90 - asrAngle) - sin(latitude) * sin(d)) /
    (cos(latitude) * cos(d));

  const clamped = Math.max(-1, Math.min(1, cosHA));
  return arccos(clamped) / 15;
}

/**
 * Format decimal hours as HH:MM string.
 */
function formatTime(hours: number): string {
  hours = fixHour(hours);
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  // Handle minute overflow
  const adjustedH = m === 60 ? h + 1 : h;
  const adjustedM = m === 60 ? 0 : m;
  return `${String(adjustedH % 24).padStart(2, '0')}:${String(adjustedM).padStart(2, '0')}`;
}

// ─── Main Calculation ───────────────────────────────────────────────────────────

/**
 * Calculate Islamic prayer times for a given date and configuration.
 *
 * @param date - The date to calculate prayer times for
 * @param config - Latitude, longitude, calculation method, and Asr juristic school
 * @returns Prayer times in HH:MM format (24-hour)
 */
export function calculatePrayerTimes(date: Date, config: PrayerTimesConfig): PrayerTimes {
  const { latitude, longitude, method, asrJuristic } = config;
  const params = METHOD_PARAMS[method];

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const jd = julianDate(year, month, day);
  const { declination, equationOfTime } = sunPosition(jd);

  // Timezone offset in hours (positive = east of UTC)
  const timezone = -date.getTimezoneOffset() / 60;

  // Transit time (Dhuhr) — when the sun crosses the meridian
  const transit = 12 + timezone - longitude / 15 - equationOfTime;

  // Fajr: sun is at fajrAngle degrees below the horizon (before sunrise)
  const fajrOffset = sunAngleTime(params.fajrAngle, latitude, declination, 'CCW');
  const fajr = transit + fajrOffset;

  // Sunrise: sun is at 0.833 degrees below the horizon (accounts for refraction + sun radius)
  const sunriseOffset = sunAngleTime(0.833, latitude, declination, 'CCW');
  const sunrise = transit + sunriseOffset;

  // Dhuhr: solar noon with a small safety margin (1–2 minutes)
  const dhuhr = transit + 2 / 60; // Add 2 minutes as precaution

  // Asr: based on juristic school
  const asrOffset = asrTime(asrJuristic, latitude, declination);
  const asr = transit + asrOffset;

  // Maghrib: sun is at 0.833 degrees below the horizon (after sunset)
  const maghribOffset = sunAngleTime(0.833, latitude, declination, 'CW');
  const maghrib = transit + maghribOffset;

  // Isha: depends on method — either angle-based or fixed minutes after Maghrib
  let isha: number;
  if (params.ishaMinutes > 0) {
    isha = transit + maghribOffset + params.ishaMinutes / 60;
  } else {
    const ishaOffset = sunAngleTime(params.ishaAngle, latitude, declination, 'CW');
    isha = transit + ishaOffset;
  }

  return {
    fajr: formatTime(fajr),
    sunrise: formatTime(sunrise),
    dhuhr: formatTime(dhuhr),
    asr: formatTime(asr),
    maghrib: formatTime(maghrib),
    isha: formatTime(isha),
  };
}

// ─── Next Prayer Helper ─────────────────────────────────────────────────────────

const PRAYER_NAMES_AR: Record<string, string> = {
  fajr: 'الفجر',
  sunrise: 'الشروق',
  dhuhr: 'الظهر',
  asr: 'العصر',
  maghrib: 'المغرب',
  isha: 'العشاء',
};

const PRAYER_ORDER: (keyof PrayerTimes)[] = [
  'fajr',
  'sunrise',
  'dhuhr',
  'asr',
  'maghrib',
  'isha',
];

/**
 * Parse an HH:MM time string into total minutes since midnight.
 */
function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

/**
 * Format a duration in minutes as a human-readable Arabic string.
 */
function formatRemaining(totalMinutes: number): string {
  if (totalMinutes < 0) totalMinutes += 24 * 60;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes} دقيقة`;
  if (minutes === 0) return `${hours} ساعة`;
  return `${hours} ساعة و ${minutes} دقيقة`;
}

/**
 * Determine the next upcoming prayer and how much time remains.
 *
 * @param prayerTimes - The calculated prayer times for today
 * @returns The next prayer name (Arabic), its time, and remaining duration
 */
export function getNextPrayer(
  prayerTimes: PrayerTimes
): { name: string; nameAr: string; time: string; remaining: string } {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  for (const key of PRAYER_ORDER) {
    const prayerMinutes = timeToMinutes(prayerTimes[key]);
    if (prayerMinutes > currentMinutes) {
      return {
        name: key,
        nameAr: PRAYER_NAMES_AR[key],
        time: prayerTimes[key],
        remaining: formatRemaining(prayerMinutes - currentMinutes),
      };
    }
  }

  // All prayers have passed — next prayer is Fajr (tomorrow)
  const fajrMinutes = timeToMinutes(prayerTimes.fajr);
  const remaining = 24 * 60 - currentMinutes + fajrMinutes;
  return {
    name: 'fajr',
    nameAr: PRAYER_NAMES_AR.fajr,
    time: prayerTimes.fajr,
    remaining: formatRemaining(remaining),
  };
}
