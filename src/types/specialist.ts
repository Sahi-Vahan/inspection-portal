export type JobStatus =
  | 'assigned'
  | 'accepted'
  | 'en_route'
  | 'arrived'
  | 'inspecting'
  | 'submitted'
  | 'rejected';

export type ChecklistGrade = 'good' | 'average' | 'poor' | 'critical' | 'not_inspected';

export interface InspectionChecklistItem {
  id: string;
  category: string;
  title: string;
  grade: ChecklistGrade;
  remarks?: string;
  notInspectedReason?: string;
  photoEvidenceUrls?: string[];
  indicativeCost?: {
    partsMin: number;
    partsMax: number;
    laborMin: number;
    laborMax: number;
    urgency: 'immediate' | 'medium' | 'advisory';
  };
}

export interface SpecialistJob {
  id: string;
  bookingRef: string;
  status: JobStatus;
  responseDeadline: string; // ISO
  vehicle: {
    type: 'car' | 'bike';
    make: string;
    model: string;
    variant: string;
    year: number;
    fuel: string;
    transmission: string;
    registrationNumber?: string;
    complexity: 'standard' | 'complex' | 'luxury_or_specialist';
  };
  location: {
    city: string;
    area: string;
    address: string;
    landmark?: string;
    pincode: string;
    sellerName: string;
    sellerPhone: string;
    sellerRelationship: string;
    askingPrice?: string | number;
    accessNotes?: string;
  };
  appointment: {
    date: string;
    window: string;
  };
  payoutAmount: number; // e.g. ₹1,500
  visitEvidence?: {
    specialistPhotoUrl: string;
    numberPlatePhotoUrl: string;
    odometerPhotoUrl: string;
    odometerKm: number;
    arrivedAt: string;
    gpsCoords: string;
  };
  checklist: InspectionChecklistItem[];
  reportVersion: number;
  reportSubmittedAt?: string;
  payoutEligibilityAt?: string; // 48 hours after submittedAt
  reportHealthScore?: number;
  reportRecommendation?: string;
  indicativeTotalRepairCost?: {
    min: number;
    max: number;
  };
}

export interface WalletTransaction {
  id: string;
  timestamp: string;
  jobRef: string;
  type: 'credit_pending' | 'release_available' | 'withdrawal' | 'adjustment';
  amount: number;
  description: string;
  balanceAfter: number;
  status: 'pending' | 'completed' | 'on_hold';
}
