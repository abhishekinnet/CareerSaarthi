import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../utils/api';
import { 
  Users, 
  Search, 
  Filter, 
  Star, 
  Clock, 
  X, 
  Calendar,
  Sparkles,
  BookOpen,
  Video,
  Mic,
  MicOff,
  VideoOff,
  MonitorUp,
  Hand,
  FileText,
  Send,
  Download,
  LayoutDashboard,
  ArrowRight,
  ExternalLink,
  Bot,
  Play,
  PenTool,
  DollarSign,
  Activity,
  Check,
  TrendingUp,
  Award,
  Globe,
  Award as AwardIcon,
  ShieldCheck,
  Rocket,
  SunMedium,
  MoonStar,
  Layers,
  Building2
} from 'lucide-react';
import confetti from 'canvas-confetti';

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
  },
};

const mockMentorsList = [
  {
    id: 'm1',
    name: 'Rahul Sharma',
    role: 'Senior Software Engineer',
    company: 'Google',
    experience: '8+ Years',
    rating: 4.9,
    students: '1,200+',
    fee: '₹299',
    languages: 'English, Hindi',
    availability: 'Available Today',
    badges: ['Verified', 'Top Mentor', 'MNC', 'IIT/NIT'],
    academicLevel: 'Graduation',
    stream: 'Engineering',
    sessionType: 'Interview Preparation',
    meetingType: 'Video Call',
    bio: 'IIT Delhi alumnus. Specializes in Algorithms, Data Structures, mock systems interviews, and career roadmaps.',
    slots: ['10:00 AM', '2:00 PM', '6:00 PM']
  },
  {
    id: 'm2',
    name: 'Anjali Gupta',
    role: 'IAS Officer',
    company: 'Ministry of Home Affairs',
    experience: '12+ Years',
    rating: 5.0,
    students: '2,400+',
    fee: '₹0 (Free Govt Consult)',
    languages: 'English, Hindi',
    availability: 'Available Weekend',
    badges: ['Verified', 'Government Officer', 'Premium'],
    academicLevel: 'Post Graduation',
    stream: 'Government Exams',
    sessionType: 'Government Exam Mentorship',
    meetingType: 'Video Call',
    bio: 'Secured Rank 14 in UPSC Civil Services Exam. Guides students on optional selectors, essay structures, and interview drills.',
    slots: ['4:00 PM', '7:00 PM']
  },
  {
    id: 'm3',
    name: 'Dr. Vikram Mehta',
    role: 'Senior Registrar',
    company: 'AIIMS Delhi',
    experience: '10+ Years',
    rating: 4.8,
    students: '850+',
    fee: '₹399',
    languages: 'English, Hindi, Gujarati',
    availability: 'Available Tomorrow',
    badges: ['Verified', 'Premium'],
    academicLevel: 'Graduation',
    stream: 'Medical',
    sessionType: 'Doubt Solving',
    meetingType: 'Audio Call',
    bio: 'Specialist in clinical pathology and NEET UG/PG test-taking psychology. Focuses on critical conceptual problem-solving.',
    slots: ['9:00 AM', '5:00 PM']
  },
  {
    id: 'm4',
    name: 'Priya Nair',
    role: 'Admissions Director',
    company: 'Stanford Admissions Advisor',
    experience: '15+ Years',
    rating: 4.9,
    students: '620+',
    fee: '₹499',
    languages: 'English, Tamil',
    availability: 'Available Weekend',
    badges: ['Verified', 'Top Mentor', 'Premium'],
    academicLevel: 'Post Graduation',
    stream: 'Study Abroad',
    sessionType: 'Study Abroad Guidance',
    meetingType: 'Video Call',
    bio: 'Helped 500+ Indian students draft Statements of Purpose (SOP) and successfully secure fully funded international scholarships.',
    slots: ['11:00 AM', '3:00 PM']
  },
  {
    id: 'm5',
    name: 'Rajesh Iyer',
    role: 'Financial Director',
    company: 'Deloitte',
    experience: '14+ Years',
    rating: 4.7,
    students: '1,100+',
    fee: '₹249',
    languages: 'English, Malayalam',
    availability: 'Available Today',
    badges: ['Verified', 'MNC'],
    academicLevel: 'Class 11-12',
    stream: 'Commerce',
    sessionType: 'Career Guidance',
    meetingType: 'Chat Session',
    bio: 'Expert in financial modeling, Chartered Accountancy (CA) tracking, audit protocols, and post-12th business management paths.',
    slots: ['12:00 PM', '8:00 PM']
  },
  {
    id: 'm6',
    name: 'Arjun Sen',
    role: 'Creative Design Director',
    company: 'Framer / NID Alumnus',
    experience: '7+ Years',
    rating: 4.9,
    students: '980+',
    fee: '₹199',
    languages: 'English, Bengali',
    availability: 'Available Today',
    badges: ['Verified', 'Top Mentor', 'MNC'],
    academicLevel: 'Diploma',
    stream: 'Design',
    sessionType: 'Resume Review',
    meetingType: 'Video Call',
    bio: 'UX/UI designer and design consultant. Focuses on visual design portfolio grades, NID DAT setups, and startup landing pages.',
    slots: ['2:00 PM', '4:00 PM', '6:00 PM']
  }
];

