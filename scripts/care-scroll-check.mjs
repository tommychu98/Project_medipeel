import { chromium } from 'playwright'
import { strict as assert } from 'node:assert'
import { writeFile } from 'node:fs/promises'

const browser=await chromium.launch({headless:true})
const page=await browser.newPage({viewport:{width:1920,height:920}})
const errors=[],states=[]
page.on('pageerror',error=>errors.push(error.message))
const read=()=>page.locator('#care').evaluate(e=>({progress:Number(e.dataset.careProgress),pinned:e.classList.contains('care-pinned'),top:e.querySelector('.care-stage').getBoundingClientRect().top,title:e.querySelector('.care-copy h2').textContent,masks:[...e.querySelectorAll('.care-scroll-image')].map(i=>i.style.clipPath),animations:e.getAnimations({subtree:true}).length}))
const seek=async progress=>{
 await page.locator('#care').evaluate((e,p)=>scrollTo({top:e.offsetTop+(e.offsetHeight-innerHeight)*p,behavior:'instant'}),progress)
 await page.waitForFunction(p=>Math.abs(Number(document.querySelector('#care').dataset.careProgress)-p)<.001,progress)
 await page.waitForTimeout(500)
 const state=await read();states.push(state);return state
}
try{
 await page.goto('http://127.0.0.1:5173/')
 await page.evaluate(()=>document.fonts.ready)
 const first=await seek(.05);assert(first.pinned);assert(Math.abs(first.top)<1)
 await page.mouse.move(1000,450);await page.mouse.wheel(0,400)
 await page.waitForTimeout(900)
 const wheel=await read();assert(wheel.progress>first.progress);states.push(wheel)
 const middle=await seek(.2)
 await page.waitForTimeout(900)
 assert.deepEqual((await read()).masks,middle.masks)
 const later=await seek(.32);assert.notDeepEqual(later.masks,middle.masks)
 const reverse=await seek(.2);assert.deepEqual(reverse.masks,middle.masks)
 assert.equal((await seek(.46)).title,'ELASTICITY CARE')
 assert.equal((await seek(.94)).title,'SOOTHING CARE')
 await page.setViewportSize({width:1440,height:900});await seek(.05)
 await page.getByRole('tab',{name:'Elasticity',exact:true}).click()
 await page.waitForFunction(()=>Math.abs(Number(document.querySelector('#care').dataset.careProgress)-.46)<.001)
 assert.equal((await read()).title,'ELASTICITY CARE')
 await page.setViewportSize({width:390,height:844})
 assert(!await page.locator('#care').evaluate(e=>e.classList.contains('care-pinned')))
 await page.getByRole('tab',{name:'Hydration',exact:true}).click()
 await page.waitForFunction(()=>document.querySelector('.care-copy h2').textContent==='HYDRATION CARE')
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),390)
 await page.setViewportSize({width:1920,height:920});await page.emulateMedia({reducedMotion:'reduce'})
 assert(!await page.locator('#care').evaluate(e=>e.classList.contains('care-pinned')))
 assert.deepEqual(errors,[])
 await writeFile('reference/browser/care-scroll-verification.json',JSON.stringify({states,errors,checks:['Actual mouse wheel advances the pinned scene','Scroll position continuously controls image masks','Stationary scroll position holds the mask','Reverse scroll restores the same mask','All three categories and tab scroll shortcuts','Mobile tabs, no overflow, reduced-motion cleanup']},null,2))
 console.log('PASS continuous care scroll, wheel, hold, reverse, tabs, mobile and reduced motion.')
}finally{await browser.close()}


