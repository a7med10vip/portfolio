/* opentype.js v2 ships no type declarations — this covers the surface the
   signature renderer uses. */

declare module "opentype.js" {
  export type PathCommand = {
    type: "M" | "L" | "Q" | "C" | "Z";
    x?: number;
    y?: number;
    x1?: number;
    y1?: number;
    x2?: number;
    y2?: number;
  };

  export interface Path {
    commands: PathCommand[];
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
    getPaths(
      text: string,
      x: number,
      y: number,
      fontSize: number,
      options?: { kerning?: boolean }
    ): Path[];
    getAdvanceWidth(
      text: string,
      fontSize: number,
      options?: { kerning?: boolean }
    ): number;
    charToGlyphIndex(char: string): number;
  }

  export function parse(buffer: ArrayBuffer, options?: unknown): Font;
}
