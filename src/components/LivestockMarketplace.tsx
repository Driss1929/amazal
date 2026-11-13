import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  FileCheck2,
  MessageCircle,
  QrCode,
  Scale,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { FARM_IMAGES } from '../data/farmData';
import {
  buildWhatsAppInquiryUrl,
  type Language,
  type LivestockListing,
  type LivestockSpecies,
} from '../utils/farmLogic';
import { ResilientImage } from './ResilientImage';

export const INITIAL_LIVESTOCK_LISTINGS: LivestockListing[] = [
  {
    id: 'animal-cow-104',
    animalCode: 'AF-COW-104',
    species: 'cattle',
    name: {
      en: 'High-Yield Holstein-Montbéliarde Dairy Cow',
      fr: 'Vache Laitière Holstein-Montbéliarde',
      ar: 'بقرة حلوب هولشتاين-مونبيليارد عالية الإنتاج',
    },
    breed: {
      en: 'Montbéliarde Cross · Adapted to Souss Climate',
      fr: 'Croisée Montbéliarde · Adaptée au Souss',
      ar: 'سلالة مونبيليارد متأقلمة مع مناخ سوس',
    },
    ageMonths: 36,
    gender: 'female',
    weightKg: 580,
    healthAndVaccination: {
      en: 'Vaccinated (FMD, Brucellosis negative, Enterotoxemia) · Vet Certificate Ready',
      fr: 'Vaccinée (Fièvre aphteuse, Entérotoxémie) · Certificat Vétérinaire à Jour',
      ar: 'ملقحة بالكامل (الحمى القلاعية والتسمم المعوي) · شهادة بيطرية جاهزة',
    },
    milkYieldLitersPerDay: 24,
    priceMad: 22500,
    negotiable: true,
    eidSpecial: false,
    available: true,
    imagePath: FARM_IMAGES.cattleCalves,
    lastVetCheckDate: '2026-11-02',
    nextVaccineNote: {
      en: 'Booster scheduled in 4 months · Calm milking temperament',
      fr: 'Rappel prévu dans 4 mois · Tempérament calme à la traite',
      ar: 'التذكير القادم بعد 4 أشهر · هادئة جداً أثناء الحلب',
    },
  },
  {
    id: 'animal-bull-112',
    animalCode: 'AF-BULL-112',
    species: 'cattle',
    name: {
      en: 'Charolais-Local Beef Bull (Fattening Stock)',
      fr: 'Taurillon à Viande (Élevage Fourrager)',
      ar: 'عجل تسمين ممتاز (تغذية طبيعية بالفصة والشعير)',
    },
    breed: {
      en: 'Charolais × Atlas Local Cross',
      fr: 'Croisé Charolais × Race Locale',
      ar: 'سلالة شارولي مهجنة محلياً',
    },
    ageMonths: 20,
    gender: 'male',
    weightKg: 465,
    healthAndVaccination: {
      en: 'Full vaccination & deworming log · Raised on green alfalfa & barley',
      fr: 'Suivi vaccinal complet · Nourri à la luzerne verte et à l’orge',
      ar: 'سجل تلقيح كامل · تغذية طبيعية من الفصة الخضراء والشعير',
    },
    priceMad: 16800,
    negotiable: true,
    eidSpecial: true,
    available: true,
    imagePath: FARM_IMAGES.cattleCalves,
    lastVetCheckDate: '2026-11-05',
    nextVaccineNote: {
      en: 'Cleared for immediate sale or Eid Al-Adha reservation',
      fr: 'Prêt pour vente directe ou réservation Aïd Al-Adha',
      ar: 'جاهز للبيع المباشر أو الحجز لعيد الأضحى',
    },
  },
  {
    id: 'animal-calf-208',
    animalCode: 'AF-CALF-208',
    species: 'calves',
    name: {
      en: 'Weaned Heifer Calf (Future Dairy Stock)',
      fr: 'Jeune Génisse Sevrée (Renouvellement Laitier)',
      ar: 'عجلة صغيرة مفطومة (ممتازة للتربية وتجديد القطيع)',
    },
    breed: {
      en: 'Pure Farm-Born Dairy Lineage',
      fr: 'Née à la Ferme · Lignée Laitière',
      ar: 'مواليد الضيعة · أصل حلوب ممتاز',
    },
    ageMonths: 8,
    gender: 'female',
    weightKg: 195,
    healthAndVaccination: {
      en: 'Colostrum-fed from birth · Primary vaccinations completed',
      fr: 'Nourrie au lait maternel de la ferme · Primo-vaccination effectuée',
      ar: 'رضاعة طبيعية منذ الولادة · التلقيحات الأولية مكتملة',
    },
    priceMad: 8500,
    negotiable: true,
    eidSpecial: false,
    available: true,
    imagePath: FARM_IMAGES.cattleCalves,
    lastVetCheckDate: '2026-10-28',
    nextVaccineNote: {
      en: 'Rapid healthy weight gain (+0.9 kg/day)',
      fr: 'Croissance régulière (+0,9 kg/jour)',
      ar: 'نمو صحي متوازن (+0.9 كلغ يومياً)',
    },
  },
  {
    id: 'animal-sheep-312',
    animalCode: 'AF-SHP-312',
    species: 'sheep',
    name: {
      en: 'Sardi & Timahdite Pasture Ram (Eid & Occasions)',
      fr: 'Mouton Sardi & Timahdite de Pâturage (Aïd & Occasions)',
      ar: 'خروف سردي وتمحضيت رعي طبيعي (مناسب لعيد الأضحى والمناسبات)',
    },
    breed: {
      en: 'Moroccan Sardi · Natural Souss Grazing',
      fr: 'Race Sardi Marocaine · Pâturage Naturel',
      ar: 'سلالة السردي المغربية · رعي طبيعي بسهل سوس',
    },
    ageMonths: 14,
    gender: 'male',
    weightKg: 62,
    healthAndVaccination: {
      en: 'Vaccinated against Sheep Pox & Enterotoxemia · Official Ear Tag',
      fr: 'Vacciné Clavelée & Entérotoxémie · Boucle d’Identification',
      ar: 'ملقح ضد الجدري والتسمم المعوي · ترقيم صحي موثق',
    },
    priceMad: 3200,
    negotiable: true,
    eidSpecial: true,
    available: true,
    imagePath: FARM_IMAGES.sheepGoats,
    lastVetCheckDate: '2026-11-08',
    nextVaccineNote: {
      en: 'On-farm holding available until Eid Al-Adha delivery',
      fr: 'Garde à la ferme possible jusqu’à l’Aïd Al-Adha',
      ar: 'إمكانية الرعاية بالضيعة إلى غاية موعد التسليم',
    },
  },
  {
    id: 'animal-goat-405',
    animalCode: 'AF-GOAT-405',
    species: 'goats',
    name: {
      en: 'Atlas Foothills Dairy & Grazing Goat',
      fr: 'Chèvre Locale de l’Atlas (Lait & Élevage)',
      ar: 'ماعز محلي أصيل متأقلم مع مراعي تارودانت والأطلس',
    },
    breed: {
      en: 'Beni Guil / Atlas Hardy Local Breed',
      fr: 'Race Locale Rustique de l’Atlas',
      ar: 'سلالة محلية قوية متأقلمة مع شجر الأركان والزيتون',
    },
    ageMonths: 18,
    gender: 'female',
    weightKg: 42,
    healthAndVaccination: {
      en: 'Pasture-raised on argan/olive foothills · Vet inspected',
      fr: 'Élevée en parcours naturel · Contrôle vétérinaire validé',
      ar: 'رعي حر في المراعي الطبيعية · مراقبة بيطرية دورية',
    },
    milkYieldLitersPerDay: 2.5,
    priceMad: 1850,
    negotiable: true,
    eidSpecial: true,
    available: true,
    imagePath: FARM_IMAGES.sheepGoats,
    lastVetCheckDate: '2026-11-01',
    nextVaccineNote: {
      en: 'Excellent health & high rusticity',
      fr: 'Excellente santé et grande rusticité',
      ar: 'صحة ممتازة وقدرة عالية على التأقلم',
    },
  },
];

