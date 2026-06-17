import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../utils/api';
import { 
  Award, 
  Calendar, 
  Search, 
  Filter, 
  CheckCircle,
  ExternalLink,
  DollarSign,
  TrendingUp,
  Sparkles,
  SunMedium,
  MoonStar,
  Globe,
  Compass,
  ArrowRight,
  BookOpen,
  ChevronDown
} from 'lucide-react';
import { scholarships as localScholarships } from '../data/opportunityData';

const themeTokens = {
  dark: {
    shell: 'bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.14),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(217,70,239,0.1),_transparent_30%),linear-gradient(180deg,_#04060f,_#080d19)] text-slate-100 min-h-screen',
    surface: 'border-white/10 bg-white/5 backdrop-blur-xl text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]',
    muted: 'text-slate-400',
    panel: 'border-white/10 bg-slate-950/45 text-white shadow-[0_24px_80px_rgba(0,0,0,0.65)]',
    input: 'border-white/10 bg-slate-950/60 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20',
    cardHover: 'hover:border-indigo-500/30 hover:bg-white/10',
    navActive: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
    navInactive: 'bg-white/5 text-slate-300 border-white/5 hover:bg-white/10',
    textMain: 'text-white',
  },
  light: {
    shell: 'bg-[radial-gradient(circle_at_top_left,_rgba(79,70,229,0.06),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.06),_transparent_30%),linear-gradient(180deg,_#f8fafc,_#f1f5f9)] text-slate-900 min-h-screen',
    surface: 'border-slate-200/80 bg-white/75 backdrop-blur-xl text-slate-800 shadow-[0_10px_30px_rgba(15,23,42,0.04)]',
    muted: 'text-slate-600',
    panel: 'border-slate-200/80 bg-white/80 text-slate-900 shadow-[0_25px_60px_rgba(15,23,42,0.04)]',
    input: 'border-slate-200 bg-white/90 text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600/20',
    cardHover: 'hover:border-indigo-500/20 hover:bg-white hover:shadow-lg',
    navActive: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    navInactive: 'bg-slate-100 text-slate-700 border-slate-200/60 hover:bg-slate-200',
    textMain: 'text-slate-900',
  },
};

