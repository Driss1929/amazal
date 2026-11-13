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

// ============================================================================
// Livestock Marketplace, Online Ordering, Subscriptions, ERP & AI Logic
// ============================================================================

export type LivestockSpecies = 'cattle' | 'calves' | 'sheep' | 'goats';

export interface LivestockListing {
  id: string;
  animalCode: string;
  species: LivestockSpecies;
  name: LocalizedText;
  breed: LocalizedText;
  ageMonths: number;
  gender: 'female' | 'male';
  weightKg: number;
  healthAndVaccination: LocalizedText;
  milkYieldLitersPerDay?: number;
  priceMad: number;
  negotiable: boolean;
  eidSpecial?: boolean;
  available: boolean;
  imagePath: string;
  lastVetCheckDate: string;
  nextVaccineNote: LocalizedText;
}

export type DeliveryZoneId =
  | 'pickup_farm'
  | 'taroudant_center'
  | 'ait_iazza_freija'
  | 'ouled_teima'
  | 'agadir_souss';

export interface DeliveryZone {
  id: DeliveryZoneId;
  name: LocalizedText;
  distanceKm: number;
  feeMad: number;
  estimatedWindow: LocalizedText;
}

export const TAROUDANT_DELIVERY_ZONES: DeliveryZone[] = [
  {
    id: 'pickup_farm',
    name: {
      en: 'Direct Farm Pickup (Taroudant)',
      fr: 'Retrait Direct à la Ferme (Taroudant)',
      ar: 'استلام مباشر من الضيعة (تارودانت)',
    },
    distanceKm: 0,
    feeMad: 0,
    estimatedWindow: {
      en: 'Same Day · Morning or Afternoon Milking',
      fr: 'Le Jour Même · Traite du Matin ou du Soir',
      ar: 'نفس اليوم · فترة الصباح أو المساء',
    },
  },
  {
    id: 'taroudant_center',
    name: {
      en: 'Taroudant Center & Medina',
      fr: 'Centre de Taroudant & Médina',
      ar: 'وسط مدينة تارودانت والمدينة القديمة',
    },
    distanceKm: 6,
    feeMad: 10,
    estimatedWindow: {
      en: 'Daily Morning Delivery (7:30 AM – 10:30 AM)',
      fr: 'Livraison Matinale Quotidienne (07h30 – 10h30)',
      ar: 'توصيل صباحي يومي (07:30 – 10:30)',
    },
  },
  {
    id: 'ait_iazza_freija',
    name: {
      en: 'Ait Iazza, Freija & Nearby Douars',
      fr: 'Aït Iazza, Freija & Douars Voisins',
      ar: 'أيت إعزة، فريجة والدواوير المجاورة',
    },
    distanceKm: 15,
    feeMad: 15,
    estimatedWindow: {
      en: 'Daily Morning Route (8:00 AM – 11:30 AM)',
      fr: 'Tournée Matinale (08h00 – 11h30)',
      ar: 'جولة التوصيل الصباحية (08:00 – 11:30)',
    },
  },
  {
    id: 'ouled_teima',
    name: {
      en: 'Ouled Teima & Houara Corridor',
      fr: 'Ouled Teïma & Axe Houara',
      ar: 'أولاد تايمة ومحور هوارة',
    },
    distanceKm: 38,
    feeMad: 25,
    estimatedWindow: {
      en: 'Scheduled Route (Tue / Thu / Sat / Sun)',
      fr: 'Tournée Programmée (Mar / Jeu / Sam / Dim)',
      ar: 'رحلات مجدولة (الثلاثاء / الخميس / السبت / الأحد)',
    },
  },
  {
    id: 'agadir_souss',
    name: {
      en: 'Greater Agadir & Souss Bulk Route',
      fr: 'Grand Agadir & Axe Souss (Commandes Groupées)',
      ar: 'أكادير الكبير وسهل سوس (طلبات مجمعة)',
    },
    distanceKm: 82,
    feeMad: 45,
    estimatedWindow: {
      en: 'Refrigerated Van Route (Wed & Sat)',
      fr: 'Transport Réfrigéré (Mercredi & Samedi)',
      ar: 'نقل مبرد (الأربعاء والسبت)',
    },
  },
];

export type SubscriptionPlanId = 'family' | 'large_family' | 'restaurant' | 'business_custom';

