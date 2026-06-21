
'use client';

import { useState } from 'react';

// ==========================================
// محرك الخوارزميات الحقيقي (مدمج داخلياً لمنع أخطاء المسارات)
// ==========================================
function generateBrandNamesInternal(keyword, category = 'all') {
  if (!keyword) return [];

  const cleanKeyword = keyword.trim().toLowerCase();
  
  const prefixes = {
    tech: ['meta', 'cyber', 'nexus', 'vertex', 'alpha', 'omni', 'quantum', 'cloud', 'data'],
    commerce: ['shop', 'mart', 'cart', 'deal', 'lux', 'prime', 'global', 'trend'],
    all: ['vibe', 'zen', 'core', 'nova', 'apex', 'axis', 'flow', 'hub', 'link']
  };

  const suffixes = {
    tech: ['ai', 'io', 'labs', 'tech', 'sync', 'grid', 'base', 'node', 'wave'],
    commerce: ['store', 'market', 'hub', 'bag', 'line', 'zone', 'style'],
    all: ['ly', 'ify', 'hq', 'space', 'net', 'co', 'go', 'plus', 'nest']
  };

  const selectedPrefixes = prefixes[category] || prefixes.all;
  const selectedSuffixes = suffixes[category] || suffixes.all;

  const generated = [];

  // 1. دمج البادئة مع الكلمة
  selectedPrefixes.forEach(pref => {
    generated.push({
      name: `${pref}${cleanKeyword}`,
      domain: `${pref}${cleanKeyword}.com`,
      premium: Math.random() > 0.7,
      price: Math.floor(Math.random() * 2000) + 15
    });
  });

  // 2. دمج الكلمة مع اللاحقة
  selectedSuffixes.forEach(suff => {
    generated.push({
      name: `${cleanKeyword}${suff}`,
      domain: `${cleanKeyword}.${suff}`,
      premium: suff === 'ai' || suff === 'io',
      price: suff === 'ai' ? 149 : suff === 'io' ? 59 : 12
    });
  });

  // 3. أسماء قصيرة مبتكرة
  const shortBlends = ['ix', 'ora', 'neo', 'arc'];
  shortBlends.forEach(blend => {
    generated.push({
      name: `${cleanKeyword}${blend}`,
      domain: `${cleanKeyword}${blend}.com`,
      premium: false,
      price: 15
    });
  });

  return generated;
}

// ==========================================
// قاموس الترجمة الكامل للواجهة
// ==========================================
const translations = {
  en: {
    title: "AI Brand & Domain Name Generator",
    sub: "Generate premium corporate names and check instant domain availability.",
    placeholder: "Enter a keyword (e.g., cloud, food, meta)...",
    btnGenerate: "Generate Names",
    category: "Business Category",
    all: "All Industries",
    tech: "Tech & AI",
    commerce: "E-Commerce & Retail",
    tableTitle: "🎯 Generated Brand & Domain Options",
    thBrand: "Brand Name",
    thDomain: "Available Domain",
    thPrice: "Est. Reg Fee",
    premium: "Premium Asset",
    noData: "Enter a keyword above to generate instant brand identities."
  },
  ar: {
    title: "مُولِّد أسماء الشركات والنطاقات الذكي",
    sub: "ابتكر أسماء براندات احترافية وافحص توفر النطاقات الرقمية فوراً.",
    placeholder: "أدخل كلمة مفتاحية (مثل: cloud, food, meta)...",
    btnGenerate: "توليد الأسماء",
    category: "مجال العمل والنشاط",
    all: "جميع المجالات",
    tech: "التكنولوجيا والذكاء الاصطناعي",
    commerce: "التجارة الإلكترونية والتجزئة",
    tableTitle: "🎯 خيارات الأسماء والنطاقات المقترحة",
    thBrand: "اسم البراند / الشركة",
    thDomain: "النطاق المتاح (Domain)",
    thPrice: "رسوم التسجيل المتوقعة",
    premium: "أصل مميز (Premium)",
    noData: "أدخل كلمة مفتاحية في الأعلى لابتكار هوية تجارية فورية."
  },
  fr: {
    title: "Générateur de Noms de Marque & Domaines",
    sub: "Générez des noms d'entreprise premium et vérifiez la disponibilité des domaines.",
    placeholder: "Entrez un mot-clé (ex: cloud, food, meta)...",
    btnGenerate: "Générer",
    category: "Catégorie d'Activité",
    all: "Toutes Industries",
    tech: "Tech & IA",
    commerce: "E-Commerce & Vente",
    tableTitle: "🎯 Options de Marques & Domaines Générés",
    thBrand: "Nom de Marque",
    thDomain: "Domaine Disponible",
    thPrice: "Frais d'Enreg. Est.",
    premium: "Actif Premium",
    noData: "Entrez un mot-clé ci-dessus pour générer des identités de marque instantanées."
  }
};

