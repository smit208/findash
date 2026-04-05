// had to wrap in ResponsiveContainer to get mobile sizing right, fixed height works better than %
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { balanceTrendData } from '../mockData';
import { TrendingUp } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-xl px-4 py-3 shadow-xl border border-indigo-500/20">
        <p className="text-xs text-slate-400 mb-1">{label}</p>
        <p className="text-sm font-bold text-indigo-400">
          ₹{(payload[0].value as number).toLocaleString('en-IN')}
        </p>
      </div>
    );
  }
  return null;
};

export default function BalanceTrendChart() {
  return (
    <div className="glass rounded-2xl p-5 animate-fade-up opacity-0 animate-stagger-2">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold dark:text-white text-slate-900">Balance Trend</h3>
          <p className="text-xs text-slate-500 mt-0.5">Last 6 months</p>
        </div>
        <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
          <TrendingUp className="w-4 h-4 text-indigo-400" />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={balanceTrendData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fill: '#64748b', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#64748b', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(99,102,241,0.3)', strokeWidth: 1 }} />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#6366f1"
            strokeWidth={2.5}
            fill="url(#balanceGradient)"
            dot={{ fill: '#6366f1', r: 4, strokeWidth: 0 }}
            activeDot={{ fill: '#a5b4fc', r: 5, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
