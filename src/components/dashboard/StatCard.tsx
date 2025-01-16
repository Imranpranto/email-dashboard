import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({ 
  icon: Icon, 
  title, 
  value, 
  description, 
  trend, 
  className = '' 
}: StatCardProps) {
  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 tracking-wide">{title}</p>
          <h3 className="text-2xl font-bold mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{value}</h3>
          {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          )}
          {trend && (
            <p className={`text-sm mt-2 font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? '↑' : '↓'} {trend.value}%
            </p>
          )}
        </div>
        <div className="p-3 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 rounded-lg">
          <Icon className="w-6 h-6 text-indigo-600 opacity-80" />
        </div>
      </div>
    </div>
  );
}