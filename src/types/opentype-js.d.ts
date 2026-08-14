/* opentype.js v2 ships no type declarations — this covers the surface the
   signature renderer uses. */

declare module "opentype.js" {
  export interface Path {
    toPathData(decimals?: number): string;
  }

  export interface Font {
    unitsPerEm: number;
    getPath(
      text: string,
      x: number,
      y: number,
      fontSize: number,
      options?: { kerning?: boolean }
    ): Path;
    getAdvanceWidth(
      text: string,
      fontSize: number,
      options?: { kerning?: boolean }
    ): number;
    charToGlyphIndex(char: string): number;
  }

  export function parse(buffer: ArrayBuffer, options?: unknown): Font;
}