interface LivestockMarketplaceProps {
  language: Language;
  whatsappNumber: string;
}

export const LivestockMarketplace: React.FC<LivestockMarketplaceProps> = ({
  language,
  whatsappNumber,
}) => {
  const [selectedSpecies, setSelectedSpecies] = useState<
    LivestockSpecies | 'all' | 'eid'
  >('all');
  const [selectedPassportAnimal, setSelectedPassportAnimal] =
    useState<LivestockListing | null>(null);

  const labels = {
    en: {
      kicker: 'Dedicated Livestock Marketplace · Taroudant Herd',
      title: 'Cattle, Calves, Sheep & Goats — Individual Animal Listings',
      subtitle:
        'Every animal at Atlas Farm Taroudant is registered with a unique identification code, documented weight, age, breed, and veterinary vaccination history. Inspect on-site in Taroudant or request a live WhatsApp video walkaround.',
      filters: {
        all: 'All Livestock (5)',
        cattle: 'Dairy & Beef Cattle',
        calves: 'Young Calves',
        sheep: 'Sheep (Sardi & Local)',
        goats: 'Atlas Goats',
        eid: 'Eid Al-Adha Selection',
      },
      ageLabel: 'Age',
      monthsUnit: 'months',
      weightLabel: 'Weight',
      genderLabel: 'Gender',
      female: 'Female',
      male: 'Male',
      milkYieldLabel: 'Daily Milk',
      priceLabel: 'Price (MAD)',
      negotiableBadge: 'Or On-Farm Negotiation',
      healthTitle: 'Documented Health & Vaccination:',
      passportBtn: 'Digital Animal Passport & QR',
      contactSellerBtn: 'Contact Seller on WhatsApp',
      videoCallNote: 'Live WhatsApp video inspection available upon request',
      modalClose: 'Close Digital Passport',
      lastVetLabel: 'Last Veterinary Inspection:',
      nextCareLabel: 'Health & Care Notes:',
    },
    fr: {
      kicker: 'Marché du Bétail · Troupeau d’Atlas Farm Taroudant',
      title: 'Bovins, Veaux, Moutons & Chèvres — Fiches Individuelles',
      subtitle:
        'Chaque animal dispose d’un code d’identification unique, de son âge, sa race, son poids, ainsi que de son suivi sanitaire et vaccinal. Visite sur place à Taroudant ou vidéo en direct sur WhatsApp.',
      filters: {
        all: 'Tout le Bétail (5)',
        cattle: 'Vaches & Bovins',
        calves: 'Veaux & Génisses',
        sheep: 'Moutons (Sardi)',
        goats: 'Chèvres de l’Atlas',
        eid: 'Sélection Aïd Al-Adha',
      },
      ageLabel: 'Âge',
      monthsUnit: 'mois',
      weightLabel: 'Poids',
      genderLabel: 'Sexe',
      female: 'Femelle',
      male: 'Mâle',
      milkYieldLabel: 'Production Lait',
      priceLabel: 'Prix (MAD)',
      negotiableBadge: 'Ou Négociation à la Ferme',
      healthTitle: 'Suivi Sanitaire & Vaccination :',
      passportBtn: 'Passeport Numérique & QR',
      contactSellerBtn: 'Contacter l’Éleveur (WhatsApp)',
      videoCallNote: 'Vidéo du bétail en direct disponible sur WhatsApp',
      modalClose: 'Fermer le Passeport',
      lastVetLabel: 'Dernier Contrôle Vétérinaire :',
      nextCareLabel: 'Notes Sanitaires :',
    },
    ar: {
      kicker: 'سوق الماشية الموثق · قطيع ضيعة أطلس تارودانت',
      title: 'الأبقار، العجول، الأغنام والماعز — بطاقات فردية مفصلة',
      subtitle:
        'كل رأس ماشية مسجل برقم تعريف خاص مع تحديد السن، السلالة، الوزن التقريبي، وسجل التلقيح والمتابعة البيطرية. المعاينة متاحة بعين المكان في تارودانت أو عبر فيديو مباشر على واتساب.',
      filters: {
        all: 'جميع الماشية (5)',
        cattle: 'الأبقار وعجول التسمين',
        calves: 'العجول الصغيرة',
        sheep: 'الأغنام (السردي)',
        goats: 'ماعز الأطلس',
        eid: 'عروض عيد الأضحى المبارك',
      },
      ageLabel: 'السن',
      monthsUnit: 'شهراً',
      weightLabel: 'الوزن',
      genderLabel: 'الجنس',
      female: 'أنثى',
      male: 'ذكر',
      milkYieldLabel: 'إنتاج الحليب',
      priceLabel: 'السعر (درهم)',
      negotiableBadge: 'أو قابل للتفاوض بالضيعة',
      healthTitle: 'السجل الصحي والتلقيح:',
      passportBtn: 'الجواز الصحي الرقمي (QR)',
      contactSellerBtn: 'تواصل مع البائع عبر واتساب',
      videoCallNote: 'إمكانية إرسال فيديو مباشر للماشية عبر واتساب',
      modalClose: 'إغلاق الجواز الرقمي',
      lastVetLabel: 'تاريخ آخر فحص بيطري:',
      nextCareLabel: 'ملاحظات الرعاية:',
    },
  }[language];

  const filteredAnimals = INITIAL_LIVESTOCK_LISTINGS.filter((item) => {
    if (selectedSpecies === 'all') return true;
    if (selectedSpecies === 'eid') return Boolean(item.eidSpecial);
    return item.species === selectedSpecies;
  });

  const filterButtons: Array<{
    key: LivestockSpecies | 'all' | 'eid';
    label: string;
  }> = [
    { key: 'all', label: labels.filters.all },
    { key: 'cattle', label: labels.filters.cattle },
    { key: 'calves', label: labels.filters.calves },
    { key: 'sheep', label: labels.filters.sheep },
    { key: 'goats', label: labels.filters.goats },
    { key: 'eid', label: labels.filters.eid },
  ];

  return (
    <section
      id="livestock-marketplace"
      className="py-16 lg:py-24 border-b border-[#1C251E]/10 bg-[#F2ECE1]/70"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-medium tracking-wide text-[#5C4033]">
              {labels.kicker}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A3A2A] tracking-tight text-balance">
              {labels.title}
            </h2>
            <p className="text-base text-[#3A473D] leading-relaxed">
              {labels.subtitle}
            </p>
          </div>

          <div className="text-xs font-medium text-[#5C4033] bg-[#FAF7F2] px-4 py-2.5 rounded-xl border border-[#1C251E]/10 shrink-0">
            {labels.videoCallNote}
          </div>
        </div>

        {/* Species & Eid Al-Adha Filter Bar */}
        <div
          role="group"
          aria-label="Livestock Marketplace Filters"
          className="mb-10 flex flex-wrap items-center gap-1.5 p-1.5 bg-[#FAF7F2] rounded-xl border border-[#1C251E]/10 w-fit"
        >
          {filterButtons.map((btn) => {
            const active = selectedSpecies === btn.key;
            return (
              <button
                key={btn.key}
                type="button"
                data-livestock-filter={btn.key}
                aria-pressed={active}
                onClick={() => setSelectedSpecies(btn.key)}
                className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[38px] ${
                  active
                    ? 'bg-[#1A3A2A] text-[#FAF7F2] shadow-xs'
                    : 'text-[#3A473D] hover:text-[#1A3A2A]'
                }`}
              >
                {btn.key === 'eid' && (
                  <Sparkles
                    className="w-3.5 h-3.5 inline-block me-1.5 text-[#B57B2E]"
                    aria-hidden="true"
                  />
                )}
                {btn.label}
              </button>
            );
          })}
        </div>

        {/* Livestock Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredAnimals.map((animal) => {
            const whatsappUrl = buildWhatsAppInquiryUrl({
              phone: whatsappNumber,
              customMessage: `Hello Atlas Farm Taroudant, I am interested in livestock listing ${animal.animalCode} (${animal.name[language]} — ${animal.weightKg} kg, ${animal.priceMad.toLocaleString()} MAD). Could you share a video and current availability?`,
              language,
            });

            return (
              <article
                key={animal.id}
                data-animal-code={animal.animalCode}
                className="flex flex-col rounded-2xl bg-[#FAF7F2] border border-[#1C251E]/12 overflow-hidden"
              >
                {/* 4:3 Animal Photo */}
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#EFEAE0] relative">
                  <ResilientImage
                    src={animal.imagePath}
                    alt={animal.name[language]}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 start-3 px-2.5 py-1 rounded-lg bg-[#1C251E]/85 text-[#FAF7F2] font-mono-tabular text-xs font-semibold">
                    ID: {animal.animalCode}
                  </div>
                  {animal.eidSpecial && (
                    <div className="absolute top-3 end-3 px-2.5 py-1 rounded-lg bg-[#5C4033] text-[#FAF7F2] text-xs font-semibold">
                      Eid Al-Adha Selection
                    </div>
                  )}
                </div>

                {/* Listing Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#5C4033]">
                      <span>{animal.breed[language]}</span>
                    </div>

                    <h3 className="text-lg font-bold text-[#1A3A2A]">
                      {animal.name[language]}
                    </h3>

                    {/* Key Biometric Specs (Age, Weight, Gender, Milk Yield) */}
                    <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#F2ECE1] border border-[#1C251E]/10 text-xs">
                      <div>
                        <span className="text-[#5C4033] block">
                          {labels.ageLabel}
                        </span>
                        <span className="font-mono-tabular font-semibold text-[#1A3A2A]">
                          {animal.ageMonths} {labels.monthsUnit}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#5C4033] block">
                          {labels.weightLabel}
                        </span>
                        <span className="font-mono-tabular font-semibold text-[#1A3A2A]">
                          {animal.weightKg} kg
                        </span>
                      </div>
                      <div>
                        <span className="text-[#5C4033] block">
                          {animal.milkYieldLitersPerDay
                            ? labels.milkYieldLabel
                            : labels.genderLabel}
                        </span>
                        <span className="font-mono-tabular font-semibold text-[#1A3A2A]">
                          {animal.milkYieldLitersPerDay
                            ? `${animal.milkYieldLitersPerDay} L/d`
                            : animal.gender === 'female'
                              ? labels.female
                              : labels.male}
                        </span>
                      </div>
                    </div>

                    {/* Health & Vaccination Information */}
                    <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#1C251E]/10 space-y-1 text-xs">
                      <div className="flex items-center gap-1.5 font-semibold text-[#1A3A2A]">
                        <ShieldCheck
                          className="w-4 h-4 text-[#1A3A2A] shrink-0"
                          aria-hidden="true"
                        />
                        <span>{labels.healthTitle}</span>
                      </div>
                      <p className="text-[#3A473D] leading-relaxed">
                        {animal.healthAndVaccination[language]}
                      </p>
                    </div>
                  </div>

                  {/* Price & Actions */}
                  <div className="pt-4 border-t border-[#1C251E]/10 space-y-3">
                    <div className="flex items-baseline justify-between gap-2">
                      <div>
                        <span className="text-xs text-[#5C4033] block">
                          {labels.priceLabel}
                        </span>
                        <span className="font-mono-tabular text-lg font-bold text-[#1A3A2A]">
                          {animal.priceMad.toLocaleString()} MAD
                        </span>
                      </div>
                      {animal.negotiable && (
                        <span className="text-xs font-medium text-[#5C4033]">
                          {labels.negotiableBadge}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#FAF7F2] bg-[#1A3A2A] hover:bg-[#254F3A] rounded-xl transition-colors whitespace-nowrap shrink-0 min-h-[42px]"
                      >
                        <MessageCircle
                          className="w-4 h-4 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{labels.contactSellerBtn}</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => setSelectedPassportAnimal(animal)}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-[#1A3A2A] bg-[#F2ECE1] hover:bg-[#E5DEC9] border border-[#1C251E]/15 rounded-xl transition-colors cursor-pointer min-h-[38px]"
                      >
                        <QrCode
                          className="w-3.5 h-3.5 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{labels.passportBtn}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Digital Animal Passport Modal */}
        {selectedPassportAnimal && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Digital Animal Passport ${selectedPassportAnimal.animalCode}`}
            className="fixed inset-0 z-50 bg-[#1C251E]/75 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setSelectedPassportAnimal(null)}
          >
            <div
              className="max-w-lg w-full rounded-2xl bg-[#FAF7F2] border border-[#1C251E]/20 p-6 sm:p-7 space-y-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 border-b border-[#1C251E]/10 pb-4">
                <div>
                  <span className="font-mono-tabular text-xs font-semibold text-[#5C4033]">
                    ATLAS FARM DIGITAL PASSPORT ·{' '}
                    {selectedPassportAnimal.animalCode}
                  </span>
                  <h3 className="font-display text-xl font-bold text-[#1A3A2A] mt-1">
                    {selectedPassportAnimal.name[language]}
                  </h3>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F2ECE1] border border-[#1C251E]/15">
                  <QrCode
                    className="w-8 h-8 text-[#1A3A2A]"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-[#2A382E]">
                <div className="flex items-center justify-between py-2 border-b border-[#1C251E]/10">
                  <span className="text-[#5C4033] font-medium">
                    Animal ID Code:
                  </span>
                  <span className="font-mono-tabular font-bold text-[#1A3A2A]">
                    {selectedPassportAnimal.animalCode}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-[#1C251E]/10">
                  <span className="text-[#5C4033] font-medium">
                    {labels.weightLabel} / {labels.ageLabel}:
                  </span>
                  <span className="font-mono-tabular font-semibold text-[#1A3A2A]">
                    {selectedPassportAnimal.weightKg} kg ·{' '}
                    {selectedPassportAnimal.ageMonths} {labels.monthsUnit}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-[#1C251E]/10">
                  <span className="text-[#5C4033] font-medium">
                    {labels.lastVetLabel}
                  </span>
                  <span className="font-mono-tabular font-semibold text-[#1A3A2A]">
                    {selectedPassportAnimal.lastVetCheckDate}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F2ECE1] space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold text-[#1A3A2A]">
                    <FileCheck2 className="w-4 h-4" aria-hidden="true" />
                    <span>{labels.healthTitle}</span>
                  </div>
                  <p className="text-xs text-[#3A473D]">
                    {selectedPassportAnimal.healthAndVaccination[language]}
                  </p>
                  <p className="text-xs font-medium text-[#5C4033] pt-1">
                    {labels.nextCareLabel}{' '}
                    {selectedPassportAnimal.nextVaccineNote[language]}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedPassportAnimal(null)}
                  className="px-4 py-2 text-xs font-semibold text-[#FAF7F2] bg-[#1A3A2A] rounded-xl cursor-pointer"
                >
                  {labels.modalClose}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
