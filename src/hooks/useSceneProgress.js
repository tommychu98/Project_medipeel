import { useEffect, useRef } from 'react'
export default function useSceneProgress() {
 const ref=useRef(null)
 useEffect(()=>{
  const element=ref.current
  if(!element)return
  if(typeof IntersectionObserver==='undefined'){element.style.setProperty('--scene','1');return}
  let raf=0,current=0,target=1,previous=0,locked=false,cooldown=0,touchY=0,previousY=window.scrollY
  const unlock=()=>{locked=false}
  const update=time=>{
   const delta=previous?Math.min(time-previous,50):0
   previous=time
   current=Math.max(0,Math.min(1,current+(target===1?1:-1)*delta/1600))
   element.style.setProperty('--scene',(current*current*(3-2*current)).toFixed(5))
   if(current!==target){raf=requestAnimationFrame(update);return}
   raf=0;previous=0;unlock()
   if(target===0){cooldown=performance.now()+1200;window.scrollTo({top:Math.max(0,window.scrollY+element.getBoundingClientRect().top-window.innerHeight),behavior:'smooth'})}
  }
  const play=direction=>{
   target=direction
   if(!locked){locked=true;window.scrollTo({top:window.scrollY+element.getBoundingClientRect().top,behavior:'instant'})}
   if(!raf){previous=0;raf=requestAnimationFrame(update)}
  }
  const request=()=>{
   const upward=window.scrollY<previousY
   previousY=window.scrollY
   if(locked||performance.now()<cooldown)return
   const rect=element.getBoundingClientRect()
   if(current===0&&rect.top<=window.innerHeight*.25&&rect.bottom>=window.innerHeight*.75)play(1)
   else if(upward&&current>0&&rect.top<=window.innerHeight*.25&&rect.bottom>=window.innerHeight*.75)play(0)
  }
  const input=(event,direction)=>{
   if(!locked&&Math.abs(element.getBoundingClientRect().top)>8)return
   if(direction<0&&current>0){event.preventDefault();play(0)}
   else if(locked){event.preventDefault();if(direction>0&&target===0)play(1)}
  }
  const wheel=event=>input(event,event.deltaY)
  const touchStart=event=>{touchY=event.touches[0].clientY}
  const touchMove=event=>{const y=event.touches[0].clientY;input(event,touchY-y);touchY=y}
  const key=event=>{
   if(event.target.closest('input,textarea,select,button,a'))return
   if(['ArrowUp','PageUp'].includes(event.key))input(event,-1)
   if(['ArrowDown','PageDown',' '].includes(event.key))input(event,1)
  }
  element.style.setProperty('--scene','0')
  const observer=new IntersectionObserver(request,{threshold:[0,.75,1]})
  observer.observe(element)
  window.addEventListener('scroll',request,{passive:true})
  window.addEventListener('wheel',wheel,{passive:false})
  window.addEventListener('touchstart',touchStart,{passive:true})
  window.addEventListener('touchmove',touchMove,{passive:false})
  window.addEventListener('keydown',key)
  return ()=>{
   observer.disconnect();cancelAnimationFrame(raf);unlock()
   window.removeEventListener('scroll',request);window.removeEventListener('wheel',wheel)
   window.removeEventListener('touchstart',touchStart);window.removeEventListener('touchmove',touchMove);window.removeEventListener('keydown',key)
  }
 },[])
 return ref
}
