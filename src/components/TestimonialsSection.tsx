import React, { useState } from 'react';
import { MessageSquarePlus, Quote, Star, X } from 'lucide-react';
import { UI_COPY } from '../data/farmData';
import {
  filterTestimonials,
  validateTestimonialInput,
  type Language,
  type NewTestimonialInput,
  type TestimonialCategory,
  type TestimonialItem,
  type TestimonialValidationErrors,
} from '../utils/farmLogic';

interface TestimonialsSectionProps {
  language: Language;
  testimonials: TestimonialItem[];
  onAddTestimonial: (newItem: TestimonialItem) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  language,
  testimonials,
  onAddTestimonial,
}) => {
  const copy = UI_COPY[language].testimonials;

  const [selectedCategory, setSelectedCategory] = useState<
    TestimonialCategory | 'all'
  >('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formInput, setFormInput] = useState<NewTestimonialInput>({
    clientName: '',
    clientLocation: '',
    category: 'dairy',
    productPurchased: '',
    quote: '',
    rating: 5,
  });
  const [errors, setErrors] = useState<TestimonialValidationErrors>({});

  const visibleTestimonials = filterTestimonials(
    testimonials,
    selectedCategory
  );

  const filterTabs: Array<{ key: TestimonialCategory | 'all'; label: string }> = [
    { key: 'all', label: copy.filters.all },
    { key: 'dairy', label: copy.filters.dairy },
    { key: 'livestock', label: copy.filters.livestock },
    { key: 'farm_goods', label: copy.filters.farm_goods },
  ];

  const handleFieldChange = <K extends keyof NewTestimonialInput>(
    field: K,
    value: NewTestimonialInput[K]
  ) => {
    setFormInput((prev) => ({ ...prev, [field]: value }));
    if (field in errors) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateTestimonialInput(formInput, language);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    const cleanName = formInput.clientName.trim();
    const cleanLocation = formInput.clientLocation.trim();
    const cleanProduct = formInput.productPurchased.trim();
    const cleanQuote = formInput.quote.trim();

    const createdReview: TestimonialItem = {
      id: `review-${Date.now()}`,
      category: formInput.category,
      clientName: {
        en: cleanName,
        fr: cleanName,
        ar: cleanName,
      },
      clientRole: {
        en: 'Local Client',
        fr: 'Client Local',
        ar: 'زبون محلي',
      },
      clientLocation: {
        en: cleanLocation,
        fr: cleanLocation,
        ar: cleanLocation,
      },
      productPurchased: {
        en: cleanProduct,
        fr: cleanProduct,
        ar: cleanProduct,
      },
      quote: {
        en: cleanQuote,
        fr: cleanQuote,
        ar: cleanQuote,
      },
      rating: formInput.rating,
      dateLabel: {
        en: copy.verifiedClientBadge,
        fr: copy.verifiedClientBadge,
        ar: copy.verifiedClientBadge,
      },
      isSample: false,
    };

    onAddTestimonial(createdReview);
    setSelectedCategory('all');
    setShowAddForm(false);
    setErrors({});
    setFormInput({
      clientName: '',
      clientLocation: '',
      category: 'dairy',
      productPurchased: '',
      quote: '',
      rating: 5,
    });
  };

  return (
    <section
      id="testimonials"
      className="py-16 lg:py-24 border-b border-[#1C251E]/10 bg-[#FAF7F2]"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header + Share Experience Toggle */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
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

          <div className="shrink-0">
            <button
              type="button"
              id="toggle-add-testimonial-btn"
              onClick={() => setShowAddForm((prev) => !prev)}
              aria-expanded={showAddForm}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border border-[#1C251E]/15 bg-[#1A3A2A] hover:bg-[#254F3A] text-[#FAF7F2] transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[42px]"
            >
              {showAddForm ? (
                <>
                  <X className="w-4 h-4" aria-hidden="true" />
                  <span>{copy.cancelReviewBtn}</span>
                </>
              ) : (
                <>
                  <MessageSquarePlus className="w-4 h-4" aria-hidden="true" />
                  <span>{copy.addReviewBtn}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Transparency & Category Filter Bar */}
        <div className="mb-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div
            role="group"
            aria-label="Filter client reviews by category"
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#EFEAE0] rounded-xl border border-[#1C251E]/10 self-start"
          >
            {filterTabs.map((tab) => {
              const active = selectedCategory === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  data-testimonial-filter={tab.key}
                  aria-pressed={active}
                  onClick={() => setSelectedCategory(tab.key)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[38px] ${
                    active
                      ? 'bg-[#1A3A2A] text-[#FAF7F2] shadow-xs'
                      : 'text-[#3A473D] hover:text-[#1A3A2A]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-[#5C4033] max-w-xl">
            {copy.sampleDisclaimer}
          </p>
        </div>

        {/* Collapsible Add Client Review Form */}
        {showAddForm && (
          <div className="mb-10 p-6 sm:p-8 rounded-2xl bg-[#F2ECE1] border border-[#1C251E]/15">
            <div className="max-w-2xl mb-6 space-y-1">
              <h3 className="font-display text-xl font-bold text-[#1A3A2A]">
                {copy.formTitle}
              </h3>
              <p className="text-sm text-[#3A473D]">{copy.formSubtitle}</p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label
                    htmlFor="rev-client-name"
                    className="block text-xs font-semibold text-[#1A3A2A] mb-1.5"
                  >
                    {copy.fields.clientName} *
                  </label>
                  <input
                    id="rev-client-name"
                    type="text"
                    value={formInput.clientName}
                    onChange={(e) =>
                      handleFieldChange('clientName', e.target.value)
                    }
                    placeholder={copy.fields.clientNamePlaceholder}
                    className="w-full px-3.5 py-2 text-sm bg-[#FAF7F2] border border-[#1C251E]/20 rounded-xl text-[#1C251E]"
                  />
                  {errors.clientName && (
                    <p
                      role="alert"
                      className="mt-1 text-xs font-medium text-[#9E2A2B]"
                    >
                      {errors.clientName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="rev-client-location"
                    className="block text-xs font-semibold text-[#1A3A2A] mb-1.5"
                  >
                    {copy.fields.clientLocation} *
                  </label>
                  <input
                    id="rev-client-location"
                    type="text"
                    value={formInput.clientLocation}
                    onChange={(e) =>
                      handleFieldChange('clientLocation', e.target.value)
                    }
                    placeholder={copy.fields.clientLocationPlaceholder}
                    className="w-full px-3.5 py-2 text-sm bg-[#FAF7F2] border border-[#1C251E]/20 rounded-xl text-[#1C251E]"
                  />
                  {errors.clientLocation && (
                    <p
                      role="alert"
                      className="mt-1 text-xs font-medium text-[#9E2A2B]"
                    >
                      {errors.clientLocation}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="rev-category"
                    className="block text-xs font-semibold text-[#1A3A2A] mb-1.5"
                  >
                    {copy.fields.category} *
                  </label>
                  <select
                    id="rev-category"
                    value={formInput.category}
                    onChange={(e) =>
                      handleFieldChange(
                        'category',
                        e.target.value as TestimonialCategory
                      )
                    }
                    className="w-full px-3.5 py-2 text-sm bg-[#FAF7F2] border border-[#1C251E]/20 rounded-xl text-[#1C251E]"
                  >
                    <option value="dairy">{copy.filters.dairy}</option>
                    <option value="livestock">{copy.filters.livestock}</option>
                    <option value="farm_goods">{copy.filters.farm_goods}</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="rev-product"
                    className="block text-xs font-semibold text-[#1A3A2A] mb-1.5"
                  >
                    {copy.fields.productPurchased} *
                  </label>
                  <input
                    id="rev-product"
                    type="text"
                    value={formInput.productPurchased}
                    onChange={(e) =>
                      handleFieldChange('productPurchased', e.target.value)
                    }
                    placeholder={copy.fields.productPurchasedPlaceholder}
                    className="w-full px-3.5 py-2 text-sm bg-[#FAF7F2] border border-[#1C251E]/20 rounded-xl text-[#1C251E]"
                  />
                  {errors.productPurchased && (
                    <p
                      role="alert"
                      className="mt-1 text-xs font-medium text-[#9E2A2B]"
                    >
                      {errors.productPurchased}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="rev-quote"
                  className="block text-xs font-semibold text-[#1A3A2A] mb-1.5"
                >
                  {copy.fields.quote} *
                </label>
                <textarea
                  id="rev-quote"
                  rows={3}
                  value={formInput.quote}
                  onChange={(e) => handleFieldChange('quote', e.target.value)}
                  placeholder={copy.fields.quotePlaceholder}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#1C251E]/20 rounded-xl text-[#1C251E]"
                />
                {errors.quote && (
                  <p
                    role="alert"
                    className="mt-1 text-xs font-medium text-[#9E2A2B]"
                  >
                    {errors.quote}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#1A3A2A]">
                    {copy.fields.rating}:
                  </span>
                  {[5, 4, 3].map((stars) => (
                    <button
                      key={stars}
                      type="button"
                      onClick={() => handleFieldChange('rating', stars)}
                      aria-pressed={formInput.rating === stars}
                      className={`px-3 py-1 text-xs font-mono-tabular font-semibold rounded-lg border cursor-pointer ${
                        formInput.rating === stars
                          ? 'bg-[#1A3A2A] text-[#FAF7F2] border-[#1A3A2A]'
                          : 'bg-[#FAF7F2] text-[#3A473D] border-[#1C251E]/15'
                      }`}
                    >
                      {stars}.0 ★
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#FAF7F2] bg-[#1A3A2A] hover:bg-[#254F3A] rounded-xl transition-colors cursor-pointer min-h-[40px]"
                >
                  {copy.fields.submitBtn}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 2-Column Editorial Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {visibleTestimonials.map((item) => (
            <article
              key={item.id}
              data-testimonial-id={item.id}
              className="p-6 sm:p-8 rounded-2xl bg-[#F2ECE1]/75 border border-[#1C251E]/12 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Top Row: Star Rating + Unboxed Metadata Line */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div
                    className="inline-flex items-center gap-1 text-[#B57B2E]"
                    aria-label={`${item.rating} out of 5 stars`}
                  >
                    {Array.from({ length: item.rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-4 h-4 fill-[#B57B2E] text-[#B57B2E]"
                        aria-hidden="true"
                      />
                    ))}
                    <span className="ms-1.5 font-mono-tabular text-xs font-semibold text-[#1A3A2A]">
                      {item.rating}.0
                    </span>
                  </div>

                  <span className="text-xs text-[#5C4033]">
                    {item.dateLabel[language]}
                  </span>
                </div>

                {/* Client Quote */}
                <div className="relative">
                  <Quote
                    className="w-5 h-5 text-[#5C4033]/35 mb-2"
                    aria-hidden="true"
                  />
                  <blockquote className="text-sm sm:text-base text-[#1C251E] leading-relaxed">
                    “{item.quote[language]}”
                  </blockquote>
                </div>
              </div>

              {/* Footer: Client Name, Location & Product Purchased (Zero-Pill Unboxed Metadata) */}
              <div className="pt-4 border-t border-[#1C251E]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-[#1A3A2A]">
                    {item.clientName[language]}
                  </h3>
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#5C4033] mt-0.5">
                    <span>{item.clientRole[language]}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.clientLocation[language]}</span>
                  </div>
                </div>

                <div className="text-xs text-[#2A382E] sm:text-end">
                  <span className="text-[#5C4033]">{copy.purchasedLabel}</span>{' '}
                  <span className="font-semibold text-[#1A3A2A]">
                    {item.productPurchased[language]}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
