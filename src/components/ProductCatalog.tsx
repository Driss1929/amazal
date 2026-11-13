import React, { useState } from 'react';
import { MessageCircle, Search, SlidersHorizontal, Check } from 'lucide-react';
import { UI_COPY } from '../data/farmData';
import {
  buildWhatsAppInquiryUrl,
  filterProducts,
  type AvailabilityKey,
  type Language,
  type ProductCategory,
  type ProductItem,
} from '../utils/farmLogic';
import { ResilientImage } from './ResilientImage';

interface ProductCatalogProps {
  language: Language;
  products: ProductItem[];
  onUpdateProduct: (
    productId: string,
    updates: { priceText?: string; availability?: AvailabilityKey }
  ) => void;
  whatsappNumber: string;
  onUpdateWhatsappNumber: (newPhone: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  language,
  products,
  onUpdateProduct,
  whatsappNumber,
  onUpdateWhatsappNumber,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editMode, setEditMode] = useState(false);

  const copy = UI_COPY[language].products;

  const filteredProducts = filterProducts(
    products,
    selectedCategory,
    searchQuery,
    language
  );

  const categoryButtons: Array<{ key: ProductCategory | 'all'; label: string }> = [
    { key: 'all', label: copy.categories.all },
    { key: 'dairy', label: copy.categories.dairy },
    { key: 'livestock', label: copy.categories.livestock },
    { key: 'farm_goods', label: copy.categories.farm_goods },
  ];

  const getCategoryTextLabel = (cat: ProductCategory): string => {
    if (cat === 'dairy') return copy.categories.dairy;
    if (cat === 'livestock') return copy.categories.livestock;
    return copy.categories.farm_goods;
  };

