import type {
  FarmContactConfig,
  GalleryItem,
  Language,
  ProductItem,
} from '../utils/farmLogic';

export const FARM_IMAGES = {
  heroLandscape: '/src/assets/images/hero_taroudant_farm_1794590182955.jpg',
  freshDairy: '/src/assets/images/product_fresh_dairy_milk_1794590184217.jpg',
  cattleCalves: '/src/assets/images/livestock_cattle_calves_1794590185899.jpg',
  sheepGoats: '/src/assets/images/livestock_sheep_goats_1794590186245.jpg',
  honeyEggsHarvest: '/src/assets/images/farm_products_honey_eggs_1794590187128.jpg',
};

export const DEFAULT_FARM_CONFIG: FarmContactConfig = {
  phonePlaceholder: '+212 655-607035',
  whatsappNumber: '+212655607035',
  emailPlaceholder: 'contact@atlasfarm-taroudant.ma (Placeholder)',
  locationAddress: {
    en: 'Taroudant Region, Souss-Massa Valley, Morocco (Exact farm coordinates configurable)',
    fr: 'Région de Taroudant, Vallée du Souss-Massa, Maroc (Coordonnées exactes configurables)',
    ar: 'إقليم تارودانت، سهل سوس ماسة، المغرب (الإحداثيات الدقيقة قابلة للتخصيص)',
  },
  mapQuery: 'Taroudant, Souss-Massa, Morocco',
  instagramHandle: '@atlasfarm.taroudant',
  facebookPage: 'facebook.com/atlasfarm.taroudant',
};

