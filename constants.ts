
import { PrayerTime, Hadith, AmalItem, DuaCategory } from './types';

export const PRAYER_TIMES: PrayerTime[] = [
  { name: 'Fajr', time: '05:12 AM', active: false },
  { name: 'Sunrise', time: '06:34 AM', active: false },
  { name: 'Dhuhr', time: '12:15 PM', active: true },
  { name: 'Asr', time: '03:45 PM', active: false },
  { name: 'Maghrib', time: '06:10 PM', active: false },
  { name: 'Isha', time: '07:32 PM', active: false },
];

export const MOCK_HADITHS: Hadith[] = [
  {
    id: 1,
    collection: 'Sahih Bukhari',
    arabic: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ',
    translation: 'Actions are judged by intentions.',
    reference: 'Vol. 1, Book 1, Hadith 1'
  },
  {
    id: 2,
    collection: 'Sahih Muslim',
    arabic: 'الطُّهُورُ شَطْرُ الإِيمَانِ',
    translation: 'Purity is half of faith.',
    reference: 'Book 2, Hadith 432'
  }
];

export const INITIAL_AMALS: AmalItem[] = [
  { id: '1', title: 'Morning Azkar', completed: false, time: 'After Fajr' },
  { id: '2', title: 'Surah Al-Mulk', completed: false, time: 'Before Sleep' },
  { id: '3', title: 'Miswak before prayer', completed: true, time: 'Daily' },
  { id: '4', title: 'Tahajjud Prayer', completed: false, time: 'Third of Night' },
];

export const DUA_CATEGORIES: DuaCategory[] = [
  { id: 'morning', name: 'Morning', icon: '☀️' },
  { id: 'evening', name: 'Evening', icon: '🌙' },
  { id: 'travel', name: 'Travel', icon: '✈️' },
  { id: 'protection', name: 'Protection', icon: '🛡️' },
  { id: 'gratitude', name: 'Gratitude', icon: '🤲' },
  { id: 'healing', name: 'Healing', icon: '🌿' },
];
