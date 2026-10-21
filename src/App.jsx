import SiteHeader from './components/layout/SiteHeader'
import SiteFooter from './components/layout/SiteFooter'
import HomePage from './pages/HomePage'
import LinkNoticeProvider from './components/ui/LinkNoticeProvider'

export default function App() {
  return <LinkNoticeProvider><div id="top"><a className="skip-link" href="#main-content">본문 바로가기</a><SiteHeader/><HomePage/><SiteFooter/></div></LinkNoticeProvider>
}