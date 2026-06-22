import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // قراءة الدومين من الـ Body لأن الواجهة تبعت POST
    const { domain } = await request.json();

    const apiKey = "8S6i8iH8e7i8Bb8G7E607IJ9J608o8t856Kw7E8W7QE";

    if (!domain) {
      return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
    }

    // الرابط الرسمي لـ Dynadot اللي يرجع JSON نقي مباشرة
    const dynadotUrl = `https://api.dynadot.com/api3.json?key=${apiKey}&command=search&domain0=${domain}`;
    
    const res = await fetch(dynadotUrl, { method: 'GET', next: { revalidate: 0 } });
    const data = await res.json();

    // تحليل استجابة سيرفر Dynadot
    const searchResult = data?.SearchResponse?.SearchResults?.[0];

    if (!searchResult) {
      return NextResponse.json({ available: false, price: 'N/A' });
    }

    const isAvailable = searchResult.Available === 'yes';
    
    if (isAvailable) {
      const price = searchResult.Price || '13.99'; 
      return NextResponse.json({
        available: true,
        price: price
      });
    } else {
      return NextResponse.json({
        available: false,
        price: 'N/A'
      });
    }

  } catch (error) {
    return NextResponse.json({ available: false, price: 'N/A' });
  }
}
