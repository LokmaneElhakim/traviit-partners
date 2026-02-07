
"use client";

import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Select from '../ui/Select'; 
import InputField from '../ui/InputField';
import TextAreaField from '../ui/TextAreaField';
import { saveRecruiterProfile } from '../../utils/supabaseClient';
import { MOCK_CANDIDATES, ALGERIAN_WILAYAS } from '../../utils/constants';
import { useLanguage } from '../../context/LanguageContext';
import { TemplateModern } from '../cv/CVTemplates';
import { UnifiedCV } from '../../types/forms';

// Declaration for the global dom-to-image library
declare const domtoimage: any;

const MOCK_SAVED_CANDIDATES = MOCK_CANDIDATES.slice(0, 3); 

const MOCK_MY_JOBS = [
    { id: 1, title: "Senior React Developer", location: "Algiers", type: "Full-time", salary: "150k - 200k DZD", applicants: 12 },
    { id: 2, title: "DevOps Engineer", location: "Oran", type: "Contract", salary: "250k DZD", applicants: 5 },
];

// Helper to map flat mock data to the complex CV structure (kept for Candidate Detail view)
const mapCandidateToCV = (candidate: any): UnifiedCV => {
    const names = candidate.name.split(' ');
    const firstName = names[0];
    const lastName = names.slice(1).join(' ');

    return {
        documentLanguage: 'en',
        personalInfo: {
            firstName,
            lastName,
            aboutMe: candidate.bio,
            dateOfBirth: "1995-01-01", // Mock
            placeOfBirth: "Algiers",
            gender: "male",
            nationality: "Algerian",
            email: candidate.email,
            phoneNumber: candidate.whatsapp,
            socialMedia: { linkedIn: "linkedin.com/in/mock", website: "", otherLink: "", github: "" },
            messaging: { whatsapp: candidate.whatsapp, viber: "", telegram: "" },
            address: { type: 'home', streetAddress: "Hay El Yasmine", postalCode: "16000", city: candidate.location, country: "Algeria" }
        },
        targetJob: {
            title: candidate.title,
            preferredLocation: candidate.location,
            targetCompany: "",
            careerStage: candidate.experience > 5 ? "senior" : "mid_level",
            employmentTypes: ["full_time"],
            careerGoal: `To leverage my ${candidate.experience} years of experience in a challenging environment.`
        },
        professionalExperiences: [
            {
                id: "1",
                jobTitle: candidate.title,
                companyName: "Previous Tech Co",
                companyLocation: candidate.location,
                period: { start: "2020-01", end: "Present", isCurrent: true },
                keyAchievements: [
                    "Led a team of 5 developers to deliver critical features.",
                    "Improved system performance by 30% through optimization.",
                    "Implemented CI/CD pipelines reducing deployment time."
                ]
            },
            {
                id: "2",
                jobTitle: "Junior Developer",
                companyName: "Startup DZ",
                companyLocation: "Algiers",
                period: { start: "2018-01", end: "2019-12", isCurrent: false },
                keyAchievements: [
                    "Developed frontend components using React.",
                    "Assisted in database schema design."
                ]
            }
        ],
        skills: { 
            hardSkills: candidate.skills, 
            softSkills: ["Communication", "Leadership", "Problem Solving"] 
        },
        education: [
            {
                id: "1",
                qualification: candidate.educationLevel === "Master" ? "Master's Degree in Computer Science" : "Bachelor's Degree in Informatics",
                institution: "USTHB",
                graduationYear: "2018",
                certificationsOrCourses: []
            }
        ],
        languages: candidate.languages.map((l: string) => ({ language: l, level: "advanced" })),
        organizationalInfo: { accommodationRequired: "no" },
        additionalInfo: { nationalServiceStatus: "completed", drivingPermits: ["B"], personalPhotoUrl: "" }
    };
};

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
  </svg>
);

