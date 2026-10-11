import React from 'react';
import { Heart, MapPin, CheckCircle2, Calendar, Eye, GitCompare } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onScheduleTour: (property: Property) => void;
  isCompared?: boolean;
  onToggleCompare?: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isFavorite,
  onToggleFavorite,
  onSelectProperty,
  onScheduleTour,
  isCompared,
  onToggleCompare,
}) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(property.price);

  return (
    <div className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-slate-300 transition-all duration-200 flex flex-col h-full hover:shadow-md">
      {/* Image Showcase */}
      <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden cursor-pointer" onClick={() => onSelectProperty(property)}>
        <img
          src={property.images[0]}
          alt={property.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
        />

        {/* Top Badges / Indicators: subtle, not garish candy pills */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-semibold bg-slate-950/80 backdrop-blur-sm text-white rounded">
            {property.purpose === 'Rent' ? 'For Rent' : 'For Sale'}
          </span>
          {property.verified && (
            <span className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium bg-emerald-950/80 backdrop-blur-sm text-emerald-300 rounded">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              Verified
            </span>
          )}
        </div>

        {/* Favorite & Compare Action Buttons */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          {onToggleCompare && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(property);
              }}
              title={isCompared ? 'Remove from compare' : 'Compare property'}
              className={`p-2 rounded-lg backdrop-blur-md transition-colors ${
                isCompared
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-950/70 hover:bg-slate-950 text-white'
              }`}
            >
              <GitCompare className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(property.id);
            }}
            title={isFavorite ? 'Remove from favorites' : 'Save property'}
            className={`p-2 rounded-lg backdrop-blur-md transition-colors ${
              isFavorite
                ? 'bg-rose-500 text-white'
                : 'bg-slate-950/70 hover:bg-slate-950 text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom image overlay gradient with subtle locality */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent p-3 pt-6 text-white flex items-center justify-between text-xs">
          <span className="font-medium text-slate-200 truncate max-w-[200px]">
            {property.propertyType}
          </span>
          <span className="text-slate-300 font-mono text-[11px]">
            Built {property.yearBuilt}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Price */}
          <div className="flex items-baseline justify-between gap-2">
            <div className="text-xl font-bold tracking-tight text-slate-900 font-mono tabular-nums">
              {formattedPrice}
              {property.purpose === 'Rent' && (
                <span className="text-xs font-normal text-slate-500 font-sans ml-1">
                  / month
                </span>
              )}
            </div>
            <div className="text-[11px] text-slate-400 font-mono tabular-nums">
              ${Math.round(property.price / property.areaSqFt).toLocaleString()}/sq ft
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelectProperty(property)}
            className="text-base font-semibold text-slate-900 hover:text-slate-700 transition-colors cursor-pointer mt-1 line-clamp-1"
          >
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{property.address}, {property.locality}</span>
          </div>

          {/* Zero-Pill Unboxed Metadata with Typographic Separator */}
          <div className="flex items-center gap-2 text-xs text-slate-600 mt-3 pt-3 border-t border-slate-100 font-medium">
            <span>{property.bedrooms} Beds</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>{property.bathrooms} Baths</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="font-mono tabular-nums">{property.areaSqFt.toLocaleString()} sq ft</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onSelectProperty(property)}
            className="flex-1 py-2 px-3 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Details</span>
          </button>

          <button
            type="button"
            onClick={() => onScheduleTour(property)}
            className="flex-1 py-2 px-3 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Book Tour</span>
          </button>
        </div>
      </div>
    </div>
  );
};
