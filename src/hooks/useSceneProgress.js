import { useEffect, useRef } from 'react'
import useReducedMotion from './useReducedMotion'
// A proposed sequence; not claimed to reproduce an observed TAP interaction.
export default function useSceneProgress() {
 const ref=useRef(null), reduced=useReducedMotion()
 useEffect(()=>{
  const element=ref.current
  if(!element)return
  const media=window.matchMedia('(min-width: 1024px)')
  let raf=0, current=0
  const update=()=>{
   raf=0
   if(reduced || !media.matches){element.style.setProperty('--scene','1');return}
   const rect=element.getBoundingClientRect()
   const progress=Math.max(0,Math.min(1,-rect.top/Math.max(1,rect.height-window.innerHeight)))
   current += (progress-current)*.16
   if(Math.abs(progress-current)<.0005)current=progress
   element.style.setProperty('--scene',current.toFixed(4))
   if(current!==progress)raf=requestAnimationFrame(update)
  }
  const request=()=>{if(!raf)raf=requestAnimationFrame(update)}
  window.addEventListener('scroll',request,{passive:true})
  window.addEventListener('resize',request)
  media.addEventListener('change',request)
  update()
  return ()=>{cancelAnimationFrame(raf);window.removeEventListener('scroll',request);window.removeEventListener('resize',request);media.removeEventListener('change',request);element.style.removeProperty('--scene')}
 },[reduced])
 return ref
}
