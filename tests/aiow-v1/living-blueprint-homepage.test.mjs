import test from "node:test";
import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";

const root=new URL("../../",import.meta.url);
const[home,enHome,page,hero,css,heroCss,sharedCss,dna,analytics,nextConfig,seo,llms,asset]=await Promise.all([
 readFile(new URL("app/page.tsx",root),"utf8"),
 readFile(new URL("app/en/page.tsx",root),"utf8"),
 readFile(new URL("components/aiow-v1/LivingBlueprintHomepage.tsx",root),"utf8"),
 readFile(new URL("components/aiow-v1/QuietMonolithHero.tsx",root),"utf8"),
 readFile(new URL("components/aiow-v1/LivingBlueprintHomepage.module.css",root),"utf8"),
 readFile(new URL("components/aiow-v1/QuietMonolithHero.module.css",root),"utf8"),
 readFile(new URL("components/aiow-v1/AiowV1Homepage.module.css",root),"utf8"),
 readFile(new URL("DESIGN-DNA.md",root),"utf8"),
 readFile(new URL("core/analytics/Analytics.tsx",root),"utf8"),
 readFile(new URL("next.config.ts",root),"utf8"),
 readFile(new URL("lib/aiow-v1/seo.tsx",root),"utf8"),
 readFile(new URL("app/llms.txt/route.ts",root),"utf8"),
 stat(new URL("public/aiow/quiet-monolith/hero.webp",root)),
]);

test("paired home routes mount the canonical homepage and preserve schemas",()=>{
 for(const source of[home,enHome]){assert.match(source,/LivingBlueprintHomepage/);assert.match(source,/homeSchemas/);assert.doesNotMatch(source,/<AiowV1Homepage/)}
 assert.match(enHome,/locale="en"/);
});

test("homepage mounts Quiet Monolith before the commercial instrument",()=>{
 assert.match(page,/<QuietMonolithHero locale=\{locale\}/);
 assert.doesNotMatch(page,/ThreeWorldsBlueprint|ArchitecturalSections/);
 assert.equal((hero.match(/<h1/g)||[]).length,1);
 assert.ok(page.indexOf("<QuietMonolithHero")<page.indexOf("<LivingBlueprintCalculator"));
 assert.equal((page.match(/<LivingBlueprintCalculator/g)||[]).length,1);
 assert.match(page,/id="booking"/);
});

test("hero is server rendered, local-asset led and carries one calm hierarchy",()=>{
 assert.doesNotMatch(hero,/"use client"|useState|<video|<canvas/);
 for(const marker of["AI die","voor u","AI that works","for you","Werk","Bedrijfspanden","Woningen & villa’s","Work","Commercial buildings","Homes & villas","Laat één proces of ruimte scannen","Scan one process or space"])assert.match(hero,new RegExp(marker));
 assert.equal((hero.match(/<Link className=\{styles\.cta\}/g)||[]).length,1);
 assert.equal((hero.match(/<Link href=\{category\.href\}/g)||[]).length,1);
 assert.match(hero,/U bepaalt altijd wat er gebeurt\./);
 assert.match(hero,/You always decide what happens\./);
 assert.match(hero,/src="\/aiow\/quiet-monolith\/hero\.webp"/);
 assert.match(hero,/alt=""/);assert.match(hero,/priority/);assert.match(hero,/fetchPriority="high"/);assert.match(hero,/sizes="\(max-width: 700px\) 100vw, 62vw"/);
 assert.doesNotMatch(hero,/<figcaption|srOnly/);
 assert.ok(asset.size>0&&asset.size<100_000,`hero asset bytes=${asset.size}`);
});

test("three environments are calm by default and details preserve the causal truth",()=>{
 for(const marker of["Werk","Bedrijfspanden","Woningen & villa’s","Work","Commercial buildings","Homes & villas"])assert.match(page,new RegExp(marker));
 assert.equal((page.match(/<details>/g)||[]).length,1,"one mapped details element in source");
 for(const marker of["Signaal","AI interpreteert","Systeem handelt begrensd","Mens beslist","Signal","AI interprets","System acts within limits","Person decides"])assert.match(page,new RegExp(marker));
 const exampleArrays=[...page.matchAll(/examples: \[([^\]]+)\]/g)];
 assert.equal(exampleArrays.length,6);
 for(const match of exampleArrays){const count=(match[1].match(/"/g)||[]).length/2;assert.ok(count>=4&&count<=6,`example count ${count}`)}
});

test("scan contract, physical scope and human authority remain explicit below the hero",()=>{
 for(const marker of["maximaal circa 30 minuten","een mens bevestigt datum en tijd","u beslist pas na het memo","gekwalificeerde partners","about 30 minutes maximum","a person confirms date and time","you decide only after the memo","qualified partner work"])assert.match(page,new RegExp(marker));
 assert.match(page,/U bepaalt\. Het systeem werkt daarbinnen/);assert.match(page,/You decide\. The system works within that boundary/);
 assert.match(page,/showCta=\{false\}/);
});

test("metadata, schema and machine text retain the three-category public truth",()=>{
 for(const marker of["werk, bedrijfspanden en woningen","work, commercial buildings and homes"])assert.match(`${home}\n${enHome}`,new RegExp(marker,"i"));
 for(const marker of["Drie AIOW-categorieën","Bedrijfspanden","Woningen & villa’s","Commercial buildings","Homes & villas"])assert.match(seo,new RegExp(marker));
 assert.doesNotMatch(seo,/\/#service[^]*price: "2950"/);
 assert.match(llms,/Werk, Bedrijfspanden en Woningen & villa’s/);
});

test("responsive signature is separately composed and motion fails safe",()=>{
 assert.match(heroCss,/@media\(max-width:700px\)/);assert.match(heroCss,/prefers-reduced-motion:reduce/);assert.match(heroCss,/animation:none/);assert.match(heroCss,/update:slow/);
 assert.match(heroCss,/\.categories span,\.categories a:after\{display:none\}/);
 assert.match(css,/@media\(max-width:600px\)/);
 assert.match(dna,/Quiet Monolith/);assert.match(dna,/Mobile is not compressed desktop/);assert.doesNotMatch(dna,/Three Sections, One Controlled Conductor/);
});

test("anti-clutter and quality rails remain explicit",()=>{
 assert.doesNotMatch(hero,/proof:|index: "0|stageLabels|ctaNote|trust:/);
 assert.match(dna,/No scan-contract microcopy, trust chips, secondary CTA/);
 assert.match(sharedCss,/\.header\[data-compact-mobile="true"\]\{height:calc\(58px \+ env\(safe-area-inset-top\)\);top:0;max-width:100%;margin:0/);
 assert.match(analytics,/\["localhost", "127\.0\.0\.1", "::1"\]/);assert.match(analytics,/window\.location\.hostname/);
 assert.match(nextConfig,/htmlLimitedBots:\s*\/\.\*\//);
});

test("design DNA uses the canonical public contact source",()=>{
 assert.match(dna,/Company facts remain canonical:[^\n]*info@aiow\.io\./);
 assert.doesNotMatch(dna,/Company facts remain canonical:[^\n]*info@aiow\.ai\./);
});
