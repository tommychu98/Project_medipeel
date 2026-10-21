import { assets } from '../../data/assets'
import useReveal from '../../hooks/useReveal'
export default function NaturalBeautySection(){
 const ref=useReveal()
 return <section ref={ref} id="natural-beauty" className="natural-section section reveal" data-node-id="190:188">
  <div className="natural-display" aria-hidden="true">SKIN DERMA</div>
  <div className="natural-art"><div className="natural-texture"><img src={assets['190:188/imgFrame867']} alt="" loading="lazy"/></div><svg className="natural-hand" viewBox="0 0 1 1" role="img" aria-labelledby="natural-art-title" preserveAspectRatio="none"><title id="natural-art-title">초록빛 가지를 부드럽게 감싸는 손</title><defs><mask id="natural-hand-mask" maskUnits="objectBoundingBox" x="0" y="0" width="1" height="1"><rect width="1" height="1" fill="white"/><path d="M .75 .58 L .82 .55 L .92 .56 L 1 .59 L 1 1 L .89 .96 L .83 .84 L .78 .72 Z" fill="black"/></mask><mask id="natural-sprig-mask" maskUnits="objectBoundingBox" x="0" y="0" width="1" height="1"><rect width="1" height="1" fill="black"/><path d="M .75 .58 L .82 .55 L .92 .56 L 1 .59 L 1 1 L .89 .96 L .83 .84 L .78 .72 Z" fill="white"/></mask></defs><image className="natural-hand-base" href={assets['190:188/imgHand1']} width="1" height="1" preserveAspectRatio="none" mask="url(#natural-hand-mask)"/><image className="natural-sprig" href={assets['190:188/imgHand1']} width="1" height="1" preserveAspectRatio="none" mask="url(#natural-sprig-mask)"/></svg></div>
  <div className="natural-copy"><h2><span>자연</span>스러운 아름다움</h2><img className="natural-line" src={assets['190:188/imgLine7']} width="956.5" height="0.500043" alt=""/><p>우리는 끊임없이 더나은 피부에 도전하고<br/>아름다움에 대한 해답을 만들어갑니다<br/>메디필과 함께 자연스러운 나 다움을 창조해 보세요</p></div>
 </section>
}
