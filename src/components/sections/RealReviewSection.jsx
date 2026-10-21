import { reviews } from '../../data/reviews'
import useSlider from '../../hooks/useSlider'
import SliderControls from '../ui/SliderControls'
const imageGroups=reviews.map(review=>[review.productImage,review.skinImage])
export default function RealReviewSection(){
 const slider=useSlider(reviews.length,imageGroups),review=reviews[slider.index]
 return <section id="reviews" className="review-section" aria-labelledby="review-title" aria-roledescription="캐러셀" aria-busy={slider.loading} tabIndex="0" {...slider.gestures}>
  <div className="review-heading"><h2 id="review-title" className="serif-heading">REAL REVIEW</h2><p>메디필 커뮤니티의 생생한 피부 변화를 만나보세요</p></div>
  <div className="review-detail" key={'detail-'+review.id} data-node-id={review.node}><img src={review.skinImage} alt={review.skinImageAlt} width="261" height="378" loading="lazy"/><div className="review-excerpt"><h3>{review.productName}</h3><p>{review.excerpt}</p><time dateTime={review.dateTime}>{review.date}</time></div></div>
  <div className="review-controls"><SliderControls index={slider.index} count={reviews.length} onSelect={slider.select} onPrevious={slider.previous} onNext={slider.next} label="리뷰"/><p className="slider-status" role="status">{slider.error || (slider.loading?'이미지 불러오는 중':'')}</p></div>
  <div className="review-visual" key={'image-'+review.id}><img src={review.productImage} alt={review.productImageAlt} width="1080" height="1080" loading="lazy" decoding="async"/></div>
 </section>
}
