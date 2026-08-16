/* The signature markup itself — a table of image slices, which is the one
   layout every mail client renders the same way.

   The slices exist so parts of the card can carry their own links: it looks
   like one image, but the phone, email, website and social marks are each
   clickable. Which cell links where comes from the brand's layout. */

import { type Brand, type CardCell, type CellLink } from "./brands";
import { CARD, type Person, encodePerson, px, sliceSize } from "./card";

function esc(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function sliceUrl(origin: string, token: string, slice: string) {
  return `${origin}/api/signature/img?s=${slice}&d=${token}`;
}

function resolve(link: CellLink | undefined, brand: Brand, person: Person) {
  if (!link) return null;
  switch (link.kind) {
    case "website":
      return { href: brand.website, alt: `${person.name} — ${person.title}` };
    case "tel":
      return { href: `tel:${person.phone.replace(/[^\d+]/g, "")}`, alt: person.phone };
    case "email":
      return { href: `mailto:${person.email}`, alt: person.email };
    case "url":
      return { href: link.href, alt: link.label };
  }
}

export function buildSignatureHtml(brand: Brand, person: Person, origin: string) {
  const token = encodePerson(person);
  const cardWidth = px(CARD.width);

  const image = (cell: CardCell, alt: string) => {
    const { width, height } = sliceSize(brand, cell.slice);
    return (
      `<img src="${esc(sliceUrl(origin, token, cell.slice))}" width="${width}" height="${height}" ` +
      `alt="${esc(alt)}" style="display:block;border:0;outline:none;width:${width}px;height:${height}px;" />`
    );
  };

  const cellHtml = (cell: CardCell) => {
    const target = resolve(cell.link, brand, person);
    const img = image(cell, target?.alt ?? "");
    const inner = target
      ? `<a href="${esc(target.href)}" target="_blank" style="text-decoration:none;border:0;outline:none;">${img}</a>`
      : img;
    const { width } = sliceSize(brand, cell.slice);
    return `<td width="${width}" style="padding:0;font-size:0;line-height:0;border:0;">${inner}</td>`;
  };

  const rowHtml = (cells: CardCell[], columnWidth: number) => {
    if (cells.length === 1) return `<tr>${cellHtml(cells[0])}</tr>`;
    // A row split into cells gets its own table, so a click lands on the right
    // one; it still has to span the column exactly.
    const inner = cells.map(cellHtml).join("");
    return (
      `<tr><td style="padding:0;font-size:0;line-height:0;border:0;">` +
      `<table cellpadding="0" cellspacing="0" border="0" role="presentation" width="${columnWidth}" ` +
      `style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;width:${columnWidth}px;">` +
      `<tr>${inner}</tr></table></td></tr>`
    );
  };

  const columns = brand.layout
    .map((column) => {
      const width = px(column.width);
      const rows = column.rows.map((cells) => rowHtml(cells, width)).join("\n        ");
      const body =
        column.rows.length === 1 && column.rows[0].length === 1
          ? image(column.rows[0][0], resolve(column.rows[0][0].link, brand, person)?.alt ?? "")
          : null;

      const content = body
        ? (() => {
            const target = resolve(column.rows[0][0].link, brand, person);
            return target
              ? `<a href="${esc(target.href)}" target="_blank" style="text-decoration:none;border:0;outline:none;">${body}</a>`
              : body;
          })()
        : `<table cellpadding="0" cellspacing="0" border="0" role="presentation" width="${width}" style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;width:${width}px;">
        ${rows}
      </table>`;

      return `    <td width="${width}" valign="top" style="padding:0;font-size:0;line-height:0;border:0;">${content}</td>`;
    })
    .join("\n");

  return `<table cellpadding="0" cellspacing="0" border="0" role="presentation" width="${cardWidth}" style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;width:${cardWidth}px;max-width:${cardWidth}px;background-color:transparent;">
  <tr>
${columns}
  </tr>
</table>`;
}
