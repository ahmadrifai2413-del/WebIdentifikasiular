// Navigation anchors only. These are not animal observations or exact range boundaries.
export const REGIONS = [
  { name: 'Sumatra', lon: 101, lat: -0.3, range: 2200000 },
  { name: 'Jawa', lon: 110, lat: -7.3, range: 1500000 },
  { name: 'Kalimantan', lon: 114, lat: 0.5, range: 2000000 },
  { name: 'Sulawesi', lon: 121, lat: -2, range: 1800000 },
  { name: 'Nusa Tenggara', lon: 120, lat: -9, range: 1800000 },
  { name: 'Maluku', lon: 128.5, lat: -3.5, range: 1700000 },
  { name: 'Papua', lon: 137, lat: -4, range: 2200000 },
] as const;
export type RegionName = typeof REGIONS[number]['name'];
export type RegionChoice = 'all' | RegionName;
export type CameraTarget = { revision: number; kind: 'indonesia' | 'region' | 'species'; regions: string[] };
export const motionDuration = (seconds: number) => window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : seconds;
