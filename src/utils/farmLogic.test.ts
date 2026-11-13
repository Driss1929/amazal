import test from 'node:test';
import assert from 'node:assert/strict';
import {
  sanitizeWhatsAppPhone,
  buildWhatsAppInquiryUrl,
  validateContactForm,
  filterProducts,
  sortProducts,
  filterAndSortProducts,
  calculateMilkBalance,
  buildGoogleMapsEmbedUrl,
  filterTestimonials,
  validateTestimonialInput,
  type ProductItem,
  type TestimonialItem,
} from './farmLogic';

const sampleProducts: ProductItem[] = [
  {
    id: 'milk',
    category: 'dairy',
    name: { en: 'Fresh Cow Milk', fr: 'Lait de vache frais', ar: 'حليب البقر الطري' },
    shortDescription: { en: 'Daily morning milking', fr: 'Traite du matin', ar: 'حليب الصباح' },
    unitOrBreedNote: { en: 'Raw farm milk', fr: 'Lait cru', ar: 'حليب طبيعي' },
    availability: 'available_daily',
    priceDisplay: { en: '8 MAD / L (Ref.)', fr: '8 MAD / L', ar: '8 درهم / لتر' },
    referencePriceMad: 8,
    whatsappTopic: { en: 'fresh milk', fr: 'lait frais', ar: 'الحليب الطري' },
    imagePath: '/test.jpg',
  },
  {
    id: 'sheep',
    category: 'livestock',
    name: { en: 'Moroccan Sheep', fr: 'Moutons marocains', ar: 'الأغنام المغربية' },
    shortDescription: { en: 'Raised on pasture', fr: 'Élevés au pâturage', ar: 'تربية طبيعية' },
    unitOrBreedNote: { en: 'Sardi & local breeds', fr: 'Sardi et races locales', ar: 'سلالة السردي' },
    availability: 'upon_inquiry',
    priceDisplay: { en: '2,800 MAD (Ref.)', fr: '2 800 MAD', ar: '2800 درهم' },
    referencePriceMad: 2800,
    whatsappTopic: { en: 'sheep', fr: 'moutons', ar: 'الأغنام' },
    imagePath: '/sheep.jpg',
  },
  {
    id: 'calves',
    category: 'livestock',
    name: { en: 'Calves', fr: 'Veaux', ar: 'العجول الصغيرة' },
    shortDescription: { en: 'Young farm calves', fr: 'Jeunes veaux', ar: 'عجول الضيعة' },
    unitOrBreedNote: { en: 'Farm raised', fr: 'Élevés à la ferme', ar: 'مواليد الضيعة' },
    availability: 'upon_inquiry',
    priceDisplay: { en: '8,500 MAD (Ref.)', fr: '8 500 MAD', ar: '8500 درهم' },
    referencePriceMad: 8500,
    whatsappTopic: { en: 'calves', fr: 'veaux', ar: 'العجول' },
    imagePath: '/calves.jpg',
  },
];

test('sanitizeWhatsAppPhone converts Moroccan local and international formats cleanly', () => {
  assert.equal(sanitizeWhatsAppPhone('+212655607035'), '212655607035');
  assert.equal(sanitizeWhatsAppPhone('+212 6 55-60-70-35'), '212655607035');
  assert.equal(sanitizeWhatsAppPhone('0655607035'), '212655607035');
  assert.equal(sanitizeWhatsAppPhone('00212655607035'), '212655607035');
  assert.equal(sanitizeWhatsAppPhone(''), '212655607035');
});

test('buildWhatsAppInquiryUrl creates localized pre-filled messages for products and default widget', () => {
  const defaultEnUrl = buildWhatsAppInquiryUrl({
    phone: '+212655607035',
    language: 'en',
  });
  assert.ok(
    decodeURIComponent(defaultEnUrl).includes(
      "Hello, I'm interested in Atlas Farm Taroudant products. Can you help me?"
    )
  );

  const enUrl = buildWhatsAppInquiryUrl({
    phone: '+212655607035',
    productName: 'fresh milk',
    language: 'en',
  });
  assert.ok(enUrl.startsWith('https://wa.me/212655607035?text='));
  assert.ok(
    decodeURIComponent(enUrl).includes(
      'Hello, I am interested in your fresh milk. Could you please provide more information?'
    )
  );
});

test('validateContactForm rejects empty or malformed fields and passes valid submission', () => {
  const invalidResult = validateContactForm(
    {
      fullName: 'A',
      phone: '123',
      email: 'not-an-email',
      interest: '',
      message: 'short',
    },
    'en'
  );
  assert.equal(invalidResult.valid, false);

  const validResult = validateContactForm(
    {
      fullName: 'Youssef Ait Brahim',
      phone: '+212 6 61 23 45 67',
      email: 'youssef@example.ma',
      interest: 'Fresh Cow Milk',
      message: 'I would like to inquire about daily fresh cow milk delivery in Taroudant.',
    },
    'en'
  );
  assert.equal(validResult.valid, true);
  assert.deepEqual(validResult.errors, {});
});

