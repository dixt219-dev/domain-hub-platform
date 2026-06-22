import { NextResponse } from 'next/server';

const DYNADOT_API_KEY = process.env.DYNADOT_API_KEY;

const TLD_PRICES = {
  com: '11.99', net: '13.50', org: '14.20',
  io: '34.99', ai: '59.99', tech: '3.99',
  co: '22.00', app: '14.50', dev: '12.00',
  xyz: '1.99', shop: '2.58', online: '4.99',
  me: '9.99', biz: '9.99', info: '9.99',
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get('domain');

    if (!domain) {
      return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
    }

    const cleanDomain = domain.trim().toLowerCase();
    const lastDotIndex = cleanDomain.lastIndexOf('.');

    if (lastDotIndex === -1) {
      return NextResponse.json({ available: false, price: 'N/A' });
    }

    const tld = cleanDomain.substring(lastDotIndex + 1);
    const price = TLD_PRICES[tld] ?? '12.99';

    if (!DYNADOT_API_KEY) {
      return NextResponse.json({ error: 'API key missing in Vercel config' }, { status: 500 });
    }

    const dynadotUrl = `https://api.dynadot.com/api3.json?key=${DYNADOT_API_KEY}&command=search&domain0=${cleanDomain}`;
    
    // تحديد مهلة زمنية للطلب (4 ثوانٍ) لمنع تعليق خوادم Vercel والواجهة
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(dynadotUrl, { 
      next: { revalidate: 0 },
      signal: controller.signal 
    });
    
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Dynadot HTTP error: ${res.status}`);
    }

    const data = await res.json();
    const results = data?.SearchResponse?.SearchResults?.SearchResult;
    const result = Array.isArray(results) ? results[0] : results;

    if (!result) {
      throw new Error('No result block from Dynadot');
    }

    const isAvailable = result.Available?.toLowerCase() === 'yes';

    return NextResponse.json({
      available: isAvailable,
      price: isAvailable ? `$${price}` : 'N/A'
    });

  } catch (error) {
    console.error('API backend error:', error.message);
    return NextResponse.json({ 
      available: false, 
      price: 'N/A', 
      error: error.message 
    }, { status: 500 });
  }
}
