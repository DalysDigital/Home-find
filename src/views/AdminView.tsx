import React, { useState } from 'react';
import {
  ShieldAlert,
  Building,
  Users,
  Calendar,
  BarChart3,
  Activity,
  CheckCircle2,
  XCircle,
  Sparkles,
  Eye,
  Trash2,
  Check,
  Search,
  Filter,
  FileText,
  Server
} from 'lucide-react';
import { Property, TourBooking, AppUser, LocalityInfo } from '../types';

interface AdminViewProps {
  properties: Property[];
  setProperties: React.Dispatch<React.SetStateAction<Property[]>>;
  bookings: TourBooking[];
  setBookings: React.Dispatch<React.SetStateAction<TourBooking[]>>;
  localities: LocalityInfo[];
  onSelectProperty: (property: Property) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  properties,
  setProperties,
  bookings,
  setBookings,
  localities,
  onSelectProperty,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'users' | 'bookings' | 'reports' | 'diagnostics'>('overview');
  const [listingSearch, setListingSearch] = useState('');

  // Sample users list for admin moderation
  const [userList, setUserList] = useState<AppUser[]>([
    {
      id: 'usr-1',
      name: 'Elena Rostova',
      email: 'elena.rostova@prestigerealty.com',
      phone: '+1 (555) 234-8901',
      role: 'Licensed Agent',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      verified: true,
      memberSince: 'Jan 2025'
    },
    {
      id: 'usr-2',
      name: 'Marcus Vance',
      email: 'marcus.vance@properties.io',
      phone: '+1 (555) 345-6712',
      role: 'Landlord / Host',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      verified: true,
      memberSince: 'Feb 2025'
    },
    {
      id: 'usr-3',
      name: 'David K. Chen',
      email: 'david.chen@urbanstudios.com',
      phone: '+1 (555) 890-1234',
      role: 'Landlord / Host',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      verified: true,
      memberSince: 'Mar 2025'
    },
    {
      id: 'usr-4',
      name: 'Sarah Jenkins',
      email: 's.jenkins@designer.net',
      phone: '+1 (555) 654-9812',
      role: 'Tenant / Buyer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      verified: false,
      memberSince: 'Aug 2026'
    }
  ]);

