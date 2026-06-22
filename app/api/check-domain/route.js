import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { domain } = await request.json();
    
    // جلب المفاتيح بأمان عبر متغيرات البيئة دون هاردكود
    const apiKey = process.env.DOMAIN_API_KEY;
    const secretKey = process.env.DOMAIN_SECRET_KEY;

    if (!apiKey || !secretKey) {
      return NextResponse.json({ error: "Missing API Configuration" }, { status: 500 });
    }

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
