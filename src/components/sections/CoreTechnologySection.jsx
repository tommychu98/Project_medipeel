import { technologies } from '../../data/technologies'
import ViewMoreButton from '../ui/ViewMoreButton'
import TechnologyItem from '../ui/TechnologyItem'
export default function CoreTechnologySection(){return <section id="technology" className="technology-section" data-node-id="140:1111" aria-labelledby="technology-title">
 <div className="technology-intro"><h2 id="technology-title" className="serif-heading">CORE TECHNOLOGY</h2><p>타협 없는 성분 배합과 독보적인 전달 기술<br/>눈에 보이는 확실한 피부 변화를 증명하는 메디필의 핵심 메커니즘입니다</p><ViewMoreButton context="메디필 핵심 기술"/></div>
 <div className="technology-gallery">{technologies.map(item=><TechnologyItem key={item.id} item={item}/>)}</div>
 </section>}
