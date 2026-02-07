
import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  error, 
  type = "text", 
  disabled, 
  onKeyDown, 
  onFocus, 
  onBlur, 
  required,
  className = ""
}) => (
  <div className={`${disabled ? "opacity-50 pointer-events-none" : "group"} ${className}`}>
    {label && (
      <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1.5 ml-1 transition-colors group-focus-within:text-electric-blue">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    )}
    <input 
      type={type} 
      value={value}
      onChange={onChange}
      disabled={disabled}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      className={`w-full bg-gray-50/50 dark:bg-black/20 border ${error ? 'border-red-500' : 'border-gray-200 dark:border-white/10'} rounded-xl px-4 py-3 text-sm font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-electric-blue/20 focus:border-electric-blue outline-none transition-all disabled:cursor-not-allowed`} 
      placeholder={placeholder} 
    />
    {error && <p className="text-red-500 text-xs mt-1 animate-fadeIn ml-1">{error}</p>}
  </div>
);

export default InputField;
