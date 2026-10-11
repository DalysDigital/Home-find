import React from 'react';
import { X, Check, Trash2, Calendar } from 'lucide-react';
import { Property } from '../types';

interface CompareModalProps {
  properties: Property[];
  onClose: () => void;
  onRemoveFromCompare: (id: string) => void;
  onScheduleTour: (property: Property) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  properties,
  onClose,
  onRemoveFromCompare,
  onScheduleTour,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white">
          <div>
            <h2 className="text-base font-bold text-slate-900">Side-by-Side Property Comparison</h2>
            <p className="text-xs text-slate-500">
              Comparing {properties.length} selected residences
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {properties.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            No properties selected for comparison. Click the compare icon on any property card.
          </div>
        ) : (
          <div className="p-6 overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-3 px-3 text-slate-400 font-semibold uppercase tracking-wider w-40">
                    Feature
                  </th>
                  {properties.map((p) => (
                    <th key={p.id} className="py-3 px-3 w-64 align-top">
                      <div className="space-y-2">
                        <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-slate-100">
                          <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                          <button
                            onClick={() => onRemoveFromCompare(p.id)}
                            className="absolute top-2 right-2 p-1.5 bg-slate-950/80 hover:bg-rose-600 text-white rounded-md transition-colors"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="font-bold text-slate-900 text-sm line-clamp-1">{p.title}</div>
                        <div className="text-slate-500 text-[11px] truncate">{p.locality}</div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-3 px-3 font-semibold text-slate-500">Price</td>
                  {properties.map((p) => (
                    <td key={p.id} className="py-3 px-3 font-mono font-bold text-sm text-slate-900 tabular-nums">
                      ${p.price.toLocaleString()} {p.purpose === 'Rent' ? '/ mo' : ''}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-slate-500">Purpose & Type</td>
                  {properties.map((p) => (
                    <td key={p.id} className="py-3 px-3">
                      {p.purpose} · {p.propertyType}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-slate-500">Price / sq ft</td>
                  {properties.map((p) => (
                    <td key={p.id} className="py-3 px-3 font-mono tabular-nums text-slate-600">
                      ${Math.round(p.price / p.areaSqFt).toLocaleString()} / sq ft
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-slate-500">Bedrooms / Baths</td>
                  {properties.map((p) => (
                    <td key={p.id} className="py-3 px-3 font-mono tabular-nums">
                      {p.bedrooms} Beds / {p.bathrooms} Baths
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-slate-500">Floor Area</td>
                  {properties.map((p) => (
                    <td key={p.id} className="py-3 px-3 font-mono tabular-nums">
                      {p.areaSqFt.toLocaleString()} sq ft
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-slate-500">Year Built</td>
                  {properties.map((p) => (
                    <td key={p.id} className="py-3 px-3 font-mono tabular-nums">
                      {p.yearBuilt}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-slate-500">Walk & Transit</td>
                  {properties.map((p) => (
                    <td key={p.id} className="py-3 px-3">
                      <span className="font-mono font-semibold text-emerald-600">{p.localityData.walkScore}</span> Walk ·{' '}
                      <span className="font-mono font-semibold text-sky-600">{p.localityData.transitScore}</span> Transit
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-slate-500">Safety Index</td>
                  {properties.map((p) => (
                    <td key={p.id} className="py-3 px-3 font-mono font-semibold text-slate-800">
                      {p.localityData.safetyScore} / 100
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-slate-500">Key Amenities</td>
                  {properties.map((p) => (
                    <td key={p.id} className="py-3 px-3 text-[11px] leading-relaxed text-slate-600">
                      {p.amenities.slice(0, 4).join(', ')}...
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 px-3 font-semibold text-slate-500">Book Tour</td>
                  {properties.map((p) => (
                    <td key={p.id} className="py-4 px-3">
                      <button
                        onClick={() => {
                          onClose();
                          onScheduleTour(p);
                        }}
                        className="w-full py-2 px-3 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>Schedule</span>
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
