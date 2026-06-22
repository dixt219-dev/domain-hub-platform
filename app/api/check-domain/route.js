import { NextResponse } from 'next/server';

const TLD_PRICES = {
  com: '11.99',
  net: '13.50',
  org: '14.20',
  io: '34.99',
  ai: '59.99',
  tech: '3.99',
  co: '22.00',
  app: '14.50',
  dev: '12.00',
  xyz: '1.99',
  shop: '2.58',
  online: '4.99',
  me: '9.99',
  biz: '9.99',
  info: '9.99',
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get('domain');

    if (!domain) {
      return NextResponse.json(
        { error: 'Domain parameter is required' },
        { status: 400 }
      );
    }

    const cleanDomain = domain.trim().toLowerCase();

    if (!cleanDomain.includes('.')) {
      return NextResponse.json(
        { available: false, price: 'N/A', error: 'Invalid domain format' },
        { status: 400 }
      );
    }

    // Extract TLD
    const lastDotIndex = cleanDomain.lastIndexOf('.');
    const tld = cleanDomain.substring(lastDotIndex + 1);
    const price = TLD_PRICES[tld] || '12.99';

    // Get Dynadot API key
    const DYNADOT_API_KEY = process.env.DYNADOT_API_KEY;

    if (!DYNADOT_API_KEY) {
      console.warn('DYNADOT_API_KEY not configured, using fallback response');
      return NextResponse.json({
        available: false,
        price: `$${price}`,
        domain: cleanDomain,
      });
    }

    // Call Dynadot API with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second timeout

    try {
      const dynadotUrl = `https://api.dynadot.com/api3.json?key=${DYNADOT_API_KEY}&command=search&domain0=${encodeURIComponent(
        cleanDomain
      )}`;

      const response = await fetch(dynadotUrl, {
        method: 'GET',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Dynadot API returned status ${response.status}`);
      }

      const data = await response.json();

      // Parse Dynadot response safely
      let isAvailable = false;
      if (data?.SearchResponse?.SearchResults?.SearchResult) {
        const result = Array.isArray(data.SearchResponse.SearchResults.SearchResult)
          ? data.SearchResponse.SearchResults.SearchResult[0]
          : data.SearchResponse.SearchResults.SearchResult;

        if (result?.Available) {
          isAvailable = result.Available.toLowerCase() === 'yes';
        }
      }

      return NextResponse.json({
        available: isAvailable,
        price: isAvailable ? `$${price}` : 'N/A',
        domain: cleanDomain,
      });
    } catch (fetchError) {
      clearTimeout(timeoutId);

      if (fetchError.name === 'AbortError') {
        console.error('Dynadot API request timeout');
        return NextResponse.json(
          { available: false, price: `$${price}`, domain: cleanDomain, error: 'Timeout' },
          { status: 504 }
        );
      }

      throw fetchError;
    }
  } catch (error) {
    console.error('Domain check error:', error);
    return NextResponse.json(
      { available: false, price: 'N/A', error: 'Domain check failed' },
      { status: 500 }
    );
  }
}
