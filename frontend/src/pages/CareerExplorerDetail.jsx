import React, { useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Sparkles,
  GraduationCap,
  BriefcaseBusiness,
  BookOpen,
  Star,
  Award,
  TrendingUp,
  CheckCircle2,
  Info,
  Calendar,
  List,
  PlayCircle,
  HelpCircle,
  Clock3,
  Activity,
  Layers,
  ArrowRight,
  Bookmark,
  ExternalLink,
} from 'lucide-react';
import { buildDetail } from '../data/careerExplorerData';

const themeTokens = {
  dark: {
    shell: 'bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(217,70,239,0.12),_transparent_30%),linear-gradient(180deg,_#04060f,_#080d19)] text-slate-100 min-h-screen',
    surface: 'border-white/10 bg-white/5 backdrop-blur-xl text-white',
    muted: 'text-slate-400',
    panel: 'border-white/10 bg-slate-950/45 text-white shadow-[0_24px_80px_rgba(0,0,0,0.65)]',
    textMain: 'text-white',
    cardHover: 'hover:border-indigo-500/30 hover:bg-white/10',
    tabActive: 'bg-indigo-500/15 text-indigo-200 border-indigo-500/30',
    tabInactive: 'bg-white/5 text-slate-300 border-white/5 hover:bg-white/10',
  },
  light: {
    shell: 'bg-[radial-gradient(circle_at_top_left,_rgba(79,70,229,0.08),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.08),_transparent_30%),linear-gradient(180deg,_#f8fafc,_#f1f5f9)] text-slate-900 min-h-screen',
    surface: 'border-slate-200/80 bg-white/75 backdrop-blur-xl text-slate-800 shadow-[0_10px_30px_rgba(15,23,42,0.04)]',
    muted: 'text-slate-600',
    panel: 'border-slate-200/80 bg-white/80 text-slate-900 shadow-[0_25px_60px_rgba(15,23,42,0.06)]',
    textMain: 'text-slate-900',
    cardHover: 'hover:border-indigo-500/20 hover:bg-white',
    tabActive: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    tabInactive: 'bg-slate-100 text-slate-700 border-slate-200/60 hover:bg-slate-200',
  },
};

