export type Language = 'en' | 'fr' | 'ar';

export type ProductCategory = 'dairy' | 'livestock' | 'farm_goods';

export type AvailabilityKey = 'available_daily' | 'seasonal_or_inquire' | 'upon_inquiry';

export type SortOption =
  | 'featured'
  | 'name_asc'
  | 'name_desc'
  | 'price_asc'
  | 'price_desc';

export interface LocalizedText {
  en: string;
  fr: string;
  ar: string;
}

export interface ProductItem {
  id: string;
  category: ProductCategory;
  name: LocalizedText;
  shortDescription: LocalizedText;
  unitOrBreedNote: LocalizedText;
  availability: AvailabilityKey;
  priceDisplay: LocalizedText;
  referencePriceMad: number;
  whatsappTopic: LocalizedText;
  imagePath: string;
  imageObjectPosition?: string;
  featured?: boolean;
}

export interface GalleryItem {
  id: string;
  category: 'landscapes' | 'livestock' | 'dairy_harvest';
  title: LocalizedText;
  caption: LocalizedText;
  locationNote: LocalizedText;
  imagePath: string;
  aspectClass: 'aspect-[16/10]' | 'aspect-[4/3]' | 'aspect-square';
  imageObjectPosition?: string;
}

export interface FarmContactConfig {
  phonePlaceholder: string;
  whatsappNumber: string;
  emailPlaceholder: string;
  locationAddress: LocalizedText;
  mapQuery: string;
  instagramHandle: string;
  facebookPage: string;
}

export interface ContactFormInput {
  fullName: string;
  phone: string;
  email: string;
  interest: string;
  message: string;
}

export interface SubmittedInquiry extends ContactFormInput {
  id: string;
  createdAt: string;
  language: Language;
}

export interface ValidationErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  interest?: string;
  message?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationErrors;
}

/**
 * Strips non-numeric characters (except leading + convert to digits) for WhatsApp wa.me links.
 */
export function sanitizeWhatsAppPhone(rawPhone: string): string {
  const digitsOnly = rawPhone.replace(/[^\d]/g, '');
  if (!digitsOnly) {
    return '212655607035';
  }
  if (digitsOnly.startsWith('00')) {
    return digitsOnly.slice(2);
  }
  if (digitsOnly.startsWith('0') && digitsOnly.length === 10) {
    return `212${digitsOnly.slice(1)}`;
  }
  return digitsOnly;
}

/**
 * Builds a pre-filled WhatsApp wa.me inquiry link localized in EN, FR, or AR.
 */
