import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
  }

  try {
    // الاستعلام مباشرة من قاعدة بيانات RDAP العالمية الموثوقة التي تستخدمها شركات التسجيل
    // هذه الخدمة تعطي الحالة الحقيقية للحجز سواء كان الدومين مستخدماً أو مركوناً بدون استضافة
    const res = await fetch(`https://rdap.org/domain/${domain}`, {
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 0 } // منع الكاش تماماً لضمان فحص حي لحظة بلحظة
    });

    // إذا عادت قاعدة البيانات بـ 404، فهذا هو الإثبات القاطع الوحيد في عالم الإنترنت أن الدومين متاح للشراء!
    if (res.status === 404) {
      // جدول أسعار Dynadot / Namecheap الحقيقية التقريبية للتسجيل السنوي لأشهر الامتدادات
      const prices = { com: 13.98, net: 14.98, org: 15.15, io: 38.99, ai: 69.99, tech: 3.99, xyz: 1.99 };
      const ext = domain.split('.').pop();
      const price = prices[ext] || 12.99;

      return NextResponse.json({
        domain,
        available: true,
        statusText: 'Available',
        price: `$${price}`
      });
    }

    // إذا كود الحالة 200 أو أي شيء آخر، فالدومين محجوز رسمياً في السجلات العالمية
    return NextResponse.json({
      domain,
      available: false,
      statusText: 'Taken / Registered',
      price: 'N/A'
    });

  } catch (error) {
    return NextResponse.json({ domain, available: false, statusText: 'Error Checking', price: 'N/A' });
  }
}
