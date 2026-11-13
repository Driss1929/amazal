import React from 'react';
import { MessageCircle } from 'lucide-react';
import { FARM_IMAGES, UI_COPY } from '../data/farmData';
import { buildWhatsAppInquiryUrl, type Language } from '../utils/farmLogic';
import { ResilientImage } from './ResilientImage';

interface AboutSectionProps {
  language: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ language }) => {
  const copy = UI_COPY[language].about;

  return (
    <section id="about" className="py-16 lg:py-24 border-b border-[#1C251E]/10 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Editorial Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-7 space-y-5">
            <p className="text-xs font-medium tracking-wide text-[#5C4033]">
              {copy.kicker}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A3A2A] tracking-tight text-balance">
              {copy.title}
            </h2>
            <p className="text-base sm:text-lg font-medium text-[#2A382E] leading-relaxed max-w-[68ch]">
              {copy.lead}
            </p>
            <p className="text-base text-[#3A473D] leading-relaxed max-w-[68ch]">
              {copy.body1}
            </p>
            <p className="text-base text-[#3A473D] leading-relaxed max-w-[68ch]">
              {copy.body2}
            </p>

            {/* Clean All-Around Bordered Transparency Note (No thick left accent border) */}
            <div className="p-4 rounded-xl bg-[#F2ECE1] border border-[#1C251E]/10 text-xs sm:text-sm text-[#3A473D] leading-relaxed">
              {copy.transparencyNotice}
            </div>
          </div>

          {/* Authentic Taroudant Herd Visual Showcase */}
          <div className="lg:col-span-5 space-y-4">
            <div className="overflow-hidden rounded-2xl border border-[#1C251E]/10 bg-[#F2ECE1]">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <ResilientImage
                  src={FARM_IMAGES.cattleCalves}
                  alt="Dairy cows and young calves grazing on fresh green forage at Atlas Farm Taroudant"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 space-y-1">
                <div className="flex items-center gap-2 text-xs text-[#5C4033]">
                  <span>Taroudant Valley</span>
                  <span aria-hidden="true">·</span>
                  <span>Souss-Massa</span>
                  <span aria-hidden="true">·</span>
                  <span>Livestock & Dairy</span>
                </div>
                <p className="text-sm font-medium text-[#1C251E]">
                  {copy.highlights[2].description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Numbered Agricultural Values Grid */}
        <div className="mt-12 pt-10 border-t border-[#1C251E]/10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {copy.highlights.map((item) => (
            <div key={item.number} className="space-y-2.5">
              <span className="font-mono-tabular text-xs font-semibold text-[#5C4033] block">
                {item.number}
              </span>
              <h3 className="text-base font-semibold text-[#1A3A2A]">
                {item.title}
              </h3>
              <p className="text-sm text-[#3A473D] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

interface WhyUsSectionProps {
  language: Language;
  whatsappNumber: string;
}

export const WhyUsSection: React.FC<WhyUsSectionProps> = ({
  language,
  whatsappNumber,
}) => {
  const copy = UI_COPY[language].whyUs;
  const whatsappUrl = buildWhatsAppInquiryUrl({
    phone: whatsappNumber,
    language,
  });

  return (
    <section id="why-us" className="py-16 lg:py-24 border-b border-[#1C251E]/10 bg-[#F2ECE1]/70">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-12 space-y-3">
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

        {/* Asymmetric 5-Reason Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {copy.reasons.map((reason, idx) => {
            const spanClass = idx < 2 ? 'md:col-span-3' : 'md:col-span-2';
            return (
              <div
                key={reason.index}
                className={`${spanClass} p-6 sm:p-7 rounded-2xl bg-[#FAF7F2] border border-[#1C251E]/10 flex flex-col justify-between`}
              >
                <div className="space-y-3">
                  <span className="font-mono-tabular text-xs font-semibold text-[#5C4033] block">
                    {reason.index}
                  </span>
                  <h3 className="text-lg font-semibold text-[#1A3A2A]">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-[#3A473D] leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Direct Farmer Callout Banner */}
        <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-[#1A3A2A] text-[#FAF7F2] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-balance">
              {copy.directBannerTitle}
            </h3>
            <p className="text-sm text-[#EFEAE0]/90 leading-relaxed">
              {copy.directBannerText}
            </p>
          </div>
          <div className="shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-5 py-3 text-xs sm:text-sm font-semibold text-[#1A3A2A] bg-[#FAF7F2] hover:bg-[#EFEAE0] rounded-xl transition-colors whitespace-nowrap shrink-0 min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4 text-[#1A3A2A]" aria-hidden="true" />
              <span>{copy.directBannerBtn}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
