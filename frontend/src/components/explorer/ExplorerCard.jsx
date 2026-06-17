import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const accentMap = {
  primary: 'from-primary-500/20 to-white/5 text-primary-300',
  accent: 'from-accent-purple/20 to-white/5 text-accent-purple',
  cyan: 'from-accent-cyan/20 to-white/5 text-accent-cyan',
  rose: 'from-rose-500/20 to-white/5 text-rose-300',
  amber: 'from-amber-500/20 to-white/5 text-amber-300',
  emerald: 'from-emerald-500/20 to-white/5 text-emerald-300',
  purple: 'from-violet-500/20 to-white/5 text-violet-300',
};

export default function ExplorerCard({
  icon: Icon,
  title,
  subtitle,
  highlights = [],
  route,
  badge,
  accent = 'primary',
  theme = 'dark',
  layout = 'stack',
  onClick,
  footer,
  className = '',
}) {
  const cardBase = theme === 'light'
    ? 'border-slate-200/80 bg-white/80 text-slate-900 shadow-[0_18px_45px_rgba(15,23,42,0.08)]'
    : 'border-white/10 bg-white/5 text-white';

  const mutedText = theme === 'light' ? 'text-slate-600' : 'text-slate-400';
  const chipBase = theme === 'light' ? 'border-slate-200 bg-slate-50 text-slate-700' : 'border-white/10 bg-white/5 text-slate-200';

  const content = (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`group relative overflow-hidden rounded-[1.75rem] border backdrop-blur-xl ${cardBase} ${className}`}
    >
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accentMap[accent] || accentMap.primary}`} />
      <div className="flex h-full flex-col p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${chipBase}`}>
            {Icon ? <Icon className="h-5 w-5" /> : null}
          </div>
          {badge ? <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${chipBase}`}>{badge}</span> : null}
        </div>

        <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
        <p className={`mt-3 text-sm leading-7 ${mutedText}`}>{subtitle}</p>

        {highlights.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {highlights.map((item) => (
              <span key={item} className={`rounded-full border px-3 py-1 text-xs font-medium ${chipBase}`}>
                {item}
              </span>
            ))}
          </div>
        ) : null}

        {footer ? <div className="mt-6">{footer}</div> : null}

        <div className="mt-auto flex items-center justify-between pt-6">
          <span className={`text-xs font-semibold uppercase tracking-[0.24em] ${mutedText}`}>Learn more</span>
          <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </motion.div>
  );

  if (route) {
    return <Link to={route}>{content}</Link>;
  }

  if (onClick) {
    return <button type="button" onClick={onClick} className="text-left">{content}</button>;
  }

  return content;
}
