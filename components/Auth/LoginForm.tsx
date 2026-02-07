
"use client";

import React, { useState } from 'react';
import Button from '../ui/Button';
import { supabase } from '../../utils/supabaseClient';
import { useLanguage } from '../../context/LanguageContext';

const InputField = ({ label, value, onChange, placeholder, type = "text", error }: any) => (
  <div>
    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
      {label}
    </label>
    <input 
      type={type} 
      value={value}
      onChange={onChange}
      className={`w-full bg-white dark:bg-white/5 border ${error ? 'border-red-500' : 'border-gray-200 dark:border-white/10'} rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-electric-blue outline-none transition-all`} 
      placeholder={placeholder} 
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const LoginForm = ({ onSwitchToSignup }: { onSwitchToSignup: () => void }) => {
    const { t } = useLanguage();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        setLoading(true);
        setError('');
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            // Handle success (e.g. redirect or show dashboard)
            alert("Logged in successfully! (Dashboard functionality coming soon)");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-card rounded-[32px] p-8 md:p-12 max-w-md mx-auto w-full animate-fadeIn border border-white/20 dark:border-white/10 bg-white/90 dark:bg-[#0B1120]/90 backdrop-blur-xl">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">{t('login.title')}</h2>
            <p className="text-gray-500 dark:text-gray-400 text-center mb-8">{t('login.subtitle')}</p>
            
            <div className="space-y-6">
                <InputField 
                    label={t('form.email')}
                    type="email"
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                />
                <InputField 
                    label={t('form.password')}
                    type="password"
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                    placeholder="••••••••"
                />
                
                {error && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-lg text-xs text-red-600 dark:text-red-300">
                        {error}
                    </div>
                )}

                <Button fullWidth onClick={handleLogin} isLoading={loading} size="lg">
                    {t('login.submit')}
                </Button>

                <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-100 dark:border-white/5">
                    {t('login.noAccount')}{' '}
                    <button onClick={onSwitchToSignup} className="text-electric-blue font-bold hover:underline transition-colors">
                        {t('login.register')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
