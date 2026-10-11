import React, { useState } from 'react';
import { X, MapPin, CheckCircle2, Calendar, MessageSquare, Heart, Shield, Calculator, Car, Sparkles, School, Bus, Share2, Check } from 'lucide-react';
import { Property } from '../types';

interface PropertyDetailModalProps {
  property: Property;
  onClose: () => void;
  onScheduleTour: (property: Property) => void;
  onOpenInquiry: (property: Property) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  onScheduleTour,
  onOpenInquiry,
  isFavorite,
  onToggleFavorite,
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Mortgage Calculator State
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.25);
  const [loanYears, setLoanYears] = useState(30);

  const propertyPrice = property.price;
  const downPayment = (propertyPrice * downPaymentPercent) / 100;
  const loanAmount = propertyPrice - downPayment;

  // Monthly mortgage calculation
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanYears * 12;
  const monthlyMortgage =
    property.purpose === 'Sale'
      ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : property.price;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(property.price);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-md border-b border-slate-200">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-900">{property.propertyType}</span>
            <span aria-hidden="true">·</span>
            <span>{property.locality}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">Ref: #{property.id.toUpperCase()}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              title="Copy share link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => onToggleFavorite(property.id)}
              className={`p-2 rounded-lg transition-colors ${
                isFavorite
                  ? 'bg-rose-50 text-rose-600'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="Save to favorites"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="max-h-[82vh] overflow-y-auto px-6 py-6 space-y-8">
          {/* Gallery View */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-900 shadow-inner">
              <img
                src={property.images[activeImageIdx] || property.images[0]}
                alt={property.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 text-xs font-bold bg-slate-950/80 backdrop-blur-sm text-white rounded">
                  {property.purpose === 'Rent' ? 'FOR RENT' : 'FOR SALE'}
                </span>
                {property.verified && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-emerald-950/80 backdrop-blur-sm text-emerald-300 rounded">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Verified Title
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails row */}
            {property.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-24 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIdx === idx
                        ? 'border-slate-900 scale-[1.02] shadow-sm'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Core Info & Title */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                {property.title}
              </h1>
              <div className="flex items-center gap-1.5 text-sm text-slate-500">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{property.address}, {property.locality}, {property.city} {property.zipCode}</span>
              </div>
            </div>

            <div className="text-left sm:text-right shrink-0">
              <div className="text-3xl font-bold tracking-tight text-slate-900 font-mono tabular-nums">
                {formattedPrice}
                {property.purpose === 'Rent' && (
                  <span className="text-sm font-normal text-slate-500 font-sans ml-1">
                    / mo
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-500 font-mono tabular-nums mt-0.5">
                Est. ${Math.round(property.price / property.areaSqFt).toLocaleString()} per sq ft
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 text-slate-700">
            <div>
              <div className="text-xs text-slate-400 uppercase font-medium">Bedrooms</div>
              <div className="text-lg font-bold text-slate-900 font-mono tabular-nums">{property.bedrooms} Beds</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase font-medium">Bathrooms</div>
              <div className="text-lg font-bold text-slate-900 font-mono tabular-nums">{property.bathrooms} Baths</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase font-medium">Floor Area</div>
              <div className="text-lg font-bold text-slate-900 font-mono tabular-nums">{property.areaSqFt.toLocaleString()} sq ft</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase font-medium">Year Built</div>
              <div className="text-lg font-bold text-slate-900 font-mono tabular-nums">{property.yearBuilt}</div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">About This Residence</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Amenities checklist */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Features & Amenities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {property.amenities.map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Locality Insights & Scorecard */}
          <div className="space-y-3 p-5 bg-slate-900 text-white rounded-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold tracking-wide">Neighborhood & Connectivity</h3>
              <span className="text-xs text-slate-400 font-mono">{property.locality}</span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center pt-2">
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
                  {property.localityData.walkScore}/100
                </div>
                <div className="text-xs text-slate-400 mt-1 font-medium">Walk Score</div>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="text-2xl font-bold font-mono text-sky-400 tabular-nums">
                  {property.localityData.transitScore}/100
                </div>
                <div className="text-xs text-slate-400 mt-1 font-medium">Transit Score</div>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="text-2xl font-bold font-mono text-amber-400 tabular-nums">
                  {property.localityData.safetyScore}/100
                </div>
                <div className="text-xs text-slate-400 mt-1 font-medium">Safety Score</div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <School className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>Schools:</strong> {property.localityData.nearbySchools}</span>
              </div>
              <div className="flex items-center gap-2">
                <Bus className="w-4 h-4 text-sky-400 shrink-0" />
                <span><strong>Transit:</strong> {property.localityData.nearestTransit}</span>
              </div>
            </div>
          </div>

          {/* Financial / Mortgage Calculator */}
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-slate-700" />
                <h3 className="text-sm font-semibold text-slate-900">
                  {property.purpose === 'Sale' ? 'Estimated Mortgage Breakdown' : 'Estimated Monthly Costs'}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(monthlyMortgage)}
                </span>
                <span className="text-xs text-slate-500 ml-1">/ month</span>
              </div>
            </div>

            {property.purpose === 'Sale' ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="text-slate-600 block mb-1">
                    Down Payment: <strong>{downPaymentPercent}%</strong> (${Math.round(downPayment).toLocaleString()})
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    step="5"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full accent-slate-900"
                  />
                </div>
                <div>
                  <label className="text-slate-600 block mb-1">
                    Interest Rate: <strong>{interestRate}%</strong>
                  </label>
                  <input
                    type="range"
                    min="3.5"
                    max="10"
                    step="0.25"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full accent-slate-900"
                  />
                </div>
                <div>
                  <label className="text-slate-600 block mb-1">
                    Loan Term: <strong>{loanYears} Years</strong>
                  </label>
                  <select
                    value={loanYears}
                    onChange={(e) => setLoanYears(Number(e.target.value))}
                    className="w-full p-1.5 border border-slate-300 rounded-md bg-white text-slate-800"
                  >
                    <option value={15}>15-Year Fixed</option>
                    <option value={20}>20-Year Fixed</option>
                    <option value={30}>30-Year Fixed</option>
                  </select>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500">
                Monthly rent includes building maintenance & waste collection. Security deposit standard is 1 month rent ($
                {property.price.toLocaleString()}) refundable upon lease completion.
              </p>
            )}
          </div>

          {/* Host / Agent Section */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border border-slate-200 rounded-xl bg-white">
            <div className="flex items-center gap-3">
              <img
                src={property.landlord.avatar}
                alt={property.landlord.name}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-cover border border-slate-200"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-slate-900">{property.landlord.name}</span>
                  {property.landlord.verified && (
                    <Shield className="w-3.5 h-3.5 text-emerald-600" />
                  )}
                </div>
                <div className="text-xs text-slate-500">{property.landlord.role} · Responds {property.landlord.responseTime}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => onOpenInquiry(property)}
                className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Message Host</span>
              </button>
              <button
                onClick={() => onScheduleTour(property)}
                className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Schedule Tour</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
