import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { GraduationCap, ArrowRight, AlertTriangle, Eye, EyeOff, Sparkles, ShieldCheck, BrainCircuit } from 'lucide-react';

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser.role === 'admin' || storedUser.role === 'superadmin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } else {
      if (res.requiresVerification) {
        navigate('/verify-otp', { state: { email } });
      } else {
        setError(res.error);
      }
    }
  };

  return (
    <div className="page-shell min-h-[calc(100vh-5rem)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-6xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-primary-500/20 via-white/5 to-accent-purple/15 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.35)] sm:p-10">
          <div className="hero-orb -left-10 top-0 h-44 w-44 bg-primary-500/20" />
          <div className="hero-orb bottom-0 right-0 h-56 w-56 bg-accent-cyan/15" />

          <div className="relative z-10">
            <div className="section-chip w-fit">
              <Sparkles className="h-3.5 w-3.5 text-accent-cyan" />
              <span>Welcome back</span>
            </div>

            <h1 className="mt-6 max-w-xl text-4xl font-black leading-tight text-white sm:text-5xl">
              Sign in to a smarter career workspace.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              Resume scoring, mentor booking, scholarship discovery, and personalized roadmaps all stay in one place.
            </p>

            <div className="mt-8 space-y-4">
              {[
                { icon: BrainCircuit, title: 'Adaptive guidance', copy: 'The platform learns from your inputs and keeps the next step clear.' },
                { icon: ShieldCheck, title: 'Secure by design', copy: 'Your progress and profile stay protected while you explore opportunities.' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex gap-4 rounded-3xl border border-white/10 bg-white/5 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold text-white">{item.title}</h2>
                      <p className="mt-1 text-sm leading-6 text-slate-400">{item.copy}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="hero-orb right-0 top-10 h-64 w-64 bg-accent-purple/10" />
          <div className="glass-card relative z-10 border-white/10 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.35)] sm:p-10">
            <div className="mb-8 flex flex-col items-center text-center">
              <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-3">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-black text-white">Sign in</h2>
              <p className="mt-2 text-sm text-slate-400">Access your dashboard and continue where you left off.</p>
            </div>

            {error && (
              <div className="mb-6 flex items-start gap-3 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-field"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-300">Password</label>
                  <Link to="/forgot-password" style={{ display: 'none' }} className="text-xs font-semibold text-primary-400 transition-colors hover:text-primary-300">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input-field pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 transition-colors hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full glow-btn-primary disabled:opacity-50">
                {loading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-slate-400">
                Don&apos;t have an account?{' '}
                <Link to="/register" className="font-semibold text-primary-400 transition-colors hover:text-primary-300">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
