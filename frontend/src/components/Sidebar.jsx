import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Map, 
  Search, 
  Award, 
  Users, 
  FileText, 
  MessageSquare, 
  BarChart2, 
  ShieldCheck, 
  Settings 
} from 'lucide-react';

export default function Sidebar() {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  const getLinks = () => {
    // Superadmin links
    if (user.role === 'superadmin') {
      return [
        { path: '/admin', name: 'Admin Stats', icon: BarChart2 },
        { path: '/admin/users', name: 'User Control', icon: Users },
        { path: '/admin/logs', name: 'System Logs', icon: ShieldCheck },
      ];
    }

    // Admin links
    if (user.role === 'admin') {
      return [
        { path: '/admin', name: 'Analytics', icon: BarChart2 },
        { path: '/admin/users', name: 'Users List', icon: Users },
      ];
    }

    // Mentor links
    if (user.role === 'mentor') {
      return [
        { path: '/dashboard', name: 'Overview', icon: LayoutDashboard },
        { path: '/dashboard/bookings', name: 'Student Bookings', icon: MessageSquare },
      ];
    }

    // Standard Student links
    return [
      { path: '/dashboard', name: 'Overview', icon: LayoutDashboard },
      { path: '/predict-career', name: 'AI Career Predictor', icon: Map },
      { path: '/explore', name: 'Explore Careers', icon: Search },
      { path: '/scholarships', name: 'Scholarship Portal', icon: Award },
      { path: '/mentors', name: 'Mentor Marketplace', icon: Users },
      { path: '/resume-analyzer', name: 'Interview Prep', icon: FileText },
    ];
  };

  const links = getLinks();

  return (
    <aside className="w-full md:w-64 bg-slate-900/30 backdrop-blur-md border-r border-slate-800/60 p-4 flex flex-col space-y-2">
      <div className="px-3 py-2 mb-6">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Navigation</p>
      </div>

      <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 space-x-2 md:space-x-0 md:space-y-1.5 scrollbar-thin">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              end
              className={({ isActive }) => `
                flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap
                ${isActive 
                  ? 'bg-primary-600/15 border border-primary-500/30 text-white shadow-glow-primary' 
                  : 'text-slate-400 hover:bg-slate-800/30 hover:text-slate-200 border border-transparent'
                }
              `}
            >
              <Icon className="h-4.5 w-4.5" />
              <span>{link.name}</span>
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
}
