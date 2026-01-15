
import React, { useState, useEffect } from 'react';
import { Home, Heart, Activity, BookOpen, User, Hash, ChevronRight, CheckCircle2, Search, Info, Cloud, CloudOff } from 'lucide-react';
import { Screen, PrayerTime, Hadith, AmalItem } from './types';
import { PRAYER_TIMES, MOCK_HADITHS, INITIAL_AMALS, DUA_CATEGORIES } from './constants';
import { getVerseOfTheDay, explainHadith } from './services/geminiService';

// --- Sub-components ---

const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`glass rounded-2xl p-6 shadow-xl ${className}`}>
    {children}
  </div>
);

const BottomNav: React.FC<{ current: Screen; setScreen: (s: Screen) => void }> = ({ current, setScreen }) => {
  const items = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'dua', icon: Heart, label: 'Dua' },
    { id: 'dhikr', icon: Hash, label: 'Dhikr' },
    { id: 'hadith', icon: BookOpen, label: 'Hadith' },
    { id: 'amal', icon: Activity, label: 'Amal' },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md glass rounded-full px-6 py-3 flex justify-between items-center z-50">
      {items.map(({ id, icon: Icon, label }) => {
        const isActive = current === id;
        return (
          <button
            key={id}
            onClick={() => setScreen(id as Screen)}
            className={`flex flex-col items-center transition-all duration-300 ${isActive ? 'scale-110 -translate-y-1 text-emerald-400' : 'text-slate-400'}`}
          >
            <Icon size={isActive ? 24 : 20} strokeWidth={isActive ? 2.5 : 2} />
            <span className={`text-[10px] mt-1 font-medium ${isActive ? 'opacity-100' : 'opacity-0'}`}>{label}</span>
          </button>
        );
      })}
    </div>
  );
};

// --- Screens ---

