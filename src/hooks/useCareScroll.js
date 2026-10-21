import { useEffect, useRef } from 'react'
import useReducedMotion from './useReducedMotion'

const clamp=value=>Math.max(0,Math.min(1,value))
const stops=[.05,.46,.94]
export default function useCareScroll(select) {
 const ref=useRef(null),callback=useRef(select),reduced=useReducedMotion()
 useEffect(()=>{callback.current=select})
 useEffect(()=>{
  const root=ref.current,stage=root?.querySelector('.care-stage')
  if(!stage)return
  const images=[...stage.querySelectorAll('.care-scroll-image')]
  let frame=0,current=0,last=-1,enabled=false
  const paint=progress=>{
   let index=0,opacity=1
   const states=images.map(()=>({size:0,opacity:0}))
   const transition=(from,to,t)=>{
    states[from]={size:1-t,opacity:1-clamp((t-.8)/.2)}
    states[to]={size:t,opacity:1}
    index=t<.5?from:to
    opacity=t<.5?1-clamp(t/.25):clamp((t-.6)/.4)
   }
   if(progress<.12)states[0]={size:1,opacity:1}
   else if(progress<.38)transition(0,1,(progress-.12)/.26)
   else if(progress<.55){states[1]={size:1,opacity:1};index=1}
   else if(progress<.82)transition(1,2,(progress-.55)/.27)
   else{states[2]={size:1,opacity:1};index=2}
   images.forEach((image,i)=>{
    const size=states[i].size,w=image.offsetWidth,h=image.offsetHeight
    const x=Math.max(0,(w-64)/2)*(1-size),y=Math.max(0,(h-64)/2)*(1-size)
    image.style.clipPath=`inset(${y}px ${x}px)`
    image.style.opacity=states[i].opacity
   })
   root.style.setProperty('--care-copy-opacity',opacity)
   root.dataset.careProgress=progress.toFixed(4)
   if(index!==last){last=index;callback.current(index)}
  }
  const update=()=>{
   frame=0
   if(!enabled)return
   const distance=root.offsetHeight-stage.offsetHeight
   if(distance<=0)return
   const target=clamp(-root.getBoundingClientRect().top/distance)
   current+=(target-current)*.14
   if(Math.abs(target-current)<.0001)current=target
   paint(current)
   if(current!==target)frame=requestAnimationFrame(update)
  }
  const request=()=>{if(!frame)frame=requestAnimationFrame(update)}
  const resize=()=>{
   enabled=!reduced&&window.innerWidth>=1024&&window.innerHeight>=650&&stage.offsetHeight>0
   root.classList.toggle('care-pinned',enabled)
   if(enabled){last=-1;request()}
   else{root.style.removeProperty('--care-copy-opacity');delete root.dataset.careProgress}
  }
  window.addEventListener('scroll',request,{passive:true})
  window.addEventListener('resize',resize)
  const observer=new ResizeObserver(resize);observer.observe(stage);resize()
  return ()=>{observer.disconnect();cancelAnimationFrame(frame);window.removeEventListener('scroll',request);window.removeEventListener('resize',resize);root.classList.remove('care-pinned');root.style.removeProperty('--care-copy-opacity');delete root.dataset.careProgress}
 },[reduced])
 const choose=index=>{
  const root=ref.current
  if(root?.classList.contains('care-pinned')){
   const distance=root.offsetHeight-root.querySelector('.care-stage').offsetHeight
   window.scrollTo({top:window.scrollY+root.getBoundingClientRect().top+distance*stops[index],behavior:'smooth'})
  }else select(index)
 }
 return {ref,choose}
}
