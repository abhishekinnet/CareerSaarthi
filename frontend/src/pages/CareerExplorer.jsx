import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Atom,
  BadgeCheck,
  BarChart3,
  BrainCircuit,
  BriefcaseBusiness,
  Building2,
  Calculator,
  ChevronRight,
  Compass,
  Crown,
  GraduationCap,
  HeartPulse,
  Lightbulb,
  Lock,
  MoonStar,
  Palette,
  Search,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Users,
  Video,
  BookOpen,
  ClipboardList,
  Target,
  Cpu,
  Rocket,
  Medal,
  Clock3,
  ArrowUpRight,
  TrendingUp,
  Award,
  BookMarked,
  HelpCircle,
  PlayCircle,
  Sparkle,
  CheckCircle2,
} from 'lucide-react';
import api from '../utils/api';
import {
  after12thSections,
  buildLocalRecommendations,
  class10Streams,
  examSections,
  interviewCategories,
  slugify,
} from '../data/careerExplorerData';

const categoryIcons = {
  engineering: Cpu,
  medical: HeartPulse,
  commerce: Calculator,
  arts: Palette,
  government: ShieldCheck,
  entrepreneurship: Rocket,
  streams: Compass,
  engineeringExams: Target,
  medicalExams: HeartPulse,
  governmentExams: ShieldCheck,
};

const themeTokens = {
  dark: {
    shell: 'bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.12),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(249,115,22,0.06),_transparent_30%),linear-gradient(180deg,_#080C16,_#0F172A)] text-slate-100 min-h-screen',
    surface: 'border-white/10 bg-white/5 backdrop-blur-xl text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]',
    muted: 'text-slate-400',
    cardText: 'text-white',
    panel: 'border-white/10 bg-slate-900/40 text-white shadow-[0_24px_80px_rgba(0,0,0,0.65)]',
    input: 'border-white/10 bg-slate-950/60 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20',
    cardHover: 'hover:border-indigo-500/30 hover:bg-white/10 hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)]',
    navActive: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
    navInactive: 'bg-white/5 text-slate-300 border-white/5 hover:bg-white/10',
    textMain: 'text-white',
  },
  light: {
    shell: 'bg-[radial-gradient(circle_at_top_left,_rgba(79,70,229,0.04),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(249,115,22,0.03),_transparent_30%),linear-gradient(180deg,_#FAFAF9,_#F5F5F4)] text-midnight min-h-screen',
    surface: 'border-slate-200/80 bg-white/70 backdrop-blur-xl text-midnight shadow-premium',
    muted: 'text-slateSecondary',
    cardText: 'text-midnight',
    panel: 'border-slate-200 bg-white/85 text-midnight shadow-premium',
    input: 'border-slate-200 bg-white/90 text-midnight placeholder:text-slate-400 focus:border-royal focus:ring-1 focus:ring-royal/20',
    cardHover: 'hover:border-royal/30 hover:bg-white hover:shadow-premium',
    navActive: 'bg-royal/10 text-royal border-royal/20',
    navInactive: 'bg-slate-100 text-slateSecondary border-slate-200/60 hover:bg-slate-200/60 hover:text-midnight',
    textMain: 'text-midnight',
  },
};