export default function CareerExplorerDetail() {
  const params = useParams();
  const { pathname } = useLocation();

  // Deduce the type (career, exam, interview) from route pathname
  const type = pathname.includes('/exam/') ? 'exam' : pathname.includes('/interview/') ? 'interview' : 'career';
  const detail = buildDetail(type, params.group, params.slug);

  const [theme] = useState(() => localStorage.getItem('careerExplorerTheme') || 'dark');
  const [activeTab, setActiveTab] = useState(type === 'exam' ? 'overview' : type === 'interview' ? 'qna' : 'overview');
  const [selectedQuestionIdx, setSelectedQuestionIdx] = useState(0);

  const tokens = themeTokens[theme];

  return (
    <div className={tokens.shell}>
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-[20%] w-[30rem] h-[30rem] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-[15%] w-[25rem] h-[25rem] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 relative z-10">
        
        {/* Back Navigation Button */}
        <div className="mb-6">
          <Link
            to="/explore"
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-all ${theme === 'dark' ? 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'}`}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Explorer</span>
          </Link>
        </div>

        {/* HERO HEADER CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-3xl border p-6 md:p-10 mb-10 overflow-hidden relative ${tokens.panel}`}
        >
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] items-start">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-4">
                <Sparkles className="h-3 w-3" />
                <span>{detail.type}</span>
              </div>
              
              <h1 className={`text-3xl sm:text-5xl font-extrabold ${tokens.textMain}`}>{detail.title}</h1>
              <p className={`mt-4 text-sm sm:text-base leading-relaxed leading-6 ${tokens.muted}`}>
                {detail.overview}
              </p>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Salary Range</p>
                  <p className={`text-base font-bold mt-1 text-emerald-400`}>{detail.averageSalary}</p>
                </div>
                <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Fit Index</p>
                  <p className={`text-base font-bold mt-1 text-indigo-400`}>{detail.aiRecommendationScore}/100</p>
                </div>
                <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Market Demand</p>
                  <p className={`text-base font-bold mt-1 text-purple-400`}>{detail.industryDemand}</p>
                </div>
                <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Focus Field</p>
                  <p className={`text-xs font-bold mt-1.5 truncate ${tokens.textMain}`}>{detail.group}</p>
                </div>
              </div>
            </div>

            {/* Quick action checklist/box */}
            <div className={`p-5 rounded-2xl border flex flex-col justify-between h-full ${theme === 'dark' ? 'border-white/5 bg-slate-900/40' : 'border-slate-200 bg-white/70'}`}>
              <div>
                <div className="flex items-center gap-2 mb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <Bookmark className="h-4 w-4 text-indigo-400" />
                  <span>Interactive Checkpoints</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-indigo-400 shrink-0" />
                    <span>Read qualification maps</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-indigo-400 shrink-0" />
                    <span>Review scholarship ledgers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-indigo-400 shrink-0" />
                    <span>Verify registration criteria</span>
                  </li>
                </ul>
              </div>

              <a
                href="#ai-scores"
                className="mt-6 w-full py-3.5 rounded-xl bg-indigo-500/10 text-indigo-400 font-bold text-xs uppercase tracking-wider text-center block hover:bg-indigo-500 hover:text-white transition-all border border-indigo-500/20"
              >
                Inspect Matching Index
              </a>
            </div>
          </div>
        </motion.div>


        {/* DETAILED TIMELINE MAP */}
        <section className="mb-10">
          <div className="mb-6">
            <h3 className={`text-2xl font-bold ${tokens.textMain}`}>Visual Qualification Roadmap</h3>
            <p className={`text-xs sm:text-sm ${tokens.muted}`}>Trace your milestones step-by-step from foundations to career readiness.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {detail.qualificationRoadmap.map((item, index) => (
              <div
                key={index}
                className={`p-5 rounded-2xl border flex flex-col justify-between ${tokens.surface}`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-extrabold">
                      {index + 1}
                    </span>
                    <span className={`text-xs uppercase font-bold text-slate-500 tracking-wider`}>{item.title}</span>
                  </div>
                  <p className={`text-xs mt-3 leading-relaxed leading-5 text-slate-400`}>{item.detail}</p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-500/10 flex justify-end">
                  <span className="text-[10px] text-indigo-400 font-semibold uppercase">Phase {index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* MAIN BODY TABS OR SECTIONS */}

        {/* 1. EXAM DETAILS VIEW */}
        {type === 'exam' && (
          <section className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] mb-10 items-start">
            {/* Exam Navigation Panel */}
            <div className={`p-4 rounded-3xl border space-y-2 ${tokens.surface}`}>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 block mb-3">Exam Guide Navigation</span>
              {[
                { id: 'overview', label: 'Exam Overview', icon: Info },
                { id: 'syllabus', label: 'Syllabus & Pattern', icon: Layers },
                { id: 'eligibility', label: 'Eligibility & Limits', icon: CheckCircle2 },
                { id: 'careerGrowth', label: 'Growth & Salary', icon: TrendingUp },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left p-3 rounded-xl border font-bold text-xs flex items-center gap-2 transition-all ${activeTab === tab.id ? tokens.tabActive : tokens.tabInactive}`}
                >
                  <tab.icon className="h-4 w-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Exam Tab Content */}
            <div className={`p-6 md:p-8 rounded-3xl border min-h-[20rem] ${tokens.surface}`}>
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <h4 className={`text-xl font-bold ${tokens.textMain}`}>Official Exam Description</h4>
                  <p className={`text-sm leading-relaxed leading-6 text-slate-300`}>
                    This exam functions as a gateway to premier Indian universities and public jobs. It measures core competencies, subject fluency, and analytical capacities under timed conditions.
                  </p>
                  
                  <div className="grid gap-4 sm:grid-cols-2 mt-4">
                    <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-100 border-slate-200'}`}>
                      <h5 className={`font-bold text-xs ${tokens.textMain}`}>Selection Process</h5>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">{detail.selectionProcess}</p>
                    </div>
                    <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-100 border-slate-200'}`}>
                      <h5 className={`font-bold text-xs ${tokens.textMain}`}>Previous Cut-off Trends</h5>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">{detail.previousYearTrends}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'syllabus' && (
                <div className="space-y-6">
                  <h4 className={`text-xl font-bold ${tokens.textMain}`}>Syllabus & Exam Pattern Specs</h4>
                  
                  <div className="space-y-4">
                    <div className={`p-4 rounded-xl border border-dashed ${theme === 'dark' ? 'border-white/10' : 'border-slate-300'}`}>
                      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Core Syllabus Scope</span>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">{detail.syllabus}</p>
                    </div>
                    <div className={`p-4 rounded-xl border border-dashed ${theme === 'dark' ? 'border-white/10' : 'border-slate-300'}`}>
                      <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Question Pattern & Marking Scheme</span>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">{detail.examPattern}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'eligibility' && (
                <div className="space-y-6">
                  <h4 className={`text-xl font-bold ${tokens.textMain}`}>Eligibility Rules & Age Constraints</h4>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-100 border-slate-200'}`}>
                      <h5 className={`font-bold text-xs text-slate-400 uppercase`}>Academic Qualification</h5>
                      <p className={`text-xs mt-2 leading-relaxed ${tokens.textMain}`}>{detail.eligibility}</p>
                    </div>
                    <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-100 border-slate-200'}`}>
                      <h5 className={`font-bold text-xs text-slate-400 uppercase`}>Age & Attempt Restrictions</h5>
                      <p className={`text-xs mt-2 leading-relaxed ${tokens.textMain}`}>{detail.ageCriteria}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'careerGrowth' && (
                <div className="space-y-6">
                  <h4 className={`text-xl font-bold ${tokens.textMain}`}>Growth Trajectory & Salaries</h4>
                  <p className="text-sm text-slate-300">
                    Succeeding in this exam unlocks a high-trajectory career map. Successful candidates quickly climb through hierarchies with standard promotion pathways.
                  </p>
                  
                  <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-100 border-slate-200'}`}>
                    <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Standard Promotion Stages</span>
                    <p className={`text-xs font-semibold ${tokens.textMain}`}>{detail.careerGrowth}</p>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 2. INTERVIEW PREP HUB TABBED VIEW */}
        {type === 'interview' && (
          <section className="grid gap-8 lg:grid-cols-[1fr_1fr] mb-10 items-start">
            
            {/* Left Column: Common Questions (Interactive Accordion) */}
            <div className={`p-6 rounded-3xl border ${tokens.surface}`}>
              <div className="mb-4">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Question Bank</span>
                <h4 className={`text-xl font-bold mt-1 ${tokens.textMain}`}>Common Interview Q&As</h4>
              </div>

              <div className="space-y-3">
                {detail.commonQuestions.map((qObj, idx) => {
                  const isSelected = selectedQuestionIdx === idx;
                  return (
                    <div
                      key={idx}
                      className={`rounded-xl border transition-all ${theme === 'dark' ? 'border-white/5' : 'border-slate-200/80'} ${isSelected ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-white/0'}`}
                    >
                      <button
                        onClick={() => setSelectedQuestionIdx(idx)}
                        className="w-full text-left p-4 font-bold text-xs flex justify-between items-center gap-3"
                      >
                        <span className={isSelected ? 'text-indigo-400' : 'text-slate-300'}>{qObj.q}</span>
                        <HelpCircle className="h-4 w-4 text-slate-500 shrink-0" />
                      </button>
                      
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="px-4 pb-4 text-xs text-slate-400 overflow-hidden leading-relaxed"
                          >
                            <div className="h-px bg-slate-500/10 my-2" />
                            <strong>Recommended Approach:</strong> {qObj.a}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Tips & Video Guides */}
            <div className="space-y-6">
              
              {/* Prep Tips */}
              <div className={`p-6 rounded-3xl border ${tokens.surface}`}>
                <h4 className={`text-lg font-bold mb-4 ${tokens.textMain}`}>Strategic Prep Tips</h4>
                
                <ul className="space-y-3 text-xs text-slate-400">
                  {detail.preparationTips.map((tip, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start">
                      <CheckCircle2 className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Video resources */}
              <div className={`p-6 rounded-3xl border ${tokens.surface}`}>
                <h4 className={`text-lg font-bold mb-4 ${tokens.textMain}`}>Video led Prep guides</h4>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  {detail.videoResources.map((vid, idx) => (
                    <div key={idx} className={`group rounded-xl border overflow-hidden transition-all ${theme === 'dark' ? 'border-white/5 bg-slate-900/40 hover:bg-slate-900/80' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>
                      <div className="aspect-video relative overflow-hidden bg-slate-800 flex items-center justify-center">
                        <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                        <PlayCircle className="absolute h-10 w-10 text-red-500 opacity-90 transition-transform group-hover:scale-110" />
                        <span className="absolute bottom-2 right-2 bg-black/75 px-1.5 py-0.5 rounded text-[10px] font-bold text-white uppercase">{vid.duration}</span>
                      </div>
                      
                      <div className="p-3">
                        <h5 className="text-[11px] font-bold leading-normal truncate text-slate-300">{vid.title}</h5>
                        <a href={vid.url} target="_blank" rel="noreferrer" className="text-[10px] text-indigo-400 flex items-center gap-1 font-bold mt-2 uppercase tracking-wide">
                          <span>Open Resource</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>
        )}

        {/* 3. STANDARD CAREER DETAILS VIEW */}
        {type === 'career' && (
          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
            {/* Required Skills */}
            <div className={`p-6 rounded-3xl border ${tokens.surface}`}>
              <div className="flex items-center gap-2 mb-4">
                <BriefcaseBusiness className="h-5 w-5 text-indigo-400" />
                <h4 className={`text-lg font-bold ${tokens.textMain}`}>Core Skills Required</h4>
              </div>
              <p className="text-xs text-slate-400 mb-4">These core competencies form the foundation of success in this role:</p>
              <div className="flex flex-wrap gap-2">
                {detail.requiredSkills.map((skill) => (
                  <span key={skill} className={`text-xs font-semibold px-3 py-1.5 rounded-xl ${theme === 'dark' ? 'bg-white/5 border border-white/5 text-slate-300' : 'bg-slate-50 border border-slate-200/50 text-slate-700'}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Colleges */}
            <div className={`p-6 rounded-3xl border ${tokens.surface}`}>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-5 w-5 text-indigo-400" />
                <h4 className={`text-lg font-bold ${tokens.textMain}`}>Top Colleges & Networks</h4>
              </div>
              <p className="text-xs text-slate-400 mb-4">Leading institutes known for curriculum and career placements:</p>
              <ul className="space-y-2 text-xs text-slate-300">
                {detail.colleges.map((college, idx) => (
                  <li key={idx} className="flex gap-2 items-center">
                    <CheckCircle2 className="h-4 w-4 text-indigo-400 shrink-0" />
                    <span>{college}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Scholarships & Entrance Exams */}
            <div className={`p-6 rounded-3xl border ${tokens.surface}`}>
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-5 w-5 text-indigo-400" />
                <h4 className={`text-lg font-bold ${tokens.textMain}`}>Scholarships & Entrance</h4>
              </div>
              <div className="space-y-4 text-xs text-slate-300">
                <div>
                  <strong className="text-slate-400 uppercase text-[10px] tracking-wider block mb-1">Target Entrance Exams</strong>
                  <div className="flex flex-wrap gap-1.5">
                    {detail.entranceExams.map((ex) => (
                      <span key={ex} className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-bold">{ex}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <strong className="text-slate-400 uppercase text-[10px] tracking-wider block mb-1">Scholarship Schemas</strong>
                  <ul className="list-disc pl-4 space-y-1 text-slate-400">
                    {detail.scholarships.slice(0, 2).map((s, idx) => <li key={idx}>{s}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}


        {/* WHY THIS PATH FITS SECTION */}
        <section id="ai-scores" className="grid gap-6 md:grid-cols-2 mb-10">
          
          <div className={`p-6 rounded-3xl border ${tokens.surface}`}>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-indigo-400" />
              <h4 className={`text-lg font-bold ${tokens.textMain}`}>Future scope & trends</h4>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed leading-6 text-slate-400">
              {detail.futureScope}
            </p>
          </div>

          <div className={`p-6 rounded-3xl border flex flex-col justify-between ${tokens.surface}`}>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Star className="h-5 w-5 text-indigo-400" />
                <h4 className={`text-lg font-bold ${tokens.textMain}`}>AI Fit matching score</h4>
              </div>
              
              {/* Progress Bar */}
              <div className="h-3 bg-slate-900/80 rounded-full overflow-hidden border border-white/5 relative mt-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${detail.aiRecommendationScore}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 rounded-full"
                />
              </div>
              
              <div className="flex justify-between items-center text-xs mt-3 text-slate-400">
                <span>Compatibility index</span>
                <span className="font-bold text-indigo-400">{detail.aiRecommendationScore}/100</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-normal mt-5">
              The Fit index evaluates baseline competencies, historical job placements, industry projections, and competitive entry barriers.
            </p>
          </div>

        </section>


        {/* PERSONALIZED AI RECRUITMENT CALLOUT */}
        <div className="rounded-[2rem] border p-6 md:p-8 bg-gradient-to-r from-indigo-600/15 via-purple-600/10 to-indigo-600/5 backdrop-blur-md relative overflow-hidden border-white/10">
          <div className="absolute top-[-50%] right-[-10%] w-[18rem] h-[18rem] bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
            <div>
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Next Phase</span>
              <h3 className={`text-xl sm:text-2xl font-extrabold mt-1 ${tokens.textMain}`}>Personalize Your Career Path with AI Recommendations</h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
                Head back to the Career Explorer dashboard, fill in your specific academic parameters and targets, and get matching reports.
              </p>
            </div>
            
            <Link
              to="/explore#ai-recommendations"
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shrink-0 shadow-lg"
            >
              <span>Launch AI Matcher</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