  // Handlers for Admin actions
  const handleToggleFeatured = (id: string) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    );
  };

  const handleToggleVerified = (id: string) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, verified: !p.verified } : p))
    );
  };

  const handleDeleteListing = (id: string) => {
    if (confirm('Are you sure you want to remove this property listing?')) {
      setProperties((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleToggleUserVerification = (id: string) => {
    setUserList((prev) =>
      prev.map((u) => (u.id === id ? { ...u, verified: !u.verified } : u))
    );
  };

  // Filter listings
  const filteredListings = properties.filter(
    (p) =>
      p.title.toLowerCase().includes(listingSearch.toLowerCase()) ||
      p.locality.toLowerCase().includes(listingSearch.toLowerCase()) ||
      p.propertyType.toLowerCase().includes(listingSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center shadow-sm">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Platform Admin Center</h1>
            <p className="text-xs text-slate-500">
              Manage listings, approve property titles, moderate users, and monitor infrastructure
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto text-xs font-semibold">
          {[
            { id: 'overview', label: 'Dashboard', icon: BarChart3 },
            { id: 'listings', label: `Inventory (${properties.length})`, icon: Building },
            { id: 'users', label: `Users (${userList.length})`, icon: Users },
            { id: 'bookings', label: `Tours (${bookings.length})`, icon: Calendar },
            { id: 'diagnostics', label: 'Diagnostics', icon: Activity }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === item.id
                    ? 'bg-white text-slate-900 shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 bg-white rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">Total Listings</div>
              <div className="text-2xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                {properties.length}
              </div>
              <div className="text-[11px] text-emerald-600 mt-1 font-medium">100% Active Catalog</div>
            </div>

            <div className="p-5 bg-white rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">Platform Tours Booked</div>
              <div className="text-2xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                {bookings.length}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Across 5 neighborhoods</div>
            </div>

            <div className="p-5 bg-white rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">Verified Hosts & Agents</div>
              <div className="text-2xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                {userList.filter((u) => u.verified).length}
              </div>
              <div className="text-[11px] text-emerald-600 mt-1 font-medium">Identity Cleared</div>
            </div>

            <div className="p-5 bg-white rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500 font-medium">System Health</div>
              <div className="text-2xl font-bold font-mono text-emerald-600 mt-1 tabular-nums">
                100%
              </div>
              <div className="text-[11px] text-slate-400 mt-1">All services nominal</div>
            </div>
          </div>

          {/* Quick Listing Table Overview */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Recent Platform Additions</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase text-[10px]">
                    <th className="py-2">Property</th>
                    <th className="py-2">Type</th>
                    <th className="py-2">Price</th>
                    <th className="py-2">Locality</th>
                    <th className="py-2">Status</th>
                    <th className="py-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {properties.slice(0, 5).map((p) => (
                    <tr key={p.id}>
                      <td className="py-3 font-semibold text-slate-900 truncate max-w-[200px]">{p.title}</td>
                      <td className="py-3 text-slate-600">{p.propertyType}</td>
                      <td className="py-3 font-mono font-bold tabular-nums">
                        ${p.price.toLocaleString()} {p.purpose === 'Rent' ? '/ mo' : ''}
                      </td>
                      <td className="py-3 text-slate-600">{p.locality}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => onSelectProperty(p)}
                          className="px-2.5 py-1 text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. LISTINGS INVENTORY & MODERATION */}
      {activeTab === 'listings' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Listing Inventory & Verification</h2>
              <p className="text-xs text-slate-500">
                Audit titles, toggle homepage featured slots, and manage active catalog
              </p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search inventory..."
                value={listingSearch}
                onChange={(e) => setListingSearch(e.target.value)}
                className="w-full pl-8 pr-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px]">
                  <th className="py-2.5">Title</th>
                  <th className="py-2.5">Neighborhood</th>
                  <th className="py-2.5">Price</th>
                  <th className="py-2.5">Verified Title</th>
                  <th className="py-2.5">Featured</th>
                  <th className="py-2.5 text-right">Moderation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredListings.map((p) => (
                  <tr key={p.id}>
                    <td className="py-3 pr-2">
                      <div className="font-bold text-slate-900">{p.title}</div>
                      <div className="text-[11px] text-slate-400">{p.address}</div>
                    </td>
                    <td className="py-3 text-slate-600">{p.locality}</td>
                    <td className="py-3 font-mono font-bold tabular-nums">
                      ${p.price.toLocaleString()} {p.purpose === 'Rent' ? '/ mo' : ''}
                    </td>
                    <td className="py-3">
                      <button
                        onClick={() => handleToggleVerified(p.id)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                          p.verified
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{p.verified ? 'Verified' : 'Unverified'}</span>
                      </button>
                    </td>
                    <td className="py-3">
                      <button
                        onClick={() => handleToggleFeatured(p.id)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                          p.featured
                            ? 'bg-amber-100 text-amber-900 font-bold'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>{p.featured ? 'Featured' : 'Standard'}</span>
                      </button>
                    </td>
                    <td className="py-3 text-right space-x-1">
                      <button
                        onClick={() => onSelectProperty(p)}
                        className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded"
                        title="View Live"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteListing(p.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. USERS MODERATION */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">User Accounts & Role Permissions</h2>
            <p className="text-xs text-slate-500">
              Manage landlords, licensed brokers, and tenant verification credentials
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px]">
                  <th className="py-2.5">User</th>
                  <th className="py-2.5">Role</th>
                  <th className="py-2.5">Contact</th>
                  <th className="py-2.5">Member Since</th>
                  <th className="py-2.5 text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {userList.map((user) => (
                  <tr key={user.id}>
                    <td className="py-3 pr-2 flex items-center gap-2.5">
                      <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover" />
                      <div className="font-semibold text-slate-900">{user.name}</div>
                    </td>
                    <td className="py-3 text-slate-700">{user.role}</td>
                    <td className="py-3 text-slate-500 font-mono">{user.email}</td>
                    <td className="py-3 text-slate-500">{user.memberSince}</td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => handleToggleUserVerification(user.id)}
                        className={`px-2.5 py-1 text-[11px] font-semibold rounded transition-colors ${
                          user.verified
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {user.verified ? 'ID Verified' : 'Pending Review'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. ALL BOOKINGS */}
      {activeTab === 'bookings' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Platform Tour Appointments</h2>
            <p className="text-xs text-slate-500">
              Global log of scheduled and conducted viewings across all residences
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px]">
                  <th className="py-2.5">Booking Ref</th>
                  <th className="py-2.5">Property</th>
                  <th className="py-2.5">Tenant / Buyer</th>
                  <th className="py-2.5">Date & Slot</th>
                  <th className="py-2.5">Type</th>
                  <th className="py-2.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bookings.map((b) => (
                  <tr key={b.id}>
                    <td className="py-3 font-mono font-bold text-slate-900 uppercase">#{b.id}</td>
                    <td className="py-3 font-semibold text-slate-800">{b.propertyTitle}</td>
                    <td className="py-3 text-slate-600">{b.userName}</td>
                    <td className="py-3 font-mono text-slate-600">{b.date} · {b.timeSlot}</td>
                    <td className="py-3 text-slate-600">{b.tourType}</td>
                    <td className="py-3 text-right">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. DIAGNOSTICS & SYSTEM HEALTH (Replicating admin/diagnostics.php) */}
      {activeTab === 'diagnostics' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">System Diagnostics & Environment</h2>
            <p className="text-xs text-slate-500">
              Real-time service indicators, cache integrity, and background job health
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">Core Runtime Engine</span>
                <span className="inline-flex items-center gap-1 font-mono text-emerald-600 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> OK
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                TypeScript / React 19 SPA · Vite 8.3 · Fast Local Client-State Cache
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">Storage & Image Delivery</span>
                <span className="inline-flex items-center gap-1 font-mono text-emerald-600 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> OK
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Vector SVG Architecture Pipeline · Zero broken image latency
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">Notification & Tour Cron</span>
                <span className="inline-flex items-center gap-1 font-mono text-emerald-600 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> OK
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Booking Maintenance daemon active · Reminder dispatch ready
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">Security & Roles Middleware</span>
                <span className="inline-flex items-center gap-1 font-mono text-emerald-600 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> ENFORCED
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                RBAC verified: Tenant, Landlord, Licensed Agent, Platform Admin
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
