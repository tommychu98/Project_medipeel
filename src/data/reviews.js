import { assets } from './assets'
export const reviews = [
 {id:'cica',node:'140:967',productName:'시카 쿨링 칼밍 패드 100ml',excerpt:'하루 종일 마스크를 쓰거나 야외 활동을 조금만 해도 피부가 쉽게 붉어지고 열감이 올라와서 속상했습니다. 열감 때문에...',date:'2026. 06. 24',dateTime:'2026-06-24'},
 {id:'lacto',node:'194:451',productName:'락토 모공 리프팅 패드 2X 100ml',excerpt:'이 패드는 피부에 밀착되자마자 늘어진 모공 주변을 쫀쫀하게 조여주면서 탄탄하게 리프팅해 주는 게 눈으로 보입니다. 유산균(락토) 성분이 2배나...',date:'2026. 06. 15',dateTime:'2026-06-15'},
 {id:'body',node:'194:504',productName:'비타민 알엑스 바디 워시 500ml',excerpt:'하루 종일 칙칙하고 건조한 날씨에 노출되거나 야외 활동을 조금만 해도 바디 피부가 쉽게 푸석해지고 생기를 잃어버려서...',date:'2026. 07. 01',dateTime:'2026-07-01'},
].map(item=>({...item,productImage:assets[item.node+'/imgFrame871'],skinImage:assets[item.node+'/imgFrame872'],productImageAlt:item.productName+' 제품 이미지',skinImageAlt:item.productName+' 사용 후기 피부 이미지',href:null}))
