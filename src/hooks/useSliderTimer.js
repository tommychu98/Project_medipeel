import { useEffect, useRef, useState } from 'react'
import useReducedMotion from './useReducedMotion'

export default function useSliderTimer(slider, duration=4000) {
 const sectionRef=useRef(null),barRef=useRef(null),elapsed=useRef(0),advance=useRef(slider.next)
 const [paused,setPaused]=useState(false),[visible,setVisible]=useState(false)
 const reduced=useReducedMotion()
 useEffect(()=>{advance.current=slider.next})
 useEffect(()=>{
  elapsed.current=0
  barRef.current?.style.setProperty('--slider-progress','0')
 },[slider.index])
 useEffect(()=>{
  const element=sectionRef.current
  if(!element||!window.IntersectionObserver)return
  const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting&&entry.intersectionRatio>=.25),{threshold:[0,.25]})
  observer.observe(element)
  return ()=>observer.disconnect()
 },[])
 const stopped=paused||reduced||!visible
 useEffect(()=>{
  if(stopped||slider.loading||slider.error)return
  let frame=0,previous=0
  const update=time=>{
   if(document.hidden){previous=0;frame=requestAnimationFrame(update);return}
   if(previous)elapsed.current=Math.min(duration,elapsed.current+time-previous)
   previous=time
   barRef.current?.style.setProperty('--slider-progress',String(elapsed.current/duration))
   if(elapsed.current>=duration){advance.current();return}
   frame=requestAnimationFrame(update)
  }
  frame=requestAnimationFrame(update)
  return ()=>cancelAnimationFrame(frame)
 },[stopped,slider.index,slider.loading,slider.error,duration])
 return {sectionRef,barRef,paused:paused||reduced,toggle:()=>setPaused(value=>!value)}
}