export interface MilkSubscriptionPlan {
  id: SubscriptionPlanId;
  title: LocalizedText;
  audience: LocalizedText;
  dailyLiters: number;
  pricePerLiterMad: number;
  discountPercent: number;
}

export const MILK_SUBSCRIPTION_PLANS: MilkSubscriptionPlan[] = [
  {
    id: 'family',
    title: {
      en: 'Family Plan',
      fr: 'Forfait Famille',
      ar: 'باقة الأسرة',
    },
    audience: {
      en: '1 Litre Fresh Cow Milk Daily (30 L / month)',
      fr: '1 Litre de Lait Frais par Jour (30 L / mois)',
      ar: '1 لتر حليب بقر طري يومياً (30 لتر / شهر)',
    },
    dailyLiters: 1,
    pricePerLiterMad: 8,
    discountPercent: 5,
  },
  {
    id: 'large_family',
    title: {
      en: 'Large Family Plan',
      fr: 'Forfait Grande Famille',
      ar: 'باقة العائلة الكبيرة',
    },
    audience: {
      en: '2 Litres Fresh Cow Milk Daily (60 L / month)',
      fr: '2 Litres de Lait Frais par Jour (60 L / mois)',
      ar: '2 لتر حليب بقر طري يومياً (60 لتر / شهر)',
    },
    dailyLiters: 2,
    pricePerLiterMad: 8,
    discountPercent: 8,
  },
  {
    id: 'restaurant',
    title: {
      en: 'Restaurant & Café Plan',
      fr: 'Forfait Restaurant & Café',
      ar: 'باقة المطاعم والمقاهي',
    },
    audience: {
      en: '10 Litres Fresh Cow Milk Daily (300 L / month)',
      fr: '10 Litres de Lait Frais par Jour (300 L / mois)',
      ar: '10 لترات حليب طري يومياً (300 لتر / شهر)',
    },
    dailyLiters: 10,
    pricePerLiterMad: 7.5,
    discountPercent: 10,
  },
  {
    id: 'business_custom',
    title: {
      en: 'Business & Distributor Custom',
      fr: 'Forfait Professionnel Sur Mesure',
      ar: 'باقة المهنيين والموزعين (كميات مخصصة)',
    },
    audience: {
      en: 'Custom Daily Volume (20+ Litres Daily)',
      fr: 'Volume Quotidien Personnalisé (20+ Litres / jour)',
      ar: 'كميات يومية مخصصة (20 لتر فما فوق يومياً)',
    },
    dailyLiters: 25,
    pricePerLiterMad: 7,
    discountPercent: 12,
  },
];

export type OrderStatus =
  | 'confirmed'
  | 'preparing_milking'
  | 'out_for_delivery'
  | 'delivered';

export interface CustomerOrderRecord {
  id: string;
  trackingCode: string;
  customerName: string;
  customerPhone: string;
  productTitle: string;
  quantity: number;
  unitLabel: string;
  unitPriceMad: number;
  deliveryZoneId: DeliveryZoneId;
  deliveryDate: string;
  paymentMethod: 'cod';
  referralCodeUsed?: string;
  subtotalMad: number;
  discountMad: number;
  deliveryFeeMad: number;
  totalMad: number;
  loyaltyPointsEarned: number;
  status: OrderStatus;
  assignedDriver: string;
  createdAt: string;
}

/**
 * Calculates order totals including Taroudant delivery zone fee, referral/loyalty discount, and earned loyalty points.
 */
export function calculateOrderSummary(params: {
  quantity: number;
  unitPriceMad: number;
  deliveryZoneId: DeliveryZoneId;
  hasReferralCode: boolean;
}): {
  subtotalMad: number;
  discountMad: number;
  deliveryFeeMad: number;
  totalMad: number;
  loyaltyPointsEarned: number;
} {
  const cleanQty = Math.max(1, Math.round(params.quantity));
  const subtotalMad = Math.round(cleanQty * params.unitPriceMad * 100) / 100;
  const discountMad = params.hasReferralCode
    ? Math.round(subtotalMad * 0.05 * 100) / 100
    : 0;
  const zone = TAROUDANT_DELIVERY_ZONES.find(
    (z) => z.id === params.deliveryZoneId
  );
  const deliveryFeeMad = zone ? zone.feeMad : 0;
  const totalMad =
    Math.round((subtotalMad - discountMad + deliveryFeeMad) * 100) / 100;
  const loyaltyPointsEarned = Math.max(1, Math.floor(totalMad / 10));

  return {
    subtotalMad,
    discountMad,
    deliveryFeeMad,
    totalMad,
    loyaltyPointsEarned,
  };
}

