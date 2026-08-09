"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type KhComment = {
  id: string;
  screen_code: string;
  author: string | null;
  body: string;
  created_at: string;
};

type Ctx = {
  active: string | null;
  open: (code: string) => void;
  close: () => void;
  countFor: (code: string) => number;
  commentsFor: (code: string) => KhComment[];
  add: (code: string, author: string, body: string) => Promise<boolean>;
  ready: boolean;
};

const CommentsCtx = createContext<Ctx | null>(null);
export const useComments = () => {
  const c = useContext(CommentsCtx);
  if (!c) throw new Error("useComments outside provider");
  return c;
};

export function CommentsProvider({ children }: { children: ReactNode }) {
  const [all, setAll] = useState<KhComment[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [ready, setReady] = useState(true);

  useEffect(() => {
    fetch("/api/khattaba/comments")
      .then((r) => r.json())
      .then((d) => { setAll(d.comments || []); setReady(d.ready !== false); })
      .catch(() => setReady(false));
  }, []);

  const countFor = useCallback((c: string) => all.reduce((n, x) => (x.screen_code === c ? n + 1 : n), 0), [all]);
  const commentsFor = useCallback((c: string) => all.filter((x) => x.screen_code === c), [all]);

  const add = useCallback(async (code: string, author: string, body: string) => {
    try {
      const res = await fetch("/api/khattaba/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ screen_code: code, author, body }),
      });
      const d = await res.json();
      if (d.comment) { setAll((p) => [...p, d.comment]); return true; }
      return false;
    } catch {
      return false;
    }
  }, []);

  const value = useMemo<Ctx>(() => ({
    active, open: setActive, close: () => setActive(null), countFor, commentsFor, add, ready,
  }), [active, countFor, commentsFor, add, ready]);

  return <CommentsCtx.Provider value={value}>{children}</CommentsCtx.Provider>;
}
