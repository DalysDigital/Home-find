import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { ScheduleTourModal } from './components/ScheduleTourModal';
import { InquiryModal } from './components/InquiryModal';
import { CompareModal } from './components/CompareModal';
import { ListPropertyModal } from './components/ListPropertyModal';

import { HomeView } from './views/HomeView';
import { SearchView } from './views/SearchView';
import { LocalitiesView } from './views/LocalitiesView';
import { HowItWorksView } from './views/HowItWorksView';
import { DashboardView } from './views/DashboardView';
import { AdminView } from './views/AdminView';

import {
  INITIAL_PROPERTIES,
  INITIAL_LOCALITIES,
  INITIAL_BOOKINGS,
  INITIAL_INQUIRIES,
  CURRENT_USER
} from './data/mockData';
import { Property, TourBooking, InquiryMessage, AppUser, FilterState } from './types';

export default function App() {
  // Global Application State
  const [activeTab, setActiveTab] = useState<string>('home');
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [localities] = useState(INITIAL_LOCALITIES);
  const [bookings, setBookings] = useState<TourBooking[]>(INITIAL_BOOKINGS);
  const [inquiries, setInquiries] = useState<InquiryMessage[]>(INITIAL_INQUIRIES);
  const [currentUser, setCurrentUser] = useState<AppUser>(CURRENT_USER);
  const [favorites, setFavorites] = useState<string[]>(['prop-102']);
  const [comparedProperties, setComparedProperties] = useState<Property[]>([]);

  // Navigation Filter handoff state for SearchView
  const [searchFilters, setSearchFilters] = useState<Partial<FilterState>>({});

  // Active Modals
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [tourProperty, setTourProperty] = useState<Property | null>(null);
  const [inquiryProperty, setInquiryProperty] = useState<Property | null>(null);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Favorite toggle handler
  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Compare toggle handler
  const handleToggleCompare = (property: Property) => {
    setComparedProperties((prev) => {
      const exists = prev.some((p) => p.id === property.id);
      if (exists) {
        return prev.filter((p) => p.id !== property.id);
      }
      if (prev.length >= 3) {
        alert('You can compare a maximum of 3 properties simultaneously.');
        return prev;
      }
      return [...prev, property];
    });
  };

  const handleRemoveFromCompare = (id: string) => {
    setComparedProperties((prev) => prev.filter((p) => p.id !== id));
  };

  // Booking confirmed handler
  const handleConfirmBooking = (newBooking: TourBooking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  // Inquiry sent handler
  const handleSendInquiry = (newInquiry: InquiryMessage) => {
    setInquiries((prev) => [newInquiry, ...prev]);
  };

  // Add new property handler
  const handleAddProperty = (newProperty: Property) => {
    setProperties((prev) => [newProperty, ...prev]);
    setActiveTab('dashboard');
  };

  // Smooth route navigations
  const handleNavigateToSearch = (filters?: Partial<FilterState>) => {
    if (filters) {
      setSearchFilters(filters);
    }
    setActiveTab('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToLocalities = () => {
    setActiveTab('localities');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-amber-100 selection:text-slate-900">
      {/* Top Bar Contract (One-row, 3-zone, single-line brand and nav) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        favoritesCount={favorites.length}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        onOpenListModal={() => setIsListModalOpen(true)}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView
            properties={properties}
            localities={localities}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectProperty={(p) => setSelectedProperty(p)}
            onScheduleTour={(p) => setTourProperty(p)}
            onNavigateToSearch={handleNavigateToSearch}
            onNavigateToLocalities={handleNavigateToLocalities}
            onToggleCompare={handleToggleCompare}
            comparedIds={comparedProperties.map((p) => p.id)}
          />
        )}

        {activeTab === 'search' && (
          <SearchView
            properties={properties}
            localities={localities}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectProperty={(p) => setSelectedProperty(p)}
            onScheduleTour={(p) => setTourProperty(p)}
            initialFilters={searchFilters}
            onOpenCompare={() => setIsCompareModalOpen(true)}
            comparedProperties={comparedProperties}
            onToggleCompare={handleToggleCompare}
          />
        )}

        {activeTab === 'localities' && (
          <LocalitiesView
            localities={localities}
            onNavigateToSearch={handleNavigateToSearch}
          />
        )}

        {activeTab === 'how-it-works' && (
          <HowItWorksView
            onNavigateToSearch={() => handleNavigateToSearch()}
            onOpenListModal={() => setIsListModalOpen(true)}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardView
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            properties={properties}
            bookings={bookings}
            setBookings={setBookings}
            inquiries={inquiries}
            setInquiries={setInquiries}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectProperty={(p) => setSelectedProperty(p)}
            onOpenListModal={() => setIsListModalOpen(true)}
            onScheduleTour={(p) => setTourProperty(p)}
          />
        )}

        {activeTab === 'admin' && (
          <AdminView
            properties={properties}
            setProperties={setProperties}
            bookings={bookings}
            setBookings={setBookings}
            localities={localities}
            onSelectProperty={(p) => setSelectedProperty(p)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* MODAL 1: Property Detail Modal */}
      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onScheduleTour={(p) => {
            setSelectedProperty(null);
            setTourProperty(p);
          }}
          onOpenInquiry={(p) => {
            setSelectedProperty(null);
            setInquiryProperty(p);
          }}
          isFavorite={favorites.includes(selectedProperty.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {/* MODAL 2: Schedule Tour Modal */}
      {tourProperty && (
        <ScheduleTourModal
          property={tourProperty}
          currentUser={currentUser}
          onClose={() => setTourProperty(null)}
          onConfirmBooking={handleConfirmBooking}
        />
      )}

      {/* MODAL 3: Direct Inquiry Modal */}
      {inquiryProperty && (
        <InquiryModal
          property={inquiryProperty}
          currentUser={currentUser}
          onClose={() => setInquiryProperty(null)}
          onSendInquiry={handleSendInquiry}
        />
      )}

      {/* MODAL 4: Compare Properties Modal */}
      {isCompareModalOpen && (
        <CompareModal
          properties={comparedProperties}
          onClose={() => setIsCompareModalOpen(false)}
          onRemoveFromCompare={handleRemoveFromCompare}
          onScheduleTour={(p) => {
            setIsCompareModalOpen(false);
            setTourProperty(p);
          }}
        />
      )}

      {/* MODAL 5: List Property Wizard Modal */}
      {isListModalOpen && (
        <ListPropertyModal
          currentUser={currentUser}
          onClose={() => setIsListModalOpen(false)}
          onAddProperty={handleAddProperty}
        />
      )}
    </div>
  );
}
