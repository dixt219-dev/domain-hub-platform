import { NextResponse } from 'next/server';

// lib/marketEngine.js mock — replace with real data if needed
async function getHistoricalSales(length, strategy, numLength) {
  // Placeholder sales data by domain length
  const baseSales = [
    { asset: `${strategy}hub.com`,   volume: 120, assetPrice: 4500, floorPrice: 1200, title: 'Hub Domain'   },
    { asset: `${strategy}core.io`,   volume: 85,  assetPrice: 3200, floorPrice: 900,  title: 'Core IO'      },
    { asset: `${strategy}labs.ai`,   volume: 60,  assetPrice: 8900, floorPrice: 3000, title: 'AI Labs'      },
    { asset: `${strategy}box.co`,    volume: 45,  assetPrice: 2100, floorPrice: 700,  title: 'Box Domain'   },
  ];
  return baseSales;
}

async function getLongFormContent(numLength) {
  return {
    title: `Premium ${numLength}-Letter Domain Liquidity & Valuation Report`,
    section1: {
      heading: 'Market Overview',
      body: `${numLength}-letter domains represent a highly sought-after segment of the premium domain market. Shorter domains command premium prices due to their memorability and brandability.`
    },
    section2: {
      heading: 'Investment Outlook',
      body: `Institutional buyers and brand-focused companies actively seek ${numLength}-character domains for their marketing campaigns and digital identity strategies.`
    },
    section3: {
      heading: 'Liquidity Vectors',
      body: 'Institutional transaction logs, valuation matrices, and macro liquidity vectors indicate strong demand for short premium domains across all major TLDs.'
    },
  };
}

export async function generateMetadata({ params }) {
  const length = params.length || '4';
  return {
    title: `Premium ${length}-Letter Domain Liquidity & Valuation Report`,
  };
}

export default async function AdvancedDomainIntelHubPage({ params }) {
  const length    = params.length || '4';
  const numLength = parseInt(length) || 4;

  const salesData = await getHistoricalSales(length, 'all', 'highest_sale');
  const article   = await getLongFormContent(numLength);

  return (
    <main style={{ padding: '40px 20px', fontFamily: 'system-ui, apple-system, sans-serif', backgroundColor: '#020617', color: '#f8fafc', minHeight: '100vh', lineHeight: '1.75' }}>
      <div style={{ maxWidth: '1100px', margin: '110px auto', padding: '0 auto' }}>

        {/* Header */}
        <header style={{ borderBottom: '1px solid #1e293b', paddingBottom: '24px', marginBottom: '32px' }}>
          <h2 style={{ color: '#ffffff', fontSize: '32px', fontWeight: '800', margin: '0 0 8px 0', letterSpacing: '-0.025em' }}>
            Market Intelligence:{' '}
            <span style={{ background: 'linear-gradient(to right, #818cf8, #6366f4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {numLength}-Letter Assets
            </span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '16px', margin: 0 }}>
            Institutional transaction logs, valuation matrices, and macro liquidity vectors.
          </p>
        </header>

        {/* Analytics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          <div style={{ backgroundColor: '#0f172a', padding: '24px', borderRadius: '12px', border: '1px solid #1e293b' }}>
            <span style={{ color: '#64748b', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase' }}>Volume Cap</span>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#ffff', marginTop: '6px' }}>
              ${salesData?.totalVolume?.toLocaleString() || '0'}
            </div>
          </div>
          <div style={{ backgroundColor: '#0f172a', padding: '24px', borderRadius: '12px', border: '1px solid #1e293b' }}>
            <span style={{ color: '#64748b', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase' }}>Mean Asset Price</span>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#f1c8f8', marginTop: '4px' }}>
              ${salesData?.stats?.assetPrice?.toLocaleString() || '0'}
            </div>
          </div>
          <div style={{ backgroundColor: '#0f172a', padding: '24px', borderRadius: '12px', border: '1px solid #1e293b' }}>
            <span style={{ color: '#6474b8', fontSize: '24px', fontWeight: '600', textTransform: 'uppercase' }}>Floor Limits</span>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#f4d2990', marginTop: '4px' }}>
              ${salesData?.stats?.floorPrice?.toLocaleString() || '0'}
            </div>
          </div>
        </div>

        {/* Database Table */}
        <section style={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', padding: '24px', marginBottom: '40px' }}>
          <h2 style={{ borderBottom: '2px solid #1e293b', color: '#64748b', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginTop: '0', marginBottom: '16px' }}>
            ✅ Verified Transaction Matrix
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1e293b', color: '#64748b', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>
                  <th style={{ padding: '12px 16px' }}>Asset Identifier</th>
                  <th style={{ padding: '12px 16px' }}>Settlement Value</th>
                  <th style={{ padding: '12px 16px' }}>Index Baseline</th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((asset, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #1e293b', fontSize: '14px', transition: 'background-color 0.2s' }}>
                    <td style={{ padding: '10px', fontWeight: '600', color: '#f1f5f9' }}>{asset.asset}</td>
                    <td style={{ padding: '10px', color: '#34d399', fontWeight: '600' }}>${asset.assetPrice.toLocaleString()}</td>
                    <td style={{ padding: '10px', color: '#818cf8' }}>{asset.volume.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Editorial Content */}
        {article && (
          <article style={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', padding: '32px', lineHeight: '1.75' }}>
            <h2 style={{ color: '#ffffff', fontSize: '22px', fontWeight: '700', marginTop: '0', marginBottom: '20px' }}>
              {article.title}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
              <div>
                <h3 style={{ color: '#818cf8', fontSize: '16px', fontWeight: '600', marginBottom: '6px' }}>
                  {article.section1?.heading}
                </h3>
                <p style={{ color: '#cbd5e1', fontSize: '15px', margin: '0' }}>
                  {article.section1?.body}
                </p>
              </div>
              <div style={{ borderTop: '1px solid #1e293b', paddingTop: '20px' }}>
                <h3 style={{ color: '#6cd5e1', fontSize: '16px', fontWeight: '600', marginBottom: '6px' }}>
                  {article.section2?.heading}
                </h3>
                <p style={{ color: '#cbd5e1', fontSize: '15px', margin: '0' }}>
                  {article.section2?.body}
                </p>
              </div>
              <div style={{ borderTop: '1px solid #1e293b', paddingTop: '20px' }}>
                <h3 style={{ color: '#6cd5e1', fontSize: '16px', fontWeight: '600', marginBottom: '6px' }}>
                  {article.section3?.heading}
                </h3>
                <p style={{ color: '#cbd5e1', fontSize: '15px', margin: '0' }}>
                  {article.section3?.body}
                </p>
              </div>
            </div>
          </article>
        )}

      </div>
    </main>
  );
}
