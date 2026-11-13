import React, { useState } from 'react';
import { Camera, MessageCircle, RotateCcw, Sparkles, UserCheck } from 'lucide-react';
import { DEFAULT_FARM_CONFIG, FARM_IMAGES, UI_COPY } from '../data/farmData';
import { buildWhatsAppInquiryUrl, type Language } from '../utils/farmLogic';
import { ResilientImage } from './ResilientImage';

interface AboutSectionProps {
  language: Language;
  whatsappNumber?: string;
}

const FARMER_PHOTO_STORAGE_KEY = 'atlas_farm_farmer_photo_v1';

export const AboutSection: React.FC<AboutSectionProps> = ({
  language,
  whatsappNumber = DEFAULT_FARM_CONFIG.whatsappNumber,
}) => {
  const copy = UI_COPY[language].about;
  const farmer = copy.meetFarmer;

  const [customFarmerPhoto, setCustomFarmerPhoto] = useState<string>(() => {
    try {
      return localStorage.getItem(FARMER_PHOTO_STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });
  const [showPhotoEditor, setShowPhotoEditor] = useState(false);

  const handleSavePhotoUrl = (url: string) => {
    setCustomFarmerPhoto(url);
    try {
      if (url.trim()) {
        localStorage.setItem(FARMER_PHOTO_STORAGE_KEY, url.trim());
      } else {
        localStorage.removeItem(FARMER_PHOTO_STORAGE_KEY);
      }
    } catch {
      // Ignore storage errors
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        handleSavePhotoUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const farmerWhatsappUrl = buildWhatsAppInquiryUrl({
    phone: whatsappNumber,
    language,
  });

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

        {/* Meet the Farmer Section */}
        <div
          id="meet-farmer"
          className="mt-16 pt-14 border-t border-[#1C251E]/10"
        >
          <div className="rounded-3xl bg-[#F2ECE1] border border-[#1C251E]/12 p-6 sm:p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Friendly Farmer Photograph Placeholder Card */}
              <div className="lg:col-span-5 flex flex-col space-y-4">
                <div className="relative rounded-2xl overflow-hidden border border-[#1C251E]/15 bg-[#FAF7F2] shadow-xs">
                  {customFarmerPhoto ? (
                    <div className="aspect-[4/5] w-full overflow-hidden bg-[#E5DEC9]">
                      <ResilientImage
                        src={customFarmerPhoto}
                        alt={farmer.farmerName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/5] w-full relative overflow-hidden bg-gradient-to-b from-[#E7DFCE] via-[#EFE9DC] to-[#DFD5C0] flex flex-col justify-between p-6">
                      {/* Subtle Farm Background Texture Overlay */}
                      <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <ResilientImage
                          src={FARM_IMAGES.heroLandscape}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Top Unboxed Metadata Line */}
                      <div className="relative z-10 flex items-center justify-between text-xs font-medium text-[#5C4033]">
                        <span>Atlas Farm Taroudant</span>
                        <span>·</span>
                        <span>Souss-Massa</span>
                      </div>

                      {/* Friendly Farmer Portrait Silhouette / Illustration Placeholder */}
                      <div className="relative z-10 my-auto flex flex-col items-center text-center px-3 py-6">
                        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#FAF7F2] border-2 border-[#1A3A2A]/20 flex items-center justify-center shadow-sm mb-4">
                          <svg
                            viewBox="0 0 120 120"
                            className="w-24 h-24 text-[#1A3A2A]"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            aria-label={farmer.photoPlaceholderTitle}
                          >
                            {/* Sun & Atlas Mountains in background */}
                            <circle cx="88" cy="30" r="10" fill="#D4A359" fillOpacity="0.35" />
                            <path
                              d="M12 95L38 68L58 84L84 56L108 95H12Z"
                              fill="#3B523E"
                              fillOpacity="0.14"
                            />
                            {/* Friendly Farmer Head & Traditional Sun Hat / Tagelmust Silhouette */}
                            <path
                              d="M36 44C36 33 46 26 60 26C74 26 84 33 84 44C89 45 94 48 94 51C94 54 79 56 60 56C41 56 26 54 26 51C26 48 31 45 36 44Z"
                              fill="#5C4033"
                            />
                            {/* Warm Smiling Face */}
                            <circle cx="60" cy="60" r="16" fill="#D9B38C" />
                            {/* Friendly Eyes & Smile */}
                            <circle cx="54" cy="57" r="1.8" fill="#1C251E" />
                            <circle cx="66" cy="57" r="1.8" fill="#1C251E" />
                            <path
                              d="M53 64C55 67.5 65 67.5 67 64"
                              stroke="#1A3A2A"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                            />
                            {/* Shoulders / Traditional Farm Tunic */}
                            <path
                              d="M30 104C32 86 44 78 60 78C76 78 88 86 90 104H30Z"
                              fill="#1A3A2A"
                            />
                            {/* Olive Sprig Emblem */}
                            <path
                              d="M60 85V98M60 89L66 85M60 93L54 89"
                              stroke="#FAF7F2"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>

                        <p className="text-sm font-semibold text-[#1A3A2A]">
                          {farmer.photoPlaceholderTitle}
                        </p>
                        <p className="mt-1.5 text-xs text-[#3A473D] leading-relaxed max-w-[34ch]">
                          {farmer.photoPlaceholderSub}
                        </p>
                      </div>

                      {/* Bottom Caption Strip */}
                      <div className="relative z-10 pt-3 border-t border-[#1C251E]/10 flex items-center justify-between gap-2 text-xs text-[#2A382E]">
                        <div className="truncate">
                          <span className="font-semibold text-[#1A3A2A]">
                            {farmer.farmerName}
                          </span>
                          <span className="mx-1.5" aria-hidden="true">
                            ·
                          </span>
                          <span className="text-[#5C4033]">{farmer.farmerRole}</span>
                        </div>
                        <UserCheck className="w-4 h-4 text-[#1A3A2A] shrink-0" aria-hidden="true" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Customize Farmer Portrait Controls */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPhotoEditor((prev) => !prev)}
                    className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#1A3A2A] bg-[#FAF7F2] hover:bg-[#EFEAE0] border border-[#1C251E]/15 rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Camera className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{farmer.uploadPhotoBtn}</span>
                  </button>

                  {customFarmerPhoto && (
                    <button
                      type="button"
                      onClick={() => handleSavePhotoUrl('')}
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#5C4033] hover:text-[#1A3A2A] cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{farmer.resetPhotoBtn}</span>
                    </button>
                  )}
                </div>

                {showPhotoEditor && (
                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#1C251E]/15 space-y-3">
                    <label
                      htmlFor="farmer-photo-url-input"
                      className="block text-xs font-semibold text-[#1A3A2A]"
                    >
                      {farmer.customUrlLabel}
                    </label>
                    <input
                      id="farmer-photo-url-input"
                      type="url"
                      value={customFarmerPhoto}
                      onChange={(e) => handleSavePhotoUrl(e.target.value)}
                      placeholder="https://example.com/farmer-portrait.jpg"
                      className="w-full px-3 py-2 text-xs bg-[#F2ECE1] border border-[#1C251E]/20 rounded-lg text-[#1C251E]"
                    />
                    <div>
                      <input
                        id="farmer-photo-file-input"
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="block w-full text-xs text-[#3A473D] file:me-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#1A3A2A] file:text-[#FAF7F2] hover:file:bg-[#254F3A] file:cursor-pointer"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Personal Bio, Agricultural Passion & Commitment to Quality */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2.5">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-[#5C4033]">
                    <Sparkles className="w-3.5 h-3.5 text-[#5C4033]" aria-hidden="true" />
                    <span>{farmer.kicker}</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#1A3A2A] tracking-tight text-balance">
                    {farmer.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-[#5C4033]">
                    {farmer.farmerName} · {farmer.farmerRole}
                  </p>
                </div>

                <div className="space-y-4 text-sm sm:text-base text-[#2A382E] leading-relaxed">
                  <p>{farmer.bioParagraph1}</p>
                  <p>{farmer.bioParagraph2}</p>
                  <p>{farmer.bioParagraph3}</p>
                </div>

                {/* Personal Quote Box (All-around border, no thick left border) */}
                <blockquote className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#1C251E]/12 text-sm sm:text-base italic font-medium text-[#1A3A2A] leading-relaxed">
                  {farmer.quote}
                </blockquote>

                {/* 3 Key Farmer Commitments */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  {farmer.valuesList.map((val) => (
                    <div
                      key={val.label}
                      className="p-3.5 rounded-xl bg-[#FAF7F2]/80 border border-[#1C251E]/10 space-y-1"
                    >
                      <p className="text-xs text-[#5C4033] font-medium">{val.label}</p>
                      <p className="text-xs sm:text-sm font-semibold text-[#1A3A2A]">
                        {val.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Direct Personal WhatsApp CTA */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <a
                    href={farmerWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-5 py-3 text-xs sm:text-sm font-semibold text-[#FAF7F2] bg-[#1A3A2A] hover:bg-[#254F3A] rounded-xl transition-colors whitespace-nowrap shrink-0 min-h-[44px]"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{farmer.directCtaLabel}</span>
                  </a>
                  <span className="font-mono-tabular text-xs font-medium text-[#5C4033]">
                    WhatsApp: {whatsappNumber}
                  </span>
                </div>
              </div>
            </div>
          </div>
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