export default function CareerExplorer() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => localStorage.getItem('careerExplorerTheme') || 'light');
  const [activeSection, setActiveSection] = useState('engineering');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [aiResults, setAiResults] = useState([]);
  const [expandedExam, setExpandedExam] = useState(null);
  const [activeInterviewCard, setActiveInterviewCard] = useState({ id: null, tab: 'questions' });
  const [aiForm, setAiForm] = useState({
    interests: '',
    skills: '',
    academicScores: '',
    goals: '',
  });

  useEffect(() => {
    localStorage.setItem('careerExplorerTheme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  // Section 2 (Class 12) Active section details
  const activeAfter12thSection = after12thSections.find((section) => section.id === activeSection) || after12thSections[0];
  const activeItems = useMemo(() => {
    const rawItems = activeAfter12thSection?.items || [];
    const filtered = rawItems.filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase().trim()));
    return filtered.length ? filtered : rawItems;
  }, [activeAfter12thSection, searchQuery]);

  // Section 3 (Exams) search
  const filteredExamSections = useMemo(() => {
    if (!searchQuery) return examSections;
    return examSections
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase().trim())),
      }))
      .filter((section) => section.items.length > 0);
  }, [searchQuery]);

  // Section 4 (Interviews) search
  const filteredInterviewCategories = useMemo(() => {
    if (!searchQuery) return interviewCategories;
    return interviewCategories.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase().trim()));
  }, [searchQuery]);

  const tokens = themeTokens[theme];

  const handleAiInput = (e) => {
    const { name, value } = e.target;
    setAiForm((prev) => ({ ...prev, [name]: value }));
  };

  const runAiRecommendations = async (e) => {
    e.preventDefault();
    if (!aiForm.interests.trim() && !aiForm.skills.trim()) {
      setAiError('Please enter at least some interests or skills to generate customized suggestions.');
      return;
    }

    setAiLoading(true);
    setAiError('');

    const interests = aiForm.interests.split(',').map((item) => item.trim()).filter(Boolean);
    const skills = aiForm.skills.split(',').map((item) => item.trim()).filter(Boolean);
    const fallback = buildLocalRecommendations({
      interests,
      skills,
      academicScores: aiForm.academicScores,
      goals: aiForm.goals,
    });

    try {
      const payload = {
        interests,
        skills,
        academicPerformance: {
          gradeLevel: '12th Standard',
          stream: 'Science',
          percentageOrGpa: Number(aiForm.academicScores) || 85,
          favoriteSubjects: interests,
        },
        careerGoals: aiForm.goals ? [aiForm.goals] : [],
        financialGoals: {
          targetSalaryRange: '6-20 LPA',
        },
      };

      const response = await api.post('/ai/predict-career', payload);
      const remote = response.data?.report?.recommendedCareers || [];
      const normalizedRemote = remote.map((item) => ({
        title: item.title,
        matchPercentage: item.matchPercentage || 85,
        degree: item.degree || 'B.Tech / B.Sc / Specialization equivalent',
        college: (item.colleges || []).slice(0, 2).join(', ') || 'Top engineering/medical institutions',
        scholarship: (item.scholarships || []).slice(0, 2).join(', ') || 'National Merit scholarship options',
        roadmap: (item.roadmap || []).map((step) => step.phase || step.title || 'Step').slice(0, 3),
      }));
      setAiResults(normalizedRemote.length ? normalizedRemote.slice(0, 5) : fallback);
    } catch (error) {
      setAiResults(fallback);
      setAiError('Notice: Live AI engine is offline. Loaded intelligent recommendations using our matching engine.');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className={tokens.shell}>
      {/* Decorative Blur Orbs */}
      <div className="absolute top-10 left-[10%] w-[35rem] h-[35rem] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[5%] w-[30rem] h-[30rem] bg-pink-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[20%] w-[35rem] h-[35rem] bg-cyan-500/80 rounded-full blur-[130px] pointer-events-none opacity-[0.07]" />

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 relative z-10">
        
        {/* HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`overflow-hidden rounded-[2.5rem] border p-8 md:p-12 mb-12 backdrop-blur-md ${tokens.panel}`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/25 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
                <Compass className="h-3.5 w-3.5 animate-spin-slow" />
                <span>Interactive Career Portal</span>
              </div>
              <h1 className={`mt-6 text-4xl sm:text-6xl font-black tracking-tight font-clash ${tokens.textMain}`}>
                Choose Your Future with an <span className={`bg-gradient-to-r bg-clip-text text-transparent ${theme === 'dark' ? 'from-indigo-400 via-purple-400 to-cyan-400' : 'from-royal via-indigo-600 to-cyan-600'}`}>Interactive Journey.</span>
              </h1>
              <p className={`mt-6 text-base sm:text-lg leading-8 ${tokens.muted}`}>
                Map out your dreams step-by-step. Discover high-growth paths after Class 10, compare competitive entrance exams, master interviews, and generate personalized AI pathways.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#ai-recommendations"
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 text-white font-semibold flex items-center gap-2 shadow-[0_8px_25px_rgba(99,102,241,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_12px_30px_rgba(99,102,241,0.45)]"
                >
                  <span>Generate AI Shortlist</span>
                  <BrainCircuit className="h-4 w-4" />
                </a>
                
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className={`px-6 py-3.5 rounded-2xl border flex items-center gap-2 font-semibold transition-all ${tokens.navInactive}`}
                >
                  {theme === 'dark' ? <SunMedium className="h-4.5 w-4.5 text-amber-400" /> : <MoonStar className="h-4.5 w-4.5 text-indigo-600" />}
                  <span>{theme === 'dark' ? 'Light Theme' : 'Dark Theme'}</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 w-full lg:w-[26rem]">
              {[
                { icon: BrainCircuit, title: '98%', desc: 'AI Fit Accuracy', color: 'text-indigo-400' },
                { icon: Users, title: '10K+', desc: 'Active Mentors', color: 'text-purple-400' },
                { icon: GraduationCap, title: '250+', desc: 'Colleges Listed', color: 'text-cyan-400' },
                { icon: TrendingUp, title: '₹42L', desc: 'Highest Average package', color: 'text-emerald-400' },
              ].map((m, idx) => (
                <div key={idx} className={`p-5 rounded-2xl border transition-all hover:-translate-y-1 ${theme === 'dark' ? 'border-white/5 bg-white/5' : 'border-slate-200 bg-white'}`}>
                  <m.icon className={`h-6 w-6 ${m.color}`} />
                  <p className={`text-2xl font-bold mt-3 ${tokens.textMain}`}>{m.title}</p>
                  <p className={`text-xs ${tokens.muted}`}>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>


        {/* SECTION 1: CLASS 10 CAREER STREAM SELECTOR */}
        <section className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-xs font-semibold uppercase tracking-wider text-indigo-400">
              <Sparkles className="h-3 w-3" />
              <span>Section 1: Milestone 10th</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-extrabold mt-3 ${tokens.textMain}`}>Choose Your Future After Class 10</h2>
            <p className={`text-sm sm:text-base mt-2 ${tokens.muted}`}>Explore core academic streams based on your skills, subjects, and ultimate career ambitions.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {class10Streams.map((stream, idx) => {
              const Icon = [Atom, Calculator, Palette][idx] || Compass;
              const topGradient = idx === 0 ? 'from-indigo-600/10 to-indigo-600/0' : idx === 1 ? 'from-amber-600/10 to-amber-600/0' : 'from-cyan-600/10 to-cyan-600/0';
              return (
                <motion.div
                  key={stream.id}
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`relative overflow-hidden rounded-3xl border p-6 flex flex-col justify-between ${tokens.surface} ${tokens.cardHover}`}
                >
                  <div className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-b ${topGradient} pointer-events-none`} />
                  
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-5">
                      <div className={`p-3 rounded-2xl border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
                        <Icon className="h-6 w-6 text-indigo-400" />
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${theme === 'dark' ? 'bg-white/5 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                        {stream.badge}
                      </span>
                    </div>

                    <h3 className={`text-2xl font-bold ${tokens.textMain}`}>{stream.title}</h3>
                    <p className={`text-xs mt-2 leading-relaxed ${tokens.muted}`}>{stream.overview}</p>

                    {/* Subjects Grid */}
                    <div className="mt-5">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-2">Key Subjects</span>
                      <div className="flex flex-wrap gap-1.5">
                        {stream.subjects.map((sub, sIdx) => (
                          <span key={sIdx} className={`text-[11px] font-medium px-2.5 py-1 rounded-lg ${theme === 'dark' ? 'bg-white/5 border border-white/5 text-slate-300' : 'bg-slate-50 border border-slate-200/50 text-slate-700'}`}>
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Salary & Degrees */}
                    <div className="mt-6 space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className={tokens.muted}>Future Degrees:</span>
                        <span className={`font-semibold ${tokens.textMain}`}>{stream.futureDegrees.join(', ')}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className={tokens.muted}>Avg Salary Range:</span>
                        <span className={`font-semibold text-emerald-400`}>{stream.averageSalary}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className={tokens.muted}>Growth Trend:</span>
                        <span className="font-semibold text-indigo-400">{stream.growthPotential}</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA Action */}
                  <div className="mt-8 pt-4 border-t border-slate-500/10">
                    <Link
                      to={stream.route}
                      className="w-full py-3 px-4 rounded-xl font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all"
                    >
                      <span>Explore Stream Pathways</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>


        {/* SECTION 2: AFTER 12TH INTERACTIVE CAREER MAP */}
        <section className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-xs font-semibold uppercase tracking-wider text-indigo-400">
              <Compass className="h-3 w-3" />
              <span>Section 2: Interactive Career Map</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-extrabold mt-3 ${tokens.textMain}`}>Explore Paths After 12th Standard</h2>
            <p className={`text-sm sm:text-base mt-2 ${tokens.muted}`}>Use our navigation rail to toggle between sectors, inspect specialization nodes, and trace timelines.</p>
          </div>

          {/* Interactive Navigation Rail */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
            {after12thSections.map((section) => {
              const active = activeSection === section.id;
              const Icon = categoryIcons[section.id] || Compass;
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    setSearchQuery('');
                  }}
                  className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all ${active ? tokens.navActive : tokens.navInactive}`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{section.title}</span>
                </button>
              );
            })}
          </div>

          {/* Node Grid Layout */}
          <div className={`rounded-3xl border p-6 md:p-8 ${tokens.surface}`}>
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] items-start">
              
              {/* Left Column: Category Description */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20`}>
                    {(() => {
                      const Icon = categoryIcons[activeAfter12thSection.id] || Compass;
                      return <Icon className="h-6 w-6 text-indigo-400" />;
                    })()}
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold ${tokens.textMain}`}>{activeAfter12thSection.title}</h3>
                    <span className="text-[10px] text-indigo-400 uppercase tracking-widest font-semibold">Active Sector Domain</span>
                  </div>
                </div>

                <p className={`text-sm leading-relaxed ${tokens.muted}`}>{activeAfter12thSection.description}</p>

                {/* Local search inside this category */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search within ${activeAfter12thSection.title}...`}
                    className={`w-full rounded-xl py-3 pl-11 pr-4 text-xs font-semibold outline-none transition-colors border ${tokens.input}`}
                  />
                </div>

                {/* Linear Style Pipeline Indicator */}
                <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Path Pipeline Status</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-normal">
                    Clicking a specialization node displays average salaries, qualifications, entrance milestones, and colleges.
                  </p>
                </div>
              </div>

              {/* Right Column: Specialization Nodes */}
              <div>
                <h4 className="text-xs uppercase font-bold tracking-widest text-slate-500 mb-4">Interactive Career Nodes</h4>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  {activeItems.map((item) => {
                    const slug = slugify(item);
                    const route = `${activeAfter12thSection.routeBase}/${slug}`;
                    return (
                      <motion.div
                        key={item}
                        whileHover={{ scale: 1.02 }}
                        className={`rounded-2xl border p-5 transition-all flex flex-col justify-between ${theme === 'dark' ? 'border-white/5 bg-slate-900/40 hover:bg-slate-900/80 hover:border-indigo-500/20' : 'border-slate-200/80 bg-white hover:bg-slate-50 hover:border-indigo-500/20'}`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 uppercase`}>
                              Node
                            </span>
                            <ChevronRight className="h-4 w-4 text-slate-500" />
                          </div>
                          <h5 className={`text-lg font-bold mt-2 ${tokens.textMain}`}>{item}</h5>
                          <p className={`text-xs mt-1 leading-relaxed ${tokens.muted}`}>
                            Explore qualifications, preparation roadmap, colleges, and scholarships.
                          </p>
                        </div>

                        <div className="mt-5 pt-3 border-t border-slate-500/10 flex items-center justify-between">
                          <Link to={route} className="text-xs font-semibold text-indigo-400 flex items-center gap-1 hover:underline">
                            <span>Open Career Ledger</span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* SECTION 3: EXAM EXPLORER */}
        <section className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-xs font-semibold uppercase tracking-wider text-indigo-400">
              <Award className="h-3 w-3" />
              <span>Section 3: Competitive Exam Explorer</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-extrabold mt-3 ${tokens.textMain}`}>National & State-Level Exam Guides</h2>
            <p className={`text-sm sm:text-base mt-2 ${tokens.muted}`}>Review structured syllabi, patterns, age metrics, eligibility criteria, and preparation roadmaps.</p>
          </div>

          <div className="space-y-6">
            {filteredExamSections.map((section) => {
              const Icon = categoryIcons[`${section.id.replace('-exams', '')}Exams`] || ShieldCheck;
              return (
                <div key={section.id} className={`rounded-3xl border p-6 ${tokens.surface}`}>
                  
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 rounded-xl bg-indigo-500/10">
                      <Icon className="h-5 w-5 text-indigo-400" />
                    </div>
                    <h3 className={`text-xl font-bold ${tokens.textMain}`}>{section.title}</h3>
                  </div>

                  {/* Exam Grid */}
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {section.items.map((item) => {
                      const slug = slugify(item);
                      const isExpanded = expandedExam === item;
                      const detailRoute = `${section.routeBase}/${slug}`;
                      
                      return (
                        <div
                          key={item}
                          className={`rounded-2xl border p-5 transition-all flex flex-col justify-between ${theme === 'dark' ? 'border-white/5 bg-slate-900/20' : 'border-slate-200/60 bg-white/50'}`}
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Exam Registry</span>
                              <Sparkle className="h-3 w-3 text-indigo-400" />
                            </div>
                            <h4 className={`text-lg font-bold mt-1.5 ${tokens.textMain}`}>{item}</h4>
                            <p className={`text-xs mt-1 ${tokens.muted}`}>Complete study tracker, attempt timelines, patterns, and salary insights.</p>

                            {/* Collapsible Info for quick overview */}
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="mt-4 pt-3 border-t border-slate-500/10 space-y-2 text-xs text-slate-400 overflow-hidden"
                                >
                                  <div>
                                    <strong className="text-slate-200">Eligibility:</strong> High school graduate / Bachelor's.
                                  </div>
                                  <div>
                                    <strong className="text-slate-200">Syllabus Focus:</strong> Core subjects, logic, reasoning.
                                  </div>
                                  <div>
                                    <strong className="text-slate-200">Previous Trends:</strong> Cutoffs have increased 8% YoY.
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          <div className="mt-5 pt-3 border-t border-slate-500/10 flex items-center justify-between gap-2">
                            <button
                              onClick={() => setExpandedExam(isExpanded ? null : item)}
                              className="text-xs text-slate-400 hover:text-white underline"
                            >
                              {isExpanded ? 'Hide Specs' : 'Quick Specs'}
                            </button>
                            
                            <Link to={detailRoute} className="text-xs font-bold text-indigo-400 flex items-center gap-1 hover:underline">
                              <span>Full Blueprint</span>
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              );
            })}
          </div>
        </section>


        {/* SECTION 4: INTERVIEW PREPARATION HUB */}
        <section className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-xs font-semibold uppercase tracking-wider text-indigo-400">
              <Video className="h-3 w-3" />
              <span>Section 4: Practice Hub</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-extrabold mt-3 ${tokens.textMain}`}>Interview Preparation Hub</h2>
            <p className={`text-sm sm:text-base mt-2 ${tokens.muted}`}>Interactive preparation panels covering questions, tips, mock scenarios, and video guides.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredInterviewCategories.map((cat) => {
              const isSelected = activeInterviewCard.id === cat.id;
              const selectedTab = activeInterviewCard.tab;
              const detailRoute = `/explore/interview/${cat.slug}`;

              return (
                <div
                  key={cat.id}
                  className={`rounded-3xl border p-5 flex flex-col justify-between transition-all ${tokens.surface} ${isSelected ? 'ring-2 ring-indigo-500/40' : ''}`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Prep Deck</span>
                      <Video className="h-4 w-4 text-indigo-400" />
                    </div>

                    <h3 className={`text-xl font-bold ${tokens.textMain}`}>{cat.title}</h3>
                    <p className={`text-xs mt-1 ${tokens.muted}`}>{cat.summary}</p>

                    {/* Mini Tab Selectors inside the card */}
                    <div className={`mt-4 flex gap-1 p-1 rounded-lg border ${theme === 'dark' ? 'bg-slate-900/50 border-white/5' : 'bg-slate-100 border-slate-200'}`}>
                      {['questions', 'tips', 'videos'].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveInterviewCard({ id: cat.id, tab })}
                          className={`flex-1 py-1 text-[10px] font-bold uppercase rounded text-center transition-all ${isSelected && selectedTab === tab ? (theme === 'dark' ? 'bg-indigo-500 text-white' : 'bg-royal text-white') : (theme === 'dark' ? 'text-slate-400 hover:text-slate-200' : 'text-slateSecondary hover:text-midnight')}`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    {/* Interactive Tab Content Display */}
                    {isSelected && (
                      <div className={`mt-4 p-3.5 rounded-xl border ${theme === 'dark' ? 'bg-black/40 border-white/5' : 'bg-slate-100/60 border-slate-200'}`}>
                        {selectedTab === 'questions' && (
                          <div className="space-y-2">
                            <p className="text-[10px] font-bold text-slate-500 uppercase">Common Q&A Sample</p>
                            <p className="text-xs font-semibold text-slate-200">"Tell me about a time you resolved conflict."</p>
                            <p className="text-[11px] text-slate-400 mt-1">Approach: Utilize the STAR method emphasizing teamwork.</p>
                          </div>
                        )}
                        {selectedTab === 'tips' && (
                          <div className="space-y-2">
                            <p className="text-[10px] font-bold text-slate-500 uppercase">Preparation Tip</p>
                            <ul className="list-disc pl-4 text-[11px] text-slate-400 space-y-1">
                              <li>Maintain proactive eye contact.</li>
                              <li>Prepare three structured portfolio summaries.</li>
                            </ul>
                          </div>
                        )}
                        {selectedTab === 'videos' && (
                          <div className="space-y-2">
                            <p className="text-[10px] font-bold text-slate-500 uppercase">Video Anchor</p>
                            <a
                              href="https://www.youtube.com/embed/dQw4w9WgXcQ"
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:underline"
                            >
                              <PlayCircle className="h-4.5 w-4.5 text-red-500" />
                              <span>Mastering HR Questions</span>
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-500/10 flex items-center justify-between">
                    <button
                      onClick={() => setActiveInterviewCard(isSelected ? { id: null, tab: 'questions' } : { id: cat.id, tab: 'questions' })}
                      className="text-xs text-slate-500 hover:text-white"
                    >
                      {isSelected ? 'Close Quick View' : 'Quick Preview'}
                    </button>
                    
                    <Link to={detailRoute} className="text-xs font-bold text-indigo-400 flex items-center gap-0.5 hover:underline">
                      <span>Full Preparation Guide</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>


        {/* SECTION 6: AI CAREER RECOMMENDATION */}
        <section id="ai-recommendations" className="scroll-mt-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-xs font-semibold uppercase tracking-wider text-indigo-400">
              <Crown className="h-3 w-3" />
              <span>Section 6: AI Matcher</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-extrabold mt-3 ${tokens.textMain}`}>AI Career Recommendation Panel</h2>
            <p className={`text-sm sm:text-base mt-2 ${tokens.muted}`}>Submit your parameters to generate a ranked shortlist with tailored degree pathing and scholarships.</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] items-start">
            
            {/* Input Form Panel */}
            <form
              onSubmit={runAiRecommendations}
              className={`rounded-3xl border p-6 md:p-8 backdrop-blur-xl ${tokens.panel}`}
            >
              <h3 className={`text-xl font-bold mb-6 ${tokens.textMain}`}>Enter Profile Parameters</h3>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Interests</label>
                  <textarea
                    name="interests"
                    value={aiForm.interests}
                    onChange={handleAiInput}
                    placeholder="Coding, financial models, creative writing, health sciences, law..."
                    rows="2"
                    className={`w-full rounded-xl p-3 text-xs outline-none transition-all border font-semibold ${tokens.input}`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Acquired Skills</label>
                  <textarea
                    name="skills"
                    value={aiForm.skills}
                    onChange={handleAiInput}
                    placeholder="Python, Public Speaking, Analytical Thinking, User Experience..."
                    rows="2"
                    className={`w-full rounded-xl p-3 text-xs outline-none transition-all border font-semibold ${tokens.input}`}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Academic Scores / GPA</label>
                    <input
                      type="text"
                      name="academicScores"
                      value={aiForm.academicScores}
                      onChange={handleAiInput}
                      placeholder="85% or 9.0 CGPA"
                      className={`w-full rounded-xl p-3 text-xs outline-none transition-all border font-semibold ${tokens.input}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Career Goals</label>
                    <input
                      type="text"
                      name="goals"
                      value={aiForm.goals}
                      onChange={handleAiInput}
                      placeholder="High salary, Startup, Stability"
                      className={`w-full rounded-xl p-3 text-xs outline-none transition-all border font-semibold ${tokens.input}`}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={aiLoading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-[1.01] shadow-[0_8px_25px_rgba(99,102,241,0.2)] disabled:opacity-50"
                >
                  {aiLoading ? 'Fusing profile with AI schemas...' : 'Generate Career Shortlist'}
                  <Sparkles className="h-4.5 w-4.5" />
                </button>

                {aiError && (
                  <p className="text-xs text-amber-500 font-semibold mt-2">{aiError}</p>
                )}
              </div>
            </form>

            {/* Results Display Panel */}
            <div className="space-y-4">
              {aiResults.length > 0 ? (
                aiResults.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`rounded-3xl border p-5 flex flex-col justify-between ${tokens.surface}`}
                  >
                    <div>
                      {/* Match Header */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25">
                          {item.matchPercentage}% Match fit
                        </span>
                        <BadgeCheck className="h-5 w-5 text-emerald-400" />
                      </div>

                      <h4 className={`text-xl font-bold ${tokens.textMain}`}>{item.title}</h4>
                      
                      {/* Suggested Degree, College, Scholarship */}
                      <div className="grid gap-3 sm:grid-cols-3 mt-4">
                        <div className={`p-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                          <p className="text-[9px] uppercase font-bold text-slate-500">Suggested Degree</p>
                          <p className={`text-xs font-semibold mt-1 truncate ${tokens.textMain}`}>{item.degree}</p>
                        </div>
                        <div className={`p-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                          <p className="text-[9px] uppercase font-bold text-slate-500">Top Colleges</p>
                          <p className={`text-xs font-semibold mt-1 truncate ${tokens.textMain}`}>{item.college}</p>
                        </div>
                        <div className={`p-3 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                          <p className="text-[9px] uppercase font-bold text-slate-500">Scholarship Fits</p>
                          <p className={`text-xs font-semibold mt-1 truncate ${tokens.textMain}`}>{item.scholarship}</p>
                        </div>
                      </div>

                      {/* Learning roadmap milestones */}
                      <div className="mt-4">
                        <p className="text-[10px] uppercase font-bold text-slate-500 block mb-2">Learning Roadmap Phases</p>
                        <div className="flex flex-col sm:flex-row gap-2">
                          {item.roadmap.map((step, sIdx) => (
                            <div key={sIdx} className="flex-1 flex items-center gap-2 text-xs font-semibold">
                              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/15 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold shrink-0">
                                {sIdx + 1}
                              </span>
                              <span className="truncate text-slate-400">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className={`rounded-3xl border p-8 text-center flex flex-col items-center justify-center ${tokens.surface}`}>
                  <BrainCircuit className="h-12 w-12 text-slate-500 mb-4 animate-bounce" />
                  <h4 className={`text-lg font-bold ${tokens.textMain}`}>Awaiting Profile Input</h4>
                  <p className={`text-xs mt-1 max-w-sm ${tokens.muted}`}>
                    Submit interests, academic performance indices, and objectives to render career nodes and study tracks.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 mt-6 w-full max-w-md">
                    {[
                      'Top 5 Career Matches',
                      'Target Degrees',
                      'Scholarship Ledgers',
                      'Custom Timeline Roadmaps'
                    ].map((label, lIdx) => (
                      <div key={lIdx} className={`p-3 rounded-xl border text-[11px] font-semibold text-slate-400 ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-100 border-slate-200'}`}>
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
