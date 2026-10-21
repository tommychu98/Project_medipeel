import { useState } from 'react'
import { curationRing } from '../../data/curationRing'
import ViewMoreButton from '../ui/ViewMoreButton'
export default function PersonalCurationSection(){
 const [paused,setPaused]=useState(false)
 return <section id="curation" className={'curation-section section '+(paused?'is-paused':'')} data-node-id="140:954" aria-labelledby="curation-title">
  <div className="curation-ring" aria-hidden="true">{curationRing.map(letter=><span key={letter.node} className="ring-letter" style={{left:letter.x/1920*100+'%',top:letter.y/1080*100+'%',width:letter.width/1920*100+'%',height:letter.height/1080*100+'%'}}><span style={{transform:'rotate('+letter.angle+'deg)'}}>{letter.char}</span></span>)}</div>
  <div className="curation-copy"><h2 id="curation-title" className="serif-heading">PERSONAL<br/>CURATION</h2><p>당신의 피부 시간을 멈추는 큐레이션<br/>지금 당신의 맞춤 더마 루틴을 발견해 보세요</p><ViewMoreButton label="THE ANSWER IS HERE" context="맞춤 더마 루틴" arrow={false}/></div>
  <button className="motion-toggle" type="button" aria-pressed={paused} onClick={()=>setPaused(!paused)}>{paused?'장식 움직임 재생':'장식 움직임 정지'}</button>
 </section>
}
