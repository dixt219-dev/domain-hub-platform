import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { domain } = await request.json();
    
    // 1. التحقق من وجود النطاق والنقطة
    if (!domain || !domain.includes('.')) {
      return NextResponse.json({ available: false, price: "N/A" });
    }

    // 2. تفكيك النطاق إلى الاسم والامتداد بدقة
    const lastDotIndex = domain.lastIndexOf('.');
    const domainName = domain.substring(0, lastDotIndex);
    const tld = domain.substring(lastDotIndex + 1);

    // مفتاح الواجهة الخاص بك
    const apiKey = "8S6i8iH8e7i8Bb8G7E607IJ9J608o8t856Kw7E8W7QE";

    // 3. بناء الرابط القياسي مع إضافة format=json لإجبار السيرفر على الرد بصيغة JSON
    const apiUrl = `https://api.dynadot.com/v3/virtual/domain/search?key=${apiKey}&domain=${domainName}&tlds=${tld}&format=json`;
    
    const response = await fetch(apiUrl, { method: 'GET' });
    
    if (!response.ok) {
      return NextResponse.json({ available: false, price: "N/A" });
    }

    const data = await response.json();

    // 4. قراءة المصفوفة من استجابة Dynadot (تأكد من مطابقة حالة الأحرف الكبيرة والصغيرة للـ API)
    const searchResponse = data?.SearchResponse || data?.searchResponse;
    const searchResult = searchResponse?.SearchResults?.[0] || searchResponse?.searchResults?.[0];
    
    // جلب حالة التوفر (تحويلها لنص صغير للاحتياط)
    const availableStatus = (searchResult?.Available || searchResult?.available || "").toString().toLowerCase();
    const isAvailable = availableStatus === "yes" || availableStatus === "true";
    
    let realPrice = "12.99"; 
    if (isAvailable) {
      // جلب السعر الفعلي وإذا لم يتوفر نضع القيمة الافتراضية
      realPrice = searchResult?.Price || searchResult?.price || "12.99";
    } else {
      realPrice = "N/A";
    }

    return NextResponse.json({
      available: isAvailable,
      price: realPrice
    });

  } catch (error) {
    console.error("خطأ أثناء فحص النطاق:", error);
    return NextResponse.json({ error: "تعذر الاتصال بالسيرفر أو قراءة البيانات" }, { status: 500 });
  }
}
