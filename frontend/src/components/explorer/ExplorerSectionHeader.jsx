import React from 'react';
import { motion } from 'framer-motion';

export default function ExplorerSectionHeader({ eyebrow, title, subtitle, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
    >
      <div>
        <div className="section-chip mb-3 w-fit">{eyebrow}</div>
        <h2 className="max-w-3xl text-3xl font-black tracking-tight text-white sm:text-4xl">{title}</h2>
        {subtitle ? <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">{subtitle}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </motion.div>
  );
}
