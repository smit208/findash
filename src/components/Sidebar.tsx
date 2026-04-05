import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  CreditCard,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Eye,
  Shield,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import clsx from 'clsx';

const links = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
  { icon: TrendingUp, label: 'Analytics', to: '/dashboard' },
  { icon: CreditCard, label: 'Transactions', to: '/dashboard' },
  { icon: Settings, label: 'Settings', to: '/dashboard' },
];

interface Props {
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

export default function Sidebar({ mobileOpen, setMobileOpen }: Props) {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const doLogout = () => {
    logout();
    navigate('/login');
  };

  const inner = (
    <div className="flex flex-col h-full">
      <div
        className={clsx(
          'flex items-center gap-3 px-4 py-5 border-b border-white/5',
          collapsed && 'justify-center px-2'
        )}
      >
        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div>
            <span className="font-bold text-white text-lg tracking-tight">
              Zorv<span className="gradient-text">yn</span>
            </span>
            <p className="text-[10px] text-slate-500 -mt-0.5">Finance Platform</p>
          </div>
        )}
      </div>

      {!collapsed && (
        <div className="mx-4 mt-4 mb-2">
          <div
            className={clsx(
              'flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold',
              isAdmin
                ? 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-400'
                : 'bg-slate-500/10 border border-slate-500/20 text-slate-400'
            )}
          >
            {isAdmin ? (
              <>
                <Shield className="w-3.5 h-3.5" />
                Admin Access
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" />
                View Only
              </>
            )}
          </div>
        </div>
      )}

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {links.map(({ icon: Icon, label, to }) => (
          <NavLink
            key={label}
            to={to}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group',
                collapsed && 'justify-center px-2',
                isActive
                  ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              )
            }
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/5 p-3">
        <div
          className={clsx(
            'flex items-center gap-3 px-2 py-2 rounded-xl',
            collapsed && 'justify-center'
          )}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/40 to-purple-500/40 flex items-center justify-center text-xs font-bold text-indigo-300 border border-indigo-500/20 flex-shrink-0">
            {user?.avatar}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white font-medium truncate">{user?.name}</p>
              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
            </div>
          )}
          {!collapsed && (
            <button
              onClick={doLogout}
              className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <button
        onClick={() => setCollapsed((v) => !v)}
        className="hidden md:flex items-center justify-center p-2 m-3 rounded-xl border border-white/5 text-slate-500 hover:text-white hover:bg-white/5 transition-all"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </div>
  );

  return (
    <>
      <aside
        className={clsx(
          'hidden md:flex flex-col h-screen sticky top-0 glass border-r border-white/5 transition-all duration-300 flex-shrink-0',
          collapsed ? 'w-16' : 'w-60'
        )}
      >
        {inner}
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={clsx(
          'fixed left-0 top-0 h-full w-60 z-50 glass border-r border-white/5 flex flex-col transition-transform duration-300 md:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {inner}
      </aside>
    </>
  );
}
