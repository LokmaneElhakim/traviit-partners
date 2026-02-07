
"use client";

import React, { useState } from 'react';
import Button from '../../ui/Button';
import SearchableSelect from '../../ui/SearchableSelect';
import Select from '../../ui/Select';
import InputField from '../../ui/InputField';
import { UnifiedCV, LanguageSkill } from '../../../types/forms';
import { useLanguage } from '../../../context/LanguageContext';
import { CATEGORIZED_HARD_SKILLS, ALGERIAN_DRIVING_PERMITS_DETAILS, COMMON_SOFT_SKILLS } from '../../../utils/constants';

interface StepSkillsAdminProps {
  cvData: UnifiedCV;
  setCvData: (data: UnifiedCV) => void;
}

const StepSkillsAdmin: React.FC<StepSkillsAdminProps> = ({ cvData, setCvData }) => {
  const { t } = useLanguage();
  const [tempLang, setTempLang] = useState<LanguageSkill>({ language: '', level: 'intermediate' });
  const [isAddingLang, setIsAddingLang] = useState(false);

  // Hard Skills Handling
  const handleAddHardSkill = (skill: string) => {
    if (!cvData.skills.hardSkills.includes(skill)) {
      setCvData({
        ...cvData,
        skills: { ...cvData.skills, hardSkills: [...cvData.skills.hardSkills, skill] }
      });
    }
  };

  const handleRemoveHardSkill = (skill: string) => {
    setCvData({
      ...cvData,
      skills: { ...cvData.skills, hardSkills: cvData.skills.hardSkills.filter(s => s !== skill) }
    });
  };

  // Soft Skills Handling
  const handleAddSoftSkill = (skill: string) => {
    if (!cvData.skills.softSkills.includes(skill)) {
      setCvData({
        ...cvData,
        skills: { ...cvData.skills, softSkills: [...cvData.skills.softSkills, skill] }
      });
    }
  };

  const handleRemoveSoftSkill = (skill: string) => {
    setCvData({
      ...cvData,
      skills: { ...cvData.skills, softSkills: cvData.skills.softSkills.filter(s => s !== skill) }
    });
  };

  // Languages Handling
  const handleAddLanguage = () => {
    if (!tempLang.language) return;
    setCvData({ ...cvData, languages: [...cvData.languages, tempLang] });
    setTempLang({ language: '', level: 'intermediate' });
    setIsAddingLang(false);
  };

  const handleRemoveLanguage = (lang: string) => {
    setCvData({ ...cvData, languages: cvData.languages.filter(l => l.language !== lang) });
  };

  // Driving Permits Handling
  const handleDrivingChange = (val: string) => {
      // Toggle logic for multi-select feel using searchable select add
      if (!cvData.additionalInfo.drivingPermits.includes(val)) {
          setCvData({...cvData, additionalInfo: {...cvData.additionalInfo, drivingPermits: [...cvData.additionalInfo.drivingPermits, val]}});
      }
  };
  
  const removePermit = (permit: string) => {
      setCvData({...cvData, additionalInfo: {...cvData.additionalInfo, drivingPermits: cvData.additionalInfo.drivingPermits.filter(p => p !== permit)}});
  };

  return (
    <div className="space-y-10 animate-fadeIn">
        
        {/* Skills Section */}
        <section>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-white/10 pb-2 mb-4">
                {t('form.skills.hard')}
            </h3>
            <SearchableSelect 
                placeholder={t('form.skills.placeholder')}
                options={CATEGORIZED_HARD_SKILLS}
                onAdd={handleAddHardSkill}
                creatable
                clearOnSelect
            />
            <div className="flex flex-wrap gap-2 mt-3">
                {cvData.skills.hardSkills.map(skill => (
                    <span key={skill} className="inline-flex items-center gap-1 px-3 py-1 bg-electric-blue/10 text-electric-blue rounded-full text-xs font-bold border border-electric-blue/20">
                        {skill}
                        <button onClick={() => handleRemoveHardSkill(skill)} className="hover:text-red-500"><span className="material-symbols-outlined text-sm">close</span></button>
                    </span>
                ))}
            </div>
        </section>

        {/* Soft Skills Section */}
        <section>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-white/10 pb-2 mb-4">
                {t('form.skills.soft')}
            </h3>
            <SearchableSelect 
                placeholder={t('form.skills.placeholder')}
                options={COMMON_SOFT_SKILLS.map(s => ({ value: s, label: s }))}
                onAdd={handleAddSoftSkill}
                creatable
                clearOnSelect
            />
            <div className="flex flex-wrap gap-2 mt-3">
                {cvData.skills.softSkills.map(skill => (
                    <span key={skill} className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 rounded-full text-xs font-bold border border-purple-200 dark:border-purple-800/30">
                        {skill}
                        <button onClick={() => handleRemoveSoftSkill(skill)} className="hover:text-red-500"><span className="material-symbols-outlined text-sm">close</span></button>
                    </span>
                ))}
            </div>
        </section>

        {/* Languages Section */}
        <section>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-white/10 pb-2 mb-4">
                {t('form.lang.title')}
            </h3>
            <div className="space-y-3 mb-4">
                {cvData.languages.map((l, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                        <span className="font-medium text-sm">{l.language}</span>
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-500 uppercase font-bold">{t(`form.lang.${l.level}`)}</span>
                            <button onClick={() => handleRemoveLanguage(l.language)} className="text-gray-400 hover:text-red-500"><span className="material-symbols-outlined text-sm">close</span></button>
                        </div>
                    </div>
                ))}
            </div>
            
            {isAddingLang ? (
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 grid grid-cols-1 sm:grid-cols-5 gap-3 items-end">
                    <div className="sm:col-span-3">
                        <InputField 
                            placeholder="Language (e.g. English)" 
                            value={tempLang.language} 
                            onChange={(e: any) => setTempLang({...tempLang, language: e.target.value})} 
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <Select 
                            options={['native', 'advanced', 'good', 'intermediate', 'beginner'].map(l => ({ value: l, label: t(`form.lang.${l}`) }))}
                            value={tempLang.level}
                            onChange={(val) => setTempLang({...tempLang, level: val as any})}
                        />
                    </div>
                    <div className="sm:col-span-5 flex justify-end gap-2 mt-2">
                        <Button size="sm" variant="ghost" onClick={() => setIsAddingLang(false)}>{t('btn.cancel')}</Button>
                        <Button size="sm" onClick={handleAddLanguage}>{t('btn.save')}</Button>
                    </div>
                </div>
            ) : (
                <Button variant="outline" size="sm" onClick={() => setIsAddingLang(true)} leftIcon={<span className="material-symbols-outlined">add</span>}>
                    {t('form.lang.add')}
                </Button>
            )}
        </section>

        {/* Admin Section */}
        <section>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-white/10 pb-2 mb-4">
                {t('form.admin.title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1.5 ml-1">{t('form.nationalService')}</label>
                    <Select 
                        options={['exempted', 'completed', 'postponed', 'not_concerned'].map(s => ({ value: s, label: t(`form.ns.${s}`) }))}
                        value={cvData.additionalInfo.nationalServiceStatus}
                        onChange={(val) => setCvData({...cvData, additionalInfo: {...cvData.additionalInfo, nationalServiceStatus: val as any}})}
                    />
                </div>
                <div>
                    <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1.5 ml-1">{t('form.drivingLicense')}</label>
                    <SearchableSelect 
                        options={ALGERIAN_DRIVING_PERMITS_DETAILS}
                        onAdd={handleDrivingChange}
                        placeholder={t('form.drivingPermits.placeholder')}
                        clearOnSelect
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                        {cvData.additionalInfo.drivingPermits.map(permit => (
                            <span key={permit} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-white/10 rounded text-xs font-bold">
                                {permit}
                                <button onClick={() => removePermit(permit)} className="hover:text-red-500"><span className="material-symbols-outlined text-sm">close</span></button>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    </div>
  );
};

export default StepSkillsAdmin;
