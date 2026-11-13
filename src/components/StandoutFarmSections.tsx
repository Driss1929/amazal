import React, { useState } from 'react';
import {
  Sun,
  Sparkles,
  Calendar,
  Compass,
  Building2,
  CheckCircle2,
  MessageCircle,
} from 'lucide-react';
import { FARM_IMAGES } from '../data/farmData';
import { buildWhatsAppInquiryUrl, type Language } from '../utils/farmLogic';
import { ResilientImage } from './ResilientImage';

interface StandoutFarmSectionsProps {
  language: Language;
  whatsappNumber: string;
}

type SeasonKey = 'spring' | 'summer' | 'autumn' | 'winter';

export const StandoutFarmSections: React.FC<StandoutFarmSectionsProps> = ({
  language,
  whatsappNumber,
}) => {
  const [activeSeason, setActiveSeason] = useState<SeasonKey>('spring');

  // Farm Experience Booking state
  const [visitType, setVisitType] = useState('family');
  const [visitDate, setVisitDate] = useState(() => {
    const d = new Date(Date.now() + 3 * 86400000);
    return d.toISOString().split('T')[0];
  });
  const [visitorsCount, setVisitorsCount] = useState(4);
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [visitSubmitted, setVisitSubmitted] = useState(false);

  // B2B Wholesale Portal state
  const [businessType, setBusinessType] = useState('Restaurant / Traditional Kitchen');
  const [businessName, setBusinessName] = useState('');
  const [dailyMilkNeed, setDailyMilkNeed] = useState(25);
  const [deliveryFrequency, setDeliveryFrequency] = useState('Every Morning (7 Days / Week)');
  const [b2bPhone, setB2bPhone] = useState('');
  const [b2bSubmitted, setB2bSubmitted] = useState(false);

  const copy = {
    en: {
      // 5. From Farm to Table
      storyEyebrow: '5. From Farm to Table · Traceable Heritage',
      storyTitle: 'How Every Liter of Milk Travels from Our Pastures to Your Table',
      storySubtitle:
        'Transparency is the foundation of rural trust in Taroudant. Follow our 4-step daily routine from dawn alfalfa grazing to chilled morning delivery.',
      steps: [
        {
          step: '01 · 05:30 AM',
          title: 'Souss Valley Alfalfa & Natural Grazing',
          desc: 'Our cattle wake to clean mountain air, fresh well water from the High Atlas aquifer, and organic Taroudant alfalfa.',
          image: FARM_IMAGES.heroLandscape,
          meta: '100% Natural Forage · Zero Hormones',
        },
        {
          step: '02 · 06:30 AM',
          title: 'Hygienic Morning Milking Parlour',
          desc: 'Automated stainless-steel milking preserves natural creaminess while preventing air exposure or contamination.',
          image: FARM_IMAGES.freshDairy,
          meta: '38°C -> 4°C Rapid Chilling · Daily Lab Test',
        },
        {
          step: '03 · 08:00 AM',
          title: 'Artisanal Preparation & Quality Seal',
          desc: 'Raw milk is bottled in food-grade containers, while traditional Lben, Raib, and Zebda Beldia are churned in small batches.',
          image: FARM_IMAGES.honeyEggsHarvest,
          meta: 'Batch Traceability · Souss Artisanal Method',
        },
        {
          step: '04 · 09:00 AM',
          title: 'Direct Farm Pickup & Taroudant Delivery',
          desc: 'Cold-chain vans deliver across Taroudant medina, Hay Mohammadi, and partner cafés within hours of milking.',
          image: FARM_IMAGES.cattleCalves,
          meta: 'Same-Morning Delivery · Direct Farm Gate',
        },
      ],

      // 6 & 7. Live Farm Updates & Seasonal Calendar
      updatesEyebrow: '6 & 7. Live Farm Updates & Seasonal Calendar',
      updatesTitle: 'Today on the Farm & Taroudant Agricultural Seasons',
      updatesLeftTitle: 'Live Farm Bulletin · Updated Daily',
      updatesList: [
        {
          time: 'Today · 07:00 AM',
          category: 'Fresh Dairy',
          title: '480 Liters of Morning Raw Milk Harvested & Chilled',
          detail: 'Density tested at 1.031 g/cm³. Available now for farm pickup and morning Taroudant delivery.',
        },
        {
          time: 'Ramadan Special',
          category: 'Morocco Adaptation',
          title: 'Ramadan Ftour Family Basket Now Open for Pre-Order',
          detail: 'Includes 2L Raw Milk, 2L Traditional Lben Beldi, 500g Zebda Beldia, and 500g Pure Souss Multi-floral Honey.',
        },
        {
          time: 'Eid Al-Adha Registry',
          category: 'Livestock Selection',
          title: 'Numbered Sardi & Timahdite Sheep Reserved with Free Boarding Until Eid',
          detail: 'Select your animal in person or via video call on WhatsApp (+212 655-607035) with full ear-tag health certification.',
        },
        {
          time: 'New Arrival',
          category: 'Herd Births',
          title: 'Two Healthy Montbéliarde Calves Born in Pasture Sector B',
          detail: 'Both calves passed veterinary colostrum and vitality checks under Dr. K. Bennani.',
        },
      ],
      calendarTitle: 'Taroudant Seasonal Harvest Calendar',
      calendarSubtitle: 'Discover what is freshly harvested across the four seasons in the Souss-Massa valley.',
      seasons: {
        spring: {
          label: 'Spring (Mar – May)',
          highlight: 'Peak Lush Grazing & Orange Blossom Honey',
          items: [
            { name: 'Morning Raw Cow Milk (Peak Cream)', status: 'Abundant Daily', note: 'Rich spring pasture beta-carotene' },
            { name: 'Traditional Lben & Zebda Beldia', status: 'Fresh Daily', note: 'Ideal for Couscous & Ramadan tables' },
            { name: 'Souss Orange Blossom Honey', status: 'Seasonal Harvest', note: 'Collected from Taroudant citrus groves' },
            { name: 'Weaned Dairy & Beef Calves', status: 'Available', note: 'Spring cohort vaccinated & tagged' },
          ],
        },
        summer: {
          label: 'Summer (Jun – Aug)',
          highlight: 'Eid Al-Adha Livestock & Chilled Lben',
          items: [
            { name: 'Refreshing Chilled Lben Beldi', status: 'High Demand', note: 'Churned every morning at 07:30 AM' },
            { name: 'Sardi & Timahdite Sheep', status: 'Eid Selection', note: 'Certified veterinary health tags' },
            { name: 'Atlas Thyme & Euphorbia Honey', status: 'Limited Harvest', note: 'High-mountain summer beehives' },
            { name: 'Sun-Ripened Souss Figs & Melons', status: 'Farm Gate Only', note: 'Harvested at dawn' },
          ],
        },
        autumn: {
          label: 'Autumn (Sep – Nov)',
          highlight: 'First Cold-Pressed Olive Oil & Almonds',
          items: [
            { name: 'New Harvest Extra Virgin Olive Oil', status: 'November Press', note: 'Cold-pressed Picholine Marocaine' },
            { name: 'Tafraoute & Atlas Sweet Almonds', status: 'Available', note: 'Sun-dried natural kernels' },
            { name: 'Full-Cream Farm Milk & Raib', status: 'Available Daily', note: 'Steady autumn forage diet' },
            { name: 'Breeding Heifers & Damascus Goats', status: 'By Reservation', note: 'Full pedigree documentation' },
          ],
        },
        winter: {
          label: 'Winter (Dec – Feb)',
          highlight: 'Taroudant Citrus, Amlou & Rich Butter',
          items: [
            { name: 'Souss Navel Oranges & Clementines', status: 'Peak Season', note: 'Picked fresh from orchard rows' },
            { name: 'Artisanal Zebda Beldia (Farm Butter)', status: 'Fresh Daily', note: 'High winter butterfat content' },
            { name: 'Fresh Free-Range Beldi Eggs', status: 'Daily Collection', note: 'Natural grain & pasture diet' },
            { name: 'Charolais & Limousin Young Bulls', status: 'Available', note: 'Winter conditioning program' },
          ],
        },
      },

      // 4. Farm Experience Booking
      expEyebrow: '4. Farm Experience Booking · Agritourism',
      expTitle: 'Visit Atlas Farm Taroudant in Person',
      expSubtitle:
        'Bring your family, school class, or agricultural delegation to experience authentic Souss farming, meet our herd, and taste fresh dairy.',
      expTypes: [
        { id: 'family', name: 'Family Farm & Milking Discovery', duration: '2 Hours · Morning or Afternoon', price: 'Free with Farm Purchase (or 80 MAD/family)' },
        { id: 'school', name: 'Educational School & Student Visit', duration: '2.5 Hours · Guided Workshop', price: '40 MAD / student' },
        { id: 'livestock', name: 'Livestock Buyer & Herd Inspection Tour', duration: '1.5 Hours · Private', price: 'Complimentary for Buyers' },
        { id: 'tasting', name: 'Traditional Souss Breakfast & Dairy Tasting', duration: '2 Hours · 09:00 AM', price: '95 MAD / person' },
      ],
      expFormTitle: 'Book Your Farm Visit',
      expDate: 'Preferred Date',
      expGuests: 'Number of Visitors',
      expName: 'Your Full Name',
      expPhone: 'Phone / WhatsApp',
      expSubmit: 'Reserve Visit & Get WhatsApp Confirmation',
      expSuccess: 'Visit reservation logged! Click below to send directly to our farm host on WhatsApp.',

      // 9. B2B Wholesale Portal
      b2bEyebrow: '9. B2B Wholesale Portal · Professional Supply',
      b2bTitle: 'Partner With Us for Daily Wholesale Dairy & Farm Supply',
      b2bSubtitle:
        'We supply restaurants, hotels, riads, cafés, patisseries, and grocery stores across Taroudant and Agadir with reliable morning deliveries and wholesale pricing.',
      b2bBenefits: [
        'Guaranteed 07:30 AM – 09:30 AM refrigerated delivery window',
        'Dedicated wholesale tier pricing from 7.20 MAD / Liter',
        'Consistent lab-tested fat & protein content for baristas and pastry chefs',
        'Monthly consolidated invoicing or flexible delivery settlement',
      ],
      b2bFormTitle: 'Request Wholesale Price List & Sample Delivery',
      b2bBizType: 'Business Category',
      b2bBizTypes: {
        restaurant: 'Restaurant / Traditional Kitchen',
        hotel: 'Hotel / Riad / Guesthouse',
        cafe: 'Café / Patisserie / Creamery',
        grocery: 'Grocery Store / Supermarket',
        distributor: 'Milk & Dairy Distributor',
      },
      b2bBizName: 'Business Name & City',
      b2bDailyVolume: 'Estimated Daily Milk Volume (Liters)',
      b2bFreq: 'Delivery Schedule',
      b2bFreqOptions: {
        daily: 'Every Morning (7 Days / Week)',
        weekdays: 'Monday – Saturday Mornings',
        triweekly: '3 Times per Week',
      },
      b2bSubmit: 'Generate Wholesale Quote & Send via WhatsApp',
      b2bSuccess: 'Wholesale quote prepared! Click the WhatsApp link to connect with our B2B manager.',
    },
    fr: {
      storyEyebrow: '5. De la Ferme à la Table · Traçabilité',
      storyTitle: 'Comment Chaque Litre de Lait Voyage de Nos Pâturages à Votre Table',
      storySubtitle:
        'La transparence est le socle de la confiance à Taroudant. Suivez notre routine quotidienne en 4 étapes, du pâturage à l’aube jusqu’à la livraison matinale.',
      steps: [
        {
          step: '01 · 05h30',
          title: 'Luzerne du Souss & Pâturage Naturel',
          desc: 'Nos bovins profitent de l’air pur, de l’eau de nappe phréatique du Haut Atlas et de la luzerne fraîche de Taroudant.',
          image: FARM_IMAGES.heroLandscape,
          meta: 'Fourrage 100% Naturel · Sans Hormones',
        },
        {
          step: '02 · 06h30',
          title: 'Salle de Traite Hygiénique du Matin',
          desc: 'La traite automatisée en inox préserve l’onctuosité naturelle tout en évitant toute exposition à l’air.',
          image: FARM_IMAGES.freshDairy,
          meta: 'Refroidissement 38°C -> 4°C · Contrôle Quotidien',
        },
        {
          step: '03 · 08h00',
          title: 'Préparation Artisanale & Scellé Qualité',
          desc: 'Le lait cru est mis en bouteille et nos Lben, Raib et Zebda Beldia sont barattés en petites cuvées.',
          image: FARM_IMAGES.honeyEggsHarvest,
          meta: 'Traçabilité par Lot · Savoir-Faire du Souss',
        },
        {
          step: '04 · 09h00',
          title: 'Retrait à la Ferme & Livraison Taroudant',
          desc: 'Nos véhicules frigorifiques livrent la médina de Taroudant, Hay Mohammadi et nos cafés partenaires.',
          image: FARM_IMAGES.cattleCalves,
          meta: 'Livraison le Matin Même · Vente Directe',
        },
      ],
      updatesEyebrow: '6 & 7. Actualités en Direct & Calendrier Saisonnier',
      updatesTitle: 'En Direct de la Ferme & Saisons Agricoles de Taroudant',
      updatesLeftTitle: 'Journal de la Ferme · Mis à Jour Quotidiennement',
      updatesList: [
        {
          time: 'Aujourd’hui · 07h00',
          category: 'Laiterie Fraîche',
          title: '480 Litres de Lait Cru Récoltés et Refroidis ce Matin',
          detail: 'Densité contrôlée à 1,031 g/cm³. Disponible pour retrait à la ferme et livraison à Taroudant.',
        },
        {
          time: 'Spécial Ramadan',
          category: 'Tradition Marocaine',
          title: 'Panier Famille Ftour Ramadan Ouvert aux Précommandes',
          detail: 'Comprend 2L Lait Cru, 2L Lben Beldi, 500g Zebda Beldia et 500g Miel multifleurs du Souss.',
        },
        {
          time: 'Registre Aïd Al-Adha',
          category: 'Sélection Cheptel',
          title: 'Moutons Sardi & Timahdite Numérotés avec Garde Gratuite jusqu’à l’Aïd',
          detail: 'Choisissez votre animal sur place ou par vidéo WhatsApp (+212 655-607035) avec certificat sanitaire.',
        },
        {
          time: 'Carnet Rose',
          category: 'Naissances',
          title: 'Deux Veaux Montbéliarde Nés en Parfaite Santé au Secteur B',
          detail: 'Bilan vétérinaire complet validé par Dr. K. Bennani.',
        },
      ],
      calendarTitle: 'Calendrier des Récoltes Saisonnières à Taroudant',
      calendarSubtitle: 'Découvrez les produits frais disponibles au fil des quatre saisons dans la vallée du Souss.',
      seasons: {
        spring: {
          label: 'Printemps (Mars – Mai)',
          highlight: 'Pâturages Verdoyants & Miel d’Oranger',
          items: [
            { name: 'Lait Cru du Matin (Crème Riche)', status: 'Abondant', note: 'Riche en bêta-carotène de printemps' },
            { name: 'Lben & Zebda Beldia Traditionnels', status: 'Frais chaque jour', note: 'Idéal pour Couscous et tables du Ramadan' },
            { name: 'Miel de Fleur d’Oranger du Souss', status: 'Récolte Saisonnière', note: 'Vergers d’agrumes de Taroudant' },
            { name: 'Veaux Sevrés Laitiers & Viande', status: 'Disponible', note: 'Vaccinés et bouclés' },
          ],
        },
        summer: {
          label: 'Été (Juin – Août)',
          highlight: 'Sélection Aïd Al-Adha & Lben Frais',
          items: [
            { name: 'Lben Beldi Rafraîchissant', status: 'Forte Demande', note: 'Baratté chaque matin à 07h30' },
            { name: 'Moutons Sardi & Timahdite', status: 'Sélection Aïd', note: 'Certificats vétérinaires officiels' },
            { name: 'Miel de Thym & Euphorbe de l’Atlas', status: 'Récolte Limitée', note: 'Ruchers de haute montagne' },
            { name: 'Figues & Melons du Souss', status: 'Vente à la Ferme', note: 'Cueillis à l’aube' },
          ],
        },
        autumn: {
          label: 'Automne (Sep – Nov)',
          highlight: 'Huile d’Olive Nouvelle & Amandes',
          items: [
            { name: 'Huile d’Olive Vierge Extra Nouvelle', status: 'Pressée en Novembre', note: 'Picholine Marocaine pressée à froid' },
            { name: 'Amandes Douces de l’Atlas', status: 'Disponible', note: 'Séchées naturellement au soleil' },
            { name: 'Lait Entier & Raib Artisanal', status: 'Quotidien', note: 'Alimentation fourragère équilibrée' },
            { name: 'Génisses & Chèvres Damascènes', status: 'Sur Réservation', note: 'Suivi généalogique complet' },
          ],
        },
        winter: {
          label: 'Hiver (Déc – Fév)',
          highlight: 'Agrumes de Taroudant & Beurre Fermier',
          items: [
            { name: 'Oranges Navel & Clémentines du Souss', status: 'Pleine Saison', note: 'Cueillies à maturité au verger' },
            { name: 'Zebda Beldia (Beurre Fermier)', status: 'Frais chaque jour', note: 'Taux de matière grasse hivernal élevé' },
            { name: 'Œufs Beldi Fermiers Plein Air', status: 'Collecte du Jour', note: 'Alimentation aux céréales naturelles' },
            { name: 'Jeunes Taureaux Charolais & Limousin', status: 'Disponible', note: 'Programme d’engraissement naturel' },
          ],
        },
      },
      expEyebrow: '4. Réservation d’Expériences à la Ferme · Agritourisme',
      expTitle: 'Visitez Atlas Farm Taroudant en Personne',
      expSubtitle:
        'Venez en famille, avec votre école ou en délégation professionnelle découvrir l’agriculture authentique du Souss et déguster nos produits laitiers.',
      expTypes: [
        { id: 'family', name: 'Visite Famille & Découverte de la Traite', duration: '2 Heures · Matin ou Après-midi', price: 'Gratuit avec achat (ou 80 MAD/famille)' },
        { id: 'school', name: 'Visite Pédagogique Scolaire & Étudiants', duration: '2h30 · Atelier Guidé', price: '40 MAD / élève' },
        { id: 'livestock', name: 'Inspection Privée du Cheptel (Acheteurs)', duration: '1h30 · Visite Privée', price: 'Offert aux Acheteurs' },
        { id: 'tasting', name: 'Petit-Déjeuner Beldi & Dégustation Laitière', duration: '2 Heures · 09h00', price: '95 MAD / personne' },
      ],
      expFormTitle: 'Réserver Votre Visite à la Ferme',
      expDate: 'Date Souhaitée',
      expGuests: 'Nombre de Visiteurs',
      expName: 'Nom Complet',
      expPhone: 'Téléphone / WhatsApp',
      expSubmit: 'Réserver & Confirmer sur WhatsApp',
      expSuccess: 'Demande prête ! Cliquez ci-dessous pour envoyer directement sur WhatsApp.',
      b2bEyebrow: '9. Portail Grossiste B2B · Approvisionnement Pro',
      b2bTitle: 'Devenez Partenaire pour Vos Livraisons Laitières Quotidiennes',
      b2bSubtitle:
        'Nous approvisionnons restaurants, hôtels, riads, cafés, pâtisseries et épiceries à Taroudant et Agadir avec des tarifs grossistes avantageux.',
      b2bBenefits: [
        'Créneau de livraison frigorifique garanti entre 07h30 et 09h30',
        'Tarif professionnel dégressif à partir de 7,20 MAD / Litre',
        'Taux de matière grasse constant idéal pour baristas et chefs pâtissiers',
        'Facturation mensuelle groupée ou règlement flexible à la livraison',
      ],
      b2bFormTitle: 'Demander la Grille Tarifaire Pro & un Échantillon',
      b2bBizType: 'Catégorie d’Établissement',
      b2bBizTypes: {
        restaurant: 'Restaurant / Cuisine Traditionnelle',
        hotel: 'Hôtel / Riad / Maison d’Hôtes',
        cafe: 'Café / Pâtisserie / Crèmerie',
        grocery: 'Épicerie Fine / Supermarché',
        distributor: 'Distributeur Laitier',
      },
      b2bBizName: 'Nom de l’Établissement & Ville',
      b2bDailyVolume: 'Volume Quotidien Estimé (Litres)',
      b2bFreq: 'Fréquence de Livraison',
      b2bFreqOptions: {
        daily: 'Chaque Matin (7j/7)',
        weekdays: 'Du Lundi au Samedi Matin',
        triweekly: '3 Fois par Semaine',
      },
      b2bSubmit: 'Générer l’Offre Pro & Envoyer sur WhatsApp',
      b2bSuccess: 'Offre B2B prête ! Cliquez sur le bouton WhatsApp pour contacter notre responsable.',
    },
    ar: {
      storyEyebrow: '5. من الضيعة إلى المائدة · مسار الجودة المضمونة',
      storyTitle: 'كيف ينتقل كل لتر حليب من مراعينا الخضراء إلى مائدتكم',
      storySubtitle:
        'الشفافية هي أساس الثقة في تارودانت. تابعوا رحلتنا اليومية في 4 مراحل من رعي الفصة عند الفجر إلى التوصيل الصباحي المبرد.',
      steps: [
        {
          step: '01 · 05:30 صباحاً',
          title: 'رعي الفصة الطبيعية ومياه الأطلس الكبير',
          desc: 'تستيقظ أبقارنا على هواء تارودانت النقي ومياه الآبار الجوفية العذبة وأعلاف الفصة الطبيعية 100%.',
          image: FARM_IMAGES.heroLandscape,
          meta: 'أعلاف طبيعية 100% · بدون هرمونات',
        },
        {
          step: '02 · 06:30 صباحاً',
          title: 'حلب صباحي صحي ومعقم',
          desc: 'يتم الحلب الآلي في تجهيزات من الفولاذ المقاوم للصدأ للحفاظ على القشدة الطبيعية ومنع أي تلوث.',
          image: FARM_IMAGES.freshDairy,
          meta: 'تبريد فوري إلى 4 درجات · فحص يومي',
        },
        {
          step: '03 · 08:00 صباحاً',
          title: 'تحضير تقليدي للبن والرايب والزبدة البلدية',
          desc: 'يُعبأ الحليب الطازج في قنينات صحية، بينما يُحضر اللبن البلدي والرايب والزبدة البلدية على الطريقة السوسية.',
          image: FARM_IMAGES.honeyEggsHarvest,
          meta: 'جودة مضمونة · أصالة منطقة سوس',
        },
        {
          step: '04 · 09:00 صباحاً',
          title: 'الاستلام من الضيعة أو التوصيل لتارودانت',
          desc: 'تنطلق سياراتنا المبردة لتوصيل الطلبات لمدينة تارودانت والمقاهي والعائلات في نفس الصباح.',
          image: FARM_IMAGES.cattleCalves,
          meta: 'توصيل في نفس الصباح · بيع مباشر',
        },
      ],
      updatesEyebrow: '6 و 7. أخبار الضيعة المباشرة والرزنامة الموسمية',
      updatesTitle: 'مستجدات الضيعة اليوم والمواسم الفلاحية في تارودانت',
      updatesLeftTitle: 'نشرة الضيعة المباشرة · تحديث يومي',
      updatesList: [
        {
          time: 'اليوم · 07:00 صباحاً',
          category: 'الحليب الطازج',
          title: 'إنتاج وتبريد 480 لتر من الحليب الطازج هذا الصباح',
          detail: 'تم فحص الكثافة والجودة بنجاح. متوفر الآن للاستلام من الضيعة أو التوصيل الصباحي.',
        },
        {
          time: 'عرض شهر رمضان',
          category: 'تقاليد مغربية',
          title: 'قفة الفطور الرمضاني العائلية متاحة الآن للحجز المسبق',
          detail: 'تتضمن 2 لتر حليب طازج، 2 لتر لبن بلدي، 500 غ زبدة بلدية، و500 غ عسل حر من سوس.',
        },
        {
          time: 'سجل عيد الأضحى',
          category: 'أضاحي العيد',
          title: 'أكباش الصردي وتمحضيت مرقمة مع رعاية مجانية في الضيعة حتى يوم العيد',
          detail: 'اختر أضحيتك مباشرة في الضيعة أو عبر مكالمة فيديو واتساب (+212 655-607035) مع شهادة صحية بيطرية.',
        },
        {
          time: 'مواليد القطيع',
          category: 'ولادات جديدة',
          title: 'ولادة عجلين من سلالة مونبيليارد بصحة ممتازة',
          detail: 'تم الفحص البيطري الشامل تحت إشراف الدكتور بناني.',
        },
      ],
      calendarTitle: 'رزنامة المنتوجات الموسمية في تارودانت',
      calendarSubtitle: 'تعرفوا على المنتوجات الطازجة المتوفرة عبر الفصول الأربعة في سهل سوس ماسة.',
      seasons: {
        spring: {
          label: 'الربيع (مارس – ماي)',
          highlight: 'ذروة المراعي الخضراء وعسل زهر البرتقال',
          items: [
            { name: 'حليب البقر الصباحي (غني بالقشدة)', status: 'متوفر بكثرة يومياً', note: 'غني بفيتامينات المراعي الربيعية' },
            { name: 'لبن بلدي وزبدة بلدية سوسية', status: 'طازج يومياً', note: 'مثالي للكسكس وموائد رمضان' },
            { name: 'عسل زهر البرتقال الحر', status: 'موسم الجني', note: 'من بساتين الحوامض بتارودانت' },
            { name: 'عجول مفطومة للتسمين والتربية', status: 'متوفر', note: 'ملقحة ومرقمة بالكامل' },
          ],
        },
        summer: {
          label: 'الصيف (يونيو – غشت)',
          highlight: 'أضاحي عيد الأضحى واللبن البلدي المبرد',
          items: [
            { name: 'لبن بلدي منعش ومبرد', status: 'طلب مرتفع', note: 'يُمخض كل صباح على الساعة 07:30' },
            { name: 'أكباش الصردي وتمحضيت', status: 'تشكيلة العيد', note: 'شواهد صحية بيطرية معتمدة' },
            { name: 'عسل الزعتر والدغموس الأطلسي', status: 'إنتاج محدود', note: 'مناحل جبال الأطلس الكبير' },
            { name: 'تين وبطيخ منطقة سوس', status: 'بالضيعة فقط', note: 'قطف الفجر الطازج' },
          ],
        },
        autumn: {
          label: 'الخريف (شتنبر – نونبر)',
          highlight: 'زيت الزيتون البكر الجديدة واللوز البلدي',
          items: [
            { name: 'زيت الزيتون البكر الممتاز (العصرة الأولى)', status: 'عصرة نونبر', note: 'عصر على البارد من زيتون تارودانت' },
            { name: 'لوز الأطلس وتافراوت الحلو', status: 'متوفر', note: 'مجفف طبيعياً تحت أشعة الشمس' },
            { name: 'حليب كامل الدسم ورايب بلدي', status: 'متوفر يومياً', note: 'تغذية علفية متوازنة' },
            { name: 'عجلات عشار وماعز دمشقي', status: 'بالحجز المسبق', note: 'سجل نسلي وبيطري كامل' },
          ],
        },
        winter: {
          label: 'الشتاء (دجنبر – فبراير)',
          highlight: 'حوامض تارودانت والزبدة البلدية الغنية',
          items: [
            { name: 'برتقال نافيل وكليمنتين سوس', status: 'ذروة الموسم', note: 'مقطوف طازجاً من أشجار الضيعة' },
            { name: 'زبدة بلدية ممتازة', status: 'طازج يومياً', note: 'نسبة دهون طبيعية عالية في الشتاء' },
            { name: 'بيض بلدي طبيعي', status: 'جمع يومي', note: 'تغذية طبيعية بالحبوب والمراعي' },
            { name: 'عجول شاروليه وليموزين', status: 'متوفر', note: 'برنامج تسمين طبيعي' },
          ],
        },
      },
      expEyebrow: '4. حجز زيارات وتجارب الضيعة · السياحة الفلاحية',
      expTitle: 'زوروا ضيعة أطلس تارودانت عن قرب',
      expSubtitle:
        'استمتعوا بزيارة عائلية أو مدرسية أو مهنية لاكتشاف الفلاحة السوسية الأصيلة والتعرف على القطيع وتذوق منتجات الحليب الطازجة.',
      expTypes: [
        { id: 'family', name: 'زيارة عائلية واكتشاف عملية الحلب', duration: 'ساعتان · صباحاً أو مساءً', price: 'مجاناً مع الشراء من الضيعة (أو 80 درهم للعائلة)' },
        { id: 'school', name: 'زيارة تربوية للمدارس والطلبة', duration: 'ساعتان ونصف · ورشة مؤطرة', price: '40 درهم / تلميذ' },
        { id: 'livestock', name: 'جولة خاصة لمعاينة الماشية للمشترين', duration: 'ساعة ونصف · زيارة خاصة', price: 'مجانية للمشترين' },
        { id: 'tasting', name: 'فطور سوسي بلدي وتذوق منتجات الحليب', duration: 'ساعتان · 09:00 صباحاً', price: '95 درهم / شخص' },
      ],
      expFormTitle: 'احجز موعد زيارتك للضيعة',
      expDate: 'التاريخ المفضل',
      expGuests: 'عدد الزوار',
      expName: 'الاسم الكامل',
      expPhone: 'رقم الهاتف / واتساب',
      expSubmit: 'تأكيد حجز الزيارة عبر واتساب',
      expSuccess: 'تم تجهيز طلب الزيارة! اضغط على زر واتساب لتأكيد الموعد مباشرة.',
      b2bEyebrow: '9. بوابة البيع بالجملة للمهنيين · B2B',
      b2bTitle: 'شريككم الموثوق لتزويد المطاعم والفنادق والمقاهي يومياً',
      b2bSubtitle:
        'نزود المطاعم والفنادق والرياضات والمقاهي والمخابز والمحلات التجارية في تارودانت وأكادير بالحليب الطازج ومشتقاته بأسعار الجملة.',
      b2bBenefits: [
        'توصيل مبرد مضمون كل صباح بين الساعة 07:30 و 09:30',
        'أسعار تفضيلية للمهنيين ابتداءً من 7.20 درهم للتر',
        'جودة قشدة ثابتة ومثالية لتحضير القهوة والحلويات',
        'فوترة شهرية موحدة أو أداء مرن عند التسليم',
      ],
      b2bFormTitle: 'اطلب لائحة أسعار الجملة وعينة مجانية',
      b2bBizType: 'نوع المؤسسة',
      b2bBizTypes: {
        restaurant: 'مطعم / مطبخ تقليدي',
        hotel: 'فندق / رياض / دار ضيافة',
        cafe: 'مقهى / مخبزة وحلويات / محلبة',
        grocery: 'متجر بقالة / سوبرماركت',
        distributor: 'موزع حليب ومشتقاته',
      },
      b2bBizName: 'اسم المؤسسة والمدينة',
      b2bDailyVolume: 'الكمية اليومية المقدرة (باللتر)',
      b2bFreq: 'وتيرة التوصيل',
      b2bFreqOptions: {
        daily: 'كل صباح (7 أيام في الأسبوع)',
        weekdays: 'من الإثنين إلى السبت صباحاً',
        triweekly: '3 مرات في الأسبوع',
      },
      b2bSubmit: 'إعداد عرض الجملة والتواصل عبر واتساب',
      b2bSuccess: 'تم تسجيل طلبكم المهني! اضغط أدناه للتواصل المباشر عبر واتساب.',
    },
  }[language];

  const chosenExp = copy.expTypes.find((x) => x.id === visitType) || copy.expTypes[0];
  const experienceWhatsappUrl = buildWhatsAppInquiryUrl({
    phone: whatsappNumber,
    customMessage: `Farm Visit Booking: ${chosenExp.name} on ${visitDate} for ${visitorsCount} guests (${visitorName || 'Guest'} - ${visitorPhone || 'N/A'}).`,
    language,
  });

  const b2bWhatsappUrl = buildWhatsAppInquiryUrl({
    phone: whatsappNumber,
    customMessage: `B2B Wholesale Request: ${businessName || 'Partner'} (${businessType}), Est. ${dailyMilkNeed} L/day (${deliveryFrequency}), Tel: ${b2bPhone || 'N/A'}.`,
    language,
  });

  const activeSeasonData = copy.seasons[activeSeason];

  return (
    <>
      {/* 5. From Farm to Table Storytelling */}
      <section id="farm-to-table" className="py-16 lg:py-24 bg-[#FAF7F2] border-b border-[#1C251E]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12 space-y-3">
            <p className="text-xs font-medium tracking-wide text-[#5C4033]">
              {copy.storyEyebrow}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A3A2A] tracking-tight">
              {copy.storyTitle}
            </h2>
            <p className="text-base text-[#3A473D] leading-relaxed">{copy.storySubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {copy.steps.map((item, index) => (
              <article
                key={item.step}
                className="bg-[#F2ECE1] rounded-2xl border border-[#1C251E]/12 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-[#1A3A2A]">
                    <ResilientImage
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C251E]/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 inset-x-4 flex items-center justify-between text-[#FAF7F2]">
                      <span className="text-xs font-mono-tabular uppercase tracking-wider">
                        {item.step}
                      </span>
                      <span className="w-7 h-7 rounded-lg bg-[#1A3A2A] border border-white/20 flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-[#1A3A2A] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#3A473D] leading-relaxed mb-4">{item.desc}</p>
                  </div>
                </div>
                <div className="px-5 py-3 bg-[#FAF7F2] border-t border-[#1C251E]/10 text-xs font-medium text-[#1A3A2A]">
                  {item.meta}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Live Farm Updates & Morocco Adaptations */}
      <section id="live-updates" className="py-16 lg:py-20 bg-[#F2ECE1]/70 border-b border-[#1C251E]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div className="max-w-3xl space-y-2">
              <p className="text-xs font-medium tracking-wide text-[#5C4033]">
                {copy.updatesEyebrow}
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1A3A2A]">
                {copy.updatesLeftTitle}
              </h2>
            </div>
            <span className="text-xs font-mono-tabular text-[#5C4033] bg-[#FAF7F2] px-3.5 py-2 rounded-xl border border-[#1C251E]/10">
              Taroudant · Souss-Massa
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {copy.updatesList.map((upd, idx) => (
              <article
                key={idx}
                className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#1C251E]/12 flex flex-col justify-between space-y-3"
              >
                <div>
                  <p className="text-xs text-[#5C4033] mb-1.5">
                    <span className="font-semibold text-[#1A3A2A]">{upd.category}</span> · {upd.time}
                  </p>
                  <h3 className="text-sm font-bold text-[#1A3A2A] mb-2">{upd.title}</h3>
                  <p className="text-xs text-[#3A473D] leading-relaxed">{upd.detail}</p>
                </div>
                <div className="pt-2 border-t border-[#1C251E]/10 flex items-center gap-1.5 text-[11px] font-medium text-[#1A3A2A]">
                  <Sparkles className="w-3.5 h-3.5 text-[#5C4033]" />
                  <span>Atlas Farm Daily Log</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4 & 9. Farm Experience Booking + B2B Wholesale Portal */}
      <section id="farm-experiences" className="py-16 lg:py-24 bg-[#FAF7F2] border-b border-[#1C251E]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* 4. Farm Experience Booking (6 cols) */}
            <div className="lg:col-span-6 bg-[#F2ECE1] rounded-2xl border border-[#1C251E]/12 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <p className="text-xs font-medium tracking-wide text-[#5C4033] mb-2">
                  {copy.expEyebrow}
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1A3A2A] mb-2">
                  {copy.expTitle}
                </h2>
                <p className="text-sm text-[#3A473D] leading-relaxed mb-6">{copy.expSubtitle}</p>

                <div className="space-y-2.5 mb-6">
                  {copy.expTypes.map((exp) => (
                    <div
                      key={exp.id}
                      onClick={() => setVisitType(exp.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        visitType === exp.id
                          ? 'border-[#1A3A2A] bg-[#FAF7F2]'
                          : 'border-[#1C251E]/12 bg-[#FAF7F2]/60 hover:border-[#5C4033]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-bold text-[#1A3A2A]">{exp.name}</span>
                        <span className="text-xs font-mono-tabular font-semibold text-[#5C4033]">
                          {exp.price}
                        </span>
                      </div>
                      <p className="text-xs text-[#3A473D] mt-1">{exp.duration}</p>
                    </div>
                  ))}
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setVisitSubmitted(true);
                }}
                className="space-y-4 pt-4 border-t border-[#1C251E]/10"
              >
                <h3 className="text-base font-bold text-[#1A3A2A] flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#1A3A2A]" />
                  {copy.expFormTitle}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#1A3A2A] mb-1">
                      {copy.expDate}
                    </label>
                    <input
                      type="date"
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      required
                      className="w-full px-3.5 py-2 rounded-xl border border-[#1C251E]/20 bg-[#FAF7F2] text-sm text-[#1C251E]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1A3A2A] mb-1">
                      {copy.expGuests}
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={60}
                      value={visitorsCount}
                      onChange={(e) => setVisitorsCount(Number(e.target.value) || 1)}
                      required
                      className="w-full px-3.5 py-2 rounded-xl border border-[#1C251E]/20 bg-[#FAF7F2] text-sm text-[#1C251E]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#1A3A2A] mb-1">
                      {copy.expName}
                    </label>
                    <input
                      type="text"
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      required
                      placeholder="Karim / Fatima..."
                      className="w-full px-3.5 py-2 rounded-xl border border-[#1C251E]/20 bg-[#FAF7F2] text-sm text-[#1C251E]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1A3A2A] mb-1">
                      {copy.expPhone}
                    </label>
                    <input
                      type="tel"
                      value={visitorPhone}
                      onChange={(e) => setVisitorPhone(e.target.value)}
                      required
                      placeholder="+212 6..."
                      className="w-full px-3.5 py-2 rounded-xl border border-[#1C251E]/20 bg-[#FAF7F2] text-sm text-[#1C251E]"
                    />
                  </div>
                </div>

                {visitSubmitted && (
                  <p className="text-xs font-medium text-[#1A3A2A] bg-[#FAF7F2] p-3 rounded-xl border border-[#1C251E]/15">
                    {copy.expSuccess}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    type="submit"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1A3A2A] hover:bg-[#254F3A] text-[#FAF7F2] text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Compass className="w-4 h-4" />
                    {copy.expSubmit}
                  </button>
                  <a
                    href={experienceWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#1C251E]/20 text-[#1A3A2A] text-xs font-semibold whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                </div>
              </form>
            </div>

            {/* 9. B2B Wholesale Portal (6 cols) */}
            <div
              id="b2b-portal"
              className="lg:col-span-6 bg-[#1A3A2A] text-[#FAF7F2] rounded-2xl border border-[#1C251E]/20 p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-[#EFEAE0]/80 font-semibold mb-2">
                  {copy.b2bEyebrow}
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#FAF7F2] mb-2">
                  {copy.b2bTitle}
                </h2>
                <p className="text-sm text-[#EFEAE0]/85 leading-relaxed mb-6">{copy.b2bSubtitle}</p>

                <ul className="space-y-2.5 mb-6">
                  {copy.b2bBenefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#FAF7F2]">
                      <CheckCircle2 className="w-4 h-4 text-[#EFEAE0] shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setB2bSubmitted(true);
                }}
                className="space-y-4 pt-5 border-t border-white/15"
              >
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#EFEAE0]" />
                  {copy.b2bFormTitle}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#EFEAE0] mb-1">
                      {copy.b2bBizType}
                    </label>
                    <select
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-white/20 bg-[#142C20] text-sm text-white"
                    >
                      {Object.entries(copy.b2bBizTypes).map(([k, label]) => (
                        <option key={k} value={label}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#EFEAE0] mb-1">
                      {copy.b2bBizName}
                    </label>
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      required
                      placeholder="Riad / Café Taroudant..."
                      className="w-full px-3.5 py-2 rounded-xl border border-white/20 bg-[#142C20] text-sm text-white placeholder-white/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#EFEAE0] mb-1">
                      {copy.b2bDailyVolume}
                    </label>
                    <input
                      type="number"
                      min={5}
                      max={1000}
                      value={dailyMilkNeed}
                      onChange={(e) => setDailyMilkNeed(Number(e.target.value) || 10)}
                      required
                      className="w-full px-3.5 py-2 rounded-xl border border-white/20 bg-[#142C20] text-sm text-white font-mono-tabular"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#EFEAE0] mb-1">
                      {copy.b2bFreq}
                    </label>
                    <select
                      value={deliveryFrequency}
                      onChange={(e) => setDeliveryFrequency(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-white/20 bg-[#142C20] text-sm text-white"
                    >
                      {Object.entries(copy.b2bFreqOptions).map(([k, label]) => (
                        <option key={k} value={label}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#EFEAE0] mb-1">
                      WhatsApp / Tel
                    </label>
                    <input
                      type="tel"
                      value={b2bPhone}
                      onChange={(e) => setB2bPhone(e.target.value)}
                      required
                      placeholder="+212 6..."
                      className="w-full px-3.5 py-2 rounded-xl border border-white/20 bg-[#142C20] text-sm text-white placeholder-white/40"
                    />
                  </div>
                </div>

                {b2bSubmitted && (
                  <p className="text-xs font-medium text-[#FAF7F2] bg-white/10 p-3 rounded-xl">
                    {copy.b2bSuccess}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    type="submit"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FAF7F2] hover:bg-[#F2ECE1] text-[#1A3A2A] text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Building2 className="w-4 h-4" />
                    {copy.b2bSubmit}
                  </button>
                  <a
                    href={b2bWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-[#142C20] border border-white/20 text-[#FAF7F2] text-xs font-semibold whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp B2B
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