export const INITIAL_PRODUCTS: ProductItem[] = [
  // 1. Fresh Dairy Products
  {
    id: 'fresh-cow-milk',
    category: 'dairy',
    name: {
      en: 'Fresh Cow Milk',
      fr: 'Lait de Vache Frais',
      ar: 'حليب البقر الطري',
    },
    shortDescription: {
      en: 'Pure, unblended raw cow milk from morning and evening farm milkings. Produced by healthy pasture-fed dairy cows raised on natural forage in Taroudant.',
      fr: 'Lait de vache cru et pur issu de la traite quotidienne à la ferme. Produit par des vaches laitières nourries aux fourrages naturels à Taroudant.',
      ar: 'حليب بقر طري وطبيعي من الحلب اليومي بالضيعة، تنتجه أبقار حلوب تتغذى على الكلأ والأعلاف الطبيعية في منطقة تارودانت.',
    },
    unitOrBreedNote: {
      en: 'Fresh Dairy · Daily Milking · Direct Farm Pickup or Local Inquiry',
      fr: 'Produits Laitiers · Traite Quotidienne · Retrait à la Ferme',
      ar: 'منتجات الحليب · حلب يومي · مباشر من الضيعة',
    },
    availability: 'available_daily',
    priceDisplay: {
      en: 'Contact us for pricing (Sample / Editable)',
      fr: 'Contactez-nous pour les tarifs (Exemple modifiable)',
      ar: 'اتصل بنا لمعرفة الأسعار (محتوى قابل للتعديل)',
    },
    whatsappTopic: {
      en: 'fresh milk',
      fr: 'lait de vache frais',
      ar: 'حليب البقر الطري',
    },
    imagePath: FARM_IMAGES.freshDairy,
    imageObjectPosition: 'center center',
    featured: true,
  },
  {
    id: 'traditional-dairy-products',
    category: 'dairy',
    name: {
      en: 'Traditional Dairy Products (If Available)',
      fr: 'Autres Produits Laitiers Traditionnels (Selon Disponibilité)',
      ar: 'مشتقات الحليب التقليدية (حسب التوفر)',
    },
    shortDescription: {
      en: 'Traditional Moroccan farm dairy preparations such as fresh Lben (buttermilk), Raib, Jben, and Zebda Beldia (farm butter), prepared in small batches depending on daily milk supply.',
      fr: 'Préparations laitières traditionnelles de la ferme telles que le Lben frais, Raïb, Jben et Zebda Beldia (beurre fermier), préparées selon la disponibilité quotidienne.',
      ar: 'مشتقات الحليب المغربية الأصيلة مثل اللبن البلدي والرايب والجبن والزبدة البلدية، تُحضّر بكميات محدودة حسب وفرة الحليب اليومي.',
    },
    unitOrBreedNote: {
      en: 'Fresh Dairy · Artisanal Batch · Subject to Daily Availability',
      fr: 'Produits Laitiers · Préparation Fermière · Selon Disponibilité',
      ar: 'مشتقات الحليب · تحضير تقليدي · حسب التوفر اليومي',
    },
    availability: 'seasonal_or_inquire',
    priceDisplay: {
      en: 'Contact us for pricing & today’s availability',
      fr: 'Contactez-nous pour les tarifs et la disponibilité du jour',
      ar: 'اتصل بنا لمعرفة الأسعار والتوفر اليومي',
    },
    whatsappTopic: {
      en: 'traditional dairy products (butter, lben, or cheese)',
      fr: 'autres produits laitiers traditionnels (beurre fermier, lben, jben)',
      ar: 'مشتقات الحليب التقليدية (اللبن أو الزبدة البلدية أو الجبن)',
    },
    imagePath: FARM_IMAGES.freshDairy,
    imageObjectPosition: 'right bottom',
    featured: false,
  },

  // 2. Livestock & Cattle
  {
    id: 'dairy-cows',
    category: 'livestock',
    name: {
      en: 'Dairy Cows',
      fr: 'Vaches Laitières',
      ar: 'الأبقار الحلوب',
    },
    shortDescription: {
      en: 'Well-cared-for dairy cows raised with attentive veterinary follow-up, balanced green alfalfa nutrition, and calm handling suitable for family farms and dairy producers.',
      fr: 'Vaches laitières élevées avec soin, alimentation équilibrée à base de luzerne fraîche et suivi attentif, adaptées aux exploitations laitières et familiales.',
      ar: 'أبقار حلوب تحظى برعاية دقيقة وتغذية متوازنة من الفصة الخضراء والأعلاف الطبيعية، مناسبة للضيعات الفلاحية ومربي الماشية.',
    },
    unitOrBreedNote: {
      en: 'Livestock & Cattle · On-Farm Inspection Welcome',
      fr: 'Bétail & Bovins · Visite sur Place Bienvenue',
      ar: 'الماشية والأبقار · المعاينة متاحة بعين المكان',
    },
    availability: 'upon_inquiry',
    priceDisplay: {
      en: 'Contact us for pricing & current herd selection',
      fr: 'Contactez-nous pour les tarifs et la sélection actuelle',
      ar: 'اتصل بنا لمعرفة الأسعار والرؤوس المتوفرة حالياً',
    },
    whatsappTopic: {
      en: 'dairy cows',
      fr: 'vaches laitières',
      ar: 'الأبقار الحلوب',
    },
    imagePath: FARM_IMAGES.cattleCalves,
    imageObjectPosition: 'left center',
    featured: true,
  },
  {
    id: 'beef-cattle',
    category: 'livestock',
    name: {
      en: 'Beef Cattle',
      fr: 'Bovins à Viande (Bœufs & Taurillons)',
      ar: 'أبقار وعجول التسمين',
    },
    shortDescription: {
      en: 'Healthy beef cattle raised responsibly in spacious paddocks with natural fodder and clean water in the Taroudant countryside. Direct selection at the farm.',
      fr: 'Bovins destinés à la production de viande, élevés de manière responsable dans des enclos spacieux avec des fourrages naturels à Taroudant.',
      ar: 'أبقار وعجول مخصصة لإنتاج اللحوم، تُربّى في فضاءات نظيفة وواسعة مع أعلاف طبيعية ومياه نقية بضواحي تارودانت.',
    },
    unitOrBreedNote: {
      en: 'Livestock & Cattle · Individual or Lot Inquiry',
      fr: 'Bétail & Bovins · Vente à l’Unité ou par Lot',
      ar: 'الماشية والأبقار · بيع فردي أو بالجملة',
    },
    availability: 'upon_inquiry',
    priceDisplay: {
      en: 'Contact us for pricing',
      fr: 'Contactez-nous pour les tarifs',
      ar: 'اتصل بنا لمعرفة الأسعار',
    },
    whatsappTopic: {
      en: 'beef cattle',
      fr: 'bovins à viande',
      ar: 'أبقار وعجول التسمين',
    },
    imagePath: FARM_IMAGES.cattleCalves,
    imageObjectPosition: 'center center',
    featured: false,
  },
  {
    id: 'calves',
    category: 'livestock',
    name: {
      en: 'Calves',
      fr: 'Veaux & Génisses',
      ar: 'العجول والعجلات الصغيرة',
    },
    shortDescription: {
      en: 'Vigorous young calves and heifers nurtured on farm milk and clean pasture forage, ideal for rearing, herd renewal, or fattening programs.',
      fr: 'Jeunes veaux et génisses vigoureux nourris au lait de la ferme et aux fourrages propres, idéaux pour l’élevage ou le renouvellement de troupeau.',
      ar: 'عجول وعجلات صغيرة بصحة جيدة تتغذى على حليب الضيعة والأعلاف الطبيعية، مثالية للتربية وتجديد القطيع.',
    },
    unitOrBreedNote: {
      en: 'Livestock & Cattle · Young Stock · Farm Raised',
      fr: 'Bétail & Bovins · Jeunes Animaux Nés ou Élevés à la Ferme',
      ar: 'الماشية والأبقار · مواليد الضيعة ورعاية متواصلة',
    },
    availability: 'upon_inquiry',
    priceDisplay: {
      en: 'Contact us for pricing & age groups',
      fr: 'Contactez-nous pour les tarifs et tranches d’âge',
      ar: 'اتصل بنا لمعرفة الأسعار والأعمار المتوفرة',
    },
    whatsappTopic: {
      en: 'calves',
      fr: 'veaux et génisses',
      ar: 'العجول الصغيرة',
    },
    imagePath: FARM_IMAGES.cattleCalves,
    imageObjectPosition: 'right bottom',
    featured: false,
  },
  {
    id: 'sheep',
    category: 'livestock',
    name: {
      en: 'Sheep',
      fr: 'Moutons & Brebis',
      ar: 'الأغنام والخرفان',
    },
    shortDescription: {
      en: 'Traditionally grazed sheep raised in the clean dry climate of the Souss valley. Available year-round for breeding, family occasions, and Eid al-Adha inquiries.',
      fr: 'Moutons et brebis élevés selon la tradition pastorale dans le climat sain de la vallée du Souss. Disponibles pour l’élevage et les occasions familiales.',
      ar: 'أغنام وخرفان ترعى في المراعي الطبيعية بمنطقة سوس وتارودانت، متوفرة للتربية والمناسبات العائلية وعيد الأضحى حسب الطلب.',
    },
    unitOrBreedNote: {
      en: 'Livestock · Pasture Grazed · Direct Farmer Selection',
      fr: 'Élevage Ovin · Pâturage Naturel · Sélection Directe',
      ar: 'الأغنام · رعي طبيعي · اختيار مباشر مع الفلاح',
    },
    availability: 'upon_inquiry',
    priceDisplay: {
      en: 'Contact us for pricing',
      fr: 'Contactez-nous pour les tarifs',
      ar: 'اتصل بنا لمعرفة الأسعار',
    },
    whatsappTopic: {
      en: 'sheep',
      fr: 'moutons',
      ar: 'الأغنام والخرفان',
    },
    imagePath: FARM_IMAGES.sheepGoats,
    imageObjectPosition: 'left bottom',
    featured: true,
  },
  {
    id: 'goats',
    category: 'livestock',
    name: {
      en: 'Goats',
      fr: 'Chèvres & Chevreaux',
      ar: 'الماعز والجديان',
    },
    shortDescription: {
      en: 'Hardy local goats adapted to the foothills and argan/olive pastures of the Taroudant region, raised for both quality milk and traditional livestock sales.',
      fr: 'Chèvres locales robustes adaptées aux parcours de la région de Taroudant, élevées dans le respect du bien-être animal.',
      ar: 'ماعز محلي متأقلم مع طبيعة ومراعي منطقة تارودانت والأطلس، يتميز بصحة جيدة ورعاية طبيعية.',
    },
    unitOrBreedNote: {
      en: 'Livestock · Adapted to Souss & Atlas Foothills',
      fr: 'Élevage Caprin · Rustique & Naturel',
      ar: 'الماعز · سلالات متأقلمة مع مناخ تارودانت',
    },
    availability: 'upon_inquiry',
    priceDisplay: {
      en: 'Contact us for pricing',
      fr: 'Contactez-nous pour les tarifs',
      ar: 'اتصل بنا لمعرفة الأسعار',
    },
    whatsappTopic: {
      en: 'goats',
      fr: 'chèvres',
      ar: 'الماعز',
    },
    imagePath: FARM_IMAGES.sheepGoats,
    imageObjectPosition: 'right bottom',
    featured: false,
  },

  // 3. Farm Products
  {
    id: 'farm-eggs-and-honey',
    category: 'farm_goods',
    name: {
      en: 'Farm Eggs & Local Honey',
      fr: 'Œufs Fermiers & Miel Local',
      ar: 'البيض البلدي والعسل المحلي',
    },
    shortDescription: {
      en: 'Free-range country eggs (Beldia) gathered daily at the farm and pure local Moroccan honey harvested in the Taroudant region, offered according to seasonal production.',
      fr: 'Œufs beldia de poules élevées en plein air ramassés à la ferme et miel pur de la région de Taroudant, proposés selon la récolte saisonnière.',
      ar: 'بيض بلدي طبيعي يجمع يومياً بالضيعة وعسل حر من مراعي منطقة تارودانت، يتوفران حسب الإنتاج والموسم الفلاحي.',
    },
    unitOrBreedNote: {
      en: 'Farm Products · Small-Scale Harvest · Limited Quantities',
      fr: 'Produits de la Ferme · Récolte Locale · Quantités Limitées',
      ar: 'منتجات الضيعة · إنتاج طبيعي محدود حسب الموسم',
    },
    availability: 'seasonal_or_inquire',
    priceDisplay: {
      en: 'Contact us for pricing & current stock',
      fr: 'Contactez-nous pour les tarifs et le stock actuel',
      ar: 'اتصل بنا لمعرفة الأسعار والكمية المتوفرة',
    },
    whatsappTopic: {
      en: 'farm eggs and local honey',
      fr: 'œufs fermiers et miel local',
      ar: 'البيض البلدي والعسل المحلي',
    },
    imagePath: FARM_IMAGES.honeyEggsHarvest,
    imageObjectPosition: 'center center',
    featured: true,
  },
  {
    id: 'seasonal-agricultural-products',
    category: 'farm_goods',
    name: {
      en: 'Seasonal Agricultural Products',
      fr: 'Produits Agricoles de Saison',
      ar: 'المحاصيل والمنتجات الفلاحية الموسمية',
    },
    shortDescription: {
      en: 'Seasonal harvest from our land in Taroudant—including olives, olive oil, fresh figs, green fodder, and other locally produced agricultural goods depending on the harvest calendar.',
      fr: 'Récoltes saisonnières de nos terres à Taroudant — olives, huile d’olive, figues fraîches, fourrages verts et autres produits agricoles locaux selon le calendrier des récoltes.',
      ar: 'محاصيل موسمية من أراضي الضيعة بتارودانت تشمل الزيتون وزيت الزيتون والتين والكلأ الأخضر ومنتجات فلاحية محلية أخرى حسب المواسم.',
    },
    unitOrBreedNote: {
      en: 'Farm Products · Harvest Calendar Dependent · Taroudant Soil',
      fr: 'Produits de la Ferme · Selon les Récoltes Saisonnières',
      ar: 'منتجات فلاحية · مرتبطة بمواسم الجني والحصاد بتارودانت',
    },
    availability: 'seasonal_or_inquire',
    priceDisplay: {
      en: 'Contact us for seasonal availability & pricing',
      fr: 'Contactez-nous pour la disponibilité saisonnière',
      ar: 'اتصل بنا لمعرفة المحاصيل المتوفرة حالياً وأسعارها',
    },
    whatsappTopic: {
      en: 'seasonal agricultural products',
      fr: 'produits agricoles de saison',
      ar: 'المنتجات الفلاحية الموسمية',
    },
    imagePath: FARM_IMAGES.honeyEggsHarvest,
    imageObjectPosition: 'right bottom',
    featured: false,
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gallery-taroudant-valley',
    category: 'landscapes',
    title: {
      en: 'Pastures & High Atlas Foothills in Taroudant',
      fr: 'Pâturages et Contreforts du Haut Atlas à Taroudant',
      ar: 'مراعي الضيعة وسفوح الأطلس الكبير بتارودانت',
    },
    caption: {
      en: 'Green alfalfa fields, traditional earthen farm buildings, and olive groves overlooking the High Atlas Mountains in the Souss-Massa region.',
      fr: 'Champs de luzerne verte, bâtiments agricoles traditionnels en terre et oliveraies face aux montagnes du Haut Atlas dans le Souss-Massa.',
      ar: 'حقول الفصة الخضراء والبنايات الفلاحية التقليدية وأشجار الزيتون في مواجهة جبال الأطلس الكبير بسهل سوس.',
    },
    locationNote: {
      en: 'Taroudant · Farm & Surroundings',
      fr: 'Taroudant · La Ferme et ses Environs',
      ar: 'تارودانت · الضيعة ومحيطها الطبيعي',
    },
    imagePath: FARM_IMAGES.heroLandscape,
    aspectClass: 'aspect-[16/10]',
    imageObjectPosition: 'center center',
  },
  {
    id: 'gallery-morning-dairy',
    category: 'dairy_harvest',
    title: {
      en: 'Morning Milk & Traditional Farm Dairy',
      fr: 'Traite du Matin et Produits Laitiers Fermiers',
      ar: 'حليب الصباح الطري ومشتقاته البلدية',
    },
    caption: {
      en: 'Freshly collected cow milk served alongside traditional earthen bowls of farm butter and soft white cheese in our courtyard.',
      fr: 'Lait de vache fraîchement trait présenté avec du beurre fermier et du fromage blanc traditionnel dans la cour de la ferme.',
      ar: 'حليب بقر طازج بعد الحلب الصباحي إلى جانب الزبدة البلدية والجبن الطبيعي في فناء الضيعة.',
    },
    locationNote: {
      en: 'Daily Dairy Production · Fresh from the Farm',
      fr: 'Production Laitière · Fraîcheur Quotidienne',
      ar: 'إنتاج الحليب · طراوة يومية من الضيعة',
    },
    imagePath: FARM_IMAGES.freshDairy,
    aspectClass: 'aspect-[4/3]',
    imageObjectPosition: 'center center',
  },
  {
    id: 'gallery-cattle-herd',
    category: 'livestock',
    title: {
      en: 'Dairy Cows, Beef Cattle & Young Calves',
      fr: 'Vaches Laitières, Bovins et Jeunes Veaux',
      ar: 'الأبقار الحلوب وعجول التربية بالضيعة',
    },
    caption: {
      en: 'Our cattle herd grazing on fresh forage and resting in sunlit open paddocks bordered by mature olive trees.',
      fr: 'Notre troupeau bovin pâturant des fourrages frais dans des enclos ensoleillés bordés d’oliviers.',
      ar: 'قطيع الأبقار والعجول يرعى في فضاءات مفتوحة ومشمسة تحيط بها أشجار الزيتون.',
    },
    locationNote: {
      en: 'Responsible Livestock Management · Cattle & Calves',
      fr: 'Élevage Responsable · Bovins & Veaux',
      ar: 'رعاية مسؤولة للماشية · الأبقار والعجول',
    },
    imagePath: FARM_IMAGES.cattleCalves,
    aspectClass: 'aspect-[4/3]',
    imageObjectPosition: 'center center',
  },
  {
    id: 'gallery-sheep-goats-pasture',
    category: 'livestock',
    title: {
      en: 'Sheep & Goats on Rural Souss Pastures',
      fr: 'Moutons et Chèvres au Pâturage dans le Souss',
      ar: 'الأغنام والماعز في المراعي الطبيعية بتارودانت',
    },
    caption: {
      en: 'Sheep and hardy local goats grazing naturally across open rural pastures with traditional adobe farm enclosures nearby.',
      fr: 'Moutons et chèvres locales pâturant librement dans les parcours ruraux près des enclos traditionnels.',
      ar: 'قطيع الأغنام والماعز المحلي يرعى بحرية في المراعي الطبيعية المحيطة بالضيعة.',
    },
    locationNote: {
      en: 'Pastoral Heritage · Sheep & Goats',
      fr: 'Tradition Pastorale · Moutons & Chèvres',
      ar: 'تراث فلاحي أصيل · الأغنام والماعز',
    },
    imagePath: FARM_IMAGES.sheepGoats,
    aspectClass: 'aspect-[4/3]',
    imageObjectPosition: 'center center',
  },
  {
    id: 'gallery-harvest-basket',
    category: 'dairy_harvest',
    title: {
      en: 'Country Eggs, Pure Honey & Seasonal Harvest',
      fr: 'Œufs Beldia, Miel Pur et Récolte de Saison',
      ar: 'البيض البلدي والعسل الحر وخيرات الموسم',
    },
    caption: {
      en: 'Locally gathered farm eggs, jars of golden Moroccan honey, fresh olives, and ripe figs harvested according to the season.',
      fr: 'Œufs fermiers ramassés du jour, pots de miel marocain doré, olives fraîches et figues mûres récoltées selon la saison.',
      ar: 'سلة البيض البلدي الطازج مع العسل المحلي والزيتون والتين الطري من خيرات المواسم الفلاحية.',
    },
    locationNote: {
      en: 'Local Farm Goods · Seasonal Availability',
      fr: 'Produits du Terroir · Disponibilité Saisonnière',
      ar: 'منتجات الضيعة · توفر موسمي طبيعي',
    },
    imagePath: FARM_IMAGES.honeyEggsHarvest,
    aspectClass: 'aspect-[4/3]',
    imageObjectPosition: 'center center',
  },
  {
    id: 'gallery-daily-farm-life',
    category: 'landscapes',
    title: {
      en: 'Daily Agricultural Life in Taroudant',
      fr: 'Vie Quotidienne à la Ferme à Taroudant',
      ar: 'الحياة اليومية الفلاحية في ضيعة أطلس تارودانت',
    },
    caption: {
      en: 'Early morning care of livestock, irrigation of green forage fields, and traditional Moroccan stewardship of the land.',
      fr: 'Soins matinaux au bétail, entretien des cultures fourragères et respect du savoir-faire agricole marocain.',
      ar: 'العناية الصباحية بالماشية وسقي الحقول الخضراء والحفاظ على التقاليد الفلاحية المغربية الأصيلة.',
    },
    locationNote: {
      en: 'Souss-Massa · Authentic Rural Heritage',
      fr: 'Souss-Massa · Patrimoine Rural Authentique',
      ar: 'سوس ماسة · أصالة الفلاحة المغربية',
    },
    imagePath: FARM_IMAGES.heroLandscape,
    aspectClass: 'aspect-[16/10]',
    imageObjectPosition: 'right bottom',
  },
];

