import { getHistoricalSalesByLength, getHubLongFormContent } from '../../../lib/marketEngine';

export async function generateMetadata({ params }) {
  const length = params?.length || '4';
  return { 
    title: `Premium ${length}-Letter Domains Liquidity & Valuation Report` 
  };
}

export default async function AdvancedDomainHubPage({ params }) {
  const length = params?.length || '4';
  const numLength = parseInt(length) || 4;

  // جلب البيانات مع تأمين الدوال ضد قيم الـ undefined
  const { salesData, stats } = await getHistoricalSalesByLength(numLength, 'all', 'highest_sale');
  const article = await getHubLongFormContent(numLength);

  return (
    <main style={{ padding: '40px 24px', fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#020617', color: '#f8fafc', minHeight: '100vh', lineSpacing: '1.25' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Header Section */}
        <header style={{ borderBottom: '1px solid #1e293b', paddingBottom: '24px', marginBottom: '32px' }}>
          <h1 style={{ color: '#ffffff', fontSize: '32px', fontWeight: '800', margin: '0 0 8px 0', letterSpacing: '-0.025em' }}>
            Market Intelligence: <span style={{ background: 'linear-gradient(to right, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{numLength}-Letter Assets</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '16px', margin: 0 }}>
            Institutional transaction logs, valuation matrices, and macro liquidity vectors.
          </p>
        </header>

        {/* Analytics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div style={{ backgroundColor: '#0f172a', padding: '24px', borderRadius: '12px', border: '1px solid #1e293b' }}>
            <span style={{ color: '#64748b', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase' }}>Volume Cap</span>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#fff', marginTop: '6px' }}>${stats?.totalVolume?.toLocaleString() || '0'}</div>
          </div>
          <div style={{ backgroundColor: '#0f172a', padding: '24px', borderRadius: '12px', border: '1px solid #1e293b' }}>
            <span style={{ color: '#64748b', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase' }}>Mean Asset Price</span>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#818cf8', marginTop: '6px' }}>${stats?.avgSale?.toLocaleString() || '0'}</div>
          </div>
          <div style={{ backgroundColor: '#0f172a', padding: '24px', borderRadius: '12px', border: '1px solid #1e293b' }}>
            <span style={{ color: '#64748b', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase' }}>Floor Limit</span>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#34d399', marginTop: '6px' }}>${stats?.floorPrice?.toLocaleString() || '0'}</div>
          </div>
        </div>

        {/* Database Table Section */}
        <section style={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', padding: '24px', marginBottom: '40px' }}>
          <h2 style={{ color: '#ffffff', fontSize: '20px', fontWeight: '700', marginTop: '0', marginBottom: '16px' }}>
            📊 Verified Transaction Matrix
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
                {salesData && salesData.map((asset, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #1e293b', fontSize: '14px', transition: 'background-color 0.2s' }}>
                    <td style={{ padding: '16px', fontWeight: '600', color: '#f1f5f9' }}>{asset.name}</td>
                    <td style={{ padding: '16px', color: '#34d399', fontWeight: '600' }}>${asset.lastSale?.toLocaleString()}</td>
                    <td style={{ padding: '16px', color: '#818cf8' }}>${asset.compAverage?.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Editorial Content Section */}
        {article && (
          <article style={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', padding: '32px', lineHeight: '1.75' }}>
            <h2 style={{ color: '#ffffff', fontSize: '22px', fontWeight: '700', marginTop: '0', marginBottom: '20px' }}>
              {article.title}
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
              <div>
                <h3 style={{ color: '#818cf8', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                  {article.section1?.heading}
                </h3>
                <p style={{ color: '#cbd5e1', fontSize: '15px', margin: '0' }}>
                  {article.section1?.body}
                </p>
              </div>
              
              <div style={{ borderTop: '1px solid #1e293b', paddingTop: '20px' }}>
                <h3 style={{ color: '#c084fc', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                  {article.section2?.heading}
                </h3>
                <p style={{ color: '#cbd5e1', fontSize: '15px', margin: '0' }}>
                  {article.section2?.body}
                </p>
              </div>
            </div>
          </article>
        )}

      </div>
    </main>
  );
}
