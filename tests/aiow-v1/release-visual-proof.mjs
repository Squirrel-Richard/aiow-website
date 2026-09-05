import { webkit } from "/opt/homebrew/lib/node_modules/playwright/index.mjs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const base = process.env.AIOW_PROOF_BASE || "http://127.0.0.1:4321";
const out = process.env.AIOW_PROOF_DIR || ".team-handsome/AIOW-QM-20260905/50-proof";
const viewports = [
  { width: 320, height: 844 }, { width: 375, height: 844 }, { width: 390, height: 844 },
  { width: 768, height: 900 }, { width: 1024, height: 900 }, { width: 1440, height: 900 },
];
const locales = [
  { code: "nl", route: "/", hero: "oplossingen", h1: "AI die voor u werkt.", labels: ["Werk", "Bedrijfspanden", "Woningen & villa’s"], cta: "Laat één proces of ruimte scannen", scanHref: "/scan" },
  { code: "en", route: "/en", hero: "solutions", h1: "AI that works for you.", labels: ["Work", "Commercial buildings", "Homes & villas"], cta: "Scan one process or space", scanHref: "/en/scan" },
];
await mkdir(out, { recursive: true });
const browser = await webkit.launch({ headless: true });
const receipt = { base, generatedAt: new Date().toISOString(), design: "Quiet Monolith", views: [], noJavaScript: [] };

async function inspect(page, viewport, theme, locale) {
  const result = await page.evaluate((config) => {
    const rect = (node) => { if (!node) return null; const r = node.getBoundingClientRect(); return { top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width), height: Math.round(r.height) }; };
    const hero = document.getElementById(config.hero);
    const categories = [...hero.querySelectorAll("nav a")];
    const cta = [...hero.querySelectorAll("a")].find((node) => node.textContent.trim().replace(/↗/g, "").trim() === config.cta);
    const image = hero.querySelector('img[src*="quiet-monolith"]');
    const seam = hero.querySelector('[class*="seam"]');
    const commercialActions = [...document.querySelectorAll(`a[href="${config.scanHref}"]`)].map(rect).filter((box) => box.width > 0 && box.height > 0 && box.top < innerHeight);
    return {
      htmlLang: document.documentElement.lang,
      h1Count: document.querySelectorAll("h1").length,
      h1Text: hero.querySelector("h1")?.textContent?.replace(/\s+/g, " ").trim(),
      categoryCount: categories.length,
      categoryLabels: categories.map((node) => node.querySelector("strong")?.textContent?.trim()),
      categoryRects: categories.map(rect),
      ctaHref: cta?.getAttribute("href"),
      ctaRect: rect(cta),
      commercialActions,
      heroRect: rect(hero),
      imageRect: rect(image),
      imageLoaded: Boolean(image?.complete && image?.naturalWidth),
      imageCount: hero.querySelectorAll("img").length,
      forbiddenMedia: hero.querySelectorAll("video,canvas,svg").length,
      heroSmallText: hero.querySelectorAll("small").length,
      oldBlueprint: Boolean(hero.querySelector('[data-aiow-conductor="true"], [data-authority-switch="true"]')),
      overflow: document.documentElement.scrollWidth - innerWidth,
      seamAnimation: seam ? getComputedStyle(seam).animationName : null,
    };
  }, locale);
  const label = `${locale.code}/${viewport.width}/${theme}`;
  if (result.htmlLang !== locale.code) throw new Error(`${label}: lang=${result.htmlLang}`);
  if (result.h1Count !== 1 || result.h1Text !== locale.h1) throw new Error(`${label}: H1=${result.h1Count}/${result.h1Text}`);
  if (result.categoryCount !== 3) throw new Error(`${label}: categories=${result.categoryCount}`);
  if (result.categoryLabels.join("|") !== locale.labels.join("|")) throw new Error(`${label}: labels=${result.categoryLabels.join("|")}`);
  if (result.ctaHref !== locale.scanHref) throw new Error(`${label}: CTA=${result.ctaHref}`);
  if (!result.imageLoaded || result.imageCount !== 1) throw new Error(`${label}: monolith=${result.imageLoaded}/${result.imageCount}`);
  if (result.forbiddenMedia !== 0 || result.oldBlueprint) throw new Error(`${label}: rejected hero media/blueprint present`);
  if (result.heroSmallText !== 0) throw new Error(`${label}: hero microcopy=${result.heroSmallText}`);
  if (result.overflow > 1) throw new Error(`${label}: overflow=${result.overflow}`);
  if (result.commercialActions.length !== 1) throw new Error(`${label}: first-viewport scan actions=${result.commercialActions.length}`);
  for (const target of [...result.categoryRects, result.ctaRect]) if (!target || target.width < 44 || target.height < 44) throw new Error(`${label}: target=${JSON.stringify(target)}`);
  for (const [index, category] of result.categoryRects.entries()) if (category.left < -1 || category.right > viewport.width + 1 || category.top < -1 || category.bottom > viewport.height + 1) throw new Error(`${label}: category ${index + 1} outside viewport=${JSON.stringify(category)}`);
  if (result.seamAnimation !== "none") throw new Error(`${label}: reduced-motion seam=${result.seamAnimation}`);
  return result;
}

try {
  for (const locale of locales) {
    for (const viewport of viewports) {
      for (const theme of ["light", "dark"]) {
        const page = await browser.newPage({ viewport, colorScheme: theme, reducedMotion: "reduce" });
        await page.goto(new URL(locale.route, base).href, { waitUntil: "networkidle" });
        await page.evaluate((value) => { localStorage.setItem("aiow-theme", value); document.documentElement.dataset.theme = value; }, theme);
        const result = await inspect(page, viewport, theme, locale);
        const file = path.resolve(out, `home-${locale.code}-${viewport.width}x${viewport.height}-${theme}.png`);
        await page.screenshot({ path: file, fullPage: false });
        receipt.views.push({ locale: locale.code, viewport, theme, file, ...result });
        await page.close();
      }
    }
  }
  for (const locale of locales) {
    for (const viewport of [{ width: 390, height: 844 }, { width: 1440, height: 900 }]) {
      const context = await browser.newContext({ viewport, javaScriptEnabled: false, colorScheme: "light", reducedMotion: "reduce" });
      const page = await context.newPage();
      const response = await page.goto(new URL(locale.route, base).href, { waitUntil: "load" });
      const result = await inspect(page, viewport, "no-js", locale);
      const file = path.resolve(out, `home-${locale.code}-${viewport.width}x${viewport.height}-no-js.png`);
      await page.screenshot({ path: file, fullPage: false });
      receipt.noJavaScript.push({ locale: locale.code, viewport, status: response?.status(), file, ...result });
      await context.close();
    }
  }
  const receiptPath = path.resolve(out, "browser-proof.json");
  await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`);
  console.log(`AIOW_QM_VISUAL_PROOF_PASS views=${receipt.views.length} no_js=${receipt.noJavaScript.length} receipt=${receiptPath}`);
} finally {
  await browser.close();
}
