/* The signature markup itself — a table of image slices, which is the one
   layout every mail client renders the same way.

   The slices exist so the phone, email and website lines can carry their own
   links: the card looks like one image, but each contact line is clickable. */

import { CARD, SLICES, WEBSITE, type Person, type Slice, encodePerson, sliceSize } from "./card";

function esc(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function sliceUrl(origin: string, token: string, slice: Slice) {
  return `${origin}/api/signature/img?s=${slice}&d=${token}`;
}

export function sliceUrls(origin: string, person: Person) {
  const token = encodePerson(person);
  return Object.fromEntries(
    SLICES.map((slice) => [slice, sliceUrl(origin, token, slice)])
  ) as Record<Slice, string>;
}

export function buildSignatureHtml(person: Person, origin: string) {
  const token = encodePerson(person);
  const url = (slice: Slice) => esc(sliceUrl(origin, token, slice));
  const tel = `tel:${person.phone.replace(/[^\d+]/g, "")}`;
  const rightWidth = CARD.width - CARD.splitX;

  const img = (slice: Slice, alt: string) => {
    const { width, height } = sliceSize(slice);
    return (
      `<img src="${url(slice)}" width="${width}" height="${height}" alt="${esc(alt)}" ` +
      `style="display:block;border:0;outline:none;width:${width}px;height:${height}px;" />`
    );
  };

  const link = (href: string, inner: string) =>
    `<a href="${esc(href)}" target="_blank" style="text-decoration:none;border:0;outline:none;">${inner}</a>`;

  const rows: string[] = [
    link(WEBSITE, img("r1", `${person.name} — ${person.title}`)),
    link(tel, img("r2", person.phone)),
    link(`mailto:${person.email}`, img("r3", person.email)),
    link(WEBSITE, img("r4", "emotiongrp.com")),
    img("r5", ""),
  ];

  const cells = rows
    .map(
      (row) =>
        `        <tr>\n          <td style="padding:0;font-size:0;line-height:0;border:0;">${row}</td>\n        </tr>`
    )
    .join("\n");

  return `<table cellpadding="0" cellspacing="0" border="0" role="presentation" width="${CARD.width}" style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;width:${CARD.width}px;max-width:${CARD.width}px;background-color:transparent;">
  <tr>
    <td width="${CARD.splitX}" valign="top" style="padding:0;font-size:0;line-height:0;border:0;">${link(
      WEBSITE,
      img("left", "emotion Group — Let Your Brand Talk — Jeddah.Beirut.Riyadh.Egypt")
    )}</td>
    <td width="${rightWidth}" valign="top" style="padding:0;font-size:0;line-height:0;border:0;">
      <table cellpadding="0" cellspacing="0" border="0" role="presentation" width="${rightWidth}" style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;width:${rightWidth}px;">
${cells}
      </table>
    </td>
  </tr>
</table>`;
}
