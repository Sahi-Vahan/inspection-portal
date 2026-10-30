import React, { createContext, useContext, useState, useEffect } from 'react';
import { SpecialistJob, WalletTransaction, ChecklistGrade, InspectionChecklistItem } from '../types/specialist';

interface SpecialistProfile {
  id: string;
  name: string;
  badge: string;
  rating: number;
  completedJobsCount: number;
  phone: string;
  email: string;
  bankDetails: {
    accountHolder: string;
    accountNumberMasked: string;
    ifsc: string;
    bankName: string;
    isVerified: boolean;
  };
}

interface SpecialistContextType {
  specialist: SpecialistProfile;
  isAvailable: boolean;
  setIsAvailable: (val: boolean) => void;
  jobs: SpecialistJob[];
  walletBalance: {
    pending: number;
    available: number;
    lifetimeWithdrawn: number;
  };
  transactions: WalletTransaction[];
  getJobById: (id: string) => SpecialistJob | undefined;
  acceptJob: (id: string) => void;
  rejectJob: (id: string, reason: string) => void;
  startNavigation: (id: string) => void;
  submitVisitEvidence: (id: string, evidence: {
    specialistPhotoUrl: string;
    numberPlatePhotoUrl: string;
    odometerPhotoUrl: string;
    odometerKm: number;
    gpsCoords: string;
  }) => void;
  updateChecklistItem: (
    jobId: string,
    itemId: string,
    grade: ChecklistGrade,
    remarks?: string,
    reason?: string,
    photoUrls?: string[],
    indicativeCost?: any
  ) => void;
  submitInspectionReport: (jobId: string) => void;
  submitReportCorrection: (jobId: string, reason: string) => void;
  requestWithdrawal: (amount: number) => { success: boolean; refId?: string; error?: string };
}

const DEFAULT_PROFILE: SpecialistProfile = {
  id: 'sp-101',
  name: 'Rajesh Verma',
  badge: 'SV-SPEC-704',
  rating: 4.94,
  completedJobsCount: 482,
  phone: '+91 98450 11223',
  email: 'rajesh.verma@specialist.sahivahan.com',
  bankDetails: {
    accountHolder: 'Rajesh Verma',
    accountNumberMasked: '•••• •••• 9821',
    ifsc: 'HDFC0000240',
    bankName: 'HDFC Bank Ltd, Koramangala',
    isVerified: true,
  },
};

const DEFAULT_CHECKLIST: InspectionChecklistItem[] = [
  // Chassis
  { id: 'chk-1', category: 'Chassis & Structure', title: 'Radiator Core Support & Front Crossmember', grade: 'good' },
  { id: 'chk-2', category: 'Chassis & Structure', title: 'A, B & C Pillars & Roof Frame Spot Welds', grade: 'good' },
  { id: 'chk-3', category: 'Chassis & Structure', title: 'Aprons & Suspension Strut Towers', grade: 'good' },
  { id: 'chk-4', category: 'Chassis & Structure', title: 'Boot Floor & Spare Wheel Tub Sealer', grade: 'good' },
  // Engine
  { id: 'chk-5', category: 'Engine & Powertrain', title: 'Cold Start & Idle RPM Stability', grade: 'good' },
  { id: 'chk-6', category: 'Engine & Powertrain', title: 'Cooling System & Thermostat Flange', grade: 'average', remarks: 'Slight dried coolant crust at flange elbow.' },
  { id: 'chk-7', category: 'Engine & Powertrain', title: 'Turbocharger Plumbing & Boost Hose', grade: 'good' },
  // Brakes & Suspension
  { id: 'chk-8', category: 'Brakes & Suspension', title: 'Front Brake Pads & Disc Rotors', grade: 'poor', remarks: 'Front pads worn to 2.5mm limit; rotors show lip wear.', indicativeCost: { partsMin: 6500, partsMax: 8000, laborMin: 1500, laborMax: 2000, urgency: 'immediate' } },
  { id: 'chk-9', category: 'Brakes & Suspension', title: 'Shock Absorber Damping & Rebound', grade: 'good' },
  // Body & Paint
  { id: 'chk-10', category: 'Exterior Bodywork', title: 'Paint Depth Gauge (Micron Scanner)', grade: 'average', remarks: 'Left rear passenger door readings 180-220µm (clearcoat blend).' },
  { id: 'chk-11', category: 'Exterior Bodywork', title: 'Glass Integrity & Windshield Date Codes', grade: 'good' },
  // Electricals & OBD
  { id: 'chk-12', category: 'Diagnostics & Electricals', title: 'OBD-II ECU Computer Diagnostics', grade: 'average', remarks: 'Intermittent secondary O2 sensor heater code (P0141).' },
  { id: 'chk-13', category: 'Diagnostics & Electricals', title: 'Air Conditioning Vent Output Temp', grade: 'good' },
  // Road Test
  { id: 'chk-14', category: 'Road Test Evaluation', title: 'Transmission Shift Response & Clutch Bite', grade: 'good' },
  { id: 'chk-15', category: 'Road Test Evaluation', title: 'Straight-Line Highway Tracking & Steering', grade: 'good' },
];

