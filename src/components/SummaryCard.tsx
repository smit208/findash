import type { ReactNode } from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import clsx from 'clsx';

interface SummaryCardProps {
  title: string;
  value: string;
  trend: number;
  trendLabel: string;
  icon: ReactNode;
  accentColor: string;
  delay?: string;
}

export default function SummaryCard({
  title,
  value,
  trend,
  trendLabel,
  icon,
  accentColor,
  delay = '',
}: SummaryCardProps) {
  const isPositive = trend >= 0;

  return (
    <div
      className={clsx(
        'glass rounded-2xl p-5 hover:bg-white/[0.07] dark:hover:bg-white/[0.07] hover:bg-slate-50 transition-all duration-300 cursor-default group animate-fade-up opacity-0',
        delay
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-xl ${accentColor}`}>{icon}</div>
        <span
          className={clsx(
            'flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full',
            isPositive
              ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
              : 'text-red-400 bg-red-500/10 border border-red-500/20'
          )}
        >
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {isPositive ? '+' : ''}{trend}%
        </span>
      </div>

      <div>
        <p className="text-xs text-slate-500 uppercase tracking-widest font-medium mb-1">{title}</p>
        <p className="text-2xl font-bold dark:text-white text-slate-900 tracking-tight">{value}</p>
        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
          <ArrowUpRight className="w-3 h-3" />
          {trendLabel}
        </p>
      </div>
    </div>
  );
}
