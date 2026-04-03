import { useState } from 'react';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import SummaryCard from '../components/SummaryCard';
import BalanceTrendChart from '../components/BalanceTrendChart';
import ExpenseCategoryChart from '../components/ExpenseCategoryChart';
import TransactionTable from '../components/TransactionTable';
import { summaryStats } from '../mockData';

export default function DashboardPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen dark:bg-[#080b14] bg-slate-50">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setMobileOpen(true)} />

        <main className="flex-1 p-4 md:p-6 space-y-6 overflow-x-hidden">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <SummaryCard
              title="Total Balance"
              value={`$${summaryStats.totalBalance.toLocaleString()}`}
              trend={summaryStats.totalBalanceTrend}
              trendLabel="vs last month"
              icon={<Wallet className="w-5 h-5 text-indigo-400" />}
              accentColor="bg-indigo-500/10 border border-indigo-500/20"
              delay="animate-stagger-1"
            />
            <SummaryCard
              title="Monthly Income"
              value={`$${summaryStats.monthlyIncome.toLocaleString()}`}
              trend={summaryStats.monthlyIncomeTrend}
              trendLabel="vs March 2026"
              icon={<TrendingUp className="w-5 h-5 text-emerald-400" />}
              accentColor="bg-emerald-500/10 border border-emerald-500/20"
              delay="animate-stagger-2"
            />
            <SummaryCard
              title="Monthly Expenses"
              value={`$${summaryStats.monthlyExpenses.toLocaleString()}`}
              trend={summaryStats.monthlyExpensesTrend}
              trendLabel="vs March 2026"
              icon={<TrendingDown className="w-5 h-5 text-red-400" />}
              accentColor="bg-red-500/10 border border-red-500/20"
              delay="animate-stagger-3"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <BalanceTrendChart />
            </div>
            <div>
              <ExpenseCategoryChart />
            </div>
          </div>

          {/* Transaction table */}
          <TransactionTable />
        </main>
      </div>
    </div>
  );
}
