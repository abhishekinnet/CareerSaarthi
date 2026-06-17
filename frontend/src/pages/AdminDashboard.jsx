import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import { 
  Users, 
  Award, 
  TrendingUp, 
  ShieldCheck, 
  ListOrdered,
  AlertTriangle,
  Server,
  RefreshCw
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Triggering values
  const [updatingUser, setUpdatingUser] = useState(null);

  const fetchAdminDetails = async () => {
    setLoading(true);
    try {
      const statsRes = await api.get('/admin/stats');
      if (statsRes.data.success) {
        setStats(statsRes.data);
      }

      const usersRes = await api.get('/admin/users');
      if (usersRes.data.success) {
        setUsers(usersRes.data.users);
      }

      if (user?.role === 'superadmin') {
        const logsRes = await api.get('/admin/logs');
        if (logsRes.data.success) {
          setLogs(logsRes.data.logs);
        }
      }
    } catch (err) {
      console.error("Admin dashboard data fetch failed: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAdminDetails();
    }
  }, [user]);

  const handleUpdateRole = async (userId, targetRole) => {
    setUpdatingUser(userId);
    try {
      const res = await api.put(`/admin/users/${userId}/role`, { role: targetRole });
      if (res.data.success) {
        // Refresh list
        setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: targetRole } : u));
      }
    } catch (err) {
      console.error("Failed to alter user permission role: ", err);
    } finally {
      setUpdatingUser(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-850 pb-4 space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">System Operations Panel</h1>
          <p className="text-slate-400 text-sm mt-1">Review transaction metrics, user roles, and system health status logs.</p>
        </div>

        <div className="flex bg-slate-950/60 p-1.5 rounded-xl border border-slate-850">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'overview' ? 'bg-primary-600 text-white shadow-glow-primary' : 'text-slate-400 hover:text-white'
            }`}
          >
            Overview & Revenue
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'users' ? 'bg-primary-600 text-white shadow-glow-primary' : 'text-slate-400 hover:text-white'
            }`}
          >
            User Roles
          </button>
          {user?.role === 'superadmin' && (
            <button
              onClick={() => setActiveTab('logs')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'logs' ? 'bg-primary-600 text-white shadow-glow-primary' : 'text-slate-400 hover:text-white'
              }`}
            >
              System Logs
            </button>
          )}
        </div>
      </div>

      {activeTab === 'overview' && stats && (
        <div className="space-y-8">
          {/* Mini Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6 flex items-center space-x-4">
              <div className="bg-primary-500/10 p-3 rounded-xl border border-primary-500/20 text-primary-400">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Total Students</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.stats?.totalStudents}</p>
              </div>
            </div>

            <div className="glass-card p-6 flex items-center space-x-4">
              <div className="bg-accent-purple/10 p-3 rounded-xl border border-accent-purple/20 text-accent-purple">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Approved Mentors</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.stats?.totalMentors}</p>
              </div>
            </div>

            <div className="glass-card p-6 flex items-center space-x-4">
              <div className="bg-accent-cyan/10 p-3 rounded-xl border border-accent-cyan/20 text-accent-cyan">
                <ListOrdered className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Total Bookings</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.stats?.totalBookings}</p>
              </div>
            </div>

            <div className="glass-card p-6 flex items-center space-x-4">
              <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 text-emerald-400">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Total Revenue</p>
                <p className="text-2xl font-bold text-white mt-1">₹{stats.stats?.totalRevenue}</p>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-card p-6">
              <h3 className="text-sm font-bold text-white mb-6">Monthly Revenue Growth (INR)</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.charts?.monthlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                    <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-sm font-bold text-white mb-6">User Acquisition Curves</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats.charts?.userGrowth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                    <Line type="monotone" dataKey="students" stroke="#d946ef" strokeWidth={2} />
                    <Line type="monotone" dataKey="mentors" stroke="#06b6d4" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="glass-card p-6">
          <h2 className="text-lg font-bold text-white mb-6">User Database Management</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800/60 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Name</th>
                  <th className="pb-3 font-semibold">Email</th>
                  <th className="pb-3 font-semibold">Verification Status</th>
                  <th className="pb-3 font-semibold">Current Role</th>
                  <th className="pb-3 font-semibold">Modify Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 text-slate-300 text-sm">
                {users.map((item) => (
                  <tr key={item._id}>
                    <td className="py-4 font-medium text-white">{item.name}</td>
                    <td className="py-4">{item.email}</td>
                    <td className="py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.isVerified ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                      }`}>
                        {item.isVerified ? 'Verified' : 'Pending'}
                      </span>
                    </td>
                    <td className="py-4 capitalize font-semibold">{item.role}</td>
                    <td className="py-4">
                      {user?.role === 'superadmin' ? (
                        <select
                          disabled={updatingUser === item._id}
                          value={item.role}
                          onChange={(e) => handleUpdateRole(item._id, e.target.value)}
                          className="input-field py-1 px-2 text-xs bg-slate-950/60"
                        >
                          <option value="student">Student</option>
                          <option value="mentor">Mentor</option>
                          <option value="admin">Admin</option>
                          <option value="superadmin">Super Admin</option>
                        </select>
                      ) : (
                        <span className="text-slate-500 text-xs">Superadmin access required</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'logs' && user?.role === 'superadmin' && (
        <div className="glass-card p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Server className="h-5 w-5 text-primary-400" />
              <span>Diagnostic Audit Logs</span>
            </h2>
            <button 
              onClick={fetchAdminDetails}
              className="p-2 bg-slate-950/60 border border-slate-850 hover:bg-slate-850 text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>

          <div className="bg-black/40 border border-slate-900 rounded-xl p-4 font-mono text-xs text-slate-400 space-y-3 h-96 overflow-y-auto">
            {logs.map((log, idx) => (
              <div key={idx} className="flex items-start space-x-3">
                <span className="text-slate-600">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                <span className={`font-bold ${
                  log.level === 'ERROR' ? 'text-rose-500' : log.level === 'WARN' ? 'text-amber-500' : 'text-primary-400'
                }`}>
                  {log.level}
                </span>
                <span className="text-slate-300">{log.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
