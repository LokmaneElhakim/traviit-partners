
"use client";

import React, { useState } from 'react';
import Button from '../../ui/Button';
import InputField from '../../ui/InputField'; 
import SearchableSelect from '../../ui/SearchableSelect';
import { UnifiedCV, EducationSection } from '../../../types/forms';
import { useLanguage } from '../../../context/LanguageContext';

interface StepEducationProps {
  cvData: UnifiedCV;
  setCvData: (data: UnifiedCV) => void;
}

const StepEducation: React.FC<StepEducationProps> = ({ cvData, setCvData }) => {
  const { t } = useLanguage();
  const [isAdding, setIsAdding] = useState(false);
  const [tempEdu, setTempEdu] = useState<EducationSection>({
    id: '',
    qualification: '',
    institution: '',
    graduationYear: '',
    certificationsOrCourses: []
  });

  const handleAdd = () => {
    if (!tempEdu.qualification || !tempEdu.institution) return;
    const newEdu = { ...tempEdu, id: Date.now().toString() };
    setCvData({ ...cvData, education: [newEdu, ...cvData.education] });
    setTempEdu({ id: '', qualification: '', institution: '', graduationYear: '', certificationsOrCourses: [] });
    setIsAdding(false);
  };

  const handleRemove = (id: string) => {
    setCvData({ ...cvData, education: cvData.education.filter(e => e.id !== id) });
  };

  const years = Array.from({ length: 50 }, (_, i) => (new Date().getFullYear() + 5 - i).toString());

  return (
    <div className="space-y-6 animate-fadeIn">
      {cvData.education.map((edu) => (
        <div key={edu.id} className="relative p-4 rounded-2xl bg-gray-50/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 group">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white">{edu.qualification}</h4>
              <div className="text-sm text-gray-500">{edu.institution} • {edu.graduationYear}</div>
            </div>
            <button onClick={() => handleRemove(edu.id)} className="text-gray-400 hover:text-red-500 transition-colors">
              <span className="material-symbols-outlined text-lg">delete</span>
            </button>
          </div>
        </div>
      ))}

      {isAdding ? (
        <div className="p-6 rounded-2xl border-2 border-dashed border-gray-200 dark:border-white/10 space-y-6 bg-white/50 dark:bg-black/20 animate-fadeIn">
          <div className="grid grid-cols-1 gap-4">
            <InputField 
                label={t('form.degree')} 
                value={tempEdu.qualification} 
                onChange={(e: any) => setTempEdu({...tempEdu, qualification: e.target.value})} 
                required 
            />
            <InputField 
                label={t('form.institution')} 
                value={tempEdu.institution} 
                onChange={(e: any) => setTempEdu({...tempEdu, institution: e.target.value})} 
                required 
            />
            <div className="w-1/2">
                <SearchableSelect 
                    label={t('form.gradYear')}
                    options={years.map(y => ({ value: y, label: y }))}
                    value={tempEdu.graduationYear}
                    onChange={(val) => setTempEdu({...tempEdu, graduationYear: val})}
                    placeholder="Year"
                />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-white/5">
            <Button variant="ghost" onClick={() => setIsAdding(false)}>{t('btn.cancel')}</Button>
            <Button onClick={handleAdd}>{t('btn.save')}</Button>
          </div>
        </div>
      ) : (
        <Button variant="outline" fullWidth onClick={() => setIsAdding(true)} leftIcon={<span className="material-symbols-outlined">add</span>}>
          {t('form.edu.add')}
        </Button>
      )}
    </div>
  );
};

export default StepEducation;
