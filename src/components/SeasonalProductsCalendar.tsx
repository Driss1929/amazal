import React, { useState } from 'react';
import {
  Calendar,
  CloudRain,
  Leaf,
  MessageCircle,
  Snowflake,
  Sparkles,
  Sun,
} from 'lucide-react';
import {
  buildWhatsAppInquiryUrl,
  filterSeasonalCalendarItems,
  INITIAL_SEASONAL_CALENDAR_ITEMS,
  type AgriculturalSeason,
  type Language,
  type MonthNumber,
  type ProductCategory,
} from '../utils/farmLogic';

interface SeasonalProductsCalendarProps {
  language: Language;
  whatsappNumber: string;
}

const ALL_MONTHS: MonthNumber[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const SeasonalProductsCalendar: React.FC<
  SeasonalProductsCalendarProps
> = ({ language, whatsappNumber }) => {
  const [selectedSeason, setSelectedSeason] = useState<
    AgriculturalSeason | 'all'
  >('all');
  const [selectedMonth, setSelectedMonth] = useState<MonthNumber | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<
    ProductCategory | 'all'
  >('all');

  const copy = {
    en: {
      eyebrow: '7. Seasonal Products Calendar · Taroudant Agricultural Year',
      title: 'Farm Availability Organized by Season & Month',
      subtitle:
        'Explore what is harvested, churned, and raised across the four agricultural seasons and all 12 months in the Souss-Massa valley. Filter by season, click any month from January to December, or filter by farm category.',
      seasonFilterLabel: 'Filter by Agricultural Season:',
      seasons: {
        all: 'All 4 Seasons',
        spring: 'Spring (Mar – May)',
        summer: 'Summer (Jun – Aug)',
        autumn: 'Autumn (Sep – Nov)',
        winter: 'Winter (Dec – Feb)',
      },
      seasonHighlights: {
        all: 'Year-Round Daily Raw Milk, Pasture Livestock & Seasonal Souss Harvests',
        spring:
          'Spring Peak: Lush Green Alfalfa Grazing, Peak Cream Milk & Orange Blossom Honey',
        summer:
          'Summer Peak: Eid Al-Adha Sardi Sheep Selection, Chilled Lben & High Atlas Thyme Honey',
        autumn:
          'Autumn Peak: First Cold-Pressed Extra Virgin Olive Oil, Sweet Almonds & Heifer Calves',
        winter:
          'Winter Peak: Taroudant Navel Oranges, Clementines, Rich Farm Butter & Country Eggs',
      },
      monthFilterLabel: 'Filter by Month of the Year:',
      allMonthsBtn: 'All 12 Months',
      monthNamesShort: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      monthNamesFull: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      categoryFilterLabel: 'Category:',
      categories: {
        all: 'All Farm Products',
        dairy: 'Fresh Dairy',
        livestock: 'Livestock & Herd',
        farm_goods: 'Honey, Olive Oil & Harvest',
      },
      legendPeak: 'Peak Harvest / Best Quality',
      legendAvailable: 'Available on Farm',
      legendOff: 'Out of Season',
      timelineHeader: '12-Month Taroudant Availability Timeline:',
      priceLabel: 'Indicative Price:',
      inquireBtn: 'Reserve / Inquire for This Season',
      resetBtn: 'Reset Calendar Filters',
      showingCount: (count: number) =>
        `Showing ${count} seasonal farm offering${count === 1 ? '' : 's'}`,
    },
    fr: {
      eyebrow:
        '7. Calendrier des Produits Saisonniers · Année Agricole à Taroudant',
      title: 'Disponibilité des Produits par Saison et par Mois',
      subtitle:
        'Découvrez les produits récoltés, barattés et élevés au fil des quatre saisons et des 12 mois de l’année dans la vallée du Souss-Massa. Filtrez par saison, par mois (Janvier à Décembre) ou par catégorie.',
      seasonFilterLabel: 'Filtrer par Saison Agricole :',
      seasons: {
        all: 'Toutes les Saisons',
        spring: 'Printemps (Mars – Mai)',
        summer: 'Été (Juin – Août)',
        autumn: 'Automne (Sep – Nov)',
        winter: 'Hiver (Déc – Fév)',
      },
      seasonHighlights: {
        all: 'Lait Cru Quotidien Toute l’Année, Élevage Pastoral & Récoltes du Souss',
        spring:
          'Printemps : Pâturages de Luzerne Verte, Lait Riche en Crème & Miel de Fleur d’Oranger',
        summer:
          'Été : Sélection Moutons Sardi Aïd Al-Adha, Lben Frais & Miel de Thym de l’Atlas',
        autumn:
          'Automne : Huile d’Olive Vierge Extra Nouvelle, Amandes Douces & Génisses',
        winter:
          'Hiver : Oranges Navel de Taroudant, Clémentines, Zebda Beldia & Œufs Fermiers',
      },
      monthFilterLabel: 'Filtrer par Mois de l’Année :',
      allMonthsBtn: 'Les 12 Mois',
      monthNamesShort: [
        'Jan',
        'Fév',
        'Mar',
        'Avr',
        'Mai',
        'Juin',
        'Juil',
        'Août',
        'Sep',
        'Oct',
        'Nov',
        'Déc',
      ],
      monthNamesFull: [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre',
      ],
      categoryFilterLabel: 'Catégorie :',
      categories: {
        all: 'Tous les Produits',
        dairy: 'Produits Laitiers',
        livestock: 'Bétail & Troupeau',
        farm_goods: 'Miel, Huile d’Olive & Récoltes',
      },
      legendPeak: 'Pleine Saison / Pic de Qualité',
      legendAvailable: 'Disponible à la Ferme',
      legendOff: 'Hors Saison',
      timelineHeader: 'Calendrier de Disponibilité sur 12 Mois (Taroudant) :',
      priceLabel: 'Prix Indicatif :',
      inquireBtn: 'Réserver / Demander Disponibilité',
      resetBtn: 'Réinitialiser les Filtres',
      showingCount: (count: number) =>
        `${count} produit${count > 1 ? 's' : ''} saisonnier${count > 1 ? 's' : ''} affiché${count > 1 ? 's' : ''}`,
    },
    ar: {
      eyebrow: '7. رزنامة المنتجات الموسمية · المواسم الفلاحية في تارودانت',
      title: 'توفر منتجات الضيعة على مدار السنة حسب الفصول والأشهر',
      subtitle:
        'تعرفوا على المنتجات الطازجة والمحاصيل والماشية المتوفرة عبر الفصول الأربعة وطيلة أشهر السنة (من يناير إلى دجنبر) في سهل سوس ماسة.',
      seasonFilterLabel: 'تصفية حسب الفصل الفلاحي:',
      seasons: {
        all: 'جميع الفصول الأربعة',
        spring: 'الربيع (مارس – ماي)',
        summer: 'الصيف (يونيو – غشت)',
        autumn: 'الخريف (شتنبر – نونبر)',
        winter: 'الشتاء (دجنبر – فبراير)',
      },
      seasonHighlights: {
        all: 'حليب طازج يومياً طيلة السنة، ماشية المراعي ومحاصيل تارودانت الموسمية',
        spring:
          'ذروة الربيع: مراعي الفصة الخضراء، الحليب الغني بالقشدة وعسل زهر البرتقال',
        summer:
          'ذروة الصيف: أغنام الصردي لعيد الأضحى، اللبن البلدي المبرد وعسل الزعتر الأطلسي',
        autumn:
          'ذروة الخريف: زيت الزيتون البكر الجديدة (العصرة الأولى)، اللوز الحلو والعجول',
        winter:
          'ذروة الشتاء: برتقال نافيل وكليمنتين تارودانت، الزبدة البلدية والبيض البلدي',
      },
      monthFilterLabel: 'تصفية حسب أشهر السنة:',
      allMonthsBtn: 'جميع الأشهر (12)',
      monthNamesShort: [
        'يناير',
        'فبراير',
        'مارس',
        'أبريل',
        'ماي',
        'يونيو',
        'يوليوز',
        'غشت',
        'شتنبر',
        'أكتوبر',
        'نونبر',
        'دجنبر',
      ],
      monthNamesFull: [
        'يناير',
        'فبراير',
        'مارس',
        'أبريل',
        'ماي',
        'يونيو',
        'يوليوز',
        'غشت',
        'شتنبر',
        'أكتوبر',
        'نونبر',
        'دجنبر',
      ],
      categoryFilterLabel: 'الفئة:',
      categories: {
        all: 'كل منتجات الضيعة',
        dairy: 'الحليب ومشتقاته',
        livestock: 'الماشية والقطيع',
        farm_goods: 'العسل، زيت الزيتون والمحاصيل',
      },
      legendPeak: 'ذروة الموسم والجني',
      legendAvailable: 'متوفر في الضيعة',
      legendOff: 'خارج الموسم',
      timelineHeader: 'جدول التوفر الشهري على مدار 12 شهراً:',
      priceLabel: 'السعر التقريبي:',
      inquireBtn: 'حجز أو استفسار عبر واتساب',
      resetBtn: 'إعادة ضبط الفلاتر',
      showingCount: (count: number) => `عرض ${count} من المنتجات الموسمية`,
    },
  }[language];

  const handleSelectSeason = (season: AgriculturalSeason | 'all') => {
    setSelectedSeason(season);
    setSelectedMonth('all');
  };

  const handleSelectMonth = (month: MonthNumber | 'all') => {
    setSelectedMonth(month);
    if (month !== 'all') {
      // Automatically keep season in 'all' so the user sees exact month matches clearly
      setSelectedSeason('all');
    }
  };

  const filteredItems = filterSeasonalCalendarItems(
    INITIAL_SEASONAL_CALENDAR_ITEMS,
    {
      season: selectedSeason,
      month: selectedMonth,
      category: selectedCategory,
    }
  );

  const seasonIcon = (s: AgriculturalSeason | 'all') => {
    if (s === 'spring') return Leaf;
    if (s === 'summer') return Sun;
    if (s === 'autumn') return CloudRain;
    if (s === 'winter') return Snowflake;
    return Calendar;
  };

  return (
    <section
      id="seasonal-calendar"
      aria-labelledby="seasonal-calendar-heading"
      className="py-16 lg:py-24 bg-[#FAF7F2] border-b border-[#1C251E]/10"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-medium tracking-wide text-[#5C4033]">
              {copy.eyebrow}
            </p>
            <h2
              id="seasonal-calendar-heading"
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A3A2A] tracking-tight text-balance"
            >
              {copy.title}
            </h2>
            <p className="text-base text-[#3A473D] leading-relaxed">
              {copy.subtitle}
            </p>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 p-3.5 rounded-xl bg-[#F2ECE1] border border-[#1C251E]/10 text-xs shrink-0">
            <span className="inline-flex items-center gap-1.5 font-semibold text-[#1A3A2A]">
              <span className="w-3 h-3 rounded-xs bg-[#1A3A2A] inline-block" />
              {copy.legendPeak}
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium text-[#3A473D]">
              <span className="w-3 h-3 rounded-xs bg-[#5C7436]/40 border border-[#1A3A2A]/30 inline-block" />
              {copy.legendAvailable}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[#5C4033]">
              <span className="w-3 h-3 rounded-xs bg-[#E6DFD3] inline-block" />
              {copy.legendOff}
            </span>
          </div>
        </div>

        {/* Control Panel: Season Tabs + 12 Month Selector + Category Filter */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#F2ECE1] border border-[#1C251E]/12 space-y-4 mb-10">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            {/* 4 Seasons + All */}
            <div className="space-y-1.5">
              <span className="block text-xs font-semibold text-[#5C4033]">
                {copy.seasonFilterLabel}
              </span>
              <div
                role="group"
                aria-label={copy.seasonFilterLabel}
                className="flex flex-wrap gap-1.5"
              >
                {(
                  ['all', 'spring', 'summer', 'autumn', 'winter'] as const
                ).map((sk) => {
                  const Icon = seasonIcon(sk);
                  const active = selectedSeason === sk && selectedMonth === 'all';
                  return (
                    <button
                      key={sk}
                      type="button"
                      data-season-tab={sk}
                      aria-pressed={active}
                      onClick={() => handleSelectSeason(sk)}
                      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        active
                          ? 'bg-[#1A3A2A] text-[#FAF7F2]'
                          : 'bg-[#FAF7F2] text-[#3A473D] border border-[#1C251E]/12 hover:border-[#1A3A2A]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{copy.seasons[sk]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-1.5">
              <span className="block text-xs font-semibold text-[#5C4033]">
                {copy.categoryFilterLabel}
              </span>
              <div
                role="group"
                aria-label={copy.categoryFilterLabel}
                className="flex flex-wrap gap-1.5"
              >
                {(['all', 'dairy', 'livestock', 'farm_goods'] as const).map(
                  (cat) => {
                    const active = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        data-calendar-category={cat}
                        aria-pressed={active}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          active
                            ? 'bg-[#5C4033] text-[#FAF7F2]'
                            : 'bg-[#FAF7F2] text-[#3A473D] border border-[#1C251E]/12 hover:border-[#5C4033]'
                        }`}
                      >
                        {copy.categories[cat]}
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          </div>

          {/* 12-Month Selector Bar */}
          <div className="pt-4 border-t border-[#1C251E]/10 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-[#5C4033]">
                {copy.monthFilterLabel}
              </span>
              <span className="text-xs font-mono-tabular font-semibold text-[#1A3A2A]">
                {copy.showingCount(filteredItems.length)}
              </span>
            </div>

            <div
              role="group"
              aria-label={copy.monthFilterLabel}
              className="grid grid-cols-3 sm:grid-cols-7 lg:grid-cols-13 gap-1.5"
            >
              <button
                type="button"
                data-month-btn="all"
                aria-pressed={selectedMonth === 'all'}
                onClick={() => handleSelectMonth('all')}
                className={`px-2.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedMonth === 'all'
                    ? 'bg-[#1A3A2A] text-[#FAF7F2]'
                    : 'bg-[#FAF7F2] text-[#3A473D] border border-[#1C251E]/10 hover:border-[#1A3A2A]'
                }`}
              >
                {copy.allMonthsBtn}
              </button>

              {ALL_MONTHS.map((m) => {
                const active = selectedMonth === m;
                return (
                  <button
                    key={m}
                    type="button"
                    data-month-btn={m}
                    aria-pressed={active}
                    onClick={() => handleSelectMonth(m)}
                    className={`px-2 py-2 rounded-lg text-xs font-mono-tabular font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#1A3A2A] text-[#FAF7F2]'
                        : 'bg-[#FAF7F2] text-[#1C251E] border border-[#1C251E]/10 hover:border-[#1A3A2A]'
                    }`}
                  >
                    {copy.monthNamesShort[m - 1]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Season / Month Banner */}
          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#1C251E]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1A3A2A]">
              <Sparkles className="w-4 h-4 text-[#5C4033] shrink-0" />
              <span>
                {selectedMonth !== 'all'
                  ? `${copy.monthNamesFull[selectedMonth - 1]} — Taroudant Harvest & Herd Availability`
                  : copy.seasonHighlights[selectedSeason]}
              </span>
            </div>
            {(selectedSeason !== 'all' ||
              selectedMonth !== 'all' ||
              selectedCategory !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setSelectedSeason('all');
                  setSelectedMonth('all');
                  setSelectedCategory('all');
                }}
                className="text-xs font-semibold text-[#5C4033] hover:text-[#1A3A2A] underline cursor-pointer self-start sm:self-auto"
              >
                {copy.resetBtn}
              </button>
            )}
          </div>
        </div>

        {/* Seasonal Products Grid with 12-Month Availability Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map((item) => {
            const whatsappUrl = buildWhatsAppInquiryUrl({
              phone: whatsappNumber,
              productName: item.name[language],
              language,
            });

            return (
              <article
                key={item.id}
                data-seasonal-item={item.id}
                className="p-6 rounded-2xl bg-[#F2ECE1]/80 border border-[#1C251E]/12 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-semibold text-[#5C4033]">
                      {copy.categories[item.category]} ·{' '}
                      {item.harvestWindowLabel[language]}
                    </span>
                    <span className="font-mono-tabular font-semibold text-[#1A3A2A] bg-[#FAF7F2] px-2.5 py-1 rounded-md border border-[#1C251E]/10">
                      {item.statusBadge[language]}
                    </span>
                  </div>

                  <h3 className="font-display text-lg sm:text-xl font-bold text-[#1A3A2A]">
                    {item.name[language]}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#3A473D] leading-relaxed">
                    {item.varietyNote[language]}
                  </p>

                  {/* 12-Month Visual Availability Matrix Bar */}
                  <div className="pt-2 space-y-1.5">
                    <span className="block text-[11px] font-semibold text-[#5C4033]">
                      {copy.timelineHeader}
                    </span>
                    <div className="grid grid-cols-12 gap-1">
                      {ALL_MONTHS.map((m) => {
                        const isPeak = item.peakMonths.includes(m);
                        const isAvailable = item.availableMonths.includes(m);
                        const isSelectedMonth = selectedMonth === m;
                        return (
                          <div
                            key={m}
                            title={`${copy.monthNamesFull[m - 1]}: ${
                              isPeak
                                ? copy.legendPeak
                                : isAvailable
                                  ? copy.legendAvailable
                                  : copy.legendOff
                            }`}
                            className={`rounded-md py-1.5 text-center font-mono-tabular text-[10px] font-semibold transition-all ${
                              isPeak
                                ? 'bg-[#1A3A2A] text-[#FAF7F2]'
                                : isAvailable
                                  ? 'bg-[#5C7436]/30 text-[#1A3A2A] border border-[#1A3A2A]/20'
                                  : 'bg-[#E6DFD3]/70 text-[#7A7062]'
                            } ${
                              isSelectedMonth
                                ? 'ring-2 ring-[#5C4033] ring-offset-1'
                                : ''
                            }`}
                          >
                            {copy.monthNamesShort[m - 1].slice(0, 3)}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Footer: Price + WhatsApp Reservation */}
                <div className="pt-4 border-t border-[#1C251E]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-[#5C4033] block">
                      {copy.priceLabel}
                    </span>
                    <span className="font-mono-tabular text-sm font-bold text-[#1A3A2A]">
                      {item.indicativePrice[language]}
                    </span>
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A3A2A] hover:bg-[#254F3A] text-[#FAF7F2] text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{copy.inquireBtn}</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
