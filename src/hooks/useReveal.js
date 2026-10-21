import { useEffect, useRef } from 'react'
import useReducedMotion from './useReducedMotion'
export default function useReveal() {
 const ref=useRef(null), reduced=useReducedMotion()
 useEffect(()=>{
  const element=ref.current
  if(!element)return
  if(reduced || !('IntersectionObserver' in window)){element.classList.add('is-revealed');return}
  element.classList.add('reveal-pending')
  const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){element.classList.add('is-revealed');element.classList.remove('reveal-pending');observer.disconnect()}},{threshold:0.08})
  observer.observe(element)
  return ()=>{observer.disconnect();element.classList.remove('reveal-pending')}
 },[reduced])
 return ref
}