const CandidateCard = ({ candidate, onViewProfile, t }: any) => (
    <div 
        onClick={() => onViewProfile(candidate)}
        className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 hover:shadow-xl hover:border-electric-blue/30 dark:hover:border-electric-blue/30 transition-all duration-300 group relative overflow-hidden flex flex-col h-full cursor-pointer animate-fadeIn"
    >
        <div className="flex justify-between items-start mb-5">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-white/10 dark:to-white/5 border border-gray-100 dark:border-white/5 flex items-center justify-center text-electric-blue dark:text-blue-400 font-bold text-lg shadow-sm">
                    {candidate.initials}
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-base leading-tight group-hover:text-electric-blue transition-colors">{candidate.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">location_on</span>
                        {candidate.location}
                    </p>
                </div>
            </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6 flex-1 content-start">
            {candidate.skills.slice(0, 3).map((s: string) => (
                <span key={s} className="px-2.5 py-1 bg-gray-50 dark:bg-white/5 rounded-lg text-[11px] font-semibold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10">
                    {s}
                </span>
            ))}
            {candidate.skills.length > 3 && <span className="px-2 py-1 text-[10px] font-bold text-gray-400 bg-gray-50 dark:bg-white/5 rounded-lg border border-transparent">+{candidate.skills.length - 3}</span>}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-white/5 mt-auto">
            <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t('cand.availability')}</span>
                <span className="text-xs font-bold text-green-500">{candidate.availability}</span>
            </div>
            <button className="w-8 h-8 rounded-full bg-gray-50 dark:bg-white/10 flex items-center justify-center text-gray-400 group-hover:bg-electric-blue group-hover:text-white transition-all">
                <span className="material-symbols-outlined text-sm rtl-mirror">arrow_forward</span>
            </button>
        </div>
    </div>
);

