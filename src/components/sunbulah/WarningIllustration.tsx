"use client";

/**
 * رسم توضيحي لما يراه الزائر حين يضغط زر التقديم على الوظائف.
 *
 * ليست لقطة شاشة: المتصفح بلا واجهة يوقف الصفحة قبل أن يرسم التحذير أصلا
 * فلا يمكن تصويرها آليا. هذه إعادة رسم لها ومكتوب عليها أنها كذلك.
 */
export default function WarningIllustration() {
  return (
    <figure className="m-0">
      <div className="rounded-[14px] overflow-hidden" style={{ border: `1px solid #E8E8E8` }}>
        <div className="flex items-center gap-1.5 px-3.5" style={{ height: 32, borderBottom: "1px solid #F0F0F0" }}>
          {["#E8E8E8", "#EFEFEF", "#F4F4F4"].map((c) => <span key={c} style={{ width: 7, height: 7, borderRadius: 99, background: c }} />)}
          <span className="mr-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md"
            style={{ background: "#FBEAEA", border: "1px solid #E9C4C4" }}>
            <span style={{ width: 9, height: 9, borderRadius: 2, background: "#B4231E" }} />
            <span className="ar-body text-[10.5px]" style={{ color: "#B4231E", direction: "ltr" }}>career.sunbulahgroup.com</span>
          </span>
        </div>
        <div className="grid place-items-center px-8 py-14 text-center" style={{ background: "#fff" }}>
          <div style={{ maxWidth: 420 }}>
            <div className="mx-auto mb-6 grid place-items-center rounded-full" style={{ width: 58, height: 58, background: "#FBEAEA" }}>
              <span className="ar-heading" style={{ fontSize: 30, color: "#B4231E", lineHeight: 1 }}>!</span>
            </div>
            <p className="ar-heading text-[20px] mb-3" style={{ color: "#0A0A0A" }}>اتصالك ليس خاصا</p>
            <p className="ar-body text-[13px] leading-loose mb-6" style={{ color: "#0A0A0A", opacity: .65 }}>
              قد يحاول المهاجمون سرقة معلوماتك من هذا الموقع. لم يتمكن المتصفح من التحقق
              من أن هذا العنوان يعود فعلا إلى مجموعة السنبلة.
            </p>
            <span className="inline-block px-5 py-2.5 rounded-lg ar-body text-[12.5px]" style={{ background: "#B4231E", color: "#fff" }}>
              العودة إلى بر الأمان
            </span>
          </div>
        </div>
      </div>
      <figcaption className="ar-body text-[11.5px] mt-3 text-center" style={{ color: "#0A0A0A", opacity: .5 }}>
        رسم توضيحي لما يظهر فعليا، لا لقطة شاشة. المتصفح يوقف الصفحة قبل رسمها فيتعذر تصويرها آليا.
      </figcaption>
    </figure>
  );
}
