import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, MessageCircle, X } from 'lucide-react';
import { GALLERY_ITEMS, UI_COPY } from '../data/farmData';
import {
  buildWhatsAppInquiryUrl,
  type GalleryItem,
  type Language,
} from '../utils/farmLogic';
import { ResilientImage } from './ResilientImage';

interface FarmGalleryProps {
  language: Language;
  whatsappNumber: string;
}

export const FarmGallery: React.FC<FarmGalleryProps> = ({
  language,
  whatsappNumber,
}) => {
  const [activeFilter, setActiveFilter] = useState<
    'all' | 'landscapes' | 'livestock' | 'dairy_harvest'
  >('all');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const copy = UI_COPY[language].gallery;

  const visibleItems: GalleryItem[] =
    activeFilter === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  const activeLightboxItem =
    selectedIndex !== null && visibleItems[selectedIndex]
      ? visibleItems[selectedIndex]
      : null;

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedIndex(null);
      } else if (event.key === 'ArrowRight') {
        setSelectedIndex((prev) =>
          prev === null ? null : (prev + 1) % visibleItems.length
        );
      } else if (event.key === 'ArrowLeft') {
        setSelectedIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + visibleItems.length) % visibleItems.length
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, visibleItems.length]);

  const filterTabs: Array<{
    key: 'all' | 'landscapes' | 'livestock' | 'dairy_harvest';
    label: string;
  }> = [
    { key: 'all', label: copy.filters.all },
    { key: 'landscapes', label: copy.filters.landscapes },
    { key: 'livestock', label: copy.filters.livestock },
    { key: 'dairy_harvest', label: copy.filters.dairy_harvest },
  ];

  return (
    <section id="gallery" className="py-16 lg:py-24 border-b border-[#1C251E]/10 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header & Category Filter */}
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

          <div
            role="group"
            aria-label="Gallery category filter"
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#EFEAE0] rounded-xl border border-[#1C251E]/10 shrink-0"
          >
            {filterTabs.map((tab) => {
              const active = activeFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setActiveFilter(tab.key);
                    setSelectedIndex(null);
                  }}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[38px] ${
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
        </div>

        {/* Responsive Gallery Grid with Lightbox Triggers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleItems.map((item, idx) => (
            <div
              key={item.id}
              className="group rounded-2xl overflow-hidden bg-[#F2ECE1] border border-[#1C251E]/10 flex flex-col"
            >
              <button
                type="button"
                onClick={() => setSelectedIndex(idx)}
                aria-label={`${copy.enlargeLabel}: ${item.title[language]}`}
                className="relative aspect-[4/3] w-full overflow-hidden text-start cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1A3A2A]"
              >
                <ResilientImage
                  src={item.imagePath}
                  alt={item.title[language]}
                  objectPosition={item.imageObjectPosition}
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5 text-[#FAF7F2]">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs text-[#EFEAE0]/90">
                        {item.locationNote[language]}
                      </p>
                      <h3 className="text-base font-semibold mt-0.5">
                        {item.title[language]}
                      </h3>
                    </div>
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-black/45 text-[#FAF7F2] shrink-0">
                      <Maximize2 className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </button>

              <div className="p-4 text-xs sm:text-sm text-[#3A473D] leading-relaxed">
                {item.caption[language]}
              </div>
            </div>
          ))}
        </div>

        {/* Accessible Lightbox Modal */}
        {activeLightboxItem && selectedIndex !== null && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={activeLightboxItem.title[language]}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedIndex(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-[#FAF7F2] text-[#1C251E] rounded-2xl overflow-hidden shadow-2xl border border-[#1C251E]/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Bar of Lightbox */}
              <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-[#1C251E]/10 bg-[#F2ECE1]">
                <div className="text-xs font-medium text-[#5C4033]">
                  <span>{activeLightboxItem.locationNote[language]}</span>
                  <span className="mx-2" aria-hidden="true">·</span>
                  <span className="font-mono-tabular">
                    {selectedIndex + 1} / {visibleItems.length}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedIndex(null)}
                  aria-label={copy.closeLightbox}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#FAF7F2] hover:bg-[#E4DDD0] text-[#1C251E] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Enlarged Image */}
              <div className="relative bg-[#141A16] aspect-[16/10] max-h-[65vh] w-full flex items-center justify-center overflow-hidden">
                <ResilientImage
                  src={activeLightboxItem.imagePath}
                  alt={activeLightboxItem.title[language]}
                  objectPosition={activeLightboxItem.imageObjectPosition}
                  className="w-full h-full object-cover"
                />

                {visibleItems.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedIndex(
                          (selectedIndex - 1 + visibleItems.length) %
                            visibleItems.length
                        )
                      }
                      aria-label={copy.prevPhoto}
                      className="absolute start-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedIndex(
                          (selectedIndex + 1) % visibleItems.length
                        )
                      }
                      aria-label={copy.nextPhoto}
                      className="absolute end-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5 rtl:rotate-180" />
                    </button>
                  </>
                )}
              </div>

              {/* Caption & Direct Inquiry Footer */}
              <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1 max-w-2xl">
                  <h3 className="font-display text-lg font-bold text-[#1A3A2A]">
                    {activeLightboxItem.title[language]}
                  </h3>
                  <p className="text-sm text-[#3A473D] leading-relaxed">
                    {activeLightboxItem.caption[language]}
                  </p>
                </div>

                <a
                  href={buildWhatsAppInquiryUrl({
                    phone: whatsappNumber,
                    productName: activeLightboxItem.title[language],
                    language,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#FAF7F2] bg-[#1A3A2A] hover:bg-[#254F3A] rounded-xl whitespace-nowrap shrink-0 min-h-[42px]"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>{copy.inquirePhotoBtn}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
