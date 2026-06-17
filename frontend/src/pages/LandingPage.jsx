import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Search,
  BookOpen,
  Award,
  BriefcaseBusiness,
  GraduationCap,
  ChevronRight,
  ShieldCheck,
  HelpCircle,
  ArrowRight,
  BrainCircuit,
  BadgeCheck,
  Target,
  Compass,
  Layers3,
  Star,
  SunMedium,
  MoonStar,
  DollarSign,
  TrendingUp,
  Cpu,
  Bookmark,
  FileText,
  UserCheck,
  Globe,
  PlusCircle,
  PlayCircle,
  Sparkle,
  MessageSquare,
  X,
  Send,
  Building2,
  BookMarked,
  Scale,
  Stethoscope,
  Heart,
  Palette,
  Eye,
  FileQuestion,
  Info,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Filter,
  Info as InfoIcon,
  ChevronDown,
  BarChart3,
  Rocket,
  Menu
} from 'lucide-react';
import {
  stages,
  class1to5Data,
  class6to8Data,
  class9to10Data,
  class11to12Data,
  diplomaData,
  graduationData,
  postGraduationData,
  governmentSchemes,
  scholarships,
  internships,
  exams,
  mockAiResponses,
} from '../data/opportunityData';

// Color tokens for Stage Bubbles
const stageColors = {
  'class-1-5': 'from-cyan-500/20 to-cyan-500/0 text-cyan-300 border-cyan-500/30',
  'class-6-8': 'from-indigo-500/20 to-indigo-500/0 text-indigo-300 border-indigo-500/30',
  'class-9-10': 'from-purple-500/20 to-purple-500/0 text-purple-300 border-purple-500/30',
  'class-11-12': 'from-pink-500/20 to-pink-500/0 text-pink-300 border-pink-500/30',
  'diploma': 'from-amber-500/20 to-amber-500/0 text-amber-300 border-amber-500/30',
  'graduation': 'from-emerald-500/20 to-emerald-500/0 text-emerald-300 border-emerald-500/30',
  'post-graduation': 'from-rose-500/20 to-rose-500/0 text-rose-300 border-rose-500/30',
  'research-jobs-startup': 'from-cyan-500/20 to-cyan-500/0 text-cyan-300 border-cyan-500/30',
};

const themeTokens = {
  dark: {
    shell: 'bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.12),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(249,115,22,0.06),_transparent_30%),linear-gradient(180deg,_#080C16,_#0F172A)] text-slate-100 min-h-screen',
    surface: 'border-white/10 bg-white/5 backdrop-blur-xl text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]',
    muted: 'text-slate-400',
    panel: 'border-white/10 bg-slate-900/40 text-white shadow-[0_24px_80px_rgba(0,0,0,0.65)]',
    input: 'border-white/10 bg-slate-950/60 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20',
    cardHover: 'hover:border-indigo-500/30 hover:bg-white/10 hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)]',
    navActive: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
    navInactive: 'bg-white/5 text-slate-300 border-white/5 hover:bg-white/10',
    textMain: 'text-white',
    sidebarBg: 'bg-slate-950/60 border-white/5 backdrop-blur-2xl',
  },
  light: {
    shell: 'bg-[radial-gradient(circle_at_top_left,_rgba(79,70,229,0.04),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(249,115,22,0.03),_transparent_30%),linear-gradient(180deg,_#FAFAF9,_#F5F5F4)] text-midnight min-h-screen',
    surface: 'border-slate-200/80 bg-white/70 backdrop-blur-xl text-midnight shadow-premium',
    muted: 'text-slateSecondary',
    panel: 'border-slate-200 bg-white/85 text-midnight shadow-premium',
    input: 'border-slate-200 bg-white/90 text-midnight placeholder:text-slate-400 focus:border-royal focus:ring-1 focus:ring-royal/20',
    cardHover: 'hover:border-royal/30 hover:bg-white hover:shadow-premium',
    navActive: 'bg-royal/10 text-royal border-royal/20',
    navInactive: 'bg-slate-100 text-slateSecondary border-slate-200/60 hover:bg-slate-200/60 hover:text-midnight',
    textMain: 'text-midnight',
    sidebarBg: 'bg-white/70 border-slate-200/80 backdrop-blur-2xl',
  },
};

