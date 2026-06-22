import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');

  // استدعاء مفتاح الـ API الخاص بك من Dynadot
  const apiKey = process.env.DYNADOT_API_KEY || "ضع_مفتاح_API_الخاص_بموقع_Dynadot_هنا";

  if (!domain) {
    return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
  }

  try {
    // الاتصال برابط فحص النطاقات الرسمي لشركة Dynadot
    // الأمر 'search' يقوم بفحص التوفر والأسعار لحظياً من السيرفر الخاص بهم
    const dynadotUrl = `https://api.dynadot.com/api3.json?key=${apiKey}&command=search&domain0=${domain}`;
    
    const res = await fetch(dynadotUrl, { method: 'GET', next: { revalidate: 0 } });
    const data = await res.json();

    // تحليل استجابة سيرفر Dynadot
    const searchResult = data?.SearchResponse?.SearchResults?.[0];

    if (!searchResult) {
      return NextResponse.json({ domain, available: false, statusText: 'Error from Registry', price: 'N/A' });
    }

    const isAvailable = searchResult.Available === 'yes';
    
    if (isAvailable) {
      // جلب سعر الحجز الحقيقي بالكسر من Dynadot مباشرة (مثال: 11.99)
      const price = searchResult.Price || '13.99'; 
      return NextResponse.json({
        domain,
        available: true,
        statusText: 'Available',
        price: `$${price}`
      });
    } else {
      return NextResponse.json({
        domain,
        available: false,
        statusText: 'Taken / Used',
        price: 'N/A'
      });
    }

  } catch (error) {
    return NextResponse.json({ domain, available: false, statusText: 'Server Connection Error', price: 'N/A' });
  }
}
