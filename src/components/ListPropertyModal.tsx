import React, { useState } from 'react';
import { X, PlusCircle, CheckCircle2, Home, Building2, MapPin, DollarSign, Sparkles } from 'lucide-react';
import { Property, PropertyType, ListingPurpose, AppUser } from '../types';
import { createArchitecturalSvg } from '../data/mockData';

interface ListPropertyModalProps {
  currentUser: AppUser;
  onClose: () => void;
  onAddProperty: (property: Property) => void;
}

export const ListPropertyModal: React.FC<ListPropertyModalProps> = ({
  currentUser,
  onClose,
  onAddProperty,
}) => {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [purpose, setPurpose] = useState<ListingPurpose>('Rent');
  const [propertyType, setPropertyType] = useState<PropertyType>('Apartment');
  const [price, setPrice] = useState<number>(2800);
  const [locality, setLocality] = useState('West Hills Heights');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Metro City');
  const [zipCode, setZipCode] = useState('90210');
  const [bedrooms, setBedrooms] = useState<number>(2);
  const [bathrooms, setBathrooms] = useState<number>(2);
  const [areaSqFt, setAreaSqFt] = useState<number>(1200);
  const [yearBuilt, setYearBuilt] = useState<number>(2023);
  const [description, setDescription] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'Air Conditioning',
    'Hardwood Flooring',
    'In-Unit Washer & Dryer'
  ]);
  const [artStyle, setArtStyle] = useState<'villa' | 'penthouse' | 'townhouse' | 'loft' | 'garden' | 'coastal'>('loft');
  const [isSuccess, setIsSuccess] = useState(false);

  const allAmenities = [
    'Air Conditioning',
    'Covered Parking',
    'In-Unit Washer & Dryer',
    'Pet Friendly',
    'Balcony',
    'Hardwood Flooring',
    'Dishwasher',
    'Private Garden',
    'Gymnasium',
    'High-Speed Fiber',
    'Smart Home System',
    'Solar Panels'
  ];

  const handleToggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProperty: Property = {
      id: `prop-${Date.now().toString().slice(-4)}`,
      title: title || `${propertyType} on ${address || 'Main Street'}`,
      purpose,
      propertyType,
      price,
      period: purpose === 'Rent' ? 'month' : undefined,
      locality,
      address: address || '120 Promenade Way',
      city,
      zipCode,
      bedrooms,
      bathrooms,
      areaSqFt,
      yearBuilt,
      featured: false,
      verified: true,
      status: 'Active',
      description:
        description ||
        `Spacious and bright ${propertyType.toLowerCase()} positioned in ${locality}. Carefully renovated with contemporary fittings and close to transit.`,
      amenities: selectedAmenities,
      images: [
        createArchitecturalSvg(title || 'New Residence', artStyle),
        createArchitecturalSvg('Interior Suite', 'loft')
      ],
      coordinates: { lat: 34.052, lng: -118.243 },
      landlord: {
        id: currentUser.id,
        name: currentUser.name,
        phone: currentUser.phone,
        email: currentUser.email,
        verified: true,
        role: currentUser.role === 'Licensed Agent' ? 'Licensed Agent' : 'Owner',
        avatar: currentUser.avatar,
        responseTime: 'Under 1 hour'
      },
      localityData: {
        walkScore: 88,
        transitScore: 85,
        safetyScore: 92,
        nearbySchools: 'Metro District Central School (0.4 mi)',
        nearestTransit: 'Central Metro Line Station (0.3 mi)'
      },
      dateListed: new Date().toISOString().split('T')[0]
    };

    onAddProperty(newProperty);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-bold text-slate-900">
              {isSuccess ? 'Listing Published!' : 'List a Property on HomeFinder'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Your Property Is Now Live!</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              <strong>{title || propertyType}</strong> is immediately indexed in the public search catalogue and will be presented to prospective tenants and buyers.
            </p>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="py-2 px-6 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
              >
                View in Dashboard
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Step Indicators */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 text-xs font-medium">
              <button
                type="button"
                onClick={() => setStep(1)}
                className={`flex items-center gap-1.5 ${step === 1 ? 'text-slate-900 font-bold' : 'text-slate-400'}`}
              >
                <span className="w-5 h-5 rounded-full border flex items-center justify-center font-mono text-[10px]">1</span>
                <span>Type & Pricing</span>
              </button>
              <button
                type="button"
                onClick={() => setStep(2)}
                className={`flex items-center gap-1.5 ${step === 2 ? 'text-slate-900 font-bold' : 'text-slate-400'}`}
              >
                <span className="w-5 h-5 rounded-full border flex items-center justify-center font-mono text-[10px]">2</span>
                <span>Location & Specs</span>
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className={`flex items-center gap-1.5 ${step === 3 ? 'text-slate-900 font-bold' : 'text-slate-400'}`}
              >
                <span className="w-5 h-5 rounded-full border flex items-center justify-center font-mono text-[10px]">3</span>
                <span>Amenities & Details</span>
              </button>
            </div>

            {/* Step 1: Type & Pricing */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">Listing Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sunny Terrace Penthouse with Skyline Views"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">Transaction Purpose</label>
                    <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-lg">
                      <button
                        type="button"
                        onClick={() => {
                          setPurpose('Rent');
                          if (price > 10000) setPrice(3200);
                        }}
                        className={`py-1.5 text-xs font-medium rounded-md transition-colors ${
                          purpose === 'Rent' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600'
                        }`}
                      >
                        Rent
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setPurpose('Sale');
                          if (price < 10000) setPrice(850000);
                        }}
                        className={`py-1.5 text-xs font-medium rounded-md transition-colors ${
                          purpose === 'Sale' ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600'
                        }`}
                      >
                        Sale
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">Property Type</label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                    >
                      <option value="Apartment">Apartment</option>
                      <option value="House">House</option>
                      <option value="Villa">Villa</option>
                      <option value="Townhouse">Townhouse</option>
                      <option value="Penthouse">Penthouse</option>
                      <option value="Studio">Studio</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Price ({purpose === 'Rent' ? 'Monthly in USD' : 'Total in USD'})
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-xs text-slate-400 font-mono">$</span>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full pl-7 pr-3 py-2 text-xs border border-slate-300 rounded-lg font-mono tabular-nums focus:outline-none focus:ring-1 focus:ring-slate-900"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="py-2 px-5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    Continue to Location & Specs &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Location & Specs */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">Neighborhood / Locality</label>
                    <select
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                    >
                      <option value="West Hills Heights">West Hills Heights</option>
                      <option value="Old Town Heritage">Old Town Heritage</option>
                      <option value="Financial District">Financial District</option>
                      <option value="Arts District">Arts District</option>
                      <option value="Harbor Point">Harbor Point</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">Street Address</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 144 Sunset Boulevard"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2.5">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">Bedrooms</label>
                    <input
                      type="number"
                      min="0"
                      max="12"
                      value={bedrooms}
                      onChange={(e) => setBedrooms(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg font-mono tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">Bathrooms</label>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={bathrooms}
                      onChange={(e) => setBathrooms(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg font-mono tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">Area (sq ft)</label>
                    <input
                      type="number"
                      min="200"
                      value={areaSqFt}
                      onChange={(e) => setAreaSqFt(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg font-mono tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">Year Built</label>
                    <input
                      type="number"
                      min="1900"
                      max="2026"
                      value={yearBuilt}
                      onChange={(e) => setYearBuilt(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg font-mono tabular-nums"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="py-2 px-4 text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    &larr; Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="py-2 px-5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    Continue to Amenities &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Amenities & Final Details */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-2">Select Amenities</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {allAmenities.map((amenity) => (
                      <label
                        key={amenity}
                        className={`flex items-center gap-2 p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                          selectedAmenities.includes(amenity)
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedAmenities.includes(amenity)}
                          onChange={() => handleToggleAmenity(amenity)}
                          className="sr-only"
                        />
                        <span className="truncate">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">Architectural Presentation Style</label>
                  <select
                    value={artStyle}
                    onChange={(e) => setArtStyle(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="loft">Industrial Loft Style</option>
                    <option value="penthouse">Modern Skyline Penthouse</option>
                    <option value="villa">Luxury Hillside Villa</option>
                    <option value="townhouse">Historic Brick Townhouse</option>
                    <option value="garden">Garden Green Residence</option>
                    <option value="coastal">Waterfront & Marina</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">Description & Highlights</label>
                  <textarea
                    rows={3}
                    placeholder="Describe natural lighting, high-end appliances, pet rules, nearby parks..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 resize-none"
                  />
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="py-2 px-4 text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    &larr; Back
                  </button>
                  <button
                    type="submit"
                    className="py-2.5 px-6 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>Publish Listing</span>
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};
