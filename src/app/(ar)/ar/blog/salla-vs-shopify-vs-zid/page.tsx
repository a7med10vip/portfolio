"use client";

import { ShoppingBag, CheckCircle2, XCircle, AlertTriangle, Star } from "lucide-react";
import BlogPost from "@/components/blog/BlogPost";

const G = "#4FFFB0";
const D = "#0A0A0A";
const P = "#5227FF";
const B = "#3B82F6";
const A = "#F59E0B";

function Check() { return <CheckCircle2 size={16} color={G} />; }
function Cross() { return <XCircle size={16} color="rgba(0,0,0,0.15)" />; }

export default function SallaVsShopifyArticle() {
  return (
    <BlogPost
      title="سلة vs شوبيفاي vs زد — أيهم أفضل لمتجرك في 2026؟"
      description="لو بتفكر تفتح متجر إلكتروني في السعودية أو الخليج، فأنت غالباً محتار بين سلة، شوبيفاي، وزد. في هذا الدليل الشامل، هنقارن المنصات الثلاث من كل الزوايا عشان تقدر تاخد القرار الصح."
      category="التجارة الإلكترونية"
      categoryColor={G}
      date="أبريل 2026"
      readingTime="12 دقيقة قراءة"
      heroIcon={ShoppingBag}
      heroGradient={`linear-gradient(135deg, ${D} 0%, #1a1a2e 50%, ${P}40 100%)`}
      lang="ar"
      toc={[
        { id: "intro", title: "نظرة عامة" },
        { id: "pricing", title: "مقارنة الأسعار" },
        { id: "features", title: "المميزات الأساسية" },
        { id: "payments", title: "بوابات الدفع" },
        { id: "seo", title: "السيو والتسويق" },
        { id: "arabic", title: "الدعم العربي" },
        { id: "comparison", title: "جدول المقارنة الشامل" },
        { id: "who", title: "أي منصة تناسبك؟" },
        { id: "verdict", title: "التوصية النهائية" },
      ]}
    >
      {/* ═══ INTRO ═══ */}
      <h2 id="intro">نظرة عامة على المنصات الثلاث</h2>
      <p>
        التجارة الإلكترونية في السعودية والخليج تنمو بشكل مذهل — السوق السعودي وحده تجاوز <strong>80 مليار ريال</strong> في 2025. واختيار المنصة الصح من البداية ممكن يوفر عليك شهور من المشاكل والتكاليف الإضافية.
      </p>
      <p>
        المنصات الثلاث الأشهر في المنطقة هي: <strong>سلة</strong> (سعودية المنشأ، الأسهل استخداماً)، <strong>شوبيفاي</strong> (الأشهر عالمياً، الأقوى في التخصيص)، و<strong>زد</strong> (سعودية، موجهة للمتاجر المتوسطة والكبيرة).
      </p>

      <blockquote>
        <p>القاعدة الذهبية: لا تختار المنصة بناءً على الشهرة — اخترها بناءً على نوع متجرك وحجمه وميزانيتك.</p>
      </blockquote>

      {/* ═══ PRICING ═══ */}
      <h2 id="pricing">مقارنة الأسعار — كم هتدفع فعلياً؟</h2>
      <p>
        الأسعار هي أول سؤال يطرحه أي تاجر. لكن المقارنة مش بس في الاشتراك الشهري — لازم تحسب العمولات، رسوم بوابات الدفع، وتكلفة الإضافات.
      </p>

      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>الخطة</th>
              <th>سلة</th>
              <th>شوبيفاي</th>
              <th>زد</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>المجانية</strong></td><td>متاحة (عمولة 5%)</td><td>غير متاحة</td><td>غير متاحة</td></tr>
            <tr><td><strong>الأساسية</strong></td><td>99 ر.س/شهر</td><td>$39/شهر (~146 ر.س)</td><td>230 ر.س/شهر</td></tr>
            <tr><td><strong>المتقدمة</strong></td><td>299 ر.س/شهر</td><td>$105/شهر (~394 ر.س)</td><td>460 ر.س/شهر</td></tr>
            <tr><td><strong>الاحترافية</strong></td><td>طلب تسعير</td><td>$399/شهر (~1,496 ر.س)</td><td>طلب تسعير</td></tr>
            <tr><td><strong>عمولة على المبيعات</strong></td><td>0% (الخطط المدفوعة)</td><td>0.5-2%</td><td>0%</td></tr>
          </tbody>
        </table>
      </div>

      <div className="callout">
        <div className="callout-title" style={{ color: A }}>💡 نصيحة مهمة</div>
        <p>شوبيفاي يبدو أرخص لكن العمولات + رسوم التحويل + الإضافات المدفوعة ممكن توصل التكلفة لضعف اشتراك سلة. احسب التكلفة الإجمالية مش بس الاشتراك.</p>
      </div>

      {/* ═══ FEATURES ═══ */}
      <h2 id="features">المميزات الأساسية</h2>

      <h3>سلة — البساطة أولاً</h3>
      <ul>
        <li>واجهة عربية بالكامل — ما تحتاج أي خبرة تقنية</li>
        <li>ثيمات جاهزة مصممة للسوق السعودي</li>
        <li>نظام شحن متكامل مع أرامكس وسمسا وفاستلو</li>
        <li>تطبيق جوال جاهز لمتجرك</li>
        <li>نظام ولاء وتسويق بالبريد مدمج</li>
        <li>ربط مباشر مع معروف (وزارة التجارة)</li>
      </ul>

      <h3>شوبيفاي — القوة والمرونة</h3>
      <ul>
        <li>أكثر من 8,000 إضافة (App) متاحة</li>
        <li>تخصيص غير محدود بال Liquid templating</li>
        <li>أقوى نظام تحليلات مدمج</li>
        <li>دعم البيع الدولي متعدد العملات واللغات</li>
        <li>Shopify Markets للتوسع العالمي</li>
        <li>نظام POS للبيع من المتجر الفعلي</li>
      </ul>

      <h3>زد — الحل الوسط</h3>
      <ul>
        <li>نظام فروع متعدد (مناسب لسلاسل المتاجر)</li>
        <li>تكامل مع أنظمة ERP (أودو، SAP)</li>
        <li>نظام موارد بشرية مدمج</li>
        <li>فواتير إلكترونية متوافقة مع هيئة الزكاة (ZATCA)</li>
        <li>لوحة تحكم عربية متقدمة</li>
        <li>API قوي للتكامل مع الأنظمة الخارجية</li>
      </ul>

      {/* ═══ PAYMENTS ═══ */}
      <h2 id="payments">بوابات الدفع — وين فلوسك؟</h2>
      <p>
        بوابات الدفع هي العمود الفقري لأي متجر. في السعودية، العملاء يتوقعون خيارات محلية مثل مدى وApple Pay وتمارا (اشتري الآن وادفع لاحقاً).
      </p>

      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>بوابة الدفع</th>
              <th>سلة</th>
              <th>شوبيفاي</th>
              <th>زد</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>مدى</strong></td><td>✅ مدمج</td><td>✅ عبر HyperPay/Tap</td><td>✅ مدمج</td></tr>
            <tr><td><strong>Apple Pay</strong></td><td>✅</td><td>✅</td><td>✅</td></tr>
            <tr><td><strong>تمارا (BNPL)</strong></td><td>✅ مدمج</td><td>✅ عبر إضافة</td><td>✅ مدمج</td></tr>
            <tr><td><strong>تابي (BNPL)</strong></td><td>✅ مدمج</td><td>✅ عبر إضافة</td><td>✅ مدمج</td></tr>
            <tr><td><strong>STC Pay</strong></td><td>✅</td><td>❌</td><td>✅</td></tr>
            <tr><td><strong>PayPal</strong></td><td>✅</td><td>✅</td><td>✅</td></tr>
            <tr><td><strong>Stripe</strong></td><td>❌</td><td>✅ (رئيسي)</td><td>❌</td></tr>
          </tbody>
        </table>
      </div>

      <blockquote>
        <p>سلة وزد يتفوقون في بوابات الدفع المحلية لأنهم مصممين للسوق السعودي. شوبيفاي يحتاج إضافات خارجية لبعض الخيارات.</p>
      </blockquote>

      {/* ═══ SEO ═══ */}
      <h2 id="seo">السيو والتسويق — مين بيظهرك في جوجل؟</h2>
      <p>
        ده الجزء اللي معظم المقارنات تتجاهله — وهو الأهم. لأن المنصة اللي ما تدعم SEO صح، هتفضل معتمد على الإعلانات المدفوعة للأبد.
      </p>

      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>العنصر</th>
              <th>سلة</th>
              <th>شوبيفاي</th>
              <th>زد</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>تعديل Meta Tags</strong></td><td>✅ أساسي</td><td>✅ متقدم</td><td>✅ أساسي</td></tr>
            <tr><td><strong>URLs نظيفة</strong></td><td>⚠️ محدود</td><td>✅ كامل</td><td>⚠️ محدود</td></tr>
            <tr><td><strong>Sitemap تلقائي</strong></td><td>✅</td><td>✅</td><td>✅</td></tr>
            <tr><td><strong>مدونة مدمجة</strong></td><td>✅</td><td>✅ متقدمة</td><td>✅</td></tr>
            <tr><td><strong>Schema Markup</strong></td><td>⚠️ أساسي</td><td>✅ متقدم (Product, FAQ, Review)</td><td>⚠️ أساسي</td></tr>
            <tr><td><strong>سرعة التحميل</strong></td><td>⚡ ممتازة</td><td>⚡ ممتازة</td><td>⚡ جيدة</td></tr>
            <tr><td><strong>ربط GA4 & GTM</strong></td><td>✅</td><td>✅</td><td>✅</td></tr>
          </tbody>
        </table>
      </div>

      <div className="callout">
        <div className="callout-title" style={{ color: P }}>🔍 رأيي كمتخصص SEO</div>
        <p>شوبيفاي يتفوق في السيو بفارق واضح — URLs أنظف، Schema أقوى، والمدونة أكثر مرونة. لكن سلة كافية لمعظم المتاجر السعودية إذا تم تحسينها صح.</p>
      </div>

      {/* ═══ ARABIC ═══ */}
      <h2 id="arabic">الدعم العربي — مين يفهمك؟</h2>
      <p>
        لو فريقك ما يتكلم إنجليزي أو تبي دعم فني يفهم مشاكل السوق السعودي، ده عامل حاسم.
      </p>

      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>العنصر</th>
              <th>سلة</th>
              <th>شوبيفاي</th>
              <th>زد</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>لوحة التحكم</strong></td><td>عربي بالكامل</td><td>إنجليزي (ترجمة جزئية)</td><td>عربي بالكامل</td></tr>
            <tr><td><strong>الدعم الفني</strong></td><td>عربي 24/7</td><td>إنجليزي فقط</td><td>عربي في أوقات العمل</td></tr>
            <tr><td><strong>التوثيق والشروحات</strong></td><td>عربي شامل</td><td>إنجليزي (مجتمع عربي محدود)</td><td>عربي جيد</td></tr>
            <tr><td><strong>ثيمات عربية RTL</strong></td><td>كلها عربية</td><td>بعض الثيمات (تحتاج تعديل)</td><td>كلها عربية</td></tr>
            <tr><td><strong>ربط مع معروف</strong></td><td>✅ مباشر</td><td>❌</td><td>✅ مباشر</td></tr>
            <tr><td><strong>فوترة ZATCA</strong></td><td>✅</td><td>عبر إضافة</td><td>✅</td></tr>
          </tbody>
        </table>
      </div>

      {/* ═══ COMPARISON ═══ */}
      <h2 id="comparison">جدول المقارنة الشامل</h2>
      <p>ملخص سريع لكل شيء في مكان واحد:</p>

      {/* Visual comparison cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, margin: "24px 0" }}>
        {[
          { name: "سلة", color: G, score: "8.5/10", best: "الأفضل للمبتدئين والمتاجر الصغيرة", pros: ["أسهل استخداماً", "أرخص للبداية", "دعم عربي ممتاز", "بوابات دفع محلية", "خطة مجانية متاحة"], cons: ["تخصيص محدود", "SEO أساسي", "أقل إضافات"] },
          { name: "شوبيفاي", color: P, score: "9/10", best: "الأفضل للتوسع الدولي والتخصيص", pros: ["أقوى في السيو", "8000+ إضافة", "تخصيص غير محدود", "تحليلات متقدمة", "Shopify Markets"], cons: ["أغلى مع العمولات", "دعم إنجليزي فقط", "يحتاج خبرة تقنية"] },
          { name: "زد", color: B, score: "8/10", best: "الأفضل للمتاجر المتوسطة والكبيرة", pros: ["نظام فروع متعدد", "تكامل ERP", "فواتير ZATCA", "API قوي", "دعم عربي"], cons: ["أغلى من سلة", "واجهة أقل بساطة", "مجتمع أصغر"] },
        ].map((platform) => (
          <div key={platform.name} style={{ background: "#fff", border: "1px solid #EBEBEB", borderRadius: 20, padding: 28, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: platform.color }} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontFamily: "'Ahmed Serif Display', serif", fontSize: 22, fontWeight: 700, color: D }}>{platform.name}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: platform.color }}>{platform.score}</span>
            </div>
            <p style={{ fontSize: 12, color: platform.color, fontWeight: 700, marginBottom: 16 }}>{platform.best}</p>
            <div style={{ marginBottom: 12 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: D, marginBottom: 8 }}>المميزات:</p>
              {platform.pros.map((p) => (
                <div key={p} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <Check />
                  <span style={{ fontSize: 12, color: "rgba(0,0,0,0.6)" }}>{p}</span>
                </div>
              ))}
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: D, marginBottom: 8 }}>النقاط السلبية:</p>
              {platform.cons.map((c) => (
                <div key={c} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <Cross />
                  <span style={{ fontSize: 12, color: "rgba(0,0,0,0.4)" }}>{c}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ═══ WHO ═══ */}
      <h2 id="who">أي منصة تناسبك؟ دليل سريع</h2>

      <h3>اختار سلة لو:</h3>
      <ul>
        <li>أنت مبتدئ وما عندك خبرة تقنية</li>
        <li>متجرك يستهدف السوق السعودي بشكل رئيسي</li>
        <li>ميزانيتك محدودة وتبي تبدأ بالمجاني</li>
        <li>تبي دعم فني عربي 24/7</li>
        <li>منتجاتك أقل من 500 منتج</li>
      </ul>

      <h3>اختار شوبيفاي لو:</h3>
      <ul>
        <li>تبي تبيع دولياً (السعودية + دول أخرى)</li>
        <li>تحتاج تخصيص متقدم وتصميم فريد</li>
        <li>عندك فريق تقني أو ميزانية لتوظيف مطور</li>
        <li>السيو أولوية قصوى عندك</li>
        <li>تبي تكامل مع أنظمة متقدمة (ERP, CRM)</li>
      </ul>

      <h3>اختار زد لو:</h3>
      <ul>
        <li>عندك أكثر من فرع أو نقطة بيع</li>
        <li>تحتاج فواتير إلكترونية متوافقة مع ZATCA</li>
        <li>عندك فريق عمل وتحتاج إدارة موارد بشرية</li>
        <li>تبي تكامل مع أنظمة محاسبة (أودو، SAP)</li>
        <li>متجرك متوسط إلى كبير (500+ منتج)</li>
      </ul>

      {/* ═══ VERDICT ═══ */}
      <h2 id="verdict">التوصية النهائية</h2>
      <p>
        بعد العمل مع عشرات المتاجر في السعودية والخليج، رأيي المهني واضح:
      </p>

      <div style={{ background: D, borderRadius: 20, padding: 32, margin: "24px 0" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Star size={24} color={G} fill={G} />
            <span style={{ fontFamily: "'Ahmed Serif Display', serif", fontSize: 20, fontWeight: 700, color: "#fff" }}>للمبتدئين في السعودية → سلة</span>
          </div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.8 }}>
            ابدأ بسلة. سريع، سهل، عربي بالكامل. لما متجرك يكبر ويحتاج مرونة أكثر، ممكن تنتقل لاحقاً.
          </p>
          <hr style={{ border: "none", height: 1, background: "rgba(255,255,255,0.08)", margin: "4px 0" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Star size={24} color={P} fill={P} />
            <span style={{ fontFamily: "'Ahmed Serif Display', serif", fontSize: 20, fontWeight: 700, color: "#fff" }}>للطموح والتوسع → شوبيفاي</span>
          </div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.8 }}>
            لو عندك رؤية دولية أو تحتاج تخصيص عالي، شوبيفاي هو الاستثمار الصح على المدى الطويل.
          </p>
          <hr style={{ border: "none", height: 1, background: "rgba(255,255,255,0.08)", margin: "4px 0" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Star size={24} color={B} fill={B} />
            <span style={{ fontFamily: "'Ahmed Serif Display', serif", fontSize: 20, fontWeight: 700, color: "#fff" }}>للشركات والسلاسل → زد</span>
          </div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.8 }}>
            لو عندك عمليات معقدة، فروع متعددة، وتحتاج تكامل مع أنظمة الشركة، زد يوفر ده بلغة عربية.
          </p>
        </div>
      </div>

      <blockquote>
        <p>محتاج مساعدة في اختيار المنصة المناسبة أو تحسين متجرك الحالي؟ تواصل معي — أقدر أساعدك تاخد القرار الصح بناءً على وضعك الفعلي.</p>
      </blockquote>

    </BlogPost>
  );
}
