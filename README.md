# SahiVahan — Specialist Field Application (`sahivahan-specialist-app`)

> **"Sahi Gaadi. Sahi Faisla."**  
> Mobile-first Progressive Web Application designed for certified automotive mechanics & inspection specialists conducting on-site pre-purchase inspections.

---

## 📌 Overview

The **Specialist Field Application** is an on-site diagnostic tool built for SahiVahan's fleet of certified automotive technicians (ASDC/Bosch certified). Optimized for outdoor, one-handed mobile use in direct sunlight and noisy garage environments, it guides the specialist from SLA-governed job dispatch to mandatory 3-point geotagged arrival verification, structured 200+ point multi-system inspections, automatic health score calculation, report version locking (`v1.0`), and 48-hour escrow wallet payouts.

---

## 🚀 Key Features

### 1. SLA-Governed Job Dispatch & Radar (`/specialist/dashboard`)
- **Real-Time Job Allocation**: Instant notifications of newly assigned inspection bookings with vehicle specifications and appointment time windows.
- **SLA Urgency Timers**: Visual countdown timer requiring specialists to accept or reject assignments within a strict response deadline (e.g., 15 minutes) before automatic reassignment to the next available specialist in the zone.
- **Telemetry & Availability Toggle**: One-tap toggle to switch between `Online` (accepting dispatches) and `Offline` states.
- **Daily Performance Snapshot**: Quick metrics showing jobs completed today, pending visits, and accrued earnings.

---

### 2. Job Telemetry & Turn-by-Turn Navigation (`/specialist/jobs/:id`)
- **Vehicle Dossier**: Make, model, variant, year, transmission, fuel type, and complexity rating (Standard, Complex, Luxury/EV).
- **Seller & Location Intelligence**: Seller name, direct call button, relationship indicator (Direct Owner, Used Car Dealer, Broker), asking price, parking access instructions, and exact address.
- **Navigation Integration**: One-click turn-by-turn navigation link launching Google Maps directly to the seller's doorstep or dealership yard.

---

### 3. Mandatory 3-Point Geotagged Visit Evidence (`/specialist/jobs/:id/checkin`)
To eliminate fraud and prevent "armchair inspections," the checklist remains locked until the technician physically arrives on site and uploads **3 verifiable geotagged photo proofs**:
1. **Specialist Selfie with Vehicle**: Specialist standing in front of the vehicle showing face and badge.
2. **Registration Plate Close-up**: High-resolution image of the front/rear registration plate.
3. **Odometer Cluster & Mileage Entry**: Sharp photo of the instrument cluster with current odometer reading (entered in km and cross-verified against seller claims).
- **GPS Coordinates & Arrival Timestamp**: Automatic capture of latitude/longitude coordinates matching the appointment pincode within an acceptable proximity radius.

---

### 4. 200+ Point Touch-Optimized Inspection Checklist (`/specialist/jobs/:id/inspect`)
- **Designed for Outdoor Field Operations**: High-contrast dark UI with oversized touch targets operable with gloved or greasy hands.
- **6 Inspection System Modules**:
  1. **Body & Paint**: Paint thickness gauge readings (microns), dent/scratch severity mapping, structural apron & pillar inspection, panel replacement detection.
  2. **Engine & Transmission**: Fluid levels & leaks (engine oil, coolant, brake fluid), engine blow-by check, cold start behavior, transmission shift quality, clutch bite point.
  3. **Steering & Suspension**: Strut leaks, tie-rod end play, steering rack backlash, wheel alignment pull, bump response.
  4. **Brakes & Wheels**: Disc rotor lip/groove assessment, brake pad remaining thickness, tire tread depth (mm) across all 5 tires, rim bend/crack checks.
  5. **Electricals & Interior**: AC chilling temperature test, infotainment & audio system, power windows, airbag warning light sequence, flood watermark inspection under carpet/seatbelts.
  6. **Road Test & OBD-II Diagnostics**: Active OBD-II error code scanning, ABS/ESP response, acceleration response, differential whine, exhaust smoke color.
- **5-State Grading Scale**:
  - `Good`: Flawless condition, within factory specifications.
  - `Average`: Minor cosmetic or age-appropriate wear, functional.
  - `Poor`: Noticeable degradation requiring near-term maintenance.
  - `Critical`: Severe mechanical, safety, or structural defect requiring immediate replacement.
  - `Not Inspected`: Checkpoint skipped with mandatory documented justification (e.g., seller refused highway road test).