const CandidateDetailView = ({ candidate, onBack }: { candidate: any, onBack: () => void }) => {
    const { t } = useLanguage();
    const [isSaved, setIsSaved] = useState(false);
    const [isInterested, setIsInterested] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleContact = () => {
        const cleanNumber = candidate.whatsapp.replace(/\D/g, '');
        window.open(`https://wa.me/${cleanNumber}`, '_blank');
    };

    const handleDownloadCV = async () => {
        if (typeof domtoimage === 'undefined') {
           alert("Image generation library not loaded.");
           return;
        }
    
        const element = document.getElementById('hr-cv-download');
        if (!element) return;
    
        setIsGenerating(true);
        
        setTimeout(async () => {
          try {
            const dataUrl = await domtoimage.toPng(element, {
              quality: 1,
              bgcolor: '#ffffff',
              style: { 'transform': 'scale(1)', 'transform-origin': 'top left' }
            });
            
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `${candidate.name.replace(' ', '_')}_Standard_CV.png`;
            link.click();
          } catch (err) {
            console.error("Error generating image", err);
            alert("Failed to generate CV.");
          } finally {
            setIsGenerating(false);
          }
        }, 500);
    };

    const cvData = mapCandidateToCV(candidate);

    return (
        <div className="animate-fadeIn w-full max-w-6xl mx-auto h-full flex flex-col">
            <div className="absolute top-[-9999px] left-[-9999px] overflow-hidden" aria-hidden="true">
                <div id="hr-cv-download">
                    <TemplateModern cvData={cvData} t={t} />
                </div>
            </div>

            <div className="mb-6 flex items-center gap-4">
                 <Button variant="ghost" size="sm" onClick={onBack} leftIcon={<span className="material-symbols-outlined rtl-mirror">arrow_back</span>}>
                    {t('btn.backToSearch')}
                 </Button>
                 <div className="h-4 w-px bg-gray-300 dark:bg-white/20"></div>
                 <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t('cand.profile')}</span>
            </div>

            <div className="flex-1 bg-white dark:bg-[#0F1623] border border-gray-200 dark:border-white/10 rounded-[32px] p-8 md:p-12 shadow-xl relative overflow-y-auto custom-scrollbar">
                
                <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8 border-b border-gray-100 dark:border-white/5 pb-8">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/30 dark:to-blue-800/10 flex items-center justify-center text-electric-blue dark:text-blue-400 font-bold text-3xl shadow-inner border-4 border-white dark:border-[#0F1623]">
                            {candidate.initials}
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{candidate.name}</h1>
                                {candidate.verified && (
                                    <span className="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                                        <span className="material-symbols-outlined text-xs">verified</span>
                                    </span>
                                )}
                            </div>
                            <p className="text-lg text-electric-blue font-medium mb-2">{candidate.title}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-base">location_on</span> {candidate.location}</span>
                                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-base">work_history</span> {candidate.experience} {t('cand.yearsExp')}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button 
                            variant="outline" 
                            size="sm"
                            className={`border-gray-200 dark:border-white/10 ${isSaved ? 'bg-blue-50 dark:bg-blue-900/20 text-electric-blue border-electric-blue' : 'text-gray-500'}`}
                            onClick={() => setIsSaved(!isSaved)}
                        >
                            <span className="material-symbols-outlined text-lg">{isSaved ? 'bookmark' : 'bookmark_border'}</span>
                        </Button>
                        <Button 
                            variant="outline" 
                            size="sm"
                            className="border-gray-200 dark:border-white/10 text-gray-500"
                            onClick={handleDownloadCV}
                            isLoading={isGenerating}
                        >
                            <span className="material-symbols-outlined text-lg">download</span>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 space-y-6">
                        <div className="rounded-2xl bg-gray-50/80 dark:bg-white/5 border border-gray-100 dark:border-white/5 p-4 space-y-3">
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Connect</div>
                            <Button 
                                variant={isInterested ? "primary" : "outline"} 
                                fullWidth 
                                className={`h-12 ${isInterested ? 'bg-electric-blue border-transparent text-white' : 'bg-white dark:bg-transparent border-gray-200 dark:border-white/10'}`}
                                onClick={() => setIsInterested(!isInterested)}
                                leftIcon={<span className="material-symbols-outlined">{isInterested ? 'check' : 'thumb_up'}</span>}
                            >
                                {isInterested ? "Interest Sent" : "Express Interest"}
                            </Button>
                            <Button 
                                variant="primary" 
                                fullWidth 
                                className="h-12 !bg-[#25D366] hover:!bg-[#128C7E] text-white border-transparent shadow-lg shadow-green-500/20"
                                onClick={handleContact}
                                leftIcon={<WhatsAppIcon />}
                            >
                                {t('btn.whatsapp')}
                            </Button>
                        </div>

                        <div className="p-5 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 relative overflow-hidden group">
                            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{t('cand.matchScore')}</div>
                            <div className="flex items-end gap-2">
                                <div className="text-4xl font-bold text-gray-900 dark:text-white blur-sm select-none opacity-50">98%</div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-black/50 backdrop-blur-[2px]">
                                <span className="bg-gray-900/90 dark:bg-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg border border-white/10">
                                    {t('common.comingSoon')}
                                </span>
                            </div>
                        </div>

                        <div className="p-5 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10">
                            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{t('cand.availability')}</div>
                            <div className="text-xl font-bold text-green-500 flex items-center gap-2">
                                <span className="relative flex h-2.5 w-2.5">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                                </span>
                                {candidate.availability}
                            </div>
                        </div>
                        
                        <div className="p-5 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10">
                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">{t('form.lang.title')}</h4>
                            <div className="flex flex-wrap gap-2">
                                {candidate.languages.map((lang: string) => (
                                    <span key={lang} className="px-3 py-1.5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-lg text-xs font-bold text-gray-600 dark:text-gray-300">
                                        {lang}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-8">
                        <section>
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest border-b border-gray-100 dark:border-white/10 pb-3 mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-electric-blue">person</span>
                                {t('cand.about')}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                                {candidate.bio}
                            </p>
                        </section>

                        <section>
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest border-b border-gray-100 dark:border-white/10 pb-3 mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-electric-blue">psychology</span>
                                {t('cand.skills')}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {candidate.skills.map((skill: string) => (
                                    <span key={skill} className="px-4 py-2 bg-blue-50 dark:bg-blue-900/10 text-electric-blue border border-blue-100 dark:border-blue-900/20 rounded-xl text-sm font-bold hover:shadow-md transition-shadow cursor-default">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest border-b border-gray-100 dark:border-white/10 pb-3 mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-electric-blue">history</span>
                                {t('cand.history')}
                            </h3>
                            <div className="relative border-l-2 border-gray-100 dark:border-white/10 ml-2 space-y-8 pl-8 py-2">
                                <div className="relative group">
                                    <span className="absolute -left-[39px] top-1.5 w-4 h-4 bg-white dark:bg-[#0F1623] border-[3px] border-electric-blue rounded-full group-hover:scale-110 transition-transform"></span>
                                    <h4 className="font-bold text-gray-900 dark:text-white text-base">{candidate.title}</h4>
                                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 mt-1">Previous Tech Co • 2020 - {t('common.present')}</div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Leading development of scalable web applications using React and Node.js. Mentored junior developers and implemented CI/CD pipelines.</p>
                                </div>
                                <div className="relative group">
                                    <span className="absolute -left-[39px] top-1.5 w-4 h-4 bg-white dark:bg-[#0F1623] border-[3px] border-gray-300 dark:border-gray-600 rounded-full group-hover:border-electric-blue transition-colors"></span>
                                    <h4 className="font-bold text-gray-900 dark:text-white text-base">Junior Developer</h4>
                                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 mt-1">Startup DZ • 2018 - 2019</div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Contributed to frontend architecture and UI component libraries. Collaborated with designers to implement pixel-perfect interfaces.</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest border-b border-gray-100 dark:border-white/10 pb-3 mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-electric-blue">school</span>
                                {t('cand.education')}
                            </h3>
                            <div className="flex items-center gap-5 p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-electric-blue/30 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-white dark:bg-white/10 flex items-center justify-center shadow-sm shrink-0 text-electric-blue">
                                    <span className="material-symbols-outlined text-2xl">school</span>
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900 dark:text-white text-lg">{candidate.educationLevel === "Master" ? "Master's Degree in CS" : "Bachelor's Degree in CS"}</div>
                                    <div className="text-sm text-gray-500 font-medium">USTHB University, Algiers</div>
                                    <div className="text-xs text-electric-blue font-bold mt-1 uppercase tracking-wide">Graduated 2018</div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

            </div>
        </div>
    );
};

const RecruiterDashboard = ({ onLogout }: { onLogout?: () => void }) => {
    const { t, toggleLanguage, language } = useLanguage();
    const [activeTab, setActiveTab] = useState('search');
    const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));
    const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
    
    // Search State
    const [searchQuery, setSearchQuery] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [experienceFilter, setExperienceFilter] = useState('');
    const [skillFilter, setSkillFilter] = useState('');
    
    // Advanced Filters
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [eduFilter, setEduFilter] = useState('');
    const [availFilter, setAvailFilter] = useState('');
    const [langFilter, setLangFilter] = useState('');

    // Saved State
    const [savedQuery, setSavedQuery] = useState('');

    // Settings State
    const [companySettings, setCompanySettings] = useState({ name: 'Acme Corp', website: 'acme.dz', contact: 'HR Team' });

    // Job Posting State
    const [viewMode, setViewMode] = useState<'list' | 'post'>('list');
    const [jobForm, setJobForm] = useState({ title: '', location: '', type: 'Full-time', salary: '', description: '', requirements: '' });

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDark(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDark(true);
        }
    };

    const MenuItem = ({ id, label, icon }: any) => (
        <button 
            onClick={() => { setActiveTab(id); setSelectedCandidate(null); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === id ? 'bg-electric-blue text-white shadow-lg shadow-blue-500/20' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'}`}
        >
            <span className="material-symbols-outlined">{icon}</span>
            <span className="font-bold text-sm">{label}</span>
        </button>
    );

    const filteredCandidates = MOCK_CANDIDATES.filter(c => {
        const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesLoc = locationFilter ? c.location === locationFilter : true;
        const matchesExp = experienceFilter ? c.experience >= parseInt(experienceFilter) : true;
        const matchesSkill = skillFilter ? c.skills.some(s => s.toLowerCase().includes(skillFilter.toLowerCase())) : true;
        const matchesEdu = eduFilter ? c.educationLevel === eduFilter : true;
        const matchesAvail = availFilter ? c.availability === availFilter : true;
        const matchesLang = langFilter ? c.languages.some(l => l.toLowerCase().includes(langFilter.toLowerCase())) : true;

        return matchesSearch && matchesLoc && matchesExp && matchesSkill && matchesEdu && matchesAvail && matchesLang;
    });

    const filteredSaved = MOCK_SAVED_CANDIDATES.filter(c => 
        c.title.toLowerCase().includes(savedQuery.toLowerCase()) || c.name.toLowerCase().includes(savedQuery.toLowerCase())
    );

    const handlePostJob = () => {
        // Mock submission
        alert("Job Posted Successfully!");
        setViewMode('list');
        setJobForm({ title: '', location: '', type: 'Full-time', salary: '', description: '', requirements: '' });
    };

    return (
        <div className="fixed inset-0 z-[200] flex flex-col md:flex-row h-screen w-screen overflow-hidden bg-gray-50 dark:bg-[#020408]">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-gray-50 dark:bg-[#0B1120] border-r border-gray-200 dark:border-white/5 p-6 flex flex-col gap-6">
                <div className="flex items-center gap-3 px-2 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-electric-blue text-white flex items-center justify-center font-bold shadow-lg">
                        <span className="material-symbols-outlined">business_center</span>
                    </div>
                    <div>
                        <div className="font-bold text-gray-900 dark:text-white text-sm">Recruiter Portal</div>
                        <div className="text-[10px] text-gray-500 uppercase">Enterprise</div>
                    </div>
                </div>

                <div className="space-y-2">
                    <MenuItem id="search" label={t('dash.menu.search')} icon="person_search" />
                    <MenuItem id="saved" label={t('dash.menu.saved')} icon="bookmark" />
                    <MenuItem id="jobs" label={t('dash.menu.jobs')} icon="work" />
                    <MenuItem id="settings" label={t('dash.menu.settings')} icon="settings" />
                </div>

                <div className="mt-auto pt-6 border-t border-gray-200 dark:border-white/5 flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-2">
                        <button 
                            onClick={toggleLanguage} 
                            className="flex-1 px-3 py-2 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-xs font-bold text-gray-600 dark:text-gray-300 transition-colors uppercase"
                        >
                            {language === 'en' ? 'Arabic' : 'English'}
                        </button>
                        <button 
                            onClick={toggleTheme} 
                            className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 flex items-center justify-center text-gray-600 dark:text-gray-300 transition-colors"
                        >
                            <span className="material-symbols-outlined text-lg">{isDark ? 'light_mode' : 'dark_mode'}</span>
                        </button>
                    </div>
                    <Button 
                        variant="outline" 
                        fullWidth 
                        size="sm"
                        onClick={onLogout}
                        className="border-red-200 text-red-500 hover:bg-red-50 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-900/10 justify-start px-4"
                        leftIcon={<span className="material-symbols-outlined text-lg rtl-mirror">logout</span>}
                    >
                        {t('nav.logout')}
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden bg-white dark:bg-[#020408] p-6 md:p-10 relative flex flex-col">
                
                {selectedCandidate ? (
                    <CandidateDetailView candidate={selectedCandidate} onBack={() => setSelectedCandidate(null)} />
                ) : (
                    <>
                        {activeTab === 'search' && (
                            <div className="flex flex-col h-full animate-fadeIn">
                                <div className="flex justify-between items-center mb-8">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('dash.discovery.title')}</h2>
                                        <p className="text-sm text-gray-500 mt-1">{t('dash.discovery.subtitle').replace('{count}', filteredCandidates.length.toString())}</p>
                                    </div>
                                </div>

                                {/* Filters */}
                                <div className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-4 mb-8">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                        <div className="md:col-span-2 relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined text-lg">search</span>
                                            <input 
                                                type="text" 
                                                placeholder={t('dash.search.placeholder')}
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full pl-11 bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-electric-blue outline-none transition-all"
                                            />
                                        </div>
                                        <Select 
                                            options={[{value: '', label: 'All Locations'}, ...ALGERIAN_WILAYAS.map(w => ({value: w, label: w}))]}
                                            value={locationFilter}
                                            onChange={(val) => setLocationFilter(val)}
                                        />
                                        <Select 
                                            options={[
                                                {value: '', label: 'Any Experience'},
                                                {value: '1', label: '1+ Years'},
                                                {value: '3', label: '3+ Years'},
                                                {value: '5', label: '5+ Years'}
                                            ]}
                                            value={experienceFilter}
                                            onChange={(val) => setExperienceFilter(val)}
                                        />
                                    </div>

                                    {showAdvancedFilters && (
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 pt-4 border-t border-gray-200 dark:border-white/10 animate-fadeIn">
                                            <div className="relative">
                                                <input 
                                                    type="text" 
                                                    placeholder="Filter by Skill (e.g. React)"
                                                    value={skillFilter}
                                                    onChange={(e) => setSkillFilter(e.target.value)}
                                                    className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-electric-blue outline-none transition-all"
                                                />
                                            </div>
                                            <Select 
                                                options={[
                                                    {value: '', label: t('filter.education')},
                                                    {value: 'Bachelor', label: 'Bachelor'},
                                                    {value: 'Master', label: 'Master'},
                                                    {value: 'PhD', label: 'PhD'}
                                                ]}
                                                value={eduFilter}
                                                onChange={(val) => setEduFilter(val)}
                                            />
                                            <Select 
                                                options={[
                                                    {value: '', label: t('filter.availability')},
                                                    {value: 'Immediate', label: 'Immediate'},
                                                    {value: '1 Month Notice', label: '1 Month Notice'}
                                                ]}
                                                value={availFilter}
                                                onChange={(val) => setAvailFilter(val)}
                                            />
                                        </div>
                                    )}

                                    <div className="flex justify-center">
                                        <button 
                                            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                                            className="text-xs font-bold text-electric-blue hover:text-blue-600 flex items-center gap-1 transition-colors"
                                        >
                                            {showAdvancedFilters ? t('dash.filter.hideAdvanced') : t('dash.filter.showAdvanced')}
                                            <span className="material-symbols-outlined text-sm">{showAdvancedFilters ? 'expand_less' : 'expand_more'}</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Grid */}
                                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
                                        {filteredCandidates.map(candidate => (
                                            <CandidateCard key={candidate.id} candidate={candidate} onViewProfile={setSelectedCandidate} t={t} />
                                        ))}
                                        {filteredCandidates.length === 0 && (
                                            <div className="col-span-full text-center py-20 text-gray-400">
                                                <span className="material-symbols-outlined text-4xl mb-2">search_off</span>
                                                <p>No candidates found matching your filters.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'saved' && (
                            <div className="flex flex-col h-full animate-fadeIn">
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Saved Candidates</h2>
                                </div>
                                <div className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-4 mb-8">
                                    <input 
                                        type="text" 
                                        placeholder="Search saved candidates..."
                                        value={savedQuery}
                                        onChange={(e) => setSavedQuery(e.target.value)}
                                        className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-electric-blue outline-none transition-all"
                                    />
                                </div>
                                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {filteredSaved.map(candidate => (
                                            <CandidateCard key={candidate.id} candidate={candidate} onViewProfile={setSelectedCandidate} t={t} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'jobs' && (
                            <div className="flex flex-col h-full animate-fadeIn">
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {viewMode === 'list' ? t('job.list.active') : t('job.post.new')}
                                    </h2>
                                    {viewMode === 'list' && (
                                        <Button onClick={() => setViewMode('post')} leftIcon={<span className="material-symbols-outlined">add</span>}>
                                            {t('job.post.new')}
                                        </Button>
                                    )}
                                    {viewMode === 'post' && (
                                        <Button variant="ghost" onClick={() => setViewMode('list')} leftIcon={<span className="material-symbols-outlined rtl-mirror">arrow_back</span>}>
                                            {t('nav.back')}
                                        </Button>
                                    )}
                                </div>

                                {viewMode === 'list' ? (
                                    <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                                        {MOCK_MY_JOBS.map((job) => (
                                            <div key={job.id} className="p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl flex justify-between items-center group hover:border-electric-blue/30 transition-colors">
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{job.title}</h3>
                                                    <div className="text-sm text-gray-500 mt-1 flex items-center gap-3">
                                                        <span>{job.location}</span>
                                                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                                        <span>{job.type}</span>
                                                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                                        <span className="text-green-600 dark:text-green-400 font-medium">{job.salary}</span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{job.applicants}</div>
                                                    <div className="text-xs text-gray-500 uppercase tracking-wider">{t('job.list.applicants')}</div>
                                                </div>
                                            </div>
                                        ))}
                                        {MOCK_MY_JOBS.length === 0 && (
                                            <div className="text-center py-20 text-gray-400 flex flex-col items-center">
                                                <span className="material-symbols-outlined text-4xl mb-4">work_off</span>
                                                <p>{t('job.list.noJobs')}</p>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="overflow-y-auto pr-2 custom-scrollbar pb-10">
                                        <div className="max-w-2xl mx-auto space-y-6">
                                            <InputField label={t('job.post.title')} value={jobForm.title} onChange={(e: any) => setJobForm({...jobForm, title: e.target.value})} placeholder="e.g. Senior Frontend Engineer" />
                                            <div className="grid grid-cols-2 gap-6">
                                                <InputField label={t('job.post.location')} value={jobForm.location} onChange={(e: any) => setJobForm({...jobForm, location: e.target.value})} placeholder="e.g. Algiers / Remote" />
                                                <Select 
                                                    label={t('job.post.type')}
                                                    options={["Full-time", "Part-time", "Contract", "Freelance"]}
                                                    value={jobForm.type}
                                                    onChange={(val) => setJobForm({...jobForm, type: val})}
                                                />
                                            </div>
                                            <InputField label={t('job.post.salary')} value={jobForm.salary} onChange={(e: any) => setJobForm({...jobForm, salary: e.target.value})} placeholder="e.g. 150k - 200k DZD" />
                                            <TextAreaField label={t('job.post.desc')} value={jobForm.description} onChange={(e: any) => setJobForm({...jobForm, description: e.target.value})} rows={5} placeholder="Describe the role responsibilities..." />
                                            <TextAreaField label={t('job.post.req')} value={jobForm.requirements} onChange={(e: any) => setJobForm({...jobForm, requirements: e.target.value})} rows={5} placeholder="List key requirements..." />
                                            
                                            <div className="pt-4">
                                                <Button fullWidth size="lg" onClick={handlePostJob}>{t('job.post.submit')}</Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="flex flex-col h-full animate-fadeIn max-w-2xl">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Company Settings</h2>
                                <div className="space-y-6">
                                    <InputField label="Company Name" value={companySettings.name} onChange={(e: any) => setCompanySettings({...companySettings, name: e.target.value})} />
                                    <InputField label="Website" value={companySettings.website} onChange={(e: any) => setCompanySettings({...companySettings, website: e.target.value})} />
                                    <InputField label="Primary Contact" value={companySettings.contact} onChange={(e: any) => setCompanySettings({...companySettings, contact: e.target.value})} />
                                    <Button onClick={() => alert("Settings saved!")}>Save Changes</Button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

interface RecruiterFormProps {
    onLogout?: () => void;
    onDashboardEnter?: () => void;
    initialDashboard?: boolean;
}

const RecruiterForm: React.FC<RecruiterFormProps> = ({ onLogout, onDashboardEnter, initialDashboard = false }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ companyName: '', industry: '', website: '', recruiterName: '', positionTitle: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(initialDashboard);

  useEffect(() => {
    if (initialDashboard && onDashboardEnter) {
        onDashboardEnter();
    }
  }, [initialDashboard, onDashboardEnter]);

  const handleSubmit = async () => {
      setIsSubmitting(true);
      if (formData.password !== formData.confirmPassword) {
          alert(t('msg.passwordMismatch'));
          setIsSubmitting(false);
          return;
      }
      try { 
          await saveRecruiterProfile(formData); 
          setSubmitSuccess(true); 
          if (onDashboardEnter) onDashboardEnter();
      } catch (err: any) { 
          alert("Error: " + err.message); 
      } finally { 
          setIsSubmitting(false); 
      }
  };

  if (submitSuccess) { 
      return <RecruiterDashboard onLogout={onLogout} />; 
  }

  return (
    <div className="glass-card rounded-[32px] overflow-hidden shadow-2xl border border-white/40 dark:border-white/5 bg-white/80 dark:bg-[#0F1623]/80 backdrop-blur-xl animate-fadeIn max-w-3xl mx-auto p-8 md:p-12 my-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-[10px] font-bold uppercase tracking-wider mb-4">{t('recruiter.form.corporate')}</div>
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">{t('recruiter.form.title')}</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{t('recruiter.form.subtitle')}</p>
      </div>
      <div className="space-y-8">
        <section>
           <h3 className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-100 dark:border-white/5 pb-2">{t('recruiter.form.section.company')}</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <InputField label={t('recruiter.form.companyName')} value={formData.companyName} onChange={(e: any) => setFormData({...formData, companyName: e.target.value})} placeholder="e.g. Acme Corp" required />
             <InputField label={t('recruiter.form.industry')} value={formData.industry} onChange={(e: any) => setFormData({...formData, industry: e.target.value})} placeholder="e.g. Fintech" required />
           </div>
        </section>
        <section>
           <h3 className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-100 dark:border-white/5 pb-2">{t('recruiter.form.section.rep')}</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <InputField label={t('recruiter.form.fullName')} value={formData.recruiterName} onChange={(e: any) => setFormData({...formData, recruiterName: e.target.value})} placeholder="John Doe" required />
             <InputField label={t('recruiter.form.workEmail')} type="email" value={formData.email} onChange={(e: any) => setFormData({...formData, email: e.target.value})} placeholder="name@company.com" required />
           </div>
        </section>
        <section>
           <h3 className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-100 dark:border-white/5 pb-2">{t('recruiter.form.section.security')}</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <InputField label={t('recruiter.form.password')} type="password" value={formData.password} onChange={(e: any) => setFormData({...formData, password: e.target.value})} placeholder="••••••••" required />
             <InputField label={t('recruiter.form.confirmPassword')} type="password" value={formData.confirmPassword} onChange={(e: any) => setFormData({...formData, confirmPassword: e.target.value})} placeholder="••••••••" required />
           </div>
        </section>
        <Button fullWidth size="lg" variant="primary" className="mt-8 bg-electric-blue hover:bg-blue-600" onClick={handleSubmit} isLoading={isSubmitting}>{t('recruiter.form.submit')}</Button>
      </div>
    </div>
  );
};

export default RecruiterForm;
