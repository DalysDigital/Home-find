import React, { useState } from 'react';
import { MapPin, Navigation, Eye, Calendar, Sparkles } from 'lucide-react';
import { Property } from '../types';

interface InteractiveMapPreviewProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onScheduleTour: (property: Property) => void;
}

export const InteractiveMapPreview: React.FC<InteractiveMapPreviewProps> = ({
  properties,
  onSelectProperty,
  onScheduleTour,
}) => {
  const [activePin, setActivePin] = useState<Property | null>(properties[0] || null);

  // Approximate relative mapping for coordinates to SVG canvas (800 x 500)
  const getCoordinates = (p: Property, idx: number) => {
    // Distribute pins across realistic aesthetic map zones
    const positions = [
      { x: 190, y: 140 }, // West Hills
      { x: 420, y: 130 }, // Old Town
      { x: 520, y: 260 }, // Financial District
      { x: 620, y: 320 }, // Arts District
      { x: 310, y: 400 }, // Harbor Point
      { x: 230, y: 190 }, // West Hills 2
      { x: 570, y: 360 }, // Arts District 2
      { x: 470, y: 170 }, // Old Town 2
    ];
    return positions[idx % positions.length];
  };

  return (
    <div className="relative w-full h-[600px] bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-lg select-none">
      {/* Background stylized vector map */}
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 800 500"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.8" />
          </pattern>
        </defs>

        {/* Base Water & Landmasses */}
        <rect width="800" height="500" fill="#0f172a" />
        <rect width="800" height="500" fill="url(#mapGrid)" />

        {/* River & Harbor inlet */}
        <path
          d="M0,380 Q250,420 380,360 T800,430 L800,500 L0,500 Z"
          fill="#0c4a6e"
          opacity="0.35"
        />
        <path
          d="M380,360 Q440,290 490,210 T560,0 L510,0 Q460,190 350,340 Z"
          fill="#0c4a6e"
          opacity="0.25"
        />

        {/* District Boundaries / Road Network */}
        <path
          d="M50,180 Q300,160 550,240 T800,260"
          fill="none"
          stroke="#334155"
          strokeWidth="3.5"
          strokeDasharray="6,4"
        />
        <path
          d="M200,40 L280,480"
          fill="none"
          stroke="#334155"
          strokeWidth="2.5"
        />
        <path
          d="M480,30 L520,490"
          fill="none"
          stroke="#334155"
          strokeWidth="2.5"
        />
        <path
          d="M350,100 L750,140"
          fill="none"
          stroke="#334155"
          strokeWidth="2"
        />

        {/* District Neighborhood Labels */}
        <text x="120" y="90" fill="#64748b" fontSize="11" fontWeight="700" letterSpacing="1.5">WEST HILLS</text>
        <text x="370" y="80" fill="#64748b" fontSize="11" fontWeight="700" letterSpacing="1.5">OLD TOWN</text>
        <text x="540" y="220" fill="#64748b" fontSize="11" fontWeight="700" letterSpacing="1.5">FINANCIAL CORE</text>
        <text x="640" y="300" fill="#64748b" fontSize="11" fontWeight="700" letterSpacing="1.5">ARTS DISTRICT</text>
        <text x="240" y="440" fill="#38bdf8" fontSize="11" fontWeight="700" letterSpacing="1.5" opacity="0.8">HARBOR POINT QUAY</text>
      </svg>

      {/* Interactive Property Map Pins */}
      {properties.map((p, idx) => {
        const pos = getCoordinates(p, idx);
        const isSelected = activePin?.id === p.id;
        const formattedPrice =
          p.purpose === 'Rent'
            ? `$${p.price.toLocaleString()}/mo`
            : `$${(p.price / 1000).toFixed(0)}k`;

        return (
          <div
            key={p.id}
            style={{ left: `${(pos.x / 800) * 100}%`, top: `${(pos.y / 500) * 100}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <button
              type="button"
              onClick={() => setActivePin(p)}
              className={`group flex items-center gap-1.5 px-2.5 py-1.5 rounded-full font-mono text-xs font-bold transition-all shadow-md transform hover:scale-110 ${
                isSelected
                  ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/30 scale-105 z-30'
                  : 'bg-slate-900 text-white border border-slate-700 hover:bg-slate-800'
              }`}
            >
              <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : 'text-amber-400'}`} />
              <span className="tabular-nums">{formattedPrice}</span>
            </button>
          </div>
        );
      })}

      {/* Floating Property Detail Preview Card */}
      {activePin && (
        <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:w-96 z-30 bg-white rounded-xl shadow-2xl border border-slate-200 p-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-start gap-3">
            <img
              src={activePin.images[0]}
              alt={activePin.title}
              className="w-24 h-20 object-cover rounded-lg shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold uppercase">
                <span>{activePin.purpose}</span>
                <span>·</span>
                <span>{activePin.propertyType}</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 truncate mt-0.5">
                {activePin.title}
              </h4>
              <div className="text-xs font-bold text-slate-900 font-mono tabular-nums mt-1">
                ${activePin.price.toLocaleString()} {activePin.purpose === 'Rent' ? '/ month' : ''}
              </div>
              <div className="text-[11px] text-slate-500 truncate mt-0.5">
                {activePin.bedrooms} Beds · {activePin.bathrooms} Baths · {activePin.areaSqFt} sq ft
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
            <button
              onClick={() => onSelectProperty(activePin)}
              className="flex-1 py-1.5 px-3 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Full Details</span>
            </button>
            <button
              onClick={() => onScheduleTour(activePin)}
              className="flex-1 py-1.5 px-3 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center gap-1 shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Schedule Tour</span>
            </button>
          </div>
        </div>
      )}

      {/* Map Helper overlay */}
      <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2 pointer-events-none">
        <Navigation className="w-3.5 h-3.5 text-amber-400" />
        <span>Metro City Verified Coordinates</span>
      </div>
    </div>
  );
};
