import LinkAction from './LinkAction'
import { assets } from '../../data/assets'
export default function CareLinkGrid({category}) {
 return <div className="care-link-grid">{category.links.map(link=><LinkAction key={link.label} href={link.href} label={category.shortTitle+' · '+link.label}><span>{link.label.replace(' / ','\n')}</span><img src={assets[category.node+'/imgArrow11']} alt="" width="12.5" height="7.36396" aria-hidden="true"/></LinkAction>)}</div>
}
