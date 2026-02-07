import React, { useState, useRef, useEffect } from 'react';

export interface Option {
  value: string;
  label: string;
}

export interface OptionGroup {
  label: string;
  options: (Option | string)[];
}

interface SearchableSelectProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  onAdd?: (value: string) => void;
  options: (Option | string | OptionGroup)[];
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  creatable?: boolean;
  searchable?: boolean;
  clearOnSelect?: boolean; 
  className?: string;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  label,
  value,
  onChange,
  onAdd,
  options,
  placeholder,
  error,
  disabled,
  creatable = false,
  searchable = true,
  clearOnSelect, 
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const shouldClear = clearOnSelect !== undefined ? clearOnSelect : creatable;

  const normalizeOptions = () => {
    return options.map(opt => {
      if (typeof opt === 'object' && 'options' in opt) {
        return {
          label: opt.label,
          isGroup: true,
          options: (opt as OptionGroup).options.map(o => typeof o === 'string' ? { value: o, label: o } : o)
        };
      } else {
        return typeof opt === 'string' ? { value: opt, label: opt, isGroup: false } : { ...opt, isGroup: false };
      }
    });
  };

  const normalizedStructure = normalizeOptions();

  const flatOptions = normalizedStructure.flatMap(item => {
    if (item.isGroup) {
      return (item as any).options;
    }
    return item;
  });

  useEffect(() => {
    if (!shouldClear && value) {
      const selected = flatOptions.find((o: any) => o.value === value);
      if (selected) {
        setInputValue(selected.label);
      } else if (creatable) {
        setInputValue(value);
      }
    } else if (!shouldClear && !value) {
      setInputValue("");
    }
  }, [value, shouldClear, creatable, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        if (!shouldClear && value) {
             const selected = flatOptions.find((o: any) => o.value === value);
             if (selected) setInputValue(selected.label);
             else if (creatable) setInputValue(value);
             else setInputValue("");
        } else if (!shouldClear) {
            setInputValue("");
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [value, shouldClear, creatable, flatOptions]);

  const filterOptions = () => {
    const selectedOption = flatOptions.find((o: any) => o.value === value);
    if (!shouldClear && selectedOption && inputValue === selectedOption.label && !isOpen) {
        return normalizedStructure;
    }

    if (!searchable || !inputValue) return normalizedStructure;

    const lowerInput = inputValue.toLowerCase();

    return normalizedStructure.map((item: any) => {
      if (item.isGroup) {
        const filteredSubOptions = item.options.filter((o: any) => o.label.toLowerCase().includes(lowerInput));
        if (filteredSubOptions.length > 0) {
          return { ...item, options: filteredSubOptions };
        }
        return null;
      } else {
        return item.label.toLowerCase().includes(lowerInput) ? item : null;
      }
    }).filter(Boolean);
  };

  const filteredStructure = filterOptions();

  const handleSelect = (opt: Option) => {
    if (onChange) onChange(opt.value);
    if (onAdd) onAdd(opt.value);
    
    setInputValue(shouldClear ? "" : opt.label);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      const flatFiltered = filteredStructure.flatMap((item: any) => item.isGroup ? item.options : item);
      
      if (isOpen && flatFiltered.length > 0) {
          const exactMatch = flatFiltered.find((o: any) => o.label.toLowerCase() === inputValue.toLowerCase());
          if (exactMatch) {
              handleSelect(exactMatch);
              return;
          } else if (flatFiltered.length === 1 && !creatable) {
              handleSelect(flatFiltered[0]);
              return;
          }
      }
      
      if (creatable && inputValue.trim()) {
         if (onAdd) onAdd(inputValue.trim());
         if (onChange) onChange(inputValue.trim());
         setInputValue(shouldClear ? "" : inputValue.trim());
         setIsOpen(false);
      }
    }
  };

  return (
    <div className={`relative ${disabled ? "opacity-50 pointer-events-none" : ""} ${className}`} ref={wrapperRef}>
      {label && <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">{label}</label>}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          readOnly={!searchable && !creatable} 
          onChange={(e) => {
             if (searchable || creatable) {
                setInputValue(e.target.value);
                setIsOpen(true);
             }
          }}
          onFocus={() => {
              setIsOpen(true);
              if (searchable && inputRef.current) {
                  inputRef.current.select(); 
              }
          }}
          onClick={() => {
              if (!isOpen) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          className={`w-full bg-white dark:bg-white/5 border ${error ? 'border-red-500' : 'border-gray-200 dark:border-white/10'} rounded-xl px-4 py-3 pr-10 text-gray-900 dark:text-white focus:ring-2 focus:ring-electric-blue outline-none transition-all disabled:cursor-not-allowed ${!searchable ? 'cursor-pointer' : ''}`}
          autoComplete="off"
        />
        <div 
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 dark:hover:text-gray-200"
          onClick={() => {
              if (!disabled) {
                  setIsOpen(!isOpen);
                  if (!isOpen && searchable && inputRef.current) {
                      inputRef.current.focus();
                  }
              }
          }}
        >
            {creatable && shouldClear ? (
                <span className="material-symbols-outlined text-sm">add_circle</span>
            ) : (
                <span className="material-symbols-outlined text-sm">expand_more</span>
            )}
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 max-h-60 overflow-y-auto bg-white dark:bg-[#1a202c] border border-gray-200 dark:border-white/10 rounded-xl shadow-lg animate-fadeIn">
          {filteredStructure.length > 0 ? (
            filteredStructure.map((item: any, idx: number) => {
                if (item.isGroup) {
                    return (
                        <div key={idx}>
                            <div className="px-4 py-1.5 text-xs font-bold text-gray-500 bg-gray-50 dark:bg-white/5 uppercase tracking-wider sticky top-0">
                                {item.label}
                            </div>
                            {item.options.map((opt: any) => (
                                <div
                                    key={opt.value}
                                    className={`px-4 py-2 text-sm cursor-pointer flex justify-between items-center transition-colors pl-6 ${
                                        value === opt.value && !shouldClear 
                                        ? 'bg-electric-blue/10 text-electric-blue font-semibold' 
                                        : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5'
                                    }`}
                                    onClick={() => handleSelect(opt)}
                                >
                                    {opt.label}
                                    {value === opt.value && !shouldClear && <span className="material-symbols-outlined text-sm">check</span>}
                                </div>
                            ))}
                        </div>
                    );
                } else {
                    return (
                        <div
                            key={item.value}
                            className={`px-4 py-2 text-sm cursor-pointer flex justify-between items-center transition-colors ${
                                value === item.value && !shouldClear
                                ? 'bg-electric-blue/10 text-electric-blue font-semibold' 
                                : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5'
                            }`}
                            onClick={() => handleSelect(item)}
                        >
                            {item.label}
                            {value === item.value && !shouldClear && <span className="material-symbols-outlined text-sm">check</span>}
                        </div>
                    );
                }
            })
          ) : !creatable ? (
              <div className="px-4 py-3 text-sm text-gray-400 italic text-center">No options found</div>
          ) : null}

          {creatable && inputValue && !flatOptions.find((o: any) => o.label.toLowerCase() === inputValue.toLowerCase()) && (
             <div 
                className="px-4 py-2 text-sm text-electric-blue hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer font-medium border-t border-gray-100 dark:border-white/5 sticky bottom-0 bg-white dark:bg-[#1a202c]"
                onClick={() => {
                    if (onAdd) onAdd(inputValue.trim());
                    if (onChange) onChange(inputValue.trim());
                    setInputValue(shouldClear ? "" : inputValue.trim());
                    setIsOpen(false);
                }}
             >
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">add</span>
                    <span>Add "{inputValue}"</span>
                </div>
             </div>
          )}
        </div>
      )}
      
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default SearchableSelect;