import { Smile, Search, Clock, Star, Plus } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../../_components/tokens";
import SectionHeader from "../_components/SectionHeader";

const emojiCategories = [
  { id: "recent",   icon: Clock, label: "حديث",   emojis: ["❤️", "😊", "🌹", "👍", "🙏", "✨", "💐", "😍"] },
  { id: "bookmark", icon: Star,  label: "مفضّل", emojis: ["🌹", "💐", "❤️", "💖"] },
  { id: "smileys",  icon: Smile, label: "وجوه",  emojis: ["😀","😃","😄","😁","😆","😅","🤣","😂","🙂","🙃","😉","😊","😇","🥰","😍","🤩","😘","😗","😚","😙","🥲","😋","😛","😜","🤪","😝","🤑","🤗"] },
];

function EmojiPicker() {
  return (
    <div
      style={{
        width: 360,
        background: colors.surface.white,
        border: `1px solid ${colors.border.default}`,
        borderRadius: radius.lg,
        boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
        overflow: "hidden",
      }}
    >
      {/* Search */}
      <div style={{ padding: 12, borderBottom: `1px solid ${colors.border.soft}` }}>
        <div style={{ position: "relative" }}>
          <Search size={14} style={{ position: "absolute", insetInlineStart: 12, top: "50%", transform: "translateY(-50%)", color: colors.ink.muted }} />
          <input
            style={{
              width: "100%",
              height: 36,
              paddingInlineStart: 36,
              paddingInlineEnd: 12,
              background: colors.surface.page,
              border: `1px solid ${colors.border.default}`,
              borderRadius: 8,
              fontFamily: fonts.body,
              fontSize: 13,
              outline: "none",
            }}
            placeholder="ابحث عن emoji..."
          />
        </div>
      </div>

      {/* Categories tabs */}
      <div
        style={{
          display: "flex",
          padding: "0 8px",
          gap: 4,
          borderBottom: `1px solid ${colors.border.soft}`,
        }}
      >
        {emojiCategories.map((cat, i) => {
          const Icon = cat.icon;
          const active = i === 0;
          return (
            <button
              key={cat.id}
              style={{
                flex: 1,
                padding: "10px 6px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
                color: active ? colors.brand.green : colors.ink.muted,
                borderBottom: active ? `2px solid ${colors.brand.green}` : "2px solid transparent",
                fontFamily: fonts.body,
                fontSize: 10,
                fontWeight: active ? 700 : 500,
              }}
            >
              <Icon size={14} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Emoji grid */}
      <div style={{ padding: 12, maxHeight: 220, overflowY: "auto" }}>
        <div style={{ fontFamily: fonts.body, fontSize: 11, fontWeight: 700, color: colors.ink.muted, marginBottom: 8 }}>
          المستخدمة حديثاً
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 4, marginBottom: 14 }}>
          {emojiCategories[0].emojis.map((e, i) => (
            <button
              key={i}
              style={{
                aspectRatio: "1",
                background: "transparent",
                border: "none",
                fontSize: 22,
                cursor: "pointer",
                borderRadius: 6,
                transition: "all 0.15s",
              }}
            >
              {e}
            </button>
          ))}
        </div>

        <div style={{ fontFamily: fonts.body, fontSize: 11, fontWeight: 700, color: colors.ink.muted, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
          <Star size={11} fill={colors.accent.amber} color={colors.accent.amber} /> مفضّلة
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 4, marginBottom: 14 }}>
          {emojiCategories[1].emojis.map((e, i) => (
            <button
              key={i}
              style={{
                aspectRatio: "1",
                background: colors.accent.amber + "14",
                border: `1px solid ${colors.accent.amber}30`,
                fontSize: 22,
                cursor: "pointer",
                borderRadius: 6,
              }}
            >
              {e}
            </button>
          ))}
        </div>

        <div style={{ fontFamily: fonts.body, fontSize: 11, fontWeight: 700, color: colors.ink.muted, marginBottom: 8 }}>
          الوجوه والمشاعر
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 4 }}>
          {emojiCategories[2].emojis.map((e, i) => (
            <button
              key={i}
              style={{
                aspectRatio: "1",
                background: "transparent",
                border: "none",
                fontSize: 22,
                cursor: "pointer",
                borderRadius: 6,
              }}
            >
              {e}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "10px 14px",
          borderTop: `1px solid ${colors.border.soft}`,
          background: colors.surface.page,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: fonts.body,
          fontSize: 11,
          color: colors.ink.muted,
        }}
      >
        <span>اضغط لإضافة</span>
        <button
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            background: "transparent",
            border: "none",
            color: colors.brand.green,
            fontFamily: fonts.body,
            fontSize: 11,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          <Plus size={11} /> أضف للمفضّلة
        </button>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
      <div
        style={{
          background: colors.surface.page,
          border: `1px solid ${colors.border.soft}`,
          borderRadius: radius.lg,
          borderTopLeftRadius: 4,
          padding: "14px 18px",
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: colors.ink.muted,
              display: "inline-block",
              animation: `typingDot 1.4s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes typingDot {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-3px); }
        }
      `}</style>
    </div>
  );
}

function ReactionPicker() {
  const reactions = ["❤️", "👍", "🙏", "✨", "🌹", "👏"];
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", padding: "8px 0" }}>
      <div style={{ position: "relative", display: "inline-block", maxWidth: "70%" }}>
        {/* Floating picker positioned above the bubble */}
        <div
          style={{
            position: "absolute",
            top: -52,
            insetInlineEnd: 0,
            background: colors.surface.white,
            border: `1px solid ${colors.border.default}`,
            borderRadius: radius.full,
            boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
            padding: "6px 10px",
            display: "inline-flex",
            gap: 4,
            zIndex: 2,
          }}
        >
        {reactions.map((r) => (
          <button
            key={r}
            style={{
              width: 32,
              height: 32,
              background: "transparent",
              border: "none",
              fontSize: 18,
              cursor: "pointer",
              borderRadius: "50%",
              transition: "transform 0.15s",
            }}
          >
            {r}
          </button>
        ))}
        <div style={{ width: 1, background: colors.border.soft, margin: "4px 4px" }} />
        <button
          style={{
            width: 32,
            height: 32,
            background: colors.surface.page,
            border: "none",
            cursor: "pointer",
            borderRadius: "50%",
            color: colors.ink.muted,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Plus size={14} />
        </button>
        </div>

        {/* Sample message bubble that anchors the picker */}
        <div
          style={{
            background: colors.surface.page,
            border: `1px solid ${colors.border.soft}`,
            padding: "12px 14px",
            borderRadius: radius.lg,
            borderTopLeftRadius: 4,
            fontFamily: fonts.body,
            fontSize: 14,
            color: colors.ink.body,
            lineHeight: 1.6,
          }}
        >
          السلام عليكم، يسعدني تواصلك. أتمنى تكون فترة موفقة.
        </div>
      </div>
    </div>
  );
}

function MessageWithReactions() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
      <div
        style={{
          background: colors.surface.page,
          border: `1px solid ${colors.border.soft}`,
          padding: "10px 14px",
          borderRadius: radius.lg,
          borderTopLeftRadius: 4,
          fontFamily: fonts.body,
          fontSize: 14,
          color: colors.ink.body,
          maxWidth: 280,
          lineHeight: 1.6,
        }}
      >
        السلام عليكم، يسعدني تواصلك. أتمنى تكون فترة موفقة.
      </div>
      <div
        style={{
          marginTop: -8,
          marginInlineStart: 12,
          display: "inline-flex",
          gap: 4,
        }}
      >
        {[
          { emoji: "❤️", count: 2 },
          { emoji: "🙏", count: 1 },
        ].map((r) => (
          <span
            key={r.emoji}
            style={{
              background: colors.surface.white,
              border: `1px solid ${colors.border.default}`,
              borderRadius: radius.full,
              padding: "3px 8px",
              fontFamily: fonts.body,
              fontSize: 11,
              fontWeight: 600,
              color: colors.ink.body,
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
            }}
          >
            <span style={{ fontSize: 13 }}>{r.emoji}</span>
            <span style={{ fontFamily: fonts.latin }}>{r.count}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Showcase({ title, children, cols = 1 }: { title: string; children: React.ReactNode; cols?: number }) {
  return (
    <div style={{ background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: 20, padding: 24 }}>
      <div style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 600, color: colors.ink.body, marginBottom: 14 }}>
        {title}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 20 }}>{children}</div>
    </div>
  );
}

export default function ChatExtrasSection() {
  return (
    <section id="chat-extras" style={{ scrollMarginTop: 24 }}>
      <SectionHeader
        num="21"
        eyebrow="إضافات المحادثة"
        title="إضافات الشات"
        description="مختار الرموز، مؤشّر الكتابة، والـ Reactions."
        accentColor={colors.accent.purple}
      />

      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 20, alignItems: "start" }}>
        <Showcase title="Emoji Picker · مع categories ومفضّلة">
          <EmojiPicker />
        </Showcase>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Showcase title="Typing Indicator · animation">
            <div
              style={{
                background: colors.surface.page,
                padding: "20px 16px",
                borderRadius: radius.md,
                direction: "rtl",
              }}
            >
              <TypingIndicator />
              <div style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted, marginTop: 8, textAlign: "end" }}>
                نورة تكتب الآن...
              </div>
            </div>
          </Showcase>

          <Showcase title="Reaction Picker · يظهر عند hover">
            <div style={{ direction: "rtl", padding: "60px 16px 16px", background: colors.surface.page, borderRadius: radius.md }}>
              <ReactionPicker />
            </div>
          </Showcase>

          <Showcase title="Message with Reactions">
            <div style={{ direction: "rtl", padding: "12px 16px", background: colors.surface.page, borderRadius: radius.md }}>
              <MessageWithReactions />
            </div>
          </Showcase>
        </div>
      </div>
    </section>
  );
}
