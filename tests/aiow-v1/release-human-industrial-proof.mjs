const { webkit } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const base=process.env.AIOW_PROOF_BASE||"http://127.0.0.1:3106";
const out=process.env.AIOW_PROOF_DIR||".team-handsome/AIOW-HI-MOTION-20260906/50-proof";
const viewports=[{width:320,height:844},{width:375,height:844},{width:390,height:844},{width:768,height:900},{width:1024,height:900},{width:1440,height:900},{width:1920,height:1080}];
const locales=[
 {code:"nl",route:"/",hero:"oplossingen",h1:"Niet nog een losse tool. Eén systeem dat voor u werkt.",labels:["Voor mijn bedrijf","Voor mijn bedrijfspand","Voor mijn woning of villa"]},
 {code:"en",route:"/en",hero:"solutions",h1:"Not another disconnected tool. One system built to work for you.",labels:["For my company","For my commercial building","For my home or villa"]},
];
await mkdir(out,{recursive:true});
const browser=await webkit.launch({headless:true});
const receipt={base,generatedAt:new Date().toISOString(),design:"Human Industrial / Route Field",views:[],motion:[],noJavaScript:[]};

async function inspect(page,config){
 return page.evaluate(({heroId})=>{
  const box=(node)=>{if(!node)return null;const r=node.getBoundingClientRect();return {top:Math.round(r.top),bottom:Math.round(r.bottom),left:Math.round(r.left),right:Math.round(r.right),width:Math.round(r.width),height:Math.round(r.height)}};
  const hero=document.getElementById(heroId);
  const routes=[...hero.querySelectorAll("[data-route]")];
  const visible=hero.querySelector('[data-visible="true"]');
  const commercialActions=[...document.querySelectorAll('a[href="/scan"],a[href="/en/scan"]')].map(box).filter((r)=>r.width>0&&r.height>0&&r.top<innerHeight);
  return {
   lang:document.documentElement.lang,
   viewport:{innerWidth,innerHeight,clientWidth:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth},
   h1Count:document.querySelectorAll("h1").length,
   h1Text:hero.querySelector("h1")?.textContent?.replace(/\s+/g," ").trim(),
   heroRect:box(hero),
   routeCount:routes.length,
   routeLabels:routes.map((a)=>a.querySelector('[class*="routeCopy"] strong')?.textContent?.trim()),
   routeRects:routes.map(box),
   active:hero.dataset.activeRoute,
   visibleIndex:visible?.dataset.index,
   forbiddenMedia:hero.querySelectorAll("img,video,canvas,svg").length,
   commercialActions,
   transitionDuration:visible?getComputedStyle(visible).transitionDuration:null,
   animationName:getComputedStyle(hero.querySelector('[class*="spine"]')).animationName,
   theme:document.documentElement.dataset.theme,
  };
 },{heroId:config.hero});
}

function assertStatic(result,locale,viewport,mode){
 const label=`${locale.code}/${viewport.width}/${mode}`;
 if(result.lang!==locale.code)throw new Error(`${label}: lang=${result.lang}`);
 if(result.viewport.innerWidth!==viewport.width||result.viewport.clientWidth!==viewport.width)throw new Error(`${label}: viewport=${JSON.stringify(result.viewport)}`);
 if(result.viewport.scrollWidth>viewport.width+1)throw new Error(`${label}: overflow=${result.viewport.scrollWidth-viewport.width}`);
 if(result.h1Count!==1||result.h1Text!==locale.h1)throw new Error(`${label}: h1=${result.h1Count}/${result.h1Text}`);
 if(result.routeCount!==3||result.routeLabels.join("|")!==locale.labels.join("|"))throw new Error(`${label}: routes=${result.routeLabels.join("|")}`);
 if(result.forbiddenMedia!==0)throw new Error(`${label}: forbiddenMedia=${result.forbiddenMedia}`);
 if(result.commercialActions.length!==0)throw new Error(`${label}: premature scan actions=${result.commercialActions.length}`);
 for(const [i,target] of result.routeRects.entries()){
  if(!target||target.width<44||target.height<44)throw new Error(`${label}: target${i}=${JSON.stringify(target)}`);
  if(target.left<-1||target.right>viewport.width+1||target.top<-1||target.bottom>viewport.height+1)throw new Error(`${label}: route${i} outside viewport=${JSON.stringify(target)}`);
 }
 if(result.active!=="work"||result.visibleIndex!=="0")throw new Error(`${label}: default=${result.active}/${result.visibleIndex}`);
}

