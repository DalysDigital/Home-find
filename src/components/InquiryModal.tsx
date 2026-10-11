import React, { useState } from 'react';
import { X, Send, CheckCircle2, Shield, MessageSquare } from 'lucide-react';
import { Property, InquiryMessage, AppUser } from '../types';

interface InquiryModalProps {
  property: Property;
  currentUser: AppUser;
  onClose: () => void;
  onSendInquiry: (inquiry: InquiryMessage) => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  property,
  currentUser,
  onClose,
  onSendInquiry,
}) => {
  const [senderName, setSenderName] = useState(currentUser.name);
  const [senderEmail, setSenderEmail] = useState(currentUser.email);
  const [senderPhone, setSenderPhone] = useState(currentUser.phone);
  const [moveInDate, setMoveInDate] = useState('2026-11-01');
  const [message, setMessage] = useState(
    `Hello ${property.landlord.name}, I am interested in ${property.title} and would like to confirm availability for a lease start date around November 1st.`
  );
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newInquiry: InquiryMessage = {
      id: `inq-${Date.now().toString().slice(-5)}`,
      propertyId: property.id,
      propertyTitle: property.title,
      senderName,
      senderEmail,
      senderPhone,
      message,
      moveInDate,
      isRead: false,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };

    onSendInquiry(newInquiry);
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-slate-900" />
            <h2 className="text-base font-bold text-slate-900">
              {sent ? 'Message Sent' : `Contact ${property.landlord.name}`}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {sent ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Inquiry Delivered</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Your inquiry has been routed directly to {property.landlord.name}'s portal inbox. Their average response time is {property.landlord.responseTime}.
            </p>
            <button
              onClick={onClose}
              className="w-full py-2 px-4 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <img
                src={property.landlord.avatar}
                alt={property.landlord.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="text-xs">
                <div className="font-semibold text-slate-900">{property.landlord.name}</div>
                <div className="text-slate-500">{property.landlord.role} · {property.landlord.phone}</div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">Phone</label>
                  <input
                    type="tel"
                    required
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Target Move-In Date</label>
                <input
                  type="date"
                  value={moveInDate}
                  onChange={(e) => setMoveInDate(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Inquiry Message</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 resize-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Direct Inquiry</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
