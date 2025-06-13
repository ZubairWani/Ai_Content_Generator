import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Lightbulb, BarChart3, Sparkles, LogOut, User, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-72 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl flex flex-col flex-shrink-0">
      <div>
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Creator Studio
              </h1>
              <p className="text-xs text-slate-400">Professional Dashboard</p>
            </div>
          </div>
        </div>
        
        <nav className="p-4 space-y-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-300'
                  : 'hover:bg-slate-700/50 text-slate-300 hover:text-white'
              }`
            }
          >
            <BarChart3 className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </NavLink>
          
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-300'
                  : 'hover:bg-slate-700/50 text-slate-300 hover:text-white'
              }`
            }
          >
            <Lightbulb className="w-5 h-5" />
            <span className="font-medium">AI Idea Generator</span>
          </NavLink>
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-slate-700/50">
        {user ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs text-slate-400">{user.email}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="p-2 rounded-lg hover:bg-slate-700 transition-colors" title="Logout">
              <LogOut className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        ) : (
          <NavLink
            to="/login"
            className="flex items-center justify-center space-x-2 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
          >
            <LogIn className="w-5 h-5" />
            <span>Login / Sign Up</span>
          </NavLink>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;