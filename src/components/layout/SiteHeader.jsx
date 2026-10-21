import { useEffect, useRef, useState } from 'react'
import { assets } from '../../data/assets'
import { navigation, utilityLinks } from '../../data/navigation'
import LinkAction from '../ui/LinkAction'
import HeaderIcon from '../ui/HeaderIcon'
export default function SiteHeader(){
 const [open,setOpen]=useState(false),dialog=useRef(null),toggle=useRef(null)
 const [hidden,setHidden]=useState(false)
 const [language,setLanguage]=useState('KOR')
 const languageButton=<button type="button" className="language-toggle" onClick={()=>setLanguage(current=>current==='KOR'?'ENG':'KOR')} aria-label={language==='KOR'?'언어 표시를 ENG로 변경':'언어 표시를 KOR로 변경'}><span lang="en" aria-live="polite">{language}</span><HeaderIcon name="globe"/></button>
 useEffect(()=>{
  let previous=window.scrollY,frame=0
  const scroll=()=>{if(frame)return;frame=requestAnimationFrame(()=>{const next=window.scrollY;if(Math.abs(next-previous)>5){setHidden(next>previous&&next>120);previous=next}frame=0})}
  window.addEventListener('scroll',scroll,{passive:true})
  return ()=>{window.removeEventListener('scroll',scroll);cancelAnimationFrame(frame)}
 },[])
 const close=()=>{dialog.current.close();setOpen(false);toggle.current?.focus()}
 useEffect(()=>{
  if(!open)return
  dialog.current.showModal()
  const previous=document.body.style.overflow
  document.body.style.overflow='hidden'
  const media=window.matchMedia('(min-width: 1100px)')
  const resize=()=>{if(media.matches){dialog.current.close();setOpen(false)}}
  media.addEventListener('change',resize)
  return ()=>{document.body.style.overflow=previous;media.removeEventListener('change',resize)}
 },[open])
 return <header className={'site-header'+(hidden&&!open?' header-hidden':'')}>
  <a href="#top" className="brand-logo" aria-label="MEDIPEEL 홈"><img src={assets['140:670/imgLogo']} alt="MEDIPEEL" width="232" height="100"/></a>
  <nav className="desktop-nav" aria-label="주 메뉴">{navigation.map(item=><LinkAction key={item.label} href={item.href}>{item.label}</LinkAction>)}</nav>
  <div className="header-utilities">{utilityLinks.map(item=><LinkAction key={item.label} href={item.href}>{item.label}<HeaderIcon name={item.label==='CART'?'cart':'user'}/></LinkAction>)}{languageButton}</div>
  <button ref={toggle} type="button" className="menu-toggle" aria-label="메뉴 열기" aria-expanded={open} aria-controls="mobile-menu" onClick={()=>setOpen(true)}><span/><span/></button>
  <dialog id="mobile-menu" ref={dialog} className="mobile-menu" aria-label="전체 메뉴" onCancel={event=>{event.preventDefault();close()}}>
   <div className="mobile-menu-top"><img src={assets['140:670/imgLogo']} alt="MEDIPEEL" width="232" height="100"/><button type="button" onClick={close} aria-label="메뉴 닫기">닫기 ×</button></div>
   <nav aria-label="모바일 주 메뉴">{navigation.map((item,index)=><LinkAction key={item.label} href={item.href} onClick={close}><span>0{index+1}</span>{item.label}</LinkAction>)}</nav>
   <div className="mobile-utilities">{utilityLinks.map(item=><LinkAction key={item.label} href={item.href} onClick={close}>{item.label}<HeaderIcon name={item.label==='CART'?'cart':'user'}/></LinkAction>)}{languageButton}</div>
  </dialog>
 </header>
}
