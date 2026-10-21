import { chromium } from 'playwright'
import { strict as assert } from 'node:assert'
import { mkdir, writeFile } from 'node:fs/promises'

const output='reference/browser'
await mkdir(output,{recursive:true})
const browser=await chromium.launch({headless:true})
const page=await browser.newPage({viewport:{width:1440,height:900}})
const errors=[],checks=[],layouts=[]
page.on('pageerror',error=>errors.push(error.message))
page.on('response',response=>{if(response.status()>=400)errors.push(response.status()+' '+response.url())})
const scroll=async selector=>{await page.locator(selector).evaluate(e=>scrollTo({top:e.getBoundingClientRect().top+scrollY,behavior:'instant'}));await page.waitForTimeout(350)}
try{
 await page.goto('http://127.0.0.1:5173/')
 await page.waitForFunction(()=>document.querySelector('video').currentTime>0)
 await page.evaluate(()=>{const v=document.querySelector('video');let previous=v.currentTime;window.videoLoops=0;v.addEventListener('timeupdate',()=>{if(v.currentTime<previous)window.videoLoops++;previous=v.currentTime})})
 await page.waitForFunction(()=>window.videoLoops>0,{},{timeout:15000})
 const video=await page.locator('video').evaluate(v=>({duration:v.duration,muted:v.muted,loop:v.loop,inline:v.playsInline,paused:v.paused,loops:window.videoLoops,quality:v.getVideoPlaybackQuality().toJSON?.()??{total:v.getVideoPlaybackQuality().totalVideoFrames,dropped:v.getVideoPlaybackQuality().droppedVideoFrames}}))
 assert.equal(video.duration,11);assert(video.muted&&video.loop&&video.inline&&!video.paused)
 await page.locator('.video-toggle').click();assert(await page.locator('video').evaluate(v=>v.paused))
 await page.locator('.video-toggle').click();await page.waitForFunction(()=>!document.querySelector('video').paused)
 checks.push({test:'Actual autoplay, natural 11-second loop, pause/resume',video})
 await scroll('#new-products')
 const productStates=[]
 for(let index=1;index<=6;index++){
  await page.getByRole('button',{name:'신제품 '+index+'번 보기',exact:true}).click()
  await page.waitForFunction(i=>document.querySelectorAll('.new-products .slider-dots button')[i-1].getAttribute('aria-pressed')==='true',index)
  productStates.push(await page.locator('.product-copy h2').innerText())
  assert(await page.locator('.product-visual img').evaluate(i=>i.complete&&i.naturalWidth>0))
 }
 assert.equal(new Set(productStates).size,6);checks.push({test:'All six product states decoded and switched',productStates})
 await page.setViewportSize({width:1440,height:900})
 const careStates=[]
 for(const progress of [.1,.5,.9]){
  await page.locator('#care').evaluate((e,p)=>scrollTo({top:e.getBoundingClientRect().top+scrollY+(e.offsetHeight-e.querySelector('.care-stage').offsetHeight)*p,behavior:'instant'}),progress)
  await page.waitForTimeout(350);careStates.push(await page.locator('.care-copy h2').innerText())
 }
 assert.equal(new Set(careStates).size,3);checks.push({test:'Three desktop pinned care states',careStates})
 await scroll('#reviews')
 const reviewStates=[]
 for(let i=0;i<3;i++){
  reviewStates.push(await page.locator('.review-excerpt').innerText())
  await page.getByRole('button',{name:'리뷰 다음',exact:true}).click()
  await page.waitForFunction(i=>document.querySelectorAll('.review-controls .slider-dots button')[(i+1)%3].getAttribute('aria-pressed')==='true',i)
 }
 assert.equal(new Set(reviewStates).size,3);checks.push({test:'Three synchronized review states',reviewStates})
 await page.setViewportSize({width:390,height:844});await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(500)
 await page.getByRole('button',{name:'메뉴 열기',exact:true}).click()
 assert(await page.locator('#mobile-menu').evaluate(e=>e.open&&e.contains(document.activeElement)))
 await page.keyboard.press('Escape');assert(await page.getByRole('button',{name:'메뉴 열기',exact:true}).evaluate(e=>e===document.activeElement));checks.push({test:'Mobile dialog, Escape, focus restoration'})
 await scroll('#care');await page.getByRole('tab',{name:'Hydration',exact:true}).click();await page.keyboard.press('ArrowRight')
 assert.equal(await page.getByRole('tab',{name:'Elasticity',exact:true}).getAttribute('aria-selected'),'true')
 assert(!await page.locator('#care').evaluate(e=>e.classList.contains('care-pinned')))
 checks.push({test:'Mobile care keyboard tabs and no pin'})
 const touch=await browser.newPage({viewport:{width:390,height:844},hasTouch:true,isMobile:true})
 await touch.goto('http://127.0.0.1:5173/');await touch.locator('#new-products').evaluate(e=>scrollTo({top:e.offsetTop,behavior:'instant'}));await touch.waitForTimeout(700)
 const cdp=await touch.context().newCDPSession(touch)
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:320,y:450}]})
 await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:120,y:454}]})
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]})
 await touch.waitForFunction(()=>document.querySelectorAll('.new-products .slider-dots button')[1].getAttribute('aria-pressed')==='true')
 checks.push({test:'Real Chromium touch gesture switches product'});await touch.close()
 for(const width of [1920,1440,1024,768,390,360]){
  await page.setViewportSize({width,height:width>=1440?1080:900})
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(250)
  const height=await page.evaluate(()=>document.documentElement.scrollHeight)
  for(let y=0;y<height;y+=800){await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);await page.waitForTimeout(70)}
  await page.waitForTimeout(500)
  const layout=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,broken:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),fonts:document.fonts.status}))
  assert.equal(layout.width,layout.scrollWidth);assert.deepEqual(layout.broken,[]);layouts.push(layout)
  await page.screenshot({path:output+'/local-'+width+'-full.png',fullPage:true})
 }
 await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(300)
 assert(await page.locator('video').evaluate(v=>v.paused))
 assert(!await page.locator('#care').evaluate(e=>e.classList.contains('care-pinned')))
 assert.equal(await page.locator('#brand-film').evaluate(e=>e.style.getPropertyValue('--scene')),'1')
 checks.push({test:'Live reduced-motion update disables playback and pinned animations'})
 assert.deepEqual(errors,[])
 await writeFile(output+'/verification.json',JSON.stringify({checkedAt:new Date().toISOString(),browser:await browser.version(),checks,layouts,errors,limitations:['Chromium viewport/touch emulation; no physical iOS/Android device or throttled network audit.']},null,2))
 console.log('PASS',checks.length,'browser interaction checks; all six layouts; no browser/HTTP errors.')
}finally{await browser.close()}
