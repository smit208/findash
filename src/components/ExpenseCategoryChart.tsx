import { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { expenseCategoryData } from '../mockData';
import { PieChart as PieIcon } from 'lucide-react';

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="glass rounded-xl px-4 py-3 shadow-xl border border-white/10">
        <p className="text-xs text-slate-400 mb-1">{data.name}</p>
        <p className="text-sm font-bold text-white">${(data.value as number).toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export default function ExpenseCategoryChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const total = expenseCategoryData.reduce((s, d) => s + d.value, 0);

  return (
    <div className="glass rounded-2xl p-5 animate-fade-up opacity-0 animate-stagger-3">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-white">Expense Categories</h3>
          <p className="text-xs text-slate-500 mt-0.5">Q1 2026 breakdown</p>
        </div>
        <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
          <PieIcon className="w-4 h-4 text-purple-400" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-shrink-0">
          <ResponsiveContainer width={160} height={160}>
            <PieChart>
              <Pie
                data={expenseCategoryData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={72}
                dataKey="value"
                strokeWidth={0}
                onMouseEnter={(_data, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {expenseCategoryData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.color}
                    opacity={activeIndex === null || activeIndex === index ? 1 : 0.5}
                    style={{
                      transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)',
                      transformOrigin: 'center',
                      transition: 'all 0.2s ease',
                    }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-xs text-slate-500">Total</p>
            <p className="text-sm font-bold text-white">${(total / 1000).toFixed(0)}k</p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 grid grid-cols-1 gap-1.5 min-w-0">
          {expenseCategoryData.map((d, i) => (
            <div
              key={d.name}
              className={`flex items-center justify-between text-xs py-1 px-2 rounded-lg transition-all cursor-default ${
                activeIndex === i ? 'bg-white/5' : ''
              }`}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: d.color }}
                />
                <span className="text-slate-400 truncate">{d.name}</span>
              </div>
              <span className="text-white font-medium ml-2">
                {((d.value / total) * 100).toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
