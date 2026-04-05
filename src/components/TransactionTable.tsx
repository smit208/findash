import { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Download,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  ArrowUpDown,
} from 'lucide-react';
import type { Transaction, TransactionStatus } from '../mockData';
import { CATEGORIES, transactions as initialData } from '../mockData';
import { useAuth } from '../context/AuthContext';
import AddTransactionModal from './AddTransactionModal';
import clsx from 'clsx';

const STATUS_STYLES: Record<TransactionStatus, string> = {
  Completed: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Pending: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  Failed: 'text-red-400 bg-red-500/10 border-red-500/20',
  Processing: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
};

const STATUS_DOT: Record<TransactionStatus, string> = {
  Completed: 'bg-emerald-400',
  Pending: 'bg-amber-400',
  Failed: 'bg-red-400',
  Processing: 'bg-blue-400',
};

// sort state - default newest first
type SortField = 'date' | 'entity' | 'amount';
type SortDir = 'asc' | 'desc';

export default function TransactionTable() {
  const { isAdmin } = useAuth();
  const [data, setData] = useState<Transaction[]>(initialData);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [showModal, setShowModal] = useState(false);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const filtered = useMemo(() => {
    return data
      .filter((t) => {
        const q = search.toLowerCase();
        const matchSearch =
          !q ||
          t.entity.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.id.toLowerCase().includes(q);
        const matchCat = categoryFilter === 'All' || t.category === categoryFilter;
        return matchSearch && matchCat;
      })
      .sort((a, b) => {
        let res = 0;
        if (sortField === 'date') res = a.date.localeCompare(b.date);
        if (sortField === 'entity') res = a.entity.localeCompare(b.entity);
        if (sortField === 'amount') res = a.amount - b.amount;
        return sortDir === 'asc' ? res : -res;
      });
  }, [data, search, categoryFilter, sortField, sortDir]);

  // TODO: add pagination when list gets long
  const removeRow = (id: string) => {
    setData((prev) => prev.filter((t) => t.id !== id));
  };

  const addRow = (tx: Transaction) => {
    setData((prev) => [tx, ...prev]);
  };

  const exportCSV = () => {
    const header = 'ID,Date,Entity,Amount,Category,Status\n';
    const rows = data
      .map((t) => `${t.id},${t.date},${t.entity},${t.amount},${t.category},${t.status}`)
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'zorvyn_transactions.csv';
    a.click();
    URL.revokeObjectURL(url);
  };
  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="w-3 h-3 text-slate-600" />;
    return sortDir === 'asc' ? (
      <ChevronUp className="w-3 h-3 text-indigo-400" />
    ) : (
      <ChevronDown className="w-3 h-3 text-indigo-400" />
    );
  };

  return (
    <>
      <div className="glass rounded-2xl overflow-hidden animate-fade-up opacity-0 animate-stagger-4">
        {/* Table header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 border-b border-white/5">
          <div>
            <h3 className="text-sm font-semibold dark:text-white text-slate-900">Transaction History</h3>
            <p className="text-xs text-slate-500 mt-0.5">{filtered.length} records</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-52 pl-9 pr-4 py-2 text-xs rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition-all"
              />
            </div>

            {/* Category filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="pl-9 pr-4 py-2 text-xs rounded-xl bg-white/5 border border-white/10 text-slate-300 focus:outline-none focus:border-indigo-500/50 transition-all appearance-none cursor-pointer"
              >
                <option value="All">All Categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={isAdmin ? () => setShowModal(true) : undefined}
              disabled={!isAdmin}
              className={clsx(
                'flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all',
                isAdmin
                  ? 'bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/25'
                  : 'bg-slate-800/50 border border-slate-700/50 text-slate-600 cursor-not-allowed'
              )}
              title={!isAdmin ? 'Admin access required' : undefined}
            >
              <Plus className="w-3.5 h-3.5" />
              Add
            </button>

            <button
              onClick={isAdmin ? exportCSV : undefined}
              disabled={!isAdmin}
              className={clsx(
                'flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all',
                isAdmin
                  ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'
                  : 'bg-slate-800/50 border border-slate-700/50 text-slate-600 cursor-not-allowed'
              )}
              title={!isAdmin ? 'Admin access required' : undefined}
            >
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-white/5">
                {[
                  { label: 'Date', field: 'date' as SortField },
                  { label: 'Entity', field: 'entity' as SortField },
                  { label: 'Category', field: null },
                  { label: 'Amount', field: 'amount' as SortField },
                  { label: 'Status', field: null },
                ].map(({ label, field }) => (
                  <th
                    key={label}
                    className={clsx(
                      'px-5 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider',
                      field && 'cursor-pointer hover:text-slate-300 transition-colors'
                    )}
                    onClick={() => field && handleSort(field)}
                  >
                    <span className="flex items-center gap-1.5">
                      {label}
                      {field && <SortIcon field={field} />}
                    </span>
                  </th>
                ))}
                {isAdmin && (
                  <th className="px-5 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={isAdmin ? 6 : 5}
                    className="px-5 py-12 text-center text-slate-500 text-sm"
                  >
                    No transactions found.
                  </td>
                </tr>
              ) : (
                filtered.map((tx) => (
                  <tr
                    key={tx.id}
                    className="hover:bg-white/[0.025] transition-colors group"
                  >
                    <td className="px-5 py-3.5">
                      <div className="text-xs text-slate-400">{tx.date}</div>
                      <div className="text-[10px] text-slate-600">{tx.id}</div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="text-sm dark:text-white text-slate-900 font-medium">{tx.entity}</div>
                      <div className="text-xs text-slate-500 truncate max-w-[160px]">
                        {tx.description}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400">
                        {tx.category}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={clsx(
                          'text-sm font-bold tabular-nums',
                          tx.amount >= 0 ? 'text-emerald-400' : 'text-red-400'
                        )}
                      >
                        {tx.amount >= 0 ? '+' : ''}₹
                        {Math.abs(tx.amount).toLocaleString('en-IN')}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={clsx(
                          'inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border',
                          STATUS_STYLES[tx.status]
                        )}
                      >
                        <span className={clsx('w-1.5 h-1.5 rounded-full', STATUS_DOT[tx.status])} />
                        {tx.status}
                      </span>
                    </td>
                    {isAdmin && (
                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={() => removeRow(tx.id)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && <AddTransactionModal onClose={() => setShowModal(false)} onAdd={addRow} />}
    </>
  );
}
