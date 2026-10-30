import React from 'react';
import { NavLink } from 'react-router-dom';
import { Wrench, Wallet, Award, User } from 'lucide-react';
import { useSpecialist } from '../../store/SpecialistContext';

export const SpecialistBottomNav: React.FC = () => {
  const { jobs } = useSpecialist();
  const assignedCount = jobs.filter((j) => j.status === 'assigned').length;

  const navItems = [
    { name: 'Jobs', path: '/specialist/dashboard', icon: <Wrench className="w-5 h-5" />, badge: assignedCount },
    { name: 'Wallet', path: '/specialist/wallet', icon: <Wallet className="w-5 h-5" /> },
    { name: 'Quality', path: '/specialist/quality', icon: <Award className="w-5 h-5" /> },
    { name: 'Profile', path: '/specialist/profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed bottom-3 left-3 right-3 z-30 bg-white/95 dark:bg-donezo-darkCard/95 backdrop-blur-lg border border-donezo-lightBorder dark:border-donezo-darkBorder rounded-full py-1.5 px-3 md:hidden shadow-lg shadow-black/5">
      <div className="max-w-md mx-auto grid grid-cols-4 gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1.5 rounded-full text-[11px] font-bold transition-all relative ${
                isActive
                  ? 'text-white bg-donezo-green shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`
            }
          >
            <div className="relative">
              {item.icon}
              {item.badge && item.badge > 0 ? (
                <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-amber-500 text-slate-950 text-[9px] font-black rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              ) : null}
            </div>
            <span className="mt-0.5 text-[10px]">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
