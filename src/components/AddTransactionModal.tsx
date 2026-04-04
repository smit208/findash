import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import type { Transaction, TransactionCategory, TransactionStatus } from '../mockData';
import { CATEGORIES } from '../mockData';

interface Props {
  onClose: () => void;
  onAdd: (tx: Transaction) => void;
}

export default function AddTransactionModal({ onClose, onAdd }: Props) {
  const [form, setForm] = useState({
    entity: '',
    amount: '',
    category: 'Revenue' as TransactionCategory,
    status: 'Completed' as TransactionStatus,
    description: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.entity || !form.amount || !form.description) {
      setError('Please fill all fields.');
      return;
    }
    const amt = parseFloat(form.amount);
    if (isNaN(amt)) {
      setError('Amount must be a valid number. Use negative for expenses.');
      return;
    }
    const newTx: Transaction = {
      id: `TXN-${String(Math.floor(Math.random() * 9000) + 1000)}`,
      date: new Date().toISOString().split('T')[0],
      entity: form.entity,
      amount: amt,
      category: form.category,
      status: form.status,
      description: form.description,
    };
    onAdd(newTx);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md glass rounded-2xl shadow-2xl border border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h3 className="text-white font-semibold">Add Transaction</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs text-slate-400 uppercase tracking-wide mb-1.5">
                Entity / Company
              </label>
              <input
                type="text"
                value={form.entity}
                onChange={(e) => setForm({ ...form, entity: e.target.value })}
                placeholder="e.g. Acme Corp"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 uppercase tracking-wide mb-1.5">
                Amount ($)
              </label>
              <input
                type="number"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                placeholder="-5000 or 12000"
                step="0.01"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 uppercase tracking-wide mb-1.5">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as TransactionStatus })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#13182b] border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-all appearance-none cursor-pointer"
              >
                {(['Completed', 'Pending', 'Processing', 'Failed'] as TransactionStatus[]).map(
                  (s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-xs text-slate-400 uppercase tracking-wide mb-1.5">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value as TransactionCategory })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-[#13182b] border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-all appearance-none cursor-pointer"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-xs text-slate-400 uppercase tracking-wide mb-1.5">
                Description
              </label>
              <input
                type="text"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Brief description..."
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-white/10 text-slate-400 text-sm hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