export default function MentorMarketplace() {
  const [theme, setTheme] = useState(() => localStorage.getItem('careerExplorerTheme') || 'light');
  const [activeTab, setActiveTab] = useState('discover'); // discover, bookings, meet, match, prep, dashboards
  const [search, setSearch] = useState('');
  
  // Advanced filters state
  const [filters, setFilters] = useState({
    academicLevel: '',
    stream: '',
    sessionType: '',
    meetingType: '',
    availability: ''
  });

  // AI Matching Engine
  const [aiForm, setAiForm] = useState({
    academicLevel: '',
    stream: '',
    goal: '',
    budget: 500,
    language: 'English',
    interest: ''
  });
  const [aiResults, setAiResults] = useState([]);
  const [aiMatching, setAiMatching] = useState(false);

  // Booking details checkout
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [sessionNotes, setSessionNotes] = useState('');
  const [bookingsList, setBookingsList] = useState([]);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Simulated Google Meet states
  const [meetActive, setMeetActive] = useState(false);
  const [meetMic, setMeetMic] = useState(true);
  const [meetVideo, setMeetVideo] = useState(true);
  const [meetScreenSharing, setMeetScreenSharing] = useState(false);
  const [meetHandRaised, setMeetHandRaised] = useState(false);
  const [meetChatLogs, setMeetChatLogs] = useState([
    { sender: 'System', text: 'Live meeting connection secure. Mentorship session initialized.' }
  ]);
  const [meetChatMsg, setMeetChatMsg] = useState('');
  const [meetSummary, setMeetSummary] = useState('');
  const [meetSummaryLoading, setMeetSummaryLoading] = useState(false);
  
  // Whiteboard drawing states
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    localStorage.setItem('careerExplorerTheme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  const tokens = themeTokens[theme];

  // Dynamic filter query
  const filteredMentors = useMemo(() => {
    return mockMentorsList.filter((m) => {
      if (search) {
        const q = search.toLowerCase();
        const matchText = m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q) || m.company.toLowerCase().includes(q) || m.bio.toLowerCase().includes(q);
        if (!matchText) return false;
      }
      if (filters.academicLevel && m.academicLevel !== filters.academicLevel) return false;
      if (filters.stream && m.stream !== filters.stream) return false;
      if (filters.sessionType && m.sessionType !== filters.sessionType) return false;
      if (filters.meetingType && m.meetingType !== filters.meetingType) return false;
      if (filters.availability && !m.availability.toLowerCase().includes(filters.availability.toLowerCase())) return false;
      return true;
    });
  }, [search, filters]);

  // Booking confirmed handler
  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!selectedSlot) return;

    const newBooking = {
      id: Date.now(),
      mentorName: selectedMentor.name,
      role: selectedMentor.role,
      company: selectedMentor.company,
      slot: selectedSlot,
      notes: sessionNotes,
      status: 'confirmed',
      meetingLink: 'http://localhost:3000/mentors#meet'
    };

    setBookingsList((prev) => [newBooking, ...prev]);
    setBookingSuccess(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.8 }
    });
  };

  // AI Matching execution
  const runAiMatching = (e) => {
    e.preventDefault();
    setAiMatching(true);

    setTimeout(() => {
      // Find matches in mock list based on stream & goal keywords
      const matches = mockMentorsList.map(m => {
        let score = 65;
        if (aiForm.academicLevel === m.academicLevel) score += 10;
        if (aiForm.stream === m.stream) score += 15;
        if (aiForm.goal && m.bio.toLowerCase().includes(aiForm.goal.toLowerCase())) score += 10;
        const feeVal = Number(m.fee.replace(/\D/g, '')) || 0;
        if (feeVal <= aiForm.budget) score += 10;
        
        return {
          ...m,
          matchPercentage: Math.min(score, 98)
        };
      }).sort((a, b) => b.matchPercentage - a.matchPercentage);

      setAiResults(matches.slice(0, 3));
      setAiMatching(false);
    }, 900);
  };

  // Live Chat send message
  const handleMeetSendChat = (e) => {
    e.preventDefault();
    if (!meetChatMsg.trim()) return;

    setMeetChatLogs(prev => [...prev, { sender: 'Student', text: meetChatMsg }]);
    const currentMsg = meetChatMsg;
    setMeetChatMsg('');

    // Simulated mentor responsive text
    setTimeout(() => {
      let mentorReply = "That's a very good point. Remember to study previous year papers and align key keywords in your resume.";
      if (currentMsg.toLowerCase().includes('resume') || currentMsg.toLowerCase().includes('cv')) {
        mentorReply = "For your resume, aim to structure bullets using the Google STAR method: Action, Context, and quantitative Result.";
      } else if (currentMsg.toLowerCase().includes('upsc') || currentMsg.toLowerCase().includes('exam')) {
        mentorReply = "For competitive exams, consistency is everything. Solve mock papers daily under strict time conditions.";
      }
      setMeetChatLogs(prev => [...prev, { sender: 'Mentor (Live)', text: mentorReply }]);
    }, 1100);
  };

  // AI Summary generation
  const generateMeetSummary = () => {
    setMeetSummaryLoading(true);
    setTimeout(() => {
      setMeetSummary(
        `• TOPIC DISCUSSION: Career Path Alignment & Resume keywords analysis.\n• KEY ADVICE: Focus on building core technical skillroadmaps, structural database definitions, and clean UI components.\n• RECOMMENDED NEXT STEP: Practice two mock sessions on MNC Interview Preparation templates and check NSP pre-matric scholarship cutoffs.`
      );
      setMeetSummaryLoading(false);
    }, 1200);
  };

  // Whiteboard drawing event handlers
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#6366f1';
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearWhiteboard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className={`${tokens.shell} transition-colors duration-300 relative`}>
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
        {/* HERO SECTION */}
        <section className={`relative overflow-hidden rounded-[2.5rem] border p-8 md:p-12 backdrop-blur-md text-center max-w-5xl mx-auto space-y-6 transition-all duration-300 ${theme === 'dark' ? 'bg-slate-950/40 border-white/5 shadow-[0_24px_80px_rgba(0,0,0,0.4)]' : 'bg-white/70 border-slate-200/80 shadow-premium'}`}>
          <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] ${theme === 'dark' ? 'border-indigo-500/20 bg-indigo-500/10 text-indigo-300' : 'border-royal/10 bg-royal/5 text-royal'}`}>
            <Sparkles className="h-3.5 w-3.5 text-cyan-500 dark:text-cyan-400 animate-pulse-slow" />
            <span>Premium live consultation ecosystem</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl font-black tracking-tight leading-none ${tokens.textMain}`}>
            Connect With India's <span className={`bg-gradient-to-r bg-clip-text text-transparent ${theme === 'dark' ? 'from-indigo-400 via-purple-400 to-cyan-400' : 'from-royal via-indigo-600 to-cyan-600'}`}>Top Career Mentors</span>
          </h1>
          
          <p className={`max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed ${tokens.muted}`}>
            Book 1-on-1 sessions with Industry Experts, Government Officers, IITians, recruiters, career counselors, and interview specialists. Connect on Google Meet style live classrooms.
          </p>

          {/* Core Analytics Counters */}
          <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-3 pt-2 max-w-2xl mx-auto w-full">
            {[
              { label: 'Verified Experts', val: '80+' },
              { label: 'Completed Consultations', val: '12,500+' },
              { label: 'Average Rating', val: '4.92 / 5.0' },
              { label: 'Hourly Bookings', val: '24/7 Live' }
            ].map((cnt, idx) => (
              <div key={idx} className={`px-4 py-2.5 rounded-2xl border text-center backdrop-blur-md transition-all ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                <span className={`font-bold block text-sm ${theme === 'dark' ? 'text-indigo-400' : 'text-royal'}`}>{cnt.val}</span>
                <span className={`text-[9px] font-bold uppercase mt-0.5 ${theme === 'dark' ? 'text-slate-500' : 'text-slateSecondary'}`}>{cnt.label}</span>
              </div>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 w-full max-w-md mx-auto">
            <button 
              onClick={() => setActiveTab('discover')}
              className="glow-btn-primary w-full sm:w-auto px-6 py-3 text-xs uppercase tracking-wider font-extrabold"
            >
              Book 1-on-1 Session
            </button>
            <button 
              onClick={() => setActiveTab('meet')}
              className="glow-btn-accent w-full sm:w-auto px-6 py-3 text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-1.5"
            >
              <Video className="h-4 w-4" />
              <span>Join Live Meeting Room</span>
            </button>
          </div>
        </section>

        {/* WORKSPACE NAVIGATION BAR */}
        <div className={`flex border-b pb-1 gap-2 overflow-x-auto scrollbar-thin ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
          {[
            { id: 'discover', label: 'Discover Experts', icon: Users },
            { id: 'match', label: 'AI Matcher', icon: Bot },
            { id: 'meet', label: 'Google Meet Live', icon: Video },
            { id: 'prep', label: 'Prep Hub', icon: FileText },
            { id: 'bookings', label: 'Session Board', icon: Calendar },
            { id: 'dashboards', label: 'Analytics Console', icon: LayoutDashboard }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold uppercase tracking-wider shrink-0 transition-all ${activeTab === tab.id ? (theme === 'dark' ? 'bg-indigo-600/10 border-b-2 border-indigo-500 text-indigo-400 font-black' : 'bg-royal/5 border-b-2 border-royal text-royal font-black') : (theme === 'dark' ? 'text-slate-400 hover:text-slate-200' : 'text-slateSecondary hover:text-midnight')}`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* WORKSPACE CONTENT SHEETS */}
        <div className="space-y-8">
          
          {/* TAB 1: DISCOVER & FILTER MENTORS */}
          {activeTab === 'discover' && (
            <div className="space-y-6">
              
              {/* Sticky Filter Bar */}
              <div className={`p-5 rounded-3xl border space-y-4 ${tokens.surface}`}>
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-500" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search experts by name, corporate company, or specialized role..."
                      className={`w-full py-3 pl-11 pr-4 rounded-2xl outline-none text-xs font-bold border ${tokens.input}`}
                    />
                  </div>
                  <button
                    onClick={() => setFilters({ academicLevel: '', stream: '', sessionType: '', meetingType: '', availability: '' })}
                    className="text-xs text-indigo-400 font-bold hover:underline shrink-0"
                  >
                    Reset Filters
                  </button>
                </div>

                <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-5">
                  <div>
                    <label className={`block text-[8px] font-bold uppercase mb-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slateSecondary'}`}>Academic Level</label>
                    <select
                      value={filters.academicLevel}
                      onChange={(e) => setFilters(prev => ({ ...prev, academicLevel: e.target.value }))}
                      className={`w-full p-2 rounded-xl text-[11px] font-semibold transition-all border outline-none ${theme === 'dark' ? 'bg-slate-950 border-white/5 text-slate-300' : 'bg-white border-slate-200 text-midnight focus:border-royal focus:ring-1 focus:ring-royal/20'}`}
                    >
                      <option value="">All Levels</option>
                      <option value="Class 9-10">Class 9-10</option>
                      <option value="Class 11-12">Class 11-12</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Graduation">Graduation (UG)</option>
                      <option value="Post Graduation">Postgrad (PG)</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-[8px] font-bold uppercase mb-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slateSecondary'}`}>Stream/Sector</label>
                    <select
                      value={filters.stream}
                      onChange={(e) => setFilters(prev => ({ ...prev, stream: e.target.value }))}
                      className={`w-full p-2 rounded-xl text-[11px] font-semibold transition-all border outline-none ${theme === 'dark' ? 'bg-slate-950 border-white/5 text-slate-300' : 'bg-white border-slate-200 text-midnight focus:border-royal focus:ring-1 focus:ring-royal/20'}`}
                    >
                      <option value="">All Streams</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Medical">Medical</option>
                      <option value="Commerce">Commerce</option>
                      <option value="Design">Design</option>
                      <option value="Government Exams">Civil Services</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-[8px] font-bold uppercase mb-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slateSecondary'}`}>Session Target</label>
                    <select
                      value={filters.sessionType}
                      onChange={(e) => setFilters(prev => ({ ...prev, sessionType: e.target.value }))}
                      className={`w-full p-2 rounded-xl text-[11px] font-semibold transition-all border outline-none ${theme === 'dark' ? 'bg-slate-950 border-white/5 text-slate-300' : 'bg-white border-slate-200 text-midnight focus:border-royal focus:ring-1 focus:ring-royal/20'}`}
                    >
                      <option value="">All Sessions</option>
                      <option value="Career Guidance">Career Guidance</option>
                      <option value="Interview Preparation">Interview Prep</option>
                      <option value="Government Exam Mentorship">Govt Exam Help</option>
                      <option value="Resume Review">Resume Review</option>
                      <option value="Study Abroad Guidance">Study Abroad</option>
                      <option value="Doubt Solving">Doubt Solving</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-[8px] font-bold uppercase mb-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slateSecondary'}`}>Session Type</label>
                    <select
                      value={filters.meetingType}
                      onChange={(e) => setFilters(prev => ({ ...prev, meetingType: e.target.value }))}
                      className={`w-full p-2 rounded-xl text-[11px] font-semibold transition-all border outline-none ${theme === 'dark' ? 'bg-slate-950 border-white/5 text-slate-300' : 'bg-white border-slate-200 text-midnight focus:border-royal focus:ring-1 focus:ring-royal/20'}`}
                    >
                      <option value="">All Types</option>
                      <option value="Video Call">Video Call</option>
                      <option value="Audio Call">Audio Call</option>
                      <option value="Chat Session">Chat Session</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-[8px] font-bold uppercase mb-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slateSecondary'}`}>Availability</label>
                    <select
                      value={filters.availability}
                      onChange={(e) => setFilters(prev => ({ ...prev, availability: e.target.value }))}
                      className={`w-full p-2 rounded-xl text-[11px] font-semibold transition-all border outline-none ${theme === 'dark' ? 'bg-slate-950 border-white/5 text-slate-300' : 'bg-white border-slate-200 text-midnight focus:border-royal focus:ring-1 focus:ring-royal/20'}`}
                    >
                      <option value="">Any Time</option>
                      <option value="Today">Today Only</option>
                      <option value="Tomorrow">Tomorrow</option>
                      <option value="Weekend">Weekend</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Mentor Cards Grid */}
              {filteredMentors.length === 0 ? (
                <div className={`p-12 text-center rounded-3xl border border-dashed text-slate-500 font-semibold ${tokens.surface}`}>
                  No verified mentors found matching your selected criteria.
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredMentors.map((m) => (
                    <div
                      key={m.id}
                      className={`rounded-3xl border p-6 flex flex-col justify-between ${tokens.surface} ${tokens.cardHover}`}
                    >
                      <div>
                        {/* Badging row */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {m.badges.map((b, idx) => (
                            <span 
                              key={idx} 
                              className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border ${b === 'Verified' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' : b === 'Government Officer' ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20' : b === 'Top Mentor' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20' : (theme === 'dark' ? 'bg-slate-950/60 text-slate-300 border-white/5' : 'bg-slate-100 text-slateSecondary border-slate-200')}`}
                            >
                              {b}
                            </span>
                          ))}
                        </div>

                        {/* Profile header */}
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 font-black text-lg flex items-center justify-center uppercase">
                            {m.name[0]}
                          </div>
                          <div>
                            <h3 className={`text-base font-black ${tokens.textMain}`}>{m.name}</h3>
                            <p className="text-xs text-slate-400">{m.role} @ <strong className={`font-semibold ${theme === 'dark' ? 'text-indigo-300' : 'text-royal'}`}>{m.company}</strong></p>
                          </div>
                        </div>

                        <p className={`text-xs mt-4 leading-relaxed line-clamp-3 ${tokens.muted}`}>{m.bio}</p>

                        {/* Expert stats */}
                        <div className={`grid grid-cols-2 gap-2 mt-4 pt-3 border-t text-xs ${theme === 'dark' ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slateSecondary'}`}>
                          <div>⭐ {m.rating} Rating</div>
                          <div>🎓 {m.students} Students</div>
                        </div>

                        <div className={`mt-3 text-[10px] ${theme === 'dark' ? 'text-slate-500' : 'text-slateSecondary'}`}>
                          🗣 Languages: <strong className={theme === 'dark' ? 'text-slate-300' : 'text-midnight'}>{m.languages}</strong>
                        </div>
                      </div>

                      {/* Checkout block */}
                      <div className={`mt-6 pt-4 border-t flex items-center justify-between ${theme === 'dark' ? 'border-slate-800' : 'border-slate-100'}`}>
                        <div>
                          <span className={`text-[9px] font-bold uppercase block ${theme === 'dark' ? 'text-slate-500' : 'text-slateSecondary'}`}>Hourly Fee</span>
                          <span className={`text-base font-black ${tokens.textMain}`}>{m.fee}</span>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedMentor(m);
                            setSelectedSlot('');
                            setSessionNotes('');
                            setBookingSuccess(false);
                          }}
                          className="glow-btn-primary px-4 py-2.5 text-xs uppercase tracking-wider font-extrabold"
                        >
                          Book Slot
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

          {/* TAB 2: AI MATCHING ENGINE */}
          {activeTab === 'match' && (
            <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] items-start max-w-5xl mx-auto">
              
              {/* Form card */}
              <form onSubmit={runAiMatching} className={`p-6 rounded-3xl border space-y-5 ${tokens.surface}`}>
                <div className="space-y-1">
                  <h3 className={`text-lg font-black ${tokens.textMain} flex items-center gap-1.5`}>
                    <Bot className="h-5 w-5 text-indigo-400" />
                    <span>AI Consultation Matcher</span>
                  </h3>
                  <p className="text-xs text-slate-500">Submit parameters to query top mentor fits.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className={`block text-[10px] font-bold uppercase mb-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slateSecondary'}`}>Your Academic Level</label>
                    <select
                      value={aiForm.academicLevel}
                      onChange={(e) => setAiForm(prev => ({ ...prev, academicLevel: e.target.value }))}
                      className={`w-full p-2.5 rounded-xl text-xs font-bold transition-all border outline-none ${tokens.input}`}
                    >
                      <option value="">Select Level</option>
                      <option value="Graduation">Graduation (UG)</option>
                      <option value="Post Graduation">Post Graduation (PG)</option>
                      <option value="Class 11-12">Class 11-12</option>
                      <option value="Diploma">Diploma</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-[10px] font-bold uppercase mb-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slateSecondary'}`}>Stream Field</label>
                    <select
                      value={aiForm.stream}
                      onChange={(e) => setAiForm(prev => ({ ...prev, stream: e.target.value }))}
                      className={`w-full p-2.5 rounded-xl text-xs font-bold transition-all border outline-none ${tokens.input}`}
                    >
                      <option value="">Select Stream</option>
                      <option value="Engineering">Engineering & Coding</option>
                      <option value="Government Exams">Civil Services</option>
                      <option value="Medical">Medical Science</option>
                      <option value="Commerce">Commerce & Audit</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-[10px] font-bold uppercase mb-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slateSecondary'}`}>Consultation Goal</label>
                    <input
                      type="text"
                      value={aiForm.goal}
                      onChange={(e) => setAiForm(prev => ({ ...prev, goal: e.target.value }))}
                      placeholder="e.g., mock interview, UPSC strategy, admissions advice"
                      className={`w-full p-2.5 rounded-xl text-xs font-bold transition-all border outline-none ${tokens.input}`}
                    />
                  </div>

                  <div>
                    <div className={`flex justify-between text-[10px] font-bold uppercase mb-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slateSecondary'}`}>
                      <span>Budget Limit</span>
                      <span className={theme === 'dark' ? 'text-indigo-400' : 'text-royal font-bold'}>₹{aiForm.budget}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="50"
                      value={aiForm.budget}
                      onChange={(e) => setAiForm(prev => ({ ...prev, budget: Number(e.target.value) }))}
                      className={`w-full accent-indigo-500 ${theme === 'dark' ? 'accent-indigo-500' : 'accent-royal'}`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={aiMatching}
                    className="w-full glow-btn-primary py-3 text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-1.5"
                  >
                    {aiMatching ? (
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 text-cyan-300" />
                        <span>Query Best Matches</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Match Results list */}
              <div className="space-y-4">
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-500">Top Recommendations</h4>
                
                {aiResults.length === 0 ? (
                  <div className={`p-10 text-center rounded-3xl border border-dashed text-slate-500 font-semibold ${tokens.surface}`}>
                    Fill out the matcher form to search top matches.
                  </div>
                ) : (
                  aiResults.map((match) => (
                    <motion.div
                      key={match.id}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${tokens.surface}`}
                    >
                      <div className="space-y-2 flex-grow text-left">
                        <div className="flex items-center gap-2">
                          <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded border ${theme === 'dark' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20'}`}>
                            {match.matchPercentage}% Match Score
                          </span>
                          <span className={`text-[10px] font-bold uppercase ${theme === 'dark' ? 'text-slate-500' : 'text-slateSecondary'}`}>{match.company}</span>
                        </div>
                        <h4 className={`text-base font-black ${tokens.textMain}`}>{match.name}</h4>
                        <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slateSecondary'}`}>{match.role}</p>
                        <p className={`text-[11px] leading-normal ${theme === 'dark' ? 'text-slate-500' : 'text-slateSecondary'}`}>{match.bio}</p>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedMentor(match);
                          setSelectedSlot('');
                          setSessionNotes('');
                          setBookingSuccess(false);
                        }}
                        className="glow-btn-primary py-2.5 px-4 text-xs font-bold uppercase tracking-wider shrink-0"
                      >
                        Book
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

            </div>
          )}

          {/* TAB 3: GOOGLE MEET SIMULATION */}
          {activeTab === 'meet' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              
              {!meetActive ? (
                <div className={`p-10 rounded-[2rem] border text-center space-y-6 max-w-lg mx-auto ${tokens.surface}`}>
                  <div className="h-14 w-14 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center mx-auto">
                    <Video className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className={`text-xl font-black ${tokens.textMain}`}>Live Google Meet Virtual Room</h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      Enter the video room to participate in screen sharing, write on the drawing whiteboard, chat with live mentors, and retrieve AI summaries.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setMeetActive(true);
                      setMeetChatLogs([
                        { sender: 'System', text: 'Live meeting connection secure. Mentorship session initialized.' }
                      ]);
                    }}
                    className="glow-btn-primary px-8 py-3 text-xs uppercase tracking-wider font-extrabold"
                  >
                    Enter Live Consultation Room
                  </button>
                </div>
              ) : (
                <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
                  
                  {/* Left Column: Camera Panels & whiteboard */}
                  <div className="space-y-6">
                    
                    {/* Simulated Camera Feeds */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      {/* Panel 1: Mentor Feed */}
                      <div className="relative h-60 rounded-3xl bg-slate-950 overflow-hidden border border-white/10 flex items-center justify-center">
                        {meetVideo ? (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950 to-slate-950 text-center">
                            <Users className="h-10 w-10 text-indigo-400 animate-pulse-slow mb-2" />
                            <span className="text-xs font-bold text-slate-200">Rahul Sharma (Mentor)</span>
                            <span className="text-[10px] text-emerald-400 font-bold mt-1 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Active Feed</span>
                          </div>
                        ) : (
                          <div className="text-slate-500 text-xs flex flex-col items-center gap-2">
                            <VideoOff className="h-8 w-8" />
                            <span>Mentor camera turned off</span>
                          </div>
                        )}
                        <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-white uppercase">Mentor</span>
                      </div>

                      {/* Panel 2: Student Screen / Camera */}
                      <div className="relative h-60 rounded-3xl bg-slate-950 overflow-hidden border border-white/10 flex items-center justify-center">
                        {meetScreenSharing ? (
                          <div className="absolute inset-0 bg-slate-900 p-4 text-left flex flex-col justify-between">
                            <div className="space-y-2">
                              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block">Screen Sharing Active</span>
                              <p className="text-xs font-bold text-white">Resume_Grader_v1.pdf</p>
                              <div className="h-1 bg-indigo-500 rounded-full w-3/4 animate-pulse" />
                            </div>
                            <div className="border border-white/5 rounded-xl p-2.5 bg-black/40 text-[10px] text-slate-400">
                              Displaying technical project bullets and internship certifications summary.
                            </div>
                          </div>
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950">
                            <div className="h-16 w-16 rounded-full bg-indigo-500/15 border border-indigo-500/20 text-indigo-400 font-extrabold text-xl flex items-center justify-center">
                              ST
                            </div>
                            <span className="text-xs font-bold text-slate-300 mt-3">You (Student)</span>
                          </div>
                        )}
                        <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-white uppercase">Student Feed</span>
                      </div>
                    </div>

                    {/* Google Meet bottom action panel */}
                    <div className={`p-4 rounded-2xl border flex flex-wrap justify-between items-center gap-3 ${tokens.surface}`}>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setMeetMic(!meetMic)}
                          className={`p-3 rounded-xl border transition-colors ${meetMic ? (theme === 'dark' ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-royal text-white border-royal') : 'bg-red-500/15 border-red-500/20 text-red-500'}`}
                        >
                          {meetMic ? <Mic className="h-4.5 w-4.5" /> : <MicOff className="h-4.5 w-4.5" />}
                        </button>
                        <button
                          onClick={() => setMeetVideo(!meetVideo)}
                          className={`p-3 rounded-xl border transition-colors ${meetVideo ? (theme === 'dark' ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-royal text-white border-royal') : 'bg-red-500/15 border-red-500/20 text-red-500'}`}
                        >
                          {meetVideo ? <Video className="h-4.5 w-4.5" /> : <VideoOff className="h-4.5 w-4.5" />}
                        </button>
                        <button
                          onClick={() => setMeetScreenSharing(!meetScreenSharing)}
                          className={`p-3 rounded-xl border transition-colors ${meetScreenSharing ? 'bg-emerald-500 text-white border-emerald-500' : (theme === 'dark' ? 'bg-slate-800 border-white/5 text-slate-300' : 'bg-slate-100 border-slate-200 text-slateSecondary hover:bg-slate-200')}`}
                        >
                          <MonitorUp className="h-4.5 w-4.5" />
                        </button>
                        <button
                          onClick={() => setMeetHandRaised(!meetHandRaised)}
                          className={`p-3 rounded-xl border transition-colors ${meetHandRaised ? 'bg-purple-500 border-purple-500 text-white animate-bounce' : (theme === 'dark' ? 'bg-slate-800 border-white/5 text-slate-300' : 'bg-slate-100 border-slate-200 text-slateSecondary hover:bg-slate-200')}`}
                        >
                          <Hand className="h-4.5 w-4.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => setMeetActive(false)}
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                      >
                        Disconnect Session
                      </button>
                    </div>

                    {/* Collaborative Canvas Whiteboard */}
                    <div className={`p-5 rounded-3xl border space-y-3 ${tokens.surface}`}>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                          <PenTool className="h-4.5 w-4.5 text-indigo-400" />
                          <span>Interactive Drawing Whiteboard</span>
                        </span>
                        <button
                          onClick={clearWhiteboard}
                          className="text-[10px] text-indigo-400 font-bold hover:underline"
                        >
                          Clear Board
                        </button>
                      </div>

                      <canvas
                        ref={canvasRef}
                        width={600}
                        height={240}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        className={`w-full border rounded-2xl cursor-crosshair touch-none transition-all ${theme === 'dark' ? 'bg-slate-950/80 border-white/10' : 'bg-slate-50 border-slate-200'}`}
                      />
                    </div>

                  </div>

                  {/* Right Column: Chat Logs & AI summaries */}
                  <div className="space-y-6">
                    
                    {/* Live chat block */}
                    <div className={`p-5 rounded-3xl border flex flex-col justify-between h-[18rem] ${tokens.surface}`}>
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-3">Live Chat Session</span>
                        <div className="h-44 overflow-y-auto space-y-2 text-xs scrollbar-thin">
                          {meetChatLogs.map((chat, idx) => (
                            <div key={idx} className="space-y-0.5">
                              <span className="text-[9px] text-slate-500 font-bold uppercase block">{chat.sender}</span>
                              <p className={`p-2 rounded-xl inline-block max-w-[90%] ${chat.sender === 'Student' ? (theme === 'dark' ? 'bg-indigo-600 text-white' : 'bg-royal text-white') : (theme === 'dark' ? 'bg-slate-950/60 text-slate-300' : 'bg-slate-100 border border-slate-200/50 text-midnight')}`}>
                                {chat.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <form onSubmit={handleMeetSendChat} className={`flex gap-2 pt-2 border-t ${theme === 'dark' ? 'border-white/5' : 'border-slate-200'}`}>
                        <input
                          type="text"
                          value={meetChatMsg}
                          onChange={(e) => setMeetChatMsg(e.target.value)}
                          placeholder="Send message to mentor..."
                          className={`flex-grow p-2.5 rounded-xl text-xs outline-none border transition-all ${tokens.input}`}
                        />
                        <button type="submit" className="p-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
                          <Send className="h-4 w-4" />
                        </button>
                      </form>
                    </div>

                    {/* AI Notes summary card */}
                    <div className={`p-5 rounded-3xl border space-y-4 ${tokens.surface}`}>
                      <div>
                        <h5 className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1">
                          <Bot className="h-4 w-4 text-indigo-400" />
                          <span>AI Meeting summary generator</span>
                        </h5>
                        <p className="text-[10px] text-slate-500 mt-1">Produce structured post-meeting roadmaps and guidelines.</p>
                      </div>

                      {meetSummary ? (
                        <div className={`p-4 rounded-xl text-xs space-y-2 whitespace-pre-line leading-relaxed border ${theme === 'dark' ? 'bg-indigo-500/5 border-indigo-500/10 text-slate-300' : 'bg-royal/5 border-royal/10 text-midnight'}`}>
                          {meetSummary}
                        </div>
                      ) : (
                        <button
                          onClick={generateMeetSummary}
                          disabled={meetSummaryLoading}
                          className="w-full glow-btn-primary py-2.5 text-xs font-bold uppercase tracking-wider"
                        >
                          {meetSummaryLoading ? 'Formulating summary...' : 'Generate AI Session Notes'}
                        </button>
                      )}
                    </div>

                  </div>

                </div>
              )}

            </div>
          )}

          {/* TAB 4: INTERVIEW PREP & GUIDANCE HUB */}
          {activeTab === 'prep' && (
            <div className="space-y-8 max-w-5xl mx-auto">
              
              {/* MNC & Government Grid */}
              <div className="grid gap-6 md:grid-cols-2">
                
                {/* MNC Prep */}
                <div className={`p-6 rounded-3xl border space-y-4 ${tokens.surface}`}>
                  <h3 className={`text-lg font-black flex items-center gap-2 ${tokens.textMain}`}>
                    <Building2 className={`h-5 w-5 ${theme === 'dark' ? 'text-indigo-400' : 'text-royal'}`} />
                    <span>MNC Interviews Preparation</span>
                  </h3>
                  <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slateSecondary'}`}>Target structured syllabus, rounds patterns, and previous questions for technology organizations:</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {['Google', 'Microsoft', 'Amazon', 'Accenture', 'Infosys', 'TCS', 'Wipro', 'Capgemini'].map((corp) => (
                      <button
                        key={corp}
                        onClick={() => {
                          setSearch(corp);
                          setActiveTab('discover');
                        }}
                        className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${theme === 'dark' ? 'border-white/5 bg-slate-950/40 hover:border-indigo-500/25 hover:bg-slate-900 text-slate-300' : 'border-slate-200 bg-white hover:border-royal/20 hover:bg-slate-50 text-midnight'}`}
                      >
                        <span>{corp} Guide</span>
                        <ArrowRight className="h-3.5 w-3.5 text-slate-500" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Government Prep */}
                <div className={`p-6 rounded-3xl border space-y-4 ${tokens.surface}`}>
                  <h3 className={`text-lg font-black flex items-center gap-2 ${tokens.textMain}`}>
                    <ShieldCheck className={`h-5 w-5 ${theme === 'dark' ? 'text-purple-400' : 'text-royal'}`} />
                    <span>Government Exam Guides</span>
                  </h3>
                  <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slateSecondary'}`}>Study optional roadmaps, previous mock patterns, and interview question pools:</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {['UPSC Civil', 'SSC CGL', 'Banking PO', 'Railway NTPC', 'Defence NDA', 'State PSC', 'Judiciary', 'Teaching TET'].map((gov) => (
                      <button
                        key={gov}
                        onClick={() => {
                          setSearch('Government');
                          setActiveTab('discover');
                        }}
                        className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${theme === 'dark' ? 'border-white/5 bg-slate-950/40 hover:border-purple-500/25 hover:bg-slate-900 text-slate-300' : 'border-slate-200 bg-white hover:border-royal/20 hover:bg-slate-50 text-midnight'}`}
                      >
                        <span>{gov}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-slate-500" />
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Counselling & Scholarships support hubs */}
              <div className="grid gap-6 md:grid-cols-2">
                
                {/* Career counseling card */}
                <div className={`p-6 rounded-3xl border space-y-4 ${tokens.surface}`}>
                  <h4 className={`text-sm font-extrabold uppercase tracking-wider flex items-center gap-1.5 ${theme === 'dark' ? 'text-indigo-400' : 'text-royal'}`}>
                    <BookOpen className="h-5 w-5" />
                    <span>Academic Career Guidance</span>
                  </h4>
                  <ul className={`text-xs space-y-2 list-disc pl-4 leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slateSecondary'}`}>
                    <li><strong>Class 10 Stream Selection:</strong> Taught by counselors to choose Science vs Commerce.</li>
                    <li><strong>Degree Selection:</strong> College mapping databases matching rank capabilities.</li>
                    <li><strong>Higher Studies & Abroad:</strong> SOP assistance, LOR grading, and admissions.</li>
                  </ul>
                </div>

                {/* Scholarship consult hub */}
                <div className={`p-6 rounded-3xl border space-y-4 ${tokens.surface}`}>
                  <h4 className={`text-sm font-extrabold uppercase tracking-wider flex items-center gap-1.5 ${theme === 'dark' ? 'text-purple-400' : 'text-royal'}`}>
                    <AwardIcon className="h-5 w-5" />
                    <span>Scholarship Consultation Hub</span>
                  </h4>
                  <ul className={`text-xs space-y-2 list-disc pl-4 leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slateSecondary'}`}>
                    <li><strong>Government & NSP:</strong> Guidelines on caste allowances and Pragati merit forms.</li>
                    <li><strong>Private Trusts:</strong> Direct application templates for Reliance, Tata, Siemens.</li>
                    <li><strong>Education Loans:</strong> Interest subsidy models matching PM Vidya Lakshmi criteria.</li>
                  </ul>
                </div>

              </div>

            </div>
          )}

          {/* TAB 5: STUDENT SESSION BOARD */}
          {activeTab === 'bookings' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              
              {/* Upcoming sessions listing */}
              <div className={`p-6 rounded-3xl border ${tokens.surface}`}>
                <h3 className={`text-lg font-black mb-4 ${tokens.textMain}`}>My Booked Sessions (Google Calendar Grid)</h3>
                
                {bookingsList.length === 0 ? (
                  <div className="text-center py-10 flex flex-col items-center gap-3">
                    <Calendar className="h-10 w-10 text-slate-600" />
                    <p className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-500' : 'text-slateSecondary'}`}>No Live consultation bookings registered yet.</p>
                    <button
                      onClick={() => setActiveTab('discover')}
                      className={`text-xs font-bold underline ${theme === 'dark' ? 'text-indigo-400 hover:text-indigo-300' : 'text-royal hover:text-royal/80'}`}
                    >
                      Search experts & book session &rarr;
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {bookingsList.map((bk) => (
                      <div key={bk.id} className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${theme === 'dark' ? 'bg-slate-950/40 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border ${theme === 'dark' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25' : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'}`}>
                              {bk.status}
                            </span>
                            <span className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-500' : 'text-slateSecondary'}`}>{bk.slot}</span>
                          </div>
                          <h4 className={`text-sm font-bold ${tokens.textMain}`}>{bk.mentorName}</h4>
                          <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slateSecondary'}`}>{bk.role} @ {bk.company}</p>
                          {bk.notes && <p className={`text-[11px] italic mt-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slateSecondary'}`}>Notes: "{bk.notes}"</p>}
                        </div>

                        <button
                          onClick={() => setActiveTab('meet')}
                          className="glow-btn-accent py-2 px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0"
                        >
                          <Video className="h-4 w-4" />
                          <span>Join Live Room</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 6: ANALYTICS DASHBOARDS */}
          {activeTab === 'dashboards' && (
            <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
              
              {/* Mentor Analytics Console */}
              <div className={`p-6 rounded-3xl border space-y-4 ${tokens.surface}`}>
                <h3 className={`text-base font-black flex items-center gap-2 uppercase tracking-widest ${tokens.textMain}`}>
                  <LayoutDashboard className={`h-5 w-5 ${theme === 'dark' ? 'text-indigo-400' : 'text-royal'}`} />
                  <span>Mentor Analytics Console</span>
                </h3>
                <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slateSecondary'}`}>Visitor counters and hourly payouts YoY logs:</p>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Total Earnings', val: '₹42,500' },
                    { label: 'Sessions Completed', val: '125' },
                    { label: 'Student Ratings', val: '4.96' },
                    { label: 'Profile Visitors', val: '2.8K' }
                  ].map((stat, sIdx) => (
                    <div key={sIdx} className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-950/40 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                      <span className={`text-2xl font-black ${tokens.textMain}`}>{stat.val}</span>
                      <span className={`text-[9px] font-bold uppercase block mt-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slateSecondary'}`}>{stat.label}</span>
                    </div>
                  ))}
                </div>

                {/* SVG Earnings Trends */}
                <div className="pt-4 space-y-2">
                  <span className={`text-[10px] uppercase font-bold block ${theme === 'dark' ? 'text-slate-500' : 'text-slateSecondary'}`}>Earnings Growth</span>
                  <div className="h-16 w-full flex items-end justify-between relative px-2">
                    <div className={`absolute inset-x-0 top-0 border-t pointer-events-none ${theme === 'dark' ? 'border-white/5' : 'border-slate-200'}`} />
                    <div className={`absolute inset-x-0 top-1/2 border-t pointer-events-none ${theme === 'dark' ? 'border-white/5' : 'border-slate-200'}`} />
                    {[
                      { label: 'Q1', val: 'h-6' },
                      { label: 'Q2', val: 'h-10' },
                      { label: 'Q3', val: 'h-12' },
                      { label: 'Q4', val: 'h-16' }
                    ].map((pt, i) => (
                      <div key={i} className="flex flex-col items-center gap-1 z-10">
                        <div className={`w-8 rounded-t border-t ${theme === 'dark' ? 'bg-indigo-500/40 border-indigo-400' : 'bg-royal/40 border-royal'} ${pt.val}`} />
                        <span className={`text-[9px] font-extrabold ${theme === 'dark' ? 'text-slate-500' : 'text-slateSecondary'}`}>{pt.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Student Career Console */}
              <div className={`p-6 rounded-3xl border space-y-4 ${tokens.surface}`}>
                <h3 className={`text-base font-black flex items-center gap-2 uppercase tracking-widest ${tokens.textMain}`}>
                  <Users className={`h-5 w-5 ${theme === 'dark' ? 'text-purple-400' : 'text-royal'}`} />
                  <span>Student Workspace Console</span>
                </h3>
                <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slateSecondary'}`}>Verify certifications and active roadmaps tracking:</p>

                <ul className="text-xs space-y-3">
                  <li className={`flex items-center justify-between p-3 rounded-xl border ${theme === 'dark' ? 'bg-slate-950/40 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                    <div>
                      <strong className={`block ${tokens.textMain}`}>IIT Entrance prep course certificate</strong>
                      <span className={`text-[10px] ${theme === 'dark' ? 'text-slate-500' : 'text-slateSecondary'}`}>Issued by Senior Guide Rahul Sharma</span>
                    </div>
                    <button className={`font-bold hover:underline text-[10px] flex items-center gap-1 ${theme === 'dark' ? 'text-indigo-400' : 'text-royal'}`}>
                      <Download className="h-3.5 w-3.5" />
                      <span>PDF</span>
                    </button>
                  </li>
                  <li className={`flex items-center justify-between p-3 rounded-xl border ${theme === 'dark' ? 'bg-slate-950/40 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                    <div>
                      <strong className={`block ${tokens.textMain}`}>Active Path: B.Tech CSE &rarr; Devops Trainee</strong>
                      <span className={`text-[10px] ${theme === 'dark' ? 'text-slate-500' : 'text-slateSecondary'}`}>Guided milestone pathing tracking</span>
                    </div>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Progress 45%</span>
                  </li>
                </ul>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* SLOT BOOKING CHECKOUT MODAL */}
      <AnimatePresence>
        {selectedMentor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-lg rounded-3xl border p-6 relative backdrop-blur-2xl ${theme === 'dark' ? 'bg-slate-950/95 border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.85)]' : 'bg-white/95 border-slate-200 shadow-[0_30px_60px_rgba(15,23,42,0.18)]'}`}
            >
              <button 
                onClick={() => setSelectedMentor(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {bookingSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="h-12 w-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <Sparkles className="h-6 w-6 animate-pulse-slow" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-midnight'}`}>Consultation Booked Successfully!</h3>
                    <p className={`text-xs mt-2 max-w-xs mx-auto ${theme === 'dark' ? 'text-slate-400' : 'text-slateSecondary'}`}>
                      Payment checkout details saved. We synchronized the slots with your Google Calendar dashboard.
                    </p>
                  </div>
                  <div className="flex justify-center gap-3 pt-4">
                    <button
                      onClick={() => {
                        setSelectedMentor(null);
                        setActiveTab('bookings');
                      }}
                      className="glow-btn-primary px-6 py-2.5 text-xs font-bold uppercase tracking-wider"
                    >
                      View Calendar slots
                    </button>
                    <button
                      onClick={() => setSelectedMentor(null)}
                      className={`px-5 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-colors ${tokens.navInactive}`}
                    >
                      Back to marketplace
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleConfirmBooking} className="space-y-5">
                  <div>
                    <h3 className="text-lg font-black text-white">Book Live consultation Slot</h3>
                    <p className="text-xs text-slate-400 mt-1">Review the mentor slots and checkout session parameters.</p>
                  </div>

                  <div className={`p-4 border rounded-2xl flex items-center gap-3 ${theme === 'dark' ? 'border-white/5 bg-slate-950/40' : 'border-slate-200 bg-slate-50'}`}>
                    <div className="h-10 w-10 bg-indigo-600/10 border border-indigo-500/20 rounded-xl text-indigo-400 font-bold text-sm flex items-center justify-center">
                      {selectedMentor.name[0]}
                    </div>
                    <div>
                      <h4 className={`font-bold text-sm ${theme === 'dark' ? 'text-white' : 'text-midnight'}`}>{selectedMentor.name}</h4>
                      <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slateSecondary'}`}>{selectedMentor.role} @ {selectedMentor.company}</p>
                    </div>
                  </div>

                  {/* Google Calendar slot selection grid */}
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${theme === 'dark' ? 'text-slate-500' : 'text-slateSecondary'}`}>Google Calendar Slot Selectors</label>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedMentor.slots.map((sl) => (
                        <button
                          key={sl}
                          type="button"
                          onClick={() => setSelectedSlot(sl)}
                          className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${selectedSlot === sl ? (theme === 'dark' ? 'bg-indigo-600/15 border-indigo-500 text-indigo-300' : 'bg-royal/10 border-royal text-royal') : (theme === 'dark' ? 'bg-slate-950 border-white/5 text-slate-400 hover:border-slate-700' : 'bg-white border-slate-200 text-slateSecondary hover:border-slate-300')}`}
                        >
                          {sl}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${theme === 'dark' ? 'text-slate-500' : 'text-slateSecondary'}`}>Consultation Notes (Optional)</label>
                    <textarea
                      rows={2}
                      value={sessionNotes}
                      onChange={(e) => setSessionNotes(e.target.value)}
                      placeholder="Add details (e.g. doubt queries, resume audit, entrance roadmaps advice)..."
                      className={`w-full p-3 rounded-2xl text-xs outline-none border transition-all ${tokens.input}`}
                    />
                  </div>

                  <div className={`pt-4 border-t flex items-center justify-between ${theme === 'dark' ? 'border-slate-500/10' : 'border-slate-200'}`}>
                    <div>
                      <span className={`text-[9px] font-semibold uppercase block ${theme === 'dark' ? 'text-slate-500' : 'text-slateSecondary'}`}>Total Payout</span>
                      <span className={`text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-midnight'}`}>{selectedMentor.fee}</span>
                    </div>

                    <button
                      type="submit"
                      disabled={!selectedSlot}
                      className="glow-btn-accent py-2.5 px-5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 disabled:opacity-50"
                    >
                      <Calendar className="h-4 w-4" />
                      <span>Confirm Live Session</span>
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
