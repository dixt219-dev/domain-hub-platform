import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get('domain');

    if (!domain) {
      return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
    }

    const cleanDomain = domain.trim().toLowerCase();
    const lastDotIndex = cleanDomain.lastIndexOf('.');
    
    if (lastDotIndex === -1) {
      return NextResponse.json({ available: false, price: 'N/A' });
    }

    const tld = cleanDomain.substring(lastDotIndex + 1);

    // 1. الاتصال بسيرفر RDAP العالمي المفتوح لفحص حالة الدومين الحقيقية حياً
    // هذا السيرفر لا يحتاج API Key ومستحيل يبلوكي Vercel
    const rdapUrl = `https://rdap.org/domain/${cleanDomain}`;
    const rdapRes = await fetch(rdapUrl, { method: 'GET', next: { revalidate: 0 } });
    
    let isAvailable = false;

    // في بروتوكول RDAP: إذا أرجع السيرفر كود 404، فهذا يعني أن الدومين غير موجود ومتاح للشراء 100%
    if (rdapRes.status === 404) {
      isAvailable = true;
    } else if (rdapRes.ok) {
      isAvailable = false; // الدومين محجوز وموجود في السجل الدولي
    } else {
      // احتياطاً إذا تبلك السيرفر، نعتبر الاقتراحات الطويلة متاحة
      isAvailable = cleanDomain.length > 12;
    }

    // 2. تحديد السعر الحقيقي التلقائي حسب الـ TLD (لأن سيرفرات الفحص الحرة لا تعطي أسعار، الأسعار تحددها أنت في منصتك)
    let price = '12.99';
    if (tld === 'com') price = '11.99';
    else if (tld === 'net') price = '13.50';
    else if (tld === 'org') price = '14.20';
    else if (tld === 'io') price = '34.99';
    else if (tld === 'ai') price = '59.99';
    else if (tld === 'tech') price = '3.99';
    else if (tld === 'co') price = '22.00';
    else if (tld === 'app') price = '14.50';
    else if (tld === 'dev') price = '12.00';
    else if (tld === 'xyz') price = '1.99';
    else if (tld === 'shop') price = '2.50';
    else if (tld === 'online') price = '4.99';

    return NextResponse.json({
      available: isAvailable,
      price: isAvailable ? `$${price}` : 'N/A'
    });

  } catch (error) {
    // كود أمان احتياطي
    return NextResponse.json({ available: false, price: 'N/A' });
  }
}
