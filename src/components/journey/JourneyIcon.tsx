import type { ReactNode } from 'react';
export type JourneyIconName = 'arrow' | 'down' | 'play' | 'pause' | 'check' | 'camera' | 'chart' | 'calendar' | 'food' | 'message' | 'bolt' | 'ruler' | 'grid' | 'user';

const paths: Record<JourneyIconName, ReactNode> = {
  arrow: <path d="M19 12H5m6-6-6 6 6 6" />,
  down: <path d="M12 4v16m-6-6 6 6 6-6" />,
  play: <path d="m9 5 10 7-10 7V5Z" />,
  pause: <path d="M8 5v14M16 5v14" />,
  check: <path d="m5 12 4 4L19 6" />,
  camera: <><path d="m8 5 1-2h6l1 2h4a2 2 0 0 1 2 2v12H2V7a2 2 0 0 1 2-2Z" /><circle cx="12" cy="12" r="4" /></>,
  chart: <path d="M3 3v18h18M7 14l5-5 4 3 5-8" />,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4m10-4v4M3 10h18m-14 5h3m4 0h3" /></>,
  food: <path d="M5 3v7m3-7v7M3 3v5a3 3 0 0 0 6 0V3M6 11v10M17 3v18m0-18c-5 3-5 10 0 10" />,
  message: <path d="M21 11a8 8 0 0 1-8 8H7l-5 3 2-6a8 8 0 1 1 17-5Z" />,
  bolt: <path d="m13 2-9 12h7l-1 8L21 9h-8l1-7Z" />,
  ruler: <><path d="m3 16 13-13 5 5L8 21Z" /><path d="m7 12 2 2m2-6 2 2m2-6 2 2" /></>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
  user: <><circle cx="12" cy="7" r="4" /><path d="M4 21v-2a8 8 0 0 1 16 0v2" /></>,
};

export default function JourneyIcon({ name }: { name: JourneyIconName }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