/**
 * Calculates monthly subscription cost for fresh milk delivery.
 */
export function calculateSubscriptionMonthlySummary(params: {
  dailyLiters: number;
  pricePerLiterMad: number;
  discountPercent: number;
  daysPerMonth?: number;
}): {
  monthlyLiters: number;
  grossMonthlyMad: number;
  netMonthlyMad: number;
  monthlySavingsMad: number;
} {
  const days = params.daysPerMonth ?? 30;
  const monthlyLiters = Math.max(1, params.dailyLiters) * days;
  const grossMonthlyMad =
    Math.round(monthlyLiters * params.pricePerLiterMad * 100) / 100;
  const savings =
    Math.round(grossMonthlyMad * (params.discountPercent / 100) * 100) / 100;
  const netMonthlyMad = Math.round((grossMonthlyMad - savings) * 100) / 100;

  return {
    monthlyLiters,
    grossMonthlyMad,
    netMonthlyMad,
    monthlySavingsMad: savings,
  };
}

export interface FarmFinancialSnapshotInput {
  monthlyMilkLitersProduced: number;
  monthlyMilkLitersSold: number;
  milkSellingPricePerLiterMad: number;
  activeDairyCowsCount: number;
  monthlyFeedExpenseMad: number;
  monthlyLaborAndVetExpenseMad: number;
  monthlyUtilitiesAndWaterMad: number;
  monthlyLivestockSalesRevenueMad: number;
  monthlyLivestockCostMad: number;
  monthlyCropsAndHoneyRevenueMad: number;
  monthlyCropsCostMad: number;
}

export interface FarmFinancialAnalyticsResult {
  costPerLiterMilkMad: number;
  dairyMonthlyRevenueMad: number;
  dairyMonthlyOperatingCostMad: number;
  dairyNetProfitMad: number;
  revenuePerDairyCowMad: number;
  livestockNetProfitMad: number;
  cropsNetProfitMad: number;
  totalMonthlyRevenueMad: number;
  totalMonthlyCostMad: number;
  totalMonthlyNetProfitMad: number;
  mostProfitableCategory: 'dairy' | 'livestock' | 'farm_goods';
}

/**
 * Calculates farm financial analytics:
 * - Cost of producing 1 litre of milk
 * - Revenue per dairy animal
 * - Monthly operating costs & feed share
 * - Profitability by product category (Dairy, Livestock, Farm Products)
 */
export function calculateFarmFinancialAnalytics(
  input: FarmFinancialSnapshotInput
): FarmFinancialAnalyticsResult {
  const dairyOperatingCost =
    input.monthlyFeedExpenseMad +
    input.monthlyLaborAndVetExpenseMad +
    input.monthlyUtilitiesAndWaterMad;

  const safeProduced = Math.max(1, input.monthlyMilkLitersProduced);
  const costPerLiterMilkMad =
    Math.round((dairyOperatingCost / safeProduced) * 100) / 100;

  const dairyMonthlyRevenueMad =
    Math.round(
      input.monthlyMilkLitersSold * input.milkSellingPricePerLiterMad * 100
    ) / 100;

  const dairyNetProfitMad =
    Math.round((dairyMonthlyRevenueMad - dairyOperatingCost) * 100) / 100;

  const safeCows = Math.max(1, input.activeDairyCowsCount);
  const revenuePerDairyCowMad =
    Math.round((dairyMonthlyRevenueMad / safeCows) * 100) / 100;

  const livestockNetProfitMad =
    Math.round(
      (input.monthlyLivestockSalesRevenueMad - input.monthlyLivestockCostMad) *
        100
    ) / 100;

  const cropsNetProfitMad =
    Math.round(
      (input.monthlyCropsAndHoneyRevenueMad - input.monthlyCropsCostMad) * 100
    ) / 100;

  const totalMonthlyRevenueMad =
    dairyMonthlyRevenueMad +
    input.monthlyLivestockSalesRevenueMad +
    input.monthlyCropsAndHoneyRevenueMad;

  const totalMonthlyCostMad =
    dairyOperatingCost +
    input.monthlyLivestockCostMad +
    input.monthlyCropsCostMad;

  const totalMonthlyNetProfitMad =
    Math.round((totalMonthlyRevenueMad - totalMonthlyCostMad) * 100) / 100;

  let mostProfitableCategory: 'dairy' | 'livestock' | 'farm_goods' = 'dairy';
  if (
    livestockNetProfitMad >= dairyNetProfitMad &&
    livestockNetProfitMad >= cropsNetProfitMad
  ) {
    mostProfitableCategory = 'livestock';
  } else if (
    cropsNetProfitMad > dairyNetProfitMad &&
    cropsNetProfitMad > livestockNetProfitMad
  ) {
    mostProfitableCategory = 'farm_goods';
  }

  return {
    costPerLiterMilkMad,
    dairyMonthlyRevenueMad,
    dairyMonthlyOperatingCostMad: dairyOperatingCost,
    dairyNetProfitMad,
    revenuePerDairyCowMad,
    livestockNetProfitMad,
    cropsNetProfitMad,
    totalMonthlyRevenueMad,
    totalMonthlyCostMad,
    totalMonthlyNetProfitMad,
    mostProfitableCategory,
  };
}

