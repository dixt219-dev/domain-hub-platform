'use client';

import { useState } from 'react';

export default function BrandGeneratorPage() {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('all');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    setLoading(true);
    
    // 1. تنظيف الكلمة
    let clean = keyword.trim().toLowerCase().replace(/\.(com|net|org|ai|io)$/i, '');
    if (!clean) { setLoading(false); return; }

    // 2. توليد 5 أسماء ذكية ومقترحة كخطوة أولى
    const suggestions = [
      `${clean}hub.com`,
      `cyber${clean}.com`,
      `${clean}labs.com`,
      `${clean}.ai`,
      `${clean}.io`
    ];

    // نضع حالة مبدئية بأنها قيد الفحص
    const initialResults = suggestions.map(dom => ({
      domain: dom,
      status: 'Checking...',
      available: null,
      price: '-'
    }));
    setResults(initialResults);

    // 3. الفحص الحقيقي عبر الـ API الذي أنشأناه تلو الآخر (Live Verification)
    const updatedResults = [];
    for (let item of initialResults) {
      try {
        const res = await fetch(`/api/check-domain?domain=${item.domain}`);
        const data = await res.json();
        
        updatedResults.push({
          domain: item.domain,
          status: data.available ? 'Available' : 'Taken',
          available: data.available,
          price: data.available ? `$${data.price}` : 'N/A'
        });
      } catch (err) {
        updatedResults.push({
          domain: item.domain,
          status: 'Unknown',
          available: false,
          price: 'N/A'
        });
      }
      // تحديث الواجهة فوراً عند فحص كل دومين لمنح المستخدم شعوراً بالتفاعل الحي
      setResults([...updatedResults, ...initialResults.slice(updatedResults.length)]);
    }

    setLoading(false);
  };

  return (
    <main style={{ padding: '24px 16px', fontFamily: 'system-ui, sans-serif', backgroundColor: '#020617', color: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <header style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#fff' }}>Real-time Domain & Brand Generator</h1>
          <p style={{ color: '#94a3b8', fontSize: '15px' }}>Generates corporate names and double-checks live availability against real registries.</p>
        </header>

        <section style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px', marginBottom: '32px' }}>
          <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input 
              type="text" 
              value={keyword} 
              onChange={(e) => setKeyword(e.target.value)} 
              placeholder="Enter core keyword (e.g., tech, food)..." 
              style={{ width: '100%', boxSizing: 'border-box', padding: '14px 16px', backgroundColor: '#020617', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '16px' }} 
            />
            <button 
              type="submit" 
              disabled={loading}
              style={{ width: '100%', boxSizing: 'border-box', padding: '14px 28px', backgroundColor: loading ? '#334155' : '#34d399', color: '#020617', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}
            >
              {loading ? 'Verifying Availability...' : 'Generate & Check Live Status'}
            </button>
          </form>
        </section>

        <section style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e293b', color: '#64748b', fontSize: '13px' }}>
                <th style={{ padding: '12px 8px' }}>Domain</th>
                <th style={{ padding: '12px 8px' }}>Status</th>
                <th style={{ padding: '12px 8px' }}>Registration Fee</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #1e293b', fontSize: '14px' }}>
                  <td style={{ padding: '14px 8px', fontWeight: '600', color: '#fff', fontFamily: 'monospace' }}>{item.domain}</td>
                  <td style={{ padding: '14px 8px' }}>
                    <span style={{ 
                      fontSize: '12px', 
                      padding: '4px 8px', 
                      borderRadius: '6px', 
                      fontWeight: '700',
                      backgroundColor: item.available === true ? '#065f46' : item.available === false ? '#991b1b' : '#1e293b',
                      color: item.available === true ? '#34d399' : item.available === false ? '#fca5a5' : '#94a3b8'
                    }}>
                      {item.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 8px', color: item.available ? '#34d399' : '#64748b', fontWeight: '600' }}>
                    {item.price}
                  </td>
                </tr>
              ))}
              {results.length === 0 && (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center', padding: '30px', color: '#64748b', fontSize: '14px' }}>
                    Results will appear here with live availability status.
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
