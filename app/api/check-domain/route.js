import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
  }

  try {
    // نستخدم خدمة مجانية وسريعة جداً لفحص حالة النطاق عبر السيرفر بدون مفاتيح معقدة
    const res = await fetch(`https://rdap.org/domain/${domain}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });

    // إذا أعادت الخدمة 404، فهذا يعني أن الدومين غير مسجل.. أي أنه "متاح للبيع"!
    if (res.status === 404) {
      // نحدد السعر التقريبي الحقيقي بناءً على اللاحقة (TLD)
      let price = 12.99;
      if (domain.endsWith('.ai')) price = 59.99;
      if (domain.endsWith('.io')) price = 38.99;
      if (domain.endsWith('.net')) price = 14.99;

      return NextResponse.json({
        domain,
        available: true,
        statusText: 'Available',
        price: price
      });
    }

    // إذا كان الدومين موجوداً، فهو غير متاح
    return NextResponse.json({
      domain,
      available: false,
      statusText: 'Taken / Registered',
      price: null
    });

  } catch (error) {
    // في حال حدوث خطأ في الشبكة، نعطيه حالة احتياطية ذكية
    return NextResponse.json({ domain, available: false, statusText: 'Check Failed', price: null });
  }
}