export default function ScholarshipPortal() {
  const [theme, setTheme] = useState(() => localStorage.getItem('careerExplorerTheme') || 'dark');
  const [dbScholarships, setDbScholarships] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Advanced filters state
  const [filters, setFilters] = useState({
    classLevel: '',
    course: '',
    category: '', // Government, Private, Merit-Based, Need-Based, International, Fully Funded
    state: '',
    gender: '',
    income: ''
  });

  useEffect(() => {
    localStorage.setItem('careerExplorerTheme', theme);
  }, [theme]);

  const tokens = themeTokens[theme];

  // Fetch from backend API as dynamic additions
  useEffect(() => {
    const fetchDbScholarships = async () => {
      setLoading(true);
      try {
        const res = await api.get('/scholarships');
        if (res.data.success) {
          setDbScholarships(res.data.scholarships || []);
        }
      } catch (err) {
        console.error("Backend offline. Loaded static datasets instead.", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDbScholarships();
  }, []);

  // Merge backend DB records with local static records, avoiding duplication by title
  const mergedScholarships = useMemo(() => {
    const localMapped = localScholarships.map(s => ({
      ...s,
      provider: s.category + ' Sponsor',
      description: s.eligibility,
      eligibilityDetails: [s.eligibility],
      applicationLink: s.applyLink
    }));

    const dbMapped = dbScholarships.map(s => ({
      id: s._id,
      title: s.title,
      category: s.category || 'General',
      amount: s.amount || 'Varies',
      eligibility: s.eligibility?.join(', ') || 'Undergrad/Grad study',
      deadline: s.deadline ? s.deadline.split('T')[0] : '2026-12-31',
      applyLink: s.applicationLink || 'https://scholarships.gov.in',
      provider: s.provider || 'State Department',
      description: s.description || 'Educational grants assistance support.',
      eligibilityDetails: s.eligibility || [],
      applicationLink: s.applicationLink || 'https://scholarships.gov.in'
    }));

    // Filter out duplicates based on title key
    const all = [...dbMapped];
    localMapped.forEach(localItem => {
      if (!all.some(item => item.title.toLowerCase() === localItem.title.toLowerCase())) {
        all.push(localItem);
      }
    });

    return all;
  }, [dbScholarships]);

  // Apply filters on combined array
  const filteredScholarships = useMemo(() => {
    return mergedScholarships.filter((sch) => {
      // Search bar
      if (search) {
        const query = search.toLowerCase();
        const matchesSearch = 
          sch.title.toLowerCase().includes(query) ||
          sch.category.toLowerCase().includes(query) ||
          sch.description.toLowerCase().includes(query) ||
          sch.provider.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Advanced filters dropdowns
      if (filters.classLevel && sch.classLevel && sch.classLevel !== filters.classLevel) return false;
      if (filters.course && sch.course && sch.course !== 'All' && sch.course !== filters.course) return false;
      if (filters.category && sch.category !== filters.category) return false;
      if (filters.state && sch.state && sch.state !== 'All States' && sch.state !== filters.state) return false;
      if (filters.gender && sch.gender && sch.gender !== 'All' && sch.gender !== filters.gender) return false;
      
      // Income matching checks
      if (filters.income && sch.income) {
        const queryIncome = filters.income.toLowerCase();
        if (!sch.income.toLowerCase().includes(queryIncome)) return false;
      }

      return true;
    });
  }, [mergedScholarships, search, filters]);

  // Reset Filters helper
  const handleResetFilters = () => {
    setFilters({
      classLevel: '',
      course: '',
      category: '',
      state: '',
      gender: '',
      income: ''
    });
    setSearch('');
  };

  return (
    <div className={`${tokens.shell} transition-colors duration-300 relative`}>
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-10 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-500/10 pb-8">
          <div>
            <div className="section-chip mb-3">
              <Award className="h-3.5 w-3.5 text-emerald-400" />
              <span>National Opportunity Ledger</span>
            </div>
            <h1 className={`text-3xl sm:text-5xl font-black tracking-tight ${tokens.textMain}`}>
              Advanced <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-400 bg-clip-text text-transparent">Scholarship Finder</span>
            </h1>
            <p className={`text-sm mt-2 max-w-xl ${tokens.muted}`}>
              Discover, filter, and apply for private trusts, corporate CSR waivers, state funds, and fully-funded global PG scholarships.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`px-5 py-3 rounded-2xl border flex items-center gap-2 font-bold text-xs uppercase tracking-wider transition-all ${tokens.navInactive}`}
            >
              {theme === 'dark' ? <SunMedium className="h-4 w-4 text-amber-400" /> : <MoonStar className="h-4 w-4 text-indigo-600" />}
              <span>{theme === 'dark' ? 'Light Theme' : 'Dark Theme'}</span>
            </button>
          </div>
        </div>

        {/* METRICS & QUICK GRAPHS */}
        <div className="grid gap-6 md:grid-cols-3">
          
          {/* Metrics Column */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Verified Funds', val: '240+', color: 'text-indigo-400' },
              { label: 'Active Capital Pool', val: '₹1,500 Cr+', color: 'text-emerald-400' },
              { label: 'Fully Funded (Int)', val: '12', color: 'text-purple-400' },
              { label: 'Need-based waivers', val: '65%', color: 'text-pink-400' }
            ].map((st, i) => (
              <div key={i} className={`p-4 rounded-2xl border flex flex-col justify-center ${tokens.surface}`}>
                <span className={`text-xl font-black ${st.color}`}>{st.val}</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase mt-1 leading-tight">{st.label}</span>
              </div>
            ))}
          </div>

          {/* SVG Graph 1: YoY volume of scholarship funding */}
          <div className={`p-5 rounded-3xl border flex flex-col justify-between ${tokens.surface}`}>
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <TrendingUp className="h-4 w-4 text-indigo-400" />
                <span className={`text-xs font-bold uppercase tracking-wider ${tokens.textMain}`}>Funding Volume Growth</span>
              </div>
              <p className="text-[10px] text-slate-500">Cumulative funding volume (in Crores) YoY:</p>
            </div>
            
            <div className="h-20 w-full flex items-end justify-between relative px-2">
              <div className="absolute inset-x-0 top-0 border-t border-slate-500/10 pointer-events-none" />
              <div className="absolute inset-x-0 top-1/2 border-t border-slate-500/10 pointer-events-none" />
              {[
                { label: '2023', val: '400', h: 'h-8' },
                { label: '2024', val: '850', h: 'h-12' },
                { label: '2025', val: '1200', h: 'h-16' },
                { label: '2026', val: '1500', h: 'h-20' }
              ].map((pt, i) => (
                <div key={i} className="flex flex-col items-center gap-1 z-10">
                  <span className="text-[9px] font-bold text-indigo-400">₹{pt.val}Cr</span>
                  <div className={`w-8 rounded-t-md bg-gradient-to-t from-indigo-500/20 to-indigo-500 ${pt.h}`} />
                  <span className="text-[9px] text-slate-500 font-extrabold">{pt.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SVG Graph 2: Allocation Distribution */}
          <div className={`p-5 rounded-3xl border flex flex-col justify-between ${tokens.surface}`}>
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <BookOpen className="h-4 w-4 text-emerald-400" />
                <span className={`text-xs font-bold uppercase tracking-wider ${tokens.textMain}`}>Allocation Share</span>
              </div>
              <p className="text-[10px] text-slate-500">Distribution volume across formats:</p>
            </div>
            
            <div className="space-y-2">
              {[
                { name: 'Govt Schemes', pct: 45, color: 'bg-emerald-500' },
                { name: 'Merit Awards', pct: 28, color: 'bg-indigo-500' },
                { name: 'Need-based Trusts', pct: 18, color: 'bg-purple-500' },
                { name: 'International', pct: 9, color: 'bg-pink-500' }
              ].map((sh, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="flex justify-between text-[9px] font-bold">
                    <span className="text-slate-400">{sh.name}</span>
                    <span className="text-slate-300">{sh.pct}%</span>
                  </div>
                  <div className="h-1 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                    <div className={`h-full rounded-full ${sh.color}`} style={{ width: `${sh.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* SEARCH & ADVANCED FILTERS BOARD */}
        <div className={`p-6 rounded-3xl border space-y-6 ${tokens.surface}`}>
          
          {/* Main search inputs row */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search keywords, scholarship titles, or specific trustees..."
                className={`w-full py-3 pl-12 pr-4 rounded-2xl outline-none text-xs font-bold border transition-colors ${tokens.input}`}
              />
            </div>
            <button
              onClick={handleResetFilters}
              className={`px-5 py-3 rounded-2xl border text-xs font-bold uppercase tracking-wider transition-colors ${tokens.navInactive}`}
            >
              Clear Filters
            </button>
          </div>

          {/* Filtering dropdown columns */}
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            <div>
              <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Education Stage</label>
              <select
                value={filters.classLevel}
                onChange={(e) => setFilters(prev => ({ ...prev, classLevel: e.target.value }))}
                className="w-full p-2 bg-slate-950 border border-white/10 rounded-xl text-xs font-bold outline-none text-slate-300"
              >
                <option value="">All Stages</option>
                <option value="Graduation">Undergrad (UG)</option>
                <option value="Post Graduation">Postgrad (PG)</option>
              </select>
            </div>

            <div>
              <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Degree Course</label>
              <select
                value={filters.course}
                onChange={(e) => setFilters(prev => ({ ...prev, course: e.target.value }))}
                className="w-full p-2 bg-slate-950 border border-white/10 rounded-xl text-xs font-bold outline-none text-slate-300"
              >
                <option value="">All Courses</option>
                <option value="BTech">B.Tech</option>
                <option value="BSc">B.Sc</option>
                <option value="Nursing">Nursing</option>
                <option value="MTech">M.Tech</option>
                <option value="MA">MA</option>
              </select>
            </div>

            <div>
              <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Fund Classification</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                className="w-full p-2 bg-slate-950 border border-white/10 rounded-xl text-xs font-bold outline-none text-slate-300"
              >
                <option value="">All Formats</option>
                <option value="Government">Government Sector</option>
                <option value="Merit-Based">Merit-Based Only</option>
                <option value="Need-Based">Need-Based Only</option>
                <option value="International">International Master</option>
                <option value="Fully Funded">Fully Funded</option>
              </select>
            </div>

            <div>
              <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Scope Validity</label>
              <select
                value={filters.state}
                onChange={(e) => setFilters(prev => ({ ...prev, state: e.target.value }))}
                className="w-full p-2 bg-slate-950 border border-white/10 rounded-xl text-xs font-bold outline-none text-slate-300"
              >
                <option value="">All States</option>
                <option value="All States">National Scope</option>
              </select>
            </div>

            <div>
              <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Gender Restriction</label>
              <select
                value={filters.gender}
                onChange={(e) => setFilters(prev => ({ ...prev, gender: e.target.value }))}
                className="w-full p-2 bg-slate-950 border border-white/10 rounded-xl text-xs font-bold outline-none text-slate-300"
              >
                <option value="">All Genders</option>
                <option value="Female">Female Merit Only</option>
              </select>
            </div>

            <div>
              <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Household Income</label>
              <select
                value={filters.income}
                onChange={(e) => setFilters(prev => ({ ...prev, income: e.target.value }))}
                className="w-full p-2 bg-slate-950 border border-white/10 rounded-xl text-xs font-bold outline-none text-slate-300"
              >
                <option value="">Unrestricted</option>
                <option value="Under 4 Lakhs">Under 4 LPA</option>
                <option value="Under 15 Lakhs">Under 15 LPA</option>
              </select>
            </div>
          </div>

        </div>

        {/* SCHOLARSHIP LISTINGS GRID */}
        {loading ? (
          <div className="text-center py-20">
            <div className="h-8 w-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs text-slate-400 mt-3 font-semibold">Loading verified scholarship registries...</p>
          </div>
        ) : filteredScholarships.length === 0 ? (
          <div className={`p-12 text-center rounded-3xl border border-dashed text-slate-500 font-semibold ${tokens.surface}`}>
            No scholarships matched your chosen filters. Please clear tags or broaden search parameters.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredScholarships.map((sch) => {
              return (
                <div
                  key={sch.id}
                  className={`rounded-3xl border p-6 flex flex-col justify-between transition-all ${tokens.surface} ${tokens.cardHover}`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-4 gap-2">
                      <span className="text-[9px] font-extrabold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded border border-emerald-500/15">
                        {sch.category}
                      </span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Verified Registry</span>
                    </div>

                    <h3 className={`text-lg font-black ${tokens.textMain}`}>{sch.title}</h3>
                    <p className={`text-xs text-slate-500 mt-0.5`}>{sch.provider}</p>
                    
                    <p className={`text-xs mt-4 leading-relaxed ${tokens.muted}`}>{sch.description}</p>

                    {/* Eligibility details list */}
                    <div className="mt-4 space-y-2">
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Guidelines</span>
                      {sch.eligibilityDetails?.map((el, elIdx) => (
                        <div key={elIdx} className="flex items-center space-x-2 text-xs text-slate-300">
                          <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          <span>{el}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-500/10 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider">Allocated Amount</p>
                      <p className="text-xl font-black text-indigo-400">{sch.amount}</p>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider">Deadline Date</p>
                        <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5 justify-end">
                          <Calendar className="h-3.5 w-3.5 text-slate-400" />
                          <span className="font-extrabold">{sch.deadline}</span>
                        </p>
                      </div>

                      <a 
                        href={sch.applicationLink} 
                        target="_blank" 
                        rel="noreferrer"
                        className="glow-btn-primary py-2.5 px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                      >
                        <span>Apply</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
