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

    const apiUrl = `https://api.dynadot.com/v3/virtual/domain/search?key=${apiKey}&domain=${domainName}&tlds=${tld}&format=json`;
    
    const response = await fetch(apiUrl, { method: 'GET' });
    
    if (!response.ok) {
      console.error(`Dynadot API error status: ${response.status}`);
      return NextResponse.json({ available: false, price: "N/A" });
    }

    const data = await response.json();
    
    // طباعة الرد الحقيقي في سيرفر Vercel لكشف المشكلة بدقة
    console.log("Dynadot Raw Data:", JSON.stringify(data));

    // فحص شامل ومميت لكل الصيغ الممكنة للـ API لمنع الـ N/A
    const searchResponse = data?.SearchResponse || data?.searchResponse;
    const searchResult = searchResponse?.SearchResults?.[0] || searchResponse?.searchResults?.[0] || data?.[0];
    
    if (!searchResult) {
      // إذا كان الرد فارغاً أو هناك مشكلة في المفتاح
      return NextResponse.json({ available: false, price: "Error Key" });
    }

    const availableStatus = (searchResult?.Available || searchResult?.available || "").toString().toLowerCase();
    const isAvailable = availableStatus === "yes" || availableStatus === "true" || availableStatus === "available";
    
    let realPrice = "12.99"; 
    if (isAvailable) {
      realPrice = searchResult?.Price || searchResult?.price || "12.99";
    } else {
      realPrice = "N/A";
    }

    return NextResponse.json({
      available: isAvailable,
      price: realPrice
    });

  } catch (error) {
    console.error("Crash Error:", error);
    return NextResponse.json({ error: "تعذر التحقق" }, { status: 500 });
  }
}
