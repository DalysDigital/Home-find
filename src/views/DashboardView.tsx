import React, { useState } from 'react';
import {
  Calendar,
  Heart,
  Building,
  MessageSquare,
  ShieldCheck,
  User,
  PlusCircle,
  Clock,
  Trash2,
  CheckCircle2,
  XCircle,
  Send,
  Eye,
  FileText,
  UploadCloud,
  Check
} from 'lucide-react';
import { Property, TourBooking, InquiryMessage, AppUser } from '../types';

interface DashboardViewProps {
  currentUser: AppUser;
  setCurrentUser: React.Dispatch<React.SetStateAction<AppUser>>;
  properties: Property[];
  bookings: TourBooking[];
  setBookings: React.Dispatch<React.SetStateAction<TourBooking[]>>;
  inquiries: InquiryMessage[];
  setInquiries: React.Dispatch<React.SetStateAction<InquiryMessage[]>>;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onOpenListModal: () => void;
  onScheduleTour: (property: Property) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentUser,
  setCurrentUser,
  properties,
  bookings,
  setBookings,
  inquiries,
  setInquiries,
  favorites,
  onToggleFavorite,
  onSelectProperty,
  onOpenListModal,
  onScheduleTour,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'listings' | 'inquiries' | 'favorites' | 'verification' | 'profile'>('overview');
  const [replyText, setReplyText] = useState<{ [id: string]: string }>({});
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

  // Verification state demo
  const [docUploaded, setDocUploaded] = useState(true);

  // Filter user's favorites
  const favoriteProperties = properties.filter((p) => favorites.includes(p.id));

  // User's own listings (either where landlord.id matches or demo owner listings)
  const myListings = properties.filter(
    (p) => p.landlord.id === currentUser.id || p.landlord.email === currentUser.email
  );

