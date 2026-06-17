import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { GraduationCap, ArrowRight, AlertTriangle, User, Users, Sparkles, ShieldCheck, BrainCircuit } from 'lucide-react';

export default function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await register(name, email, password, role);
    setLoading(false);

    if (res.success) {
      navigate('/verify-otp', { state: { email } });
    } else {
      setError(res.error);
    }
  };

  return (
    <div className="page-shell min-h-[calc(100vh-5rem)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-accent-purple/15 via-white/5 to-primary-500/15 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.35)] sm:p-10 lg:order-2">
          <div className="hero-orb right-0 top-0 h-44 w-44 bg-accent-purple/20" />
          <div className="hero-orb bottom-0 left-0 h-56 w-56 bg-primary-500/15" />

          <div className="relative z-10">
            <div className="section-chip w-fit">
              <Sparkles className="h-3.5 w-3.5 text-accent-purple" />
              <span>Create your account</span>
            </div>

            <h1 className="mt-6 max-w-xl text-4xl font-black leading-tight text-white sm:text-5xl">
              Join a platform built for smart, guided career growth.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              Register once and unlock a dashboard that handles exploration, mentor booking, resume readiness, and scholarship discovery.
            </p>

            <div className="mt-8 space-y-4">
              {[
                { icon: BrainCircuit, title: 'Personalized setup', copy: 'Pick the role that matches your journey and let the platform adapt.' },
                { icon: ShieldCheck, title: 'Protected profile', copy: 'Data stays scoped to your educational and career progression needs.' },
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

        <div className="relative lg:order-1">
          <div className="hero-orb left-0 top-16 h-64 w-64 bg-primary-500/10" />
          <div className="glass-card relative z-10 border-white/10 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.35)] sm:p-10">
            <div className="mb-8 flex flex-col items-center text-center">
              <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-3">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-black text-white">Create account</h2>
              <p className="mt-2 text-sm text-slate-400">Set up your profile and start with a clearer direction.</p>
            </div>

            {error && (
              <div className="mb-6 flex items-start gap-3 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Aarav Mehta"
                  className="input-field"
                />
              </div>

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
                <label className="mb-2 block text-sm font-medium text-slate-300">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="input-field"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-slate-300">Choose Account Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setRole('student')}
                    className={`flex items-center justify-center gap-2 rounded-2xl border px-4 py-4 text-sm font-medium transition-all ${
                      role === 'student'
                        ? 'border-primary-500/40 bg-primary-500/15 text-white shadow-glow-primary'
                        : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <User className="h-4.5 w-4.5" />
                    <span>Student</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('mentor')}
                    className={`flex items-center justify-center gap-2 rounded-2xl border px-4 py-4 text-sm font-medium transition-all ${
                      role === 'mentor'
                        ? 'border-primary-500/40 bg-primary-500/15 text-white shadow-glow-primary'
                        : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Users className="h-4.5 w-4.5" />
                    <span>Mentor</span>
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full glow-btn-primary disabled:opacity-50">
                {loading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                ) : (
                  <>
                    <span>Sign Up</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-slate-400">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-primary-400 transition-colors hover:text-primary-300">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