/**
 * Generates an instant, data-backed AI Farm Assistant response in EN, FR, or AR
 * using the farm's actual recorded financial, dairy, and livestock metrics.
 */
export function generateSmartFarmAssistantAnswer(params: {
  question: string;
  language: Language;
  financials: FarmFinancialSnapshotInput;
  analytics: FarmFinancialAnalyticsResult;
  livestockCount: number;
}): string {
  const q = params.question.toLowerCase();
  const { financials, analytics, language, livestockCount } = params;

  const isForecastQuery =
    q.includes('forecast') ||
    q.includes('demand') ||
    q.includes('next') ||
    q.includes('prévision') ||
    q.includes('demande') ||
    q.includes('توقع') ||
    q.includes('الطلب');

  const isHealthOrHerdQuery =
    q.includes('animal') ||
    q.includes('vet') ||
    q.includes('vaccine') ||
    q.includes('cow') ||
    q.includes('vache') ||
    q.includes('santé') ||
    q.includes('بقرة') ||
    q.includes('تلقيح') ||
    q.includes('قطيع');

  if (isForecastQuery) {
    const projectedNextMonthLiters = Math.round(
      financials.monthlyMilkLitersSold * 1.08
    );
    const projectedRevenueMad = Math.round(
      projectedNextMonthLiters * financials.milkSellingPricePerLiterMad
    );
    if (language === 'fr') {
      return `Prévision de Demande (30 prochains jours) : Sur la base de vos ventes actuelles (${financials.monthlyMilkLitersSold.toLocaleString()} L/mois) et des abonnements familiaux/restaurants à Taroudant, la demande prévue est d'environ ${projectedNextMonthLiters.toLocaleString()} L (+8%), soit un revenu laitier estimé à ${projectedRevenueMad.toLocaleString()} MAD. Conseil : maintenez un stock tampon de luzerne verte pour soutenir la traite matinale.`;
    }
    if (language === 'ar') {
      return `توقعات الطلب (الـ 30 يوماً القادمة): بناءً على مبيعات الحليب المسجلة حالياً (${financials.monthlyMilkLitersSold.toLocaleString()} لتر/شهر) واشتراكات الأسر والمطاعم بتارودانت، يُتوقع ارتفاع الطلب بنسبة 8% ليصل إلى حوالي ${projectedNextMonthLiters.toLocaleString()} لتر، بعائد تقديري يبلغ ${projectedRevenueMad.toLocaleString()} درهم.`;
    }
    return `Demand & Sales Forecast (Next 30 Days): Based on your recorded monthly milk sales (${financials.monthlyMilkLitersSold.toLocaleString()} L) and active Taroudant family/restaurant subscriptions, projected demand is ${projectedNextMonthLiters.toLocaleString()} L (+8%), generating an estimated ${projectedRevenueMad.toLocaleString()} MAD in dairy revenue.`;
  }

  if (isHealthOrHerdQuery) {
    if (language === 'fr') {
      return `Suivi du Troupeau & Santé Animale : Vous avez ${livestockCount} lots/animaux suivis au catalogue et ${financials.activeDairyCowsCount} vaches laitières en production. Le revenu moyen par vache laitière est de ${analytics.revenuePerDairyCowMad.toLocaleString()} MAD/mois. Tous les passeports numériques (vaccinations entérotoxémie, fièvre aphteuse et contrôle vétérinaire) sont à jour.`;
    }
    if (language === 'ar') {
      return `تقرير صحة القطيع والأبقار الحلوب: يضم السجل الرقمي ${livestockCount} عروض ماشية موثقة و${financials.activeDairyCowsCount} بقرة حلوب منتجة. يبلغ متوسط العائد لكل بقرة حلوب ${analytics.revenuePerDairyCowMad.toLocaleString()} درهم شهرياً، وجميع سجلات التلقيح والفحص البيطري محدثة.`;
    }
    return `Herd & Animal Health Report: You have ${livestockCount} tracked livestock listings and ${financials.activeDairyCowsCount} active dairy cows in production. Average revenue per dairy cow is ${analytics.revenuePerDairyCowMad.toLocaleString()} MAD/month, and all digital animal health passports and vaccination schedules are up to date.`;
  }

  // Default: Milk sales, cost per liter, and monthly profit report
  if (language === 'fr') {
    return `Rapport Mensuel Atlas Farm Taroudant : Ce mois-ci, la ferme a vendu ${financials.monthlyMilkLitersSold.toLocaleString()} litres de lait frais (sur ${financials.monthlyMilkLitersProduced.toLocaleString()} L produits) pour un chiffre d'affaires laitier de ${analytics.dairyMonthlyRevenueMad.toLocaleString()} MAD. Le coût de production est de ${analytics.costPerLiterMilkMad} MAD/L. Le bénéfice net global de la ferme (Lait + Bétail + Terroir) s'élève à ${analytics.totalMonthlyNetProfitMad.toLocaleString()} MAD (chiffre d'affaires total : ${analytics.totalMonthlyRevenueMad.toLocaleString()} MAD).`;
  }
  if (language === 'ar') {
    return `التقرير المالي الشهري لضيعة أطلس تارودانت: قمنا هذا الشهر ببيع ${financials.monthlyMilkLitersSold.toLocaleString()} لتر من الحليب الطري (من أصل ${financials.monthlyMilkLitersProduced.toLocaleString()} لتر منتجة) بعائد حليب قدره ${analytics.dairyMonthlyRevenueMad.toLocaleString()} درهم. تبلغ تكلفة إنتاج اللتر الواحد ${analytics.costPerLiterMilkMad} درهم/لتر، وبلغ صافي الربح الإجمالي للضيعة (الحليب + الماشية + المحاصيل) ${analytics.totalMonthlyNetProfitMad.toLocaleString()} درهم من إجمالي مداخيل ${analytics.totalMonthlyRevenueMad.toLocaleString()} درهم.`;
  }
  return `Monthly Performance Report — Atlas Farm Taroudant: This month, we sold ${financials.monthlyMilkLitersSold.toLocaleString()} litres of fresh milk (out of ${financials.monthlyMilkLitersProduced.toLocaleString()} L produced), generating ${analytics.dairyMonthlyRevenueMad.toLocaleString()} MAD in dairy revenue. Your unit production cost is ${analytics.costPerLiterMilkMad} MAD/litre (dairy net profit: ${analytics.dairyNetProfitMad.toLocaleString()} MAD). Across all farm categories (Dairy, Livestock & Seasonal Harvest), total monthly revenue is ${analytics.totalMonthlyRevenueMad.toLocaleString()} MAD with a net profit of ${analytics.totalMonthlyNetProfitMad.toLocaleString()} MAD.`;
}