const HomeScreen: React.FC = () => {
  const [verse, setVerse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hour, setHour] = useState(new Date().getHours());

  useEffect(() => {
    const fetchVerse = async () => {
      const v = await getVerseOfTheDay();
      setVerse(v);
      setLoading(false);
    };
    fetchVerse();
  }, []);

  const getSkyGradient = (h: number) => {
    if (h >= 5 && h < 7) return 'from-orange-400 via-emerald-800 to-emerald-950'; // Dawn
    if (h >= 7 && h < 17) return 'from-emerald-600 via-emerald-800 to-emerald-950'; // Day
    if (h >= 17 && h < 19) return 'from-orange-500 via-purple-900 to-emerald-950'; // Sunset
    return 'from-slate-900 via-emerald-950 to-black'; // Night
  };

  return (
    <div className="space-y-6 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Prayer Card with Sky Animation */}
      <div className={`relative h-64 w-full rounded-3xl overflow-hidden bg-gradient-to-b ${getSkyGradient(hour)} transition-all duration-1000`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 p-8 flex flex-col justify-between h-full">
          <div>
            <h1 className="text-sm font-medium text-emerald-200">Next Prayer</h1>
            <h2 className="text-4xl font-bold mt-1">Dhuhr</h2>
            <p className="text-emerald-100/80 text-sm mt-1">In 02:45:12</p>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {PRAYER_TIMES.map((p) => (
              <div key={p.name} className={`flex-shrink-0 px-4 py-2 rounded-2xl ${p.active ? 'bg-white/20 border border-white/30 backdrop-blur-md' : 'bg-black/10'}`}>
                <p className="text-[10px] font-semibold text-emerald-200 uppercase">{p.name}</p>
                <p className="text-sm font-medium">{p.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Verse of the Day */}
      <div className="px-1">
        <h3 className="text-lg font-semibold mb-4 px-2">Verse of the Day</h3>
        <GlassCard className={loading ? 'shimmer h-40' : ''}>
          {loading ? null : (
            <div className="text-center">
              <p className="arabic text-2xl text-emerald-300 mb-4 leading-loose">{verse?.arabic}</p>
              <p className="text-slate-300 italic mb-2">"{verse?.translation}"</p>
              <p className="text-xs text-emerald-500 font-bold tracking-widest">{verse?.reference}</p>
            </div>
          )}
        </GlassCard>
      </div>

      {/* Daily Progress Mini */}
      <div className="grid grid-cols-2 gap-4 px-1">
        <GlassCard className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-emerald-500 flex items-center justify-center text-sm font-bold">
            75%
          </div>
          <div>
            <p className="text-xs text-slate-400">Daily Amal</p>
            <p className="text-sm font-semibold">Keep it up!</p>
          </div>
        </GlassCard>
        <GlassCard className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-yellow-500 flex items-center justify-center text-sm font-bold">
            12
          </div>
          <div>
            <p className="text-xs text-slate-400">Sunnah Acts</p>
            <p className="text-sm font-semibold">Completed</p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

const DhikrScreen: React.FC = () => {
  const [count, setCount] = useState(0);
  const [goal, setGoal] = useState(33);

  const handleTap = () => {
    setCount(prev => (prev < goal ? prev + 1 : 0));
    if ('vibrate' in navigator) navigator.vibrate(10);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[70vh] space-y-8 animate-in zoom-in-95 duration-500">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">SubhanAllah</h2>
        <p className="text-emerald-400">Glory be to Allah</p>
      </div>

      <div className="relative group">
        {/* Ripple Effect Background */}
        <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping group-active:animate-none opacity-50" />
        
        <button
          onClick={handleTap}
          className="relative w-64 h-64 rounded-full glass border-2 border-emerald-500/30 flex flex-col items-center justify-center transition-all active:scale-95 active:shadow-inner"
        >
          <span className="text-6xl font-bold text-white mb-2">{count}</span>
          <span className="text-sm text-emerald-400 font-medium tracking-widest">TAP TO COUNT</span>
          
          {/* Progress ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="120"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="4"
              className="text-white/5"
            />
            <circle
              cx="128"
              cy="128"
              r="120"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="4"
              strokeDasharray={2 * Math.PI * 120}
              strokeDashoffset={2 * Math.PI * 120 * (1 - count / goal)}
              className="text-emerald-500 transition-all duration-300"
            />
          </svg>
        </button>
      </div>

      <div className="flex gap-4">
        <button onClick={() => setCount(0)} className="px-6 py-2 glass rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/10">Reset</button>
        <button onClick={() => setGoal(goal === 33 ? 100 : 33)} className="px-6 py-2 glass rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/10">Goal: {goal}</button>
      </div>
    </div>
  );
};

const HadithScreen: React.FC = () => {
  const [selectedHadith, setSelectedHadith] = useState<Hadith | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loadingExpl, setLoadingExpl] = useState(false);

  const handleExplain = async (h: Hadith) => {
    setSelectedHadith(h);
    setLoadingExpl(true);
    const expl = await explainHadith(h.arabic, h.translation);
    setExplanation(expl);
    setLoadingExpl(false);
  };

  return (
    <div className="space-y-6 pb-24">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold">Daily Hadith</h2>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-emerald-950/50 border border-emerald-500/20 rounded-full py-1 px-4 pl-10 text-sm focus:outline-none focus:border-emerald-500/50 w-48"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
        </div>
      </div>

      <div className="space-y-4">
        {MOCK_HADITHS.map((h) => (
          <GlassCard key={h.id} className="relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <BookOpen size={48} />
            </div>
            <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-3">{h.collection}</p>
            <p className="arabic text-xl text-emerald-100 text-right leading-loose mb-4">{h.arabic}</p>
            <p className="text-slate-300 mb-4">{h.translation}</p>
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-slate-500 font-medium uppercase">{h.reference}</span>
              <button 
                onClick={() => handleExplain(h)}
                className="flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300"
              >
                EXPLAIN <Info size={14} />
              </button>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Explanation Bottom Sheet */}
      {selectedHadith && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-end justify-center p-4" onClick={() => { setSelectedHadith(null); setExplanation(null); }}>
          <div 
            className="w-full max-w-lg glass rounded-t-[2.5rem] p-8 space-y-6 animate-in slide-in-from-bottom-full duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto" />
            <div>
              <h3 className="text-xl font-bold text-emerald-400 mb-2">Sharh (Explanation)</h3>
              <p className="text-xs text-slate-400 mb-6 uppercase tracking-widest">{selectedHadith.collection}</p>
              
              {loadingExpl ? (
                <div className="space-y-3">
                  <div className="h-4 w-full shimmer rounded" />
                  <div className="h-4 w-[90%] shimmer rounded" />
                  <div className="h-4 w-[95%] shimmer rounded" />
                </div>
              ) : (
                <div className="text-slate-200 leading-relaxed text-sm">
                  {explanation}
                </div>
              )}
            </div>
            <button 
              onClick={() => { setSelectedHadith(null); setExplanation(null); }}
              className="w-full py-4 bg-emerald-600 rounded-2xl font-bold hover:bg-emerald-500 transition-colors"
            >
              GOT IT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const AmalScreen: React.FC = () => {
  const [amals, setAmals] = useState<AmalItem[]>(INITIAL_AMALS);

  const toggleAmal = (id: string) => {
    setAmals(prev => prev.map(a => a.id === id ? { ...a, completed: !a.completed } : a));
  };

  const completedCount = amals.filter(a => a.completed).length;

  return (
    <div className="space-y-6 pb-24">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold">Daily Amal</h2>
          <p className="text-emerald-400 text-sm mt-1">Sunnah Acts & Trackers</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">{completedCount}/{amals.length}</p>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Done Today</p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-emerald-500/20" />
        <div className="space-y-6">
          {amals.map((a, i) => (
            <div 
              key={a.id} 
              className={`relative pl-14 transition-all duration-300 ${a.completed ? 'opacity-50' : 'opacity-100'}`}
              onClick={() => toggleAmal(a.id)}
            >
              <div className={`absolute left-0 top-1 w-12 h-12 rounded-full glass border-2 flex items-center justify-center transition-all z-10 ${a.completed ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-emerald-500/20 text-emerald-500'}`}>
                {a.completed ? <CheckCircle2 size={24} /> : <div className="w-3 h-3 rounded-full bg-emerald-500/40" />}
              </div>
              <GlassCard className="cursor-pointer hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className={`font-semibold ${a.completed ? 'line-through' : ''}`}>{a.title}</h4>
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-1">{a.time}</p>
                  </div>
                  <ChevronRight size={18} className="text-slate-600" />
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>

      <GlassCard className="bg-emerald-900/20 border-emerald-500/30">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-yellow-500/10 text-yellow-500">
            <Info size={24} />
          </div>
          <div>
            <h4 className="font-bold">Next Goal</h4>
            <p className="text-xs text-slate-300">Complete 3 more acts to unlock the 'Faithful' badge.</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

const DuaScreen: React.FC = () => {
  return (
    <div className="space-y-6 pb-24">
      <h2 className="text-3xl font-bold mb-2">Dua Library</h2>
      <div className="grid grid-cols-2 gap-4">
        {DUA_CATEGORIES.map((cat) => (
          <GlassCard key={cat.id} className="flex flex-col items-center justify-center py-8 group cursor-pointer hover:border-emerald-500/50 transition-all">
            <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</span>
            <span className="text-sm font-bold uppercase tracking-widest">{cat.name}</span>
          </GlassCard>
        ))}
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">Saved Duas</h3>
        <div className="space-y-3">
          {['Morning Azkar', 'Before Eating', 'Entering Mosque'].map((d) => (
            <div key={d} className="flex items-center justify-between p-4 glass rounded-2xl">
              <span className="text-sm font-medium">{d}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">SAVED</span>
                <ChevronRight size={16} className="text-slate-600" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [online, setOnline] = useState(true);

  return (
    <div className="min-h-screen max-w-lg mx-auto bg-[#022c22] relative overflow-x-hidden">
      {/* Header */}
      <header className="px-6 py-6 flex justify-between items-center sticky top-0 bg-[#022c22]/80 backdrop-blur-lg z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl italic">N</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight">Nur</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${online ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-500/10 text-slate-500'}`}>
            {online ? <Cloud size={14} /> : <CloudOff size={14} />}
            {online ? 'Synced' : 'Offline'}
          </div>
          <button className="w-10 h-10 rounded-full glass flex items-center justify-center">
            <User size={20} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="px-6 pt-2">
        {screen === 'home' && <HomeScreen />}
        {screen === 'dua' && <DuaScreen />}
        {screen === 'dhikr' && <DhikrScreen />}
        {screen === 'hadith' && <HadithScreen />}
        {screen === 'amal' && <AmalScreen />}
      </main>

      {/* Bottom Navigation */}
      <BottomNav current={screen} setScreen={setScreen} />
    </div>
  );
}
