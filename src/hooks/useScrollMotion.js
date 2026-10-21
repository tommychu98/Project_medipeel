import { useEffect } from 'react'

// Reverse ambient CSS motion without restarting its current position.
export default function useScrollMotion(){
 useEffect(()=>{
  let previousY=window.scrollY,frame=0,direction=1
  const update=()=>{
   frame=0
   document.querySelectorAll('.curation-ring,.marquee-track,.natural-sprig').forEach(element=>{
    element.getAnimations().forEach(animation=>{
     const timing=animation.effect.getTiming()
     if(timing.iterations!==Infinity)return
     const cycle=Number(timing.duration)*(timing.direction==='alternate'?2:1)
     if(direction<0&&animation.currentTime<cycle*2)animation.currentTime+=cycle*1000
     animation.updatePlaybackRate(direction)
    })
   })
  }
  const scroll=()=>{
   const nextY=window.scrollY
   if(Math.abs(nextY-previousY)<2)return
   direction=nextY>previousY?1:-1;previousY=nextY
   if(!frame)frame=requestAnimationFrame(update)
  }
  window.addEventListener('scroll',scroll,{passive:true})
  return ()=>{window.removeEventListener('scroll',scroll);cancelAnimationFrame(frame)}
 },[])
}
