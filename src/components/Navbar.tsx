import React, { useState } from 'react';
import { Home, Heart, PlusCircle, UserCheck, Shield, Compass, MapPin, HelpCircle, LayoutDashboard, ChevronDown } from 'lucide-react';
import { AppUser } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  favoritesCount: number;
  currentUser: AppUser;
  setCurrentUser: React.Dispatch<React.SetStateAction<AppUser>>;
  onOpenListModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  favoritesCount,
  currentUser,
  setCurrentUser,
  onOpenListModal,
}) => {
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const roles: Array<{ role: AppUser['role']; label: string }> = [
    { role: 'Tenant / Buyer', label: 'Tenant / Buyer View' },
    { role: 'Landlord / Host', label: 'Landlord / Host View' },
    { role: 'Licensed Agent', label: 'Licensed Agent View' },
    { role: 'Platform Admin', label: 'Platform Admin View' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 text-left text-slate-900 group whitespace-nowrap shrink-0 focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-sm group-hover:bg-slate-800 transition-colors">
              <Home className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">
              HomeFinder
            </span>
          </button>

          {/* Zone 2: 4-5 clean single-line nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              onClick={() => setActiveTab('search')}
              className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 ${
                activeTab === 'search' ? 'text-slate-900 font-semibold' : ''
              }`}
            >
              <Compass className="w-4 h-4 text-slate-400" />
              <span>Explore Listings</span>
            </button>

            <button
              onClick={() => setActiveTab('localities')}
              className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 ${
                activeTab === 'localities' ? 'text-slate-900 font-semibold' : ''
              }`}
            >
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>Neighborhoods</span>
            </button>

            <button
              onClick={() => setActiveTab('how-it-works')}
              className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 ${
                activeTab === 'how-it-works' ? 'text-slate-900 font-semibold' : ''
              }`}
            >
              <HelpCircle className="w-4 h-4 text-slate-400" />
              <span>How It Works</span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 ${
                activeTab === 'dashboard' ? 'text-slate-900 font-semibold' : ''
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-slate-400" />
              <span>Dashboard</span>
            </button>

            {currentUser.role === 'Platform Admin' && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 ${
                  activeTab === 'admin' ? 'text-slate-900 font-semibold' : ''
                }`}
              >
                <Shield className="w-4 h-4 text-amber-500" />
                <span>Admin Portal</span>
              </button>
            )}
          </nav>

          {/* Zone 3: 1 primary action + role switch */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Saved shortcut */}
            <button
              onClick={() => {
                setActiveTab('dashboard');
              }}
              aria-label="Saved favorites"
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors relative"
              title="Saved Favorites"
            >
              <Heart className="w-5 h-5" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-slate-950 text-[10px] font-bold rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Role Demo Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
                title="Switch active role context"
              >
                <UserCheck className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline">{currentUser.role}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showRoleMenu && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1">
                  <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Simulate Role
                  </div>
                  {roles.map((item) => (
                    <button
                      key={item.role}
                      onClick={() => {
                        setCurrentUser((prev) => ({ ...prev, role: item.role }));
                        setShowRoleMenu(false);
                        if (item.role === 'Platform Admin') {
                          setActiveTab('admin');
                        }
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors flex items-center justify-between ${
                        currentUser.role === item.role
                          ? 'bg-slate-100 text-slate-900 font-semibold'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <span>{item.label}</span>
                      {currentUser.role === item.role && (
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Primary Action Button */}
            <button
              onClick={onOpenListModal}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shadow-sm"
            >
              <PlusCircle className="w-4 h-4 text-amber-400" />
              <span>List Property</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
