import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Gift,
  MessageCircle,
  PackageCheck,
  Repeat,
  ShoppingBag,
  Truck,
} from 'lucide-react';
import {
  buildWhatsAppInquiryUrl,
  calculateOrderSummary,
  calculateSubscriptionMonthlySummary,
  MILK_SUBSCRIPTION_PLANS,
  TAROUDANT_DELIVERY_ZONES,
  type CustomerOrderRecord,
  type DeliveryZoneId,
  type Language,
  type OrderStatus,
  type SubscriptionPlanId,
} from '../utils/farmLogic';

const ORDERABLE_FARM_PRODUCTS = [
  {
    id: 'ord-milk-liter',
    title: {
      en: 'Fresh Morning Cow Milk (Raw & Pure)',
      fr: 'Lait de Vache Frais du Matin (Cru & Pur)',
      ar: 'حليب البقر الطري الصباحي (طبيعي 100%)',
    },
    unitLabel: { en: 'Litre', fr: 'Litre', ar: 'لتر' },
    unitPriceMad: 8,
  },
  {
    id: 'ord-lben-butter',
    title: {
      en: 'Traditional Zebda Beldia (Farm Butter 500g)',
      fr: 'Zebda Beldia Traditionnelle (Beurre Fermier 500g)',
      ar: 'الزبدة البلدية الطرية (500 غرام)',
    },
    unitLabel: { en: '500g Pack', fr: 'Pot 500g', ar: 'عبوة 500 غ' },
    unitPriceMad: 55,
  },
  {
    id: 'ord-eggs-tray',
    title: {
      en: 'Free-Range Country Eggs (30 Eggs Beldia Tray)',
      fr: 'Plateau de 30 Œufs Fermiers Beldia',
      ar: 'بلاطو البيض البلدي الطبيعي (30 بيضة)',
    },
    unitLabel: { en: 'Tray (30)', fr: 'Plateau (30)', ar: 'بلاطو (30)' },
    unitPriceMad: 75,
  },
  {
    id: 'ord-pure-honey',
    title: {
      en: 'Pure Taroudant Honey (1 kg Glass Jar)',
      fr: 'Miel Pur de Taroudant (Pot 1 kg)',
      ar: 'عسل تارودانت الحر (1 كلغ)',
    },
    unitLabel: { en: '1 kg Jar', fr: 'Pot 1 kg', ar: 'قرعة 1 كلغ' },
    unitPriceMad: 180,
  },
  {
    id: 'ord-ramadan-bundle',
    title: {
      en: 'Ramadan Family Farm Basket (Milk + Lben + Butter + Eggs + Honey)',
      fr: 'Panier Familial Ramadan (Lait + Lben + Beurre + Œufs + Miel)',
      ar: 'قفة رمضان العائلية من الضيعة (حليب + لبن + زبدة + بيض + عسل)',
    },
    unitLabel: { en: 'Family Basket', fr: 'Panier Complet', ar: 'قفة متكاملة' },
    unitPriceMad: 260,
  },
];

interface OnlineOrderingAndSubscriptionsProps {
  language: Language;
  whatsappNumber: string;
  orders: CustomerOrderRecord[];
  onCreateOrder: (order: CustomerOrderRecord) => void;
  onAdvanceOrderStatus: (orderId: string, nextStatus: OrderStatus) => void;
}

export const OnlineOrderingAndSubscriptions: React.FC<
  OnlineOrderingAndSubscriptionsProps
