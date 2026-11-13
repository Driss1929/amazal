import React, { useState } from 'react';
import {
  CheckCircle2,
  Info,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  SlidersHorizontal,
} from 'lucide-react';
import { UI_COPY } from '../data/farmData';
import {
  buildGoogleMapsEmbedUrl,
  buildWhatsAppInquiryUrl,
  validateContactForm,
  type ContactFormInput,
  type FarmContactConfig,
  type Language,
  type SubmittedInquiry,
  type ValidationErrors,
} from '../utils/farmLogic';

interface ContactSectionProps {
  language: Language;
  config: FarmContactConfig;
  onUpdateConfig: (updates: Partial<FarmContactConfig>) => void;
  submittedInquiries: SubmittedInquiry[];
  onSubmitInquiry: (inquiry: SubmittedInquiry) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  language,
  config,
  onUpdateConfig,
  submittedInquiries,
  onSubmitInquiry,
}) => {
  const copy = UI_COPY[language].contact;

  const [showConfigPanel, setShowConfigPanel] = useState(false);
  const [formData, setFormData] = useState<ContactFormInput>({
    fullName: '',
    phone: '',
    email: '',
    interest: '',
    message: '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [lastSubmitted, setLastSubmitted] = useState<SubmittedInquiry | null>(null);

  const handleFieldChange = (
    field: keyof ContactFormInput,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formData, language);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    const newInquiry: SubmittedInquiry = {
      id: `inq-${Date.now()}`,
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      interest: formData.interest.trim(),
      message: formData.message.trim(),
      createdAt: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      language,
    };

    onSubmitInquiry(newInquiry);
    setLastSubmitted(newInquiry);
    setErrors({});
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      interest: '',
      message: '',
    });
  };

  const directWhatsAppHref = buildWhatsAppInquiryUrl({
    phone: config.whatsappNumber,
    language,
  });

  const mapEmbedUrl = buildGoogleMapsEmbedUrl(config.mapQuery, language);

  return (
    <section id="contact" className="pt-16 pb-24 lg:pt-24 lg:pb-28 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading & Owner Configuration Toggle */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-medium tracking-wide text-[#5C4033]">
              {copy.kicker}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A3A2A] tracking-tight text-balance">
              {copy.title}
            </h2>
            <p className="text-base text-[#3A473D] leading-relaxed">
              {copy.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowConfigPanel((prev) => !prev)}
            aria-expanded={showConfigPanel}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl border border-[#1C251E]/15 bg-[#F2ECE1] hover:bg-[#E6DFD1] text-[#1A3A2A] transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start lg:self-auto min-h-[42px]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
            <span>
              {showConfigPanel
                ? copy.configureContactHide
                : copy.configureContactToggle}
            </span>
          </button>
        </div>

        {/* Collapsible Owner Contact & GPS Coordinate Configuration Panel */}
        {showConfigPanel && (
          <div className="mb-10 p-6 rounded-2xl bg-[#F2ECE1] border border-[#1C251E]/15 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label
                htmlFor="cfg-phone"
                className="block text-xs font-semibold text-[#1A3A2A] mb-1.5"
              >
                {copy.phoneLabel}
              </label>
              <input
                id="cfg-phone"
                type="text"
                value={config.phonePlaceholder}
                onChange={(e) =>
                  onUpdateConfig({ phonePlaceholder: e.target.value })
                }
                className="w-full px-3 py-2 text-xs font-mono-tabular bg-[#FAF7F2] border border-[#1C251E]/20 rounded-lg text-[#1C251E]"
              />
            </div>

            <div>
              <label
                htmlFor="cfg-whatsapp"
                className="block text-xs font-semibold text-[#1A3A2A] mb-1.5"
              >
                WhatsApp Number (for Buttons)
              </label>
              <input
                id="cfg-whatsapp"
                type="text"
                value={config.whatsappNumber}
                onChange={(e) =>
                  onUpdateConfig({ whatsappNumber: e.target.value })
                }
                className="w-full px-3 py-2 text-xs font-mono-tabular bg-[#FAF7F2] border border-[#1C251E]/20 rounded-lg text-[#1C251E]"
              />
            </div>

            <div>
              <label
                htmlFor="cfg-email"
                className="block text-xs font-semibold text-[#1A3A2A] mb-1.5"
              >
                {copy.emailLabel}
              </label>
              <input
                id="cfg-email"
                type="text"
                value={config.emailPlaceholder}
                onChange={(e) =>
                  onUpdateConfig({ emailPlaceholder: e.target.value })
                }
                className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#1C251E]/20 rounded-lg text-[#1C251E]"
              />
            </div>

            <div>
              <label
                htmlFor="cfg-map-query"
                className="block text-xs font-semibold text-[#1A3A2A] mb-1.5"
              >
                {copy.mapQueryInputLabel}
              </label>
              <input
                id="cfg-map-query"
                type="text"
                value={config.mapQuery}
                onChange={(e) => onUpdateConfig({ mapQuery: e.target.value })}
                placeholder="e.g., 30.4703, -8.8770 or Taroudant, Morocco"
                className="w-full px-3 py-2 text-xs font-mono-tabular bg-[#FAF7F2] border border-[#1C251E]/20 rounded-lg text-[#1C251E]"
              />
            </div>
          </div>
        )}

        {/* Main 2-Column Layout: Left = Contact Details & Interactive Map, Right = Validated Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Farm Location, Placeholders & Interactive Google Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-[#F2ECE1] border border-[#1C251E]/10 space-y-5">
              {/* Farm Location */}
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#1A3A2A] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="text-xs font-semibold text-[#5C4033]">
                    {copy.locationLabel}
                  </h3>
                  <p className="text-sm font-semibold text-[#1A3A2A] mt-0.5">
                    Taroudant, Souss-Massa, Morocco
                  </p>
                  <p className="text-xs text-[#3A473D] mt-0.5">
                    {config.locationAddress[language]}
                  </p>
                </div>
              </div>

              {/* Phone Placeholder */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-[#1C251E]/10">
                <Phone className="w-5 h-5 text-[#1A3A2A] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="text-xs font-semibold text-[#5C4033]">
                    {copy.phoneLabel}
                  </h3>
                  <p className="font-mono-tabular text-sm font-semibold text-[#1A3A2A] mt-0.5">
                    {config.phonePlaceholder}
                  </p>
                </div>
              </div>

              {/* Email Placeholder */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-[#1C251E]/10">
                <Mail className="w-5 h-5 text-[#1A3A2A] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="text-xs font-semibold text-[#5C4033]">
                    {copy.emailLabel}
                  </h3>
                  <p className="font-mono-tabular text-sm font-semibold text-[#1A3A2A] mt-0.5 break-all">
                    {config.emailPlaceholder}
                  </p>
                </div>
              </div>

              {/* Direct WhatsApp Button */}
              <div className="pt-4 border-t border-[#1C251E]/10">
                <a
                  href={directWhatsAppHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3 text-xs sm:text-sm font-semibold text-[#FAF7F2] bg-[#1A3A2A] hover:bg-[#254F3A] rounded-xl transition-colors whitespace-nowrap shrink-0 min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>{copy.whatsappLabel} ({config.whatsappNumber})</span>
                </a>
              </div>
            </div>

            {/* Interactive Google Maps Embed */}
            <div
              id="location-map-card"
              className="rounded-2xl overflow-hidden border border-[#1C251E]/12 bg-[#F2ECE1]"
            >
              <div className="px-5 py-3.5 border-b border-[#1C251E]/10 flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-xs font-semibold text-[#1A3A2A]">
                  {copy.mapTitle}
                </h3>
                <span className="font-mono-tabular text-xs text-[#5C4033]">
                  {config.mapQuery}
                </span>
              </div>
              <div className="aspect-[16/10] w-full bg-[#E4DDD0]">
                <iframe
                  id="google-maps-iframe"
                  title={copy.mapTitle}
                  src={mapEmbedUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <div className="p-4 space-y-3 border-t border-[#1C251E]/10 bg-[#FAF7F2]/70">
                <p className="text-xs text-[#3A473D] leading-relaxed">
                  {copy.mapNote}
                </p>
                <div className="space-y-1.5">
                  <label
                    htmlFor="direct-map-placeholder-input"
                    className="block text-xs font-semibold text-[#1A3A2A]"
                  >
                    {copy.mapQueryInputLabel}
                  </label>
                  <input
                    id="direct-map-placeholder-input"
                    type="text"
                    value={config.mapQuery}
                    onChange={(e) => onUpdateConfig({ mapQuery: e.target.value })}
                    placeholder="e.g., 30.4703, -8.8770 or Taroudant, Souss-Massa, Morocco"
                    className="w-full px-3 py-2 text-xs font-mono-tabular bg-[#FAF7F2] border border-[#1C251E]/20 rounded-lg text-[#1C251E]"
                  />
                  <p className="text-[11px] text-[#5C4033]">
                    Code configuration note: Replace default placeholder{' '}
                    <code className="font-mono-tabular">DEFAULT_FARM_CONFIG.mapQuery</code> in{' '}
                    <code className="font-mono-tabular">src/data/farmData.ts</code> with exact farm GPS coordinates when finalized.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Functional Contact Form with Validation & Backend Note */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#F2ECE1]/60 border border-[#1C251E]/12">
              <div className="mb-6 space-y-1.5">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1A3A2A]">
                  {copy.formTitle}
                </h3>
                <p className="text-sm text-[#3A473D]">
                  {copy.formSubtitle}
                </p>
              </div>

              {lastSubmitted ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#1A3A2A]/25 space-y-5"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="w-6 h-6 text-[#1A3A2A] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div className="space-y-1.5">
                      <h4 className="font-display text-lg font-bold text-[#1A3A2A]">
                        {copy.successTitle}
                      </h4>
                      <p className="text-sm text-[#3A473D] leading-relaxed">
                        {copy.successMessage}
                      </p>
                    </div>
                  </div>

                  {/* Summary of Recorded Inquiry */}
                  <div className="p-4 rounded-xl bg-[#F2ECE1] text-xs space-y-1.5 text-[#1C251E]">
                    <div>
                      <span className="font-semibold">{copy.fields.fullName}:</span>{' '}
                      <span>{lastSubmitted.fullName}</span>
                    </div>
                    <div>
                      <span className="font-semibold">{copy.fields.phone}:</span>{' '}
                      <span className="font-mono-tabular">{lastSubmitted.phone}</span>
                    </div>
                    <div>
                      <span className="font-semibold">{copy.fields.email}:</span>{' '}
                      <span>{lastSubmitted.email}</span>
                    </div>
                    <div>
                      <span className="font-semibold">{copy.fields.interest}:</span>{' '}
                      <span>{lastSubmitted.interest}</span>
                    </div>
                    <div>
                      <span className="font-semibold">{copy.fields.message}:</span>{' '}
                      <span>{lastSubmitted.message}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={buildWhatsAppInquiryUrl({
                        phone: config.whatsappNumber,
                        customMessage: `Hello Atlas Farm Taroudant, my name is ${lastSubmitted.fullName} (${lastSubmitted.phone}, ${lastSubmitted.email}). Inquiry topic: ${lastSubmitted.interest}. Message: ${lastSubmitted.message}`,
                        language,
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#FAF7F2] bg-[#1A3A2A] hover:bg-[#254F3A] rounded-xl transition-colors whitespace-nowrap shrink-0 min-h-[42px]"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>{copy.sendViaWhatsAppNow}</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setLastSubmitted(null)}
                      className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#1A3A2A] bg-[#EFEAE0] hover:bg-[#E4DDD0] rounded-xl transition-colors cursor-pointer min-h-[42px]"
                    >
                      {copy.newInquiryBtn}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="contact-fullName"
                        className="block text-xs font-semibold text-[#1A3A2A] mb-1.5"
                      >
                        {copy.fields.fullName} *
                      </label>
                      <input
                        id="contact-fullName"
                        name="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => handleFieldChange('fullName', e.target.value)}
                        placeholder={copy.fields.fullNamePlaceholder}
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={errors.fullName ? 'err-fullName' : undefined}
                        className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#1C251E]/20 rounded-xl text-[#1C251E] placeholder:text-[#6A756D] focus:outline-none focus:border-[#1A3A2A]"
                      />
                      {errors.fullName && (
                        <p
                          id="err-fullName"
                          role="alert"
                          className="mt-1.5 text-xs font-medium text-[#9E2A2B]"
                        >
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-xs font-semibold text-[#1A3A2A] mb-1.5"
                      >
                        {copy.fields.phone} *
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleFieldChange('phone', e.target.value)}
                        placeholder={copy.fields.phonePlaceholder}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? 'err-phone' : undefined}
                        className="w-full px-3.5 py-2.5 text-sm font-mono-tabular bg-[#FAF7F2] border border-[#1C251E]/20 rounded-xl text-[#1C251E] placeholder:text-[#6A756D] focus:outline-none focus:border-[#1A3A2A]"
                      />
                      {errors.phone && (
                        <p
                          id="err-phone"
                          role="alert"
                          className="mt-1.5 text-xs font-medium text-[#9E2A2B]"
                        >
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Email Address */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold text-[#1A3A2A] mb-1.5"
                      >
                        {copy.fields.email} *
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        placeholder={copy.fields.emailPlaceholder}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'err-email' : undefined}
                        className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#1C251E]/20 rounded-xl text-[#1C251E] placeholder:text-[#6A756D] focus:outline-none focus:border-[#1A3A2A]"
                      />
                      {errors.email && (
                        <p
                          id="err-email"
                          role="alert"
                          className="mt-1.5 text-xs font-medium text-[#9E2A2B]"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Product or Service of Interest */}
                    <div>
                      <label
                        htmlFor="contact-interest"
                        className="block text-xs font-semibold text-[#1A3A2A] mb-1.5"
                      >
                        {copy.fields.interest} *
                      </label>
                      <select
                        id="contact-interest"
                        name="interest"
                        required
                        value={formData.interest}
                        onChange={(e) => handleFieldChange('interest', e.target.value)}
                        aria-invalid={Boolean(errors.interest)}
                        aria-describedby={errors.interest ? 'err-interest' : undefined}
                        className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#1C251E]/20 rounded-xl text-[#1C251E] focus:outline-none focus:border-[#1A3A2A]"
                      >
                        <option value="">{copy.fields.interestPlaceholder}</option>
                        {copy.fields.interestOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.interest && (
                        <p
                          id="err-interest"
                          role="alert"
                          className="mt-1.5 text-xs font-medium text-[#9E2A2B]"
                        >
                          {errors.interest}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold text-[#1A3A2A] mb-1.5"
                    >
                      {copy.fields.message} *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => handleFieldChange('message', e.target.value)}
                      placeholder={copy.fields.messagePlaceholder}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'err-message' : undefined}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#1C251E]/20 rounded-xl text-[#1C251E] placeholder:text-[#6A756D] focus:outline-none focus:border-[#1A3A2A]"
                    />
                    {errors.message && (
                      <p
                        id="err-message"
                        role="alert"
                        className="mt-1.5 text-xs font-medium text-[#9E2A2B]"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-[#FAF7F2] bg-[#1A3A2A] hover:bg-[#254F3A] rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[46px]"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                    <span>{copy.fields.submitBtn}</span>
                  </button>
                </form>
              )}

              {/* Session Submitted Inquiries Log */}
              {submittedInquiries.length > 0 && (
                <div className="mt-6 pt-6 border-t border-[#1C251E]/10 space-y-3">
                  <h4 className="text-xs font-semibold text-[#5C4033]">
                    {copy.recentInquiriesTitle} ({submittedInquiries.length})
                  </h4>
                  <div className="space-y-2">
                    {submittedInquiries.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-xl bg-[#FAF7F2] border border-[#1C251E]/10 flex flex-wrap items-center justify-between gap-2 text-xs"
                      >
                        <div>
                          <span className="font-semibold text-[#1A3A2A]">
                            {item.fullName}
                          </span>
                          <span className="mx-1.5 text-[#5C4033]" aria-hidden="true">
                            ·
                          </span>
                          <span className="text-[#3A473D]">{item.interest}</span>
                        </div>
                        <span className="font-mono-tabular text-[#5C4033]">
                          {item.createdAt}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Clear Explanation of Backend Integration Configuration */}
              <div className="mt-6 pt-5 border-t border-[#1C251E]/10 flex items-start gap-2.5 text-xs text-[#4A574D]">
                <Info className="w-4 h-4 text-[#5C4033] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="font-semibold text-[#1A3A2A]">
                    {copy.backendNoteTitle}:
                  </span>{' '}
                  <span>{copy.backendNoteBody}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
