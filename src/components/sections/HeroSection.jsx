import { useEffect, useRef, useState } from 'react'
import { assets } from '../../data/assets'
import useReducedMotion from '../../hooks/useReducedMotion'
export default function HeroSection(){
 const reduced=useReducedMotion(),video=useRef(null),wantsPlayback=useRef(!reduced),[playing,setPlaying]=useState(false),[failed,setFailed]=useState(false)
 useEffect(()=>{
  const element=video.current
  wantsPlayback.current=!reduced
  if(reduced)element.pause();else element.play().catch(()=>setPlaying(false))
  if(!('IntersectionObserver' in window))return
  const observer=new IntersectionObserver(([entry])=>{if(!entry.isIntersecting)element.pause();else if(wantsPlayback.current)element.play().catch(()=>setPlaying(false))},{threshold:0.05})
  observer.observe(element)
  return ()=>{observer.disconnect();element.pause()}
 },[reduced])
 const toggle=()=>{wantsPlayback.current=video.current.paused;if(!video.current.paused)video.current.pause();else video.current.play().catch(()=>setFailed(true))}
 return <section className="hero-section" aria-label="메디필 브랜드 영상" data-node-id="140:670">
  <video ref={video} autoPlay={!reduced} muted loop playsInline preload="metadata" poster={assets['140:670/img51']} onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} onError={()=>{setFailed(true);setPlaying(false)}}>
   <source src="/videos/medipeel-hero.mp4" type="video/mp4"/>
  </video>
  <img className="hero-overlay" src={assets['140:670/imgImage']} alt="" aria-hidden="true" width="1920" height="1080"/>
  <h1><span>BOUNCE YOUR SKIN</span><span>POP YOUR DERMA</span></h1>
  <button type="button" className="video-toggle" onClick={toggle} aria-label={playing?'브랜드 영상 일시 정지':'브랜드 영상 재생'} disabled={failed}><span aria-hidden="true">{playing?'Ⅱ':'▷'}</span>{playing?'PAUSE':'PLAY'}</button>
  {failed && <p className="video-error" role="status">영상을 불러오지 못했습니다. 잠시 후 다시 확인해 주세요.</p>}
 </section>
}