- **Defect Evidence & Cost Projections**: For any defect graded *Poor* or *Critical*, specialists can:
  - Capture and annotate high-resolution defect photographs.
  - Record voice-to-text dictation notes.
  - Estimate parts and labor cost ranges (Min to Max) and assign repair urgency (*Immediate*, *Medium*, *Advisory*).

---

### 5. Report Locking & Versioning (`/specialist/jobs/:id/submit`)
- **Automated Health Score Computation**: Algorithmic score (0-100) generated instantly based on weighted checkpoint findings across structural, powertrain, and cosmetic categories.
- **Recommendation Engine**: Categorizes the vehicle as:
  - 🟢 **Buy with Confidence**: High score (> 85), minimal wear, clean diagnostics.
  - 🟡 **Negotiate Price**: Moderate score (70-84), minor defects with itemized repair costs to use as bargaining leverage.
  - 🔴 **Walk Away**: Low score (< 70) or critical frame/engine failure defects.
- **Immutable v1.0 Lock**: Submitting the report permanently locks `v1.0` and dispatches it immediately to the customer and admin command center. Any post-submission adjustment requires administrative review and generates an immutable `v2.0` audit trail.

---

### 6. Escrow Wallet & Instant IMPS Bank Payouts (`/specialist/wallet`)
- **48-Hour Dispute Holding Timer**: Specialist payout is deposited into a pending escrow holding state for exactly 48 hours following report submission. This safeguards the customer dispute resolution window while providing complete visibility to the specialist.
- **Live Release Countdown**: Real-time visual countdown timers on each pending payout card.
- **Instant IMPS Payouts**: Once the 48-hour holding period clears without unresolved disputes, funds move to the *Available Balance* for instant, 24x7 IMPS withdrawal to verified bank accounts.
- **Immutable Transaction Ledger**: Complete record of pending credits, released earnings, completed withdrawals, and incentive adjustments.

---

### 7. Quality Scorecard & Professional Profile (`/specialist/quality` & `/specialist/profile`)
- **Field Performance KPIs**:
  - Customer Rating (Target > 4.8 / 5.0).
  - SLA Punctuality Rate (Target > 95%).
  - Defect Catch Accuracy.
  - Dispute Ratio (Target < 2%).
- **Tier-1 Specialist Incentive**: Top-performing technicians unlock Tier-1 status, conferring a **+10% bonus payout** on every completed inspection.
- **KYC & Credential Dossier**:
  - Government identity verification (Aadhaar UIDAI, Driving License, Police Clearance).
  - Automotive trade certifications (ASDC, Bosch, ITI Motor Mechanic Vehicle).
  - Calibrated tool registry (Paint thickness gauge, OBD-II scanner, Battery load tester) with calibration validity tracking.

---

