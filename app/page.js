export default function CategoryPage({ params }) {
  const category = params.category || 'domains';

  const categoryKeywords = {
    ai:     ['cyber', 'neural', 'mind', 'bot', 'deep', 'coreal', 'smartbot'],
    tech:   ['labs', 'hub', 'grid', 'core', 'flow', 'nexus', 'alpha'],
    crypto: ['coin', 'block', 'chain', 'token', 'wallet', 'bit', 'hash'],
  };

  const currentKeywords = categoryKeywords[category.toLowerCase()] || ['hub', 'box', 'labs', 'next'];

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#0b0f19', color: '#fff', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>

        <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '16px', textTransform: 'uppercase', color: '#2dd4bf' }}>
          Premium {category} Domain Names
        </h1>

        <p style={{ color: '#94a3b8', fontSize: '16px', marginBottom: '40px' }}>
          Explore premium verified web address ideas generated specifically for the{' '}
          <span style={{ color: '#2dd4bf', fontWeight: '600' }}>{category}</span> industry.
        </p>

        <div style={{ backgroundColor: '#131a26', border: '1px solid #1e293b', borderRadius: '12px', padding: '24px', textAlign: 'left' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#f1f5f9' }}>
            Available Ideas for {category}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {currentKeywords.map((keyword) => (
              <div
                key={keyword}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '14px 16px', backgroundColor: '#1a2333', borderRadius: '8px',
                  border: '1px solid #1e293b'
                }}
              >
                <span style={{ fontFamily: 'monospace', fontSize: '16px', color: '#38bdf8', fontWeight: '600' }}>
                  {keyword}{category}.com
                </span>
                <span style={{ fontSize: '12px', padding: '4px 10px', backgroundColor: 'rgba(56,189,248,0.1)', color: '#38bdf8', borderRadius: '4px', fontWeight: '600' }}>
                  SEO Variant
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