  return (
    <section id="products" className="py-16 lg:py-24 border-b border-[#1C251E]/10 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
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

          {/* Toggle Editable Sample Placeholders Mode */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={() => setEditMode((prev) => !prev)}
              aria-pressed={editMode}
              className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl border transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[42px] ${
                editMode
                  ? 'bg-[#1A3A2A] text-[#FAF7F2] border-[#1A3A2A]'
                  : 'bg-[#F2ECE1] text-[#1A3A2A] border-[#1C251E]/15 hover:bg-[#E6DFD1]'
              }`}
            >
              {editMode ? (
                <>
                  <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{copy.editModeActiveBtn}</span>
                </>
              ) : (
                <>
                  <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{copy.editModeBtn}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Editable Sample Notice & Quick WhatsApp Number Config */}
        <div className="mb-8 p-4 rounded-xl bg-[#F2ECE1] border border-[#1C251E]/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-[#3A473D]">
            {copy.sampleNotice}
          </p>
          {editMode && (
            <div className="flex items-center gap-2 shrink-0">
              <label
                htmlFor="catalog-whatsapp-config"
                className="text-xs font-semibold text-[#1A3A2A] whitespace-nowrap"
              >
                WhatsApp #:
              </label>
              <input
                id="catalog-whatsapp-config"
                type="text"
                value={whatsappNumber}
                onChange={(e) => onUpdateWhatsappNumber(e.target.value)}
                className="font-mono-tabular text-xs px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#1C251E]/20 text-[#1C251E] w-44"
              />
            </div>
          )}
        </div>

        {/* Interactive Filter Tabs + Search Input */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10">
          {/* Interactive Segmented Category Filter Buttons */}
          <div
            role="tablist"
            aria-label="Product Categories"
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#EFEAE0] rounded-xl border border-[#1C251E]/10"
          >
            {categoryButtons.map((tab) => {
              const active = selectedCategory === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
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

          {/* Search Input */}
          <div className="relative min-w-[260px] sm:w-96">
            <label htmlFor="product-search-input" className="sr-only">
              {copy.searchPlaceholder}
            </label>
            <Search
              className="w-4 h-4 text-[#5C4033] absolute top-1/2 -translate-y-1/2 start-3.5 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="product-search-input"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={copy.searchPlaceholder}
              className="w-full ps-10 pe-4 py-2.5 text-sm bg-[#FAF7F2] border border-[#1C251E]/15 rounded-xl text-[#1C251E] placeholder:text-[#5A675D] focus:outline-none focus:border-[#1A3A2A]"
            />
          </div>
        </div>

        {/* 3-Column Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center rounded-2xl bg-[#F2ECE1]/60 border border-[#1C251E]/10 space-y-4">
            <p className="text-base font-medium text-[#3A473D]">{copy.emptyState}</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-semibold text-[#FAF7F2] bg-[#1A3A2A] rounded-lg cursor-pointer"
            >
              {copy.resetFilterBtn}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredProducts.map((product) => {
              const inquiryHref = buildWhatsAppInquiryUrl({
                phone: whatsappNumber,
                productName: product.whatsappTopic[language],
                language,
              });

              return (
                <article
                  key={product.id}
                  className="group flex flex-col rounded-2xl bg-[#FAF7F2] border border-[#1C251E]/12 overflow-hidden transition-transform duration-150 hover:-translate-y-0.5"
                >
                  {/* Lead with Imagery: 4:3 High-Quality Farm Photograph */}
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#EFEAE0]">
                    <ResilientImage
                      src={product.imagePath}
                      alt={product.name[language]}
                      objectPosition={product.imageObjectPosition}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                    />
                  </div>

                  {/* Product Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-2.5">
                      {/* Zero-Pill Unboxed Metadata with · separator */}
                      <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#5C4033]">
                        <span>{getCategoryTextLabel(product.category)}</span>
                        <span aria-hidden="true">·</span>
                        <span>{copy.availabilityLabels[product.availability]}</span>
                      </div>

                      <h3 className="text-lg font-semibold text-[#1A3A2A]">
                        {product.name[language]}
                      </h3>

                      <p className="text-sm text-[#3A473D] leading-relaxed">
                        {product.shortDescription[language]}
                      </p>
                    </div>

                    {/* Pricing, Editable Controls & WhatsApp Inquiry CTA */}
                    <div className="pt-4 border-t border-[#1C251E]/10 space-y-4">
                      {editMode ? (
                        <div className="space-y-2.5 bg-[#F2ECE1] p-3 rounded-xl">
                          <div>
                            <label
                              htmlFor={`price-${product.id}`}
                              className="block text-xs font-semibold text-[#1A3A2A] mb-1"
                            >
                              {copy.priceLabel} ({language.toUpperCase()}):
                            </label>
                            <input
                              id={`price-${product.id}`}
                              type="text"
                              value={product.priceDisplay[language]}
                              onChange={(e) =>
                                onUpdateProduct(product.id, { priceText: e.target.value })
                              }
                              className="w-full px-2.5 py-1.5 text-xs bg-[#FAF7F2] border border-[#1C251E]/20 rounded-lg text-[#1C251E]"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor={`avail-${product.id}`}
                              className="block text-xs font-semibold text-[#1A3A2A] mb-1"
                            >
                              Availability Status:
                            </label>
                            <select
                              id={`avail-${product.id}`}
                              value={product.availability}
                              onChange={(e) =>
                                onUpdateProduct(product.id, {
                                  availability: e.target.value as AvailabilityKey,
                                })
                              }
                              className="w-full px-2.5 py-1.5 text-xs bg-[#FAF7F2] border border-[#1C251E]/20 rounded-lg text-[#1C251E]"
                            >
                              <option value="available_daily">
                                {copy.availabilityLabels.available_daily}
                              </option>
                              <option value="seasonal_or_inquire">
                                {copy.availabilityLabels.seasonal_or_inquire}
                              </option>
                              <option value="upon_inquiry">
                                {copy.availabilityLabels.upon_inquiry}
                              </option>
                            </select>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-baseline justify-between gap-2 text-xs sm:text-sm">
                          <span className="text-[#5C4033] font-medium">
                            {copy.priceLabel}:
                          </span>
                          <span className="font-mono-tabular font-semibold text-[#1A3A2A] text-end">
                            {product.priceDisplay[language]}
                          </span>
                        </div>
                      )}

                      <a
                        href={inquiryHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${copy.whatsappBtn} — ${product.name[language]}`}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#FAF7F2] bg-[#1A3A2A] hover:bg-[#254F3A] rounded-xl transition-colors whitespace-nowrap shrink-0 min-h-[42px]"
                      >
                        <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>{copy.whatsappBtn}</span>
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
