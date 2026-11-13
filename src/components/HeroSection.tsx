import React from 'react';
import { ArrowRight, PhoneCall } from 'lucide-react';
import { FARM_IMAGES, UI_COPY } from '../data/farmData';
import type { Language } from '../utils/farmLogic';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  language: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ language }) => {
  const copy = UI_COPY[language].hero;
  const isRtl = language === 'ar';

  return (
    <section id="top" className="relative overflow-hidden border-b border-[#1C251E]/10">
      {/* Main Hero Split & Showcase Container */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Editorial Text Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-xs font-medium tracking-wide text-[#5C4033] mb-4">
              {copy.kicker}
            </p>

            <h1
              className="font-display text-[#1A3A2A] font-bold tracking-tight text-balance mb-4"
              style={{
                fontSize: 'clamp(2.25rem, 3.8vw, 3.5rem)',
                lineHeight: isRtl ? 1.32 : 1.12,
              }}
            >
              {copy.headline}
            </h1>

            <p className="font-display text-lg sm:text-xl font-semibold text-[#4A5D3F] mb-5 text-balance">
              {copy.subtitle}
            </p>

            <p className="text-base text-[#3A473D] leading-relaxed mb-8 max-w-[64ch]">
              {copy.intro}
            </p>

            {/* Two Prominent Call-to-Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-[#FAF7F2] bg-[#1A3A2A] hover:bg-[#254F3A] rounded-xl shadow-xs transition-all duration-150 whitespace-nowrap shrink-0 min-h-[46px]"
              >
                <span>{copy.exploreBtn}</span>
                <ArrowRight
                  className={`w-4 h-4 transition-transform ${isRtl ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#1A3A2A] bg-[#EFEAE0] hover:bg-[#E4DDD0] border border-[#1A3A2A]/20 rounded-xl transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[46px]"
              >
                <PhoneCall className="w-4 h-4 text-[#5C4033]" aria-hidden="true" />
                <span>{copy.contactBtn}</span>
              </a>
            </div>
          </div>

          {/* Large High-Quality Moroccan Farm Photograph */}
          <div className="lg:col-span-6 flex">
            <div className="relative w-full overflow-hidden rounded-2xl border border-[#1C251E]/10 shadow-sm min-h-[320px] sm:min-h-[400px] lg:h-full">
              <ResilientImage
                src={FARM_IMAGES.heroLandscape}
                alt="Atlas Farm Taroudant lush green pastures, dairy cattle, olive trees, and High Atlas Mountains at golden hour"
                loading="eager"
                className="w-full h-full object-cover"
              />
              {/* Measured contrast scrim at bottom for authentic regional caption */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-[#FAF7F2]">
                <p className="text-xs font-medium text-[#EFEAE0]/90">
                  {copy.kicker}
                </p>
                <p className="text-sm font-semibold mt-0.5">
                  {copy.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Pillar Farm Overview Strip Below Hero Split */}
        <div className="mt-10 pt-8 border-t border-[#1C251E]/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {copy.pillars.map((pillar, index) => (
            <div key={pillar.label} className="space-y-1.5">
              <div className="flex items-baseline gap-2">
                <span className="font-mono-tabular text-xs font-medium text-[#5C4033]">
                  0{index + 1}.
                </span>
                <h2 className="text-sm font-semibold text-[#1A3A2A]">
                  {pillar.label}
                </h2>
              </div>
              <p className="text-xs text-[#4A574D] leading-relaxed">
                {pillar.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
