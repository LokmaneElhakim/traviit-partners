
"use client";

import React, { useState, useMemo } from 'react';
import Button from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';
import { saveCandidateCV } from '../../utils/supabaseClient';
import SearchableSelect from '../ui/SearchableSelect';
import Select from '../ui/Select';
import InputField from '../ui/InputField';
import TextAreaField from '../ui/TextAreaField';
import MonthYearPicker from '../ui/MonthYearPicker';
import { TemplateModern, TemplateClassic, TemplateCreative } from '../cv/CVTemplates';
import { ALGERIAN_WILAYAS } from '../../utils/constants';
import StepEducation from './steps/StepEducation';
import StepSkillsAdmin from './steps/StepSkillsAdmin';
import { 
  UnifiedCV, 
  ProfessionalExperience, 
  CareerStage
} from '../../types/forms';
import StatsCard from '../ui/StatsCard';

// Internal Candidate Dashboard Component
const CandidateDashboard = ({ onLogout, candidateName }: { onLogout: () => void, candidateName: string }) => {
    const { t } = useLanguage();
    
    return (
        <div className="w-full h-full min-h-screen bg-gray-50 dark:bg-[#0B1120] flex flex-col animate-fadeIn">
            {/* Top Bar */}
            <div className="bg-white dark:bg-[#0F1623] border-b border-gray-200 dark:border-white/5 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-electric-blue rounded-full flex items-center justify-center text-white font-bold">
                        {candidateName.charAt(0)}
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-gray-900 dark:text-white">{t('dash.welcome')}, {candidateName}</h2>
                        <span className="text-xs text-green-500 font-medium flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            {t('dash.status.active')}
                        </span>
                    </div>
                </div>
                <Button variant="ghost" size="sm" onClick={onLogout} leftIcon={<span className="material-symbols-outlined rtl-mirror">logout</span>}>
                    {t('nav.logout')}
                </Button>
            </div>

            <div className="p-6 max-w-7xl mx-auto w-full flex-1">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatsCard label={t('dash.stats.views')} value="12" icon="visibility" trend="up" />
                    <StatsCard label={t('dash.stats.appears')} value="45" icon="search" trend="up" />
                    <StatsCard label={t('dash.stats.requests')} value="3" icon="person_add" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* CV Preview Section */}
                    <div className="bg-white dark:bg-white/5 rounded-2xl p-6 border border-gray-200 dark:border-white/10">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-lg dark:text-white">My CV</h3>
                            <Button size="sm" variant="outline" leftIcon={<span className="material-symbols-outlined">edit</span>}>
                                {t('dash.editProfile')}
                            </Button>
                        </div>
                        <div className="aspect-[210/297] bg-gray-100 dark:bg-black rounded-xl overflow-hidden relative group">
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                <span className="material-symbols-outlined text-6xl">description</span>
                            </div>
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Button variant="primary">{t('dash.viewCV')}</Button>
                            </div>
                        </div>
                    </div>

                    {/* Notifications / Activity */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-white/5 rounded-2xl p-6 border border-gray-200 dark:border-white/10">
                            <h3 className="font-bold text-lg dark:text-white mb-4">Recent Activity</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                        <span className="material-symbols-outlined text-sm">visibility</span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-900 dark:text-white font-medium">Profile viewed by <span className="font-bold">TechCorp DZ</span></p>
                                        <span className="text-xs text-gray-500">2 hours ago</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                                        <span className="material-symbols-outlined text-sm">check_circle</span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-900 dark:text-white font-medium">CV Verified successfully</p>
                                        <span className="text-xs text-gray-500">1 day ago</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-electric-blue to-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-500/20">
                            <h3 className="font-bold text-lg mb-2">Boost your profile</h3>
                            <p className="text-sm text-blue-100 mb-4">Complete your profile to increase visibility by 200%.</p>
                            <Button size="sm" className="bg-white text-electric-blue hover:bg-gray-100 border-none">Complete Profile</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface CandidateWizardProps {
  onLogout: () => void;
  onDashboardEnter?: () => void;
}

const CandidateWizard: React.FC<CandidateWizardProps> = ({ onLogout, onDashboardEnter }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupError, setSignupError] = useState('');
  const [hasSignedUp, setHasSignedUp] = useState(false);
  const [pendingAction, setPendingAction] = useState<'download' | 'submit' | null>(null);
  
  // Dashboard state
  const [showDashboard, setShowDashboard] = useState(false);

  // Initialize Data
  const initialCV: UnifiedCV = {
    documentLanguage: 'en',
    personalInfo: {
      firstName: '', lastName: '', aboutMe: '', dateOfBirth: '', placeOfBirth: '',
      gender: 'male', nationality: 'Algerian', email: '', phoneNumber: '+213', 
      socialMedia: { linkedIn: '', website: '', otherLink: '', github: '' },
      messaging: { whatsapp: '', viber: '', telegram: '' },
      address: { type: 'home', streetAddress: '', postalCode: '', city: 'Algiers', country: 'Algeria' }
    },
    targetJob: {
      title: '', preferredLocation: '', targetCompany: '', careerStage: 'fresh_graduate',
      employmentTypes: [], careerGoal: ''
    },
    professionalExperiences: [],
    skills: { hardSkills: [], softSkills: [] },
    education: [],
    languages: [],
    organizationalInfo: {
      accommodationRequired: 'no', socialHabitsAffectingWork: { smoking: 'no' },
      professionalReference: { supervisorName: '', supervisorPhone: '', relationship: '' }
    },
    additionalInfo: { nationalServiceStatus: 'exempted', drivingPermits: [], personalPhotoUrl: '' }
  };

  const [cvData, setCvData] = useState<UnifiedCV>(initialCV);
  
  // Experience Step State
  const [isAddingExp, setIsAddingExp] = useState(false);
  const initialExp: ProfessionalExperience = {
    id: '', jobTitle: '', companyName: '', companyLocation: '',
    locationType: 'on_site', employmentType: 'full_time', description: '', skillsUsed: [],
    period: { start: '', end: '', isCurrent: false }, keyAchievements: [], companyActivityDescription: ''
  };
  const [tempExp, setTempExp] = useState<ProfessionalExperience>(initialExp);
  const [achievementsInput, setAchievementsInput] = useState('');

  // Validation
  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (currentStep === 1) {
      if (!cvData.personalInfo.firstName.trim()) { newErrors.firstName = t('msg.required'); isValid = false; }
      if (!cvData.personalInfo.lastName.trim()) { newErrors.lastName = t('msg.required'); isValid = false; }
      if (!cvData.personalInfo.email.trim()) { newErrors.email = t('msg.required'); isValid = false; }
      if (!cvData.personalInfo.address.city.trim()) { newErrors.city = t('msg.required'); isValid = false; }
      
      // Phone Validation
      if (!cvData.personalInfo.phoneNumber.trim()) {
          newErrors.phone = t('msg.required');
          isValid = false;
      }
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 6)); 
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  // --- Handlers for Experience (Step 3) ---
  const handleAddExperience = () => {
    if (!tempExp.jobTitle || !tempExp.companyName) return; 
    const newExp = { ...tempExp, id: Date.now().toString(), keyAchievements: achievementsInput.split('\n').filter(s => s.trim()) };
    setCvData({...cvData, professionalExperiences: [newExp, ...cvData.professionalExperiences]});
    setTempExp(initialExp); setAchievementsInput(''); setIsAddingExp(false);
  };
  const handleRemoveExperience = (id: string) => setCvData({...cvData, professionalExperiences: cvData.professionalExperiences.filter(e => e.id !== id)});

  // --- Download & Submit Handlers ---
  const handleDownloadClick = () => {
    if (!hasSignedUp) {
      setPendingAction('download');
      setShowSignupModal(true);
    } else {
      handleDownloadImage(true);
    }
  };

  const handleDownloadImage = async (shouldRedirect = false) => {
    // @ts-ignore
    const lib = (window as any).domtoimage;
    if (!lib) { alert("Image generation library not loaded."); return; }

    setIsGenerating(true);
    setTimeout(async () => {
      const element = document.getElementById('cv-document-hidden') || document.getElementById('cv-document');
      if (!element) { setIsGenerating(false); return; }

      try {
        const dataUrl = await lib.toPng(element, { quality: 1, bgcolor: '#ffffff', style: { 'transform': 'scale(1)', 'transform-origin': 'top left' } });
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `${cvData.personalInfo.firstName}_${cvData.personalInfo.lastName}_CV.png`;
        link.click();
      } catch (err) {
        console.error("Error generating image", err);
      } finally {
        setIsGenerating(false);
        if (shouldRedirect) {
            handleDashboardEnter();
        }
      }
    }, 500);
  };

  const handleFinalSubmit = async () => {
      setSignupError('');
      if (!password.trim()) { setSignupError(t('msg.required')); return; }
      
      setIsSubmitting(true);
      try {
        await saveCandidateCV(cvData, password);
        setHasSignedUp(true);
        setShowSignupModal(false);
        setPassword('');
        
        // Execute pending action after a brief delay for modal close
        setTimeout(() => {
            if (pendingAction === 'download') {
                handleDownloadImage(true);
            } else {
                // Default to entering dashboard if action is submit or generic signup
                handleDashboardEnter();
            }
            setPendingAction(null);
        }, 300);
      } catch (err: any) {
        setSignupError(err.message || "Signup failed");
      } finally {
        setIsSubmitting(false);
      }
  };

  const handleDashboardEnter = () => {
      setShowDashboard(true);
      if (onDashboardEnter) onDashboardEnter();
  };

  if (showDashboard) {
      return <CandidateDashboard onLogout={onLogout} candidateName={cvData.personalInfo.firstName} />;
  }

  const steps = [
    { num: 1, label: t('wizard.step.identity') },
    { num: 2, label: t('wizard.step.target') },
    { num: 3, label: t('wizard.step.experience') },
    { num: 4, label: t('wizard.step.education') },
    { num: 5, label: t('wizard.step.admin') },
    { num: 6, label: t('wizard.step.review') }
  ];

  return (
    <div className="w-full flex justify-center">
      {/* Hidden container for image generation */}
      <div className="absolute top-0 left-[-9999px] overflow-hidden" aria-hidden="true">
           <div id="cv-document-hidden">
             <TemplateClassic cvData={cvData} t={t} />
           </div>
      </div>

      <div className="w-full max-w-4xl pt-2 pb-20">
        
        {/* Improved Step Indicators */}
        <div className="mb-12 px-4 relative">
            {/* Connecting Line */}
            <div className="absolute top-[18px] left-[5%] w-[90%] h-[2px] bg-gray-200 dark:bg-white/10 -z-10 rounded-full"></div>
            <div 
                className="absolute top-[18px] left-[5%] h-[2px] bg-electric-blue -z-10 rounded-full transition-all duration-700 ease-out rtl:right-[5%] rtl:left-auto" 
                style={{ width: `${((step - 1) / (steps.length - 1)) * 90}%` }}
            ></div>

            <div className="flex justify-between items-start">
                {steps.map((s) => {
                    const isCompleted = step > s.num;
                    const isActive = step === s.num;
                    return (
                        <div key={s.num} className="flex flex-col items-center gap-2 cursor-pointer group w-20 text-center" onClick={() => { if (step > s.num) setStep(s.num); }}>
                            <div 
                                className={`
                                    w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300
                                    ${isActive 
                                        ? 'bg-electric-blue text-white ring-4 ring-blue-100 dark:ring-blue-900/30 scale-110 shadow-lg shadow-blue-500/30' 
                                        : isCompleted 
                                            ? 'bg-electric-blue text-white shadow-md' 
                                            : 'bg-white dark:bg-[#0B1120] text-gray-400 border-2 border-gray-200 dark:border-white/10 group-hover:border-electric-blue/50'
                                    }
                                `}
                            >
                                {isCompleted ? <span className="material-symbols-outlined text-sm font-bold">check</span> : s.num}
                            </div>
                            <span 
                                className={`
                                    text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 hidden sm:block
                                    ${isActive ? 'text-electric-blue' : isCompleted ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400'}
                                `}
                            >
                                {s.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>

        <div className="glass-card rounded-[32px] p-8 md:p-12 bg-white/80 dark:bg-[#0F1623]/80 border border-white/40 dark:border-white/5 shadow-xl backdrop-blur-xl animate-fadeIn">
            <div className="mb-10 text-center">
               <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">{t(`wizard.step.desc.${step}`)}</h1>
            </div>

            {/* STEP 1: Personal Info */}
            {step === 1 && (
                <div className="space-y-8 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label={t('form.firstName')} value={cvData.personalInfo.firstName} onChange={(e: any) => setCvData({...cvData, personalInfo: {...cvData.personalInfo, firstName: e.target.value}})} error={errors.firstName} required />
                        <InputField label={t('form.lastName')} value={cvData.personalInfo.lastName} onChange={(e: any) => setCvData({...cvData, personalInfo: {...cvData.personalInfo, lastName: e.target.value}})} error={errors.lastName} required />
                        <InputField label={t('form.email')} type="email" value={cvData.personalInfo.email} onChange={(e: any) => setCvData({...cvData, personalInfo: {...cvData.personalInfo, email: e.target.value}})} error={errors.email} required />
                        <InputField label={t('form.phone')} value={cvData.personalInfo.phoneNumber} onChange={(e: any) => setCvData({...cvData, personalInfo: {...cvData.personalInfo, phoneNumber: e.target.value}})} error={errors.phone} required placeholder="+213..." />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SearchableSelect label={t('form.address.city')} options={ALGERIAN_WILAYAS.map(w => ({value: w, label: w}))} value={cvData.personalInfo.address.city} onChange={(val) => setCvData({...cvData, personalInfo: {...cvData.personalInfo, address: {...cvData.personalInfo.address, city: val}}})} error={errors.city} />
                        <InputField label={t('form.nationality')} value={cvData.personalInfo.nationality} onChange={(e: any) => setCvData({...cvData, personalInfo: {...cvData.personalInfo, nationality: e.target.value}})} />
                    </div>
                    <TextAreaField label={t('form.aboutMe')} value={cvData.personalInfo.aboutMe} onChange={(e: any) => setCvData({...cvData, personalInfo: {...cvData.personalInfo, aboutMe: e.target.value}})} />
                </div>
            )}

            {/* STEP 2: Target Job */}
            {step === 2 && (
              <div className="space-y-8 animate-fadeIn">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label={t('form.targetJobTitle')} value={cvData.targetJob.title} onChange={(e: any) => setCvData({...cvData, targetJob: {...cvData.targetJob, title: e.target.value}})} error={errors.targetJobTitle} required />
                    <SearchableSelect label={t('form.targetLocation')} options={ALGERIAN_WILAYAS.map(w => ({value: w, label: w}))} value={cvData.targetJob.preferredLocation} onChange={(val) => setCvData({...cvData, targetJob: {...cvData.targetJob, preferredLocation: val}})} error={errors.targetLocation} />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SearchableSelect label={t('form.careerStage')} options={['student', 'intern', 'fresh_graduate', 'junior', 'mid_level', 'senior', 'executive'].map(s => ({ value: s, label: t(`form.stage.${s}`) }))} value={cvData.targetJob.careerStage} onChange={(val) => setCvData({...cvData, targetJob: {...cvData.targetJob, careerStage: val as CareerStage}})} />
                 </div>
              </div>
            )}
            
            {/* STEP 3: Experience */}
            {step === 3 && (
              <div className="space-y-6 animate-fadeIn">
                 {cvData.professionalExperiences.map((exp) => (
                    <div key={exp.id} className="relative p-4 rounded-2xl bg-gray-50/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 group">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-bold">{exp.jobTitle}</h4>
                                <div className="text-sm text-gray-500">{exp.companyName} | {exp.period.start} - {exp.period.isCurrent ? 'Present' : exp.period.end}</div>
                            </div>
                            <button onClick={() => handleRemoveExperience(exp.id)} className="text-gray-400 hover:text-red-500"><span className="material-symbols-outlined text-lg">delete</span></button>
                        </div>
                    </div>
                 ))}
                 
                 {isAddingExp ? (
                    <div className="p-6 rounded-2xl border-2 border-dashed border-gray-200 dark:border-white/10 space-y-6 animate-fadeIn bg-white/50 dark:bg-black/20">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <InputField label={t('form.jobTitle')} value={tempExp.jobTitle} onChange={(e: any) => setTempExp({...tempExp, jobTitle: e.target.value})} required />
                          <InputField label={t('form.company')} value={tempExp.companyName} onChange={(e: any) => setTempExp({...tempExp, companyName: e.target.value})} required />
                       </div>
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <InputField label={t('form.location')} value={tempExp.companyLocation} onChange={(e: any) => setTempExp({...tempExp, companyLocation: e.target.value})} />
                          <Select 
                              label={t('form.locationType')} 
                              options={['on_site', 'hybrid', 'remote'].map(v => ({ value: v, label: t(`form.loc.${v}`) }))}
                              value={tempExp.locationType || ''}
                              onChange={(val) => setTempExp({...tempExp, locationType: val as any})}
                          />
                          <Select
                              label={t('form.employmentType')}
                              options={['full_time', 'part_time', 'freelance', 'internship', 'contract', 'temporary'].map(v => ({ value: v, label: t(`form.emp.${v}`) }))}
                              value={tempExp.employmentType || ''}
                              onChange={(val) => setTempExp({...tempExp, employmentType: val})}
                          />
                       </div>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <MonthYearPicker label={t('form.startDate')} value={tempExp.period.start} onChange={(val) => setTempExp({...tempExp, period: {...tempExp.period, start: val}})} />
                           <div className="space-y-2">
                               <div className="w-full"><MonthYearPicker label={t('form.endDate')} value={tempExp.period.end} onChange={(val) => setTempExp({...tempExp, period: {...tempExp.period, end: val}})} disabled={tempExp.period.isCurrent} /></div>
                               <div className="flex items-center gap-2 mt-2">
                                   <input type="checkbox" checked={tempExp.period.isCurrent} onChange={(e) => setTempExp({...tempExp, period: {...tempExp.period, isCurrent: e.target.checked, end: ''}})} id="isCurrentExp" className="rounded text-electric-blue focus:ring-electric-blue w-4 h-4 bg-gray-50 border-gray-300" />
                                   <label htmlFor="isCurrentExp" className="text-xs font-bold text-gray-500 cursor-pointer">{t('form.current')}</label>
                               </div>
                           </div>
                       </div>
                       <TextAreaField label={t('form.description')} placeholder={t('form.description.placeholder')} value={tempExp.description || ''} onChange={(e: any) => setTempExp({...tempExp, description: e.target.value})} rows={3} />
                       <TextAreaField label={t('form.achievements')} placeholder={t('form.achievements.placeholder')} value={achievementsInput} onChange={(e: any) => setAchievementsInput(e.target.value)} rows={3} />
                       <InputField label={t('form.skillsUsed')} placeholder={t('form.skillsUsed.placeholder')} value={(tempExp.skillsUsed || []).join(', ')} onChange={(e: any) => setTempExp({...tempExp, skillsUsed: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean)})} />
                       <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-white/5">
                          <Button variant="ghost" onClick={() => setIsAddingExp(false)}>{t('btn.cancel')}</Button>
                          <Button onClick={handleAddExperience}>{t('btn.save')}</Button>
                       </div>
                    </div>
                 ) : (
                    <Button variant="outline" fullWidth onClick={() => setIsAddingExp(true)} leftIcon={<span className="material-symbols-outlined">add</span>}>{t('form.exp.add')}</Button>
                 )}
              </div>
            )}

            {/* STEP 4: Education */}
            {step === 4 && <StepEducation cvData={cvData} setCvData={setCvData} />}

            {/* STEP 5: Skills & Admin */}
            {step === 5 && <StepSkillsAdmin cvData={cvData} setCvData={setCvData} />}

            {/* STEP 6: Review & Preview */}
            {step === 6 && (
                <div className="space-y-8 animate-fadeIn">
                    <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-sm font-bold text-gray-700 dark:text-gray-300">
                            {t('doc.settings')}
                        </div>
                        <div className="w-full md:w-64">
                            <Select 
                                label={t('doc.lang')}
                                options={[
                                    { value: 'en', label: 'English' },
                                    { value: 'fr', label: 'Français' },
                                    { value: 'ar', label: 'العربية' }
                                ]}
                                value={cvData.documentLanguage}
                                onChange={(val) => setCvData({...cvData, documentLanguage: val as any})}
                            />
                        </div>
                    </div>

                    <div className="relative w-full overflow-hidden h-[600px] bg-gray-100 dark:bg-[#050912] rounded-2xl border border-gray-200 dark:border-white/10 flex justify-center">
                        <div className="absolute top-8 transform scale-[0.6] origin-top shadow-2xl">
                            {/* Preview is set to Classic Template by default as requested */}
                            <TemplateClassic cvData={cvData} t={t} />
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-transparent hover:border-gray-200 dark:hover:border-white/10 transition-colors">
                        <input type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="mt-1 rounded text-electric-blue focus:ring-electric-blue w-4 h-4" />
                        <label className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 cursor-pointer">{t('terms.label')}</label>
                    </div>
                </div>
            )}

            <div className="mt-10 pt-6 border-t border-gray-100 dark:border-white/5 flex justify-between items-center">
                {step > 1 ? <Button variant="ghost" onClick={handlePrev} leftIcon={<span className="material-symbols-outlined rtl-mirror">arrow_back</span>}>{t('btn.back')}</Button> : <div></div>}
                {step < 6 ? <Button onClick={handleNext} rightIcon={<span className="material-symbols-outlined rtl-mirror">arrow_forward</span>}>{t('btn.next')}</Button> : (
                    <div className="flex gap-4">
                        <Button variant="outline" onClick={handleDownloadClick} disabled={!agreedToTerms} isLoading={isGenerating && pendingAction === 'download'}>{t('dash.cv.download')}</Button>
                        <Button onClick={() => { 
                            if (!hasSignedUp) {
                                setPendingAction('submit');
                                setShowSignupModal(true);
                            } else {
                                handleDashboardEnter();
                            }
                        }} disabled={!agreedToTerms} isLoading={isSubmitting || (isGenerating && pendingAction === 'submit')}>{t('btn.submit')}</Button>
                    </div>
                )}
            </div>
        </div>

        {/* Signup Modal */}
        {showSignupModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
                <div className="bg-white dark:bg-[#0F1623] rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/20">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('modal.signup.title')}</h3>
                    <div className="space-y-4 mb-6">
                        <InputField type="password" label={t('form.password')} value={password} onChange={(e: any) => setPassword(e.target.value)} />
                        <InputField type="password" label={t('form.confirmPassword')} value={confirmPassword} onChange={(e: any) => setConfirmPassword(e.target.value)} />
                        {signupError && <p className="text-red-500 text-xs">{signupError}</p>}
                    </div>
                    <div className="flex flex-col gap-3">
                        <Button fullWidth onClick={handleFinalSubmit} isLoading={isSubmitting}>{t('btn.completeSignup')}</Button>
                        <Button variant="ghost" fullWidth onClick={() => setShowSignupModal(false)}>{t('btn.cancel')}</Button>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default CandidateWizard;
