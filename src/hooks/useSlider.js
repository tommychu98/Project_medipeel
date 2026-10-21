import { useEffect, useRef, useState } from 'react'
const decodedImages = new Map()
function prepareImage(src) {
 if(!decodedImages.has(src)) {
  const image=new Image()
  image.src=src
  const ready=image.decode ? image.decode() : new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=reject})
  decodedImages.set(src,ready.catch(error=>{decodedImages.delete(src);throw error}))
 }
 return decodedImages.get(src)
}
export function wrapIndex(index, count) { return ((index % count) + count) % count }
export default function useSlider(count, imageGroups) {
 const [index,setIndex]=useState(0)
 const [loading,setLoading]=useState(false),[error,setError]=useState('')
 const request=useRef(0),requestedIndex=useRef(0)
 useEffect(()=>()=>{request.current+=1},[])
 const start=useRef(null)
 const select=async next=>{
  const target=wrapIndex(next,count),version=++request.current
  requestedIndex.current=target
  if(imageGroups){
   setLoading(true);setError('')
   try{await Promise.all(imageGroups[target].map(prepareImage))}
   catch{if(version===request.current){setError('이미지를 불러오지 못했습니다. 다시 선택해 주세요.');setLoading(false);requestedIndex.current=index}return}
  }
  if(version===request.current){setIndex(target);setLoading(false)}
 }
 const next=()=>select(requestedIndex.current+1)
 const previous=()=>select(requestedIndex.current-1)
 const gestures={
  onPointerDown(event){ if(event.pointerType==='mouse')return; start.current={x:event.clientX,y:event.clientY} },
  onPointerUp(event){ if(!start.current)return; const dx=event.clientX-start.current.x,dy=event.clientY-start.current.y; start.current=null; if(Math.abs(dx)>50 && Math.abs(dx)>Math.abs(dy)*1.3){if(dx<0)next();else previous()} },
  onPointerCancel(){start.current=null},
  onKeyDown(event){ if(event.target.closest('a,button,input'))return; if(event.key==='ArrowRight'){event.preventDefault();next()} if(event.key==='ArrowLeft'){event.preventDefault();previous()} },
 }
 return {index,select,next,previous,gestures,loading,error}
}
