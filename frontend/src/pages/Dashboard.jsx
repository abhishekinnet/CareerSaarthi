import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import { 
  Map, 
  Award, 
  Users, 
  FileText, 
  Compass, 
  Clock, 
  Video, 
  TrendingUp, 
  CheckCircle,
  AlertCircle,
  Star
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

export default function Dashboard() {
  const { user, profile } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    resumeScore: 0,
    roadmapCount: 0,
    scholarshipsCount: 0,
  });

  useEffect(() => {
    const fetchDashboardDetails = async () => {
      try {
        const bookingsRes = await api.get('/mentors/bookings');
        if (bookingsRes.data.success) {
          setBookings(bookingsRes.data.bookings);
        }
        
        // Simulating matching scholarship count & previous career roadmaps
        setStats({
          resumeScore: profile?.resumeUrl ? 85 : 0,
          roadmapCount: profile?.interests?.length > 0 ? 3 : 0,
          scholarshipsCount: 4
        });
      } catch (err) {
        console.error('Failed to load dashboard parameters', err);
      }
    };

    if (user) {
      fetchDashboardDetails();
    }
  }, [user, profile]);

  const mockChartData = [
    { name: 'Jan', Score: 55 },
    { name: 'Feb', Score: 62 },
    { name: 'Mar', Score: 70 },
    { name: 'Apr', Score: 68 },
    { name: 'May', Score: 75 },
    { name: 'Jun', Score: stats.resumeScore || 80 },
  ];

  return (
    <div className="page-shell mx-auto max-w-7xl space-y-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="section-chip mb-3 w-fit">
            <Star className="h-3.5 w-3.5 text-accent-cyan" />
            <span>Personal dashboard</span>
          </div>
          <h1 className="text-3xl font-black text-white sm:text-4xl">Hello, {user?.name} 👋</h1>
          <p className="mt-2 text-sm text-slate-400">Here is your career path dashboard update.</p>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300 backdrop-blur-md">
          Role: {user?.role}
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <div className="glass-card p-6 flex items-center space-x-4">
          <div className="bg-primary-500/10 p-3 rounded-xl border border-primary-500/20 text-primary-400">
            <Map className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">Roadmaps Cached</p>
            <p className="text-2xl font-bold text-white mt-1">{stats.roadmapCount}</p>
          </div>
        </div>

        <div className="glass-card p-6 flex items-center space-x-4">
          <div className="bg-accent-purple/10 p-3 rounded-xl border border-accent-purple/20 text-accent-purple">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">Scholarships Found</p>
            <p className="text-2xl font-bold text-white mt-1">{stats.scholarshipsCount}</p>
          </div>
        </div>

        <div className="glass-card p-6 flex items-center space-x-4">
          <div className="bg-accent-cyan/10 p-3 rounded-xl border border-accent-cyan/20 text-accent-cyan">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">Mentor Sessions</p>
            <p className="text-2xl font-bold text-white mt-1">{bookings.length}</p>
          </div>
        </div>

        <div className="glass-card p-6 flex items-center space-x-4">
          <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 text-emerald-400">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">Latest ATS Score</p>
            <p className="text-2xl font-bold text-white mt-1">{stats.resumeScore ? `${stats.resumeScore}%` : 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Graph and Launchpads */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Performance Chart */}
        <div className="glass-card flex flex-col justify-between p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-white">Interview Skill Growth</h2>
              <p className="text-xs text-slate-400">Historical performance metrics score.</p>
            </div>
            <div className="flex items-center space-x-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>+18%</span>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }}
                  labelStyle={{ color: '#94a3b8' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="Score" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Launchpads panel */}
        <div className="glass-card space-y-6 p-6">
          <h2 className="text-lg font-bold text-white">Action Launchpads</h2>
          <div className="space-y-4">
            <Link to="/predict-career" className="flex items-center justify-between p-4 rounded-xl bg-slate-950/40 border border-slate-800/80 hover:border-primary-500/30 transition-all group">
              <div className="flex items-center space-x-3">
                <Compass className="h-5 w-5 text-primary-400" />
                <div>
                  <p className="text-sm font-bold text-slate-200 group-hover:text-white">AI Predictor</p>
                  <p className="text-xs text-slate-500">Run career roadmap recommendations</p>
                </div>
              </div>
              <CheckCircle className="h-4 w-4 text-slate-600 group-hover:text-primary-500 transition-colors" />
            </Link>

            <Link to="/resume-analyzer" className="flex items-center justify-between p-4 rounded-xl bg-slate-950/40 border border-slate-800/80 hover:border-accent-purple/30 transition-all group">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-accent-purple" />
                <div>
                  <p className="text-sm font-bold text-slate-200 group-hover:text-white">Resume Grader</p>
                  <p className="text-xs text-slate-500">Verify ATS keyword mappings</p>
                </div>
              </div>
              <CheckCircle className="h-4 w-4 text-slate-600 group-hover:text-accent-purple transition-colors" />
            </Link>

            <Link to="/mentors" className="flex items-center justify-between p-4 rounded-xl bg-slate-950/40 border border-slate-800/80 hover:border-accent-cyan/30 transition-all group">
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-accent-cyan" />
                <div>
                  <p className="text-sm font-bold text-slate-200 group-hover:text-white">Live Consultation</p>
                  <p className="text-xs text-slate-500">Book professional mock guides</p>
                </div>
              </div>
              <CheckCircle className="h-4 w-4 text-slate-600 group-hover:text-accent-cyan transition-colors" />
            </Link>
          </div>
        </div>
      </div>

      {/* Booked Mentorship Sessions List */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-bold text-white mb-6">Upcoming Scheduled Sessions</h2>
        {bookings.length === 0 ? (
          <div className="text-center py-8 flex flex-col items-center">
            <Clock className="h-10 w-10 text-slate-600 mb-3" />
            <p className="text-slate-400 text-sm">No bookings scheduled yet.</p>
            <Link to="/mentors" className="text-primary-400 hover:text-primary-300 text-xs mt-2 font-semibold transition-colors">
              Schedule session with mentor &rarr;
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800/60 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Mentor</th>
                  <th className="pb-3 font-semibold">Time Slot</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {bookings.map((booking) => (
                  <tr key={booking._id} className="text-slate-300 text-sm">
                    <td className="py-4 font-medium text-white">{booking.mentor?.name || 'Vetted Mentor'}</td>
                    <td className="py-4">{booking.slot}</td>
                    <td className="py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-4">
                      {booking.meetingLink ? (
                        <a 
                          href={booking.meetingLink} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center space-x-1 bg-primary-600 hover:bg-primary-500 text-white font-medium py-1 px-3 rounded-lg text-xs transition-colors"
                        >
                          <Video className="h-3.5 w-3.5" />
                          <span>Join Stream</span>
                        </a>
                      ) : (
                        <span className="text-slate-500 text-xs">Awaiting Confirmation</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
