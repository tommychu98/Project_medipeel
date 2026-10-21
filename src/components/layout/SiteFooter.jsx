import { assets } from '../../data/assets'
import LinkAction from '../ui/LinkAction'
export default function SiteFooter(){return <footer className="site-footer">
 <div className="footer-logo"><img className="footer-logo-base" src={assets['140:1085/imgImage']} alt="" width="232" height="100"/><img src={assets['140:1085/imgLogo']} alt="MEDIPEEL" width="232" height="100"/></div>
 <address><p>주식회사 스킨이데아 (SKINIDEA CO. ,LTD)</p><p>서울 강남구 언주로 726 두산빌딩 2층(논현동)</p><p>대표전화 : <a href="tel:1644-0465">1644-0465</a> <span> I Fax. 02-6491-5600 I E-Mail : skinidea@medipe el.com I 사업자등록번호 : 132-86-30770</span></p><p>통신판매업 신고 : 제 2024-서울강남-05026호 <LinkAction label="사업자정보확인">[사업자정보확인]</LinkAction></p></address>
 </footer>}
