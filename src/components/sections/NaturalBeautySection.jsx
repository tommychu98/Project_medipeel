import { assets } from '../../data/assets'
import useReveal from '../../hooks/useReveal'
export default function NaturalBeautySection(){
 const ref=useReveal()
 return <section ref={ref} id="natural-beauty" className="natural-section section reveal" data-node-id="190:188">
  <div className="natural-display" aria-hidden="true">SKIN DERMA</div>
  <div className="natural-art"><div className="natural-texture"><img src={assets['190:188/imgFrame867']} alt="" loading="lazy"/></div><div className="natural-figure" role="img" aria-label="초록빛 가지를 부드럽게 감싸는 손"><img className="natural-hand" src={assets['190:188/imgHands']} alt="" loading="lazy"/><img className="natural-sprig" src={assets['190:188/imgLeaves']} alt="" loading="lazy"/><img className="natural-hand natural-hand-front" src={assets['190:188/imgHands']} alt="" loading="lazy" aria-hidden="true"/></div></div>
  <div className="natural-copy"><h2><span>자연</span>스러운 아름다움</h2><img className="natural-line" src={assets['190:188/imgLine7']} width="956.5" height="0.500043" alt=""/><p>우리는 끊임없이 더나은 피부에 도전하고<br/>아름다움에 대한 해답을 만들어갑니다<br/>메디필과 함께 자연스러운 나 다움을 창조해 보세요</p></div>
 </section>
}
