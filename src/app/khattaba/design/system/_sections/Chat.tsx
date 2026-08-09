import { Send, Eye, AlertTriangle, Paperclip, Smile, Clock, ShieldCheck } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../../_components/tokens";
import SectionHeader from "../_components/SectionHeader";

function Bubble({ side, text, time, status }: { side: "me" | "them"; text: string; time: string; status?: "sent" | "delivered" | "read" }) {
  const isMe = side === "me";
  const avatar = (
    <img
      src={isMe ? "/avatars/saudi-male.jpeg" : "/khattaba/avatars/niqab-woman-brown.png"}
      alt=""
      style={{
        width: 30,
        height: 30,
        borderRadius: "50%",
        objectFit: "cover",
        flexShrink: 0,
        display: "block",
      }}
    />
  );
  const bubble = (
    <div
      style={{
        maxWidth: "calc(70% - 40px)",
        background: isMe ? colors.brand.green : colors.surface.page,
        color: isMe ? "#fff" : colors.ink.body,
        padding: "10px 14px",
        borderRadius: radius.lg,
        borderTopRightRadius: isMe ? radius.lg : 4,
        borderTopLeftRadius: isMe ? 4 : radius.lg,
        fontFamily: fonts.body,
        fontSize: 14,
        lineHeight: 1.6,
        border: isMe ? "none" : `1px solid ${colors.border.soft}`,
      }}
    >
      {text}
      <div
        style={{
          fontSize: 10,
          color: isMe ? "rgba(255,255,255,0.7)" : colors.ink.muted,
          marginTop: 4,
          display: "flex",
          alignItems: "center",
          gap: 4,
          justifyContent: isMe ? "flex-end" : "flex-start",
        }}
      >
        <span>{time}</span>
        {isMe && status && <span>{status === "read" ? "✓✓" : status === "delivered" ? "✓✓" : "✓"}</span>}
      </div>
    </div>
  );
  return (
    <div
      style={{
        display: "flex",
        justifyContent: isMe ? "flex-start" : "flex-end",
        gap: 8,
        alignItems: "flex-end",
        marginBottom: 8,
      }}
    >
      {isMe ? <>{avatar}{bubble}</> : <>{bubble}{avatar}</>}
    </div>
  );
}

function SystemMessage({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "16px 0" }}>
      <div
        style={{
          background: colors.surface.page,
          color: colors.ink.muted,
          padding: "4px 12px",
          borderRadius: radius.full,
          fontFamily: fonts.body,
          fontSize: 11,
          fontWeight: 600,
          border: `1px solid ${colors.border.soft}`,
        }}
      >
        {text}
      </div>
    </div>
  );
}

function FilteredMessage({ side }: { side: "me" | "them" }) {
  const isMe = side === "me";
  return (
    <div style={{ display: "flex", justifyContent: isMe ? "flex-start" : "flex-end", marginBottom: 8 }}>
      <div
        style={{
          maxWidth: "70%",
          background: colors.accent.redSoft,
          color: colors.accent.red,
          padding: "10px 14px",
          borderRadius: radius.lg,
          borderTopRightRadius: isMe ? radius.lg : 4,
          borderTopLeftRadius: isMe ? 4 : radius.lg,
          fontFamily: fonts.body,
          fontSize: 13,
          lineHeight: 1.6,
          border: `1px solid ${colors.accent.red}40`,
          display: "flex",
          gap: 8,
          alignItems: "flex-start",
        }}
      >
        <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
        <div>
          <div style={{ fontWeight: 700 }}>تم حظر رسالتك</div>
          <div style={{ fontSize: 12, marginTop: 4, color: colors.accent.red, opacity: 0.9, lineHeight: 1.6 }}>
            حاولت إرسال: «جوالي 05XXXXXXXX، تواصل معي على واتساب»
            <br />
            <strong style={{ display: "inline-block", marginTop: 4 }}>السبب:</strong> رقم جوال + إشارة لتطبيق خارجي. تم إشعار الإدارة.
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatHeader() {
  return (
    <div
      style={{
        padding: "14px 18px",
        background: colors.surface.white,
        borderBottom: `1px solid ${colors.border.default}`,
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <img
        src="/khattaba/avatars/niqab-woman-brown.png"
        alt="نورة"
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          objectFit: "cover",
          flexShrink: 0,
          display: "block",
        }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 700, color: colors.ink.black }}>
            نورة · مشروع خطبة #2487
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 2 }}>
          <span
            style={{
              fontFamily: fonts.body,
              fontSize: 11,
              color: colors.brand.green,
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: colors.brand.green }} /> نشط
          </span>
          <span style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted, display: "inline-flex", alignItems: "center", gap: 4 }}>
            <Clock size={11} /> متبقي 18 يوم
          </span>
        </div>
      </div>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          padding: "4px 10px",
          background: colors.brand.greenSoft,
          color: colors.brand.greenDark,
          border: `1px solid ${colors.brand.green}40`,
          borderRadius: radius.full,
          fontFamily: fonts.body,
          fontSize: 11,
          fontWeight: 700,
        }}
      >
        <ShieldCheck size={12} /> مراقبة الإدارة
      </span>
    </div>
  );
}

