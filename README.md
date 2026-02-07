
# Traviit - Human-Centric Transparency in Hiring

Traviit is an elite talent marketplace tailored for the Algerian market, focusing on transparency, privacy, and verified skills. It connects top-tier talent with companies while giving candidates full control over their data.

## 🌟 Features

### For Talent
-   **Anonymous Listing**: Profiles are listed with verified skills but personal contact details are hidden until interest is explicitly approved.
-   **Unified CV Builder**: A comprehensive, multi-step wizard to build a standardized, professional CV.
    -   Personal Information (Identity, Contact, Socials).
    -   Target Job (Career Goal, Employment Type, Salary).
    -   Professional Experience (Roles, Achievements).
    -   Education & Skills (Hard/Soft skills, Languages).
    -   Administrative Logic (Military Service, Driving Permits).
-   **Live Preview**: Real-time visualization of the generated CV.
-   **Image Export**: One-click download of the CV as a high-quality image.
-   **Dashboard**: Track profile views and interest requests (Mockup/In-progress).

### For Recruiters
-   **Dedicated Landing**: Specialized section directing recruiters to the enterprise platform.
-   **Verified Talent**: Access to a pool of pre-vetted candidates via the external recruiter portal.

### General
-   **Bilingual Support**: Full support for English (LTR) and Arabic (RTL) with dynamic UI mirroring.
-   **Dark/Light Mode**: System-aware theming with a manual toggle.
-   **Glassmorphism UI**: Modern, aesthetic interface with dynamic background animations.
-   **Supabase Integration**: Robust authentication and database persistence.

## 🛠 Tech Stack

-   **Frontend**: React 19, TypeScript
-   **Styling**: Tailwind CSS (via CDN with plugins)
-   **Icons**: Google Material Symbols
-   **Fonts**: Inter (English), Cairo (Arabic)
-   **State Management**: React Context API (Language, Auth)
-   **Backend**: Supabase (PostgreSQL, Auth)
-   **Utilities**: `dom-to-image` (CV export)

## 📂 Project Structure

```
/
├── index.html              # Entry point, Import maps, Tailwind config
├── index.tsx               # React Root
├── App.tsx                 # Main routing and layout logic
├── metadata.json           # Project metadata
├── .env.local              # Environment variables
├── README.md               # Project Documentation
├── components/             # UI Components
│   ├── Auth/               # Authentication related components
│   │   ├── AuthPage.tsx        # Main Auth Wrapper
│   │   ├── CandidateWizard.tsx # Multi-step CV Builder
│   │   ├── LoginForm.tsx       # Sign In Form
│   │   └── RecruiterForm.tsx   # (Legacy/Internal) Recruiter Signup
│   ├── Button.tsx          # Reusable Button component
│   ├── Navbar.tsx          # Responsive Navigation
│   ├── Hero.tsx            # Landing Page Hero
│   ├── Features.tsx        # Features Section
│   ├── Timeline.tsx        # How it works
│   ├── DashboardPreview.tsx# UI Mockup
│   ├── Testimonials.tsx    # User reviews
│   ├── CtaSection.tsx      # Call to Action
│   ├── RecruiterLanding... # Recruiter specific section
│   ├── ContactSection.tsx  # Contact Form
│   ├── Footer.tsx          # Footer
│   ├── SearchableSelect.tsx# Custom Dropdown
│   └── MonthYearPicker.tsx # Date input helper
├── contexts/
│   └── LanguageContext.tsx # i18n Logic
├── utils/
│   ├── constants.ts        # Static data (Wilayas, Skills)
│   ├── translations.ts     # Dictionary for EN/AR
│   └── supabaseClient.ts   # Supabase configuration & API methods
└── types/
    └── forms.ts            # TypeScript interfaces for CV data
```

## 🚀 Setup & Installation

This project uses a browser-native ES Module setup via `importmap` in `index.html`. It does not require a complex build step like Webpack for development, but runs via any static file server.

### Prerequisites
1.  A Supabase project.
2.  Enable Email/Password Auth in Supabase.
3.  Execute the Database Schema (see below).

### Environment Variables
Ensure the `.env.local` (or standard environment config) is set up. Note: Since this is a browser-based setup, variables typically need to be injected or hardcoded in `utils/supabaseClient.ts` if no bundler is used to replace `process.env`.

```env
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_anon_key
```

### Database Schema (Supabase SQL)

Run the following SQL in your Supabase SQL Editor to set up the required tables for the V3 Schema:

```sql
-- Profiles Table
create table public.profiles (
  id uuid references auth.users not null,
  updated_at timestamp with time zone,
  full_name text,
  user_type text check (user_type in ('job_seeker', 'recruiter')),
  phone text,
  primary key (id)
);

-- Candidates Table
create table public.candidates (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id),
  full_name text,
  email text,
  industry text,
  location text,
  years_experience int,
  skills text[],
  status text default 'active'
);

-- CV Versions Table
create table public.cv_versions (
  id uuid default uuid_generate_v4() primary key,
  candidate_id uuid references public.candidates(id),
  version_number int,
  education jsonb,
  work_history jsonb,
  created_at timestamp with time zone default now()
);

-- Companies Table (For Recruiter Logic)
create table public.companies (
  id uuid default uuid_generate_v4() primary key,
  name text,
  industry text,
  location text
);

-- Company Members
create table public.company_members (
  id uuid default uuid_generate_v4() primary key,
  company_id uuid references public.companies(id),
  recruiter_id uuid references auth.users(id),
  role text
);
```

## 📖 Component Documentation

### `CandidateWizard.tsx`
The core component for talent onboarding. It manages a complex state object `UnifiedCV` and handles:
-   **Validation**: Per-step validation logic.
-   **Persistence**: Saves progress to Supabase.
-   **Generation**: Renders the CV preview and handles DOM-to-Image conversion.

### `SearchableSelect.tsx`
A custom dropdown component that supports:
-   Filtering options via text input.
-   Grouping options (`optgroup` style) via `OptionGroup` interface.
-   Creating new options on the fly (if `creatable` prop is true).

### `LanguageContext.tsx`
Provides global access to the current language (`en` or `ar`), the `t()` translation function, and the document direction (`dir`). It persists user preference in `localStorage`.

## 🔄 Updates & Changelog

### v1.1.0 - Recruiter & Login Update
-   **Recruiter Flow**: Removed direct recruiter signup from the main auth flow. Added `RecruiterLandingSection` to redirect corporate users to an external platform.
-   **Login**: Added dedicated `LoginForm` component for returning users.
-   **AuthPage**: Refactored to manage `login` vs `signup` views dynamically.
-   **Navigation**: Updated Navbar buttons to trigger specific auth modes.
-   **UI Consistency**: Applied global `Button` component across authentication screens.

### v1.0.0 - Initial Release
-   Complete Talent Wizard.
-   Landing page with comprehensive sections.
-   Supabase integration.
