import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { GraduationCap, ArrowRight, AlertTriangle, Sparkles, ShieldCheck } from 'lucide-react';

export default function VerifyOtp() {
  const { verifyOtp } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || '';
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await verifyOtp(email, otp);
    setLoading(false);

    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.error);
    }
  };

  return (
    <div className="page-shell min-h-[calc(100vh-5rem)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-5xl items-center lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-primary-500/20 via-white/5 to-accent-cyan/10 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.35)] sm:p-10">
          <div className="hero-orb left-0 top-0 h-48 w-48 bg-primary-500/20" />
          <div className="relative z-10">
            <div className="section-chip w-fit">
              <Sparkles className="h-3.5 w-3.5 text-accent-cyan" />
              <span>Security check</span>
            </div>
            <h1 className="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl">Verify your email and finish setup.</h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              We use a quick one-time code to keep your account secure and your onboarding smooth.
            </p>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
                <p className="text-sm font-semibold text-white">Code sent to</p>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-400 break-all">{email || 'your email'}</p>
            </div>
          </div>
        </div>

        <div className="glass-card relative -mt-6 border-white/10 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.35)] sm:mt-0 sm:p-10">
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-3">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-black text-white">Verify email</h2>
            <p className="mt-2 text-sm leading-7 text-slate-400">
              Enter the 6-digit verification code sent to <strong className="text-slate-200">{email || 'your email'}</strong>
            </p>
          </div>

          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Verification Code</label>
              <input
                type="text"
                required
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                className="input-field text-center text-xl font-bold tracking-[0.5em]"
              />
            </div>

            <button type="submit" disabled={loading} className="w-full glow-btn-primary disabled:opacity-50">
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
              ) : (
                <>
                  <span>Verify & Login</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