try{
 for(const locale of locales){
  for(const viewport of viewports){
   for(const theme of["light","dark"]){
    const page=await browser.newPage({viewport,colorScheme:theme,reducedMotion:"reduce"});
    await page.goto(new URL(locale.route,base).href,{waitUntil:"networkidle"});
    await page.evaluate((value)=>{localStorage.setItem("aiow-theme",value);document.documentElement.dataset.theme=value},theme);
    const result=await inspect(page,locale);assertStatic(result,locale,viewport,theme);
    if(result.animationName!=="none"||result.transitionDuration.split(",").some((value)=>value.trim()!=="0s"))throw new Error(`${locale.code}/${viewport.width}/${theme}: reduced motion active`);
    const file=path.resolve(out,`home-${locale.code}-${viewport.width}x${viewport.height}-${theme}.png`);
    await page.screenshot({path:file,fullPage:false});receipt.views.push({locale:locale.code,viewport,theme,file,...result});await page.close();
   }
  }
 }
 for(const locale of locales){
  const viewport={width:1440,height:900};const page=await browser.newPage({viewport,colorScheme:"light",reducedMotion:"no-preference"});
  await page.goto(new URL(locale.route,base).href,{waitUntil:"networkidle"});
  await page.evaluate(()=>{localStorage.setItem("aiow-theme","light");document.documentElement.dataset.theme="light"});
  for(const id of["building","home"]){
   await page.locator(`[data-route="${id}"]`).hover();await page.waitForTimeout(620);
   const result=await inspect(page,locale);
   if(result.active!==id||result.visibleIndex!==String(id==="building"?1:2))throw new Error(`${locale.code}/hover/${id}: ${result.active}/${result.visibleIndex}`);
   if(result.transitionDuration.split(",").every((value)=>value.trim()==="0s"))throw new Error(`${locale.code}/hover/${id}: no motion transition`);
   const file=path.resolve(out,`motion-${locale.code}-${id}.png`);await page.screenshot({path:file,fullPage:false});receipt.motion.push({locale:locale.code,input:"pointer",route:id,file,...result});
  }
  await page.locator('[data-route="home"]').focus();await page.waitForTimeout(80);
  const focusedRoute=await page.evaluate(()=>document.activeElement?.getAttribute("data-route"));
  const focusResult=await inspect(page,locale);
  if(focusedRoute!=="home"||focusResult.active!=="home")throw new Error(`${locale.code}/focus: element=${focusedRoute} active=${focusResult.active}`);
  receipt.motion.push({locale:locale.code,input:"keyboard",focusedRoute,...focusResult});await page.close();
 }
 for(const locale of locales){
  for(const viewport of[{width:390,height:844},{width:1440,height:900}]){
   const context=await browser.newContext({viewport,javaScriptEnabled:false,colorScheme:"light",reducedMotion:"reduce"});const page=await context.newPage();
   const response=await page.goto(new URL(locale.route,base).href,{waitUntil:"load"});const result=await inspect(page,locale);assertStatic(result,locale,viewport,"no-js");
   const file=path.resolve(out,`home-${locale.code}-${viewport.width}x${viewport.height}-no-js.png`);await page.screenshot({path:file,fullPage:false});receipt.noJavaScript.push({locale:locale.code,viewport,status:response?.status(),file,...result});await context.close();
  }
 }
 const receiptPath=path.resolve(out,"browser-proof.json");await writeFile(receiptPath,`${JSON.stringify(receipt,null,2)}\n`);
 console.log(`AIOW_HI_MOTION_PROOF_PASS views=${receipt.views.length} motion=${receipt.motion.length} no_js=${receipt.noJavaScript.length} receipt=${receiptPath}`);
}finally{await browser.close()}
