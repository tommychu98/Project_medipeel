import useReveal from '../../hooks/useReveal'
import useParallax from '../../hooks/useParallax'
export default function TechnologyItem({item}) {
 const ref=useReveal()
 useParallax(ref)
 return <figure ref={ref} className={'technology-item reveal technology-'+item.id} data-node-id={item.node} style={{'--slot-width':item.width/1920*100+'%','--slot-x':item.x/1920*100+'%','--slot-y':item.y/3240*100+'%'}}>
  <div className="technology-image"><img src={item.image} alt={item.imageAlt} width={item.width} height={item.height} loading="lazy" decoding="async"/><span>{item.title}</span></div>
  <figcaption>{item.description}</figcaption>
 </figure>
}
