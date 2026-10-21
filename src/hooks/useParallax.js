import { useEffect } from 'react'
import useReducedMotion from './useReducedMotion'

// A restrained implementation proposal, disabled on small screens and reduced motion.
export default function useParallax(ref) {
 const reduced=useReducedMotion()
 useEffect(()=>{
  const element=ref.current
  if(!element || reduced)return
  const media=window.matchMedia('(min-width: 1024px)')
  let frame=0
  const update=()=>{
   frame=0
   const rect=element.getBoundingClientRect()
   const offset=media.matches ? Math.max(-12,Math.min(12,(window.innerHeight/2-rect.top-rect.height/2)*.018)) : 0
   element.style.setProperty('--parallax',offset.toFixed(2)+'px')
  }
  const request=()=>{if(!frame)frame=requestAnimationFrame(update)}
  window.addEventListener('scroll',request,{passive:true})
  window.addEventListener('resize',request)
  update()
  return ()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',request);window.removeEventListener('resize',request);element.style.removeProperty('--parallax')}
 },[ref,reduced])
}
