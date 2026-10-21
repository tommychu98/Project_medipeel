import { newProducts } from '../../data/newProducts'
import useSlider from '../../hooks/useSlider'
import SliderControls from '../ui/SliderControls'
import ViewMoreButton from '../ui/ViewMoreButton'
import useSliderTimer from '../../hooks/useSliderTimer'
const imageGroups=newProducts.map(product=>[product.image])
export default function NewProductsSection(){
 const slider=useSlider(newProducts.length,imageGroups),product=newProducts[slider.index]
 const {sectionRef,barRef,paused,toggle}=useSliderTimer(slider)
 return <section ref={sectionRef} id="new-products" className="new-products section" aria-label="신제품" aria-roledescription="캐러셀" aria-busy={slider.loading} tabIndex="0" {...slider.gestures}>
  <div className="product-copy" key={'copy-'+product.id} data-node-id={product.node}>
   <p className="eyebrow">NEW PRODUCT</p><h2>{product.lines.map(line=><span key={line}>{line}</span>)}</h2><p className={'product-description product-description-'+slider.index}>{product.description}</p>
  </div>
  <div className="product-visual" key={'image-'+product.id}><img src={product.image} alt={product.imageAlt} width="1079" height="658" decoding="async"/></div>
  <div className="product-actions"><ViewMoreButton href={product.href} context={product.name}/><SliderControls index={slider.index} count={newProducts.length} onSelect={slider.select} onPrevious={slider.previous} onNext={slider.next} label="신제품" progressRef={barRef} paused={paused} onToggle={toggle}/>{slider.error && <p className="slider-status" role="status">{slider.error}</p>}</div>
 </section>
}

