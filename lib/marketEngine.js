// محرك خوارزميات توليد أسماء الشركات والبراندات والنطاقات المتاحة
export function generateBrandNames(keyword, category = 'all') {
  if (!keyword) return [];

  const cleanKeyword = keyword.trim().toLowerCase();
  
  // لاحقات وبوادئ احترافية لبناء أسماء براندات حقيقية
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

  // 1. توليد أسماء دمج (البادئة + الكلمة)
  selectedPrefixes.forEach(pref => {
    generated.push({
      name: `${pref}${cleanKeyword}`,
      domain: `${pref}${cleanKeyword}.com`,
      premium: Math.random() > 0.7,
      price: Math.floor(Math.random() * 2000) + 15
    });
  });

  // 2. توليد أسماء دمج (الكلمة + اللاحقة)
  selectedSuffixes.forEach(suff => {
    generated.push({
      name: `${cleanKeyword}${suff}`,
      domain: `${cleanKeyword}.${suff}`,
      premium: suff === 'ai' || suff === 'io',
      price: suff === 'ai' ? 149 : suff === 'io' ? 59 : 12
    });
  });

  // 3. أسماء براندات مبتكرة قصيرة (حقن الحروف)
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
