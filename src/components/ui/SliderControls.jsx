export default function SliderControls({index,count,onSelect,onPrevious,onNext,label,progressRef,paused,onToggle}) {
 const number=value=>String(value).padStart(2,'0')
 return <div className="slider-controls" aria-label={label+' 슬라이더 조작'}>
  <span aria-live="polite" aria-atomic="true"><span className="sr-only">{label} </span>{number(index+1)}<span className="sr-only"> / {count}</span></span>
  <div className={'slider-dots'+(onToggle?' slider-timer':'')}>
   {onToggle&&<div className="slider-time-track" aria-hidden="true"><span ref={progressRef}/></div>}
   {Array.from({length:count},(_,i)=><button type="button" key={i} aria-label={label+' '+(i+1)+'번 보기'} aria-pressed={i===index} className={i<=index?'filled':''} onClick={()=>onSelect(i)}/>)}
  </div>
  <span aria-hidden="true">{number(count)}</span>
  <button type="button" className="arrow-button previous" aria-label={label+' 이전'} onClick={onPrevious}><span/></button>
  <button type="button" className="arrow-button" aria-label={label+' 다음'} onClick={onNext}><span/></button>
  {onToggle&&<button type="button" className="slider-play-toggle" aria-label={paused?'신제품 자동 전환 재생':'신제품 자동 전환 정지'} aria-pressed={paused} onClick={onToggle}><span aria-hidden="true">{paused?'▷':'Ⅱ'}</span></button>}
 </div>
}

