import React from 'react';
import { Search, Calendar, ShieldCheck, Key, PlusCircle, ArrowRight, CheckCircle2, FileCheck, PhoneCall } from 'lucide-react';

interface HowItWorksViewProps {
  onNavigateToSearch: () => void;
  onOpenListModal: () => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({
  onNavigateToSearch,
  onOpenListModal,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          How HomeFinder Works
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          A modern, transparent real estate marketplace designed to connect prospective tenants and buyers directly with verified property owners.
        </p>
      </div>

      {/* For Renters & Buyers */}
      <section className="space-y-8">
        <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">For Renters & Buyers</h2>
          <span className="text-xs text-slate-400 font-mono">Simple 4-Step Process</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center font-bold font-mono text-slate-900">
              01
            </div>
            <h3 className="text-sm font-bold text-slate-900">Search & Filter</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Browse verified residences by neighborhood, budget, pet rules, and transit scores.
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center font-bold font-mono text-slate-900">
              02
            </div>
            <h3 className="text-sm font-bold text-slate-900">Book Instant Tours</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Pick a date and convenient time slot for an in-person walk or live video walkthrough.
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center font-bold font-mono text-slate-900">
              03
            </div>
            <h3 className="text-sm font-bold text-slate-900">Pre-Screen & Chat</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Communicate directly with the landlord or licensed broker through the dashboard inbox.
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center font-bold font-mono text-slate-900">
              04
            </div>
            <h3 className="text-sm font-bold text-slate-900">Secure Move-In</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Finalize standard lease agreements with zero predatory broker markups or fees.
            </p>
          </div>
        </div>

        <div className="text-center pt-2">
          <button
            onClick={onNavigateToSearch}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-sm"
          >
            <Search className="w-4 h-4 text-amber-400" />
            <span>Start Exploring Listings</span>
          </button>
        </div>
      </section>

      {/* For Landlords & Hosts */}
      <section className="p-8 bg-slate-900 text-white rounded-2xl space-y-8">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">For Landlords, Hosts & Licensed Agents</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Publish your property in minutes, automate viewing appointments, and connect with pre-screened applicants.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2">
            <FileCheck className="w-6 h-6 text-emerald-400" />
            <h3 className="text-sm font-bold">Fast Listing Creation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Set your pricing, upload images, select amenities, and define move-in parameters in minutes.
            </p>
          </div>

          <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2">
            <Calendar className="w-6 h-6 text-amber-400" />
            <h3 className="text-sm font-bold">Automated Tour Calendar</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Prospective tenants book available slots automatically according to your weekly schedule.
            </p>
          </div>

          <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2">
            <ShieldCheck className="w-6 h-6 text-sky-400" />
            <h3 className="text-sm font-bold">Verified Inquirer Identity</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every inquiry and viewing request is verified with contact phone and email validation.
            </p>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={onOpenListModal}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm font-sans"
          >
            <PlusCircle className="w-4 h-4" />
            <span>List Your Property Today</span>
          </button>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-3">
          Frequently Asked Questions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5">
            <div className="font-bold text-slate-900">Are tours free of charge?</div>
            <p className="text-slate-500 leading-relaxed">
              Yes, all in-person and live virtual video walkthroughs booked through HomeFinder are 100% free of charge.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5">
            <div className="font-bold text-slate-900">How does landlord verification work?</div>
            <p className="text-slate-500 leading-relaxed">
              Our moderation team inspects submitted land registry documentation, government ID, and utility records to certify genuine ownership.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5">
            <div className="font-bold text-slate-900">Can I reschedule an appointment?</div>
            <p className="text-slate-500 leading-relaxed">
              Yes, you can reschedule or cancel any scheduled viewing tour directly from your Dashboard at any time.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5">
            <div className="font-bold text-slate-900">Can agents list multiple properties?</div>
            <p className="text-slate-500 leading-relaxed">
              Yes, licensed agents can manage dozens of properties simultaneously through the Host Dashboard.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
