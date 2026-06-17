import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { GraduationCap, LogOut, Menu, X, Grid, Sparkles, ChevronRight } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/explore', label: 'Explorer' },
  { to: '/scholarships', label: 'Scholarships' },
  { to: '/mentors', label: 'Mentors' },
];

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/75 dark:border-white/10 dark:bg-[#080C16]/80 backdrop-blur-2xl transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link to="/" className="group flex items-center gap-3">
            <div className="relative rounded-2xl border border-slate-200 bg-white/90 dark:border-white/10 dark:bg-white/5 p-2.5 shadow-premium dark:shadow-glass transition-transform duration-300 group-hover:scale-105">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-royal/10 to-accent-purple/5 dark:from-primary-500/20 dark:to-accent-purple/10" />
              <GraduationCap className="relative h-6 w-6 text-royal dark:text-white" />
            </div>
            <div>
              <span className="block text-lg font-extrabold tracking-tight text-midnight dark:text-white font-clash">CareerSaathi</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slateSecondary dark:text-slate-400">AI Career Intelligence</span>
            </div>
          </Link>

          <div className="hidden items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50/60 dark:border-white/10 dark:bg-white/5 px-2 py-2 shadow-premium dark:shadow-glass md:flex">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} className="nav-link font-satoshi font-semibold">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <>
                <Link
                  to={user.role === 'admin' || user.role === 'superadmin' ? '/admin' : '/dashboard'}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-midnight shadow-premium transition-all hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-primary-500/30 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  <Grid className="h-4 w-4 text-royal dark:text-indigo-400" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-midnight shadow-premium transition-all hover:bg-slate-50 dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  <LogOut className="h-4 w-4 text-slateSecondary" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="rounded-full px-4 py-2 text-sm font-semibold text-slateSecondary hover:text-midnight dark:text-slate-300 dark:hover:text-white transition-colors">
                  Sign In
                </Link>
                <Link to="/register" className="glow-btn-primary text-sm shadow-premium">
                  Get Started
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-full border border-slate-200 bg-white dark:border-white/10 dark:bg-white/5 p-2 text-midnight dark:text-slate-300 transition-colors hover:bg-slate-50 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white/95 dark:border-white/10 dark:bg-slate-950/95 px-4 pb-6 pt-3 backdrop-blur-2xl md:hidden">
          <div className="mb-4 rounded-3xl border border-slate-200 bg-slate-50/50 dark:border-white/10 dark:bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-royal dark:text-accent-cyan" />
              <div>
                <p className="text-sm font-semibold text-midnight dark:text-white">CareerSaathi Pro</p>
                <p className="text-xs text-slateSecondary dark:text-slate-400">AI powered planning, mentorship and opportunity discovery.</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-midnight hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-primary-500/30 dark:hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="my-5 h-px bg-slate-200 dark:bg-white/10" />

          {user ? (
            <div className="space-y-3">
              <Link
                to={user.role === 'admin' || user.role === 'superadmin' ? '/admin' : '/dashboard'}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-midnight hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <Grid className="h-5 w-5 text-royal" />
                <span>Dashboard</span>
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-midnight hover:bg-slate-50 dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <LogOut className="h-5 w-5 text-slateSecondary" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 pt-1">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-midnight hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/5 dark:hover:text-white"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="glow-btn-primary text-center"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
