import { assets } from './assets'
const rows = [
 ['140:703', 'melanon-x', ['멜라논엑스', '바운스 샷 앰플 RX'], '기미와 탄력을 동시에 잡는 고기능성 앰플\n교체형 리필 구조로 지속 가능성을 더하다'],
 ['140:724', 'retinal-eye', ['레티날 NMN', '바운스 샷 아이 크림'], '레티날과 NMN의 강력한 안티에이징 시너지\n눈가 주름을 채우는 친환경 리필형 아이크림'],
 ['140:744', 'retinal-booster', ['레티날 NMN', '바운스 샷 부스터'], '다음 단계의 효과를 극대화하는 탄력 부스터\n촘촘한 피부 바탕을 완성하는 에어리스 세럼'],
 ['140:784', 'young-cica', ['영시카 PDRN', '앰플'], '어린 병풀 PDRN과 엑소좀 기술의 만남\n민감해진 피부 장벽을 급속 회복하는 진정 앰플'],
 ['140:764', 'lacto-sun', ['레드 락토 콜라겐 모이스처', '포어 리프팅 선크림'], '강력한 자외선 차단은 기본\n비건 콜라겐으로 열 노화와 모공까지 케어하는 리프팅 선크림'],
 ['140:804', 'phyto-lip', ['피토 이엑스 PDRN', '멜팅 글로우 립 마스크'], '식물성 PDRN 고보습 장벽 케어\n밤사이 거친 입술을 매끄러운 광채로 채우는 립 마스크.'],
]
export const newProducts = rows.map(([node, id, lines, description], index) => ({
 node, id, order:index + 1, name:lines.join(' '), lines, description,
 image:assets[node + '/imgImage'], imageAlt:lines.join(' ') + ' 제품 이미지', href:null,
}))
