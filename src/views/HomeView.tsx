import React, { useState } from 'react';
import { Search, MapPin, Building, DollarSign, ArrowRight, ShieldCheck, CalendarCheck, Clock, Award, Sparkles } from 'lucide-react';
import { Property, LocalityInfo, FilterState } from '../types';
import { PropertyCard } from '../components/PropertyCard';

interface HomeViewProps {
  properties: Property[];
  localities: LocalityInfo[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onScheduleTour: (property: Property) => void;
  onNavigateToSearch: (filters?: Partial<FilterState>) => void;
  onNavigateToLocalities: () => void;
  onToggleCompare?: (property: Property) => void;
  comparedIds?: string[];
}

export const HomeView: React.FC<HomeViewProps> = ({
  properties,
  localities,
  favorites,
  onToggleFavorite,
  onSelectProperty,
  onScheduleTour,
  onNavigateToSearch,
  onNavigateToLocalities,
  onToggleCompare,
  comparedIds = [],
}) => {
  // Quick Search state
  const [purpose, setPurpose] = useState<'Rent' | 'Sale'>('Rent');
  const [selectedLocality, setSelectedLocality] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [query, setQuery] = useState('');

  const featuredProperties = properties.filter((p) => p.featured).slice(0, 4);

  const categories = [
    { type: 'Apartment', count: '142 listings', desc: 'Modern high-rises and flats' },
    { type: 'Villa', count: '38 listings', desc: 'Hillside estates with pools' },
    { type: 'Townhouse', count: '65 listings', desc: 'Historic brick architecture' },
    { type: 'Penthouse', count: '24 listings', desc: 'Panoramic skyline views' },
    { type: 'Studio', count: '89 listings', desc: 'Urban open-concept spaces' }
  ];

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigateToSearch({
      purpose,
      locality: selectedLocality === 'All' ? '' : selectedLocality,
      propertyType: selectedType === 'All' ? '' : selectedType,
      searchQuery: query
    });
  };

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Discover Verified Residential Real Estate in Metro City</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] [text-wrap:balance]">
            Find your sanctuary with complete confidence.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Browse verified apartments, townhouses, and luxury villas. Schedule instant in-person or live virtual tours with zero hidden fees.
          </p>
        </div>

        {/* Unified Search Console */}
        <div className="mt-10 max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 p-4 sm:p-5">
          {/* Rent / Sale Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
            <button
              type="button"
              onClick={() => setPurpose('Rent')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                purpose === 'Rent'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Rent a Home
            </button>
            <button
              type="button"
              onClick={() => setPurpose('Sale')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                purpose === 'Sale'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Buy a Property
            </button>
          </div>

          <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            {/* Search input */}
            <div className="sm:col-span-1">
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">Keywords</label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="e.g. Garden, Pool, Terrace..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>
            </div>

            {/* Neighborhood */}
            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">Neighborhood</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                <select
                  value={selectedLocality}
                  onChange={(e) => setSelectedLocality(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                >
                  <option value="All">All Neighborhoods</option>
                  {localities.map((loc) => (
                    <option key={loc.id} value={loc.name}>
                      {loc.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Property Type */}
            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">Property Type</label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                >
                  <option value="All">All Property Types</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Studio">Studio</option>
                  <option value="House">House</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Search className="w-4 h-4 text-amber-400" />
                <span>Search Properties</span>
              </button>
            </div>
          </form>
        </div>

        {/* 4-Column Proof & Metric Strip below Hero Split */}
        <div className="mt-12 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-white rounded-xl border border-slate-200 text-center">
          <div>
            <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">1,420+</div>
            <div className="text-xs text-slate-500 mt-0.5">Verified Listings</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">98.4%</div>
            <div className="text-xs text-slate-500 mt-0.5">Tour Satisfaction</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">0%</div>
            <div className="text-xs text-slate-500 mt-0.5">Hidden Broker Markup</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">&lt; 15 min</div>
            <div className="text-xs text-slate-500 mt-0.5">Average Host Response</div>
          </div>
        </div>
      </section>

      {/* Property Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Explore by Category</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Curated residences tailored for every urban lifestyle</p>
          </div>
          <button
            onClick={() => onNavigateToSearch()}
            className="text-xs font-semibold text-slate-900 hover:text-slate-600 flex items-center gap-1 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
          {categories.map((cat) => (
            <button
              key={cat.type}
              onClick={() => onNavigateToSearch({ propertyType: cat.type })}
              className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-400 text-left transition-all hover:shadow-sm group"
            >
              <div className="font-bold text-slate-900 text-sm group-hover:text-amber-600 transition-colors">
                {cat.type}
              </div>
              <div className="text-xs font-mono tabular-nums text-slate-500 mt-0.5">{cat.count}</div>
              <p className="text-[11px] text-slate-400 mt-2 line-clamp-1">{cat.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Properties Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Featured Residences</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Inspected and verified residences available for immediate viewing</p>
          </div>
          <button
            onClick={() => onNavigateToSearch()}
            className="text-xs font-semibold text-slate-900 hover:text-slate-600 flex items-center gap-1 transition-colors"
          >
            <span>Explore Entire Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProperties.map((prop) => (
            <PropertyCard
              key={prop.id}
              property={prop}
              isFavorite={favorites.includes(prop.id)}
              onToggleFavorite={onToggleFavorite}
              onSelectProperty={onSelectProperty}
              onScheduleTour={onScheduleTour}
              isCompared={comparedIds.includes(prop.id)}
              onToggleCompare={onToggleCompare}
            />
          ))}
        </div>
      </section>

      {/* Neighborhood Spotlight Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Neighborhood Spotlight</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Explore walkability, school ratings, and median rent across districts</p>
          </div>
          <button
            onClick={onNavigateToLocalities}
            className="text-xs font-semibold text-slate-900 hover:text-slate-600 flex items-center gap-1 transition-colors"
          >
            <span>All Neighborhoods</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {localities.slice(0, 3).map((loc) => (
            <div
              key={loc.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="aspect-[16/9] bg-slate-900 relative">
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-sm text-white px-2.5 py-1 rounded text-xs font-bold">
                  {loc.name}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {loc.overview}
                  </p>

                  <div className="grid grid-cols-3 gap-2 text-center pt-3 mt-3 border-t border-slate-100">
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <div className="text-xs font-mono font-bold text-emerald-600 tabular-nums">{loc.walkScore}/100</div>
                      <div className="text-[10px] text-slate-400">Walk Score</div>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <div className="text-xs font-mono font-bold text-sky-600 tabular-nums">{loc.transitScore}/100</div>
                      <div className="text-[10px] text-slate-400">Transit</div>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <div className="text-xs font-mono font-bold text-amber-600 tabular-nums">{loc.safetyScore}/100</div>
                      <div className="text-[10px] text-slate-400">Safety</div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-500">
                    Avg rent: <strong>${loc.avgRentMonthly.toLocaleString()}</strong>/mo
                  </span>
                  <button
                    onClick={() => onNavigateToSearch({ locality: loc.name })}
                    className="font-semibold text-slate-900 hover:text-slate-600 flex items-center gap-1"
                  >
                    <span>Browse {loc.listingsCount}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose HomeFinder - Trust pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12">
          <div className="max-w-2xl space-y-3 mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Engineered for seamless real estate decisions.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              We replaced obsolete paper listings and high agent friction with verified property records, instant online tour bookings, and transparent pricing data.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2 p-4 bg-white/5 rounded-xl border border-white/10">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Title-Verified Properties</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every listing is matched against registered land deed and identity checks before going live.
              </p>
            </div>

            <div className="space-y-2 p-4 bg-white/5 rounded-xl border border-white/10">
              <CalendarCheck className="w-6 h-6 text-amber-400" />
              <h3 className="text-sm font-bold text-white">Direct Tour Scheduling</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Choose in-person walks or live video tours directly with landlords without phone tag.
              </p>
            </div>

            <div className="space-y-2 p-4 bg-white/5 rounded-xl border border-white/10">
              <Award className="w-6 h-6 text-sky-400" />
              <h3 className="text-sm font-bold text-white">Zero Broker Markups</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Transparent rent and sale prices set directly by confirmed property owners and licensed agents.
              </p>
            </div>

            <div className="space-y-2 p-4 bg-white/5 rounded-xl border border-white/10">
              <Clock className="w-6 h-6 text-purple-400" />
              <h3 className="text-sm font-bold text-white">Rapid Move-In Flow</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Digital pre-screening and rapid messaging reduce average time-to-lease to under 48 hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
