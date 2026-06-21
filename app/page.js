'use client';

import { useState } from 'react';

export default function AdvancedBrandGenerator() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    setLoading(true);
    let clean = keyword.trim().toLowerCase().replace(/\.[a-z]+$/i, '');

    // خوارزمية توليد سريعة وغنية جداً لـ 15 اسماً بامتداادات متنوعة احترافية
    const extensions = ['com', 'net', 'org', 'co', 'io', 'ai', 'tech', 'xyz', 'online', 'app', 'dev', 'me', 'biz', 'info', 'shop'];
    const prefixes = ['cyber', 'smart', 'next', 'vibe', 'nexus', 'alpha', 'nova', 'apex', 'core', 'flow'];
    const suffixes = ['hub', 'labs', 'box', 'zone', 'grid'];

    let suggestions = [];
    
    // توليد ذكي ومتنوع للامتدادات
    extensions.forEach((ext, i) => {
      if (i < 5) suggestions.push(`${clean}${suffixes[i % suffixes.length]}.${ext}`);
      if (i >= 5 && i < 10) suggestions.push(`${prefixes[i % prefixes.length]}${clean}.${ext}`);
      if (i >= 10) suggestions.push(`${clean}.${ext}`);
    });

    // إظهار الحالة المبدئية فوراً للمستخدم بدون تأخير
    const initialResults = suggestions.map(dom => ({
      domain: dom,
      status: 'Checking Live...',
      available: null,
      price: '-'
    }));
    setResults(initialResults);

    // الفحص المتوازي السريع (Async Parallel Fetch) لكي لا يأخذ التوليد وقتاً طويلًا
    const updatedResults = await Promise.all(
      suggestions.map(async (dom) => {
        try {
          const res = await fetch(`/api/check-domain?domain=${dom}`);
          const data = await res.json();
          return {
            domain: dom,
            status: data.available ? 'Available' : 'Taken / Used',
            available: data.available,
            price: data.price
          };
        } catch {
          return { domain: dom, status: 'Unavailable', available: false, price: 'N/A' };
        }
      })
    );

    setResults(updatedResults);
    setLoading(false);
  };

  return (
    <main style={{ padding: '30px 16px', fontFamily: 'system-ui, sans-serif', backgroundColor: '#090d16', color: '#f1f5f9', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-0.5px', color: '#fff' }}>🛡️ Professional Live Domain Scanner</h1>
          <p style={{ color: '#94a3b8', fontSize: '16px', marginTop: '8px' }}>Real prices, live network checks, 15+ extensions supported instantly.</p>
        </header>

        <section style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '16px', padding: '24px', marginBottom: '32px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <form onSubmit={handleGenerate} style={{ display: 'flex', gap: '12px' }}>
            <input 
              type="text" 
              value={keyword} 
              onChange={(e) => setKeyword(e.target.value)} 
              placeholder="Enter your brand keyword (e.g., dabdoba, tech)..." 
              style={{ flex: 1, padding: '14px 16px', backgroundColor: '#030712', border: '1px solid #374151', borderRadius: '10px', color: '#fff', fontSize: '16px', outline: 'none' }} 
            />
            <button 
              type="submit" 
              disabled={loading}
              style={{ padding: '14px 28px', backgroundColor: loading ? '#374151' : '#10b981', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', transition: 'background 0.2s' }}
            >
              {loading ? 'Scanning Registries...' : 'Generate & Verify'}
            </button>
          </form>
        </section>

        <section style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '16px', padding: '20px', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #1f2937', color: '#94a3b8', fontSize: '14px' }}>
                <th style={{ padding: '14px 12px' }}>Suggested Domain</th>
                <th style={{ padding: '14px 12px' }}>Live Status</th>
                <th style={{ padding: '14px 12px' }}>Real Registry Price</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #1f2937', fontSize: '15px', backgroundColor: item.available ? 'rgba(16, 185, 129, 0.02)' : 'transparent' }}>
                  <td style={{ padding: '16px 12px', fontWeight: '600', color: item.available ? '#10b981' : '#fff', fontFamily: 'monospace' }}>{item.domain}</td>
                  <td style={{ padding: '16px 12px' }}>
                    <span style={{ 
                      fontSize: '12px', 
                      padding: '6px 12px', 
                      borderRadius: '20px', 
                      fontWeight: '700',
                      backgroundColor: item.available === true ? 'rgba(16, 185, 129, 0.15)' : item.available === false ? 'rgba(239, 68, 68, 0.15)' : '#1f2937',
                      color: item.available === true ? '#10b981' : item.available === false ? '#ef4444' : '#94a3b8'
                    }}>
                      {item.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 12px', color: item.available ? '#34d399' : '#64748b', fontWeight: '700' }}>
                    {item.price}
                  </td>
                </tr>
              ))}
              {results.length === 0 && (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center', padding: '40px', color: '#64748b', fontSize: '15px' }}>
                    Enter a keyword above to see instant, 100% verified domain options.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

      </div>
    </main>
  );
}