// ============================================================================
// Seasonal Products Calendar Data & Pure Filtering Logic
// ============================================================================

export type AgriculturalSeason = 'spring' | 'summer' | 'autumn' | 'winter';

export type MonthNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type MonthlyAvailabilityStatus = 'peak' | 'available' | 'limited';

export interface SeasonalCalendarItem {
  id: string;
  category: ProductCategory;
  name: LocalizedText;
  varietyNote: LocalizedText;
  harvestWindowLabel: LocalizedText;
  statusBadge: LocalizedText;
  indicativePrice: LocalizedText;
  seasons: AgriculturalSeason[];
  peakMonths: MonthNumber[];
  availableMonths: MonthNumber[];
}

export const INITIAL_SEASONAL_CALENDAR_ITEMS: SeasonalCalendarItem[] = [
  {
    id: 'cal-raw-milk',
    category: 'dairy',
    name: {
      en: 'Morning Raw Cow Milk (Spring Pasture Peak)',
      fr: 'Lait de Vache Cru du Matin (Pic de Printemps)',
      ar: 'حليب البقر الطري الصباحي (ذروة المراعي الربيعية)',
    },
    varietyNote: {
      en: 'Produced daily year-round; highest natural cream & beta-carotene during spring green alfalfa.',
      fr: 'Produit toute l’année ; richesse maximale en crème au printemps grâce à la luzerne fraîche.',
      ar: 'متوفر يومياً طيلة السنة، ويكون أغنى بالقشدة الطبيعية في فصل الربيع بفضل الفصة الخضراء.',
    },
    harvestWindowLabel: {
      en: 'Daily Year-Round · Peak Cream Mar – Jun',
      fr: 'Quotidien Toute l’Année · Pic Mars – Juin',
      ar: 'يومياً طيلة السنة · الذروة من مارس إلى يونيو',
    },
    statusBadge: {
      en: 'Available Daily',
      fr: 'Disponible Chaque Jour',
      ar: 'متوفر يومياً',
    },
    indicativePrice: {
      en: '8 MAD / Litre',
      fr: '8 MAD / Litre',
      ar: '8 درهم / لتر',
    },
    seasons: ['spring', 'summer', 'autumn', 'winter'],
    peakMonths: [3, 4, 5, 6],
    availableMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: 'cal-lben-zebda',
    category: 'dairy',
    name: {
      en: 'Traditional Lben Beldi & Zebda Beldia (Farm Butter)',
      fr: 'Lben Beldi & Zebda Beldia (Beurre Fermier)',
      ar: 'اللبن البلدي والزبدة البلدية السوسية',
    },
    varietyNote: {
      en: 'Churned every morning; chilled Lben peaks in summer & Ramadan, while rich butter peaks in winter/spring.',
      fr: 'Baratté chaque matin ; très prisé pour le couscous du vendredi, le Ramadan et les chaleurs d’été.',
      ar: 'يُمخض كل صباح على الطريقة التقليدية؛ مثالي للكسكس وموائد رمضان وأيام الصيف الحارة.',
    },
    harvestWindowLabel: {
      en: 'Year-Round · High Demand Mar – Aug',
      fr: 'Toute l’Année · Forte Demande Mars – Août',
      ar: 'طيلة السنة · طلب مرتفع من مارس إلى غشت',
    },
    statusBadge: {
      en: 'Fresh Morning Batch',
      fr: 'Cuvée Fraîche du Matin',
      ar: 'دفعة صباحية طازجة',
    },
    indicativePrice: {
      en: '12 MAD/L (Lben) · 55 MAD/500g (Butter)',
      fr: '12 MAD/L (Lben) · 55 MAD/500g (Beurre)',
      ar: '12 درهم/لتر (لبن) · 55 درهم/500غ (زبدة)',
    },
    seasons: ['spring', 'summer', 'autumn', 'winter'],
    peakMonths: [3, 4, 5, 7, 8, 12, 1],
    availableMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: 'cal-orange-honey',
    category: 'farm_goods',
    name: {
      en: 'Souss Orange Blossom Honey (Zhar)',
      fr: 'Miel de Fleur d’Oranger du Souss',
      ar: 'عسل زهر البرتقال الحر (سهل سوس)',
    },
    varietyNote: {
      en: 'Harvested in late spring when Taroudant citrus orchards are in full fragrant bloom.',
      fr: 'Récolté à la fin du printemps lors de la floraison parfumée des orangers de Taroudant.',
      ar: 'يُجنى في أواخر الربيع عند تفتح أزهار البرتقال والحوامض في بساتين تارودانت.',
    },
    harvestWindowLabel: {
      en: 'Spring Harvest · Apr – Jun',
      fr: 'Récolte de Printemps · Avr – Juin',
      ar: 'موسم الربيع · أبريل – يونيو',
    },
    statusBadge: {
      en: 'Spring Seasonal',
      fr: 'Saisonnier Printemps',
      ar: 'موسمي ربيعي',
    },
    indicativePrice: {
      en: '160 MAD / kg',
      fr: '160 MAD / kg',
      ar: '160 درهم / كلغ',
    },
    seasons: ['spring', 'summer'],
    peakMonths: [4, 5],
    availableMonths: [4, 5, 6, 7],
  },
  {
    id: 'cal-sardi-sheep',
    category: 'livestock',
    name: {
      en: 'Sardi & Timahdite Pasture Sheep & Rams',
      fr: 'Moutons Sardi & Timahdite de Pâturage',
      ar: 'أكباش وأغنام الصردي وتمحضيت (رعي طبيعي)',
    },
    varietyNote: {
      en: 'Available year-round for family occasions, with numbered Eid Al-Adha selection and farm boarding in summer.',
      fr: 'Disponibles toute l’année, avec sélection numérotée et garde gratuite pour l’Aïd Al-Adha.',
      ar: 'متوفرة طيلة السنة للمناسبات، مع ترقيم خاص ورعاية مجانية بالضيعة لعيد الأضحى المبارك.',
    },
    harvestWindowLabel: {
      en: 'Year-Round · Peak Selection May – Aug',
      fr: 'Toute l’Année · Pic Mai – Août',
      ar: 'طيلة السنة · الذروة من ماي إلى غشت',
    },
    statusBadge: {
      en: 'Direct Farm Selection',
      fr: 'Sélection Directe Ferme',
      ar: 'معاينة مباشرة بالضيعة',
    },
    indicativePrice: {
      en: 'From 2,800 MAD',
      fr: 'À partir de 2 800 MAD',
      ar: 'ابتداءً من 2800 درهم',
    },
    seasons: ['spring', 'summer', 'autumn', 'winter'],
    peakMonths: [5, 6, 7, 8],
    availableMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: 'cal-thyme-honey-figs',
    category: 'farm_goods',
    name: {
      en: 'High Atlas Thyme Honey & Sun-Ripened Souss Figs',
      fr: 'Miel de Thym de l’Atlas & Figues du Souss',
      ar: 'عسل الزعتر الأطلسي والتين السوسي الطري',
    },
    varietyNote: {
      en: 'Summer mountain apiary harvest alongside dawn-picked Taroudant orchard figs.',
      fr: 'Récolte estivale des ruchers de montagne et figues fraîches cueillies à l’aube.',
      ar: 'جني الصيف من مناحل جبال الأطلس الكبير مع التين الطري المقطوف عند الفجر.',
    },
    harvestWindowLabel: {
      en: 'Summer Harvest · Jul – Sep',
      fr: 'Récolte d’Été · Juil – Sep',
      ar: 'موسم الصيف · يوليوز – شتنبر',
    },
    statusBadge: {
      en: 'Summer Limited Batch',
      fr: 'Récolte Limitée d’Été',
      ar: 'إنتاج صيفي محدود',
    },
    indicativePrice: {
      en: '220 MAD / kg (Honey)',
      fr: '220 MAD / kg (Miel)',
      ar: '220 درهم / كلغ (عسل)',
    },
    seasons: ['summer', 'autumn'],
    peakMonths: [7, 8],
    availableMonths: [6, 7, 8, 9],
  },
  {
    id: 'cal-olive-oil-almonds',
    category: 'farm_goods',
    name: {
      en: 'First Cold-Pressed Extra Virgin Olive Oil & Atlas Almonds',
      fr: 'Huile d’Olive Vierge Extra Nouvelle & Amandes',
      ar: 'زيت الزيتون البكر الممتاز (العصرة الأولى) واللوز البلدي',
    },
    varietyNote: {
      en: 'Picholine Marocaine olives hand-picked in Taroudant groves in October–November and cold-pressed immediately.',
      fr: 'Olives Picholine Marocaine récoltées à la main en octobre-novembre et pressées à froid.',
      ar: 'زيتون مغربي أصيل يُجنى يدوياً في بساتين تارودانت خلال أكتوبر ونونبر ويُعصر على البارد.',
    },
    harvestWindowLabel: {
      en: 'Autumn Press · Sep – Dec',
      fr: 'Pressée d’Automne · Sep – Déc',
      ar: 'موسم الخريف · شتنبر – دجنبر',
    },
    statusBadge: {
      en: 'Autumn Harvest',
      fr: 'Récolte d’Automne',
      ar: 'محصول الخريف',
    },
    indicativePrice: {
      en: '95 MAD / Litre',
      fr: '95 MAD / Litre',
      ar: '95 درهم / لتر',
    },
    seasons: ['autumn', 'winter'],
    peakMonths: [10, 11],
    availableMonths: [9, 10, 11, 12, 1, 2],
  },
  {
    id: 'cal-weaned-calves-cattle',
    category: 'livestock',
    name: {
      en: 'Dairy Cows, Weaned Heifer Calves & Fattening Bulls',
      fr: 'Vaches Laitières, Génisses Sevrées & Taurillons',
      ar: 'الأبقار الحلوب، العجول المفطومة وعجول التسمين',
    },
    varietyNote: {
      en: 'Spring and autumn calving cohorts raised on farm colostrum, green alfalfa, and barley with full vet passports.',
      fr: 'Cohortes de printemps et d’automne élevées au lait maternel et à la luzerne verte avec suivi vétérinaire.',
      ar: 'مواليد الربيع والخريف مغذاة على الحليب الطبيعي والفصة الخضراء والشعير مع جواز صحي بيطري.',
    },
    harvestWindowLabel: {
      en: 'Year-Round · Peak Cohorts Mar – May & Oct – Dec',
      fr: 'Toute l’Année · Pics Mars – Mai & Oct – Déc',
      ar: 'طيلة السنة · دفعات الربيع والخريف',
    },
    statusBadge: {
      en: 'Vet Certified Herd',
      fr: 'Troupeau Certifié',
      ar: 'قطيع بمراقبة بيطرية',
    },
    indicativePrice: {
      en: 'From 8,500 MAD (Calves)',
      fr: 'Dès 8 500 MAD (Veaux)',
      ar: 'ابتداءً من 8500 درهم',
    },
    seasons: ['spring', 'summer', 'autumn', 'winter'],
    peakMonths: [3, 4, 5, 10, 11],
    availableMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: 'cal-winter-citrus-eggs',
    category: 'farm_goods',
    name: {
      en: 'Taroudant Navel Oranges, Clementines & Free-Range Beldi Eggs',
      fr: 'Oranges Navel de Taroudant, Clémentines & Œufs Beldi',
      ar: 'برتقال نافيل وكليمنتين تارودانت والبيض البلدي الطبيعي',
    },
    varietyNote: {
      en: 'Sweet Souss-Massa citrus ripens from December through February alongside daily free-range country eggs.',
      fr: 'Agrumes doux du Souss récoltés en hiver et œufs fermiers beldi collectés chaque matin.',
      ar: 'حوامض سوس الحلوة تنضج في فصل الشتاء إلى جانب جمع البيض البلدي الطبيعي كل صباح.',
    },
    harvestWindowLabel: {
      en: 'Winter Citrus Peak · Dec – Feb (Eggs Daily)',
      fr: 'Pic Agrumes Déc – Fév (Œufs Quotidien)',
      ar: 'ذروة الحوامض دجنبر – فبراير (البيض يومياً)',
    },
    statusBadge: {
      en: 'Winter Peak',
      fr: 'Pleine Saison Hiver',
      ar: 'ذروة موسم الشتاء',
    },
    indicativePrice: {
      en: '75 MAD / 30 Eggs · Citrus by Crate',
      fr: '75 MAD / 30 Œufs · Agrumes en Caisse',
      ar: '75 درهم / 30 بيضة · الحوامض بالصندوق',
    },
    seasons: ['winter', 'spring'],
    peakMonths: [12, 1, 2],
    availableMonths: [1, 2, 3, 4, 11, 12],
  },
];

/**
 * Pure filter for SeasonalProductsCalendar by season, month (1..12), and product category.
 */
export function filterSeasonalCalendarItems(
  items: SeasonalCalendarItem[],
  params: {
    season: AgriculturalSeason | 'all';
    month: MonthNumber | 'all';
    category: ProductCategory | 'all';
  }
): SeasonalCalendarItem[] {
  return items.filter((item) => {
    if (params.category !== 'all' && item.category !== params.category) {
      return false;
    }
    if (params.season !== 'all' && !item.seasons.includes(params.season)) {
      return false;
    }
    if (
      params.month !== 'all' &&
      !item.availableMonths.includes(params.month)
    ) {
      return false;
    }
    return true;
  });
}



