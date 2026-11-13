import React from 'react';
import { MessageCircle } from 'lucide-react';
import { UI_COPY } from '../data/farmData';
import {
  buildWhatsAppInquiryUrl,
  type FarmContactConfig,
  type Language,
} from '../utils/farmLogic';

interface FloatingWhatsAppProps {
  language: Language;
  whatsappNumber: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  language,
  whatsappNumber,
}) => {
  const copy = UI_COPY[language].floatingWhatsApp;
  const href = buildWhatsAppInquiryUrl({
    phone: whatsappNumber,
    language,
  });

  return (
    <div className="fixed bottom-5 end-5 z-30">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={copy.tooltip}
        title={copy.tooltip}
        className="inline-flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#1A3A2A] hover:bg-[#254F3A] text-[#FAF7F2] shadow-lg border border-[#FAF7F2]/15 transition-transform duration-150 hover:-translate-y-0.5 whitespace-nowrap shrink-0 min-h-[44px]"
      >
        <MessageCircle className="w-5 h-5 text-[#FAF7F2] shrink-0" aria-hidden="true" />
        <span className="text-xs font-semibold tracking-wide hidden sm:inline">
          {copy.label}
        </span>
      </a>
    </div>
  );
};

interface FooterProps {
  language: Language;
  config: FarmContactConfig;
}

export const Footer: React.FC<FooterProps> = ({ language, config }) => {
  const navCopy = UI_COPY[language].nav;
  const prodCopy = UI_COPY[language].products.categories;
  const footerCopy = UI_COPY[language].footer;

  const whatsappHref = buildWhatsAppInquiryUrl({
    phone: config.whatsappNumber,
    language,
  });

  return (
    <footer className="bg-[#1A3A2A] text-[#FAF7F2] border-t border-[#1C251E]/20">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#FAF7F2]/15">
          {/* Col 1: Brand & Farm Description */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href="#top"
              className="font-display text-xl font-bold tracking-tight text-[#FAF7F2] inline-block"
            >
              {navCopy.brand}
            </a>
            <p className="text-sm text-[#EFEAE0]/85 leading-relaxed max-w-sm">
              {footerCopy.description}
            </p>
            <p className="text-xs font-medium text-[#D5CBB8]">
              {footerCopy.locationText}
            </p>
          </div>

          {/* Col 2: Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold tracking-wide text-[#D5CBB8]">
              {footerCopy.quickLinksTitle}
            </h3>
            <ul className="space-y-2 text-sm text-[#EFEAE0]/90">
              <li>
                <a href="#about" className="hover:text-white hover:underline underline-offset-4">
                  {navCopy.about}
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white hover:underline underline-offset-4">
                  {navCopy.products}
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white hover:underline underline-offset-4">
                  {navCopy.gallery}
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-white hover:underline underline-offset-4">
                  {navCopy.whyUs}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white hover:underline underline-offset-4">
                  {navCopy.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Product Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold tracking-wide text-[#D5CBB8]">
              {footerCopy.categoriesTitle}
            </h3>
            <ul className="space-y-2 text-sm text-[#EFEAE0]/90">
              <li>
                <a href="#products" className="hover:text-white hover:underline underline-offset-4">
                  {prodCopy.dairy}
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white hover:underline underline-offset-4">
                  {prodCopy.livestock}
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white hover:underline underline-offset-4">
                  {prodCopy.farm_goods}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Configurable Social Media Links */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold tracking-wide text-[#D5CBB8]">
              {footerCopy.contactTitle}
            </h3>
            <div className="space-y-2 text-xs sm:text-sm text-[#EFEAE0]/90">
              <p className="font-mono-tabular">{config.phonePlaceholder}</p>
              <p className="font-mono-tabular break-all">{config.emailPlaceholder}</p>
              <p>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-white font-medium"
                >
                  WhatsApp: {config.whatsappNumber}
                </a>
              </p>
            </div>

            <div className="pt-2 space-y-1.5 text-xs text-[#D5CBB8]">
              <p>{footerCopy.socialNote}</p>
              <div className="flex flex-wrap items-center gap-3 text-[#FAF7F2]">
                <a
                  href="#contact"
                  className="hover:underline underline-offset-4"
                >
                  Instagram ({config.instagramHandle})
                </a>
                <span aria-hidden="true">·</span>
                <a
                  href="#contact"
                  className="hover:underline underline-offset-4"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D5CBB8]">
          <p>
            © {new Date().getFullYear()} {footerCopy.copyright}
          </p>
          <p>{footerCopy.locationText}</p>
        </div>
      </div>
    </footer>
  );
};
