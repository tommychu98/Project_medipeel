import { useContext } from 'react'
import { LinkNoticeContext } from './linkNoticeContext'
export default function LinkAction({href,children,className='',label,onClick,...props}) {
 const notify=useContext(LinkNoticeContext)
 if(href)return <a href={href} className={className} onClick={onClick} {...props}>{children}</a>
 return <button type="button" className={className} onClick={()=>{onClick?.();notify(label || (typeof children==='string'?children:'서비스'))}} {...props}>{children}</button>
}
