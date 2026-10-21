import { useEffect, useRef } from 'react'
import useReducedMotion from './useReducedMotion'
export default function useReveal() {
 const ref=useRef(null), reduced=useReducedMotion()
 useEffect(()=>{
  const element=ref.current
  if(!element)return
  if(reduced || !('IntersectionObserver' in window) || typeof element.animate!=='function'){element.classList.add('is-revealed');return}
  element.classList.add('is-revealed')
  const entrance=element.animate([{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],{duration:350,easing:'cubic-bezier(.22,.61,.36,1)',fill:'both'})
  const animations=element.getAnimations({subtree:true}).filter(animation=>Number.isFinite(animation.effect.getComputedTiming().endTime))
  if(!animations.includes(entrance))animations.push(entrance)
  const duration=Math.max(...animations.map(animation=>animation.effect.getComputedTiming().endTime))
  let frame=0,time=0,target=0,previousTime=0,previousY=window.scrollY,direction=1
  const paint=()=>animations.forEach(animation=>{animation.pause();animation.currentTime=time})
  const update=now=>{
   const delta=previousTime?Math.min(50,now-previousTime):0
   previousTime=now
   time=Math.max(0,Math.min(duration,time+(target===duration?delta:-delta)))
   paint()
   if(time!==target)frame=requestAnimationFrame(update)
   else{frame=0;previousTime=0}
  }
  const request=()=>{
   const nextY=window.scrollY
   if(Math.abs(nextY-previousY)>1)direction=nextY>previousY?1:-1
   previousY=nextY
   const rect=element.getBoundingClientRect()
   if(rect.bottom<=0){time=duration;target=duration;paint();return}
   if(rect.top>=window.innerHeight){time=0;target=0;paint();return}
   target=direction>0?duration:0
   if(!frame&&time!==target)frame=requestAnimationFrame(update)
  }
  paint()
  const observer=new IntersectionObserver(request,{threshold:[0,.08]})
  observer.observe(element)
  window.addEventListener('scroll',request,{passive:true})
  request()
  return ()=>{
   observer.disconnect();cancelAnimationFrame(frame);window.removeEventListener('scroll',request)
   animations.forEach(animation=>animation.cancel())
   element.classList.remove('is-revealed')
  }
 },[reduced])
 return ref
}
