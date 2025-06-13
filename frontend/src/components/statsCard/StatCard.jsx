import React from 'react';
import { TrendingUp } from 'lucide-react';

const StatCard = ({ icon, title, value, change, trend, color }) => {
  const colorClasses = {
    blue: 'from-blue-500/10 to-blue-600/10 text-blue-600 border-blue-500/20',
    red: 'from-red-500/10 to-red-600/10 text-red-600 border-red-500/20',
    green: 'from-green-500/10 to-green-600/10 text-green-600 border-green-500/20',
    purple: 'from-purple-500/10 to-purple-600/10 text-purple-600 border-purple-500/20'
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${colorClasses[color]} border`}>
          {icon}
        </div>
        <div className={`flex items-center space-x-1 text-sm font-medium ${
          trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          <TrendingUp className={`w-4 h-4 ${trend === 'up' ? '' : 'rotate-180'}`} />
          <span>{change}</span>
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-slate-800 mb-1">{value}</h3>
        <p className="text-slate-600 text-sm">{title}</p>
      </div>
    </div>
  );
};

export default StatCard;