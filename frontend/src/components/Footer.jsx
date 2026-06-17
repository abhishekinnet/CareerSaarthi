import React from 'react';
import { GraduationCap, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-white/10 dark:bg-[#080C16] px-4 py-12 sm:px-6 lg:px-8 mt-auto transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5 p-2.5 shadow-premium">
            <GraduationCap className="h-5 w-5 text-royal dark:text-white" />
          </div>
          <div>
            <span className="block font-bold text-midnight dark:text-white tracking-tight font-clash">CareerSaathi</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slateSecondary dark:text-slate-500">AI career companion</span>
          </div>
        </div>
        <p className="max-w-2xl text-center text-sm leading-6 text-slateSecondary dark:text-slate-500 md:text-left font-satoshi">
          &copy; {new Date().getFullYear()} CareerSaathi. Designed to help students move from uncertainty to action with more clarity.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-satoshi font-medium">
          <a href="#" className="text-slateSecondary transition-colors hover:text-midnight dark:hover:text-white">Privacy</a>
          <a href="#" className="text-slateSecondary transition-colors hover:text-midnight dark:hover:text-white">Terms</a>
          <a href="#" className="text-slateSecondary transition-colors hover:text-midnight dark:hover:text-white">Support</a>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50/80 dark:border-white/10 dark:bg-white/5 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-slateSecondary dark:text-slate-300">
            <Sparkles className="h-3.5 w-3.5 text-royal dark:text-accent-cyan" />
            premium ui
          </div>
        </div>
      </div>
    </footer>
  );
}
