import { careCategories } from '../../data/careCategories'
import useSlider from '../../hooks/useSlider'
import useCareScroll from '../../hooks/useCareScroll'
import CareLinkGrid from '../ui/CareLinkGrid'
const imageGroups=careCategories.map(category=>[category.image])
export default function CareSection(){
 const slider=useSlider(careCategories.length,imageGroups),category=careCategories[slider.index]
 const {ref,choose}=useCareScroll(slider.select)
 return <section ref={ref} id="care" className="care-section section" aria-label="피부 고민별 케어" {...slider.gestures}>
  <div className="care-stage">
  <div className="care-scroll-images" aria-hidden="true">{careCategories.map(item=><div key={item.id} className={'care-scroll-image '+item.layout}><img src={item.image} alt="" width="908" height="970" loading="lazy" decoding="async"/></div>)}</div>
  <div className="care-tabs" role="tablist" aria-label="케어 선택">{careCategories.map((item,i)=><button type="button" key={item.id} id={'tab-'+item.id} role="tab" aria-selected={i===slider.index} aria-controls="care-panel" tabIndex={i===slider.index?0:-1} onClick={()=>choose(i)} onKeyDown={event=>{let target=i;if(event.key==='ArrowRight')target=(i+1)%3;else if(event.key==='ArrowLeft')target=(i+2)%3;else if(event.key==='Home')target=0;else if(event.key==='End')target=2;else return;event.preventDefault();choose(target);document.getElementById('tab-'+careCategories[target].id)?.focus()}}>{item.shortTitle}</button>)}</div>
  <div id="care-panel" role="tabpanel" aria-labelledby={'tab-'+category.id} tabIndex="0" className={'care-panel '+category.layout} data-node-id={category.node}>
   <div className="care-copy" key={'copy-'+category.id}><h2 className="serif-heading">{category.title}</h2><p>{category.description}</p><CareLinkGrid category={category}/></div>
   <div className="care-visual" key={'image-'+category.id}><img src={category.image} alt={category.imageAlt} width="908" height="970" loading="lazy" decoding="async"/></div>
  </div>
  </div>
 </section>
}

