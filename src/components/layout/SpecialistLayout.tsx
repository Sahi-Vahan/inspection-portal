import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SpecialistHeader } from './SpecialistHeader';
import { SpecialistBottomNav } from './SpecialistBottomNav';
import { ScrollToTop } from '../common/ScrollToTop';

export const SpecialistLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-donezo-lightBg dark:bg-donezo-dark text-slate-900 dark:text-white pb-24 md:pb-10 transition-colors duration-200">
      <ScrollToTop />
      <SpecialistHeader />
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 md:p-8">
        <div key={location.pathname} className="page-transition-enter">
          <Outlet />
        </div>
      </main>
      <SpecialistBottomNav />
    </div>
  );
};
