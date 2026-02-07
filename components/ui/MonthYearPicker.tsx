
import React, { useMemo } from 'react';
import SearchableSelect from './SearchableSelect';
import { useLanguage } from '../../context/LanguageContext';

interface MonthYearPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const MonthYearPicker: React.FC<MonthYearPickerProps> = ({ label, value, onChange, disabled }) => {
  const { t } = useLanguage();
  const [yearStr, monthStr] = (value || "").split("-");
  const currentYear = new Date().getFullYear();

  const months = [
    { value: "01", label: t("month.01") }, { value: "02", label: t("month.02") }, 
    { value: "03", label: t("month.03") }, { value: "04", label: t("month.04") }, 
    { value: "05", label: t("month.05") }, { value: "06", label: t("month.06") },
    { value: "07", label: t("month.07") }, { value: "08", label: t("month.08") }, 
    { value: "09", label: t("month.09") }, { value: "10", label: t("month.10") }, 
    { value: "11", label: t("month.11") }, { value: "12", label: t("month.12") }
  ];

  const years = useMemo(() => {
    const y = [];
    for (let i = currentYear + 5; i >= 1970; i--) {
        y.push({ value: i.toString(), label: i.toString() });
    }
    return y;
  }, [currentYear]);

  const handleMonthChange = (newMonth: string) => {
    const y = yearStr || currentYear.toString();
    onChange(`${y}-${newMonth}`);
  };

  const handleYearChange = (newYear: string) => {
    const m = monthStr || "01";
    onChange(`${newYear}-${m}`);
  };

  return (
    <div className={disabled ? "opacity-60 pointer-events-none" : ""}>
      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">{label}</label>
      <div className="flex gap-2">
        <div className="flex-[2]">
           <SearchableSelect
              options={months}
              value={monthStr || ""}
              onChange={handleMonthChange}
              placeholder={disabled ? "—" : t("common.month")}
              disabled={disabled}
              clearOnSelect={false}
           />
        </div>
        <div className="flex-1 min-w-[100px]">
           <SearchableSelect
              options={years}
              value={yearStr || ""}
              onChange={handleYearChange}
              onAdd={handleYearChange}
              placeholder={disabled ? t("year.present") : t("common.years")}
              disabled={disabled}
              creatable
              clearOnSelect={false} 
           />
        </div>
      </div>
    </div>
  );
};

export default MonthYearPicker;
    