export const UI_COPY: Record<
  Language,
  {
    nav: {
      brand: string;
      about: string;
      products: string;
      gallery: string;
      whyUs: string;
      contact: string;
      ctaWhatsApp: string;
    };
    hero: {
      kicker: string;
      headline: string;
      subtitle: string;
      intro: string;
      exploreBtn: string;
      contactBtn: string;
      pillars: Array<{ label: string; detail: string }>;
    };
    about: {
      kicker: string;
      title: string;
      lead: string;
      body1: string;
      body2: string;
      transparencyNotice: string;
      highlights: Array<{ number: string; title: string; description: string }>;
    };
    products: {
      kicker: string;
      title: string;
      subtitle: string;
      sampleNotice: string;
      editModeBtn: string;
      editModeActiveBtn: string;
      searchPlaceholder: string;
      categories: {
        all: string;
        dairy: string;
        livestock: string;
        farm_goods: string;
      };
      availabilityLabels: {
        available_daily: string;
        seasonal_or_inquire: string;
        upon_inquiry: string;
      };
      whatsappBtn: string;
      priceLabel: string;
      emptyState: string;
      resetFilterBtn: string;
    };
    gallery: {
      kicker: string;
      title: string;
      subtitle: string;
      filters: {
        all: string;
        landscapes: string;
        livestock: string;
        dairy_harvest: string;
      };
      enlargeLabel: string;
      closeLightbox: string;
      prevPhoto: string;
      nextPhoto: string;
      inquirePhotoBtn: string;
    };
    whyUs: {
      kicker: string;
      title: string;
      subtitle: string;
      reasons: Array<{ index: string; title: string; description: string }>;
      directBannerTitle: string;
      directBannerText: string;
      directBannerBtn: string;
    };
    contact: {
      kicker: string;
      title: string;
      subtitle: string;
      locationLabel: string;
      phoneLabel: string;
      whatsappLabel: string;
      emailLabel: string;
      configureContactToggle: string;
      configureContactHide: string;
      mapTitle: string;
      mapNote: string;
      mapQueryInputLabel: string;
      formTitle: string;
      formSubtitle: string;
      fields: {
        fullName: string;
        fullNamePlaceholder: string;
        phone: string;
        phonePlaceholder: string;
        email: string;
        emailPlaceholder: string;
        interest: string;
        interestPlaceholder: string;
        interestOptions: string[];
        message: string;
        messagePlaceholder: string;
        submitBtn: string;
      };
      successTitle: string;
      successMessage: string;
      sendViaWhatsAppNow: string;
      newInquiryBtn: string;
      backendNoteTitle: string;
      backendNoteBody: string;
      recentInquiriesTitle: string;
    };
    footer: {
      description: string;
      quickLinksTitle: string;
      categoriesTitle: string;
      contactTitle: string;
      socialNote: string;
      locationText: string;
      copyright: string;
    };
    floatingWhatsApp: {
      label: string;
      tooltip: string;
    };
  }
