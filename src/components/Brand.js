// SVG copied byte-for-byte from the first game's public/favicon.svg.
// Keep the drawing separate from the wordmark; do not redraw or substitute a font glyph.
export const BRAND_NAME = '不正常人类研究所';
export const BRAND_ENGLISH = 'THE LOONY BIN LAB.';
export function Brand() {
 return `<a href="https://liurunjia629-bit.github.io/The-Loony-Bin-Lab/" class="brand" aria-label="${BRAND_NAME} · 返回研究所"><img class="brand-logo-icon" src="./src/assets/lab-logo.svg" width="40" height="40" alt=""><span class="brand-logo-wordmark"><strong>${BRAND_NAME}</strong><small lang="en">${BRAND_ENGLISH}</small></span></a>`;
}
