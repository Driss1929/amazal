import React, { useState } from 'react';
import { Globe, Menu, X } from 'lucide-react';
import { UI_COPY } from '../data/farmData';
import { buildWhatsAppInquiryUrl, type Language } from '../utils/farmLogic';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  whatsappNumber: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  whatsappNumber,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const copy = UI_COPY[language].nav;

  const whatsappHref = buildWhatsAppInquiryUrl({
    phone: whatsappNumber,
    language,
  });

  const languages: Array<{ code: Language; label: string; aria: string }> = [
    { code: 'en', label: 'EN', aria: 'Switch language to English' },
    { code: 'fr', label: 'FR', aria: 'Passer la langue en Français' },
    { code: 'ar', label: 'عربي', aria: 'تغيير اللغة إلى العربية' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#1C251E]/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-6 lg:gap-8 px-4 sm:px-6 py-3.5 sm:py-4">
        {/* Zone 1: Single text element Brand Wordmark */}
        <a
          href="#top"
          className="font-display text-base sm:text-xl font-bold tracking-tight text-[#1A3A2A] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1A3A2A]"
        >
          {copy.brand}
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#3A473D]"
        >
          <a
            href="#about"
            className="hover:text-[#1A3A2A] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            {copy.about}
          </a>
          <a
            href="#products"
            className="hover:text-[#1A3A2A] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            {copy.products}
          </a>
          <a
            href="#gallery"
            className="hover:text-[#1A3A2A] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            {copy.gallery}
          </a>
          <a
            href="#why-us"
            className="hover:text-[#1A3A2A] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            {copy.whyUs}
          </a>
          <a
            href="#contact"
            className="hover:text-[#1A3A2A] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            {copy.contact}
          </a>
        </nav>

        {/* Zone 3: Language Switcher & 1 Primary Action */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div
            role="group"
            aria-label="Language switcher"
            className="flex items-center gap-0.5 sm:gap-1 p-0.5 sm:p-1 bg-[#EFEAE0] rounded-lg border border-[#1C251E]/10"
          >
            <Globe className="w-3.5 h-3.5 text-[#5C4033] mx-1.5 hidden sm:block" aria-hidden="true" />
            {languages.map((item) => {
              const active = language === item.code;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => onLanguageChange(item.code)}
                  aria-label={item.aria}
                  aria-pressed={active}
                  className={`px-2 sm:px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#1A3A2A] text-[#FAF7F2] shadow-xs'
                      : 'text-[#3A473D] hover:text-[#1A3A2A]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-[#FAF7F2] bg-[#1A3A2A] hover:bg-[#254F3A] rounded-lg transition-colors whitespace-nowrap shrink-0 min-h-[38px]"
          >
            {copy.ctaWhatsApp}
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#1C251E]/15 text-[#1A3A2A] hover:bg-[#EFEAE0] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="lg:hidden border-t border-[#1C251E]/10 bg-[#FAF7F2] px-6 py-4 space-y-2"
        >
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#1C251E] hover:text-[#1A3A2A]"
          >
            {copy.about}
          </a>
          <a
            href="#products"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#1C251E] hover:text-[#1A3A2A]"
          >
            {copy.products}
          </a>
          <a
            href="#gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#1C251E] hover:text-[#1A3A2A]"
          >
            {copy.gallery}
          </a>
          <a
            href="#why-us"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#1C251E] hover:text-[#1A3A2A]"
          >
            {copy.whyUs}
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#1C251E] hover:text-[#1A3A2A]"
          >
            {copy.contact}
          </a>
          <div className="pt-2">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full py-2.5 px-4 text-xs font-semibold text-[#FAF7F2] bg-[#1A3A2A] rounded-lg"
            >
              {copy.ctaWhatsApp}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};
