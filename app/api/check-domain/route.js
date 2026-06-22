import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { domain } = await request.json();
    
    // الأكواد موضوعة هنا كـ نصوص صريحة داخل علامات التنصيص "" لكي ينجح الـ Build 100%
    const apiKey = "8S6i8iH8e7i8Bb8G7E607IJ9J6O8o8t856Kw7E8W7QE";
    const secretKey = "492bf2747f4ee49f00c92f86039b9bd84ad523a668a8281db76ce3c9f1e6e116";

    // إرسال الطلب إلى سيرفر Dynadot لقراءة السعر الحي المتطابق
    const response = await fetch(`https://api.dynadot.com/v3/virtual/domain/search?domain=${domain}`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${apiKey}:${secretKey}`).toString('base64')}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    const result = data.results?.[0] || {};
    const isAvailable = result.available === true;
    
    let realPrice = "12.99";
    if (isAvailable && result.price) {
      realPrice = result.price; // سيقرأ السعر الحي الحقيقي مثل 28.89 تلقائياً
    } else if (!isAvailable) {
      realPrice = "N/A";
    }

    return NextResponse.json({
      available: isAvailable,
      price: realPrice
    });

  } catch (error) {
    return NextResponse.json({ error: "تعذر الاتصال بالسيرفر" }, { status: 500 });
  }
}
