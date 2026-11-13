/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { AboutSection, WhyUsSection } from './components/AboutAndWhyUs';
import { ContactSection } from './components/ContactSection';
import { FarmGallery } from './components/FarmGallery';
import { FloatingWhatsApp, Footer } from './components/FooterAndFloating';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ProductCatalog } from './components/ProductCatalog';
import { TestimonialsSection } from './components/TestimonialsSection';
import {
  DEFAULT_FARM_CONFIG,
  INITIAL_PRODUCTS,
  INITIAL_TESTIMONIALS,
} from './data/farmData';
import type {
  AvailabilityKey,
  FarmContactConfig,
  Language,
  ProductItem,
  SubmittedInquiry,
  TestimonialItem,
} from './utils/farmLogic';

const STORAGE_KEYS = {
  lang: 'atlas_farm_lang_v1',
  config: 'atlas_farm_config_v2',
  products: 'atlas_farm_products_v2',
  testimonials: 'atlas_farm_testimonials_v1',
  inquiries: 'atlas_farm_inquiries_v1',
};

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.lang);
      if (saved === 'en' || saved === 'fr' || saved === 'ar') {
        return saved;
      }
    } catch {
      // Ignore storage errors
    }
    return 'en';
  });

  const [farmConfig, setFarmConfig] = useState<FarmContactConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.config);
      if (saved) {
        return { ...DEFAULT_FARM_CONFIG, ...JSON.parse(saved) };
      }
    } catch {
      // Ignore storage errors
    }
    return DEFAULT_FARM_CONFIG;
  });

  const [products, setProducts] = useState<ProductItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.products);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Ignore storage errors
    }
    return INITIAL_PRODUCTS;
  });

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.testimonials);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Ignore storage errors
    }
    return INITIAL_TESTIMONIALS;
  });

  const [submittedInquiries, setSubmittedInquiries] = useState<SubmittedInquiry[]>(
    () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEYS.inquiries);
        if (saved) {
          return JSON.parse(saved);
        }
      } catch {
        // Ignore storage errors
      }
      return [];
    }
  );

  // Sync HTML lang and RTL/LTR direction whenever language changes
  useEffect(() => {
    const dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    try {
      localStorage.setItem(STORAGE_KEYS.lang, language);
    } catch {
      // Ignore storage errors
    }
  }, [language]);

  const handleUpdateConfig = (updates: Partial<FarmContactConfig>) => {
    setFarmConfig((prev) => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem(STORAGE_KEYS.config, JSON.stringify(next));
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  };

  const handleUpdateProduct = (
    productId: string,
    updates: {
      priceText?: string;
      availability?: AvailabilityKey;
      referencePriceMad?: number;
    }
  ) => {
    setProducts((prev) => {
      const next = prev.map((item) => {
        if (item.id !== productId) return item;
        return {
          ...item,
          availability: updates.availability ?? item.availability,
          referencePriceMad:
            updates.referencePriceMad !== undefined
              ? updates.referencePriceMad
              : item.referencePriceMad,
          priceDisplay:
            updates.priceText !== undefined
              ? {
                  ...item.priceDisplay,
                  [language]: updates.priceText,
                }
              : item.priceDisplay,
        };
      });
      try {
        localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(next));
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  };

  const handleAddTestimonial = (newItem: TestimonialItem) => {
    setTestimonials((prev) => {
      const next = [newItem, ...prev];
      try {
        localStorage.setItem(STORAGE_KEYS.testimonials, JSON.stringify(next));
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  };

  const handleAddInquiry = (inquiry: SubmittedInquiry) => {
    setSubmittedInquiries((prev) => {
      const next = [inquiry, ...prev];
      try {
        localStorage.setItem(STORAGE_KEYS.inquiries, JSON.stringify(next));
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  };

  return (
    <div
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1C251E]"
    >
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        whatsappNumber={farmConfig.whatsappNumber}
      />

      <main className="flex-1">
        <HeroSection language={language} />

        <AboutSection
          language={language}
          whatsappNumber={farmConfig.whatsappNumber}
        />

        <ProductCatalog
          language={language}
          products={products}
          onUpdateProduct={handleUpdateProduct}
          whatsappNumber={farmConfig.whatsappNumber}
          onUpdateWhatsappNumber={(newPhone) =>
            handleUpdateConfig({ whatsappNumber: newPhone })
          }
        />

        <FarmGallery
          language={language}
          whatsappNumber={farmConfig.whatsappNumber}
        />

        <WhyUsSection
          language={language}
          whatsappNumber={farmConfig.whatsappNumber}
        />

        <TestimonialsSection
          language={language}
          testimonials={testimonials}
          onAddTestimonial={handleAddTestimonial}
        />

        <ContactSection
          language={language}
          config={farmConfig}
          onUpdateConfig={handleUpdateConfig}
          submittedInquiries={submittedInquiries}
          onSubmitInquiry={handleAddInquiry}
        />
      </main>

      <Footer language={language} config={farmConfig} />

      <FloatingWhatsApp
        language={language}
        whatsappNumber={farmConfig.whatsappNumber}
      />
    </div>
  );
}
