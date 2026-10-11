import React, { useState } from 'react';
import { X, Calendar, Clock, Video, Users, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Property, TourBooking, AppUser } from '../types';

interface ScheduleTourModalProps {
  property: Property;
  currentUser: AppUser;
  onClose: () => void;
  onConfirmBooking: (booking: TourBooking) => void;
}

export const ScheduleTourModal: React.FC<ScheduleTourModalProps> = ({
  property,
  currentUser,
  onClose,
  onConfirmBooking,
}) => {
  // Generate next 7 selectable days
  const today = new Date();
  const availableDates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i + 1);
    return {
      iso: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' })
    };
  });

  const availableTimeSlots = [
    '09:30 - 10:15',
    '11:00 - 11:45',
    '13:30 - 14:15',
    '15:00 - 15:45',
    '16:30 - 17:15',
    '18:00 - 18:45'
  ];

  const [selectedDate, setSelectedDate] = useState(availableDates[0].iso);
  const [selectedSlot, setSelectedSlot] = useState(availableTimeSlots[1]);
  const [tourType, setTourType] = useState<'In-person' | 'Virtual Video Walk'>('In-person');
  const [userName, setUserName] = useState(currentUser.name);
  const [userEmail, setUserEmail] = useState(currentUser.email);
  const [userPhone, setUserPhone] = useState(currentUser.phone);
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newBooking: TourBooking = {
      id: `bk-${Date.now().toString().slice(-5)}`,
      propertyId: property.id,
      propertyTitle: property.title,
      propertyAddress: property.address,
      propertyPrice: property.price,
      propertyImage: property.images[0],
      userName,
      userEmail,
      userPhone,
      date: selectedDate,
      timeSlot: selectedSlot,
      tourType,
      status: 'Confirmed',
      notes,
      createdAt: new Date().toISOString().split('T')[0]
    };

    onConfirmBooking(newBooking);
    setConfirmedBookingId(newBooking.id);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-bold text-slate-900">
              {isSuccess ? 'Tour Scheduled' : 'Schedule a Property Tour'}
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
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Your Tour Is Confirmed!</h3>
              <p className="text-xs text-slate-500 mt-1">
                Booking reference: <strong className="font-mono text-slate-800">#{confirmedBookingId.toUpperCase()}</strong>
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-2">
              <div className="font-semibold text-slate-900">{property.title}</div>
              <div className="text-slate-500">{property.address}, {property.locality}</div>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-slate-700">
                <span>Date & Time:</span>
                <span className="font-medium font-mono">{selectedDate} at {selectedSlot}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Format:</span>
                <span className="font-medium">{tourType}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Host / Agent:</span>
                <span className="font-medium">{property.landlord.name}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              We've dispatched confirmation instructions to <strong>{userEmail}</strong>. You can view or reschedule this booking anytime in your Dashboard.
            </p>

            <button
              onClick={onClose}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-sm"
            >
              Done & View Listings
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Property Summary Strip */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <img
                src={property.images[0]}
                alt={property.title}
                referrerPolicy="no-referrer"
                className="w-14 h-12 object-cover rounded-lg"
              />
              <div className="flex-1 min-w-0 text-xs">
                <div className="font-semibold text-slate-900 truncate">{property.title}</div>
                <div className="text-slate-500 truncate">{property.address}</div>
                <div className="font-mono font-medium text-slate-800 mt-0.5">
                  ${property.price.toLocaleString()} {property.purpose === 'Rent' ? '/ mo' : ''}
                </div>
              </div>
            </div>

            {/* Tour Type Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">Select Tour Format</label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => setTourType('In-person')}
                  className={`py-2 px-3 text-xs font-medium rounded-md transition-colors flex items-center justify-center gap-2 ${
                    tourType === 'In-person'
                      ? 'bg-white text-slate-900 shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>In-Person Walk</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTourType('Virtual Video Walk')}
                  className={`py-2 px-3 text-xs font-medium rounded-md transition-colors flex items-center justify-center gap-2 ${
                    tourType === 'Virtual Video Walk'
                      ? 'bg-white text-slate-900 shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Live Video Call</span>
                </button>
              </div>
            </div>

            {/* Date Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">Choose Date</label>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
                {availableDates.map((item) => (
                  <button
                    key={item.iso}
                    type="button"
                    onClick={() => setSelectedDate(item.iso)}
                    className={`p-2 text-center rounded-lg border transition-all ${
                      selectedDate === item.iso
                        ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="text-[10px] uppercase font-semibold opacity-75">{item.dayName}</div>
                    <div className="text-sm font-bold font-mono mt-0.5">{item.dayNumber}</div>
                    <div className="text-[10px] opacity-75">{item.month}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">Choose Time Slot</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {availableTimeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2 px-2.5 text-xs font-medium rounded-lg border text-center transition-all flex items-center justify-center gap-1.5 font-mono ${
                      selectedSlot === slot
                        ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <Clock className="w-3 h-3 opacity-70" />
                    <span>{slot}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Email for Confirmation</label>
                <input
                  type="email"
                  required
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Optional Questions or Notes for Landlord
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Planning a move in December, have a 15lb terrier..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 resize-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Confirm Viewing Appointment</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
