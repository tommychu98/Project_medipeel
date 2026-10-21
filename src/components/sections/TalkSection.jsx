import { assets } from '../../data/assets'
import { contactLinks } from '../../data/contactLinks'
import ViewMoreButton from '../ui/ViewMoreButton'
import useReveal from '../../hooks/useReveal'
export default function TalkSection(){const ref=useReveal();return <section ref={ref} id="talk" className="talk-section reveal" data-node-id="194:639" aria-labelledby="talk-title">
 <img className="talk-background" src={assets['194:639/imgFrame877']} alt="" width="1920" height="1080" loading="lazy"/>
 <h2 id="talk-title">TALK TO MEDI-PEEL</h2>
 <div className="talk-columns">{contactLinks.map((item,i)=><article key={item.id}>{i>0 && <img className="talk-divider" src={assets['194:639/imgLine8']} alt="" width="300" height="0.5"/>}<h3>{item.title}</h3><p>{item.description}</p><ViewMoreButton href={item.href} label={item.ctaLabel} context={item.title} arrow={false}/></article>)}</div>
 </section>}