export default function LandingPage() {
  const [theme, setTheme] = useState(() => localStorage.getItem('careerExplorerTheme') || 'light');
  const [activeStage, setActiveStage] = useState('class-9-10');
  const [searchQuery, setSearchQuery] = useState('');
  const [isConsoleMenuOpen, setIsConsoleMenuOpen] = useState(false);
  
  // Stages sub-state selectors
  const [active9to10Stream, setActive9to10Stream] = useState('science');
  const [active11to12Stream, setActive11to12Stream] = useState('science');
  const [activeGraduationCourse, setActiveGraduationCourse] = useState('BTech');
  const [activeGraduationTab, setActiveGraduationTab] = useState('overview');
  const [activePGCourse, setActivePGCourse] = useState('MBA');
  const [activePGTab, setActivePGTab] = useState('fellowships');
  const [activeDiplomaCategory, setActiveDiplomaCategory] = useState('polytechnic');

  // Hubs Filters & States
  const [schemeFilters, setSchemeFilters] = useState({
    classLevel: '',
    course: '',
    gender: '',
    category: '',
    state: '',
    income: '',
    minority: '',
    type: '' // Central, State, Skill India, etc.
  });

  const [scholarshipFilters, setScholarshipFilters] = useState({
    classLevel: '',
    course: '',
    category: '', // Government, Private, Merit, Need, etc.
    state: '',
    gender: '',
    income: ''
  });

  const [internshipFilters, setInternshipFilters] = useState({
    type: '', // Remote, Hybrid, Offline
    category: '' // Government, Private, Startup, PSU, Research
  });

  const [examFilters, setExamFilters] = useState({
    category: '' // Engineering, Medical, Law, etc.
  });

  // Floating AI Assistant States
  const [showAiWidget, setShowAiWidget] = useState(false);
  const [aiChatLogs, setAiChatLogs] = useState([
    { role: 'assistant', text: 'Namaste! I am your CareerSaathi AI Assistant. Ask me about state scholarships, standard engineering entrances, or streams selection guidance after Class 10!' }
  ]);
  const [customAiQuery, setCustomAiQuery] = useState('');
  const [aiTyping, setAiTyping] = useState(false);

  // Expanded Hub Cards for detailed view
  const [expandedSchemeId, setExpandedSchemeId] = useState(null);
  const [expandedExamId, setExpandedExamId] = useState(null);

  useEffect(() => {
    localStorage.setItem('careerExplorerTheme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  const tokens = themeTokens[theme];

  // Dynamic filter lists based on available data
  const filteredSchemes = useMemo(() => {
    return governmentSchemes.filter((sch) => {
      if (schemeFilters.classLevel && sch.classLevel !== schemeFilters.classLevel) return false;
      if (schemeFilters.course && sch.course && sch.course !== schemeFilters.course) return false;
      if (schemeFilters.gender && sch.gender !== 'All' && sch.gender !== schemeFilters.gender) return false;
      if (schemeFilters.category && sch.category.includes('SC/ST/OBC') && schemeFilters.category === 'General') return false;
      if (schemeFilters.state && sch.state !== schemeFilters.state) return false;
      if (schemeFilters.income && sch.income !== 'All' && !sch.income.toLowerCase().includes(schemeFilters.income.toLowerCase())) return false;
      if (schemeFilters.minority && sch.minority !== 'All' && sch.minority !== schemeFilters.minority) return false;
      if (schemeFilters.type && sch.category !== schemeFilters.type) return false;
      
      // Global search bar
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          sch.title.toLowerCase().includes(query) ||
          sch.category.toLowerCase().includes(query) ||
          sch.benefits.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [schemeFilters, searchQuery]);

  const filteredScholarships = useMemo(() => {
    return scholarships.filter((sch) => {
      if (scholarshipFilters.classLevel && sch.classLevel !== scholarshipFilters.classLevel) return false;
      if (scholarshipFilters.course && sch.course !== 'All' && sch.course !== scholarshipFilters.course) return false;
      if (scholarshipFilters.category && sch.category !== scholarshipFilters.category) return false;
      if (scholarshipFilters.state && sch.state !== 'All States' && sch.state !== scholarshipFilters.state) return false;
      if (scholarshipFilters.gender && sch.gender !== 'All' && sch.gender !== scholarshipFilters.gender) return false;
      if (scholarshipFilters.income && !sch.income.toLowerCase().includes(scholarshipFilters.income.toLowerCase())) return false;

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          sch.title.toLowerCase().includes(query) ||
          sch.category.toLowerCase().includes(query) ||
          sch.amount.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [scholarshipFilters, searchQuery]);

  const filteredInternships = useMemo(() => {
    return internships.filter((intern) => {
      if (internshipFilters.type && intern.type !== internshipFilters.type) return false;
      if (internshipFilters.category && intern.category !== internshipFilters.category) return false;

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          intern.title.toLowerCase().includes(query) ||
          intern.skills.toLowerCase().includes(query) ||
          intern.stipend.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [internshipFilters, searchQuery]);

  const filteredExams = useMemo(() => {
    return exams.filter((ex) => {
      if (examFilters.category && ex.category !== examFilters.category) return false;

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          ex.title.toLowerCase().includes(query) ||
          ex.category.toLowerCase().includes(query) ||
          ex.syllabus.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [examFilters, searchQuery]);

  const triggerAiResponse = (query) => {
    setAiTyping(true);
    setAiChatLogs((prev) => [...prev, { role: 'user', text: query }]);
    
    setTimeout(() => {
      const resp = mockAiResponses[query] || "Interesting! For that specific field, I recommend mapping out target entrance exams early, verifying EWS interest subsidies under the Central sector scheme, and applying to state skill portals like Skill India digital boards.";
      setAiChatLogs((prev) => [...prev, { role: 'assistant', text: resp }]);
      setAiTyping(false);
    }, 800);
  };

  const handleCustomAiSubmit = (e) => {
    e.preventDefault();
    if (!customAiQuery.trim()) return;
    const query = customAiQuery;
    setCustomAiQuery('');
    triggerAiResponse(query);
  };

  return (
    <div className={`${tokens.shell} transition-colors duration-300 flex flex-col md:flex-row relative w-full overflow-x-hidden`}>
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-[20%] w-[35rem] h-[35rem] bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[30rem] h-[30rem] bg-purple-500/5 rounded-full blur-[110px] pointer-events-none" />

      {/* Sticky Left Sidebar Navigation - Desktop Only */}
      <aside className={`hidden md:flex w-64 shrink-0 md:sticky md:top-20 md:h-[calc(100vh-5rem)] p-6 border-r ${tokens.sidebarBg} transition-colors duration-300 z-20 flex-col justify-between`}>
        <div className="space-y-6">
          <div>
            <span className="text-[10px] font-extrabold uppercase text-indigo-400 tracking-wider">Ecosystem Panel</span>
            <h3 className={`text-lg font-black mt-1 ${tokens.textMain}`}>Navigation Console</h3>
          </div>
          
          <nav className="space-y-1.5 flex flex-col">
            {[
              { href: '#journey-explorer', label: 'Journey Explorer', icon: Compass },
              { href: '#scheme-hub', label: 'Govt Schemes Hub', icon: ShieldCheck },
              { href: '#scholarship-hub', label: 'Scholarship Finder', icon: Award },
              { href: '#internship-hub', label: 'Internships Portal', icon: BriefcaseBusiness },
              { href: '#exam-hub', label: 'Entrance Exams Hub', icon: Target },
              { href: '#analytics-trends', label: 'Market Analytics', icon: BarChart3 }
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5' : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50 border border-transparent'}`}
              >
                <item.icon className="h-4.5 w-4.5 text-indigo-400 shrink-0" />
                <span className="truncate">{item.label}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-500/10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-500">Theme</span>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme mode"
              className={`p-2.5 rounded-xl border flex items-center justify-center transition-all ${tokens.navInactive}`}
            >
              {theme === 'dark' ? <SunMedium className="h-4.5 w-4.5 text-amber-400" /> : <MoonStar className="h-4.5 w-4.5 text-indigo-600" />}
            </button>
          </div>
          <div className="text-[10px] text-slate-500 font-semibold leading-relaxed">
            CareerSaathi Platform v1.2.0 • Government Opportunity Ledger
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Console Sidebar Navigation */}
      <AnimatePresence>
        {isConsoleMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsConsoleMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 md:hidden"
            />
            {/* Slide-over Menu */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] p-6 ${tokens.sidebarBg} border-r border-slate-200 dark:border-white/10 z-50 flex flex-col justify-between md:hidden shadow-2xl`}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-indigo-400 tracking-wider">Ecosystem Panel</span>
                    <h3 className={`text-lg font-black mt-1 ${tokens.textMain}`}>Navigation Console</h3>
                  </div>
                  <button
                    onClick={() => setIsConsoleMenuOpen(false)}
                    aria-label="Close Navigation Console"
                    className={`p-2 rounded-full border ${tokens.navInactive} flex items-center justify-center`}
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>
                </div>
                
                <nav className="space-y-1.5 flex flex-col">
                  {[
                    { href: '#journey-explorer', label: 'Journey Explorer', icon: Compass },
                    { href: '#scheme-hub', label: 'Govt Schemes Hub', icon: ShieldCheck },
                    { href: '#scholarship-hub', label: 'Scholarship Finder', icon: Award },
                    { href: '#internship-hub', label: 'Internships Portal', icon: BriefcaseBusiness },
                    { href: '#exam-hub', label: 'Entrance Exams Hub', icon: Target },
                    { href: '#analytics-trends', label: 'Market Analytics', icon: BarChart3 }
                  ].map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      onClick={() => setIsConsoleMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5' : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50 border border-transparent'}`}
                    >
                      <item.icon className="h-4.5 w-4.5 text-indigo-400 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </a>
                  ))}
                </nav>
              </div>

              <div className="pt-6 border-t border-slate-500/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Theme</span>
                  <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className={`p-2.5 rounded-xl border flex items-center justify-center transition-all ${tokens.navInactive}`}
                  >
                    {theme === 'dark' ? <SunMedium className="h-4.5 w-4.5 text-amber-400" /> : <MoonStar className="h-4.5 w-4.5 text-indigo-600" />}
                  </button>
                </div>
                <div className="text-[10px] text-slate-500 font-semibold leading-relaxed">
                  CareerSaathi Platform v1.2.0 • Government Opportunity Ledger
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Viewport */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8 space-y-12 md:space-y-16 overflow-x-hidden">
        
        {/* Mobile Console Menu Trigger */}
        <div className="md:hidden sticky top-20 z-30 flex items-center justify-between px-4 py-3 bg-white/80 dark:bg-[#080C16]/90 border-b border-slate-200/60 dark:border-white/5 backdrop-blur-md -mx-4 sm:-mx-6 -mt-6 mb-6">
          <button
            onClick={() => setIsConsoleMenuOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border border-royal/10 bg-royal/5 dark:border-indigo-500/20 dark:bg-indigo-500/10 text-xs font-bold uppercase tracking-wider text-royal dark:text-indigo-300 transition-all active:scale-95"
            aria-label="Open Console Navigation"
          >
            <Menu className="h-4.5 w-4.5" />
            <span>Console Menu</span>
          </button>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slateSecondary dark:text-slate-400">CareerSaathi Console</span>
        </div>
        
        {/* HERO SECTION */}
        <section className="text-center pt-6 pb-10 md:pt-12 md:pb-14 space-y-6 md:space-y-8 relative w-full px-2 sm:px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="section-chip shadow-premium"
          >
            <Sparkles className="h-3.5 w-3.5 text-royal dark:text-accent-cyan animate-pulse-slow" />
            <span>Premium Career Intelligence</span>
          </motion.div>

          <h1 className={`text-3xl sm:text-6xl md:text-7xl font-bold leading-[1.1] md:leading-[1.05] tracking-tight ${tokens.textMain} font-clash`}>
            Navigate Your Future <br/>
            <span className="bg-gradient-to-r from-royal via-indigo-600 to-orangeAccent bg-clip-text text-transparent">With absolute clarity</span>
          </h1>
          
          <p className={`max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-satoshi font-medium ${tokens.muted}`}>
            Discover curated Government Schemes, Scholarships, Competitive Entrances, Internships, Fellowships, and AI Career Guidance tailored for you from Class 1 to Post-Graduation.
          </p>

          {/* Search bar inside Hero */}
          <div className="w-full max-w-xl mx-auto relative group px-2 sm:px-0">
            <div className="absolute inset-0 bg-royal/5 dark:bg-indigo-500/5 rounded-3xl blur-2xl group-hover:bg-royal/10 transition-all pointer-events-none" />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slateSecondary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search schemes, scholarships, exams, or internships..."
              className={`w-full py-4 pl-13 pr-5 rounded-3xl outline-none text-xs font-semibold border shadow-premium transition-all ${tokens.input} font-satoshi`}
            />
          </div>

          {/* Metrics Dashboard Widget */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 px-2 sm:px-0">
            {[
              { label: 'Scholarships Available', val: '280+', color: 'text-royal dark:text-indigo-400' },
              { label: 'Government Schemes', val: '140+', color: 'text-orangeAccent' },
              { label: 'Active Internships', val: '9,000+', color: 'text-emerald-500 dark:text-emerald-400' },
              { label: 'Entrance Exams', val: '95+', color: 'text-royal dark:text-indigo-300' }
            ].map((m, i) => (
              <div key={i} className={`p-5 rounded-3xl border flex flex-col justify-center text-center transition-all duration-300 hover:scale-[1.02] ${tokens.surface}`}>
                <span className={`text-3xl font-bold font-clash ${m.color}`}>{m.val}</span>
                <span className="text-[10px] font-bold text-slateSecondary uppercase mt-1 leading-tight tracking-wider font-satoshi">{m.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 w-full max-w-md mx-auto pt-4 px-2 sm:px-0">
            <a
              href="#journey-explorer"
              className="glow-btn-primary w-full sm:w-auto px-8 py-3.5 text-xs uppercase tracking-widest font-bold font-satoshi text-center animate-pulse-slow"
            >
              Explore Roadmaps
            </a>
            <button
              onClick={() => setShowAiWidget(true)}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl border text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all shadow-premium hover:scale-[1.01] ${tokens.navInactive} font-satoshi`}
            >
              <BrainCircuit className="h-4 w-4 text-royal dark:text-indigo-400" />
              <span>Ask AI Counselor</span>
            </button>
          </div>
        </section>


        {/* ACADEMIC JOURNEY EXPLORER */}
        <section id="journey-explorer" className="scroll-mt-24 space-y-6">
          <div className="text-center space-y-3">
            <div className="section-chip">
              <Compass className="h-3.5 w-3.5 text-royal dark:text-indigo-400 animate-spin-slow" />
              <span>Milestone Explorer</span>
            </div>
            <h2 className={`text-2xl sm:text-4xl font-bold ${tokens.textMain} font-clash`}>Academic Journey Explorer</h2>
            <p className={`text-xs sm:text-sm font-satoshi font-medium ${tokens.muted}`}>Click on any academic milestone level below to dynamically query opportunity dashboards.</p>
          </div>

          {/* Clickable horizontal roadmap layout */}
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin px-1 snap-x snap-mandatory">
            {stages.map((st) => {
              const isActive = activeStage === st.id;
              const accentColor = stageColors[st.id] || 'from-royal to-indigo-505';
              return (
                <button
                  key={st.id}
                  onClick={() => setActiveStage(st.id)}
                  className={`flex-none w-44 sm:w-48 rounded-2xl border p-4 text-left transition-all relative overflow-hidden flex flex-col justify-between snap-start ${tokens.surface} ${isActive ? 'ring-2 ring-royal/50 dark:ring-indigo-500/50 border-royal scale-[1.02] shadow-premium' : 'hover:scale-[1.01] hover:border-slate-300 dark:hover:border-white/10'}`}
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accentColor}`} />
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slateSecondary font-satoshi">{st.badge}</span>
                    <h4 className={`text-xs font-bold mt-1.5 leading-tight ${tokens.textMain} font-clash`}>{st.label}</h4>
                  </div>
                  <ChevronRight className={`h-4 w-4 mt-4 align-bottom self-end transition-transform ${isActive ? 'text-royal dark:text-indigo-400 translate-x-1' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>

          {/* Active Explorer Details Panel */}
          <div className={`rounded-3xl border p-6 md:p-8 ${tokens.surface} shadow-premium backdrop-blur-xl`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                
                {/* 1. Class 1-5 */}
                {activeStage === 'class-1-5' && (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 font-satoshi">
                    <div className="space-y-3.5">
                      <h4 className="text-xs font-bold text-royal dark:text-cyan-400 uppercase tracking-widest flex items-center gap-1.5 font-clash">
                        <ShieldCheck className="h-4 w-4" />
                        <span>Govt Benefits</span>
                      </h4>
                      {class1to5Data.benefits.map((b, i) => (
                        <div key={i} className={`p-4.5 rounded-2xl border transition-all hover:scale-[1.01] bg-white/40 dark:bg-white/5 border-slate-200/60 dark:border-white/5 shadow-sm`}>
                          <h5 className={`font-bold text-xs ${tokens.textMain}`}>{b.title}</h5>
                          <p className="text-[11px] text-slateSecondary dark:text-slate-400 mt-1.5 leading-relaxed">{b.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3.5">
                      <h4 className="text-xs font-bold text-royal dark:text-indigo-400 uppercase tracking-widest flex items-center gap-1.5 font-clash">
                        <Target className="h-4 w-4" />
                        <span>Competitions</span>
                      </h4>
                      {class1to5Data.competitions.map((b, i) => (
                        <div key={i} className={`p-4.5 rounded-2xl border transition-all hover:scale-[1.01] bg-white/40 dark:bg-white/5 border-slate-200/60 dark:border-white/5 shadow-sm`}>
                          <h5 className={`font-bold text-xs ${tokens.textMain}`}>{b.title}</h5>
                          <p className="text-[11px] text-slateSecondary dark:text-slate-400 mt-1.5 leading-relaxed">{b.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3.5">
                      <h4 className="text-xs font-bold text-orangeAccent uppercase tracking-widest flex items-center gap-1.5 font-clash">
                        <Award className="h-4 w-4" />
                        <span>Scholarships</span>
                      </h4>
                      {class1to5Data.scholarships.map((b, i) => (
                        <div key={i} className={`p-4.5 rounded-2xl border transition-all hover:scale-[1.01] bg-white/40 dark:bg-white/5 border-slate-200/60 dark:border-white/5 shadow-sm`}>
                          <h5 className={`font-bold text-xs ${tokens.textMain}`}>{b.title}</h5>
                          <p className="text-[11px] text-slateSecondary dark:text-slate-400 mt-1.5 leading-relaxed">{b.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3.5">
                      <h4 className="text-xs font-bold text-emerald-500 dark:text-pink-400 uppercase tracking-widest flex items-center gap-1.5 font-clash">
                        <Sparkles className="h-4 w-4" />
                        <span>Skill Dev</span>
                      </h4>
                      {class1to5Data.skills.map((b, i) => (
                        <div key={i} className={`p-4.5 rounded-2xl border transition-all hover:scale-[1.01] bg-white/40 dark:bg-white/5 border-slate-200/60 dark:border-white/5 shadow-sm`}>
                          <h5 className={`font-bold text-xs ${tokens.textMain}`}>{b.title}</h5>
                          <p className="text-[11px] text-slateSecondary dark:text-slate-400 mt-1.5 leading-relaxed">{b.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Class 6-8 */}
                {activeStage === 'class-6-8' && (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 font-satoshi">
                    <div className="space-y-3.5">
                      <h4 className="text-xs font-bold text-royal dark:text-indigo-400 uppercase tracking-widest flex items-center gap-1.5 font-clash">
                        <Award className="h-4 w-4" />
                        <span>Scholarships</span>
                      </h4>
                      {class6to8Data.scholarships.map((b, i) => (
                        <div key={i} className={`p-4.5 rounded-2xl border transition-all hover:scale-[1.01] bg-white/40 dark:bg-white/5 border-slate-200/60 dark:border-white/5 shadow-sm`}>
                          <h5 className={`font-bold text-xs ${tokens.textMain}`}>{b.title}</h5>
                          <p className="text-[11px] text-slateSecondary dark:text-slate-400 mt-1.5 leading-relaxed">{b.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3.5">
                      <h4 className="text-xs font-bold text-orangeAccent uppercase tracking-widest flex items-center gap-1.5 font-clash">
                        <Target className="h-4 w-4" />
                        <span>Talent Exams</span>
                      </h4>
                      {class6to8Data.exams.map((b, i) => (
                        <div key={i} className={`p-4.5 rounded-2xl border transition-all hover:scale-[1.01] bg-white/40 dark:bg-white/5 border-slate-200/60 dark:border-white/5 shadow-sm`}>
                          <h5 className={`font-bold text-xs ${tokens.textMain}`}>{b.title}</h5>
                          <p className="text-[11px] text-slateSecondary dark:text-slate-400 mt-1.5 leading-relaxed">{b.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3.5">
                      <h4 className="text-xs font-bold text-emerald-500 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-1.5 font-clash">
                        <ShieldCheck className="h-4 w-4" />
                        <span>Govt Schemes</span>
                      </h4>
                      {class6to8Data.schemes.map((b, i) => (
                        <div key={i} className={`p-4.5 rounded-2xl border transition-all hover:scale-[1.01] bg-white/40 dark:bg-white/5 border-slate-200/60 dark:border-white/5 shadow-sm`}>
                          <h5 className={`font-bold text-xs ${tokens.textMain}`}>{b.title}</h5>
                          <p className="text-[11px] text-slateSecondary dark:text-slate-400 mt-1.5 leading-relaxed">{b.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3.5">
                      <h4 className="text-xs font-bold text-royal dark:text-cyan-400 uppercase tracking-widest flex items-center gap-1.5 font-clash">
                        <Cpu className="h-4 w-4" />
                        <span>STEM & Skills</span>
                      </h4>
                      {class6to8Data.skills.map((b, i) => (
                        <div key={i} className={`p-4.5 rounded-2xl border transition-all hover:scale-[1.01] bg-white/40 dark:bg-white/5 border-slate-200/60 dark:border-white/5 shadow-sm`}>
                          <h5 className={`font-bold text-xs ${tokens.textMain}`}>{b.title}</h5>
                          <p className="text-[11px] text-slateSecondary dark:text-slate-400 mt-1.5 leading-relaxed">{b.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Class 9-10 */}
                {activeStage === 'class-9-10' && (
                  <div className="space-y-6 font-satoshi">
                    <div className="flex border-b border-slate-200/80 dark:border-white/10 gap-6 overflow-x-auto scrollbar-none items-center mb-4">
                      {['science', 'commerce', 'arts'].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActive9to10Stream(tab)}
                          className={`font-bold text-xs uppercase py-3 px-1 border-b-2 transition-all min-h-[44px] shrink-0 ${active9to10Stream === tab ? 'text-royal border-royal dark:text-indigo-400 dark:border-indigo-400 font-extrabold' : 'text-slateSecondary border-transparent hover:text-midnight dark:hover:text-white'}`}
                        >
                          {tab} Stream Dashboard
                        </button>
                      ))}
                    </div>
                    
                    {(() => {
                      const data = class9to10Data[active9to10Stream];
                      return (
                        <div className="grid gap-6 md:grid-cols-3">
                          <div className={`p-5 rounded-2xl border transition-all hover:scale-[1.01] bg-white/50 border-slate-200/80 dark:bg-slate-900/20 dark:border-white/5`}>
                            <span className="text-[10px] font-bold text-royal dark:text-indigo-400 uppercase tracking-wider block">Stream Overview</span>
                            <p className="text-xs mt-3 leading-relaxed text-midnight dark:text-slate-300">{data.overview}</p>
                            
                            <span className="text-[10px] font-bold text-royal dark:text-indigo-400 uppercase block mt-5 tracking-wider">Salary Insights</span>
                            <p className="text-lg font-bold mt-1 text-emerald-500 dark:text-emerald-400 font-clash">{data.salary}</p>
                          </div>
                          
                          <div className={`p-5 rounded-2xl border transition-all hover:scale-[1.01] bg-white/50 border-slate-200/80 dark:bg-slate-900/20 dark:border-white/5`}>
                            <span className="text-[10px] font-bold text-royal dark:text-indigo-400 uppercase tracking-wider block">Future Career Paths</span>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {data.careers.map((c) => (
                                <span key={c} className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-royal/10 text-royal border border-royal/15 dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-500/15">{c}</span>
                              ))}
                            </div>
                            <span className="text-[10px] font-bold text-royal dark:text-indigo-400 uppercase block mt-5 tracking-wider">Top Target Colleges</span>
                            <p className="text-xs text-midnight dark:text-slate-300 mt-2">{data.colleges}</p>
                          </div>
                          
                          <div className={`p-5 rounded-2xl border transition-all hover:scale-[1.01] bg-white/50 border-slate-200/80 dark:bg-slate-900/20 dark:border-white/5`}>
                            <span className="text-[10px] font-bold text-royal dark:text-indigo-400 uppercase tracking-wider block">Scholarships & Schemes</span>
                            <ul className="text-xs mt-3 space-y-3 text-midnight dark:text-slate-300">
                              <li className="flex gap-2"><strong>Government Schemes:</strong> {data.schemes.join(', ')}</li>
                              <li className="flex gap-2"><strong>Target Exams:</strong> {data.exams.join(', ')}</li>
                              <li className="flex gap-2"><strong>Scholarships:</strong> {data.scholarships.join(', ')}</li>
                            </ul>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* 4. Class 11-12 */}
                {activeStage === 'class-11-12' && (
                  <div className="space-y-6 font-satoshi">
                    <div className="flex border-b border-slate-200/80 dark:border-white/10 gap-6 overflow-x-auto scrollbar-none items-center mb-4">
                      {['science', 'commerce', 'arts'].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActive11to12Stream(tab)}
                          className={`font-bold text-xs uppercase py-3 px-1 border-b-2 transition-all min-h-[44px] shrink-0 ${active11to12Stream === tab ? 'text-royal border-royal dark:text-indigo-400 dark:border-indigo-400 font-extrabold' : 'text-slateSecondary border-transparent hover:text-midnight dark:hover:text-white'}`}
                        >
                          {tab} Stream
                        </button>
                      ))}
                    </div>

                    {(() => {
                      const data = class11to12Data[active11to12Stream];
                      return (
                        <div className="grid gap-6 md:grid-cols-3">
                          <div className={`p-5 rounded-2xl border bg-white/50 border-slate-200/80 dark:bg-slate-900/20 dark:border-white/5`}>
                            <h5 className="font-bold text-xs uppercase text-royal dark:text-indigo-400 tracking-wider mb-3 flex items-center gap-1.5 font-clash">
                              <Target className="h-4 w-4" />
                              <span>Entrance Exams & Colleges</span>
                            </h5>
                            <ul className="text-xs space-y-2 text-midnight dark:text-slate-300">
                              <li><strong>Exams:</strong> {data.exams.join(', ')}</li>
                              <li><strong>Key Colleges:</strong> {data.colleges.join(', ')}</li>
                            </ul>
                          </div>
                          
                          <div className={`p-5 rounded-2xl border bg-white/50 border-slate-200/80 dark:bg-slate-900/20 dark:border-white/5`}>
                            <h5 className="font-bold text-xs uppercase text-orangeAccent tracking-wider mb-3 flex items-center gap-1.5 font-clash">
                              <Award className="h-4 w-4" />
                              <span>Scholarships & Govt Schemes</span>
                            </h5>
                            <ul className="text-xs space-y-2 text-midnight dark:text-slate-300">
                              <li><strong>Scholarship Funds:</strong> {data.scholarships.join(', ')}</li>
                              <li><strong>State Support Schemes:</strong> {data.schemes.join(', ')}</li>
                            </ul>
                          </div>
                          
                          <div className={`p-5 rounded-2xl border bg-white/50 border-slate-200/80 dark:bg-slate-900/20 dark:border-white/5`}>
                            <h5 className="font-bold text-xs uppercase text-emerald-500 dark:text-pink-400 tracking-wider mb-3 flex items-center gap-1.5 font-clash">
                              <Cpu className="h-4 w-4" />
                              <span>Skill Courses & Roadmaps</span>
                            </h5>
                            <ul className="text-xs space-y-2 text-midnight dark:text-slate-300">
                              <li><strong>Recommended Skills:</strong> {data.skills.join(', ')}</li>
                              <li className="pt-2 border-t border-slate-200 dark:border-white/5 text-[11px] text-slateSecondary dark:text-slate-400">
                                <strong>Path:</strong> {data.roadmaps.join(' | ')}
                              </li>
                            </ul>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* 5. Diploma */}
                {activeStage === 'diploma' && (
                  <div className="space-y-6 font-satoshi">
                    <div className="flex border-b border-slate-200/80 dark:border-white/10 gap-6 overflow-x-auto scrollbar-none items-center mb-4">
                      {['polytechnic', 'iti', 'paramedical', 'design', 'agriculture'].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveDiplomaCategory(tab)}
                          className={`font-bold text-xs uppercase py-3 px-1 border-b-2 transition-all min-h-[44px] shrink-0 ${activeDiplomaCategory === tab ? 'text-royal border-royal dark:text-indigo-400 dark:border-indigo-400 font-extrabold' : 'text-slateSecondary border-transparent hover:text-midnight dark:hover:text-white'}`}
                        >
                          {tab} Domain
                        </button>
                      ))}
                    </div>

                    {(() => {
                      const data = diplomaData[activeDiplomaCategory];
                      return (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                          <div className={`p-5 rounded-2xl border bg-white/50 border-slate-200/80 dark:bg-slate-900/20 dark:border-white/5`}>
                            <span className="text-[10px] font-bold text-royal dark:text-indigo-400 uppercase block tracking-wider">Government Support Schemes</span>
                            <p className="text-xs text-midnight dark:text-slate-300 mt-2 leading-relaxed">{data.schemes}</p>
                          </div>
                          <div className={`p-5 rounded-2xl border bg-white/50 border-slate-200/80 dark:bg-slate-900/20 dark:border-white/5`}>
                            <span className="text-[10px] font-bold text-royal dark:text-indigo-400 uppercase block tracking-wider">Available Scholarships</span>
                            <p className="text-xs text-midnight dark:text-slate-300 mt-2 leading-relaxed">{data.scholarships}</p>
                          </div>
                          <div className={`p-5 rounded-2xl border bg-white/50 border-slate-200/80 dark:bg-slate-900/20 dark:border-white/5`}>
                            <span className="text-[10px] font-bold text-royal dark:text-indigo-400 uppercase block tracking-wider">Apprenticeship & Internships</span>
                            <p className="text-xs text-midnight dark:text-slate-300 mt-2 leading-relaxed">{data.internships}</p>
                          </div>
                          <div className={`p-5 rounded-2xl border bg-white/50 border-slate-200/80 dark:bg-slate-900/20 dark:border-white/5`}>
                            <span className="text-[10px] font-bold text-royal dark:text-indigo-400 uppercase block tracking-wider">Direct Job Opportunities</span>
                            <p className="text-xs text-midnight dark:text-slate-300 mt-2 leading-relaxed">{data.jobs}</p>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* 6. Graduation */}
                {activeStage === 'graduation' && (
                  <div className="space-y-6 font-satoshi">
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                      <label className="text-xs font-bold text-slateSecondary uppercase tracking-wider">UG Course Selector:</label>
                      <select
                         value={activeGraduationCourse}
                         onChange={(e) => {
                           setActiveGraduationCourse(e.target.value);
                           setActiveGraduationTab('overview');
                         }}
                         className={`rounded-xl px-4 py-2.5 text-xs font-semibold border ${tokens.input}`}
                      >
                        <option value="BTech">B.Tech (Engineering)</option>
                        <option value="BCA">BCA (Computer App)</option>
                        <option value="BBA">BBA (Management)</option>
                        <option value="BCom">B.Com (Commerce)</option>
                        <option value="BA">BA (Humanities)</option>
                        <option value="BSc">B.Sc (Sciences)</option>
                        <option value="BEd">B.Ed (Pedagogy)</option>
                        <option value="BJMC">BJMC (Journalism)</option>
                        <option value="Law">Law (LLB / BA LLB)</option>
                        <option value="Nursing">Nursing (B.Sc Nursing)</option>
                        <option value="Pharmacy">Pharmacy (B.Pharm)</option>
                        <option value="HotelManagement">Hotel Management (BHM)</option>
                      </select>
                    </div>

                    {/* Graduation tabs */}
                    <div className="flex border-b border-slate-200/80 dark:border-white/10 gap-4 overflow-x-auto scrollbar-none items-center mb-4">
                      {[
                        { id: 'overview', label: 'Overview' },
                        { id: 'schemes', label: 'Govt Schemes' },
                        { id: 'scholarships', label: 'Scholarships' },
                        { id: 'internships', label: 'Internships' },
                        { id: 'exams', label: 'Competitive Exams' },
                        { id: 'govtJobs', label: 'Govt Jobs' },
                        { id: 'privateJobs', label: 'Private Jobs' },
                        { id: 'higherEd', label: 'Higher Education' },
                        { id: 'international', label: 'Global Opportunities' },
                        { id: 'salary', label: 'Expected Salary' },
                        { id: 'growth', label: 'Career Growth' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveGraduationTab(tab.id)}
                          className={`font-bold text-[11px] uppercase py-3 px-1 border-b-2 transition-all min-h-[44px] shrink-0 ${activeGraduationTab === tab.id ? 'text-royal border-royal dark:text-indigo-400 dark:border-indigo-400 font-extrabold' : 'text-slateSecondary border-transparent hover:text-midnight dark:hover:text-white'}`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {(() => {
                      const data = graduationData[activeGraduationCourse];
                      if (!data) return null;
                      return (
                        <motion.div
                          key={activeGraduationTab}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className={`p-6 rounded-2xl border bg-white/50 border-slate-200/80 dark:bg-slate-900/20 dark:border-white/5 shadow-sm`}
                        >
                          <h5 className="font-bold text-xs text-royal dark:text-indigo-400 uppercase tracking-widest mb-2 font-clash">
                            {activeGraduationCourse} - {activeGraduationTab}
                          </h5>
                          <p className="text-xs sm:text-sm leading-relaxed text-midnight dark:text-slate-300 whitespace-pre-line leading-normal">
                            {data[activeGraduationTab] || 'No specific records compiled for this module.'}
                          </p>
                        </motion.div>
                      );
                    })()}
                  </div>
                )}

                {/* 7. Post Graduation */}
                {activeStage === 'post-graduation' && (
                  <div className="space-y-6 font-satoshi">
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                      <label className="text-xs font-bold text-slateSecondary uppercase tracking-wider">PG Course Selector:</label>
                      <select
                        value={activePGCourse}
                        onChange={(e) => {
                          setActivePGCourse(e.target.value);
                          setActivePGTab('fellowships');
                        }}
                        className={`rounded-xl px-4 py-2.5 text-xs font-semibold border ${tokens.input}`}
                      >
                        <option value="MBA">MBA (Masters of Business)</option>
                        <option value="MCA">MCA (Computer App)</option>
                        <option value="MTech">M.Tech (Engineering PG)</option>
                        <option value="MA">MA (Arts PG)</option>
                        <option value="MSc">M.Sc (Science PG)</option>
                        <option value="LLM">LLM (Master of Law)</option>
                        <option value="PhD">PhD (Doctoral Research)</option>
                      </select>
                    </div>

                    {/* PG tabs */}
                    <div className="flex border-b border-slate-200/80 dark:border-white/10 gap-4 overflow-x-auto scrollbar-none items-center mb-4">
                      {[
                        { id: 'fellowships', label: 'Research Fellowships' },
                        { id: 'scholarships', label: 'Scholarships' },
                        { id: 'schemes', label: 'Govt Schemes' },
                        { id: 'international', label: 'International Programs' },
                        { id: 'internships', label: 'Internships' },
                        { id: 'jobs', label: 'Jobs & Placements' },
                        { id: 'startups', label: 'Startup Opportunities' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActivePGTab(tab.id)}
                          className={`font-bold text-[11px] uppercase py-3 px-1 border-b-2 transition-all min-h-[44px] shrink-0 ${activePGTab === tab.id ? 'text-royal border-royal dark:text-indigo-400 dark:border-indigo-400 font-extrabold' : 'text-slateSecondary border-transparent hover:text-midnight dark:hover:text-white'}`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {(() => {
                      const data = postGraduationData[activePGCourse];
                      if (!data) return null;
                      return (
                        <motion.div
                          key={activePGTab}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className={`p-6 rounded-2xl border bg-white/50 border-slate-200/80 dark:bg-slate-900/20 dark:border-white/5 shadow-sm`}
                        >
                          <h5 className="font-bold text-xs text-royal dark:text-indigo-400 uppercase tracking-widest mb-2 font-clash">
                            {activePGCourse} - {activePGTab}
                          </h5>
                          <p className="text-xs sm:text-sm leading-relaxed text-midnight dark:text-slate-300 whitespace-pre-line leading-normal">
                            {data[activePGTab] || 'No specific records compiled for this PG module.'}
                          </p>
                        </motion.div>
                      );
                    })()}
                  </div>
                )}

                {/* 8. Research / Jobs / Startup */}
                {activeStage === 'research-jobs-startup' && (
                  <div className="grid gap-6 md:grid-cols-3 font-satoshi">
                    <div className={`p-5 rounded-2xl border bg-white/50 border-slate-200/80 dark:bg-slate-900/20 dark:border-white/5 transition-all hover:scale-[1.01] hover:shadow-sm`}>
                      <h4 className="font-bold text-sm text-royal dark:text-indigo-400 mb-3 uppercase tracking-wider flex items-center gap-1.5 font-clash">
                        <Award className="h-4 w-4" />
                        <span>PhD & PostDoc Research</span>
                      </h4>
                      <p className="text-xs text-slateSecondary dark:text-slate-400 leading-relaxed leading-normal">
                        PMRF fellowships provide up to ₹80,000/month. CSIR and UGC NET fellowships assist with ₹37,000/month research allowances for up to five years.
                      </p>
                    </div>
                    <div className={`p-5 rounded-2xl border bg-white/50 border-slate-200/80 dark:bg-slate-900/20 dark:border-white/5 transition-all hover:scale-[1.01] hover:shadow-sm`}>
                      <h4 className="font-bold text-sm text-orangeAccent mb-3 uppercase tracking-wider flex items-center gap-1.5 font-clash">
                        <Rocket className="h-4 w-4" />
                        <span>Startup Incubation & Grants</span>
                      </h4>
                      <p className="text-xs text-slateSecondary dark:text-slate-400 leading-relaxed leading-normal">
                        Startup India SISFS programs yield up to ₹50 Lakhs. College incubators offer seed pools, patent registration funding, and legal structures support.
                      </p>
                    </div>
                    <div className={`p-5 rounded-2xl border bg-white/50 border-slate-200/80 dark:bg-slate-900/20 dark:border-white/5 transition-all hover:scale-[1.01] hover:shadow-sm`}>
                      <h4 className="font-bold text-sm text-emerald-500 dark:text-emerald-400 mb-3 uppercase tracking-wider flex items-center gap-1.5 font-clash">
                        <BriefcaseBusiness className="h-4 w-4" />
                        <span>Government & Tech Jobs</span>
                      </h4>
                      <p className="text-xs text-slateSecondary dark:text-slate-400 leading-relaxed leading-normal">
                        PSU Direct recruits via GATE scoring matrices, UPSC CSE Civil Service commissions, and corporate software product consulting roles.
                      </p>
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>
        </section>


        {/* GOVERNMENT SCHEME HUB */}
        <section id="scheme-hub" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="section-chip">
                <ShieldCheck className="h-3.5 w-3.5 text-royal dark:text-indigo-400" />
                <span>Central & State Ledgers</span>
              </div>
              <h2 className={`text-2xl sm:text-4xl font-bold mt-2 ${tokens.textMain} font-clash`}>Government Scheme Hub</h2>
              <p className={`text-xs sm:text-sm font-satoshi font-medium ${tokens.muted}`}>Filter interest subsidies, girl child education grants, and technology seed loans.</p>
            </div>
            
            {/* Quick selectors reset */}
            <button
              onClick={() => setSchemeFilters({ classLevel: '', course: '', gender: '', category: '', state: '', income: '', minority: '', type: '' })}
              className="text-xs text-royal hover:text-royal/80 dark:text-indigo-400 dark:hover:text-indigo-300 font-bold self-start transition-colors hover:underline font-satoshi"
            >
              Reset Filters
            </button>
          </div>

          {/* Scheme Filters Grid */}
          <div className={`p-5 rounded-3xl border grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 ${tokens.surface} shadow-sm font-satoshi`}>
            <div>
              <label className="block text-[9px] font-bold text-slateSecondary uppercase mb-1.5 tracking-wider">Education Stage</label>
              <select
                value={schemeFilters.classLevel}
                onChange={(e) => setSchemeFilters(prev => ({ ...prev, classLevel: e.target.value }))}
                className={`w-full p-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-950 border ${tokens.input}`}
              >
                <option value="">All Stages</option>
                <option value="Graduation">Undergrad (UG)</option>
                <option value="Post Graduation">Postgrad (PG)</option>
              </select>
            </div>

            <div>
              <label className="block text-[9px] font-bold text-slateSecondary uppercase mb-1.5 tracking-wider">Course Code</label>
              <select
                value={schemeFilters.course}
                onChange={(e) => setSchemeFilters(prev => ({ ...prev, course: e.target.value }))}
                className={`w-full p-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-950 border ${tokens.input}`}
              >
                <option value="">All Courses</option>
                <option value="BTech">B.Tech</option>
                <option value="BA">BA</option>
                <option value="BCom">B.Com</option>
                <option value="BSc">B.Sc</option>
                <option value="MCA">MCA</option>
                <option value="PhD">PhD</option>
              </select>
            </div>

            <div>
              <label className="block text-[9px] font-bold text-slateSecondary uppercase mb-1.5 tracking-wider">Gender Limit</label>
              <select
                value={schemeFilters.gender}
                onChange={(e) => setSchemeFilters(prev => ({ ...prev, gender: e.target.value }))}
                className={`w-full p-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-950 border ${tokens.input}`}
              >
                <option value="">All Genders</option>
                <option value="Female">Female Only</option>
                <option value="Male">Male Only</option>
              </select>
            </div>

            <div>
              <label className="block text-[9px] font-bold text-slateSecondary uppercase mb-1.5 tracking-wider">Category Castes</label>
              <select
                value={schemeFilters.category}
                onChange={(e) => setSchemeFilters(prev => ({ ...prev, category: e.target.value }))}
                className={`w-full p-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-950 border ${tokens.input}`}
              >
                <option value="">All Categories</option>
                <option value="SC/ST/OBC">SC/ST/OBC</option>
                <option value="General">General / EWS</option>
              </select>
            </div>

            <div>
              <label className="block text-[9px] font-bold text-slateSecondary uppercase mb-1.5 tracking-wider">Ministry Level</label>
              <select
                value={schemeFilters.state}
                onChange={(e) => setSchemeFilters(prev => ({ ...prev, state: e.target.value }))}
                className={`w-full p-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-950 border ${tokens.input}`}
              >
                <option value="">All Ministries</option>
                <option value="Central">Central Ministry</option>
                <option value="State Government">State Ministries</option>
              </select>
            </div>

            <div>
              <label className="block text-[9px] font-bold text-slateSecondary uppercase mb-1.5 tracking-wider">Annual Income Limit</label>
              <select
                value={schemeFilters.income}
                onChange={(e) => setSchemeFilters(prev => ({ ...prev, income: e.target.value }))}
                className={`w-full p-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-950 border ${tokens.input}`}
              >
                <option value="">Any Income</option>
                <option value="Under 2.5 Lakhs">Under 2.5 LPA</option>
                <option value="Under 6 Lakhs">Under 6 LPA</option>
                <option value="Under 8 Lakhs">Under 8 LPA</option>
              </select>
            </div>

            <div>
              <label className="block text-[9px] font-bold text-slateSecondary uppercase mb-1.5 tracking-wider">Minority Exclusives</label>
              <select
                value={schemeFilters.minority}
                onChange={(e) => setSchemeFilters(prev => ({ ...prev, minority: e.target.value }))}
                className={`w-full p-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-950 border ${tokens.input}`}
              >
                <option value="">Unrestricted</option>
                <option value="Minority">Minority Only</option>
              </select>
            </div>

            <div>
              <label className="block text-[9px] font-bold text-slateSecondary uppercase mb-1.5 tracking-wider">Sector Class</label>
              <select
                value={schemeFilters.type}
                onChange={(e) => setSchemeFilters(prev => ({ ...prev, type: e.target.value }))}
                className={`w-full p-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-950 border ${tokens.input}`}
              >
                <option value="">All Classification Cards</option>
                <option value="Education Loan Schemes">Education Loan Schemes</option>
                <option value="Women Schemes">Women Schemes</option>
                <option value="Skill India">Skill India</option>
                <option value="SC/ST/OBC Schemes">SC/ST/OBC Schemes</option>
                <option value="Digital India">Digital India</option>
                <option value="Startup India">Startup India</option>
                <option value="Minority Schemes">Minority Schemes</option>
              </select>
            </div>
          </div>

          {/* Scheme Cards Layout */}
          {filteredSchemes.length === 0 ? (
            <div className={`p-8 text-center rounded-3xl border border-dashed text-slateSecondary font-semibold ${tokens.surface}`}>
              No active schemes match your selected parameters. Try widening filters or search criteria.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 font-satoshi">
              {filteredSchemes.map((sch) => {
                const isExpanded = expandedSchemeId === sch.id;
                return (
                  <div
                    key={sch.id}
                    className={`rounded-3xl border p-6 flex flex-col justify-between transition-all ${tokens.surface} ${tokens.cardHover} shadow-sm`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4.5 gap-2">
                        <span className="text-[9px] font-bold text-royal bg-royal/10 border border-royal/10 dark:text-indigo-300 dark:bg-indigo-500/10 dark:border-indigo-500/15 uppercase tracking-widest px-2.5 py-0.5 rounded">
                          {sch.category}
                        </span>
                        <span className="text-[10px] text-slateSecondary font-bold uppercase">{sch.state} Ministry</span>
                      </div>

                      <h3 className={`text-base font-bold ${tokens.textMain} font-clash`}>{sch.title}</h3>
                      <p className={`text-xs mt-2.5 leading-relaxed ${tokens.muted}`}>{sch.benefits}</p>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4.5 pt-4.5 border-t border-slate-200 dark:border-slate-500/10 space-y-3.5 text-xs text-slateSecondary dark:text-slate-400 overflow-hidden"
                          >
                            <div>
                              <strong className="text-midnight dark:text-slate-200">Eligibility Criteria:</strong> {sch.eligibility}
                            </div>
                            <div>
                              <strong className="text-midnight dark:text-slate-200">Required Documents:</strong> {sch.documents}
                            </div>
                            <div>
                              <strong className="text-midnight dark:text-slate-200">Application Method:</strong> {sch.applyProcess}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="mt-6 pt-4.5 border-t border-slate-200 dark:border-slate-500/10 flex items-center justify-between">
                      <button
                        onClick={() => setExpandedSchemeId(isExpanded ? null : sch.id)}
                        className="text-xs font-bold text-royal hover:text-royal/80 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                      >
                        {isExpanded ? 'Hide Application Details' : 'View Application Details'}
                      </button>
                      <a
                        href={sch.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold text-slateSecondary hover:text-midnight dark:hover:text-white flex items-center gap-1.5 transition-colors"
                      >
                        <span>Official Portal</span>
                        <Globe className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>


        {/* SCHOLARSHIP HUB */}
        <section id="scholarship-hub" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="section-chip">
                <Award className="h-3.5 w-3.5 text-royal dark:text-indigo-400 animate-pulse-slow" />
                <span>Scholarship Hub Finder</span>
              </div>
              <h2 className={`text-2xl sm:text-4xl font-bold mt-2 ${tokens.textMain} font-clash`}>Advanced Scholarship Finder</h2>
              <p className={`text-xs sm:text-sm font-satoshi font-medium ${tokens.muted}`}>Apply to private foundation trusts, need-based subsidies, and fully-funded international PG programs.</p>
            </div>
            
            <button
              onClick={() => setScholarshipFilters({ classLevel: '', course: '', category: '', state: '', gender: '', income: '' })}
              className="text-xs text-royal hover:text-royal/80 dark:text-indigo-400 dark:hover:text-indigo-300 font-bold self-start transition-colors hover:underline font-satoshi"
            >
              Reset Filters
            </button>
          </div>

          {/* Scholarship Filters Grid */}
          <div className={`p-5 rounded-3xl border grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${tokens.surface} shadow-sm font-satoshi`}>
            <div>
              <label className="block text-[9px] font-bold text-slateSecondary uppercase mb-1.5 tracking-wider">Milestone Stage</label>
              <select
                value={scholarshipFilters.classLevel}
                onChange={(e) => setScholarshipFilters(prev => ({ ...prev, classLevel: e.target.value }))}
                className={`w-full p-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-950 border ${tokens.input}`}
              >
                <option value="">All Milestone Levels</option>
                <option value="Graduation">Graduation (UG)</option>
                <option value="Post Graduation">Post Graduation (PG)</option>
              </select>
            </div>

            <div>
              <label className="block text-[9px] font-bold text-slateSecondary uppercase mb-1.5 tracking-wider">Target Course</label>
              <select
                value={scholarshipFilters.course}
                onChange={(e) => setScholarshipFilters(prev => ({ ...prev, course: e.target.value }))}
                className={`w-full p-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-950 border ${tokens.input}`}
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
              <label className="block text-[9px] font-bold text-slateSecondary uppercase mb-1.5 tracking-wider">Fund Classification</label>
              <select
                value={scholarshipFilters.category}
                onChange={(e) => setScholarshipFilters(prev => ({ ...prev, category: e.target.value }))}
                className={`w-full p-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-950 border ${tokens.input}`}
              >
                <option value="">All Classifications</option>
                <option value="Government">Government Funds</option>
                <option value="Merit-Based">Merit-Based Only</option>
                <option value="Need-Based">Need-Based Only</option>
                <option value="International">International Master</option>
                <option value="Fully Funded">Fully Funded</option>
              </select>
            </div>

            <div>
              <label className="block text-[9px] font-bold text-slateSecondary uppercase mb-1.5 tracking-wider">State Validity</label>
              <select
                value={scholarshipFilters.state}
                onChange={(e) => setScholarshipFilters(prev => ({ ...prev, state: e.target.value }))}
                className={`w-full p-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-950 border ${tokens.input}`}
              >
                <option value="">All States</option>
                <option value="All States">National Valid</option>
              </select>
            </div>

            <div>
              <label className="block text-[9px] font-bold text-slateSecondary uppercase mb-1.5 tracking-wider">Gender Restriction</label>
              <select
                value={scholarshipFilters.gender}
                onChange={(e) => setScholarshipFilters(prev => ({ ...prev, gender: e.target.value }))}
                className={`w-full p-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-950 border ${tokens.input}`}
              >
                <option value="">All Genders</option>
                <option value="Female">Female Merit Only</option>
              </select>
            </div>

            <div>
              <label className="block text-[9px] font-bold text-slateSecondary uppercase mb-1.5 tracking-wider">Family Income Limit</label>
              <select
                value={scholarshipFilters.income}
                onChange={(e) => setScholarshipFilters(prev => ({ ...prev, income: e.target.value }))}
                className={`w-full p-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-950 border ${tokens.input}`}
              >
                <option value="">Unrestricted Income</option>
                <option value="Under 4 Lakhs">Under 4 LPA</option>
                <option value="Under 15 Lakhs">Under 15 LPA</option>
              </select>
            </div>
          </div>

          {/* Scholarship Cards Grid */}
          {filteredScholarships.length === 0 ? (
            <div className={`p-8 text-center rounded-3xl border border-dashed text-slateSecondary font-semibold ${tokens.surface}`}>
              No scholarship listings found matching your parameters. Please broaden filters.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 font-satoshi">
              {filteredScholarships.map((sch) => (
                <div
                  key={sch.id}
                  className={`rounded-3xl border p-5 flex flex-col justify-between ${tokens.surface} ${tokens.cardHover} shadow-sm`}
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold text-emerald-600 bg-emerald-500/10 border border-emerald-500/10 dark:text-emerald-300 dark:bg-emerald-500/10 dark:border-emerald-500/15 uppercase tracking-widest px-2.5 py-0.5 rounded">
                        {sch.category}
                      </span>
                      <span className="text-[10px] text-slateSecondary font-bold uppercase">Funding Fit</span>
                    </div>

                    <h4 className={`text-base font-bold ${tokens.textMain} font-clash`}>{sch.title}</h4>
                    <p className="text-xl font-bold text-royal dark:text-indigo-400 font-clash">{sch.amount}</p>
                    <p className={`text-xs leading-relaxed ${tokens.muted}`}>
                      <strong>Eligibility:</strong> {sch.eligibility}
                    </p>
                  </div>

                  <div className="mt-6 pt-4.5 border-t border-slate-200 dark:border-slate-500/10 space-y-3.5">
                    <div className="flex justify-between items-center text-[10px] text-slateSecondary uppercase font-bold">
                      <span>Deadline Cutoff:</span>
                      <span className="text-midnight dark:text-slate-300 font-extrabold">{sch.deadline}</span>
                    </div>
                    <a
                      href={sch.applyLink}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2.5 rounded-xl bg-royal/10 text-royal hover:bg-royal hover:text-white dark:bg-indigo-500/10 dark:text-indigo-300 dark:hover:bg-indigo-600 dark:hover:text-white font-bold text-[11px] uppercase tracking-wider text-center block border border-royal/15 dark:border-indigo-500/20 transition-all shadow-sm"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>


        {/* INTERNSHIP HUB */}
        <section id="internship-hub" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="section-chip">
                <BriefcaseBusiness className="h-3.5 w-3.5 text-indigo-400" />
                <span>Apprenticeship Ledgers</span>
              </div>
              <h2 className={`text-2xl sm:text-3xl font-black mt-2 ${tokens.textMain}`}>Internship Hub</h2>
              <p className={`text-xs sm:text-sm ${tokens.muted}`}>Explore remote developer roles, public sector (PSU) technical apprenticeships, and policy research tracks.</p>
            </div>
            
            <button
              onClick={() => setInternshipFilters({ type: '', category: '' })}
              className="text-xs text-indigo-400 font-bold self-start hover:underline"
            >
              Reset Filters
            </button>
          </div>

          {/* Internship Filters */}
          <div className={`p-5 rounded-3xl border flex flex-col sm:flex-row gap-4 ${tokens.surface}`}>
            <div className="w-full sm:w-44">
              <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Work Mode</label>
              <select
                value={internshipFilters.type}
                onChange={(e) => setInternshipFilters(prev => ({ ...prev, type: e.target.value }))}
                className={`w-full p-2 rounded-xl text-xs font-bold bg-slate-950 border ${tokens.input}`}
              >
                <option value="">All Formats</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Offline">Offline</option>
              </select>
            </div>

            <div className="w-full sm:w-44">
              <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Corporate Sector</label>
              <select
                value={internshipFilters.category}
                onChange={(e) => setInternshipFilters(prev => ({ ...prev, category: e.target.value }))}
                className={`w-full p-2 rounded-xl text-xs font-bold bg-slate-950 border ${tokens.input}`}
              >
                <option value="">All Sectors</option>
                <option value="Government">Government Ministries</option>
                <option value="PSU">Public Sector Units</option>
                <option value="Private">MNC Tech Firms</option>
                <option value="Startup">Startups & Incubators</option>
                <option value="Research">Research Labs</option>
              </select>
            </div>
          </div>

          {/* Internship Cards Grid */}
          {filteredInternships.length === 0 ? (
            <div className={`p-8 text-center rounded-3xl border border-dashed text-slate-500 font-semibold ${tokens.surface}`}>
              No matching internships found. Update filters to broaden findings.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredInternships.map((intern) => (
                <div
                  key={intern.id}
                  className={`rounded-3xl border p-5 flex flex-col justify-between ${tokens.surface} ${tokens.cardHover}`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-extrabold text-indigo-400 uppercase tracking-widest px-2.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/15">
                        {intern.category} • {intern.type}
                      </span>
                      <span className="text-[10px] text-slate-500 font-extrabold uppercase">{intern.duration}</span>
                    </div>

                    <h4 className={`text-base font-black ${tokens.textMain}`}>{intern.title}</h4>
                    <p className="text-sm font-extrabold text-emerald-400">{intern.stipend}</p>
                    
                    <div>
                      <span className="text-[9px] font-bold text-slate-500 uppercase block mb-1">Required Skills:</span>
                      <p className="text-xs text-slate-400 leading-normal">{intern.skills}</p>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-500/10 flex justify-between items-center text-xs text-slate-400">
                    <span>Certificate: {intern.certificate}</span>
                    <span className="font-extrabold text-slate-300">PPO: {intern.ppo}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>


        {/* EXAM HUB */}
        <section id="exam-hub" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="section-chip">
                <Target className="h-3.5 w-3.5 text-indigo-400 animate-pulse-slow" />
                <span>National Competitive Exams</span>
              </div>
              <h2 className={`text-2xl sm:text-3xl font-black mt-2 ${tokens.textMain}`}>Entrance & Competitive Exam Hub</h2>
              <p className={`text-xs sm:text-sm ${tokens.muted}`}>Review syllabus guidelines, CBT patterns, previous year paper links, and target roadmaps.</p>
            </div>
            
            <button
              onClick={() => setExamFilters({ category: '' })}
              className="text-xs text-indigo-400 font-bold self-start hover:underline"
            >
              Reset Category
            </button>
          </div>

          {/* Exam Category Filter Slider */}
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-thin">
            {[
              { id: '', label: 'All Exams' },
              { id: 'Engineering Exams', label: 'Engineering' },
              { id: 'Medical Exams', label: 'Medical' },
              { id: 'Law Exams', label: 'Law' },
              { id: 'Management Exams', label: 'Management' },
              { id: 'Government Exams', label: 'Government / Civil' },
              { id: 'Teaching Exams', label: 'Teaching' },
              { id: 'Defence Exams', label: 'Defence' },
              { id: 'Banking Exams', label: 'Banking' },
              { id: 'Railway Exams', label: 'Railways' },
              { id: 'SSC Exams', label: 'SSC' },
              { id: 'State PSC Exams', label: 'State PSC' },
              { id: 'International Exams', label: 'International PG' }
            ].map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setExamFilters({ category: cat.id })}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 transition-all border ${examFilters.category === cat.id ? tokens.navActive : tokens.navInactive}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Exam Cards Layout */}
          {filteredExams.length === 0 ? (
            <div className={`p-8 text-center rounded-3xl border border-dashed text-slate-500 font-semibold ${tokens.surface}`}>
              No competitive exam files indexed for this selection. Try general categories.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredExams.map((ex) => {
                const isExpanded = expandedExamId === ex.id;
                return (
                  <div
                    key={ex.id}
                    className={`rounded-3xl border p-6 flex flex-col justify-between ${tokens.surface} ${tokens.cardHover}`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[9px] font-extrabold text-indigo-400 uppercase tracking-widest px-2.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/15">
                          {ex.category}
                        </span>
                        <span className="text-[10px] text-slate-500 font-extrabold">National Exam</span>
                      </div>

                      <h4 className={`text-base font-black ${tokens.textMain}`}>{ex.title}</h4>
                      <p className={`text-xs mt-2 ${tokens.muted}`}>
                        <strong>Eligibility:</strong> {ex.eligibility}
                      </p>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-4 border-t border-slate-500/10 space-y-3 text-xs text-slate-400 overflow-hidden"
                          >
                            <div>
                              <strong className="text-slate-300">Exam Pattern:</strong> {ex.pattern}
                            </div>
                            <div>
                              <strong className="text-slate-300">Syllabus Breakdown:</strong> {ex.syllabus}
                            </div>
                            <div>
                              <strong className="text-slate-300">Previous Cutoffs:</strong> {ex.cutoff}
                            </div>
                            <div className="p-3.5 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
                              <strong className="text-indigo-300 block mb-1">Preparation Roadmap:</strong>
                              <p className="text-[11px] text-slate-400 leading-relaxed">{ex.roadmap}</p>
                            </div>
                            <div className="text-[10px] text-indigo-400 font-bold underline cursor-pointer hover:text-indigo-300">
                              📑 {ex.previousYearPapers}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-500/10 flex items-center justify-between">
                      <button
                        onClick={() => setExpandedExamId(isExpanded ? null : ex.id)}
                        className="text-xs font-bold text-indigo-400 underline hover:text-indigo-300 transition-colors"
                      >
                        {isExpanded ? 'Hide Exam Specifications' : 'Expand Syllabus & Roadmap'}
                      </button>
                      <Link
                        to="/explore"
                        className="text-xs font-bold text-slate-400 flex items-center gap-1 hover:text-white transition-colors"
                      >
                        <span>Interactive Hub</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>


        {/* MARKET ANALYTICS GRAPH COMPONENT */}
        <section id="analytics-trends" className="scroll-mt-24 space-y-6">
          <div className="text-center space-y-2">
            <div className="section-chip">
              <BarChart3 className="h-3.5 w-3.5 text-indigo-400" />
              <span>Statistical Analytics</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-black ${tokens.textMain}`}>Ecosystem Trends & Analytics</h2>
            <p className={`text-xs sm:text-sm ${tokens.muted}`}>Track scholarship volume, career sector demands, starting packages, and exam registration rates.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            
            {/* Chart 1: Salary Projections by Category */}
            <div className={`p-6 rounded-3xl border ${tokens.surface}`}>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-4.5 w-4.5 text-indigo-400 animate-pulse-slow" />
                <h4 className={`text-sm font-extrabold uppercase tracking-wider ${tokens.textMain}`}>Avg Entry Salary Projections</h4>
              </div>
              <p className="text-xs text-slate-500 mb-6">Median starting packages (LPA) compiled across primary streams:</p>
              
              <div className="space-y-4">
                {[
                  { name: 'Engineering & Computing', percentage: 95, salary: '₹6.0 - ₹35.0 LPA', color: 'from-indigo-500 to-indigo-600' },
                  { name: 'Law & Corporate Legals', percentage: 78, salary: '₹5.0 - ₹22.0 LPA', color: 'from-purple-500 to-purple-600' },
                  { name: 'Commerce & Audit (CA)', percentage: 75, salary: '₹5.0 - ₹25.0 LPA', color: 'from-cyan-500 to-cyan-600' },
                  { name: 'Arts, UI & Product Design', percentage: 68, salary: '₹4.0 - ₹20.0 LPA', color: 'from-pink-500 to-pink-600' },
                  { name: 'Technical Diploma & ITI', percentage: 48, salary: '₹3.0 - ₹12.0 LPA', color: 'from-amber-500 to-amber-600' }
                ].map((bar, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-400">{bar.name}</span>
                      <span className="text-emerald-400 font-extrabold">{bar.salary}</span>
                    </div>
                    <div className="h-2.5 bg-slate-950/60 rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${bar.percentage}%` }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                        className={`h-full rounded-full bg-gradient-to-r ${bar.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart 2: Educational Scholarship Funding Trends (YoY volume) */}
            <div className={`p-6 rounded-3xl border flex flex-col justify-between ${tokens.surface}`}>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4.5 w-4.5 text-emerald-400" />
                  <h4 className={`text-sm font-extrabold uppercase tracking-wider ${tokens.textMain}`}>Ecosystem Funding Volumes</h4>
                </div>
                <p className="text-xs text-slate-500 mb-6">Total surfaced scholarship funds and allocations YoY (in INR):</p>
              </div>

              {/* Custom SVG Area Line Chart */}
              <div className="relative h-32 w-full flex items-end justify-between px-4 pb-2">
                {/* Horizontal grid guide lines */}
                <div className="absolute inset-x-0 top-0 border-t border-slate-500/10 pointer-events-none" />
                <div className="absolute inset-x-0 top-1/2 border-t border-slate-500/10 pointer-events-none" />

                {[
                  { year: '2023', amt: '₹400 Cr', percent: '40%' },
                  { year: '2024', amt: '₹850 Cr', percent: '65%' },
                  { year: '2025', amt: '₹1200 Cr', percent: '85%' },
                  { year: '2026', amt: '₹1500 Cr', percent: '100%' }
                ].map((pt, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 z-10">
                    <span className="text-[10px] font-extrabold text-indigo-400">{pt.amt}</span>
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: pt.percent }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      className="w-10 rounded-t-lg bg-gradient-to-t from-indigo-500/25 to-indigo-500 border-t border-indigo-400/30"
                    />
                    <span className="text-[10px] text-slate-500 font-extrabold">{pt.year}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* FLOATING AI ASSISTANT WIDGET */}
      <div className="fixed bottom-6 right-6 z-50">
        
        {/* Floating Bubble button */}
        {!showAiWidget && (
          <button
            onClick={() => setShowAiWidget(true)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-royal hover:bg-royal/95 text-white shadow-premium hover:scale-105 transition-all border border-white/10"
          >
            <MessageSquare className="h-6 w-6" />
          </button>
        )}

        {/* AI Chat drawer console */}
        <AnimatePresence>
          {showAiWidget && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className={`rounded-3xl border p-5 w-[calc(100vw-2rem)] sm:w-80 md:w-[26rem] flex flex-col justify-between backdrop-blur-2xl ${theme === 'dark' ? 'bg-slate-950/95 border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.85)] text-white' : 'bg-white/95 border-slate-200/80 shadow-premium text-midnight'}`}
            >
              {/* Chat Header */}
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-500/10 pb-3 mb-3 font-satoshi">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <h4 className={`text-xs font-bold uppercase tracking-widest ${tokens.textMain} flex items-center gap-1.5 font-clash`}>
                    <BrainCircuit className="h-4 w-4 text-royal dark:text-indigo-400" />
                    <span>Guidance Engine</span>
                  </h4>
                </div>
                <button
                  onClick={() => setShowAiWidget(false)}
                  className="text-slateSecondary hover:text-red-500 transition-colors"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Chat Log Drawer display */}
              <div className="h-56 overflow-y-auto space-y-3.5 mb-4 scrollbar-thin text-xs p-1 font-satoshi">
                {aiChatLogs.map((log, idx) => (
                  <div key={idx} className={`flex ${log.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${log.role === 'user' ? 'bg-royal text-white rounded-br-none shadow-sm' : 'bg-slate-100/60 dark:bg-slate-900/50 text-midnight dark:text-slate-300 border border-slate-200/50 dark:border-white/5 rounded-bl-none'}`}>
                      <p className="whitespace-pre-line leading-normal">{log.text}</p>
                    </div>
                  </div>
                ))}
                
                {aiTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-100/60 dark:bg-slate-900/50 text-slate-400 p-3.5 rounded-2xl rounded-bl-none border border-slate-200/50 dark:border-white/5">
                      <div className="flex gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" />
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Predefined prompts shortcuts */}
              <div className="space-y-2 mb-4 font-satoshi">
                <span className="text-[9px] uppercase font-bold text-slateSecondary tracking-wider block">Common Questions</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Which stream should I choose after Class 10?",
                    "Best scholarships for B.Tech students?",
                    "Government internship for engineering?",
                    "How to prepare for UPSC?"
                  ].map((q) => (
                    <button
                      key={q}
                      onClick={() => triggerAiResponse(q)}
                      className={`text-[10px] font-semibold text-left px-3 py-1.5 rounded-xl border transition-all text-ellipsis overflow-hidden whitespace-nowrap max-w-full ${theme === 'dark' ? 'border-white/5 bg-white/5 text-slate-400 hover:text-white hover:border-indigo-500/30' : 'border-slate-200 bg-slate-50/50 text-slateSecondary hover:bg-slate-100 hover:text-royal'}`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Input controls */}
              <form onSubmit={handleCustomAiSubmit} className="flex gap-2 border-t border-slate-200 dark:border-slate-500/10 pt-3">
                <input
                  type="text"
                  value={customAiQuery}
                  onChange={(e) => setCustomAiQuery(e.target.value)}
                  placeholder="Ask customized questions..."
                  className={`flex-1 rounded-xl p-2.5 text-xs outline-none border ${tokens.input} font-satoshi`}
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-xl bg-royal text-white hover:bg-royal/95 transition-colors shadow-sm"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
