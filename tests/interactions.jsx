import assert from 'node:assert/strict'
import { act } from 'react'
import { createRoot } from 'react-dom/client'
import App from '../src/App'
import { newProducts } from '../src/data/newProducts'
import { reviews } from '../src/data/reviews'
export async function run(){
 const checks=[],root=createRoot(document.getElementById('root'))
 const click=async element=>{assert.ok(element);await act(async()=>element.dispatchEvent(new MouseEvent('click',{bubbles:true})))}
 await act(async()=>root.render(<App/>))
 try{
  assert.equal(document.querySelectorAll('main>section').length,10)
  assert.equal(document.querySelectorAll('.technology-item').length,7)
  assert.equal(document.querySelectorAll('.talk-columns article').length,3)
  assert.equal(document.querySelectorAll('a[href=""],a[href="#"]').length,0)
  checks.push('All ten main sections, seven technology images, three contact columns and meaningful hrefs render.')
  const pendingLoads=new Map()
  globalThis.decodeImage=src=>new Promise((resolve,reject)=>pendingLoads.set(src,{resolve,reject}))
  await click(document.querySelector('[aria-label="신제품 다음"]'))
  assert.equal(document.querySelector('#new-products').getAttribute('aria-busy'),'true')
  assert.equal(document.querySelector('.product-visual img').getAttribute('src'),newProducts[0].image)
  await click(document.querySelector('[aria-label="신제품 다음"]'))
  await act(async()=>pendingLoads.get('http://localhost'+newProducts[2].image).resolve())
  assert.equal(document.querySelector('.product-visual img').getAttribute('src'),newProducts[2].image)
  await act(async()=>pendingLoads.get('http://localhost'+newProducts[1].image).resolve())
  assert.equal(document.querySelector('.product-visual img').getAttribute('src'),newProducts[2].image)
  await click(document.querySelector('[aria-label="신제품 다음"]'))
  await act(async()=>pendingLoads.get('http://localhost'+newProducts[3].image).reject(new Error('test network failure')))
  assert.equal(document.querySelector('.product-visual img').getAttribute('src'),newProducts[2].image)
  assert.match(document.querySelector('#new-products .slider-status').textContent,/불러오지 못했습니다/)
  delete globalThis.decodeImage
  await click(document.querySelector('[aria-label="신제품 1번 보기"]'))
  checks.push('Slow, failed and out-of-order image loads cannot desynchronize visible product content.')
  for(let i=0;i<7;i++){
   const expected=newProducts[i%6]
   assert.equal(document.querySelector('.product-visual img').getAttribute('src'),expected.image)
   assert.equal(document.querySelector('.product-copy h2').textContent,expected.lines.join(''))
   assert.equal(document.querySelectorAll('#new-products [aria-pressed="true"]').length,1)
   await click(document.querySelector('[aria-label="신제품 다음"]'))
  }
  await click(document.querySelector('[aria-label="신제품 이전"]'))
  await click(document.querySelector('[aria-label="신제품 6번 보기"]'))
  assert.equal(document.querySelector('.product-copy h2').textContent,newProducts[5].lines.join(''))
  await act(async()=>document.querySelector('#new-products').dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true})))
  assert.equal(document.querySelector('.product-visual img').getAttribute('src'),newProducts[0].image)
  checks.push('All six products stay synchronized; next/previous/direct selection and keyboard wrapping work.')
  const touch=(type,x,y)=>{const event=new Event(type,{bubbles:true});Object.defineProperties(event,{pointerType:{value:'touch'},clientX:{value:x},clientY:{value:y}});return event}
  await act(async()=>{document.querySelector('#new-products').dispatchEvent(touch('pointerdown',250,100));document.querySelector('#new-products').dispatchEvent(touch('pointerup',100,105))})
  assert.equal(document.querySelector('.product-visual img').getAttribute('src'),newProducts[1].image)
  await act(async()=>{document.querySelector('#new-products').dispatchEvent(touch('pointerdown',250,100));document.querySelector('#new-products').dispatchEvent(touch('pointerup',230,300))})
  assert.equal(document.querySelector('.product-visual img').getAttribute('src'),newProducts[1].image)
  checks.push('Horizontal touch gestures advance the product slider without treating vertical scroll as a swipe.')
  for(let i=0;i<4;i++){
   const expected=reviews[i%3]
   assert.equal(document.querySelector('.review-visual img').getAttribute('src'),expected.productImage)
   assert.equal(document.querySelector('.review-detail>img').getAttribute('src'),expected.skinImage)
   assert.equal(document.querySelector('.review-excerpt h3').textContent,expected.productName)
   assert.equal(document.querySelector('.review-excerpt time').textContent,expected.date)
   await click(document.querySelector('[aria-label="리뷰 다음"]'))
  }
  checks.push('Three reviews keep product, skin image, text and date synchronized through wraparound.')
  await click(document.querySelector('#tab-elasticity'))
  assert.ok(document.querySelector('.care-panel.image-left'))
  assert.equal(document.querySelectorAll('.care-link-grid button').length,9)
  await act(async()=>document.querySelector('#tab-elasticity').dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true})))
  assert.equal(document.querySelector('[role="tab"][aria-selected="true"]').id,'tab-soothing')
  assert.equal(document.activeElement.id,'tab-soothing')
  checks.push('Care tabs preserve the reversed elasticity layout, nine actions and keyboard focus.')
  const pending=document.querySelector('.care-link-grid button');pending.focus()
  await click(pending)
  assert.equal(document.querySelector('.link-dialog').open,true)
  assert.match(document.querySelector('.link-dialog').textContent,/온라인 연결을 준비/)
  await click(document.querySelector('.dialog-close'))
  assert.equal(document.activeElement,pending)
  checks.push('Unmapped destinations open an honest notice and restore focus on close.')
  await click(document.querySelector('.menu-toggle'))
  assert.equal(document.querySelector('#mobile-menu').open,true)
  assert.equal(document.body.style.overflow,'hidden')
  await act(async()=>document.querySelector('#mobile-menu').dispatchEvent(new Event('cancel',{cancelable:true})))
  assert.equal(document.querySelector('#mobile-menu').open,false)
  assert.equal(document.body.style.overflow,'')
  assert.equal(document.activeElement,document.querySelector('.menu-toggle'))
  checks.push('Mobile menu opens, closes through cancel/Escape behavior, restores scroll and focus.')
  const video=document.querySelector('video')
  assert.equal(video.loop,true);assert.equal(video.muted,true);assert.equal(video.playsInline,true)
  await act(async()=>globalThis.setReducedMotion(true))
  assert.equal(video.paused,true)
  assert.equal(document.querySelector('.brand-film').style.getPropertyValue('--scene'),'1')
  checks.push('Reduced-motion changes pause autoplay and expose the final brand state.')
  await click(document.querySelector('.statement-section .motion-toggle'))
  assert.ok(document.querySelector('.statement-section.is-paused'))
  checks.push('Marquee pause control updates its persistent pause state.')
 }finally{await act(async()=>root.unmount())}
 return checks
}
