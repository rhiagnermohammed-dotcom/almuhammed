/**
 * Qibla Direction Calculator
 *
 * Calculates the bearing from a given location to the Kaaba
 * in Makkah using the great circle (spherical trigonometry) formula.
 */

// Kaaba coordinates (Masjid al-Haram, Makkah)
const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

/**
 * Calculate the Qibla direction (bearing) from a given location.
 *
 * Uses the great circle formula:
 *   bearing = atan2(
 *     sin(ΔL) · cos(φ₂),
 *     cos(φ₁) · sin(φ₂) − sin(φ₁) · cos(φ₂) · cos(ΔL)
 *   )
 *
 * @param latitude  - Observer's latitude in decimal degrees
 * @param longitude - Observer's longitude in decimal degrees
 * @returns Bearing in degrees from North (0°–360°), clockwise
 */
export function calculateQiblaDirection(latitude: number, longitude: number): number {
  const φ1 = latitude * DEG_TO_RAD;
  const φ2 = KAABA_LAT * DEG_TO_RAD;
  const ΔL = (KAABA_LNG - longitude) * DEG_TO_RAD;

  const x = Math.sin(ΔL) * Math.cos(φ2);
  const y =
    Math.cos(φ1) * Math.sin(φ2) -
    Math.sin(φ1) * Math.cos(φ2) * Math.cos(ΔL);

  let bearing = Math.atan2(x, y) * RAD_TO_DEG;

  // Normalize to [0, 360)
  bearing = ((bearing % 360) + 360) % 360;

  return Math.round(bearing * 100) / 100; // 2 decimal places
}

/**
 * Calculate the great-circle distance to the Kaaba in kilometers.
 * Uses the Haversine formula.
 *
 * @param latitude  - Observer's latitude in decimal degrees
 * @param longitude - Observer's longitude in decimal degrees
 * @returns Distance in kilometers
 */
export function distanceToKaaba(latitude: number, longitude: number): number {
  const R = 6371; // Earth's radius in km

  const φ1 = latitude * DEG_TO_RAD;
  const φ2 = KAABA_LAT * DEG_TO_RAD;
  const Δφ = (KAABA_LAT - latitude) * DEG_TO_RAD;
  const Δλ = (KAABA_LNG - longitude) * DEG_TO_RAD;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

/**
 * Get a cardinal direction label for the Qibla bearing.
 *
 * @param bearing - Qibla bearing in degrees
 * @returns Arabic cardinal/intercardinal direction label
 */
export function getQiblaCardinalDirection(bearing: number): string {
  const directions = [
    { min: 0, max: 22.5, label: 'شمال' },
    { min: 22.5, max: 67.5, label: 'شمال شرق' },
    { min: 67.5, max: 112.5, label: 'شرق' },
    { min: 112.5, max: 157.5, label: 'جنوب شرق' },
    { min: 157.5, max: 202.5, label: 'جنوب' },
    { min: 202.5, max: 247.5, label: 'جنوب غرب' },
    { min: 247.5, max: 292.5, label: 'غرب' },
    { min: 292.5, max: 337.5, label: 'شمال غرب' },
    { min: 337.5, max: 360, label: 'شمال' },
  ];

  const dir = directions.find((d) => bearing >= d.min && bearing < d.max);
  return dir?.label ?? 'شمال';
}
