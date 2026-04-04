"use client";

import { useRef, useEffect } from "react";

/** Arabic letters whose final/isolated forms have descending tails */
const TAIL_LETTERS = "يىنبثفقتلكسشصض";
const ARABIC_RE = /[\u0600-\u06FF]/;
const ARABIC_BLOCKS = "\\u0600-\\u06FF\\u0750-\\u077F\\u08A0-\\u08FF\\uFB50-\\uFDFF\\uFE70-\\uFEFF";
const TASHKEEL_BLOCK = "\\u064B-\\u065F";
const EXCLUDE_SELECTOR = "script,style,textarea,input,code,pre,svg,canvas,noscript,select,option,a,button,[role='button'],.no-tail";
const TAIL_WORD_RE = new RegExp(
  `([${ARABIC_BLOCKS}]*[${TAIL_LETTERS}][${TASHKEEL_BLOCK}]*)((?![${ARABIC_BLOCKS}]))`,
  "gu"
);

/**
 * Walk the DOM tree starting from `root` and find all text nodes that contain
 * Arabic characters.  For every word that ends with one of the tail letters,
 * wrap it in `<span class="ar-word-wrap">`.
 */
function processNode(root: Node) {
  if (
    root.nodeType === Node.ELEMENT_NODE &&
    ((root as Element).matches(EXCLUDE_SELECTOR) || (root as Element).closest(EXCLUDE_SELECTOR))
  ) {
    return;
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      // Skip nodes that are already inside an ar-word-wrap span
      if (
        node.parentElement?.classList.contains("ar-word-wrap") ||
        node.parentElement?.closest(".ar-word-wrap") ||
        node.parentElement?.closest(EXCLUDE_SELECTOR)
      ) {
        return NodeFilter.FILTER_REJECT;
      }
      // In blog prose: only process headings, skip body text
      const proseParent = node.parentElement?.closest(".prose-custom");
      if (proseParent) {
        const isInHeading = node.parentElement?.closest("h1,h2,h3,h4,h5,h6");
        if (!isInHeading) return NodeFilter.FILTER_REJECT;
      }
      return ARABIC_RE.test(node.textContent ?? "")
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT;
    },
  });

  const textNodes: Text[] = [];
  let current: Node | null;
  while ((current = walker.nextNode())) {
    textNodes.push(current as Text);
  }

  for (const textNode of textNodes) {
    const text = textNode.textContent ?? "";
    if (!TAIL_WORD_RE.test(text)) continue;

    // Reset lastIndex after the test
    TAIL_WORD_RE.lastIndex = 0;

    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    let modified = false;

    while ((match = TAIL_WORD_RE.exec(text)) !== null) {
      modified = true;

      // Add any text before the match
      if (match.index > lastIndex) {
        fragment.appendChild(
          document.createTextNode(text.slice(lastIndex, match.index))
        );
      }

      // Wrap the matched word
      const span = document.createElement("span");
      span.className = "ar-word-wrap";
      span.textContent = match[1];
      fragment.appendChild(span);

      lastIndex = TAIL_WORD_RE.lastIndex;
    }

    if (!modified) continue;

    // Add any remaining text after the last match
    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    }

    // Replace the original text node with our fragment
    textNode.parentNode?.replaceChild(fragment, textNode);
  }
}

export default function ArabicTailProcessor({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Process existing content
    processNode(container);

    // Observe for dynamically added content
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
            const target = node.nodeType === Node.TEXT_NODE ? node.parentNode : node;
            if (target) {
              processNode(target);
            }
          }
        }
      }
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