const INITIAL_JOBS: SpecialistJob[] = [
  {
    id: 'JOB-2026-701',
    bookingRef: 'SV-2026-9041',
    status: 'assigned',
    responseDeadline: new Date(Date.now() + 25 * 60 * 1000).toISOString(), // 25 mins left
    vehicle: {
      type: 'car',
      make: 'Tata Motors',
      model: 'Nexon',
      variant: 'EV Long Range Empowered+',
      year: 2023,
      fuel: 'Electric',
      transmission: 'Automatic',
      registrationNumber: 'KA 05 NV 1809',
      complexity: 'complex',
    },
    location: {
      city: 'Bengaluru',
      area: 'Indiranagar Defence Colony',
      address: 'Villa #18, Defence Colony, Indiranagar',
      landmark: 'Near 100ft Road KFC',
      pincode: '560038',
      sellerName: 'Pradeep Rao',
      sellerPhone: '+91 94480 33445',
      sellerRelationship: 'owner',
      askingPrice: 850000,
      accessNotes: 'Car parked in front porch. Gate code 4921.',
    },
    appointment: {
      date: new Date().toISOString().split('T')[0],
      window: '11:30 AM - 01:30 PM',
    },
    payoutAmount: 1650,
    checklist: DEFAULT_CHECKLIST,
    reportVersion: 1,
  },
  {
    id: 'JOB-2026-702',
    bookingRef: 'SV-2026-8902',
    status: 'accepted',
    responseDeadline: new Date().toISOString(),
    vehicle: {
      type: 'car',
      make: 'Hyundai',
      model: 'Creta',
      variant: '1.5 Turbo Petrol SX(O) DCT',
      year: 2021,
      fuel: 'Petrol',
      transmission: 'DCT/DSG',
      registrationNumber: 'KA 03 MX 4921',
      complexity: 'complex',
    },
    location: {
      city: 'Bengaluru',
      area: 'HSR Layout Sector 2',
      address: '#412, 14th Main, 5th Cross, HSR Sector 2',
      landmark: 'Near BDA Complex',
      pincode: '560102',
      sellerName: 'Vikas Mehta',
      sellerPhone: '+91 98220 11223',
      sellerRelationship: 'owner',
      askingPrice: 1250000,
      accessNotes: 'Basement visitor parking slot B4.',
    },
    appointment: {
      date: new Date().toISOString().split('T')[0],
      window: '02:30 PM - 04:30 PM',
    },
    payoutAmount: 1750,
    checklist: DEFAULT_CHECKLIST,
    reportVersion: 1,
  },
  {
    id: 'JOB-2026-703',
    bookingRef: 'SV-2026-8901',
    status: 'submitted',
    responseDeadline: new Date().toISOString(),
    vehicle: {
      type: 'car',
      make: 'Hyundai',
      model: 'Creta',
      variant: '1.5 Turbo Petrol SX(O) DCT',
      year: 2021,
      fuel: 'Petrol',
      transmission: 'DCT/DSG',
      registrationNumber: 'KA 03 MX 4921',
      complexity: 'complex',
    },
    location: {
      city: 'Bengaluru',
      area: 'Koramangala 4th Block',
      address: '#88, 80ft Road, Koramangala',
      pincode: '560034',
      sellerName: 'Suresh Kumar',
      sellerPhone: '+91 98860 99887',
      sellerRelationship: 'owner',
      askingPrice: 1180000,
    },
    appointment: {
      date: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString().split('T')[0],
      window: '09:00 AM - 11:00 AM',
    },
    payoutAmount: 1750,
    checklist: DEFAULT_CHECKLIST,
    reportVersion: 1,
    reportSubmittedAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
    payoutEligibilityAt: new Date(Date.now() + 34 * 60 * 60 * 1000).toISOString(), // 34h left on 48h timer
    reportHealthScore: 84,
    reportRecommendation: 'Fair Deal with Minor Repairs',
    visitEvidence: {
      specialistPhotoUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
      numberPlatePhotoUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=600&q=80',
      odometerPhotoUrl: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=600&q=80',
      odometerKm: 34820,
      arrivedAt: new Date(Date.now() - 15 * 60 * 60 * 1000).toISOString(),
      gpsCoords: '12.9121° N, 77.6446° E',
    },
  },
];

