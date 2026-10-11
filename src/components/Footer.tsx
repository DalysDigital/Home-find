import React from 'react';
import { Home, Mail, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Home className="w-4 h-4 text-amber-400" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white font-sans">HomeFinder</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Verified residential real estate discovery, interactive tour scheduling, and transparent rental transactions.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Verified Titles & Owners</span>
            </div>
          </div>

          {/* Discovery Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Discover</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('search')} className="hover:text-white transition-colors text-left">
                  Apartments for Rent
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('search')} className="hover:text-white transition-colors text-left">
                  Luxury Villas for Sale
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('search')} className="hover:text-white transition-colors text-left">
                  Historic Townhouses
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('localities')} className="hover:text-white transition-colors text-left">
                  Neighborhood Walk Scores
                </button>
              </li>
            </ul>
          </div>

          {/* Solutions & Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('how-it-works')} className="hover:text-white transition-colors text-left">
                  How Tour Scheduling Works
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors text-left">
                  Landlord & Host Portal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors text-left">
                  Tenant Identity Verification
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="hover:text-white transition-colors text-left">
                  Platform Moderation Center
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Assistance */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Support & Offices</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>support@homefinder.local</span>
              </div>
              <p className="text-[11px] text-slate-500 pt-2">
                Metro City Real Estate Operations · License #RE-90214-METRO
              </p>
            </div>
          </div>
        </div>

        {/* Hairline Separator and Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} HomeFinder Platform. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('how-it-works')} className="hover:text-slate-400 transition-colors">
              Terms of Service
            </button>
            <button onClick={() => onNavigate('how-it-works')} className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => onNavigate('localities')} className="hover:text-slate-400 transition-colors">
              Locality Directory
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
