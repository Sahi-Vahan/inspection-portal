import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  ShieldCheck,
  Signal,
  BatteryCharging,
  Power,
  Bell,
  Wrench,
  Wallet,
  Award,
  User,
  ExternalLink,
  Sun,
  Moon
} from 'lucide-react';
import { useSpecialist } from '../../store/SpecialistContext';
import { useTheme } from '../../store/ThemeContext';

export const SpecialistHeader: React.FC = () => {
  const { specialist, isAvailable, setIsAvailable, jobs } = useSpecialist();
  const { theme, toggleTheme } = useTheme();

  const assignedJobsCount = jobs.filter((j) => j.status === 'assigned').length;

  const navItems = [
    { name: 'Jobs', path: '/specialist/dashboard', icon: <Wrench className="w-4 h-4" />, badge: assignedJobsCount },
    { name: 'Wallet', path: '/specialist/wallet', icon: <Wallet className="w-4 h-4" /> },
    { name: 'Quality', path: '/specialist/quality', icon: <Award className="w-4 h-4" /> },
    { name: 'Profile', path: '/specialist/profile', icon: <User className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-donezo-darkCard/95 backdrop-blur-md border-b border-donezo-lightBorder dark:border-donezo-darkBorder px-4 sm:px-6 py-3 text-slate-900 dark:text-white transition-colors duration-200 shadow-donezo">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        
        {/* Brand & Specialist ID */}
        <Link to="/specialist/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-donezo-green text-white flex items-center justify-center font-bold shadow-sm">
            <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-white">
                Sahi<span className="text-donezo-green dark:text-emerald-400">Vahan</span>
              </span>
              <span className="text-[10px] bg-donezo-greenLight dark:bg-emerald-950/40 text-donezo-green dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 font-mono px-2 py-0.5 rounded-full font-bold">
                FIELD
              </span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
              ID: {specialist.badge} · {specialist.name.split(' ')[0]}
            </div>
          </div>
        </Link>

        {/* Desktop / Tablet Nav Links */}
        <nav className="hidden md:flex items-center gap-1.5 bg-slate-100/80 dark:bg-[#0E1318] p-1 rounded-full border border-donezo-lightBorder dark:border-donezo-darkBorder">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all relative ${
                  isActive
                    ? 'text-white bg-donezo-green shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="px-1.5 py-0.2 bg-amber-500 text-slate-950 text-[10px] font-black rounded-full">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right Actions: Availability Switch, Theme Toggle & Telemetry */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle Sun/Moon */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full border border-donezo-lightBorder dark:border-donezo-darkBorder bg-slate-50 dark:bg-slate-800/80 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-donezo-green dark:hover:text-emerald-400 transition-colors shadow-2xs"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Cross link for demo */}
          <a
            href="http://127.0.0.1:3002"
            target="_blank"
            rel="noreferrer"
            className="hidden lg:flex items-center gap-1 text-[11px] font-semibold text-slate-600 dark:text-slate-400 hover:text-donezo-green dark:hover:text-emerald-400 px-3 py-1.5 rounded-full border border-donezo-lightBorder dark:border-donezo-darkBorder bg-slate-50 dark:bg-slate-800/60 transition-colors"
          >
            Admin Ops <ExternalLink className="w-3 h-3" />
          </a>

          {/* Availability Toggle */}
          <button
            type="button"
            onClick={() => setIsAvailable(!isAvailable)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border shadow-2xs ${
              isAvailable
                ? 'bg-donezo-greenLight dark:bg-emerald-950/40 text-donezo-green dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
            <span>{isAvailable ? 'ONLINE' : 'OFFLINE'}</span>
          </button>

          {/* Assigned Alert Count for mobile */}
          {assignedJobsCount > 0 && (
            <Link to="/specialist/dashboard" className="md:hidden relative p-2 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-slate-950 font-black text-[10px] rounded-full flex items-center justify-center">
                {assignedJobsCount}
              </span>
            </Link>
          )}
        </div>

      </div>
    </header>
  );
};