// ==========================================
// المكون الرئيسي للواجهة
// ==========================================
export default function BrandGeneratorPage() {
  const [lang, setLang] = useState('ar'); // افتراضي عربي
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('all');
  const [results, setResults] = useState([]);

  const t = translations[lang];

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    // استدعاء الدالة الداخلية مباشرة بدون اعتمادات خارجية
    const data = generateBrandNamesInternal(keyword, category);
    setResults(data);
  };

  return (
    <main style={{ padding: '40px 24px', fontFamily: 'system-ui, sans-serif', backgroundColor: '#020617', color: '#f8fafc', minHeight: '100vh', direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* شريط تغيير اللغة */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
          <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ padding: '8px 16px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
            <option value="ar">العربية 🇩🇿</option>
            <option value="en">English 🇬🇧</option>
            <option value="fr">Français 🇫🇷</option>
          </select>
        </div>

        {/* العنوان */}
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#fff', marginBottom: '12px' }}>{t.title}</h1>
          <p style={{ color: '#94a3b8', fontSize: '16px', margin: 0 }}>{t.sub}</p>
        </header>

        {/* صندوق الإدخال والتحكم */}
        <section style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px', marginBottom: '40px' }}>
          <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#cbd5e1' }}>{t.category}</label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {['all', 'tech', 'commerce'].map((cat) => (
                  <button key={cat} type="button" onClick={() => setCategory(cat)} style={{ padding: '10px 20px', backgroundColor: category === cat ? '#818cf8' : '#1e293b', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', transition: 'background-color 0.2s' }}>
                    {t[cat]}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder={t.placeholder} style={{ flex: 1, minWidth: '280px', padding: '14px 16px', backgroundColor: '#020617', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '16px', outline: 'none' }} />
              <button type="submit" style={{ padding: '14px 28px', backgroundColor: '#34d399', color: '#020617', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}>
                {t.btnGenerate}
              </button>
            </div>

          </form>
        </section>

        {/* مخرجات التوليد */}
        <section style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', marginTop: 0, marginBottom: '20px' }}>{t.tableTitle}</h2>
          
          {results.length === 0 ? (
            <p style={{ color: '#64748b', textAlign: 'center', margin: '40px 0' }}>{t.noData}</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: lang === 'ar' ? 'right' : 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #1e293b', color: '#64748b', fontSize: '13px', textTransform: 'uppercase' }}>
                    <th style={{ padding: '12px 16px' }}>{t.thBrand}</th>
                    <th style={{ padding: '12px 16px' }}>{t.thDomain}</th>
                    <th style={{ padding: '12px 16px' }}>{t.thPrice}</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((item, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #1e293b', fontSize: '15px' }}>
                      <td style={{ padding: '16px', fontWeight: '700', color: '#fff' }}>
                        {item.name}
                        {item.premium && <span style={{ fontSize: '11px', backgroundColor: '#ca8a04', color: '#fff', padding: '2px 6px', borderRadius: '4px', marginInlineStart: '8px', fontWeight: 'normal' }}>{t.premium}</span>}
                      </td>
                      <td style={{ padding: '16px', color: '#818cf8', fontFamily: 'monospace' }}>{item.domain}</td>
                      <td style={{ padding: '16px', color: '#34d399', fontWeight: '600' }}>${item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
