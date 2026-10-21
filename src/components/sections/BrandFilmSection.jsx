import { assets } from '../../data/assets'
import useSceneProgress from '../../hooks/useSceneProgress'
export default function BrandFilmSection(){
 const ref=useSceneProgress()
 return <section id="brand-film" ref={ref} className="brand-film" aria-labelledby="brand-title" data-node-id="194:450">
  <div className="brand-stage">
   <div className="brand-images" aria-hidden="true"><img className="brand-image brand-narrow" src={assets['194:450/imgImage']} width="494" height="680" alt="" loading="lazy"/><img className="brand-image brand-wide" src={assets['194:450/imgImage1']} width="1530" height="680" alt="" loading="lazy"/><img className="brand-image brand-full" src={assets['194:450/imgImage2']} width="1920" height="680" alt="" loading="lazy"/></div>
   <h2 id="brand-title">REWIND YOUR BEST SCENE</h2>
   <div className="brand-description"><h3>MEDI-PEEL DERMA</h3><p>수만 번의 연구와 임상으로 증명된 완벽한 미장센<br/>메디필이 당신의 피부 서사를 가장 아름다운 씬(Scene)으로 되감습니다</p></div>
   <a className="back-top" href="#top" aria-label="맨 위로 이동"><span/></a>
  </div>
 </section>
}