  // Handlers for tour bookings
  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'Cancelled' as const } : b))
    );
  };

  const handleConfirmTour = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'Confirmed' as const } : b))
    );
  };

  const handleSendReply = (inquiryId: string) => {
    const text = replyText[inquiryId];
    if (!text) return;

    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id === inquiryId ? { ...inq, reply: text, isRead: true } : inq
      )
    );
    setActiveReplyId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Dashboard Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-slate-200"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">{currentUser.name}</h1>
              {currentUser.verified && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Verified
                </span>
              )}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              {currentUser.role} · Member since {currentUser.memberSince} · {currentUser.email}
            </div>
          </div>
        </div>

        <button
          onClick={onOpenListModal}
          className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-sm"
        >
          <PlusCircle className="w-4 h-4 text-amber-400" />
          <span>Post New Listing</span>
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1 text-xs font-semibold">
        {[
          { id: 'overview', label: 'Overview', icon: Building },
          { id: 'bookings', label: `Tour Bookings (${bookings.length})`, icon: Calendar },
          { id: 'listings', label: `My Listings (${myListings.length})`, icon: Building },
          { id: 'inquiries', label: `Inquiries & Messages (${inquiries.length})`, icon: MessageSquare },
          { id: 'favorites', label: `Saved Favorites (${favorites.length})`, icon: Heart },
          { id: 'verification', label: 'ID Verification', icon: ShieldCheck },
          { id: 'profile', label: 'Profile Settings', icon: User },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 border-b-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'border-slate-900 text-slate-900 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* 4 Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 bg-white rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">Scheduled Tours</div>
              <div className="text-2xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                {bookings.filter((b) => b.status === 'Confirmed' || b.status === 'Pending').length}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Next: {bookings[0]?.date || 'None'}</div>
            </div>

            <div className="p-5 bg-white rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">Active Inquiries</div>
              <div className="text-2xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                {inquiries.length}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Direct Landlord chats</div>
            </div>

            <div className="p-5 bg-white rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">Saved Favorites</div>
              <div className="text-2xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                {favorites.length}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Properties bookmarked</div>
            </div>

            <div className="p-5 bg-white rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">My Hosted Listings</div>
              <div className="text-2xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                {myListings.length}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Managed residences</div>
            </div>
          </div>

          {/* Recent Tours & Recent Inquiries split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Upcoming Tours Preview */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  <span>Upcoming Viewing Appointments</span>
                </h3>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className="text-xs text-slate-500 hover:text-slate-900 font-medium"
                >
                  View All
                </button>
              </div>

              {bookings.length === 0 ? (
                <div className="text-xs text-slate-400 py-6 text-center">
                  No upcoming tour appointments scheduled.
                </div>
              ) : (
                <div className="space-y-3">
                  {bookings.slice(0, 3).map((b) => (
                    <div
                      key={b.id}
                      className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="font-semibold text-slate-900">{b.propertyTitle}</div>
                        <div className="text-slate-500 font-mono">
                          {b.date} · {b.timeSlot} ({b.tourType})
                        </div>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          b.status === 'Confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : b.status === 'Cancelled'
                            ? 'bg-slate-200 text-slate-600'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {b.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Inquiries Preview */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-slate-700" />
                  <span>Recent Conversations</span>
                </h3>
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className="text-xs text-slate-500 hover:text-slate-900 font-medium"
                >
                  View All
                </button>
              </div>

              {inquiries.length === 0 ? (
                <div className="text-xs text-slate-400 py-6 text-center">
                  No active inquiries.
                </div>
              ) : (
                <div className="space-y-3">
                  {inquiries.slice(0, 3).map((inq) => (
                    <div
                      key={inq.id}
                      className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-slate-900">{inq.propertyTitle}</div>
                        <span className="text-[10px] text-slate-400 font-mono">{inq.createdAt}</span>
                      </div>
                      <p className="text-slate-600 line-clamp-1">{inq.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BOOKINGS */}
      {activeTab === 'bookings' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Your Property Tour Appointments</h2>
              <p className="text-xs text-slate-500">
                Manage upcoming in-person property walkthroughs and virtual live streams
              </p>
            </div>
          </div>

          {bookings.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              You haven't scheduled any viewing tours yet. Browse properties and click "Book Tour".
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {bookings.map((b) => (
                <div key={b.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <img
                      src={b.propertyImage}
                      alt={b.propertyTitle}
                      className="w-16 h-12 rounded-lg object-cover bg-slate-100 shrink-0"
                    />
                    <div className="space-y-1 text-xs">
                      <div className="font-bold text-slate-900">{b.propertyTitle}</div>
                      <div className="text-slate-500">{b.propertyAddress}</div>
                      <div className="flex items-center gap-2 text-slate-600 font-mono">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{b.date} at {b.timeSlot}</span>
                        <span className="text-slate-300">·</span>
                        <span>{b.tourType}</span>
                      </div>
                      {b.notes && (
                        <div className="text-[11px] text-slate-500 italic">Notes: "{b.notes}"</div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <span
                      className={`px-2.5 py-1 text-xs font-semibold rounded-md ${
                        b.status === 'Confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : b.status === 'Cancelled'
                          ? 'bg-slate-100 text-slate-600 line-through'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {b.status}
                    </span>

                    {b.status !== 'Cancelled' && (
                      <button
                        onClick={() => handleCancelBooking(b.id)}
                        className="py-1 px-2.5 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: MY LISTINGS */}
      {activeTab === 'listings' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">My Properties</h2>
              <p className="text-xs text-slate-500">
                Residences you have published or are actively managing
              </p>
            </div>
            <button
              onClick={onOpenListModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Add Property</span>
            </button>
          </div>

          {myListings.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400 space-y-3">
              <p>You haven't posted any properties yet.</p>
              <button
                onClick={onOpenListModal}
                className="py-2 px-4 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                List Your First Residence
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {myListings.map((prop) => (
                <div key={prop.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <img
                      src={prop.images[0]}
                      alt={prop.title}
                      className="w-16 h-12 rounded-lg object-cover shrink-0"
                    />
                    <div className="space-y-1 text-xs">
                      <div className="font-bold text-slate-900">{prop.title}</div>
                      <div className="text-slate-500">{prop.address}, {prop.locality}</div>
                      <div className="font-mono font-semibold text-slate-800">
                        ${prop.price.toLocaleString()} {prop.purpose === 'Rent' ? '/ month' : ''}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded">
                      {prop.status}
                    </span>
                    <button
                      onClick={() => onSelectProperty(prop)}
                      className="py-1 px-3 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                      View Live
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: INQUIRIES & MESSAGES */}
      {activeTab === 'inquiries' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Inquiry Inbox</h2>
            <p className="text-xs text-slate-500">
              Direct communications with property owners and applicants
            </p>
          </div>

          {inquiries.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              No inquiries in your inbox.
            </div>
          ) : (
            <div className="space-y-4">
              {inquiries.map((inq) => (
                <div key={inq.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-start justify-between gap-2 text-xs">
                    <div>
                      <div className="font-bold text-slate-900">{inq.propertyTitle}</div>
                      <div className="text-slate-500">
                        From: <span className="font-medium text-slate-800">{inq.senderName}</span> ({inq.senderEmail})
                      </div>
                      {inq.moveInDate && (
                        <div className="text-slate-500 font-mono text-[11px] mt-0.5">
                          Target Move-in: {inq.moveInDate}
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{inq.createdAt}</span>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed">
                    "{inq.message}"
                  </div>

                  {inq.reply && (
                    <div className="p-3 bg-slate-900 text-white rounded-lg text-xs space-y-1">
                      <div className="text-[10px] font-semibold text-amber-400 uppercase">Your Reply</div>
                      <p className="text-slate-200">{inq.reply}</p>
                    </div>
                  )}

                  {!inq.reply && (
                    <div className="pt-2">
                      {activeReplyId === inq.id ? (
                        <div className="space-y-2">
                          <textarea
                            rows={2}
                            placeholder="Type your response to the inquirer..."
                            value={replyText[inq.id] || ''}
                            onChange={(e) =>
                              setReplyText({ ...replyText, [inq.id]: e.target.value })
                            }
                            className="w-full p-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 resize-none bg-white"
                          />
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleSendReply(inq.id)}
                              className="py-1.5 px-3 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg flex items-center gap-1.5"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>Send Reply</span>
                            </button>
                            <button
                              onClick={() => setActiveReplyId(null)}
                              className="py-1.5 px-3 text-xs text-slate-600 hover:text-slate-900"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setActiveReplyId(inq.id)}
                          className="py-1.5 px-3 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg"
                        >
                          Reply to Message
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 5: FAVORITES */}
      {activeTab === 'favorites' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Saved Residences</h2>
            <p className="text-xs text-slate-500">
              Properties you have bookmarked for future reference
            </p>
          </div>

          {favoriteProperties.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              No properties saved yet. Click the heart icon on any residence to bookmark it.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {favoriteProperties.map((p) => (
                <div key={p.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="w-16 h-12 rounded-lg object-cover shrink-0"
                    />
                    <div className="space-y-0.5 text-xs">
                      <div className="font-bold text-slate-900">{p.title}</div>
                      <div className="text-slate-500">{p.address}, {p.locality}</div>
                      <div className="font-mono font-semibold text-slate-800">
                        ${p.price.toLocaleString()} {p.purpose === 'Rent' ? '/ mo' : ''}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => onSelectProperty(p)}
                      className="py-1 px-3 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => onScheduleTour(p)}
                      className="py-1 px-3 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      Book Tour
                    </button>
                    <button
                      onClick={() => onToggleFavorite(p.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 6: ID & LANDLORD VERIFICATION */}
      {activeTab === 'verification' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Trust & Identity Verification</h2>
            <p className="text-xs text-slate-500">
              Complete government identity and property ownership certification to unlock Verified status
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Government Photo ID</h3>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  <Check className="w-3.5 h-3.5" />
                  Verified
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Passport or State Driver's License confirming name and birth date match registry profile.
              </p>
              <div className="text-[11px] text-slate-400 font-mono">
                Document: Passport_US_****4102.pdf (Validated Oct 2026)
              </div>
            </div>

            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Property Deed / Proof of Ownership</h3>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  <Check className="w-3.5 h-3.5" />
                  Approved
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Municipal land title registry or utility statement establishing legal entitlement to host and lease.
              </p>
              <div className="text-[11px] text-slate-400 font-mono">
                Deed: MetroCity_Registry_Deed_#90214.pdf
              </div>
            </div>
          </div>

          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold">Full Platform Trust Status Active</div>
              <div className="text-emerald-700 mt-0.5 leading-relaxed">
                Your listings display the verified badge, boosting viewer engagement by 2.4x and unlocking instant booking confirmation.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: PROFILE SETTINGS */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Account Profile</h2>
            <p className="text-xs text-slate-500">
              Update your contact coordinates and platform preferences
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Profile settings saved successfully.');
            }}
            className="space-y-4 max-w-lg"
          >
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name</label>
              <input
                type="text"
                value={currentUser.name}
                onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address</label>
              <input
                type="email"
                value={currentUser.email}
                onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Phone Number</label>
              <input
                type="tel"
                value={currentUser.phone}
                onChange={(e) => setCurrentUser({ ...currentUser, phone: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="py-2 px-5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
            >
              Save Profile Updates
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
