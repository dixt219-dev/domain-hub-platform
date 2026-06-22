import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { domain } = await request.json();
    
    // التحقق من وجود نقطة لفصل الامتداد عن اسم النطاق
    if (!domain.includes('.')) {
      return NextResponse.json({ available: false, price: "N/A" });
    }

    // تفكيك النطاق: fgggghub.com يصبح domainName = fgggghub و tld = com
    const lastDotIndex = domain.lastIndexOf('.');
    const domainName = domain.substring(0, lastDotIndex);
    const tld = domain.substring(lastDotIndex + 1);

    const apiKey = "8S6i8iH8e7i8Bb8G7E607IJ9J608o8t856Kw7E8W7QE";
    const secretKey = "492bf2747f4ee49f00c92f86039b9bd84ad523a568a8281db76ce3c9f1e116";

    // إرسال الطلب بالصيغة القياسية المعتمدة لفصل الامتدادات في Dynadot
    const response = await fetch(`https://api.dynadot.com/v3/virtual/domain/search?domain=${domainName}&tlds=${tld}`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${apiKey}:${secretKey}`).toString('base64')}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    // قراءة البيانات الحية المسترجعة من السيرفر
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