const INITIAL_TRANSACTIONS: WalletTransaction[] = [
  {
    id: 'TXN-901',
    timestamp: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
    jobRef: 'SV-2026-8901',
    type: 'credit_pending',
    amount: 1750,
    description: 'Inspection payout credit (48-hr quality timer active)',
    balanceAfter: 6850,
    status: 'pending',
  },
  {
    id: 'TXN-900',
    timestamp: new Date(Date.now() - 52 * 60 * 60 * 1000).toISOString(),
    jobRef: 'SV-2026-8799',
    type: 'release_available',
    amount: 1500,
    description: 'Automatic release: 48-hr timer expired with zero flags',
    balanceAfter: 6850,
    status: 'completed',
  },
  {
    id: 'TXN-899',
    timestamp: new Date(Date.now() - 120 * 60 * 60 * 1000).toISOString(),
    jobRef: 'WDR-2026-381',
    type: 'withdrawal',
    amount: -4500,
    description: 'Bank transfer payout to HDFC •••• 9821 (IMPS)',
    balanceAfter: 5350,
    status: 'completed',
  },
];

const SpecialistContext = createContext<SpecialistContextType | undefined>(undefined);

export const SpecialistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [specialist] = useState<SpecialistProfile>(DEFAULT_PROFILE);
  const [isAvailable, setIsAvailable] = useState<boolean>(true);

  const [jobs, setJobs] = useState<SpecialistJob[]>(() => {
    const saved = localStorage.getItem('sv_specialist_jobs');
    return saved ? JSON.parse(saved) : INITIAL_JOBS;
  });

  const [transactions, setTransactions] = useState<WalletTransaction[]>(() => {
    const saved = localStorage.getItem('sv_specialist_txns');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [availableBalance, setAvailableBalance] = useState<number>(() => {
    const saved = localStorage.getItem('sv_specialist_avail_balance');
    return saved ? Number(saved) : 6850;
  });

  useEffect(() => {
    localStorage.setItem('sv_specialist_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('sv_specialist_txns', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('sv_specialist_avail_balance', availableBalance.toString());
  }, [availableBalance]);

  const getJobById = (id: string) => {
    return jobs.find((j) => j.id === id);
  };

  const acceptJob = (id: string) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, status: 'accepted' } : j))
    );
  };

  const rejectJob = (id: string, reason: string) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, status: 'rejected' } : j))
    );
  };

  const startNavigation = (id: string) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, status: 'en_route' } : j))
    );
  };

  const submitVisitEvidence = (
    id: string,
    evidence: {
      specialistPhotoUrl: string;
      numberPlatePhotoUrl: string;
      odometerPhotoUrl: string;
      odometerKm: number;
      gpsCoords: string;
    }
  ) => {
    setJobs((prev) =>
      prev.map((j) =>
        j.id === id
          ? {
              ...j,
              status: 'arrived',
              visitEvidence: {
                ...evidence,
                arrivedAt: new Date().toISOString(),
              },
            }
          : j
      )
    );
  };

  const updateChecklistItem = (
    jobId: string,
    itemId: string,
    grade: ChecklistGrade,
    remarks?: string,
    reason?: string,
    photoUrls?: string[],
    indicativeCost?: any
  ) => {
    setJobs((prev) =>
      prev.map((job) => {
        if (job.id !== jobId) return job;
        const updatedChecklist = job.checklist.map((item) => {
          if (item.id !== itemId) return item;
          return {
            ...item,
            grade,
            remarks: remarks !== undefined ? remarks : item.remarks,
            notInspectedReason: reason !== undefined ? reason : item.notInspectedReason,
            photoEvidenceUrls: photoUrls || item.photoEvidenceUrls,
            indicativeCost: indicativeCost || item.indicativeCost,
          };
        });
        return { ...job, checklist: updatedChecklist, status: 'inspecting' };
      })
    );
  };

  const submitInspectionReport = (jobId: string) => {
    const job = getJobById(jobId);
    if (!job) return;

    // Calculate score
    const totalItems = job.checklist.length;
    const goodCount = job.checklist.filter((i) => i.grade === 'good').length;
    const avgCount = job.checklist.filter((i) => i.grade === 'average').length;
    const poorCount = job.checklist.filter((i) => i.grade === 'poor' || i.grade === 'critical').length;

    let score = Math.round(((goodCount * 1.0 + avgCount * 0.7) / totalItems) * 100);
    if (poorCount > 0) score = Math.max(40, score - poorCount * 8);

    const recommendation =
      score >= 85
        ? 'Strong Buy'
        : score >= 70
        ? 'Fair Deal with Minor Repairs'
        : score >= 55
        ? 'Negotiate Heavily'
        : 'Walk Away / High Risk';

    const submittedAt = new Date().toISOString();
    const payoutEligibilityAt = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();

    const updatedJob: SpecialistJob = {
      ...job,
      status: 'submitted',
      reportVersion: 1,
      reportSubmittedAt: submittedAt,
      payoutEligibilityAt,
      reportHealthScore: score,
      reportRecommendation: recommendation,
      indicativeTotalRepairCost: { min: 8500, max: 16000 },
    };

    setJobs((prev) => prev.map((j) => (j.id === jobId ? updatedJob : j)));

    // Create wallet ledger pending entry
    const newTxn: WalletTransaction = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: submittedAt,
      jobRef: job.bookingRef,
      type: 'credit_pending',
      amount: job.payoutAmount,
      description: `Inspection completed for ${job.vehicle.make} ${job.vehicle.model} (48-hr timer started)`,
      balanceAfter: availableBalance,
      status: 'pending',
    };

    setTransactions((prev) => [newTxn, ...prev]);
  };

  const submitReportCorrection = (jobId: string, reason: string) => {
    setJobs((prev) =>
      prev.map((j) => {
        if (j.id !== jobId) return j;
        return {
          ...j,
          reportVersion: j.reportVersion + 1,
          reportSubmittedAt: new Date().toISOString(),
        };
      })
    );
  };

  const requestWithdrawal = (amount: number) => {
    if (amount <= 0 || amount > availableBalance) {
      return { success: false, error: 'Invalid withdrawal amount' };
    }

    const refId = `WDR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBalance = availableBalance - amount;
    setAvailableBalance(newBalance);

    const txn: WalletTransaction = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString(),
      jobRef: refId,
      type: 'withdrawal',
      amount: -amount,
      description: `IMPS transfer to verified bank account (Ref: ${refId})`,
      balanceAfter: newBalance,
      status: 'completed',
    };

    setTransactions((prev) => [txn, ...prev]);
    return { success: true, refId };
  };

  // Pending balance total from submitted jobs within 48h
  const pendingTotal = jobs
    .filter((j) => j.status === 'submitted')
    .reduce((acc, curr) => acc + curr.payoutAmount, 0);

  return (
    <SpecialistContext.Provider
      value={{
        specialist,
        isAvailable,
        setIsAvailable,
        jobs,
        walletBalance: {
          pending: pendingTotal,
          available: availableBalance,
          lifetimeWithdrawn: 34500,
        },
        transactions,
        getJobById,
        acceptJob,
        rejectJob,
        startNavigation,
        submitVisitEvidence,
        updateChecklistItem,
        submitInspectionReport,
        submitReportCorrection,
        requestWithdrawal,
      }}
    >
      {children}
    </SpecialistContext.Provider>
  );
};

export const useSpecialist = () => {
  const context = useContext(SpecialistContext);
  if (!context) {
    throw new Error('useSpecialist must be used within a SpecialistProvider');
  }
  return context;
};
