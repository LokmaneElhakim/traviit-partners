
// =========================
// Shared Types
// =========================

export type ProficiencyLevel =
  | "native"
  | "beginner"
  | "intermediate"
  | "good"
  | "advanced";

export type EmploymentStatus =
  | "employed"
  | "unemployed"
  | "student";

export type CareerStage = 
  | "student"
  | "intern"
  | "fresh_graduate"
  | "junior"
  | "mid_level"
  | "senior"
  | "executive";

export type EmploymentType = 
  | "full_time"
  | "part_time"
  | "freelance"
  | "internship"
  | "temporary"
  | "contract";

export type NationalServiceStatus =
  | "exempted"
  | "postponed"
  | "completed"
  | "not_concerned";

export type AddressType = "home" | "work" | "other";

export type YesNo = "yes" | "no";

// =========================
// CV Root Interface
// =========================

export interface UnifiedCV {
  documentLanguage: 'en' | 'ar' | 'fr';
  personalInfo: PersonalInfo;
  targetJob: TargetJobInfo;
  professionalExperiences: ProfessionalExperience[];
  skills: SkillsSection;
  education: EducationSection[];
  languages: LanguageSkill[];
  organizationalInfo: OrganizationalAndAdministrativeInfo;
  additionalInfo: AdditionalMarketSpecificInfo;
}

// =========================
// 1️⃣ Personal Information (Expanded)
// =========================

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  aboutMe: string; // General introduction
  
  // Demographics
  dateOfBirth: string;
  placeOfBirth: string;
  gender: 'male' | 'female';
  nationality: string;

  // Contact
  email: string;
  phoneNumber: string;
  socialMedia: {
    linkedIn: string;
    website: string;
    otherLink: string; // Changed from portfolio
    github: string;
  };
  messaging: {
    whatsapp: string;
    viber: string;
    telegram: string;
  };

  // Address
  address: {
    type: AddressType;
    streetAddress: string;
    postalCode: string;
    city: string; // Will hold the Wilaya
    country: string;
  };
}

// =========================
// 2️⃣ Target Job / Professional Goal (New)
// =========================

export interface TargetJobInfo {
  title: string;
  preferredLocation: string; // Wilaya or City
  targetCompany?: string; // Specific company they want to work for
  careerStage: CareerStage;
  employmentTypes: EmploymentType[]; // Can select multiple
  careerGoal: string; // The "Objective" text
  noticePeriod?: string; // Replaced expectedSalary
}

// =========================
// 3️⃣ Professional Experiences
// =========================

export interface ProfessionalExperience {
  id: string; 
  jobTitle: string;
  companyName: string;
  companyLocation: string;
  locationType?: 'on_site' | 'hybrid' | 'remote'; // Optional
  employmentType?: string; // Optional
  description?: string; // Optional
  skillsUsed?: string[]; // Optional
  companyActivityDescription?: string;
  period: {
    start: string; 
    end: string;   
    isCurrent: boolean; 
  };
  keyAchievements: string[]; 
}

// =========================
// 4️⃣ Skills
// =========================

export interface SkillsSection {
  hardSkills: string[]; 
  softSkills: string[]; 
}

// =========================
// 5️⃣ Education & Certifications
// =========================

export interface EducationSection {
  id: string; 
  qualification: string;
  institution: string;
  graduationYear: string; 
  certificationsOrCourses?: string[];
}

// =========================
// 6️⃣ Languages
// =========================

export interface LanguageSkill {
  language: string;
  level: ProficiencyLevel;
}

// =========================
// 7️⃣ Organizational & Administrative Info
// =========================

export interface OrganizationalAndAdministrativeInfo {
  socialHabitsAffectingWork?: {
    smoking?: YesNo;
    otherFactors?: string;
  };
  accommodationRequired: YesNo;
  professionalReference?: {
    supervisorName?: string;
    supervisorPhone?: string;
    relationship?: string;
  };
}

// =========================
// 8️⃣ Additional Market-Specific Info (Algeria)
// =========================

export interface AdditionalMarketSpecificInfo {
  nationalServiceStatus: NationalServiceStatus;
  drivingPermits: string[]; 
  personalPhotoUrl?: string; 
}

// =========================
// Recruiter Types
// =========================
export interface RecruiterRegistration {
  recruiterInfo: RecruiterInfo;
  companyDetails: {
    companyName: string;
    industry: string;
    website: string;
  };
}

export interface RecruiterInfo {
  recruiterName: string;
  department: string;
  positionTitle: string;
  email: string;
}
