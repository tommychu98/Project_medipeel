import { useEffect, useRef } from 'react'
import { assets } from '../../data/assets'
import useSceneProgress from '../../hooks/useSceneProgress'
export default function BrandFilmSection(){
 const ref=useSceneProgress()
 const videoRef=useRef(null)
 useEffect(()=>{
  const video=videoRef.current
  const resume=()=>{
   if(document.hidden)return
   video.muted=true
   video.play().catch(()=>{})
  }
  const observer=typeof IntersectionObserver==='undefined'?null:new IntersectionObserver(entries=>{
   if(entries.some(entry=>entry.isIntersecting))resume()
  })
  observer?.observe(video)
  video.addEventListener('canplay',resume)
  document.addEventListener('visibilitychange',resume)
  window.addEventListener('focus',resume)
  window.addEventListener('pointerdown',resume)
  resume()
  return ()=>{
   observer?.disconnect();video.removeEventListener('canplay',resume)
   document.removeEventListener('visibilitychange',resume)
   window.removeEventListener('focus',resume);window.removeEventListener('pointerdown',resume)
  }
 },[])
 return <section id="brand-film" ref={ref} className="brand-film" aria-labelledby="brand-title" data-node-id="194:450">
  <div className="brand-stage">
   <div className="brand-images" aria-hidden="true"><video ref={videoRef} className="brand-image brand-full" src="/videos/moss-gentle-loop.mp4" poster={assets['194:450/imgImage2']} autoPlay muted loop playsInline preload="auto"/></div>
   <h2 id="brand-title">REWIND YOUR BEST SCENE</h2>
   <div className="brand-description"><h3>MEDI-PEEL DERMA</h3><p>수만 번의 연구와 임상으로 증명된 완벽한 미장센<br/>메디필이 당신의 피부 서사를 가장 아름다운 씬(Scene)으로 되감습니다</p></div>
   <a className="back-top" href="#top" aria-label="맨 위로 이동"><span/></a>
  </div>
 </section>
}
