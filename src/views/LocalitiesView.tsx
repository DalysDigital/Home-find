import React, { useState } from 'react';
import { MapPin, ArrowRight, School, Bus, Shield, TrendingUp, Search } from 'lucide-react';
import { LocalityInfo, FilterState } from '../types';

interface LocalitiesViewProps {
  localities: LocalityInfo[];
  onNavigateToSearch: (filters: Partial<FilterState>) => void;
}

export const LocalitiesView: React.FC<LocalitiesViewProps> = ({
  localities,
  onNavigateToSearch,
}) => {
  const [search, setSearch] = useState('');

  const filteredLocalities = localities.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.overview.toLowerCase().includes(search.toLowerCase()) ||
      l.highlights.some((h) => h.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Neighborhood & Locality Guide
          </h1>
          <p className="text-sm text-slate-500">
            Compare pedestrian walkability, subway links, school ratings, and rent metrics across Metro City
          </p>
        </div>

        {/* Search bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search neighborhood or vibe..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
        </div>
      </div>

      {/* Grid of Localities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredLocalities.map((loc) => (
          <div
            key={loc.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] bg-slate-900">
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-sm text-white px-3 py-1 rounded text-xs font-bold">
                  {loc.name}
                </div>
                <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-sm text-slate-200 px-2.5 py-1 rounded text-[11px] font-mono">
                  {loc.listingsCount} Verified Listings
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed">
                  {loc.overview}
                </p>

                {/* Scorecards */}
                <div className="grid grid-cols-3 gap-2 text-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <div className="text-base font-bold font-mono text-emerald-600 tabular-nums">
                      {loc.walkScore}/100
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium">Walk Score</div>
                  </div>
                  <div>
                    <div className="text-base font-bold font-mono text-sky-600 tabular-nums">
                      {loc.transitScore}/100
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium">Transit Score</div>
                  </div>
                  <div>
                    <div className="text-base font-bold font-mono text-amber-600 tabular-nums">
                      {loc.safetyScore}/100
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium">Safety Score</div>
                  </div>
                </div>

                {/* Financial Medians */}
                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100 font-mono text-slate-600">
                  <div>
                    Median Rent: <strong className="text-slate-900">${loc.avgRentMonthly.toLocaleString()}</strong>/mo
                  </div>
                  <div>
                    Median Sale: <strong className="text-slate-900">${loc.avgSaleSqFt}</strong>/sq ft
                  </div>
                </div>

                {/* Unboxed Highlights */}
                <div className="flex flex-wrap gap-x-2 gap-y-1 text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                  {loc.highlights.map((h, idx) => (
                    <React.Fragment key={h}>
                      <span>{h}</span>
                      {idx < loc.highlights.length - 1 && <span className="text-slate-300">·</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">Metro City District</span>
              <button
                onClick={() => onNavigateToSearch({ locality: loc.name })}
                className="py-1.5 px-4 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span>Browse {loc.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
