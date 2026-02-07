
import React from 'react';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, icon, trend, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 flex flex-col justify-between ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">{label}</div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</div>
        </div>
        {icon && (
          <div className="w-10 h-10 rounded-full bg-electric-blue/10 flex items-center justify-center text-electric-blue">
            <span className="material-symbols-outlined">{icon}</span>
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-4 flex items-center gap-1 text-xs font-bold">
            <span className={`material-symbols-outlined text-sm ${trend === 'up' ? 'text-green-500 rotate-45' : trend === 'down' ? 'text-red-500 -rotate-45' : 'text-gray-400'}`}>
                arrow_upward
            </span>
            <span className={trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-400'}>
                {trend === 'up' ? '+12%' : trend === 'down' ? '-5%' : '0%'} vs last month
            </span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;
