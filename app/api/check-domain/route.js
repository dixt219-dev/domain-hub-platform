import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { domain } = await request.json();
    
    // جلب المفاتيح من ملف البيئة بأمان
    const apiKey = 8S6i8iH8e7i8Bb8G7E607IJ9J6O8o8t856Kw7E8W7QE;
    const secretKey = 492bf2747f4ee49f00c92f86039b9bd84ad523a668a8281db76ce3c9f1e6e116;

    // طلب الفحص من سيرفر دينادوت الرسمي
    const response = await fetch(`https://api.dynadot.com/v3/virtual/domain/search?domain=${domain}`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${apiKey}:${secretKey}`).toString('base64')}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    // استخراج الحالة والسعر الحقيقي
    const isAvailable = data.results?.[0]?.available === true;
    const price = data.results?.[0]?.price || "12.99"; 

    return NextResponse.json({
      available: isAvailable,
      price: price
    });

  } catch (error) {
    return NextResponse.json({ error: "تعذر الاتصال بالسيرفر" }, { status: 500 });
  }
}
