import LinkAction from './LinkAction'
export default function ViewMoreButton({href,label='VIEW MORE',context,arrow=true,className=''}) {
 return <LinkAction href={href} label={context || label} className={'view-more '+className}><span>{label}</span>{arrow && <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true" focusable="false"><path d="M3 10h14m-5-5 5 5-5 5"/></svg>}</LinkAction>
}