test('filterProducts filters by category and localized search query', () => {
  assert.equal(filterProducts(sampleProducts, 'all', '', 'en').length, 3);
  assert.equal(filterProducts(sampleProducts, 'dairy', '', 'en').length, 1);
  assert.equal(filterProducts(sampleProducts, 'livestock', '', 'en').length, 2);
  assert.equal(filterProducts(sampleProducts, 'all', 'Sardi', 'en').length, 1);
  assert.equal(filterProducts(sampleProducts, 'all', 'السردي', 'ar').length, 1);
});

test('sortProducts and filterAndSortProducts sort by name (A-Z, Z-A) and price (low-high, high-low)', () => {
  const byNameAsc = sortProducts(sampleProducts, 'name_asc', 'en');
  assert.deepEqual(
    byNameAsc.map((p) => p.id),
    ['calves', 'milk', 'sheep']
  );

  const byNameDesc = sortProducts(sampleProducts, 'name_desc', 'en');
  assert.deepEqual(
    byNameDesc.map((p) => p.id),
    ['sheep', 'milk', 'calves']
  );

  const byPriceAsc = sortProducts(sampleProducts, 'price_asc', 'en');
  assert.deepEqual(
    byPriceAsc.map((p) => p.id),
    ['milk', 'sheep', 'calves']
  );

  const byPriceDesc = sortProducts(sampleProducts, 'price_desc', 'en');
  assert.deepEqual(
    byPriceDesc.map((p) => p.id),
    ['calves', 'sheep', 'milk']
  );

  const livestockLowToHigh = filterAndSortProducts(
    sampleProducts,
    'livestock',
    '',
    'price_asc',
    'en'
  );
  assert.deepEqual(
    livestockLowToHigh.map((p) => p.id),
    ['sheep', 'calves']
  );
});

test('calculateMilkBalance computes Opening + Production - Sales - Processing - Losses', () => {
  const balance = calculateMilkBalance({
    openingStockLiters: 120,
    producedLiters: 450,
    soldLiters: 310,
    processedLiters: 80,
    lossLiters: 5,
  });
  assert.equal(balance, 175);
});

test('buildGoogleMapsEmbedUrl constructs valid embed URL with language and query', () => {
  const embed = buildGoogleMapsEmbedUrl('Taroudant, Morocco', 'fr');
  assert.equal(
    embed,
    'https://www.google.com/maps?q=Taroudant%2C%20Morocco&hl=fr&z=12&output=embed'
  );
});

test('filterTestimonials and validateTestimonialInput handle multi-language reviews cleanly', () => {
  const sampleReviews: TestimonialItem[] = [
    {
      id: 'rev-1',
      category: 'dairy',
      clientName: { en: 'Hassan B.', fr: 'Hassan B.', ar: 'حسن ب.' },
      clientRole: { en: 'Family Customer', fr: 'Client Familial', ar: 'زبون عائلي' },
      clientLocation: { en: 'Taroudant', fr: 'Taroudant', ar: 'تارودانت' },
      productPurchased: { en: 'Fresh Cow Milk', fr: 'Lait de Vache Frais', ar: 'حليب البقر الطري' },
      quote: { en: 'Very fresh milk.', fr: 'Lait très frais.', ar: 'حليب طري جداً.' },
      rating: 5,
      dateLabel: { en: 'Taroudant Client', fr: 'Client Taroudant', ar: 'زبون بتارودانت' },
    },
    {
      id: 'rev-2',
      category: 'livestock',
      clientName: { en: 'Brahim A.', fr: 'Brahim A.', ar: 'إبراهيم أ.' },
      clientRole: { en: 'Livestock Breeder', fr: 'Éleveur', ar: 'مربي ماشية' },
      clientLocation: { en: 'Ouled Teima', fr: 'Ouled Teïma', ar: 'أولاد تايمة' },
      productPurchased: { en: 'Dairy Cows', fr: 'Vaches Laitières', ar: 'الأبقار الحلوب' },
      quote: { en: 'Healthy cattle.', fr: 'Bétail sain.', ar: 'ماشية بصحة ممتازة.' },
      rating: 5,
      dateLabel: { en: 'Souss Breeder', fr: 'Éleveur Souss', ar: 'كساب بسوس' },
    },
  ];

  assert.equal(filterTestimonials(sampleReviews, 'all').length, 2);
  assert.equal(filterTestimonials(sampleReviews, 'dairy').length, 1);
  assert.equal(filterTestimonials(sampleReviews, 'livestock').length, 1);
  assert.equal(filterTestimonials(sampleReviews, 'farm_goods').length, 0);

  const invalidReview = validateTestimonialInput(
    {
      clientName: 'A',
      clientLocation: '',
      category: 'dairy',
      productPurchased: '',
      quote: 'Too short',
      rating: 5,
    },
    'en'
  );
  assert.equal(invalidReview.valid, false);

  const validReview = validateTestimonialInput(
    {
      clientName: 'Fatima Zahra',
      clientLocation: 'Taroudant',
      category: 'dairy',
      productPurchased: 'Fresh Cow Milk & Farm Butter',
      quote: 'The morning milk and traditional butter are always fresh and clean.',
      rating: 5,
    },
    'en'
  );
  assert.equal(validReview.valid, true);
});

