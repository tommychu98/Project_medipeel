import { assets } from './assets'
export const technologies = [
 ['delivery','DELIVERY SYSTEM','세포보다 미세한 입자로 피부 속 깊이 전달하는 나노 리포좀 흡수 기술','imgImage',403,514,1383,434,'140:1125'],
 ['bio','BIO-COMPLEX','피부 고민을 정밀 타겟팅하는 메디필 연구소의 독자 특허 배합 성분','imgImage1',399,400,672,679,'140:1130'],
 ['clinical','CLINICAL DATA','엄격한 인체 적용 시험과 숫자로 증명된 확실한 피부 개선 효과','imgImage2',472,342,1221,1283,'140:1135'],
 ['formula','FORMULA TECH','유효 성분의 유실 없이 피부에 신선하게 전하는 에스테틱 제형 과학','imgImage3',404,529,576,1487,'140:1140'],
 ['exosome','EXOSOME SCIENCE','식물 엑소좀 성분으로 무너진 피부 장벽을 깨우는 자생 테크놀로지','imgImage4',403,461,1383,1866,'140:1145'],
 ['thermo','THERMO-CONTROL','달아오른 피부 열감을 즉각 배출해 모공을 조이는 급속 쿨링 기술','imgImage6',403,446,641,2248,'140:1155'],
 ['lacto','LACTO-BIO TECH','유산균 발효물로 피부 생태계를 강화하는 마이크로바이옴 기술','imgImage5',534,348,1183,2694,'140:1150'],
].map(([id,title,description,asset,width,height,x,y,node])=>({id,title,description,image:assets['140:1111/'+asset],imageAlt:title+' 기술 이미지',width,height,x,y,node,layoutSlot:id}))
