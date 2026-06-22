// app/explore/[category]/page.js
import { NextResponse } from 'next/server';

// دالة لتوليد الكلمات المفتاحية والعناوين المخصصة للـ SEO تلقائياً لكل صفحة
export async function generateMetadata({ params }) {
  const category = params.category;
  const title = `Find Available Premium ${category.toUpperCase()} Domains | DomainHub`;
  const description = `Explore a curated list of high-quality, available ${category} domain names with real-time price tracking and instant registration options.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function CategoryPage({ params }) {
  const { category } = params;

  // هنا يمكنك وضع قائمة كلمات أولية لإنشاء النطاقات بناءً على التصنيف المختار
  const categoryKeywords = {
    ai: ['cyber', 'neural', 'mind', 'bot', 'deep'],
    tech: ['labs', 'hub', 'grid', 'core', 'flow'],
    crypto: ['coin', 'block', 'chain', 'token', 'wallet']
  };

  const currentKeywords = categoryKeywords[category.toLowerCase()] || ['hub', 'box', 'labs'];

  return (
    <main className="min-h-screen bg-[#0B0F19] text-white p-6">
      <div className="max-w-4xl mx-auto text-center mt-10">
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
          Premium {category.toUpperCase()} Domain Names
        </h1>
        <p className="text-gray-400 mb-8">
          Pre-scanned corporate name options and live availability for the <span className="text-teal-400 font-semibold">{category}</span> sector.
        </p>

        {/* جدول عرض الدومينات المخصصة لهذا القسم المعين لكي يزحف إليه بوت قوقل */}
        <div className="bg-[#131A26] border border-gray-800 rounded-xl p-6 text-left">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">Recommended Extensions for {category}</h2>
          <div className="space-y-3">
            {currentKeywords.map((keyword) => (
              <div key={keyword} className="flex justify-between items-center p-3 bg-[#1A2333] rounded-lg border border-gray-800">
                <span className="font-mono text-lg text-teal-300">{keyword}{category}.com</span>
                <span className="text-sm text-gray-400 font-semibold">SEO Optimized Variant</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
