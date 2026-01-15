
export type Screen = 'home' | 'dua' | 'dhikr' | 'hadith' | 'amal';

export interface PrayerTime {
  name: string;
  time: string;
  active: boolean;
}

export interface Hadith {
  id: number;
  collection: string;
  arabic: string;
  translation: string;
  reference: string;
}

export interface AmalItem {
  id: string;
  title: string;
  completed: boolean;
  time: string;
}

export interface DuaCategory {
  id: string;
  name: string;
  icon: string;
}
