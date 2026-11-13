import React, { useState } from 'react';
import {
  Activity,
  BarChart3,
  Bot,
  Calculator,
  CheckCircle2,
  Droplets,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import {
  calculateFarmFinancialAnalytics,
  calculateMilkBalance,
  generateSmartFarmAssistantAnswer,
  type FarmFinancialSnapshotInput,
  type Language,
} from '../utils/farmLogic';
import { INITIAL_LIVESTOCK_LISTINGS } from './LivestockMarketplace';

interface SmartFarmErpSuiteProps {
  language: Language;
}

type ErpTab = 'ai_assistant' | 'financial_analytics' | 'animal_health';

export const SmartFarmErpSuite: React.FC<SmartFarmErpSuiteProps> = ({
  language,
}) => {
  const [activeTab, setActiveTab] = useState<ErpTab>('ai_assistant');

  // Financial & Dairy Snapshot State (Interactive)
  const [financials, setFinancials] = useState<FarmFinancialSnapshotInput>({
    monthlyMilkLitersProduced: 14400,
    monthlyMilkLitersSold: 13200,
    milkSellingPricePerLiterMad: 8,
    activeDairyCowsCount: 22,
    monthlyFeedExpenseMad: 36500,
    monthlyLaborAndVetExpenseMad: 14200,
    monthlyUtilitiesAndWaterMad: 4100,
    monthlyLivestockSalesRevenueMad: 42000,
    monthlyLivestockCostMad: 23500,
    monthlyCropsAndHoneyRevenueMad: 18500,
    monthlyCropsCostMad: 6200,
  });

  // Daily Milk Balance State
  const [milkBalanceInput, setMilkBalanceInput] = useState({
    openingStockLiters: 45,
    producedLiters: 480,
    soldLiters: 410,
    processedLiters: 65,
    lossLiters: 3,
  });

  const analytics = calculateFarmFinancialAnalytics(financials);
  const closingMilkStockLiters = calculateMilkBalance(milkBalanceInput);

  // AI Assistant State
  const [questionInput, setQuestionInput] = useState('');
  const [assistantHistory, setAssistantHistory] = useState<
    Array<{ q: string; a: string }>
  >(() => {
    const defaultQ =
      language === 'ar'
        ? 'كم بعنا من الحليب هذا الشهر، وكم بلغ صافي الربح؟'
        : language === 'fr'
          ? 'Combien de lait avons-nous vendu ce mois-ci et quel est notre bénéfice ?'
          : 'How much milk did we sell this month, and what was our profit?';
    const initialAnalytics = calculateFarmFinancialAnalytics({
      monthlyMilkLitersProduced: 14400,
      monthlyMilkLitersSold: 13200,
      milkSellingPricePerLiterMad: 8,
      activeDairyCowsCount: 22,
      monthlyFeedExpenseMad: 36500,
      monthlyLaborAndVetExpenseMad: 14200,
      monthlyUtilitiesAndWaterMad: 4100,
      monthlyLivestockSalesRevenueMad: 42000,
      monthlyLivestockCostMad: 23500,
      monthlyCropsAndHoneyRevenueMad: 18500,
      monthlyCropsCostMad: 6200,
    });
    return [
      {
        q: defaultQ,
        a: generateSmartFarmAssistantAnswer({
          question: defaultQ,
          language,
          financials: {
            monthlyMilkLitersProduced: 14400,
            monthlyMilkLitersSold: 13200,
            milkSellingPricePerLiterMad: 8,
            activeDairyCowsCount: 22,
            monthlyFeedExpenseMad: 36500,
            monthlyLaborAndVetExpenseMad: 14200,
            monthlyUtilitiesAndWaterMad: 4100,
            monthlyLivestockSalesRevenueMad: 42000,
            monthlyLivestockCostMad: 23500,
            monthlyCropsAndHoneyRevenueMad: 18500,
            monthlyCropsCostMad: 6200,
          },
          analytics: initialAnalytics,
          livestockCount: INITIAL_LIVESTOCK_LISTINGS.length,
        }),
      },
    ];
  });

  const copy = {
    en: {
      eyebrow:
        'Phase 2 & 3 Smart Farm ERP · AI Assistant, Financial Analytics & Animal Health',
      title: 'Atlas Smart Farm Management & Intelligence Suite',
      subtitle:
        'Built for modern Moroccan agriculture in Taroudant (Tamazight: ⵜⴰⴼلاحة ⵏ  تارودانت): track the exact cost of producing 1 litre of milk, monitor individual animal health records, and ask our AI Farm Assistant in Arabic, French, or English.',
      tabs: {
        ai_assistant: '1. AI Farm Assistant & Forecasting',
        financial_analytics: '2. Financial Analytics & Milk Balance',
        animal_health: '3. Animal Health & Veterinary Registry',
      },
      quickPromptsLabel: 'Instant Farm Intelligence Queries:',
      prompts: [
        'How much milk did we sell this month, and what was our profit?',
        'What is our 30-day milk demand and sales forecast in Taroudant?',
        'Show herd vaccination status and revenue per dairy cow.',
      ],
      askPlaceholder:
        'Ask anything about milk sales, production cost per litre, demand forecast, or herd health...',
      askBtn: 'Ask Farm AI',
      smartAlertsTitle: 'Smart Inventory & Predictive Alerts (Active)',
      smartAlerts: [
        'Milk Demand Forecast: +8% projected morning demand in Taroudant Center next 30 days.',
        'Feed Inventory Alert: Green alfalfa & barley stock sufficient for 19 days (reorder threshold: 14 days).',
        'Veterinary Schedule: 100% of cattle & Sardi sheep vaccinations up to date.',
      ],
      finTitle: 'Farm Financial Analytics & Unit Economics (MAD)',
      costPerLiterLabel: 'Cost to Produce 1L Milk',
      revPerCowLabel: 'Monthly Revenue / Dairy Cow',
      dairyNetProfitLabel: 'Monthly Dairy Net Profit',
      totalFarmProfitLabel: 'Total Monthly Net Profit',
      adjustInputsTitle: 'Interactive Monthly Farm Parameters (MAD & Litres)',
      producedLitersLabel: 'Monthly Milk Produced (L)',
      soldLitersLabel: 'Monthly Milk Sold (L)',
      feedCostLabel: 'Monthly Feed Expense (MAD)',
      activeCowsLabel: 'Active Dairy Cows',
      milkBalanceTitle:
        'Daily Dairy Milk Balance Calculator (Opening + Produced - Sold - Processed - Loss)',
      closingStockLabel: 'Verified Closing Chilled Milk Stock:',
      healthTableTitle:
        'Digital Animal Health, Breeding & Milk Production Registry',
      colCode: 'Animal ID',
      colBreed: 'Animal & Breed',
      colVaccine: 'Vaccination & Vet Record',
      colLastVet: 'Last Vet Check',
      colCare: 'Breeding / Production Note',
    },
    fr: {
      eyebrow:
        'Phase 2 & 3 Smart Farm ERP · Assistant IA, Analytique Financière & Santé Animale',
      title: 'Suite de Gestion & Intelligence Agricole Atlas Farm',
      subtitle:
        'Conçu pour l’agriculture moderne à Taroudant (Tamazight : ⵜⴰⴼلاحة ⵏ  تارودانت) : calculez le coût exact d’un litre de lait, suivez les dossiers vétérinaires et interrogez l’Assistant IA en français, arabe ou anglais.',
      tabs: {
        ai_assistant: '1. Assistant IA & Prévisions',
        financial_analytics: '2. Analytique Financière & Bilan Laitier',
        animal_health: '3. Registre Sanitaire & Vétérinaire',
      },
      quickPromptsLabel: 'Questions Rapides à l’Assistant IA :',
      prompts: [
        'Combien de lait avons-nous vendu ce mois-ci et quel est notre bénéfice ?',
        'Quelle est la prévision de demande de lait sur 30 jours à Taroudant ?',
        'Afficher l’état sanitaire du troupeau et le revenu par vache.',
      ],
      askPlaceholder:
        'Posez une question sur les ventes de lait, le coût par litre, les prévisions ou le troupeau...',
      askBtn: 'Interroger l’IA',
      smartAlertsTitle: 'Alertes Intelligentes & Prévisions de Stock',
      smartAlerts: [
        'Prévision de Demande : +8% de demande matinale prévue au centre de Taroudant.',
        'Stock Fourrage : Réserve de luzerne verte et d’orge suffisante pour 19 jours.',
        'Calendrier Vétérinaire : 100% des vaccinations bovines et ovines sont à jour.',
      ],
      finTitle: 'Analytique Financière & Rentabilité par Catégorie (MAD)',
      costPerLiterLabel: 'Coût de Production / 1L de Lait',
      revPerCowLabel: 'Revenu Mensuel / Vache Laitière',
      dairyNetProfitLabel: 'Bénéfice Net Laitier Mensuel',
      totalFarmProfitLabel: 'Bénéfice Net Global Mensuel',
      adjustInputsTitle: 'Paramètres Mensuels Interactifs (MAD & Litres)',
      producedLitersLabel: 'Lait Produit / Mois (L)',
      soldLitersLabel: 'Lait Vendu / Mois (L)',
      feedCostLabel: 'Dépenses Fourrage & Aliment (MAD)',
      activeCowsLabel: 'Vaches Laitières en Traite',
      milkBalanceTitle:
        'Calculateur Quotidien du Bilan Laitier (Stock Initial + Production - Ventes - Transformation - Pertes)',
      closingStockLabel: 'Stock Final Réfrigéré Vérifié :',
      healthTableTitle:
        'Registre Numérique de Santé Animale, Reproduction & Production Laitière',
      colCode: 'Code ID',
      colBreed: 'Animal & Race',
      colVaccine: 'Vaccination & Suivi Vétérinaire',
      colLastVet: 'Dernier Contrôle',
      colCare: 'Note Reproduction / Lait',
    },
    ar: {
      eyebrow:
        'المرحلة 2 و 3 لنظام الضيعة الذكية · المساعد الذكي، التحليلات المالية والسجل الصحي',
      title: 'منظومة التسيير الذكي والتحليل المالي لضيعة أطلس تارودانت',
      subtitle:
        'مصممة خصيصاً للفلاحة العصرية في تارودانت وسوس (تمازيغت: ⵜⴰⴼلاحة ⵏ تارودانت): حساب تكلفة إنتاج لتر الحليب بدقة، تتبع السجل الصحي البيطري لكل حيوان، وطرح الأسئلة على المساعد الذكي بالعربية أو الفرنسية أو الإنجليزية.',
      tabs: {
        ai_assistant: '1. المساعد الذكي وتوقعات الطلب',
        financial_analytics: '2. التحليلات المالية وميزان الحليب',
        animal_health: '3. السجل الصحي والبيطري للقطيع',
      },
      quickPromptsLabel: 'أسئلة سريعة للمساعد الذكي للضيعة:',
      prompts: [
        'كم بعنا من الحليب هذا الشهر، وكم بلغ صافي الربح؟',
        'ما هي توقعات الطلب والمبيعات خلال الـ 30 يوماً القادمة بتارودانت؟',
        'اعرض تقرير صحة القطيع والعائد الشهري لكل بقرة حلوب.',
      ],
      askPlaceholder:
        'اطرح سؤالك حول مبيعات الحليب، تكلفة اللتر، توقعات الطلب أو صحة القطيع...',
      askBtn: 'اسأل المساعد الذكي',
      smartAlertsTitle: 'التنبيهات الذكية للمخزون والتوقعات الاستباقية',
      smartAlerts: [
        'توقعات الطلب على الحليب: ارتفاع متوقع بنسبة +8% في الطلب الصباحي بتارودانت.',
        'تنبيه مخزون الأعلاف: مخزون الفصة الخضراء والشعير يكفي لـ 19 يوماً.',
        'المتابعة البيطرية: 100% من تلقيحات الأبقار وأغنام السردي محدثة.',
      ],
      finTitle: 'التحليلات المالية والربحية حسب الفئة (بالدرهم)',
      costPerLiterLabel: 'تكلفة إنتاج 1 لتر حليب',
      revPerCowLabel: 'العائد الشهري لكل بقرة حلوب',
      dairyNetProfitLabel: 'صافي ربح الحليب الشهري',
      totalFarmProfitLabel: 'إجمالي صافي الربح الشهري للضيعة',
      adjustInputsTitle: 'تعديل معطيات الضيعة الشهرية (بالدرهم واللتر)',
      producedLitersLabel: 'إنتاج الحليب الشهري (لتر)',
      soldLitersLabel: 'مبيعات الحليب الشهرية (لتر)',
      feedCostLabel: 'مصاريف الأعلاف الشهرية (درهم)',
      activeCowsLabel: 'عدد الأبقار الحلوب المنتجة',
      milkBalanceTitle:
        'حاسبة ميزان الحليب اليومي (المخزون الأولي + الإنتاج - المبيعات - التحويل - الفاقد)',
      closingStockLabel: 'المخزون الختامي المبرد الموثق:',
      healthTableTitle:
        'السجل الرقمي لصحة الحيوان، التلقيح وإنتاج الحليب الفردي',
      colCode: 'رمز الحيوان',
      colBreed: 'الحيوان والسلالة',
      colVaccine: 'سجل التلقيح والفحص البيطري',
      colLastVet: 'آخر فحص بيطري',
      colCare: 'ملاحظات الإنتاج والرعاية',
    },
  }[language];

  const handleAskQuestion = (questionText: string) => {
    const cleanQ = questionText.trim();
    if (!cleanQ) return;
    const answer = generateSmartFarmAssistantAnswer({
      question: cleanQ,
      language,
      financials,
      analytics,
      livestockCount: INITIAL_LIVESTOCK_LISTINGS.length,
    });
    setAssistantHistory((prev) => [{ q: cleanQ, a: answer }, ...prev.slice(0, 4)]);
    setQuestionInput('');
  };

  return (
    <section
      id="smart-farm-erp"
      className="py-16 lg:py-24 bg-[#F2ECE1] border-b border-[#1C251E]/10"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-10 space-y-3">
          <p className="text-xs font-medium tracking-wide text-[#5C4033]">
            {copy.eyebrow}
          </p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A3A2A] tracking-tight">
            {copy.title}
          </h2>
          <p className="text-base text-[#3A473D] leading-relaxed">
            {copy.subtitle}
          </p>
        </div>

        {/* 3 ERP Module Tabs */}
        <div
          role="tablist"
          aria-label="Smart Farm ERP Tabs"
          className="flex flex-wrap items-center gap-2 mb-8 p-1.5 bg-[#FAF7F2] rounded-xl border border-[#1C251E]/12 w-fit"
        >
          {(
            [
              { key: 'ai_assistant', label: copy.tabs.ai_assistant, icon: Bot },
              {
                key: 'financial_analytics',
                label: copy.tabs.financial_analytics,
                icon: BarChart3,
              },
              {
                key: 'animal_health',
                label: copy.tabs.animal_health,
                icon: Activity,
              },
            ] as const
          ).map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={active}
                data-erp-tab={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#1A3A2A] text-[#FAF7F2]'
                    : 'text-[#3A473D] hover:text-[#1A3A2A]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: AI Farm Assistant & Demand Forecasting */}
        {activeTab === 'ai_assistant' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-[#FAF7F2] rounded-2xl border border-[#1C251E]/12 p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-[#5C4033]">
                  {copy.quickPromptsLabel}
                </p>
                <div className="flex flex-wrap gap-2">
                  {copy.prompts.map((promptText, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAskQuestion(promptText)}
                      className="text-start text-xs font-medium px-3.5 py-2 rounded-xl bg-[#F2ECE1] hover:bg-[#E5DEC9] text-[#1A3A2A] border border-[#1C251E]/10 transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 inline me-1.5 text-[#5C4033]" />
                      {promptText}
                    </button>
                  ))}
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAskQuestion(questionInput);
                }}
                className="flex flex-col sm:flex-row gap-2.5"
              >
                <input
                  type="text"
                  value={questionInput}
                  onChange={(e) => setQuestionInput(e.target.value)}
                  placeholder={copy.askPlaceholder}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#F2ECE1] border border-[#1C251E]/15 text-sm text-[#1C251E]"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1A3A2A] hover:bg-[#254F3A] text-[#FAF7F2] text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{copy.askBtn}</span>
                </button>
              </form>

              <div className="space-y-4">
                {assistantHistory.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#F2ECE1] border border-[#1C251E]/12 space-y-2"
                  >
                    <p className="text-xs font-bold text-[#5C4033]">
                      Q: {item.q}
                    </p>
                    <p className="text-sm text-[#1C251E] leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 5 cols: Smart Inventory Alerts & Live KPI Summary */}
            <div className="lg:col-span-5 bg-[#FAF7F2] rounded-2xl border border-[#1C251E]/12 p-6 sm:p-7 space-y-5">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#1A3A2A]" />
                <h3 className="font-display text-lg font-bold text-[#1A3A2A]">
                  {copy.smartAlertsTitle}
                </h3>
              </div>

              <ul className="space-y-3">
                {copy.smartAlerts.map((alertText, i) => (
                  <li
                    key={i}
                    className="p-3.5 rounded-xl bg-[#F2ECE1] border border-[#1C251E]/10 flex items-start gap-2.5 text-xs text-[#2A382E]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#1A3A2A] shrink-0 mt-0.5" />
                    <span>{alertText}</span>
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[#F2ECE1] border border-[#1C251E]/10">
                  <span className="text-xs text-[#5C4033] block">
                    {copy.costPerLiterLabel}
                  </span>
                  <span className="font-mono-tabular text-lg font-bold text-[#1A3A2A]">
                    {analytics.costPerLiterMilkMad} MAD/L
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F2ECE1] border border-[#1C251E]/10">
                  <span className="text-xs text-[#5C4033] block">
                    {copy.totalFarmProfitLabel}
                  </span>
                  <span className="font-mono-tabular text-lg font-bold text-[#1A3A2A]">
                    {analytics.totalMonthlyNetProfitMad.toLocaleString()} MAD
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Farm Financial Analytics & Dairy Milk Balance */}
        {activeTab === 'financial_analytics' && (
          <div className="space-y-8">
            {/* 4 KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#1C251E]/12">
                <span className="text-xs text-[#5C4033] block">
                  {copy.costPerLiterLabel}
                </span>
                <span className="font-mono-tabular text-2xl font-bold text-[#1A3A2A] mt-1 block">
                  {analytics.costPerLiterMilkMad} MAD
                </span>
              </div>
              <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#1C251E]/12">
                <span className="text-xs text-[#5C4033] block">
                  {copy.revPerCowLabel}
                </span>
                <span className="font-mono-tabular text-2xl font-bold text-[#1A3A2A] mt-1 block">
                  {analytics.revenuePerDairyCowMad.toLocaleString()} MAD
                </span>
              </div>
              <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#1C251E]/12">
                <span className="text-xs text-[#5C4033] block">
                  {copy.dairyNetProfitLabel}
                </span>
                <span className="font-mono-tabular text-2xl font-bold text-[#1A3A2A] mt-1 block">
                  {analytics.dairyNetProfitMad.toLocaleString()} MAD
                </span>
              </div>
              <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#1C251E]/12">
                <span className="text-xs text-[#5C4033] block">
                  {copy.totalFarmProfitLabel}
                </span>
                <span className="font-mono-tabular text-2xl font-bold text-[#1A3A2A] mt-1 block">
                  {analytics.totalMonthlyNetProfitMad.toLocaleString()} MAD
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Interactive Financial Inputs */}
              <div className="lg:col-span-7 p-6 rounded-2xl bg-[#FAF7F2] border border-[#1C251E]/12 space-y-4">
                <h3 className="font-display text-lg font-bold text-[#1A3A2A] flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-[#1A3A2A]" />
                  {copy.adjustInputsTitle}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1A3A2A] mb-1">
                      {copy.producedLitersLabel}
                    </label>
                    <input
                      type="number"
                      value={financials.monthlyMilkLitersProduced}
                      onChange={(e) =>
                        setFinancials((prev) => ({
                          ...prev,
                          monthlyMilkLitersProduced:
                            Math.max(100, Number(e.target.value) || 100),
                        }))
                      }
                      className="font-mono-tabular w-full px-3.5 py-2 rounded-xl bg-[#F2ECE1] border border-[#1C251E]/15 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1A3A2A] mb-1">
                      {copy.soldLitersLabel}
                    </label>
                    <input
                      type="number"
                      value={financials.monthlyMilkLitersSold}
                      onChange={(e) =>
                        setFinancials((prev) => ({
                          ...prev,
                          monthlyMilkLitersSold:
                            Math.max(100, Number(e.target.value) || 100),
                        }))
                      }
                      className="font-mono-tabular w-full px-3.5 py-2 rounded-xl bg-[#F2ECE1] border border-[#1C251E]/15 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1A3A2A] mb-1">
                      {copy.feedCostLabel}
                    </label>
                    <input
                      type="number"
                      value={financials.monthlyFeedExpenseMad}
                      onChange={(e) =>
                        setFinancials((prev) => ({
                          ...prev,
                          monthlyFeedExpenseMad:
                            Math.max(0, Number(e.target.value) || 0),
                        }))
                      }
                      className="font-mono-tabular w-full px-3.5 py-2 rounded-xl bg-[#F2ECE1] border border-[#1C251E]/15 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1A3A2A] mb-1">
                      {copy.activeCowsLabel}
                    </label>
                    <input
                      type="number"
                      value={financials.activeDairyCowsCount}
                      onChange={(e) =>
                        setFinancials((prev) => ({
                          ...prev,
                          activeDairyCowsCount:
                            Math.max(1, Number(e.target.value) || 1),
                        }))
                      }
                      className="font-mono-tabular w-full px-3.5 py-2 rounded-xl bg-[#F2ECE1] border border-[#1C251E]/15 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Daily Milk Balance Formula Box */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-[#FAF7F2] border border-[#1C251E]/12 space-y-4">
                <h3 className="font-display text-lg font-bold text-[#1A3A2A] flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-[#1A3A2A]" />
                  {copy.milkBalanceTitle}
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[#5C4033] block">Opening (L)</span>
                    <input
                      type="number"
                      value={milkBalanceInput.openingStockLiters}
                      onChange={(e) =>
                        setMilkBalanceInput((p) => ({
                          ...p,
                          openingStockLiters: Number(e.target.value) || 0,
                        }))
                      }
                      className="font-mono-tabular w-full mt-1 px-3 py-1.5 rounded-lg bg-[#F2ECE1] border border-[#1C251E]/15"
                    />
                  </div>
                  <div>
                    <span className="text-[#5C4033] block">+ Produced (L)</span>
                    <input
                      type="number"
                      value={milkBalanceInput.producedLiters}
                      onChange={(e) =>
                        setMilkBalanceInput((p) => ({
                          ...p,
                          producedLiters: Number(e.target.value) || 0,
                        }))
                      }
                      className="font-mono-tabular w-full mt-1 px-3 py-1.5 rounded-lg bg-[#F2ECE1] border border-[#1C251E]/15"
                    />
                  </div>
                  <div>
                    <span className="text-[#5C4033] block">- Sold (L)</span>
                    <input
                      type="number"
                      value={milkBalanceInput.soldLiters}
                      onChange={(e) =>
                        setMilkBalanceInput((p) => ({
                          ...p,
                          soldLiters: Number(e.target.value) || 0,
                        }))
                      }
                      className="font-mono-tabular w-full mt-1 px-3 py-1.5 rounded-lg bg-[#F2ECE1] border border-[#1C251E]/15"
                    />
                  </div>
                  <div>
                    <span className="text-[#5C4033] block">- Butter/Lben (L)</span>
                    <input
                      type="number"
                      value={milkBalanceInput.processedLiters}
                      onChange={(e) =>
                        setMilkBalanceInput((p) => ({
                          ...p,
                          processedLiters: Number(e.target.value) || 0,
                        }))
                      }
                      className="font-mono-tabular w-full mt-1 px-3 py-1.5 rounded-lg bg-[#F2ECE1] border border-[#1C251E]/15"
                    />
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F2ECE1] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1A3A2A]">
                    {copy.closingStockLabel}
                  </span>
                  <span className="font-mono-tabular text-base font-bold text-[#1A3A2A]">
                    {closingMilkStockLiters} L
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Animal Health & Digital Records Table */}
        {activeTab === 'animal_health' && (
          <div className="bg-[#FAF7F2] rounded-2xl border border-[#1C251E]/12 p-6 sm:p-7 space-y-4 overflow-x-auto">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#1A3A2A]" />
              <h3 className="font-display text-lg font-bold text-[#1A3A2A]">
                {copy.healthTableTitle}
              </h3>
            </div>

            <table className="w-full text-start border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#1C251E]/15 text-[#5C4033]">
                  <th className="py-3 px-3 text-start">{copy.colCode}</th>
                  <th className="py-3 px-3 text-start">{copy.colBreed}</th>
                  <th className="py-3 px-3 text-start">{copy.colVaccine}</th>
                  <th className="py-3 px-3 text-start">{copy.colLastVet}</th>
                  <th className="py-3 px-3 text-start">{copy.colCare}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C251E]/10">
                {INITIAL_LIVESTOCK_LISTINGS.map((animal) => (
                  <tr key={animal.id}>
                    <td className="py-3.5 px-3 font-mono-tabular font-bold text-[#1A3A2A]">
                      {animal.animalCode}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="font-bold text-[#1A3A2A] block">
                        {animal.name[language]}
                      </span>
                      <span className="text-xs text-[#5C4033]">
                        {animal.breed[language]} · {animal.weightKg} kg
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-[#3A473D]">
                      {animal.healthAndVaccination[language]}
                    </td>
                    <td className="py-3.5 px-3 font-mono-tabular text-[#1A3A2A]">
                      {animal.lastVetCheckDate}
                    </td>
                    <td className="py-3.5 px-3 text-[#5C4033]">
                      {animal.nextVaccineNote[language]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};
