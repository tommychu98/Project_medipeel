import { useState } from 'react'
import { assets } from '../../data/assets'
export default function StatementMarquee(){
 const [paused,setPaused]=useState(false)
 const text='SKIN SCIENCE PROVEN DATA REAL OUTCOME'
 return <section className={'statement-section '+(paused?'is-paused':'')} aria-label={text} data-node-id="140:963">
  <img className="statement-background" src={assets['140:963/imgImage']} width="1920" height="540" alt="" aria-hidden="true" loading="lazy"/>
  <div className="marquee-track" aria-hidden="true"><span>{text}&nbsp;</span><span>{text}&nbsp;</span></div>
  <button type="button" className="motion-toggle" aria-pressed={paused} onClick={()=>setPaused(!paused)}>{paused?'문구 움직임 재생':'문구 움직임 정지'}</button><div className="statement-band"/>
 </section>
}
