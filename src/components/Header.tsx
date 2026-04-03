
import { Sun, Moon, Menu, Bell } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { isDark, toggle } = useTheme();
  const { user, isAdmin } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 md:px-6 py-3.5 border-b border-white/5 dark:bg-[#080b14]/80 bg-white/80 backdrop-blur-md">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-lg font-semibold dark:text-white text-slate-900">
            Finance Dashboard
          </h2>
          <p className="text-xs dark:text-slate-500 text-slate-400 hidden sm:block">
            April 2026 · Fiscal Year Q2
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Role pill */}
        <span
          className={`hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${
            isAdmin
              ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
              : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isAdmin ? 'bg-indigo-400' : 'bg-slate-400'} animate-pulse`} />
          {isAdmin ? 'Admin' : 'View Only'}
        </span>

        {/* Notification bell */}
        <button className="relative p-2 rounded-xl dark:text-slate-400 text-slate-600 hover:dark:text-white hover:text-slate-900 dark:hover:bg-white/5 hover:bg-slate-100 transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500" />
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="p-2 rounded-xl dark:text-slate-400 text-slate-600 hover:dark:text-white hover:text-slate-900 dark:hover:bg-white/5 hover:bg-slate-100 transition-colors"
          title="Toggle theme"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/40 to-purple-500/40 flex items-center justify-center text-xs font-bold text-indigo-300 border border-indigo-500/20">
          {user?.avatar}
        </div>
      </div>
    </header>
  );
}
