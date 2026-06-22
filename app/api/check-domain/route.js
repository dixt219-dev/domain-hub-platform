import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // 1. قراءة الدومين من الرابط (Query Params) لأن الواجهة تبعت GET
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get('domain');

    if (!domain) {
      return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
    }

    // مفتاح الواجهة الخاص بك
    const apiKey = "8S6i8iH8e7i8Bb8G7E607IJ9J608o8t856Kw7E8W7QE";

    // 2. استدعاء السيرفر الرسمي لـ Dynadot (صيغة JSON المباشرة القياسية)
    const dynadotUrl = `https://api.dynadot.com/api3.json?key=${apiKey}&command=search&domain0=${domain}`;
    
    const res = await fetch(dynadotUrl, { method: 'GET', next: { revalidate: 0 } });
    
    if (!res.ok) {
      return NextResponse.json({ available: false, price: 'N/A' });
    }

    const data = await res.json();

    // 3. تحليل استجابة سيرفر Dynadot بدقة وحذر
    const searchResult = data?.SearchResponse?.SearchResults?.[0];

    if (!searchResult) {
      return NextResponse.json({ available: false, price: 'N/A' });
    }

    // الاحتياط بتحويل القيمة لنص صغير للتأكد من المقارنة (سواء كانت "yes" أو "Yes")
    const availableStatus = (searchResult.Available || "").toString().toLowerCase();
    const isAvailable = availableStatus === 'yes' || availableStatus === 'true';
    
    if (isAvailable) {
      // جلب السعر الفعلي وإذا لم يتوفر نضع قيمة افتراضية للـ TLD
      const price = searchResult.Price || '12.99'; 
      return NextResponse.json({
        available: true,
        price: `$${price}` // الواجهة عندك تعرض النص مباشرة
      });
    } else {
      return NextResponse.json({
        available: false,
        price: 'N/A'
      });
    }

  } catch (error) {
    console.error("خطأ في السيرفر الداخلي:", error);
    return NextResponse.json({ available: false, price: 'N/A' });
  }
}
