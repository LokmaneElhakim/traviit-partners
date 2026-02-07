
import { createClient } from '@supabase/supabase-js'
import { UnifiedCV, RecruiterRegistration } from '../types/forms';

// Safe environment variable access for browser environments
const getEnv = (key: string, defaultValue: string) => {
  try {
    // @ts-ignore
    if (typeof process !== 'undefined' && process.env) {
      // @ts-ignore
      return process.env[key] || defaultValue;
    }
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      // @ts-ignore
      return import.meta.env[key] || defaultValue;
    }
    return defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

const SUPABASE_URL = getEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://mock.supabase.co');
const SUPABASE_KEY = getEnv('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY', 'mock-key');

// Mock client for UI demo purposes
export const supabase = {
    auth: {
        signUp: async ({ email, password }: any) => {
            console.log("Mock SignUp:", email);
            return { data: { user: { id: 'mock-user-id', email } }, error: null };
        },
        signInWithPassword: async ({ email, password }: any) => {
            console.log("Mock SignIn:", email);
            if (password === 'error') return { error: { message: "Invalid credentials" } };
            return { data: { user: { id: 'mock-user-id', email } }, error: null };
        }
    },
    from: (table: string) => ({
        upsert: async (data: any) => { console.log(`Mock Upsert ${table}:`, data); return { error: null }; },
        insert: async (data: any) => { 
            console.log(`Mock Insert ${table}:`, data); 
            return { data: { id: 'mock-id', ...data }, select: () => ({ single: async () => ({ data: { id: 'mock-id', ...data }, error: null }) }), error: null }; 
        },
        select: () => ({ single: async () => ({ data: {}, error: null }) })
    })
};

// Helper to calculate total years of experience
const calculateTotalExperience = (experiences: any[]): number => {
    if (!experiences || experiences.length === 0) return 0;
    
    let totalMonths = 0;
    experiences.forEach(exp => {
        const start = new Date(exp.period.start);
        const end = exp.period.isCurrent ? new Date() : new Date(exp.period.end);
        
        if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
            // distinct months roughly
            totalMonths += (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        }
    });

    return Math.floor(totalMonths / 12);
};

/**
 * MOCK: Saves Candidate Profile
 */
export const saveCandidateCV = async (cvData: UnifiedCV, password?: string) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  console.log("Mock Save Candidate CV Data:", cvData);
  return { id: 'mock-candidate-id', user_id: 'mock-user-id' };
};

/**
 * MOCK: Saves Recruiter Profile
 */
export const saveRecruiterProfile = async (formData: any) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Mock Save Recruiter Data:", formData);
    return { user: { id: 'mock-recruiter-id' }, company: { id: 'mock-company-id' } };
};