export function buildWhatsAppInquiryUrl(params: {
  phone: string;
  productName?: string;
  customMessage?: string;
  language: Language;
}): string {
  const cleanPhone = sanitizeWhatsAppPhone(params.phone);
  let text = params.customMessage?.trim() || '';

  if (!text) {
    if (params.productName) {
      if (params.language === 'fr') {
        text = `Bonjour Atlas Farm Taroudant, je suis intéressé(e) par : ${params.productName}. Pourriez-vous me donner plus d'informations sur la disponibilité et les tarifs ?`;
      } else if (params.language === 'ar') {
        text = `السلام عليكم ضيعة أطلس تارودانت، أنا مهتم بـ ${params.productName}. هل يمكنكم تزويدي بمزيد من المعلومات حول التوفر والأسعار؟`;
      } else {
        text = `Hello, I am interested in your ${params.productName}. Could you please provide more information?`;
      }
    } else {
      if (params.language === 'fr') {
        text = `Bonjour, je suis intéressé(e) par les produits d'Atlas Farm Taroudant. Pouvez-vous m'aider ?`;
      } else if (params.language === 'ar') {
        text = `السلام عليكم، أنا مهتم بمنتجات ضيعة أطلس تارودانت. هل يمكنكم مساعدتي؟`;
      } else {
        text = `Hello, I'm interested in Atlas Farm Taroudant products. Can you help me?`;
      }
    }
  }

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

/**
 * Validates the customer contact form without ever substituting fallback values.
 */
export function validateContactForm(
  input: ContactFormInput,
  language: Language
): ValidationResult {
  const errors: ValidationErrors = {};

  const messages = {
    en: {
      fullName: 'Please enter your full name (at least 2 characters).',
      phone: 'Please enter a valid phone or WhatsApp number (at least 8 digits).',
      email: 'Please enter a valid email address (or leave valid contact email).',
      interest: 'Please select a product or service of interest.',
      message: 'Please write a short message describing your inquiry (at least 10 characters).',
    },
    fr: {
      fullName: 'Veuillez saisir votre nom complet (au moins 2 caractères).',
      phone: 'Veuillez saisir un numéro de téléphone ou WhatsApp valide (au moins 8 chiffres).',
      email: 'Veuillez saisir une adresse e-mail valide.',
      interest: 'Veuillez sélectionner un produit ou service qui vous intéresse.',
      message: 'Veuillez rédiger un court message précisant votre demande (au moins 10 caractères).',
    },
    ar: {
      fullName: 'يرجى إدخال الاسم الكامل (حرفان على الأقل).',
      phone: 'يرجى إدخال رقم هاتف أو واتساب صحيح (8 أرقام على الأقل).',
      email: 'يرجى إدخال بريد إلكتروني صحيح.',
      interest: 'يرجى اختيار المنتج أو الخدمة المطلوبة.',
      message: 'يرجى كتابة رسالة توضح طلبكم (10 أحرف على الأقل).',
    },
  }[language];

  if (!input.fullName || input.fullName.trim().length < 2) {
    errors.fullName = messages.fullName;
  }

  const phoneDigits = (input.phone || '').replace(/[^\d]/g, '');
  if (phoneDigits.length < 8 || phoneDigits.length > 15) {
    errors.phone = messages.phone;
  }

  const emailTrimmed = (input.email || '').trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailTrimmed || !emailRegex.test(emailTrimmed)) {
    errors.email = messages.email;
  }

  if (!input.interest || !input.interest.trim()) {
    errors.interest = messages.interest;
  }

  if (!input.message || input.message.trim().length < 10) {
    errors.message = messages.message;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Filters products by category and search query in the active language.
 */
export function filterProducts(
  products: ProductItem[],
  category: ProductCategory | 'all',
  searchQuery: string,
  language: Language
): ProductItem[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  return products.filter((item) => {
    const matchesCategory = category === 'all' || item.category === category;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;

    const nameText = item.name[language].toLowerCase();
    const descText = item.shortDescription[language].toLowerCase();
    const noteText = item.unitOrBreedNote[language].toLowerCase();
    return (
      nameText.includes(normalizedQuery) ||
      descText.includes(normalizedQuery) ||
      noteText.includes(normalizedQuery)
    );
  });
}

/**
 * Sorts products by name (A-Z, Z-A), reference price (low-to-high, high-to-low), or featured order.
 */
export function sortProducts(
  products: ProductItem[],
  sortBy: SortOption,
  language: Language
): ProductItem[] {
  const copy = [...products];
  if (sortBy === 'featured') {
    return copy;
  }
  if (sortBy === 'name_asc') {
    return copy.sort((a, b) =>
      a.name[language].localeCompare(b.name[language], language, {
        sensitivity: 'base',
      })
    );
  }
  if (sortBy === 'name_desc') {
    return copy.sort((a, b) =>
      b.name[language].localeCompare(a.name[language], language, {
        sensitivity: 'base',
      })
    );
  }
  if (sortBy === 'price_asc') {
    return copy.sort((a, b) => a.referencePriceMad - b.referencePriceMad);
  }
  if (sortBy === 'price_desc') {
    return copy.sort((a, b) => b.referencePriceMad - a.referencePriceMad);
  }
  return copy;
}

/**
 *Filters and sorts products in a single pure pipeline.
 */
export function filterAndSortProducts(
  products: ProductItem[],
  category: ProductCategory | 'all',
  searchQuery: string,
  sortBy: SortOption,
  language: Language
): ProductItem[] {
  const filtered = filterProducts(products, category, searchQuery, language);
  return sortProducts(filtered, sortBy, language);
}

/**
 * Module 2 Dairy critical calculation:
 * Milk Balance = Opening Stock + Production - Sales - Processing - Losses
 */
export function calculateMilkBalance(params: {
  openingStockLiters: number;
  producedLiters: number;
  soldLiters: number;
  processedLiters: number;
  lossLiters: number;
}): number {
  const raw =
    params.openingStockLiters +
    params.producedLiters -
    params.soldLiters -
    params.processedLiters -
    params.lossLiters;
  return Math.round(raw * 100) / 100;
}

/**
 * Builds a clean Google Maps iframe embed URL for Taroudant or custom coordinates/address.
 */
export function buildGoogleMapsEmbedUrl(locationQuery: string, language: Language): string {
  const cleanQuery = locationQuery.trim() || 'Taroudant, Souss-Massa, Morocco';
  return `https://www.google.com/maps?q=${encodeURIComponent(cleanQuery)}&hl=${language}&z=12&output=embed`;
}

export type TestimonialCategory = 'dairy' | 'livestock' | 'farm_goods';

export interface TestimonialItem {
  id: string;
  category: TestimonialCategory;
  clientName: LocalizedText;
  clientRole: LocalizedText;
  clientLocation: LocalizedText;
  productPurchased: LocalizedText;
  quote: LocalizedText;
  rating: number;
  dateLabel: LocalizedText;
  isSample?: boolean;
}

export interface NewTestimonialInput {
  clientName: string;
  clientLocation: string;
  category: TestimonialCategory;
  productPurchased: string;
  quote: string;
  rating: number;
}

export interface TestimonialValidationErrors {
  clientName?: string;
  clientLocation?: string;
  productPurchased?: string;
  quote?: string;
}

/**
 * Filters testimonials by category ('all' | 'dairy' | 'livestock' | 'farm_goods').
 */
export function filterTestimonials(
  testimonials: TestimonialItem[],
  category: TestimonialCategory | 'all'
): TestimonialItem[] {
  if (category === 'all') {
    return [...testimonials];
  }
  return testimonials.filter((item) => item.category === category);
}

/**
 * Validates a new customer review submission in the active language.
 */
export function validateTestimonialInput(
  input: NewTestimonialInput,
  language: Language
): { valid: boolean; errors: TestimonialValidationErrors } {
  const errors: TestimonialValidationErrors = {};
  const msg = {
    en: {
      clientName: 'Please enter your name (at least 2 characters).',
      clientLocation: 'Please enter your city or town in Morocco (e.g., Taroudant).',
      productPurchased: 'Please specify the farm product or livestock purchased.',
      quote: 'Please share a review of at least 12 characters.',
    },
    fr: {
      clientName: 'Veuillez saisir votre nom (au moins 2 caractères).',
      clientLocation: 'Veuillez indiquer votre ville ou localité (ex. Taroudant).',
      productPurchased: 'Veuillez préciser le produit ou le bétail acheté.',
      quote: 'Veuillez partager un avis d’au moins 12 caractères.',
    },
    ar: {
      clientName: 'يرجى إدخال الاسم الكامل (حرفان على الأقل).',
      clientLocation: 'يرجى تحديد المدينة أو المنطقة (مثال: تارودانت).',
      productPurchased: 'يرجى تحديد المنتج أو الماشية التي تم اقتناؤها.',
      quote: 'يرجى كتابة تقييم لا يقل عن 12 حرفاً.',
    },
  }[language];

  if (!input.clientName || input.clientName.trim().length < 2) {
    errors.clientName = msg.clientName;
  }
  if (!input.clientLocation || input.clientLocation.trim().length < 2) {
    errors.clientLocation = msg.clientLocation;
  }
  if (!input.productPurchased || input.productPurchased.trim().length < 2) {
    errors.productPurchased = msg.productPurchased;
  }
  if (!input.quote || input.quote.trim().length < 12) {
    errors.quote = msg.quote;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