function ChatBody() {
  return (
    <div
      style={{
        flex: 1,
        padding: "20px 18px",
        background: colors.surface.white,
        direction: "rtl",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <SystemMessage text="تم فتح غرفة الشات · مدة الجلسة 30 يوم" />
      <Bubble side="them" text="السلام عليكم، يسعدني تواصلك. أتمنى تكون فترة موفقة." time="٩:٠٢ ص" />
      <Bubble side="me" text="وعليكم السلام ورحمة الله، شكراً لقبول الطلب." time="٩:٠٤ ص" status="read" />
      <Bubble side="me" text="إن كنت ترغبين بمعرفة شيء معيّن عني، أنا جاهز للإجابة." time="٩:٠٤ ص" status="read" />
      <Bubble side="them" text="بإذن الله. هل لي أن أسأل عن طبيعة عملك وأهدافك المستقبلية؟" time="٩:٠٧ ص" />
      <FilteredMessage side="me" />
      <Bubble side="me" text="آسف، سأكمل الحديث داخل المنصة. أعمل مهندس برمجيات في الرياض." time="٩:١٢ ص" status="delivered" />
    </div>
  );
}

function ChatInput() {
  return (
    <div
      style={{
        padding: "12px 16px",
        background: colors.surface.white,
        borderTop: `1px solid ${colors.border.default}`,
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <button
        style={{
          width: 38,
          height: 38,
          background: colors.surface.page,
          border: `1px solid ${colors.border.default}`,
          borderRadius: 10,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: colors.ink.muted,
        }}
      >
        <Paperclip size={16} />
      </button>
      <div style={{ flex: 1, position: "relative" }}>
        <input
          style={{
            width: "100%",
            height: 38,
            padding: "0 14px",
            paddingInlineEnd: 36,
            background: colors.surface.page,
            border: `1px solid ${colors.border.default}`,
            borderRadius: 10,
            fontFamily: fonts.body,
            fontSize: 13,
            outline: "none",
          }}
          placeholder="اكتب رسالتك..."
          defaultValue="بإذن الله. والحمد لله أنا"
        />
        <Smile
          size={16}
          style={{
            position: "absolute",
            insetInlineEnd: 12,
            top: "50%",
            transform: "translateY(-50%)",
            color: colors.ink.muted,
          }}
        />
      </div>
      <button
        style={{
          width: 38,
          height: 38,
          background: colors.brand.green,
          color: "#fff",
          border: "none",
          borderRadius: 10,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "none",
        }}
      >
        <Send size={16} />
      </button>
    </div>
  );
}

export default function ChatSection() {
  return (
    <section id="chat" style={{ scrollMarginTop: 24 }}>
      <SectionHeader
        num="14"
        eyebrow="أنماط المحادثة"
        title="المحادثة"
        description="غرفة محادثة مراقبة. رسائلك على اليمين، الطرف الآخر على اليسار."
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 24, alignItems: "start" }}>
        {/* Full chat preview */}
        <div
          style={{
            background: colors.surface.page,
            border: `1px solid ${colors.border.soft}`,
            borderRadius: radius.lg,
            overflow: "hidden",
            height: 620,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ChatHeader />
          <ChatBody />
          <ChatInput />
        </div>

        {/* Pattern breakdown */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Pattern
            title="رسالتي · ME"
            color={colors.brand.green}
            description="على اليمين في RTL، خلفية خضراء، زاوية بدون انحناء من أعلى اليمين."
          />
          <Pattern
            title="رسالة الطرف الآخر"
            color={colors.surface.page}
            textColor={colors.ink.black}
            border
            description="على اليسار في RTL، خلفية رمادية، زاوية بدون انحناء من أعلى اليسار."
          />
          <Pattern
            title="رسالة محظورة"
            color={colors.accent.redSoft}
            textColor={colors.accent.red}
            border
            description="تظهر للمرسل فقط مع تحذير. الإدارة تستقبل إشعار في لوحة Audit Log."
          />
          <Pattern
            title="رسالة نظام"
            color={colors.surface.page}
            textColor={colors.ink.muted}
            description="في المنتصف، pill صغيرة. للأحداث: بداية الجلسة، تمديد، انتهاء."
            pill
          />

          <div
            style={{
              padding: 16,
              background: colors.brand.greenSoft,
              border: `1px solid ${colors.brand.green}40`,
              borderRadius: radius.md,
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
            }}
          >
            <Eye size={16} color={colors.brand.green} style={{ flexShrink: 0, marginTop: 2 }} />
            <div
              style={{
                fontFamily: fonts.body,
                fontSize: 12,
                color: colors.ink.body,
                lineHeight: 1.7,
              }}
            >
              <strong>الفلتر يكتشف:</strong> أرقام الجوال، البريد الإلكتروني، حسابات السوشيال، الروابط، الكلمات الجنسية الصريحة، وعبارات التطرف الديني.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pattern({ title, color, textColor = "#fff", description, border, pill }: { title: string; color: string; textColor?: string; description: string; border?: boolean; pill?: boolean }) {
  return (
    <div
      style={{
        background: colors.surface.white,
        border: `1px solid ${colors.border.soft}`,
        borderRadius: radius.md,
        padding: 14,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div style={{ display: "flex", justifyContent: pill ? "center" : "flex-start" }}>
        <div
          style={{
            background: color,
            color: textColor,
            padding: pill ? "4px 12px" : "8px 12px",
            borderRadius: pill ? radius.full : 10,
            border: border ? `1px solid ${colors.border.soft}` : "none",
            fontFamily: fonts.body,
            fontSize: pill ? 11 : 13,
            fontWeight: pill ? 600 : 500,
          }}
        >
          {pill ? "تم فتح الغرفة" : "نص الرسالة"}
        </div>
      </div>
      <div style={{ fontFamily: fonts.heading, fontSize: 13, fontWeight: 700, color: colors.ink.black }}>
        {title}
      </div>
      <div style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted, lineHeight: 1.6 }}>
        {description}
      </div>
    </div>
  );
}
