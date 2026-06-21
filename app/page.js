'use client';

import { useState } from 'react';

// قاموس اللغات للترجمة الفورية داخل الواجهة
const translations = {
  en: {
    title: "Market Intelligence Assets",
    sub: "Institutional transaction logs and valuation matrices.",
    volume: "Volume Cap",
    mean: "Mean Asset Price",
    floor: "Floor Limit",
    tableTitle: "📊 Verified Transaction Matrix",
    thAsset: "Asset Identifier",
    thValue: "Settlement Value",
    thIndex: "Index Baseline",
    articleTitle: "Institutional Deep-Dive",
    desc: "Short-form digital identifiers represent finite cryptographic real estate."
  },
  ar: {
    title: "ذكاء بيانات السوق الرقمية",
    sub: "سجلات المعاملات المؤسسية ومصفوفات التقييم المالي.",
    volume: "إجمالي حجم التداول",
    mean: "متوسط سعر النطاق",
    floor: "الحد الأدنى للسعر (Floor)",
    tableTitle: "📊 مصفوفة المعاملات التي تم التحقق منها",
    thAsset: "معرف النطاق (الأصل)",
    thValue: "قيمة التسوية",
    thIndex: "مؤشر القياس الأساسي",
    articleTitle: "تحليل عميق للمؤسسات",
    desc: "تمثل المعرفات الرقمية قصيرة الطول عقارات رقمية محدودة ومشفرة."
  },
  fr: {
    title: "Intelligence Marché des Actifs",
    sub: "Journaux des transactions institutionnelles et matrices d'évaluation.",
    volume: "Capacité de Volume",
    mean: "Prix Moyen de l'Actif",
    floor: "Limite Plancher",
    tableTitle: "📊 Matrix des Transactions Vérifiées",
    thAsset: "Identifiant de l'Actif",
    thValue: "Valeur de Règlement",
    thIndex: "Indice de Référence",
    articleTitle: "Analyse Approfondie Institutionnelle",
    desc: "Les identifiants numériques courts représentent un immobilier cryptographique fini."
  }
};

// بيانات وهمية سريعة للمحاكاة التفاعلية الفورية في الواجهة
const mockData = {
  3: { volume: 843000, avg: 281000, floor: 120000, sales: [{name: 'xyz.ai', price: 450000}, {name: 'abc.org', price: 273000}] },
  4: { volume: 539000, avg: 269500, floor: 89000, sales: [{name: 'meta.ai', price: 450000}, {name: 'data.org', price: 89000}] }
};

export default function InteractiveDomainHub() {
  const [lang, setLang] = useState('en');
  const [length, setLength] = useState(4);

  const t = translations[lang];
  const currentData = mockData[length];

  return (
    <main style={{ padding: '40px 24px', fontFamily: 'system-ui, sans-serif', backgroundColor: '#020617', color: '#f8fafc', minHeight: '100vh', direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* شريط التحكم العلوي: تغيير اللغة واختيار الطول */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #1e293b' }}>
          <div>
            <span style={{ fontWeight: 'bold', marginRight: lang === 'ar' ? '0' : '8px', marginLeft: lang === 'ar' ? '8px' : '0' }}>Length: </span>
            <button onClick={() => setLength(3)} style={{ padding: '6px 16px', backgroundColor: length === 3 ? '#818cf8' : '#0f172a', color: '#fff', border: '1px solid #334155', borderRadius: '6px', cursor: 'pointer', marginRight: '4px', marginLeft: '4px' }}>3 Letters</button>
            <button onClick={() => setLength(4)} style={{ padding: '6px 16px', backgroundColor: length === 4 ? '#818cf8' : '#0f172a', color: '#fff', border: '1px solid #334155', borderRadius: '6px', cursor: 'pointer' }}>4 Letters</button>
          </div>
          
          <div>
            <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ padding: '6px 12px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155', borderRadius: '6px', cursor: 'pointer' }}>
              <option value="en">English 🇬🇧</option>
              <option value="ar">العربية 🇩🇿</option>
              <option value="fr">Français 🇫🇷</option>
            </select>
          </div>
        </div>

        {/* عنوان الموقع المترجم */}
        <header style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 8px 0', color: '#fff' }}>
            {t.title}: <span style={{ color: '#818cf8' }}>{length}-Letter</span>
          </h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>{t.sub}</p>
        </header>

        {/* بطاقات الإحصائيات المتغيرة ديناميكياً */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '12px', border: '1px solid #1e293b' }}>
            <span style={{ color: '#64748b', fontSize: '12px', fontWeight: '600' }}>{t.volume}</span>
            <div style={{ fontSize: '24px', fontWeight: '700', marginTop: '6px' }}>${currentData.volume.toLocaleString()}</div>
          </div>
          <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '12px', border: '1px solid #1e293b' }}>
            <span style={{ color: '#64748b', fontSize: '12px', fontWeight: '600' }}>{t.mean}</span>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#818cf8', marginTop: '6px' }}>${currentData.avg.toLocaleString()}</div>
          </div>
          <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '12px', border: '1px solid #1e293b' }}>
            <span style={{ color: '#64748b', fontSize: '12px', fontWeight: '600' }}>{t.floor}</span>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#34d399', marginTop: '6px' }}>${currentData.floor.toLocaleString()}</div>
          </div>
        </div>

        {/* الجدول التفاعلي المترجم */}
        <section style={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', padding: '24px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '16px', color: '#fff' }}>{t.tableTitle}</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: lang === 'ar' ? 'right' : 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e293b', color: '#64748b', fontSize: '12px' }}>
                <th style={{ padding: '12px' }}>{t.thAsset}</th>
                <th style={{ padding: '12px' }}>{t.thValue}</th>
              </tr>
            </thead>
            <tbody>
              {currentData.sales.map((asset, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #1e293b' }}>
                  <td style={{ padding: '12px', fontWeight: '600' }}>{asset.name}</td>
                  <td style={{ padding: '12px', color: '#34d399' }}>${asset.price.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

      </div>
    </main>
  );
}
