import { useEffect, useRef, useState } from 'react'
import { LinkNoticeContext } from './linkNoticeContext'
export default function LinkNoticeProvider({children}) {
 const [label,setLabel]=useState(''),dialog=useRef(null),trigger=useRef(null)
 useEffect(()=>{if(label && !dialog.current.open)dialog.current.showModal()},[label])
 const close=()=>{dialog.current.close();setLabel('');trigger.current?.focus()}
 return <LinkNoticeContext.Provider value={value=>{trigger.current=document.activeElement;setLabel(value)}}>
  {children}
  <dialog className="link-dialog" ref={dialog} aria-labelledby="link-dialog-title" onCancel={event=>{event.preventDefault();close()}} onClick={event=>{if(event.target===dialog.current)close()}}>
   <h2 id="link-dialog-title">{label}</h2><p>현재 온라인 연결을 준비하고 있습니다.</p><p>제품 및 이용 문의는 고객센터로 연락해 주세요.</p>
   <a href="tel:1644-0465">1644-0465</a><button type="button" className="dialog-close" onClick={close}>닫기</button>
  </dialog>
 </LinkNoticeContext.Provider>
}
