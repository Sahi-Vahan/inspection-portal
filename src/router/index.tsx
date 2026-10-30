import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { SpecialistLayout } from '../components/layout/SpecialistLayout';
import { DashboardPage } from '../pages/DashboardPage';
import { JobDetailPage } from '../pages/JobDetailPage';
import { VisitEvidenceCheckinPage } from '../pages/VisitEvidenceCheckinPage';
import { ChecklistPage } from '../pages/ChecklistPage';
import { ReportSubmitPage } from '../pages/ReportSubmitPage';
import { WalletPage } from '../pages/WalletPage';
import { QualityScorecardPage } from '../pages/QualityScorecardPage';
import { SpecialistProfilePage } from '../pages/SpecialistProfilePage';
import { SpecialistLoginPage } from '../pages/SpecialistLoginPage';

export const router = createBrowserRouter([
  {
    path: '/specialist/login',
    element: <SpecialistLoginPage />,
  },
  {
    path: '/',
    element: <SpecialistLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/specialist/dashboard" replace />,
      },
      {
        path: 'specialist/dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'specialist/jobs/:id',
        element: <JobDetailPage />,
      },
      {
        path: 'specialist/jobs/:id/checkin',
        element: <VisitEvidenceCheckinPage />,
      },
      {
        path: 'specialist/jobs/:id/inspect',
        element: <ChecklistPage />,
      },
      {
        path: 'specialist/jobs/:id/submit',
        element: <ReportSubmitPage />,
      },
      {
        path: 'specialist/wallet',
        element: <WalletPage />,
      },
      {
        path: 'specialist/quality',
        element: <QualityScorecardPage />,
      },
      {
        path: 'specialist/profile',
        element: <SpecialistProfilePage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/specialist/dashboard" replace />,
  },
]);
