// frontend/src/components/MobileMenuBar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart3, Lightbulb } from 'lucide-react';

const MobileMenuBar = () => {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700/50 shadow-lg z-30">
      <div className="flex justify-around items-center h-16">
        <NavLink
          to="/"
          className={({ isActive }) => 
            `flex flex-col items-center justify-center space-y-1 w-full transition-colors duration-200 ${
              isActive ? 'text-blue-400' : 'text-slate-400 hover:text-white'
            }`
          }
        >
          <Lightbulb size={24} />
          <span className="text-xs font-medium">Generator</span>
        </NavLink>
        
        <NavLink
          to="/dashboard"
          className={({ isActive }) => 
            `flex flex-col items-center justify-center space-y-1 w-full transition-colors duration-200 ${
              isActive ? 'text-blue-400' : 'text-slate-400 hover:text-white'
            }`
          }
        >
          <BarChart3 size={24} />
          <span className="text-xs font-medium">Dashboard</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default MobileMenuBar;