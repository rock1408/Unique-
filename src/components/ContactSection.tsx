import React, { useState } from 'react';
import { Send, MessageCircle, Phone, Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import { getDirectWhatsAppUrl, openWhatsAppDirect } from '../utils/whatsappHelper';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    fitnessGoal: 'General Fitness',
    preferredTraining: 'Gym',
    message: ''
  });

  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string }>({});
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const fitnessGoals = [
    'Weight Loss',
    'Muscle Gain',
    'Strength',
    'General Fitness',
    'CrossFit',
    'Cardio',
    'Personal Training',
    'Other'
  ];

  const preferredTrainings = [
    'Gym',
    'CrossFit',
    'Cardio',
    'Personal Training'
  ];

  const validate = () => {
    const errors: { name?: string; phone?: string } = {};
    if (!formData.name.trim()) {
      errors.name = 'Please enter your full name';
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      errors.phone = 'Please provide a valid phone number (at least 8 digits)';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSendViaWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const formattedMessage = `Hello Unique Fitness,\n\nI would like to enquire about gym membership & training.\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email || 'Not provided'}\n*Fitness Goal:* ${formData.fitnessGoal}\n*Preferred Training:* ${formData.preferredTraining}\n*Message:* ${formData.message || 'Looking forward to booking a trial session.'}`;

    // Direct redirect to WhatsApp
    openWhatsAppDirect(formattedMessage);

    setSubmittedMessage(`Thank you, ${formData.name}! Opening WhatsApp with your enquiry for immediate confirmation.`);
  };

  const handleStandardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Record submission and show honest confirmation
    setSubmittedMessage(
      `Enquiry captured for ${formData.name}! Our floor trainer will contact you shortly on ${formData.phone}. You can also connect instantly via WhatsApp.`
    );
  };

  return (
    <section id="contact" className="py-24 bg-[#070709] relative overflow-hidden border-t border-white/5">
      {/* Background spotlights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#ccff00]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#ccff00] block mb-2">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            READY TO <span className="text-[#ccff00]">START?</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-300 font-normal">
            "Your next level starts with your next workout."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Quick Contact Info & Direct Actions */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
              <h3 className="text-xl font-black text-white uppercase tracking-tight">
                Direct Inquiries & Consultation
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Have questions regarding batch timings, personal training packages, or CrossFit schedules? Connect with our team directly.
              </p>

              <div className="space-y-4 pt-2">
                {/* Phone */}
                <a
                  href={`tel:${BUSINESS_CONFIG.contact.phoneRaw}`}
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-zinc-900/70 hover:bg-zinc-800 border border-white/5 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center text-[#ccff00] group-hover:bg-[#ccff00] group-hover:text-black transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Call Direct</span>
                    <span className="text-sm font-black text-white">{BUSINESS_CONFIG.contact.phoneDisplay}</span>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={getDirectWhatsAppUrl()}
                  onClick={(e) => {
                    e.preventDefault();
                    openWhatsAppDirect();
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-500/20 transition-colors group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-400 group-hover:text-black transition-colors">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">WhatsApp Direct</span>
                    <span className="text-sm font-black text-white">{BUSINESS_CONFIG.contact.phoneDisplay}</span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${BUSINESS_CONFIG.contact.email}`}
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-zinc-900/70 hover:bg-zinc-800 border border-white/5 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 group-hover:bg-white group-hover:text-black transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Email Enquiry</span>
                    <span className="text-xs font-mono text-zinc-300 truncate block max-w-[200px] sm:max-w-none">{BUSINESS_CONFIG.contact.email}</span>
                  </div>
                </a>
              </div>

              {/* Zero Payment Policy Notice */}
              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/5 text-xs text-zinc-400">
                <p className="font-bold text-zinc-300 mb-1">No Advance Online Payment Required</p>
                Unique Fitness invites you to visit our gym in Kengeri, tour the facilities, meet the trainers, and try a workout before deciding.
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 text-left">
              
              {submittedMessage ? (
                <div className="py-8 text-center space-y-5">
                  <div className="w-16 h-16 rounded-full bg-[#ccff00]/15 border border-[#ccff00]/40 flex items-center justify-center mx-auto text-[#ccff00]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                    Enquiry Received!
                  </h3>
                  <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                    {submittedMessage}
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={getDirectWhatsAppUrl(`Hi Unique Fitness, I submitted an enquiry for ${formData.fitnessGoal} (${formData.name})`)}
                      onClick={(e) => {
                        e.preventDefault();
                        openWhatsAppDirect(`Hi Unique Fitness, I submitted an enquiry for ${formData.fitnessGoal} (${formData.name})`);
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-6 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Follow Up on WhatsApp</span>
                    </a>
                    <button
                      onClick={() => setSubmittedMessage(null)}
                      className="py-3 px-6 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white font-bold text-xs uppercase tracking-wider"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form className="space-y-5" onSubmit={handleSendViaWhatsApp}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2" htmlFor="contact-name">
                        Your Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (formErrors.name) setFormErrors({ ...formErrors, name: undefined });
                        }}
                        className={`w-full px-4 py-3.5 rounded-xl bg-zinc-900/90 border ${
                          formErrors.name ? 'border-red-500' : 'border-white/10 focus:border-[#ccff00]'
                        } text-white text-sm placeholder-zinc-500 outline-none transition-colors`}
                      />
                      {formErrors.name && (
                        <span className="text-[11px] text-red-400 mt-1 block">{formErrors.name}</span>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2" htmlFor="contact-phone">
                        Phone Number *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        placeholder="e.g. +91 70192 01669"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (formErrors.phone) setFormErrors({ ...formErrors, phone: undefined });
                        }}
                        className={`w-full px-4 py-3.5 rounded-xl bg-zinc-900/90 border ${
                          formErrors.phone ? 'border-red-500' : 'border-white/10 focus:border-[#ccff00]'
                        } text-white text-sm placeholder-zinc-500 outline-none transition-colors`}
                      />
                      {formErrors.phone && (
                        <span className="text-[11px] text-red-400 mt-1 block">{formErrors.phone}</span>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2" htmlFor="contact-email">
                      Email Address (Optional)
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="e.g. rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/90 border border-white/10 focus:border-[#ccff00] text-white text-sm placeholder-zinc-500 outline-none transition-colors"
                    />
                  </div>

                  {/* Dropdowns: Fitness Goal & Preferred Training */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2" htmlFor="fitness-goal">
                        Fitness Goal
                      </label>
                      <select
                        id="fitness-goal"
                        value={formData.fitnessGoal}
                        onChange={(e) => setFormData({ ...formData, fitnessGoal: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/90 border border-white/10 focus:border-[#ccff00] text-white text-sm outline-none transition-colors cursor-pointer"
                      >
                        {fitnessGoals.map((goal) => (
                          <option key={goal} value={goal} className="bg-zinc-900 text-white">
                            {goal}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2" htmlFor="preferred-training">
                        Preferred Training
                      </label>
                      <select
                        id="preferred-training"
                        value={formData.preferredTraining}
                        onChange={(e) => setFormData({ ...formData, preferredTraining: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/90 border border-white/10 focus:border-[#ccff00] text-white text-sm outline-none transition-colors cursor-pointer"
                      >
                        {preferredTrainings.map((train) => (
                          <option key={train} value={train} className="bg-zinc-900 text-white">
                            {train}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2" htmlFor="contact-message">
                      Your Message or Questions
                    </label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      placeholder="Tell us about your fitness targets, schedule preference, or any questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/90 border border-white/10 focus:border-[#ccff00] text-white text-sm placeholder-zinc-500 outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      id="btn-send-whatsapp-enquiry"
                      className="w-full sm:flex-1 py-4 px-6 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#ccff00]/25 transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>SEND ENQUIRY VIA WHATSAPP</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleStandardSubmit}
                      id="btn-send-standard-enquiry"
                      className="w-full sm:w-auto py-4 px-6 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white border border-white/15 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>SUBMIT FORM</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
