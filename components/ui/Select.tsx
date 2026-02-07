
import React, { useState, useRef, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  options: (Option | string)[];
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  placeholder,
  error,
  className = "",
  value,
  onChange,
  disabled
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const normalizedOptions: Option[] = options.map(opt => 
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  const selectedOption = normalizedOptions.find(o => o.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    if (onChange) onChange(val);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${disabled ? "opacity-50 pointer-events-none" : "group"} ${className}`} ref={wrapperRef}>
      {label && (
        <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1.5 ml-1 transition-colors group-focus-within:text-electric-blue">
          {label}
        </label>
      )}
      
      <div 
        className={`w-full bg-gray-50/50 dark:bg-black/20 border ${error ? 'border-red-500' : 'border-gray-200 dark:border-white/10'} rounded-xl px-4 py-3 text-sm font-medium text-gray-900 dark:text-white focus-within:ring-2 focus-within:ring-electric-blue/20 focus-within:border-electric-blue outline-none transition-all cursor-pointer flex justify-between items-center`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className={!selectedOption ? "text-gray-400" : ""}>
          {selectedOption ? selectedOption.label : (placeholder || "Select...")}
        </span>
        <span className="material-symbols-outlined text-sm text-gray-400">expand_more</span>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 max-h-60 overflow-y-auto bg-white dark:bg-[#1a202c] border border-gray-200 dark:border-white/10 rounded-xl shadow-lg animate-fadeIn">
          {normalizedOptions.map((opt) => (
            <div
              key={opt.value}
              className={`px-4 py-2 text-sm cursor-pointer flex justify-between items-center transition-colors ${
                value === opt.value 
                ? 'bg-electric-blue/10 text-electric-blue font-semibold' 
                : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5'
              }`}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
              {value === opt.value && <span className="material-symbols-outlined text-sm">check</span>}
            </div>
          ))}
          {normalizedOptions.length === 0 && (
             <div className="px-4 py-3 text-sm text-gray-400 italic text-center">No options available</div>
          )}
        </div>
      )}

      {error && <p className="text-red-500 text-xs mt-1 animate-fadeIn ml-1">{error}</p>}
    </div>
  );
};

export default Select;