> = ({
  language,
  whatsappNumber,
  orders,
  onCreateOrder,
  onAdvanceOrderStatus,
}) => {
  const [selectedProductId, setSelectedProductId] = useState(
    ORDERABLE_FARM_PRODUCTS[0].id
  );
  const [quantity, setQuantity] = useState(5);
  const [deliveryZoneId, setDeliveryZoneId] =
    useState<DeliveryZoneId>('taroudant_center');
  const [deliveryDate, setDeliveryDate] = useState(() => {
    const tomorrow = new Date(Date.now() + 86400000);
    return tomorrow.toISOString().slice(0, 10);
  });
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [orderError, setOrderError] = useState('');
  const [selectedSubPlan, setSelectedSubPlan] =
    useState<SubscriptionPlanId>('family');
  const [customDailyLiters, setCustomDailyLiters] = useState(25);

  const selectedProduct =
    ORDERABLE_FARM_PRODUCTS.find((p) => p.id === selectedProductId) ||
    ORDERABLE_FARM_PRODUCTS[0];

  const hasValidReferral = referralCode.trim().length >= 3;
  const orderSummary = calculateOrderSummary({
    quantity,
    unitPriceMad: selectedProduct.unitPriceMad,
    deliveryZoneId,
    hasReferralCode: hasValidReferral,
  });

  const activeSubPlan =
    MILK_SUBSCRIPTION_PLANS.find((p) => p.id === selectedSubPlan) ||
    MILK_SUBSCRIPTION_PLANS[0];

  const effectiveDailyLiters =
    selectedSubPlan === 'business_custom'
      ? customDailyLiters
      : activeSubPlan.dailyLiters;

  const subMonthlySummary = calculateSubscriptionMonthlySummary({
    dailyLiters: effectiveDailyLiters,
    pricePerLiterMad: activeSubPlan.pricePerLiterMad,
    discountPercent: activeSubPlan.discountPercent,
  });

  const copy = {
    en: {
      kicker: 'Online Ordering, Delivery & Milk Subscriptions · MAD (Cash on Delivery)',
      title: 'Order Fresh Milk & Farm Goods or Subscribe to Daily Delivery',
      subtitle:
        'Select your farm products, choose direct farm pickup or delivery across Taroudant and surrounding towns, track your order live, and confirm instantly via WhatsApp.',
      orderBoxTitle: '1. Online Order & Taroudant Delivery Calculator',
      selectProductLabel: 'Choose Farm Product or Ramadan Bundle:',
      quantityLabel: 'Quantity:',
      deliveryZoneLabel: 'Delivery Zone or Farm Pickup:',
      deliveryDateLabel: 'Preferred Delivery / Pickup Date:',
      customerNameLabel: 'Your Full Name:',
      customerPhoneLabel: 'Phone / WhatsApp Number:',
      referralLabel: 'Loyalty / Referral Code (5% Discount + Bonus Points):',
      referralPlaceholder: 'e.g., ATLAS5 or friend’s code',
      paymentMethodNote: 'Payment Method: Cash on Delivery (COD) in Moroccan Dirhams (MAD)',
      subtotalLabel: 'Products Subtotal:',
      discountLabel: 'Referral / Loyalty Discount (5%):',
      deliveryFeeLabel: 'Zone Delivery Fee:',
      totalMadLabel: 'Total to Pay on Delivery:',
      pointsEarnedLabel: 'Loyalty Points Earned:',
      placeOrderBtn: 'Place Order & Generate Tracking Code',
      subBoxTitle: '2. Daily Fresh Milk Subscription Plans',
      subBoxSubtitle:
        'Never run out of morning milk. Subscribe to a regular daily delivery schedule for your household, café, or restaurant in Taroudant.',
      customLitersLabel: 'Custom Daily Volume (Litres / Day):',
      monthlyVolumeLabel: 'Monthly Supply (30 Days):',
      standardCostLabel: 'Standard Monthly Cost:',
      subSavingsLabel: 'Subscriber Savings:',
      netMonthlyLabel: 'Monthly Subscription Total:',
      subscribeWhatsappBtn: 'Activate Subscription via WhatsApp',
      loyaltyBannerTitle: 'Loyalty & Referral Program — Share the Harvest',
      loyaltyBannerText:
        'Every 10 MAD spent earns 1 Atlas Loyalty Point toward free farm butter, country eggs, or delivery waivers. Share code ATLAS5 with neighbors in Taroudant to give them 5% off their first order.',
      trackerTitle: 'Live Order Tracking & WhatsApp Confirmation',
      statusLabels: {
        confirmed: '1. Order Confirmed',
        preparing_milking: '2. Morning Milking & Packing',
        out_for_delivery: '3. Out for Delivery in Taroudant',
        delivered: '4. Delivered (COD Paid)',
      },
      advanceStatusBtn: 'Simulate Next Delivery Stage',
      confirmOnWhatsappBtn: 'Send Order Confirmation on WhatsApp',
    },
    fr: {
      kicker: 'Commande en Ligne, Livraison & Abonnements Lait · Paiement à la Livraison (MAD)',
      title: 'Commandez Votre Lait Frais ou Abonnez-Vous aux Livraisons Quotidiennes',
      subtitle:
        'Choisissez vos produits fermiers, sélectionnez le retrait à la ferme ou la livraison à Taroudant et ses environs, suivez votre commande et confirmez sur WhatsApp.',
      orderBoxTitle: '1. Commande en Ligne & Calculateur de Livraison (Taroudant)',
      selectProductLabel: 'Choisir un Produit ou Panier Ramadan :',
      quantityLabel: 'Quantité :',
      deliveryZoneLabel: 'Zone de Livraison ou Retrait Ferme :',
      deliveryDateLabel: 'Date de Livraison / Retrait Souhaitée :',
      customerNameLabel: 'Votre Nom Complet :',
      customerPhoneLabel: 'Téléphone / WhatsApp :',
      referralLabel: 'Code Parrainage / Fidélité (-5% de remise) :',
      referralPlaceholder: 'ex. ATLAS5',
      paymentMethodNote: 'Mode de paiement : Paiement à la livraison (Cash on Delivery) en MAD',
      subtotalLabel: 'Sous-total Produits :',
      discountLabel: 'Remise Parrainage (-5%) :',
      deliveryFeeLabel: 'Frais de Livraison :',
      totalMadLabel: 'Total à Payer à la Livraison :',
      pointsEarnedLabel: 'Points Fidélité Gagnés :',
      placeOrderBtn: 'Valider la Commande & Suivre la Livraison',
      subBoxTitle: '2. Forfaits d’Abonnement Lait Frais Quotidien',
      subBoxSubtitle:
        'Recevez chaque matin votre lait frais directement de la ferme pour votre foyer, restaurant ou café à Taroudant.',
      customLitersLabel: 'Volume Quotidien Personnalisé (Litres / Jour) :',
      monthlyVolumeLabel: 'Volume Mensuel (30 Jours) :',
      standardCostLabel: 'Tarif Mensuel Standard :',
      subSavingsLabel: 'Économie Abonné :',
      netMonthlyLabel: 'Total Mensuel Abonnement :',
      subscribeWhatsappBtn: 'Souscrire à ce Forfait sur WhatsApp',
      loyaltyBannerTitle: 'Programme de Fidélité & Parrainage',
      loyaltyBannerText:
        'Chaque tranche de 10 MAD vous rapporte 1 Point Fidélité Atlas échangeable contre du beurre fermier ou des œufs beldia. Partagez le code ATLAS5 pour offrir 5% de réduction.',
      trackerTitle: 'Suivi des Commandes en Temps Réel & Confirmation WhatsApp',
      statusLabels: {
        confirmed: '1. Commande Confirmée',
        preparing_milking: '2. Traite du Matin & Préparation',
        out_for_delivery: '3. En Cours de Livraison (Taroudant)',
        delivered: '4. Livrée (Payée à la réception)',
      },
      advanceStatusBtn: 'Passer à l’Étape Suivante',
      confirmOnWhatsappBtn: 'Confirmer la Commande sur WhatsApp',
    },
    ar: {
      kicker: 'الطلب عبر الإنترنت، التوصيل واشتراكات الحليب اليومية · الدفع عند الاستلام (درهم)',
      title: 'اطلب الحليب الطري ومنتجات الضيعة أو اشترك في التوصيل اليومي',
      subtitle:
        'اختر المنتجات والكمية المطلوبة، وحدد الاستلام من الضيعة أو التوصيل إلى تارودانت والمناطق المجاورة، مع تتبع حالة الطلب وتأكيده عبر واتساب.',
      orderBoxTitle: '1. طلب المنتجات وحساب رسوم التوصيل بتارودانت',
      selectProductLabel: 'اختر المنتج الفلاحي أو قفة رمضان:',
      quantityLabel: 'الكمية المطلوبة:',
      deliveryZoneLabel: 'منطقة التوصيل أو الاستلام من الضيعة:',
      deliveryDateLabel: 'تاريخ التوصيل أو الاستلام المفضل:',
      customerNameLabel: 'الاسم الكامل:',
      customerPhoneLabel: 'رقم الهاتف / واتساب:',
      referralLabel: 'رمز الوفاء أو الإحالة (تخفيض 5% + نقاط مكافأة):',
      referralPlaceholder: 'مثال: ATLAS5',
      paymentMethodNote: 'طريقة الدفع: الدفع نقداً عند الاستلام (Cash on Delivery) بالدرهم المغربي',
      subtotalLabel: 'مجموع المنتجات:',
      discountLabel: 'تخفيض الإحالة والوفاء (5%):',
      deliveryFeeLabel: 'رسوم التوصيل حسب المنطقة:',
      totalMadLabel: 'المبلغ الإجمالي عند الاستلام:',
      pointsEarnedLabel: 'نقاط الوفاء المكتسبة:',
      placeOrderBtn: 'تأكيد الطلب وإصدار رمز التتبع',
      subBoxTitle: '2. باقات الاشتراك اليومي في الحليب الطري',
      subBoxSubtitle:
        'توصيل يومي منتظم لحليب البقر الطري الصباحي للأسر، المقاهي، الفنادق والمطاعم في تارودانت.',
      customLitersLabel: 'الكمية اليومية المخصصة (لتر / يوم):',
      monthlyVolumeLabel: 'الكمية الشهرية (30 يوماً):',
      standardCostLabel: 'التكلفة الشهرية العادية:',
      subSavingsLabel: 'قيمة التوفير الشهري:',
      netMonthlyLabel: 'المبلغ الشهري للاشتراك:',
      subscribeWhatsappBtn: 'تفعيل الاشتراك عبر واتساب',
      loyaltyBannerTitle: 'برنامج الوفاء والإحالة — مكافآت زبناء الضيعة',
      loyaltyBannerText:
        'كل 10 دراهم من مشترياتكم تمنحكم نقطة وفاء واحدة قابلة للاستبدال بالبيض البلدي أو الزبدة البلدية، واستخدموا الرمز ATLAS5 للاستفادة من تخفيض 5%.',
      trackerTitle: 'تتبع حالة الطلبات وتأكيد واتساب المباشر',
      statusLabels: {
        confirmed: '1. تم تأكيد الطلب',
        preparing_milking: '2. الحلب الصباحي وتجهيز الطلب',
        out_for_delivery: '3. في الطريق للتوصيل بتارودانت',
        delivered: '4. تم التسليم بنجاح',
      },
      advanceStatusBtn: 'تحديث مرحلة التوصيل',
      confirmOnWhatsappBtn: 'إرسال تأكيد الطلب عبر واتساب',
    },
  }[language];

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customerName.trim().length < 2 || customerPhone.trim().length < 8) {
      setOrderError(
        language === 'ar'
          ? 'يرجى إدخال الاسم ورقم الهاتف لتأكيد الطلب.'
          : language === 'fr'
            ? 'Veuillez saisir votre nom et votre numéro de téléphone.'
            : 'Please enter your full name and phone number to confirm your order.'
      );
      return;
    }
    setOrderError('');

    const drivers = [
      'Youssef (Taroudant Van #1)',
      'Abdelkrim (Souss Cold Route #2)',
    ];
    const newOrder: CustomerOrderRecord = {
      id: `ord-${Date.now()}`,
      trackingCode: `AF-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      productTitle: selectedProduct.title[language],
      quantity,
      unitLabel: selectedProduct.unitLabel[language],
      unitPriceMad: selectedProduct.unitPriceMad,
      deliveryZoneId,
      deliveryDate,
      paymentMethod: 'cod',
      referralCodeUsed: hasValidReferral ? referralCode.trim() : undefined,
      subtotalMad: orderSummary.subtotalMad,
      discountMad: orderSummary.discountMad,
      deliveryFeeMad: orderSummary.deliveryFeeMad,
      totalMad: orderSummary.totalMad,
      loyaltyPointsEarned: orderSummary.loyaltyPointsEarned,
      status: 'confirmed',
      assignedDriver:
        deliveryZoneId === 'pickup_farm'
          ? 'On-Farm Courtyard Pickup'
          : drivers[orders.length % drivers.length],
      createdAt: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    onCreateOrder(newOrder);
    setCustomerName('');
    setCustomerPhone('');
  };

  const nextStatusMap: Record<OrderStatus, OrderStatus> = {
    confirmed: 'preparing_milking',
    preparing_milking: 'out_for_delivery',
    out_for_delivery: 'delivered',
    delivered: 'confirmed',
  };

  return (
    <section
      id="online-ordering"
      className="py-16 lg:py-24 border-b border-[#1C251E]/10 bg-[#FAF7F2]"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <p className="text-xs font-medium tracking-wide text-[#5C4033]">
            {copy.kicker}
          </p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A3A2A] tracking-tight text-balance">
            {copy.title}
          </h2>
          <p className="text-base text-[#3A473D] leading-relaxed">
            {copy.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Columns: Online Ordering & Delivery Calculator */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#F2ECE1] border border-[#1C251E]/12 space-y-6">
            <div className="flex items-center gap-2.5">
              <ShoppingBag
                className="w-5 h-5 text-[#1A3A2A]"
                aria-hidden="true"
              />
              <h3 className="font-display text-xl font-bold text-[#1A3A2A]">
                {copy.orderBoxTitle}
              </h3>
            </div>

            <form onSubmit={handleOrderSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="order-product-select"
                    className="block text-xs font-semibold text-[#1A3A2A] mb-1.5"
                  >
                    {copy.selectProductLabel}
                  </label>
                  <select
                    id="order-product-select"
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#1C251E]/20 rounded-xl text-[#1C251E]"
                  >
                    {ORDERABLE_FARM_PRODUCTS.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.title[language]} — {prod.unitPriceMad} MAD /{' '}
                        {prod.unitLabel[language]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="order-quantity-input"
                    className="block text-xs font-semibold text-[#1A3A2A] mb-1.5"
                  >
                    {copy.quantityLabel} ({selectedProduct.unitLabel[language]})
                  </label>
                  <input
                    id="order-quantity-input"
                    type="number"
                    min={1}
                    max={500}
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, Number(e.target.value) || 1))
                    }
                    className="font-mono-tabular w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#1C251E]/20 rounded-xl text-[#1C251E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="order-zone-select"
                    className="block text-xs font-semibold text-[#1A3A2A] mb-1.5"
                  >
                    {copy.deliveryZoneLabel}
                  </label>
                  <select
                    id="order-zone-select"
                    value={deliveryZoneId}
                    onChange={(e) =>
                      setDeliveryZoneId(e.target.value as DeliveryZoneId)
                    }
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#1C251E]/20 rounded-xl text-[#1C251E]"
                  >
                    {TAROUDANT_DELIVERY_ZONES.map((zone) => (
                      <option key={zone.id} value={zone.id}>
                        {zone.name[language]} (+{zone.feeMad} MAD)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="order-date-input"
                    className="block text-xs font-semibold text-[#1A3A2A] mb-1.5"
                  >
                    {copy.deliveryDateLabel}
                  </label>
                  <input
                    id="order-date-input"
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="font-mono-tabular w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#1C251E]/20 rounded-xl text-[#1C251E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="order-cust-name"
                    className="block text-xs font-semibold text-[#1A3A2A] mb-1.5"
                  >
                    {copy.customerNameLabel}
                  </label>
                  <input
                    id="order-cust-name"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g., Rachid Ait Melloul"
                    className="w-full px-3.5 py-2 text-sm bg-[#FAF7F2] border border-[#1C251E]/20 rounded-xl text-[#1C251E]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="order-cust-phone"
                    className="block text-xs font-semibold text-[#1A3A2A] mb-1.5"
                  >
                    {copy.customerPhoneLabel}
                  </label>
                  <input
                    id="order-cust-phone"
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+212 6 00 00 00 00"
                    className="font-mono-tabular w-full px-3.5 py-2 text-sm bg-[#FAF7F2] border border-[#1C251E]/20 rounded-xl text-[#1C251E]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="order-referral-code"
                    className="block text-xs font-semibold text-[#1A3A2A] mb-1.5"
                  >
                    {copy.referralLabel}
                  </label>
                  <input
                    id="order-referral-code"
                    type="text"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value)}
                    placeholder={copy.referralPlaceholder}
                    className="font-mono-tabular w-full px-3.5 py-2 text-sm bg-[#FAF7F2] border border-[#1C251E]/20 rounded-xl text-[#1C251E]"
                  />
                </div>
              </div>

              {orderError && (
                <p role="alert" className="text-xs font-semibold text-[#9E2A2B]">
                  {orderError}
                </p>
              )}

              {/* Live Calculated MAD Order Breakdown */}
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#1C251E]/12 space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-[#5C4033]">{copy.subtotalLabel}</span>
                  <span className="font-mono-tabular font-semibold text-[#1C251E]">
                    {orderSummary.subtotalMad} MAD
                  </span>
                </div>
                {orderSummary.discountMad > 0 && (
                  <div className="flex justify-between text-[#1A3A2A]">
                    <span>{copy.discountLabel}</span>
                    <span className="font-mono-tabular font-semibold">
                      -{orderSummary.discountMad} MAD
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#5C4033]">{copy.deliveryFeeLabel}</span>
                  <span className="font-mono-tabular font-semibold text-[#1C251E]">
                    {orderSummary.deliveryFeeMad} MAD
                  </span>
                </div>
                <div className="pt-2 border-t border-[#1C251E]/10 flex justify-between text-sm sm:text-base font-bold text-[#1A3A2A]">
                  <span>{copy.totalMadLabel}</span>
                  <span className="font-mono-tabular">
                    {orderSummary.totalMad} MAD
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1 text-xs text-[#5C4033]">
                  <span>{copy.paymentMethodNote}</span>
                  <span className="font-mono-tabular font-semibold text-[#1A3A2A]">
                    +{orderSummary.loyaltyPointsEarned} pts
                  </span>
                </div>
              </div>

              <button
                type="submit"
                id="submit-online-order-btn"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-[#FAF7F2] bg-[#1A3A2A] hover:bg-[#254F3A] rounded-xl transition-colors cursor-pointer min-h-[44px]"
              >
                <PackageCheck className="w-4 h-4" aria-hidden="true" />
                <span>{copy.placeOrderBtn}</span>
              </button>
            </form>
          </div>

          {/* Right 5 Columns: Milk Subscription Plans & Loyalty Reward Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-[#F2ECE1] border border-[#1C251E]/12 space-y-5">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Repeat
                    className="w-5 h-5 text-[#1A3A2A]"
                    aria-hidden="true"
                  />
                  <h3 className="font-display text-xl font-bold text-[#1A3A2A]">
                    {copy.subBoxTitle}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#3A473D] leading-relaxed">
                  {copy.subBoxSubtitle}
                </p>
              </div>

              {/* 4 Plan Selector Buttons */}
              <div className="grid grid-cols-2 gap-2">
                {MILK_SUBSCRIPTION_PLANS.map((plan) => {
                  const active = selectedSubPlan === plan.id;
                  return (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setSelectedSubPlan(plan.id)}
                      aria-pressed={active}
                      className={`p-3 rounded-xl border text-start transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#1A3A2A] text-[#FAF7F2] border-[#1A3A2A]'
                          : 'bg-[#FAF7F2] text-[#1C251E] border-[#1C251E]/15 hover:border-[#1A3A2A]'
                      }`}
                    >
                      <span className="block text-xs font-bold">
                        {plan.title[language]}
                      </span>
                      <span
                        className={`block font-mono-tabular text-xs mt-0.5 ${
                          active ? 'text-[#EFEAE0]' : 'text-[#5C4033]'
                        }`}
                      >
                        {plan.dailyLiters} L/day · -{plan.discountPercent}%
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="text-xs font-medium text-[#5C4033]">
                {activeSubPlan.audience[language]}
              </p>

              {selectedSubPlan === 'business_custom' && (
                <div>
                  <label
                    htmlFor="custom-sub-liters"
                    className="block text-xs font-semibold text-[#1A3A2A] mb-1"
                  >
                    {copy.customLitersLabel}
                  </label>
                  <input
                    id="custom-sub-liters"
                    type="number"
                    min={10}
                    max={500}
                    value={customDailyLiters}
                    onChange={(e) =>
                      setCustomDailyLiters(
                        Math.max(10, Number(e.target.value) || 10)
                      )
                    }
                    className="font-mono-tabular w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#1C251E]/20 rounded-lg text-[#1C251E]"
                  />
                </div>
              )}

              {/* Monthly Subscription Summary */}
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#1C251E]/12 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#5C4033]">
                    {copy.monthlyVolumeLabel}
                  </span>
                  <span className="font-mono-tabular font-semibold text-[#1A3A2A]">
                    {subMonthlySummary.monthlyLiters} L
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5C4033]">
                    {copy.standardCostLabel}
                  </span>
                  <span className="font-mono-tabular line-through text-[#5C4033]">
                    {subMonthlySummary.grossMonthlyMad} MAD
                  </span>
                </div>
                <div className="flex justify-between text-[#1A3A2A]">
                  <span>
                    {copy.subSavingsLabel} (-{activeSubPlan.discountPercent}%)
                  </span>
                  <span className="font-mono-tabular font-semibold">
                    -{subMonthlySummary.monthlySavingsMad} MAD
                  </span>
                </div>
                <div className="pt-2 border-t border-[#1C251E]/10 flex justify-between text-sm font-bold text-[#1A3A2A]">
                  <span>{copy.netMonthlyLabel}</span>
                  <span className="font-mono-tabular">
                    {subMonthlySummary.netMonthlyMad} MAD / mo
                  </span>
                </div>
              </div>

              <a
                href={buildWhatsAppInquiryUrl({
                  phone: whatsappNumber,
                  customMessage: `Hello Atlas Farm Taroudant, I would like to subscribe to the ${activeSubPlan.title[language]} (${effectiveDailyLiters} L fresh milk daily — ${subMonthlySummary.netMonthlyMad} MAD/month).`,
                  language,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-[#FAF7F2] bg-[#1A3A2A] hover:bg-[#254F3A] rounded-xl transition-colors whitespace-nowrap shrink-0 min-h-[42px]"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{copy.subscribeWhatsappBtn}</span>
              </a>
            </div>

            {/* Loyalty & Referral Card */}
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#1C251E]/12 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1A3A2A]">
                <Gift className="w-4 h-4 text-[#5C4033]" aria-hidden="true" />
                <span>{copy.loyaltyBannerTitle}</span>
              </div>
              <p className="text-xs text-[#3A473D] leading-relaxed">
                {copy.loyaltyBannerText}
              </p>
            </div>
          </div>
        </div>

        {/* Live Order Status Tracker */}
        {orders.length > 0 && (
          <div className="mt-10 p-6 sm:p-7 rounded-2xl bg-[#F2ECE1] border border-[#1C251E]/15 space-y-4">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#1A3A2A]" aria-hidden="true" />
              <h3 className="font-display text-lg font-bold text-[#1A3A2A]">
                {copy.trackerTitle} ({orders.length})
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {orders.map((ord) => {
                const zoneObj = TAROUDANT_DELIVERY_ZONES.find(
                  (z) => z.id === ord.deliveryZoneId
                );
                return (
                  <div
                    key={ord.id}
                    className="p-4 rounded-xl bg-[#FAF7F2] border border-[#1C251E]/12 space-y-3 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono-tabular font-bold text-[#1A3A2A]">
                        #{ord.trackingCode} · {ord.customerName}
                      </span>
                      <span className="font-mono-tabular font-bold text-[#1A3A2A]">
                        {ord.totalMad} MAD (COD)
                      </span>
                    </div>

                    <p className="text-[#3A473D]">
                      {ord.quantity} × {ord.productTitle} ·{' '}
                      {zoneObj ? zoneObj.name[language] : ord.deliveryZoneId} (
                      {ord.deliveryDate})
                    </p>

                    <div className="p-2.5 rounded-lg bg-[#F2ECE1] flex items-center justify-between">
                      <span className="font-semibold text-[#1A3A2A]">
                        {copy.statusLabels[ord.status]}
                      </span>
                      <span className="text-[#5C4033]">{ord.assignedDriver}</span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() =>
                          onAdvanceOrderStatus(
                            ord.id,
                            nextStatusMap[ord.status]
                          )
                        }
                        className="px-3 py-1.5 text-xs font-semibold text-[#1A3A2A] bg-[#EFEAE0] hover:bg-[#E4DDD0] rounded-lg cursor-pointer"
                      >
                        {copy.advanceStatusBtn}
                      </button>

                      <a
                        href={buildWhatsAppInquiryUrl({
                          phone: whatsappNumber,
                          customMessage: `Order Confirmation #${ord.trackingCode}: ${ord.quantity}x ${ord.productTitle} for ${ord.customerName} (${ord.customerPhone}). Total: ${ord.totalMad} MAD (Cash on Delivery on ${ord.deliveryDate}).`,
                          language,
                        })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#FAF7F2] bg-[#1A3A2A] rounded-lg"
                      >
                        <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{copy.confirmOnWhatsappBtn}</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
