/* The signature markup itself — a table of image slices, which is the one
   layout every mail client renders the same way.

   The slices exist so the contact lines and the social marks can carry their
   own links: the card looks like one image, but each row, and each icon in the
   social row, is clickable. */

import {
  CARD,
  SLICES,
  WEBSITE,
  type Person,
  type Slice,
  encodePerson,
  px,
  sliceSize,
} from "./card";
import { SOCIALS } from "./social";

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
  ) as Record<string, string>;
}

export function buildSignatureHtml(person: Person, origin: string) {
  const token = encodePerson(person);
  const tel = `tel:${person.phone.replace(/[^\d+]/g, "")}`;
  const cardWidth = px(CARD.width);
  const leftWidth = px(CARD.splitX);
  const rightWidth = cardWidth - leftWidth;

  const img = (slice: Slice, alt: string) => {
    const { width, height } = sliceSize(slice);
    return (
      `<img src="${esc(sliceUrl(origin, token, slice))}" width="${width}" height="${height}" ` +
      `alt="${esc(alt)}" style="display:block;border:0;outline:none;width:${width}px;height:${height}px;" />`
    );
  };

  const link = (href: string, inner: string) =>
    `<a href="${esc(href)}" target="_blank" style="text-decoration:none;border:0;outline:none;">${inner}</a>`;

  const cell = (inner: string, width?: number) =>
    `<td${width ? ` width="${width}"` : ""} style="padding:0;font-size:0;line-height:0;border:0;">${inner}</td>`;

  /* The social row is a table of its own: one cell per mark, plus the padding
     either side, so a click lands on the right profile. */
  const socialCells = [
    cell(img("s0", ""), sliceSize("s0").width),
    ...SOCIALS.map((icon, i) =>
      cell(link(icon.href, img(`s${i + 1}`, icon.label)), sliceSize(`s${i + 1}`).width)
    ),
    cell(img("s5", ""), sliceSize("s5").width),
  ].join("");

  const socialRow =
    `<table cellpadding="0" cellspacing="0" border="0" role="presentation" width="${rightWidth}" ` +
    `style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;width:${rightWidth}px;">` +
    `<tr>${socialCells}</tr></table>`;

  const rows: string[] = [
    link(WEBSITE, img("r1", `${person.name} — ${person.title}`)),
    link(tel, img("r2", person.phone)),
    link(`mailto:${person.email}`, img("r3", person.email)),
    link(WEBSITE, img("r4", "emotiongrp.com")),
    socialRow,
    img("r6", ""),
  ];

  const cells = rows
    .map((row) => `        <tr>\n          ${cell(row)}\n        </tr>`)
    .join("\n");

  return `<table cellpadding="0" cellspacing="0" border="0" role="presentation" width="${cardWidth}" style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;width:${cardWidth}px;max-width:${cardWidth}px;background-color:transparent;">
  <tr>
    <td width="${leftWidth}" valign="top" style="padding:0;font-size:0;line-height:0;border:0;">${link(
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