## 🛠 Tech Stack & Architecture

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Framework** | [React 18](https://react.dev/) | Mobile-first component architecture |
| **Bundler / Tooling** | [Vite 5](https://vitejs.dev/) | Instant HMR and low-overhead bundle generation |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Type-safe domain models for checklists, jobs, and transactions |
| **Styling** | [TailwindCSS 3](https://tailwindcss.com/) | Custom "Field Dark" high-contrast theme |
| **Routing** | [React Router v6](https://reactrouter.com/) | Mobile route transitions and path parameters |
| **Icons** | [Lucide React](https://lucide.dev/) | Sharp iconography for mechanical tools and status indicators |
| **State Management** | React Context API | `SpecialistContext.tsx` (offline-ready active job and wallet state) |

---

## 🎨 Design System: "Field Dark" Theme

The specialist application employs a purpose-built **Field Dark** design system:
- **Base Canvas (`#0A0E12`) & Cards (`#12181E`)**: Ultra-dark background drastically reduces battery consumption on OLED displays during outdoor field usage while maximizing sunlight contrast.
- **Primary Donezo Green (`#154D3F`) & Emerald (`#10B981`)**: Highlights active actions, completed tasks, and verified proofs.
- **Severity Alerts**:
  - Good: `#10B981` (Emerald)
  - Average / Advisory: `#F59E0B` (Amber)
  - Critical / Defect: `#EF4444` (Crimson)
- **High-Density Typography**: Clean sans-serif (`Plus Jakarta Sans`) paired with monospace (`JetBrains Mono`) for technical measurements, OBD codes, and monetary values.

---

## 📁 Project Directory Structure

```text
apps/specialist-app/
├── index.html                  # HTML entry point
├── package.json                # Project dependencies & scripts
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Field Dark color tokens
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration (Port 3001)
└── src/
    ├── App.tsx                 # Root component with providers
    ├── main.tsx                # Entry point
    ├── index.css               # Global styles & touch utilities
    ├── components/
    │   └── layout/             # SpecialistLayout, SpecialistHeader, MobileBottomNav
    ├── pages/
    │   ├── DashboardPage.tsx               # Active dispatch radar, SLA timers, online toggle
    │   ├── JobDetailPage.tsx              # Vehicle specs, seller contact, directions
    │   ├── VisitEvidenceCheckinPage.tsx   # Mandatory 3-point geotagged check-in
    │   ├── ChecklistPage.tsx              # 200+ point touch-friendly grading checklist
    │   ├── ReportSubmitPage.tsx           # Health score preview, recommendation, v1.0 lock
    │   ├── WalletPage.tsx                 # 48-hour escrow countdown & IMPS payouts
    │   ├── QualityScorecardPage.tsx       # SLA punctuality, rating, Tier-1 bonus tracker
    │   ├── SpecialistProfilePage.tsx      # KYC docs, ASDC certs, calibrated tool inventory
    │   └── SpecialistLoginPage.tsx        # Fast role-switcher / PIN login for field testing
    ├── router/
    │   └── index.tsx           # React Router v6 definitions
    ├── store/
    │   ├── SpecialistContext.tsx # Central field workflow state & wallet management
    │   └── ThemeContext.tsx      # Field Dark / High-Contrast mode
    └── types/
        └── specialist.ts       # JobStatus, ChecklistGrade, InspectionChecklistItem, SpecialistJob
```

---

## 🛣 Route Inventory

| Route | Page Component | Purpose |
| :--- | :--- | :--- |
| `/specialist/login` | `SpecialistLoginPage` | Technician authentication with demo profile presets |
| `/specialist/dashboard` | `DashboardPage` | Dispatch radar, SLA countdowns, and online/offline switch |
| `/specialist/jobs/:id` | `JobDetailPage` | Vehicle specs, seller relationship info, turn-by-turn navigation |
| `/specialist/jobs/:id/checkin` | `VisitEvidenceCheckinPage` | Mandatory 3-point geotagged photo arrival verification |
| `/specialist/jobs/:id/inspect` | `ChecklistPage` | 200+ point multi-system checklist with defect photos & costs |
| `/specialist/jobs/:id/submit` | `ReportSubmitPage` | Health score review, purchase recommendation, v1.0 report lock |
| `/specialist/wallet` | `WalletPage` | 48-hour escrow countdown timers & instant IMPS withdrawals |
| `/specialist/quality` | `QualityScorecardPage` | Scorecard, dispute rates, punctuality, and Tier-1 +10% bonus |
| `/specialist/profile` | `SpecialistProfilePage` | KYC verification status, ASDC certs, tool calibration dates |

---

## 💻 Development & Running Locally

### Prerequisites
- Node.js `v18.0.0` or higher
- npm `v9.0.0` or higher

### Installation
From the root of the monorepo or from this directory:
```bash
cd apps/specialist-app
npm install
```

### Start Development Server
```bash
npm run dev
```
The application will be accessible at:
👉 **`http://127.0.0.1:3001/`**

### Build for Production
```bash
npm run build
```
Generates an optimized, production-ready bundle in `dist/`.

### Preview Production Build
```bash
npm run preview
```

---

## 🔗 Related Applications in SahiVahan
- [Customer Portal (`apps/customer-portal`)](../customer-portal/README.md) — Consumer booking funnel, 7-stage live tracking, and interactive vehicle health reports.
- [Admin Command Center (`apps/admin-portal`)](../admin-portal/README.md) — Central operations hub for dispatch radar, specialist KYC vetting, report QA flags, and financial settlement.
