import { assets } from './assets'
export const careCategories = [
 {id:'hydration', title:'HYDRATION CARE', shortTitle:'Hydration', node:'140:824', layout:'text-left',
 description:'메마른 피부에 마르지 않는 수분감을 선사합니다\n당신의 피부 갈증을 해소할 메디필의 수분 솔루션을 만나보세요',
 links:['Toner / Skin','Ampoule / Serum','Essence / Lotion','Moisture Cream','Eye Care','Mist','Toner Pad','Mask Sheet','Sleeping Pack']},
 {id:'elasticity', title:'ELASTICITY CARE', shortTitle:'Elasticity', node:'194:592', layout:'image-left',
 description:'무너진 피부 텐션을 끌어올려 탄탄한 윤곽을 완성합니다\n당신의 피부 고민에 맞는 탄력 솔루션을 선택해 보세요',
 links:['Toner / Skin','Ampoule / Serum','Lifting Pad','Lifting Cream','Eye & Neck Cream','Wrinkle Spot Care','Wrapping Pack','Lifting Mask','Anti-aging Sun Care']},
 {id:'soothing', title:'SOOTHING CARE', shortTitle:'Soothing', node:'140:909', layout:'text-left',
 description:'자극받고 예민해진 피부에 편안한 휴식을 선사합니다\n내 피부에 순한 진정 솔루션을 찾아보세요',
 links:['Soothing Skin','Ampoule / Serum','Cooling Pad','Barrier Cream','Trouble Spot Care','Mild Cleanser','Wash-off Pack','Soothing Mask Sheet','Mild Sun Care']},
].map(item => ({...item, image:assets[item.node + '/imgImage'], imageAlt:item.title + ' 제품과 자연 이미지', links:item.links.map(label=>({label,href:null}))}))
