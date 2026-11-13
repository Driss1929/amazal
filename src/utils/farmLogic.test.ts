import test from 'node:test';
import assert from 'node:assert/strict';
import {
  sanitizeWhatsAppPhone,
  buildWhatsAppInquiryUrl,
  validateContactForm,
  filterProducts,
  buildGoogleMapsEmbedUrl,
  type ProductItem,
} from './farmLogic';

test('sanitizeWhatsAppPhone converts Moroccan local and international formats cleanly', () => {
  assert.equal(sanitizeWhatsAppPhone('+212655607035'), '212655607035');
  assert.equal(sanitizeWhatsAppPhone('+212 6 55-60-70-35'), '212655607035');
  assert.equal(sanitizeWhatsAppPhone('0655607035'), '212655607035');
  assert.equal(sanitizeWhatsAppPhone('00212655607035'), '212655607035');
  assert.equal(sanitizeWhatsAppPhone(''), '212655607035');
});

test('buildWhatsAppInquiryUrl creates localized pre-filled messages for products', () => {
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

  const frUrl = buildWhatsAppInquiryUrl({
    phone: '+212655607035',
    productName: 'Lait de vache frais',
    language: 'fr',
  });
  assert.ok(frUrl.startsWith('https://wa.me/212655607035?text='));
  assert.ok(decodeURIComponent(frUrl).includes('Lait de vache frais'));

  const arUrl = buildWhatsAppInquiryUrl({
    phone: '+212655607035',
    productName: 'الحليب الطري',
    language: 'ar',
  });
  assert.ok(arUrl.startsWith('https://wa.me/212655607035?text='));
  assert.ok(decodeURIComponent(arUrl).includes('الحليب الطري'));
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
  assert.ok(invalidResult.errors.fullName);
  assert.ok(invalidResult.errors.phone);
  assert.ok(invalidResult.errors.email);
  assert.ok(invalidResult.errors.interest);
  assert.ok(invalidResult.errors.message);

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
  const sampleProducts: ProductItem[] = [
    {
      id: 'milk',
      category: 'dairy',
      name: { en: 'Fresh Cow Milk', fr: 'Lait de vache frais', ar: 'حليب البقر الطري' },
      shortDescription: { en: 'Daily morning milking', fr: 'Traite du matin', ar: 'حليب الصباح' },
      unitOrBreedNote: { en: 'Raw farm milk', fr: 'Lait cru', ar: 'حليب طبيعي' },
      availability: 'available_daily',
      priceDisplay: { en: 'Contact us for pricing', fr: 'Contactez-nous', ar: 'اتصل بنا' },
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
      priceDisplay: { en: 'Contact us for pricing', fr: 'Contactez-nous', ar: 'اتصل بنا' },
      whatsappTopic: { en: 'sheep', fr: 'moutons', ar: 'الأغنام' },
      imagePath: '/sheep.jpg',
    },
  ];

  assert.equal(filterProducts(sampleProducts, 'all', '', 'en').length, 2);
  assert.equal(filterProducts(sampleProducts, 'dairy', '', 'en').length, 1);
  assert.equal(filterProducts(sampleProducts, 'all', 'Sardi', 'en').length, 1);
  assert.equal(filterProducts(sampleProducts, 'all', 'السردي', 'ar').length, 1);
});

test('buildGoogleMapsEmbedUrl constructs valid embed URL with language and query', () => {
  const embed = buildGoogleMapsEmbedUrl('Taroudant, Morocco', 'fr');
  assert.equal(
    embed,
    'https://www.google.com/maps?q=Taroudant%2C%20Morocco&hl=fr&z=12&output=embed'
  );
});
