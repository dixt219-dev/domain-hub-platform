'use client';
import { useState } from 'react';

const EXTENSIONS = ['com', 'net', 'org', 'io', 'ai', 'tech', 'co', 'app', 'dev', 'xyz', 'shop', 'online', 'me', 'biz', 'info'];
const PREFIXES  = ['hub', 'box', 'labs', 'next', 'core', 'nova', 'apex', 'flow', 'grid', 'base'];

export default function AdvancedDomainGeneratorPage() {
  const [keyword, setKeyword]   = useState('');
  const [results, setResults]   = useState([]);
  const [loading, setLoading]   = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    setLoading(true);

    const clean = keyword.trim().toLowerCase().replace(/[^a-z0-9]/g, '');

    // Build candidate list
    const candidates = new Set();
    EXTENSIONS.forEach(ext => candidates.add(`${clean}.${ext}`));
    PREFIXES.forEach(pfx => {
      candidates.add(`${clean}${pfx}.com`);
      candidates.add(`${pfx}${clean}.com`);
      candidates.add(`${clean}${pfx}.io`);
    });

    const initialResults = [...candidates].map(dom => ({
      domain: dom,
      status: 'Checking...',
      available: null,
      price: '-',
    }));
    setResults(initialResults);

    // Check in parallel (batches of 5 to avoid rate limits)
    const domainList = [...candidates];
    const batchSize  = 5;

    for (let i = 0; i < domainList.length; i += batchSize) {
      const batch = domainList.slice(i, i + batchSize);
      await Promise.all(batch.map(async (dom) => {
        try {
          const res  = await fetch(`/api/check-domain?domain=${dom}`);
          const data = await res.json();
          setResults(prev =>
            prev.map(r =>
              r.domain === dom
                ? { ...r, status: data.available ? '✅ Available' : '❌ Taken', available: data.available, price: data.price }
                : r
            )
          );
        } catch {
          setResults(prev =>
            prev.map(r => r.domain === dom ? { ...r, status: '⚠️ Error', available: false, price: 'N/A' } : r)
          );
        }
      }));
    }

    setLoading(false);
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#f8fafc', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '800', letterSpacing: '-0.02em', color: '#fff' }}>
            🛡️ Professional Live Domain Scanner
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '8px' }}>
            Real prices, live Dynadot checks, {EXTENSIONS.length}+ extensions supported instantly.
          </p>
        </header>

        {/* Search */}
        <section style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '28px', marginBottom: '32px' }}>
          <form onSubmit={handleGenerate} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <input
              type="text"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              placeholder="Enter your brand keyword (e.g. nova, tech, flow)..."
              style={{
                flex: 1, minWidth: '220px', padding: '14px 18px',
                backgroundColor: '#020617', border: '1px solid #334155',
                borderRadius: '10px', color: '#fff', fontSize: '16px', outline: 'none'
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '14px 28px', backgroundColor: loading ? '#1e293b' : '#10b981',
                border: 'none', borderRadius: '10px', color: '#fff',
                fontSize: '16px', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              {loading ? 'Scanning...' : 'Generate & Verify'}
            </button>
          </form>
        </section>

        {/* Results */}
        {results.length > 0 && (
          <section style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px', overflowX: 'auto' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#94a3b8', marginBottom: '16px' }}>
              Suggested Domains ({results.length})
            </h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1e293b' }}>
                  <th style={{ padding: '10px 12px', color: '#64748b', fontSize: '13px' }}>Suggested Domain</th>
                  <th style={{ padding: '10px 12px', color: '#64748b', fontSize: '13px' }}>Live Status</th>
                  <th style={{ padding: '10px 12px', color: '#64748b', fontSize: '13px' }}>Real Registry Price</th>
                </tr>
              </thead>
              <tbody>
                {results.map((item, idx) => (
                  <tr
                    key={idx}
                    style={{
                      borderBottom: '1px solid #0f172a',
                      backgroundColor: item.available === true ? 'rgba(16,185,129,0.05)' : 'transparent',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    <td style={{ padding: '12px', fontFamily: 'monospace', fontSize: '15px', color: '#38bdf8', fontWeight: '600' }}>
                      {item.domain}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '4px 10px', borderRadius: '20px', fontSize: '13px', fontWeight: '600',
                        backgroundColor:
                          item.available === true  ? 'rgba(16,185,129,0.15)' :
                          item.available === false ? 'rgba(239,68,68,0.15)'  : 'rgba(100,116,139,0.15)',
                        color:
                          item.available === true  ? '#10b981' :
                          item.available === false ? '#ef4444' : '#64748b',
                      }}>
                        {item.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px', color: item.available ? '#10b981' : '#475569', fontWeight: '700' }}>
                      {item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

      </div>
    </main>
  );
}