> = {
  en: {
    nav: {
      brand: 'Atlas Farm Taroudant',
      about: 'About Us',
      products: 'Products',
      gallery: 'Gallery',
      whyUs: 'Why Us',
      contact: 'Contact',
      ctaWhatsApp: 'WhatsApp Us',
    },
    hero: {
      kicker: 'Taroudant · Souss-Massa · Morocco',
      headline: 'Welcome to Atlas Farm Taroudant',
      subtitle: 'Fresh from Our Farm, Naturally Moroccan.',
      intro:
        'Rooted in the fertile agricultural traditions of the Taroudant valley, our family-run Moroccan farm provides fresh daily cow milk, traditional dairy products, responsibly raised cattle, calves, sheep, and goats, alongside seasonal farm produce directly from the farmer to your home or business.',
      exploreBtn: 'Explore Our Products',
      contactBtn: 'Contact Our Farm',
      pillars: [
        {
          label: 'Fresh Dairy Daily',
          detail: 'Raw cow milk & traditional farm dairy depending on daily milking',
        },
        {
          label: 'Cattle & Livestock',
          detail: 'Dairy cows, beef cattle, calves, sheep, and goats raised on clean forage',
        },
        {
          label: 'Seasonal Harvest',
          detail: 'Country eggs, local honey, olives, and seasonal Taroudant farm goods',
        },
        {
          label: 'Direct Farmer Contact',
          detail: 'On-farm visits in Taroudant & direct WhatsApp communication',
        },
      ],
    },
    about: {
      kicker: 'Our Agricultural Heritage',
      title: 'Authentic Moroccan Farming in the Heart of Taroudant',
      lead:
        'Situated between the High Atlas and Anti-Atlas mountains in the fertile Souss-Massa plain, Atlas Farm Taroudant carries forward time-honored Moroccan farming and livestock stewardship.',
      body1:
        'Our daily work begins at dawn with the care of our herd and the morning milking. We focus on what local families, breeders, and buyers value most: clean natural nutrition for our animals, calm and respectful livestock handling, and uncompromised freshness from the pasture and milking parlor.',
      body2:
        'Whether you are looking for fresh daily cow milk, selecting a healthy dairy cow, calf, sheep, or goat for your herd or family occasion, or inquiring about seasonal country eggs and honey, you speak directly with the farmer—with complete honesty about what is available on the farm today.',
      transparencyNotice:
        'Transparency Note: We do not claim fabricated industrial certifications or awards. Every animal and product can be inspected directly at our farm in Taroudant.',
      highlights: [
        {
          number: '01.',
          title: 'Traditional Farming Practices',
          description:
            'Cultivating green alfalfa and natural fodder irrigated in the Souss valley tradition, respecting the seasonal rhythms of Taroudant.',
        },
        {
          number: '02.',
          title: 'Commitment to Product Quality',
          description:
            'Milk and farm products are handled cleanly and offered fresh from the farm without artificial additives or intermediaries.',
        },
        {
          number: '03.',
          title: 'Animal Care & Responsible Livestock Management',
          description:
            'Spacious sunlit paddocks, clean water, natural forage diets, and attentive care for our cows, calves, sheep, and goats.',
        },
        {
          number: '04.',
          title: 'Direct Connection to Taroudant',
          description:
            'Serving households, local markets, and breeders across Taroudant and the wider Souss-Massa region with straightforward personal service.',
        },
      ],
    },
    products: {
      kicker: 'Our Products & Services',
      title: 'Farm Catalog & Livestock Availability',
      subtitle:
        'Browse our three core farm categories below. Because livestock and harvest quantities change naturally throughout the year, pricing and current availability are confirmed directly with the farmer.',
      sampleNotice:
        'Editable Sample Catalog: Product prices and exact daily stock are shown as configurable placeholders ("Contact us for pricing") until updated by the farm owner.',
      editModeBtn: 'Customize Sample Prices & Phone',
      editModeActiveBtn: 'Done Customizing Catalog',
      searchPlaceholder: 'Search milk, cows, calves, sheep, goats, honey...',
      categories: {
        all: 'All Farm Offerings',
        dairy: 'Fresh Dairy Products',
        livestock: 'Livestock & Cattle',
        farm_goods: 'Farm Products',
      },
      availabilityLabels: {
        available_daily: 'Daily Farm Milking · Inquire for Today’s Volume',
        seasonal_or_inquire: 'Seasonal / Limited Batch · Check Availability',
        upon_inquiry: 'Available by Direct Selection & Inquiry',
      },
      whatsappBtn: 'Inquire on WhatsApp',
      priceLabel: 'Pricing',
      emptyState: 'No products match your search criteria.',
      resetFilterBtn: 'Show All Products',
    },
    gallery: {
      kicker: 'Farm Gallery',
      title: 'Life, Livestock & Landscapes at Atlas Farm',
      subtitle:
        'Explore photographs showcasing our pastures in the Taroudant valley, cattle and sheep herds, morning dairy table, and seasonal farm harvest. Click any photograph to enlarge.',
      filters: {
        all: 'All Photos',
        landscapes: 'Farm & Landscapes',
        livestock: 'Cattle & Livestock',
        dairy_harvest: 'Milk & Farm Harvest',
      },
      enlargeLabel: 'View full size',
      closeLightbox: 'Close gallery view',
      prevPhoto: 'Previous photograph',
      nextPhoto: 'Next photograph',
      inquirePhotoBtn: 'Ask About This on WhatsApp',
    },
    whyUs: {
      kicker: 'Why Choose Atlas Farm Taroudant?',
      title: 'Built on Freshness, Trust & Direct Farmer Relationships',
      subtitle:
        'When you buy milk, livestock, or seasonal harvest from Atlas Farm Taroudant, you know exactly where your food and animals come from.',
      reasons: [
        {
          index: '01.',
          title: 'Fresh Farm Products',
          description:
            'From morning cow milk to free-range country eggs and seasonal produce, our goods come straight from daily farm work rather than long cold-storage chains.',
        },
        {
          index: '02.',
          title: 'Direct Contact with the Farmer',
          description:
            'No middlemen or call centers. Discuss milk quantities, inspect cattle or sheep on-site, and arrange pickup directly with the farm owner.',
        },
        {
          index: '03.',
          title: 'Local Moroccan Agricultural Production',
          description:
            'Proudly rooted in Taroudant and the Souss-Massa agricultural basin, supporting local rural livelihoods and traditional Moroccan husbandry.',
        },
        {
          index: '04.',
          title: 'Quality & Full Transparency',
          description:
            'We welcome visitors to see how our cows, calves, sheep, and goats are fed and cared for before making any purchase.',
        },
        {
          index: '05.',
          title: 'Personalized Customer Service',
          description:
            'Whether you are a local family seeking fresh milk or a buyer looking for livestock, we tailor our service to your needs.',
        },
      ],
      directBannerTitle: 'Want to Visit the Farm or Check Today’s Availability?',
      directBannerText:
        'Send us a quick message on WhatsApp or use the contact form below to schedule a farm visit in Taroudant.',
      directBannerBtn: 'Message the Farmer on WhatsApp',
    },
    contact: {
      kicker: 'Location & Contact',
      title: 'Get in Touch or Visit Us in Taroudant',
      subtitle:
        'Reach out directly via WhatsApp, phone, or our inquiry form below. Once the farm’s exact rural route or GPS coordinates are finalized, you can enter them directly into the interactive map.',
      locationLabel: 'Farm Location',
      phoneLabel: 'Phone & WhatsApp Number',
      whatsappLabel: 'WhatsApp Direct Channel',
      emailLabel: 'Email Address (Placeholder)',
      configureContactToggle: 'Configure Farm Contact & Map Coordinates',
      configureContactHide: 'Hide Configuration Panel',
      mapTitle: 'Interactive Map — Taroudant, Souss-Massa, Morocco',
      mapNote:
        'Showing Taroudant, Souss-Massa, Morocco. Enter exact GPS coordinates (e.g., 30.4703, -8.8770) or your specific douar/route in the configuration panel to pinpoint the farm gate.',
      mapQueryInputLabel: 'Exact Farm Coordinates or Address for Google Maps:',
      formTitle: 'Send a Farm Inquiry',
      formSubtitle:
        'Fill out your details and the product or livestock you are interested in. All fields are validated before submission.',
      fields: {
        fullName: 'Full Name',
        fullNamePlaceholder: 'e.g., Karim El Mansouri',
        phone: 'Phone / WhatsApp Number',
        phonePlaceholder: 'e.g., +212 6 00 00 00 00',
        email: 'Email Address',
        emailPlaceholder: 'e.g., karim@example.ma',
        interest: 'Product or Service of Interest',
        interestPlaceholder: 'Select a product or livestock category...',
        interestOptions: [
          'Fresh Cow Milk (Daily Supply)',
          'Traditional Dairy Products (Butter, Lben, Cheese)',
          'Dairy Cows',
          'Beef Cattle',
          'Calves',
          'Sheep',
          'Goats',
          'Farm Eggs & Local Honey',
          'Seasonal Agricultural Products',
          'On-Farm Visit / General Inquiry',
        ],
        message: 'Your Message',
        messagePlaceholder:
          'Tell us what quantity, breed, or product you are looking for and your preferred time to be contacted...',
        submitBtn: 'Submit Inquiry to Atlas Farm',
      },
      successTitle: 'Thank You — Your Inquiry Has Been Recorded',
      successMessage:
        'Your inquiry has been validated and saved in this session. For the fastest immediate response from the farmer in Taroudant, you can also forward your formatted inquiry directly via WhatsApp with one click below.',
      sendViaWhatsAppNow: 'Forward This Inquiry via WhatsApp Now',
      newInquiryBtn: 'Send Another Inquiry',
      backendNoteTitle: 'Backend & Email Delivery Configuration Guide',
      backendNoteBody:
        'This form validates inputs and stores inquiries locally in your browser session. To receive email or CRM notifications in production, connect the form submission handler in src/components/ContactSection.tsx to an Express /api/inquiries endpoint with Nodemailer (SMTP_HOST, SMTP_USER, SMTP_PASS in .env) or a webhook service such as Formspree/Resend.',
      recentInquiriesTitle: 'Submitted Inquiries in Current Session',
    },
    footer: {
      description:
        'Traditional Moroccan farm in the Taroudant region of Souss-Massa specializing in fresh cow milk, dairy products, cattle, calves, sheep, goats, and seasonal local harvest.',
      quickLinksTitle: 'Quick Navigation',
      categoriesTitle: 'Farm Categories',
      contactTitle: 'Farm Contact',
      socialNote: 'Configurable Social Channels:',
      locationText: 'Taroudant, Souss-Massa, Morocco',
      copyright: 'Atlas Farm Taroudant. All rights reserved. Naturally Moroccan.',
    },
    floatingWhatsApp: {
      label: 'WhatsApp Inquiry',
      tooltip: 'Chat directly with Atlas Farm Taroudant',
    },
  },

  fr: {
    nav: {
      brand: 'Atlas Farm Taroudant',
      about: 'À Propos',
      products: 'Produits',
      gallery: 'Galerie',
      whyUs: 'Nos Atouts',
      contact: 'Contact',
      ctaWhatsApp: 'WhatsApp',
    },
    hero: {
      kicker: 'Taroudant · Souss-Massa · Maroc',
      headline: 'Bienvenue chez Atlas Farm Taroudant',
      subtitle: 'Frais de Notre Ferme, Naturellement Marocain.',
      intro:
        'Ancrée dans la tradition agricole de la vallée de Taroudant, notre exploitation familiale marocaine vous propose du lait de vache frais du jour, des produits laitiers fermiers, ainsi que la vente de vaches laitières, bovins, veaux, moutons, chèvres et produits agricoles de saison directement du producteur.',
      exploreBtn: 'Découvrir Nos Produits',
      contactBtn: 'Contacter Notre Ferme',
      pillars: [
        {
          label: 'Lait Frais du Jour',
          detail: 'Lait de vache cru et dérivés laitiers selon la traite quotidienne',
        },
        {
          label: 'Élevage & Bétail',
          detail: 'Vaches laitières, bovins à viande, veaux, moutons et chèvres nourris sainement',
        },
        {
          label: 'Produits de la Ferme',
          detail: 'Œufs beldia, miel local, olives et récoltes de saison à Taroudant',
        },
        {
          label: 'Contact Direct Éleveur',
          detail: 'Visite sur place à Taroudant et échange direct sur WhatsApp',
        },
      ],
    },
    about: {
      kicker: 'Notre Héritage Agricole',
      title: 'Une Agriculture Marocaine Authentique au Cœur de Taroudant',
      lead:
        'Située entre le Haut Atlas et l’Anti-Atlas dans la plaine fertile du Souss-Massa, Atlas Farm Taroudant perpétue un savoir-faire agricole et pastoral marocain authentique.',
      body1:
        'Nos journées commencent à l’aube avec le soin du troupeau et la traite matinale. Nous privilégions ce qui compte vraiment pour les familles et les éleveurs : une alimentation saine et naturelle pour nos animaux, un élevage respectueux, et une fraîcheur irréprochable du pâturage jusqu’à votre table.',
      body2:
        'Que vous recherchiez du lait frais quotidien, une vache laitière, un veau, un mouton ou une chèvre, ou encore des œufs fermiers et du miel selon la saison, vous échangez directement avec l’agriculteur, en toute transparence sur les disponibilités réelles de la ferme.',
      transparencyNotice:
        'Engagement de transparence : Nous n’inventons ni certifications industrielles ni récompenses fictives. Chaque animal et chaque produit peut être vu directement à la ferme à Taroudant.',
      highlights: [
        {
          number: '01.',
          title: 'Pratiques Agricoles Traditionnelles',
          description:
            'Culture de luzerne verte et de fourrages naturels au rythme des saisons de la plaine du Souss et de Taroudant.',
        },
        {
          number: '02.',
          title: 'Engagement pour la Qualité et la Fraîcheur',
          description:
            'Un lait et des produits fermiers sains, proposés directement à la ferme sans intermédiaires ni transformations industrielles.',
        },
        {
          number: '03.',
          title: 'Bien-Être Animal & Gestion Responsable',
          description:
            'Enclos propres et ensoleillés, eau pure, alimentation fourragère équilibrée et suivi attentif de nos vaches, veaux, moutons et chèvres.',
        },
        {
          number: '04.',
          title: 'Ancrage Local à Taroudant',
          description:
            'Au service des foyers, commerçants et éleveurs de Taroudant et de la région Souss-Massa avec un accueil personnalisé.',
        },
      ],
    },
    products: {
      kicker: 'Nos Produits & Services',
      title: 'Catalogue de la Ferme & Disponibilité du Bétail',
      subtitle:
        'Découvrez nos trois grandes catégories ci-dessous. La disponibilité des animaux et des récoltes évoluant naturellement au fil des saisons, les tarifs sont confirmés directement avec l’agriculteur.',
      sampleNotice:
        'Catalogue Modifiable : Les tarifs et disponibilités sont présentés à titre d’exemple configurable (« Contactez-nous pour les tarifs ») jusqu’à leur mise à jour par le propriétaire.',
      editModeBtn: 'Personnaliser Tarifs & Téléphone',
      editModeActiveBtn: 'Terminer la Personnalisation',
      searchPlaceholder: 'Rechercher lait, vaches, veaux, moutons, chèvres, miel...',
      categories: {
        all: 'Tous les Produits',
        dairy: 'Produits Laitiers Frais',
        livestock: 'Bétail & Élevage',
        farm_goods: 'Produits de la Ferme',
      },
      availabilityLabels: {
        available_daily: 'Traite Quotidienne · Selon Volume du Jour',
        seasonal_or_inquire: 'Saisonnier / Quantité Limitée · Nous Consulter',
        upon_inquiry: 'Sélection Directe à la Ferme sur Demande',
      },
      whatsappBtn: 'Demander sur WhatsApp',
      priceLabel: 'Tarif',
      emptyState: 'Aucun produit ne correspond à votre recherche.',
      resetFilterBtn: 'Afficher Tous les Produits',
    },
    gallery: {
      kicker: 'Galerie de la Ferme',
      title: 'Vie Quotidienne, Troupeaux & Paysages d’Atlas Farm',
      subtitle:
        'Parcourez les images de notre ferme à Taroudant : pâturages face au Haut Atlas, bovins, moutons, chèvres, traite matinale et récoltes du terroir. Cliquez sur une photo pour l’agrandir.',
      filters: {
        all: 'Toutes les Photos',
        landscapes: 'Ferme & Paysages',
        livestock: 'Bovins & Troupeaux',
        dairy_harvest: 'Lait & Récoltes',
      },
      enlargeLabel: 'Agrandir la photo',
      closeLightbox: 'Fermer la galerie',
      prevPhoto: 'Photo précédente',
      nextPhoto: 'Photo suivante',
      inquirePhotoBtn: 'Poser une Question sur WhatsApp',
    },
    whyUs: {
      kicker: 'Pourquoi Choisir Atlas Farm Taroudant ?',
      title: 'Fraîcheur, Confiance et Relation Directe avec l’Éleveur',
      subtitle:
        'En choisissant Atlas Farm Taroudant pour votre lait, votre bétail ou vos produits du terroir, vous privilégiez une production locale traçable et humaine.',
      reasons: [
        {
          index: '01.',
          title: 'Produits Frais de la Ferme',
          description:
            'Du lait trait chaque matin aux œufs fermiers et produits de saison, tout provient directement du travail quotidien de notre exploitation.',
        },
        {
          index: '02.',
          title: 'Contact Direct avec l’Agriculteur',
          description:
            'Aucun intermédiaire. Vous discutez directement avec le responsable de la ferme pour vos commandes de lait ou le choix de votre bétail.',
        },
        {
          index: '03.',
          title: 'Production Agricole Marocaine Locale',
          description:
            'Fièrement implantés à Taroudant dans le Souss-Massa, nous valorisons le patrimoine agricole et l’élevage traditionnel marocain.',
        },
        {
          index: '04.',
          title: 'Qualité & Transparence Totale',
          description:
            'Les visites à la ferme sont les bienvenues afin de constater sur place la santé, l’alimentation et les conditions de vie de nos animaux.',
        },
        {
          index: '05.',
          title: 'Service Client Personnalisé',
          description:
            'Que vous soyez un particulier, un éleveur ou un professionnel local, nous répondons avec soin à chaque demande.',
        },
      ],
      directBannerTitle: 'Vous Souhaitez Visiter la Ferme ou Vérifier la Disponibilité ?',
      directBannerText:
        'Contactez-nous directement par WhatsApp ou via le formulaire ci-dessous pour organiser votre visite à Taroudant.',
      directBannerBtn: 'Écrire à la Ferme sur WhatsApp',
    },
    contact: {
      kicker: 'Localisation & Contact',
      title: 'Contactez-Nous ou Rendez-Nous Visite à Taroudant',
      subtitle:
        'Joignez-nous par WhatsApp, téléphone ou via notre formulaire. Dès que l’adresse exacte ou les coordonnées GPS de la ferme sont renseignées, la carte interactive affiche l’emplacement précis.',
      locationLabel: 'Localisation de la Ferme',
      phoneLabel: 'Téléphone & WhatsApp',
      whatsappLabel: 'Contact Direct WhatsApp',
      emailLabel: 'Adresse E-mail (Exemple Configurable)',
      configureContactToggle: 'Configurer Coordonnées & Carte GPS',
      configureContactHide: 'Masquer la Configuration',
      mapTitle: 'Carte Interactive — Taroudant, Souss-Massa, Maroc',
      mapNote:
        'Affichage de Taroudant, Souss-Massa, Maroc. Vous pouvez saisir les coordonnées GPS exactes (ex. 30.4703, -8.8770) dans le panneau de configuration.',
      mapQueryInputLabel: 'Coordonnées GPS ou Adresse Exacte pour Google Maps :',
      formTitle: 'Envoyer une Demande d’Information',
      formSubtitle:
        'Remplissez vos coordonnées et le produit ou bétail souhaité. Tous les champs sont vérifiés avant l’envoi.',
      fields: {
        fullName: 'Nom Complet',
        fullNamePlaceholder: 'ex. Karim El Mansouri',
        phone: 'Numéro de Téléphone / WhatsApp',
        phonePlaceholder: 'ex. +212 6 00 00 00 00',
        email: 'Adresse E-mail',
        emailPlaceholder: 'ex. karim@exemple.ma',
        interest: 'Produit ou Service Souhaité',
        interestPlaceholder: 'Sélectionnez un produit ou une catégorie...',
        interestOptions: [
          'Lait de Vache Frais (Approvisionnement Quotidien)',
          'Autres Produits Laitiers (Beurre, Lben, Jben)',
          'Vaches Laitières',
          'Bovins à Viande',
          'Veaux & Génisses',
          'Moutons & Brebis',
          'Chèvres',
          'Œufs Fermiers & Miel Local',
          'Produits Agricoles de Saison',
          'Visite de la Ferme / Renseignement Général',
        ],
        message: 'Votre Message',
        messagePlaceholder:
          'Précisez votre besoin (quantité de lait, type d’animal, visite à la ferme) et vos disponibilités...',
        submitBtn: 'Envoyer la Demande à la Ferme',
      },
      successTitle: 'Merci — Votre Demande a Bien Été Enregistrée',
      successMessage:
        'Votre demande a été validée et sauvegardée. Pour obtenir une réponse immédiate de l’éleveur à Taroudant, vous pouvez également transmettre ce message directement sur WhatsApp en un clic.',
      sendViaWhatsAppNow: 'Transmettre Cette Demande sur WhatsApp',
      newInquiryBtn: 'Envoyer une Nouvelle Demande',
      backendNoteTitle: 'Guide de Configuration Backend & E-mail',
      backendNoteBody:
        'Ce formulaire valide les saisies et enregistre les demandes localement. Pour recevoir des notifications par e-mail en production, connectez le formulaire à une route Express /api/inquiries avec Nodemailer (variables SMTP dans .env) ou un service comme Resend / Formspree.',
      recentInquiriesTitle: 'Demandes Envoyées Durant Cette Session',
    },
    footer: {
      description:
        'Exploitation agricole traditionnelle dans la région de Taroudant (Souss-Massa, Maroc) spécialisée dans le lait frais, les produits laitiers, les bovins, veaux, moutons, chèvres et produits de la ferme.',
      quickLinksTitle: 'Navigation Rapide',
      categoriesTitle: 'Nos Catégories',
      contactTitle: 'Coordonnées de la Ferme',
      socialNote: 'Réseaux Sociaux (Configurables) :',
      locationText: 'Taroudant, Souss-Massa, Maroc',
      copyright: 'Atlas Farm Taroudant. Tous droits réservés. Naturellement Marocain.',
    },
    floatingWhatsApp: {
      label: 'Contact WhatsApp',
      tooltip: 'Discuter directement avec Atlas Farm Taroudant',
    },
  },

  ar: {
    nav: {
      brand: 'ضيعة أطلس تارودانت',
      about: 'من نحن',
      products: 'منتجاتنا',
      gallery: 'معرض الصور',
      whyUs: 'لماذا نحن',
      contact: 'اتصل بنا',
      ctaWhatsApp: 'تواصل عبر واتساب',
    },
    hero: {
      kicker: 'تارودانت · سوس ماسة · المغرب',
      headline: 'مرحباً بكم في ضيعة أطلس تارودانت',
      subtitle: 'خيرات طازجة من ضيعتنا، بطبيعة مغربية أصيلة.',
      intro:
        'في قلب سهل سوس الخصيب بإقليم تارودانت، تقدم لكم ضيعة أطلس تارودانت حليب البقر الطري يومياً، ومشتقات الحليب التقليدية، وبيع الأبقار الحلوب وعجول التسمين والعجول الصغيرة والأغنام والماعز، إضافة إلى المنتجات الفلاحية الموسمية مباشرة من الفلاح إليكم.',
      exploreBtn: 'اكتشف منتجاتنا',
      contactBtn: 'تواصل مع الضيعة',
      pillars: [
        {
          label: 'حليب طري يومياً',
          detail: 'حليب بقر طبيعي ومشتقات الحليب البلدية حسب الحلب اليومي',
        },
        {
          label: 'الماشية والأبقار',
          detail: 'أبقار حلوب، عجول، أغنام وماعز تتغذى على أعلاف طبيعية نظيفة',
        },
        {
          label: 'منتجات الضيعة الموسمية',
          detail: 'بيض بلدي، عسل محلي، زيتون ومحاصيل فلاحية موسمية بتارودانت',
        },
        {
          label: 'تواصل مباشر مع الفلاح',
          detail: 'إمكانية زيارة الضيعة بتارودانت والتواصل المباشر عبر واتساب',
        },
      ],
    },
    about: {
      kicker: 'تراثنا الفلاحي بتارودانت',
      title: 'فلاحة مغربية أصيلة في قلب منطقة تارودانت',
      lead:
        'تقع ضيعة أطلس تارودانت بين جبال الأطلس الكبير والأطلس الصغير في سهل سوس ماسة المعطاء، وتحرص على إحياء التقاليد الفلاحية المغربية في تربية الماشية وإنتاج الحليب.',
      body1:
        'يبدأ عملنا اليومي مع ساعات الفجر الأولى بالعناية بالقطيع والحلب الصباحي. نركز في ضيعتنا على الأساسيات التي تهم كل أسرة ومربي ماشية: التغذية الطبيعية المتوازنة من الفصة والكلأ الأخضر، النظافة والرفق بالحيوان، والطراوة الكاملة للمنتجات من الضيعة مباشرة.',
      body2:
        'سواء كنتم تبحثون عن حليب البقر الطري، أو ترغبون في اقتناء بقرة حلوب أو عجل أو خروف أو ماعز، أو تستفسرون عن البيض البلدي والعسل والمحاصيل الموسمية، فإنكم تتعاملون مباشرة مع صاحب الضيعة بكل وضوح ومصداقية حول ما هو متوفر فعلياً.',
      transparencyNotice:
        'التزام بالشفافية: نحن لا ندّعي شهادات أو جوائز خيالية، بل نفتح أبواب الضيعة بتارودانت لكل زبون لمعاينة الماشية والمنتجات عن قرب.',
      highlights: [
        {
          number: '01.',
          title: 'ممارسات فلاحية تقليدية أصيلة',
          description:
            'زراعة الفصة والأعلاف الطبيعية في تربة تارودانت الخصبة مع احترام المواسم الفلاحية لمنطقة سوس.',
        },
        {
          number: '02.',
          title: 'الالتزام بجودة وطراوة المنتجات',
          description:
            'حليب ومنتجات فلاحية طبيعية طازجة من الضيعة مباشرة دون وسطاء أو إضافات صناعية.',
        },
        {
          number: '03.',
          title: 'العناية بالحيوان والإدارة المسؤولة للقطيع',
          description:
            'حظائر مشمسة ونظيفة، مياه نقية، وأعلاف طبيعية متوازنة لضمان صحة الأبقار والعجول والأغنام والماعز.',
        },
        {
          number: '04.',
          title: 'ارتباط وثيق بمنطقة تارودانت',
          description:
            'خدمة الأسر والكسّابة والمهنيين في تارودانت وجهات سوس ماسة بروح الضيافة المغربية.',
        },
      ],
    },
    products: {
      kicker: 'منتجاتنا وخدماتنا',
      title: 'دليل منتجات الضيعة والماشية المتوفرة',
      subtitle:
        'تصفحوا فئات منتجات الضيعة الثلاث أدناه. نظراً لأن توفر الماشية والمحاصيل الفلاحية يتغير طبيعياً حسب المواسم والإنتاج اليومي، يتم تأكيد الأسعار والتوفر مباشرة مع الفلاح.',
      sampleNotice:
        'محتوى نموذجي قابل للتعديل: الأسعار وحالة التوفر معروضة كبيانات قابلة للتخصيص ("اتصل بنا لمعرفة الأسعار") إلى حين تحديثها من طرف إدارة الضيعة.',
      editModeBtn: 'تعديل الأسعار ورقم الهاتف',
      editModeActiveBtn: 'إنهاء التعديل',
      searchPlaceholder: 'ابحث عن الحليب، الأبقار، العجول، الأغنام، الماعز، العسل...',
      categories: {
        all: 'جميع منتجات الضيعة',
        dairy: 'الحليب ومشتقاته الطرية',
        livestock: 'الماشية والأبقار',
        farm_goods: 'منتجات الضيعة والمحاصيل',
      },
      availabilityLabels: {
        available_daily: 'حلب يومي طازج · استفسر عن كمية اليوم',
        seasonal_or_inquire: 'إنتاج موسمي / محدود · تواصل للتأكد من التوفر',
        upon_inquiry: 'متوفر بالمعاينة والطلب المباشر بالضيعة',
      },
      whatsappBtn: 'استفسر عبر واتساب',
      priceLabel: 'السعر',
      emptyState: 'لا توجد منتجات مطابقة لبحثكم حالياً.',
      resetFilterBtn: 'عرض جميع المنتجات',
    },
    gallery: {
      kicker: 'معرض صور الضيعة',
      title: 'صور من ضيعة أطلس تارودانت والماشية والمناظر الطبيعية',
      subtitle:
        'شاهدوا صوراً توثق مراعي الضيعة بسهل سوس، وقطيع الأبقار والأغنام والماعز، وإنتاج الحليب الصباحي، وخيرات المواسم الفلاحية. اضغط على أي صورة لتكبيرها.',
      filters: {
        all: 'كل الصور',
        landscapes: 'الضيعة والمناظر الطبيعية',
        livestock: 'الأبقار والماشية',
        dairy_harvest: 'الحليب والمحاصيل',
      },
      enlargeLabel: 'تكبير الصورة',
      closeLightbox: 'إغلاق نافذة العرض',
      prevPhoto: 'الصورة السابقة',
      nextPhoto: 'الصورة التالية',
      inquirePhotoBtn: 'استفسر عبر واتساب',
    },
    whyUs: {
      kicker: 'لماذا تختارون ضيعة أطلس تارودانت؟',
      title: 'الثقة، الطراوة والتعامل المباشر مع الفلاح',
      subtitle:
        'عند اقتنائكم الحليب أو الماشية أو المحاصيل الموسمية من ضيعة أطلس تارودانت، فإنكم تختارون منتجاً محلياً معروف المصدر.',
      reasons: [
        {
          index: '01.',
          title: 'منتجات طازجة مباشرة من الضيعة',
          description:
            'من حليب الصباح الطري إلى البيض البلدي ومحاصيل الموسم، تصل إليكم خيرات الضيعة في كامل طراوتها.',
        },
        {
          index: '02.',
          title: 'تواصل مباشر مع الفلاح بدون وسطاء',
          description:
            'تحدثوا مباشرة مع مسؤول الضيعة للاستفسار عن الحليب أو معاينة الأبقار والأغنام والماعز بعين المكان.',
        },
        {
          index: '03.',
          title: 'إنتاج فلاحي مغربي محلي بتارودانت',
          description:
            'نعتز بانتمائنا الفلاحي لمنطقة تارودانت وسوس ماسة ونساهم في الحفاظ على جودة الإنتاج المحلي.',
        },
        {
          index: '04.',
          title: 'الجودة والشفافية التامة',
          description:
            'نرحب بزيارتكم للضيعة للاطلاع على جودة الأعلاف وظروف العناية بالقطيع قبل الشراء.',
        },
        {
          index: '05.',
          title: 'خدمة زبناء قريبة وملائمة لاحتياجاتكم',
          description:
            'سواء كنتم أسرة تبحث عن منتجات طبيعية أو مربي ماشية، نوفر لكم تعاملاً محترماً ومرناً.',
        },
      ],
      directBannerTitle: 'هل ترغبون في زيارة الضيعة أو الاستفسار عن المتوفر اليوم؟',
      directBannerText:
        'تواصلوا معنا مباشرة عبر واتساب أو عبر استمارة الاتصال أسفله لتحديد موعد زيارة الضيعة بتارودانت.',
      directBannerBtn: 'تحدث مع الفلاح عبر واتساب',
    },
    contact: {
      kicker: 'الموقع والاتصال',
      title: 'تواصلوا معنا أو تفضلوا بزيارتنا في تارودانت',
      subtitle:
        'يمكنكم الاتصال بنا عبر واتساب أو الهاتف أو ملء استمارة الطلب أسفله. كما يمكن تخصيص الإحداثيات الدقيقة للضيعة على خريطة جوجل التفاعلية.',
      locationLabel: 'موقع الضيعة',
      phoneLabel: 'رقم الهاتف وواتساب',
      whatsappLabel: 'التواصل المباشر عبر واتساب',
      emailLabel: 'البريد الإلكتروني (قابل للتخصيص)',
      configureContactToggle: 'تخصيص بيانات الاتصال وإحداثيات الخريطة',
      configureContactHide: 'إخفاء لوحة التخصيص',
      mapTitle: 'خريطة جوجل التفاعلية — تارودانت، سوس ماسة، المغرب',
      mapNote:
        'تعرض الخريطة مدينة وإقليم تارودانت، سوس ماسة. يمكن إدخال إحداثيات GPS الدقيقة للضيعة في لوحة التخصيص.',
      mapQueryInputLabel: 'إحداثيات GPS أو العنوان الدقيق للضيعة على الخريطة:',
      formTitle: 'أرسل طلب استفسار للضيعة',
      formSubtitle:
        'يرجى ملء البيانات واختيار المنتج أو الماشية المطلوبة. يتم التحقق من صحة جميع الحقول قبل الإرسال.',
      fields: {
        fullName: 'الاسم الكامل',
        fullNamePlaceholder: 'مثال: كريم المنصوري',
        phone: 'رقم الهاتف / واتساب',
        phonePlaceholder: 'مثال: +212 6 00 00 00 00',
        email: 'البريد الإلكتروني',
        emailPlaceholder: 'مثال: karim@example.ma',
        interest: 'المنتج أو الخدمة المطلوبة',
        interestPlaceholder: 'اختر المنتج أو نوع الماشية...',
        interestOptions: [
          'حليب البقر الطري (تزويد يومي)',
          'مشتقات الحليب التقليدية (اللبن، الزبدة البلدية، الجبن)',
          'الأبقار الحلوب',
          'أبقار وعجول التسمين',
          'العجول الصغيرة',
          'الأغنام والخرفان',
          'الماعز',
          'البيض البلدي والعسل المحلي',
          'المنتجات الفلاحية الموسمية',
          'زيارة الضيعة / استفسار عام',
        ],
        message: 'رسالتكم',
        messagePlaceholder:
          'اكتب تفاصيل طلبك (الكمية المطلوبة، نوع الماشية، أو موعد زيارة الضيعة)...',
        submitBtn: 'إرسال الطلب إلى ضيعة أطلس تارودانت',
      },
      successTitle: 'شكراً لكم — تم تسجيل طلبكم بنجاح',
      successMessage:
        'تم التحقق من بياناتكم وحفظ الطلب. للحصول على رد فوري من صاحب الضيعة بتارودانت، يمكنكم أيضاً إرسال هذا الطلب مباشرة عبر واتساب بضغطة زر واحدة.',
      sendViaWhatsAppNow: 'إرسال هذا الطلب عبر واتساب الآن',
      newInquiryBtn: 'إرسال طلب جديد',
      backendNoteTitle: 'ملاحظة تقنية حول ربط البريد الإلكتروني والخادم',
      backendNoteBody:
        'تقوم هذه الاستمارة بالتحقق من الحقول وحفظ الطلبات محلياً. لاستقبال الإشعارات عبر البريد الإلكتروني عند النشر، يمكن ربط الاستمارة بمسار Express (/api/inquiries) عبر خدمة SMTP / Nodemailer في ملف .env.',
      recentInquiriesTitle: 'الطلبات المرسلة خلال هذه الجلسة',
    },
    footer: {
      description:
        'ضيعة فلاحية مغربية تقليدية بإقليم تارودانت (سوس ماسة) متخصصة في إنتاج الحليب الطري ومشتقاته، وبيع الأبقار والعجول والأغنام والماعز، والمحاصيل الفلاحية الموسمية.',
      quickLinksTitle: 'روابط سريعة',
      categoriesTitle: 'أقسام المنتجات',
      contactTitle: 'بيانات الاتصال بالضيعة',
      socialNote: 'صفحات التواصل الاجتماعي (قابلة للتعديل):',
      locationText: 'تارودانت، سوس ماسة، المغرب',
      copyright: 'ضيعة أطلس تارودانت. جميع الحقوق محفوظة. بطبيعة مغربية أصيلة.',
    },
    floatingWhatsApp: {
      label: 'تواصل عبر واتساب',
      tooltip: 'تحدث مباشرة مع ضيعة أطلس تارودانت',
    },
  },
};
