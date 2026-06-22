import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { domain } = await request.json();
    
    // جلب المفاتيح بأمان من إعدادات السيرفر
    const apiKey = process.env.DYNADOT_API_KEY || "8S6i8iH8e7i8Bb8G7E607IJ9J608o8t856Kw7E8W7QE";
    const secretKey = process.env.DYNADOT_SECRET_KEY || "492bf2747f4ee49f00c92f86039b9bd84ad523a568a8281db76ce3c9f1e8e116";

    // طلب الفحص الكامل الذي يحتوي على تفاصيل الأسعار والتجديد
    const response = await fetch(`https://api.dynadot.com/v3/virtual/domain/search?domain=${domain}`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${apiKey}:${secretKey}`).toString('base64')}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    // التحقق من استجابة دينادوت وقراءة الأسعار الحية
    const result = data.results?.[0] || {};
    const isAvailable = result.available === true;
    
    let realPrice = "12.99";
    if (isAvailable && result.price) {
      realPrice = result.price; 
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
