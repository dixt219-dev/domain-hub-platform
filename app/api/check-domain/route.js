import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { domain } = await request.json();
    
    if (!domain || !domain.includes('.')) {
      return NextResponse.json({ available: false, price: "N/A" });
    }

    const lastDotIndex = domain.lastIndexOf('.');
    const domainName = domain.substring(0, lastDotIndex);
    const tld = domain.substring(lastDotIndex + 1);

    const apiKey = "8S6i8iH8e7i8Bb8G7E607IJ9J608o8t856Kw7E8W7QE";

    // طلب البحث القياسي
    const apiUrl = `https://api.dynadot.com/v3/virtual/domain/search?key=${apiKey}&domain=${domainName}&tlds=${tld}`;
    
    const response = await fetch(apiUrl, { method: 'GET' });
    
    if (!response.ok) {
      return NextResponse.json({ available: false, price: "N/A" });
    }

    // قراءة الاستجابة كنص خام لتفادي أخطاء الـ XML
    const rawText = await response.text();
    console.log("Dynadot Raw Response:", rawText); // لمراقبة الرد في Vercel Logs

    let isAvailable = false;
    let realPrice = "12.99";

    // 1. التحقق إذا كانت الاستجابة القادمة بصيغة XML (وهي النظام الافتراضي لـ Dynadot)
    if (rawText.includes('<Available>') || rawText.includes('<available>')) {
      const availableMatch = rawText.match(/<Available>(.*?)<\/Available>/i);
      const priceMatch = rawText.match(/<Price>(.*?)<\/Price>/i);
      
      const status = availableMatch ? availableMatch[1].toLowerCase() : 'no';
      isAvailable = (status === 'yes' || status === 'true');
      
      if (isAvailable && priceMatch) {
        realPrice = priceMatch[1];
      } else if (!isAvailable) {
        realPrice = "N/A";
      }
    } 
    // 2. التحقق كخيار احتياطي إذا تحولت الاستجابة إلى JSON
    else if (rawText.trim().startsWith('{')) {
      const data = JSON.parse(rawText);
      const searchResponse = data?.SearchResponse || data?.searchResponse;
      const searchResult = searchResponse?.SearchResults?.[0] || searchResponse?.searchResults?.[0];
      
      const status = (searchResult?.Available || searchResult?.available || "").toString().toLowerCase();
      isAvailable = (status === "yes" || status === "true");
      
      if (isAvailable) {
        realPrice = searchResult?.Price || searchResult?.price || "12.99";
      } else {
        realPrice = "N/A";
      }
    }

    return NextResponse.json({
      available: isAvailable,
      price: realPrice
    });

  } catch (error) {
    console.error("خطأ أثناء فحص النطاق:", error);
    return NextResponse.json({ available: false, price: "N/A", error: error.message });
  }
}
