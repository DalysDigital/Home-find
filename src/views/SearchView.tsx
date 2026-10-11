import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, Map, LayoutGrid, X, RotateCcw, GitCompare, Check } from 'lucide-react';
import { Property, FilterState, LocalityInfo } from '../types';
import { PropertyCard } from '../components/PropertyCard';
import { InteractiveMapPreview } from '../components/InteractiveMapPreview';

interface SearchViewProps {
  properties: Property[];
  localities: LocalityInfo[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onScheduleTour: (property: Property) => void;
  initialFilters?: Partial<FilterState>;
  onOpenCompare: () => void;
  comparedProperties: Property[];
  onToggleCompare: (property: Property) => void;
}

export const SearchView: React.FC<SearchViewProps> = ({
  properties,
  localities,
  favorites,
  onToggleFavorite,
  onSelectProperty,
  onScheduleTour,
  initialFilters = {},
  onOpenCompare,
  comparedProperties,
  onToggleCompare,
}) => {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: initialFilters.searchQuery || '',
    purpose: initialFilters.purpose || 'All',
    propertyType: initialFilters.propertyType || '',
    locality: initialFilters.locality || '',
    minPrice: initialFilters.minPrice || 0,
    maxPrice: initialFilters.maxPrice || 3000000,
    bedrooms: initialFilters.bedrooms || 'All',
    bathrooms: initialFilters.bathrooms || 'All',
    amenities: initialFilters.amenities || [],
    sortBy: initialFilters.sortBy || 'newest',
  });

  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const allAmenitiesList = [
    'Air Conditioning',
    'Covered Parking',
    'In-Unit Washer & Dryer',
    'Pet Friendly',
    'Balcony',
    'Private Garden',
    'Gymnasium',
    'Smart Home System',
    'Floor-to-Ceiling Glass',
    'Solar Panels'
  ];

  // Filter logic
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      // Search query (title, address, description, locality)
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesQuery =
          p.title.toLowerCase().includes(q) ||
          p.locality.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // Purpose
      if (filters.purpose !== 'All' && p.purpose !== filters.purpose) {
        return false;
      }

      // Property Type
      if (filters.propertyType && p.propertyType !== filters.propertyType) {
        return false;
      }

      // Locality
      if (filters.locality && p.locality !== filters.locality) {
        return false;
      }

      // Price Range
      if (p.price < filters.minPrice || p.price > filters.maxPrice) {
        return false;
      }

      // Bedrooms
      if (filters.bedrooms !== 'All') {
        const minBeds = parseInt(filters.bedrooms, 10);
        if (filters.bedrooms.includes('+')) {
          if (p.bedrooms < minBeds) return false;
        } else {
          if (p.bedrooms !== minBeds) return false;
        }
      }

      // Bathrooms
      if (filters.bathrooms !== 'All') {
        const minBaths = parseInt(filters.bathrooms, 10);
        if (p.bathrooms < minBaths) return false;
      }

      // Amenities check
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every((a) =>
          p.amenities.includes(a)
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'area-desc') return b.areaSqFt - a.areaSqFt;
      // newest default
      return new Date(b.dateListed).getTime() - new Date(a.dateListed).getTime();
    });
  }, [properties, filters]);

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      purpose: 'All',
      propertyType: '',
      locality: '',
      minPrice: 0,
      maxPrice: 3000000,
      bedrooms: 'All',
      bathrooms: 'All',
      amenities: [],
      sortBy: 'newest',
    });
  };

  const handleToggleAmenity = (amenity: string) => {
    setFilters((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const activeFilterCount =
    (filters.purpose !== 'All' ? 1 : 0) +
    (filters.propertyType ? 1 : 0) +
    (filters.locality ? 1 : 0) +
    (filters.bedrooms !== 'All' ? 1 : 0) +
    (filters.bathrooms !== 'All' ? 1 : 0) +
    filters.amenities.length +
    (filters.searchQuery ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Search Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Property Catalog
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Showing <strong className="font-mono text-slate-900 tabular-nums">{filteredProperties.length}</strong> matching residences
          </p>
        </div>

        {/* View Switcher & Mobile Filter Toggle */}
        <div className="flex items-center gap-3">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="md:hidden flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters ({activeFilterCount})</span>
          </button>

          {/* Grid vs Map Segmented Control */}
          <div className="flex items-center p-1 bg-slate-200/80 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                viewMode === 'map'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>Map</span>
            </button>
          </div>

          {/* Compare launcher if items exist */}
          {comparedProperties.length > 0 && (
            <button
              onClick={onOpenCompare}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm"
            >
              <GitCompare className="w-4 h-4" />
              <span>Compare ({comparedProperties.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Layout: Filters Sidebar Left, Content Right */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        {/* Filters Sidebar */}
        <aside
          className={`space-y-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm md:block ${
            showMobileFilters ? 'block' : 'hidden'
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-900" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">Filters</h2>
            </div>
            {activeFilterCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="text-[11px] text-slate-500 hover:text-slate-900 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Keyword Search */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">Keywords</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Title, street, or amenities..."
                value={filters.searchQuery}
                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                className="w-full pl-8 pr-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
          </div>

          {/* Purpose: All / Rent / Sale */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">Transaction Purpose</label>
            <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium">
              {(['All', 'Rent', 'Sale'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setFilters({ ...filters, purpose: p })}
                  className={`py-1.5 rounded-md transition-colors ${
                    filters.purpose === p
                      ? 'bg-white text-slate-900 shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Property Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">Property Type</label>
            <select
              value={filters.propertyType}
              onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
              className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
            >
              <option value="">All Types</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Villa">Villa</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Studio">Studio</option>
            </select>
          </div>

          {/* Locality */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">Neighborhood</label>
            <select
              value={filters.locality}
              onChange={(e) => setFilters({ ...filters, locality: e.target.value })}
              className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
            >
              <option value="">All Neighborhoods</option>
              {localities.map((l) => (
                <option key={l.id} value={l.name}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>

          {/* Bedrooms & Bathrooms */}
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">Bedrooms</label>
              <div className="flex items-center gap-1">
                {['All', '1', '2', '3', '4+'].map((beds) => (
                  <button
                    key={beds}
                    type="button"
                    onClick={() => setFilters({ ...filters, bedrooms: beds })}
                    className={`flex-1 py-1 text-xs font-medium rounded-lg border transition-colors ${
                      filters.bedrooms === beds
                        ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {beds}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">Bathrooms</label>
              <div className="flex items-center gap-1">
                {['All', '1', '2', '3', '4'].map((baths) => (
                  <button
                    key={baths}
                    type="button"
                    onClick={() => setFilters({ ...filters, bathrooms: baths })}
                    className={`flex-1 py-1 text-xs font-medium rounded-lg border transition-colors ${
                      filters.bathrooms === baths
                        ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {baths}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-700">Max Budget</label>
              <span className="font-mono tabular-nums font-bold text-slate-900">
                ${filters.maxPrice.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="1000"
              max="3000000"
              step="50000"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
              className="w-full accent-slate-900"
            />
          </div>

          {/* Amenities checklist */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-semibold text-slate-700 block">Key Amenities</label>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {allAmenitiesList.map((amenity) => (
                <label
                  key={amenity}
                  className="flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.amenities.includes(amenity)}
                    onChange={() => handleToggleAmenity(amenity)}
                    className="rounded border-slate-300 text-slate-900 focus:ring-0"
                  />
                  <span>{amenity}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Catalog Main Content */}
        <div className="md:col-span-3 space-y-6">
          {/* Sorting and Active Filters row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-white rounded-xl border border-slate-200">
            {/* Active filters inline indicators (clean unboxed text per constitution) */}
            <div className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto">
              <span>Filter:</span>
              <span className="font-medium text-slate-900">{filters.purpose} Purpose</span>
              {filters.propertyType && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-medium text-slate-900">{filters.propertyType}</span>
                </>
              )}
              {filters.locality && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-medium text-slate-900">{filters.locality}</span>
                </>
              )}
              {filters.bedrooms !== 'All' && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-medium text-slate-900">{filters.bedrooms} Beds</span>
                </>
              )}
            </div>

            {/* Sort order dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <label className="text-xs text-slate-500 font-medium">Sort:</label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
                className="px-2.5 py-1 text-xs border border-slate-200 rounded-lg bg-white text-slate-800 font-medium"
              >
                <option value="newest">Newest Listed</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="area-desc">Area: Largest First</option>
              </select>
            </div>
          </div>

          {/* Results: Grid or Map */}
          {filteredProperties.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">No properties matched your criteria</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try broadening your budget, clearing selected amenities, or switching neighborhoods.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-2 py-2 px-4 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((prop) => (
                <PropertyCard
                  key={prop.id}
                  property={prop}
                  isFavorite={favorites.includes(prop.id)}
                  onToggleFavorite={onToggleFavorite}
                  onSelectProperty={onSelectProperty}
                  onScheduleTour={onScheduleTour}
                  isCompared={comparedProperties.some((p) => p.id === prop.id)}
                  onToggleCompare={onToggleCompare}
                />
              ))}
            </div>
          ) : (
            <InteractiveMapPreview
              properties={filteredProperties}
              onSelectProperty={onSelectProperty}
              onScheduleTour={onScheduleTour}
            />
          )}
        </div>
      </div>
    </div>
  );
};
