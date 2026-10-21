# MEDIPEEL 리뉴얼 — 최종 프로젝트 가이드

상태: 최종 구현 기준 / 작성일: 2026-10-21

## 1. 목적과 기준

React로 메디필의 반응형 브랜드 홈을 구현한다. 최종 피그마의 제품·자연·더마 기술·리뷰 흐름을 보존하고, 기존에 제작한 11초 히어로 영상을 실제 재생한다.

- 유일한 화면 기준: https://www.figma.com/design/Un6ZzIgRvZa2dpbDpRSJLp/?node-id=140-669
- 기준 섹션: `140:669`. 스타일 상세는 같은 폴더의 `design.md`를 따른다.
- 이전 `113:18754` 와이어프레임 기반 project.md 전체를 폐기한다. 오래된 문서와 이 문서를 혼합하지 않는다.
- 이 문서는 구현 계획이다. 현재 사용자의 React 소스나 설치된 패키지를 점검한 결과가 아니다.
- 정적 화면에서 확인되지 않는 모션·모바일 동작은 문서에 기재한 제안을 시작점으로 삼고 실제 프로토타입이 제공되면 맞춘다.

## 2. 구현 범위

### 홈에서 구현할 것

Header / Hero / New Products / Care / Personal Curation / Natural Beauty / Brand Film / Core Technology / Statement / Real Review / Talk to MEDI-PEEL / Footer.

반응형, 영상 재생·정지, 제품 6종 전환, 케어 3개 패널, 브랜드 3단계 장면, 리뷰 3개 전환, 모바일 메뉴와 CTA 목적지 연결을 포함한다.

### 목적지·데이터가 필요한 기능

계정, 장바구니, 실제 상품 상세, 결제, 피부 큐레이션 결과, FAQ 상세, 문의 제출, 회원 혜택 페이지는 요구사항과 목적지 확인 후 연결한다. 홈의 버튼이 있다는 이유로 임의의 진단 알고리즘·주문 시스템을 만들지 않는다. 목적지가 없으면 빈 href나 가짜 성공 메시지 대신 미연결 상태를 작업 목록에 기록한다.

## 3. 기술과 실행

- 제안: React + Vite, JavaScript / JSX / CSS.
- 전역 토큰과 컴포넌트 CSS 또는 CSS Modules로 스타일 방식을 통일한다.
- CSS 모션을 기본으로 하고 Care·Brand Film의 스크롤 전환에 필요한 경우 GSAP / ScrollTrigger를 사용한다.
- 기존 package.json과 구조를 먼저 확인한다. 같은 용도의 패키지 중복 설치, 필요 없는 전체 재생성을 피한다.
- 홈만 구현하면 라우터는 필수가 아니다. 실제 하위 페이지가 생길 때 추가한다.

새 프로젝트 생성:

```bash
npm create vite@latest medipeel -- --template react
cd medipeel
npm install
npm run dev
```

이미 프로젝트가 있으면 package.json이 있는 폴더에서 `npm install`, `npm run dev`를 실행한다. 빈 현재 폴더에 생성할 때는 `npm create vite@latest . -- --template react`를 사용한다.

## 4. 권장 파일 구조

```text
medipeel/
├── design.md
├── project.md
├── public/
│   ├── videos/medipeel-hero.mp4
│   ├── images/hero-poster.webp
│   └── fonts/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── SiteHeader.jsx
│   │   │   └── SiteFooter.jsx
│   │   ├── sections/
│   │   │   ├── HeroSection.jsx
│   │   │   ├── NewProductsSection.jsx
│   │   │   ├── CareSection.jsx
│   │   │   ├── PersonalCurationSection.jsx
│   │   │   ├── NaturalBeautySection.jsx
│   │   │   ├── BrandFilmSection.jsx
│   │   │   ├── CoreTechnologySection.jsx
│   │   │   ├── StatementMarquee.jsx
│   │   │   ├── RealReviewSection.jsx
│   │   │   └── TalkSection.jsx
│   │   └── ui/
│   │       ├── ViewMoreButton.jsx
│   │       ├── SliderControls.jsx
│   │       ├── CareLinkGrid.jsx
│   │       └── TechnologyItem.jsx
│   ├── pages/HomePage.jsx
│   ├── data/
│   │   ├── navigation.js
│   │   ├── newProducts.js
│   │   ├── careCategories.js
│   │   ├── technologies.js
│   │   ├── reviews.js
│   │   └── contactLinks.js
│   ├── hooks/useReducedMotion.js
│   ├── styles/tokens.css
│   ├── styles/global.css
│   ├── assets/
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

App.jsx는 페이지·공통 레이아웃 연결을 담당한다. HomePage.jsx가 섹션을 순서대로 조합한다. 본문·상태·모션을 App.jsx 한 파일에 몰아넣지 않는다. 현재 프로젝트의 관례가 있으면 이에 맞춘다.

## 5. 섹션과 구현 계약

| 순서 | 컴포넌트 | 최종 노드 | 기능·상태 |
| --- | --- | --- | --- |
| 1 | SiteHeader / HeroSection | `140:673` / `140:670` | 메뉴, 영상, 재생·정지 |
| 2 | NewProductsSection | `140:703` 외 5개 | 단일 슬라이더, activeProductIndex |
| 3 | CareSection | `140:824`, `194:592`, `140:909` | 수분·탄력·진정, panelProgress 또는 activeCareId |
| 4 | PersonalCurationSection | `140:954` | 원형 장식 타이포, 큐레이션 CTA |
| 5 | NaturalBeautySection | `190:188` | SKIN DERMA, 자연 이미지·브랜드 설명 |
| 6 | BrandFilmSection | `194:450` | 3개 장면, sceneProgress |
| 7 | CoreTechnologySection | `140:1111` | 비대칭 이미지 7개·캡션 |
| 8 | StatementMarquee | `140:963` | 산세리프 문구·하단 검정 띠 |
| 9 | RealReviewSection | `140:967`, `194:451`, `194:504` | 분할 리뷰 슬라이더, activeReviewIndex |
| 10 | TalkSection | `194:639` | Q&A / CONTACT US / MEMBERSHIP |
| 11 | SiteFooter | `140:1085` | 검정 배경·로고·회사 정보 |

피그마 페이지에 나열된 6개 신제품·3개 리뷰 상태를 독립 세로 섹션으로 모두 쌓지 않는다. Care는 세 개 패널의 전환 구성이며, Brand Film의 5760px 프레임은 1920px 장면 3개를 포함한다. 피그마에서 Talk가 리뷰에 중첩되어 있어도 웹에서는 독립 섹션으로 구성한다.

## 6. 데이터 구성

### 신제품 순서

| 순서 | 제품 | 노드 |
| --- | --- | --- |
| 01 | 멜라논엑스 바운스 샷 앰플 RX | `140:703` |
| 02 | 레티날 NMN 바운스 샷 아이 크림 | `140:724` |
| 03 | 레티날 NMN 바운스 샷 부스터 | `140:744` |
| 04 | 영시카 PDRN 앰플 | `140:784` |
| 05 | 레드 락토 콜라겐 모이스처 포어 리프팅 선크림 | `140:764` |
| 06 | 피토 이엑스 PDRN 멜팅 글로우 립 마스크 | `140:804` |

제품 모델: id, order, name, description, image, imageAlt, href. 진행 숫자와 이미지·카피는 하나의 인덱스에서 계산한다.

### 케어

카테고리 모델: id, title, description, image, imageAlt, layout, links. layout은 수분·진정 `text-left`, 탄력 `image-left`로 명시한다.

- Hydration: Toner/Skin, Ampoule/Serum, Essence/Lotion, Moisture Cream, Eye Care, Mist, Toner Pad, Mask Sheet, Sleeping Pack.
- Elasticity: Toner/Skin, Ampoule/Serum, Lifting Pad, Lifting Cream, Eye & Neck Cream, Wrinkle Spot Care, Wrapping Pack, Lifting Mask, Anti-aging Sun Care.
- Soothing: Soothing Skin, Ampoule/Serum, Cooling Pad, Barrier Cream, Trouble Spot Care, Mild Cleanser, Wash-off Pack, Soothing Mask Sheet, Mild Sun Care.

### 기술·리뷰·문의

- 기술: id, title, description, image, imageAlt, layoutSlot. 7개 기술 자산과 최종 비대칭 비율을 유지한다.
- 리뷰: id, productName, skinImage, skinImageAlt, productImage, productImageAlt, excerpt, date, href. 이전의 beforeImage/afterImage 모델은 사용하지 않는다.
- 문의: id, title, description, ctaLabel, href. 세 항목의 이미지 배경은 섹션 차원에서 관리한다.
- 효능·임상·리뷰는 제공된 최종 콘텐츠를 옮기되, 검증된 실사용 자료인지 여부는 별개로 관리한다. 임의의 수치나 추가 효능을 생성하지 않는다.

## 7. 모션·상호작용 제안

최종 정적 화면으로 확인되지 않는 시간·트리거는 아래를 시작점으로 사용한다.

- New Product: 이전·다음·직접 선택, 터치 스와이프. 자동 전환을 추가하면 정지 기능과 포커스·호버 시 정지를 함께 구현한다.
- Care: 데스크톱에서 섹션 내부의 세로 스크롤 진행을 3개 가로 패널 이동으로 연결할 수 있다. 모바일에서는 탭·스와이프 또는 일반 세로 흐름으로 전환한다.
- Personal Curation: 원형 장식만 느리게 회전하고 내부 제목·설명·CTA는 고정한다. 링을 통째로 스크린샷으로 넣어 본문까지 회전시키지 않는다.
- Natural Beauty: 장식 글자·이미지에 작은 진입 이동만 적용한다. 긴 본문은 읽는 동안 과도하게 이동하지 않는다.
- Brand Film: `194:391` → `140:1093` → `194:375`. 검정 배경에서 작은 이미지가 넓어지고 제목·최종 설명이 나타나는 진행을 하나의 섹션으로 구현한다. 단순 정적 3열 이미지로 만들지 않는다.
- Core: 개별 진입·작은 시차를 사용하되 정적 비대칭 구성부터 일치시킨다.
- Statement: 연속 흐름을 적용하면 복제 문구를 aria-hidden으로 숨기고 포커스·감소된 모션에서 정지한다.
- Review: 왼쪽 리뷰와 오른쪽 대형 이미지가 동시에 전환된다. 일반 작은 카드 캐러셀로 바꾸지 않는다.
- GSAP 사용 시 컴포넌트 범위에서 트리거를 생성하고 화면 크기 전환·언마운트 시 정리한다. 전체 페이지 휠 이벤트를 가로채지 않는다.

## 8. 영상·자산

- 앞서 완성한 `medipeel-exact-loop-11s.mp4`를 `public/videos/medipeel-hero.mp4`로 넣는다. 문서만으로 영상이 프로젝트에 자동 포함되는 것은 아니다.
- 영상 사양: 11초, 1280×720, 24fps, H.264 Main, yuv420p, 무음. 기존 산출물은 첫·끝 프레임 픽셀 일치를 검증했다.
- autoPlay, muted, loop, playsInline, poster를 설정하고 브라우저 실제 반복 재생도 확인한다.
- 제목은 별도 HTML 두 줄로 표시한다. 영상에 자막을 중복 추가하지 않는다.
- 스크롤마다 currentTime을 변경하는 방식 대신 일반 영상 재생을 사용한다.
- 영상 위 제품·문구가 겹치는 정도와 모바일 cover 크롭을 최종 디자인과 대조한다.
- 최종 제품 6종 사진, 케어 3장, 자연 소개 이미지, 이끼·바위 이미지, 기술 7장, 리뷰 상태별 이미지, 문의 배경, 로고·아이콘을 확보한다.
- 피그마 전체 스크린샷을 사이트 배경 한 장으로 사용하지 않는다. 개별 이미지와 실제 HTML 텍스트를 사용한다.
- 피그마 임시 다운로드 URL은 자산 확보용이다. 실제 런타임 경로로 남기지 않는다.
- 로컬 자산은 파일명·원본 노드·비율·사용 컴포넌트가 대응되도록 관리한다.

## 9. 반응형·접근성

모바일 완성 시안은 해당 참조에서 확인되지 않았으므로 design.md의 모바일 제안을 적용한다.

- 1920 / 1440 / 1024 / 768 / 390 / 360px에서 확인한다.
- 모바일 메뉴는 열기·닫기, Escape, 포커스 복귀를 지원한다.
- 링크·버튼 용도를 구분하고 슬라이더 버튼은 이름과 현재 상태를 제공한다.
- 작은 본문은 모바일에서 확대하고 CTA 터치 영역을 충분히 확보한다.
- 장식 링·마키 복제·배경 그림자는 접근성 트리에서 제외한다.
- prefers-reduced-motion에서는 회전·시차·고정을 줄이고 모든 콘텐츠를 순서대로 제공한다.
- 이미지 크기와 비율을 미리 확보하고 하단 이미지는 지연 로딩한다.
- 자동재생 거부 시 정지 포스터와 재생 수단을 제공한다.

## 10. 작업 순서

1. project.md와 design.md를 읽고 기존 소스·package.json·자산을 확인한다.
2. 공통 토큰·폰트·헤더·푸터와 HomePage 구조를 만든다.
3. 최종 섹션을 순서대로 정적 구현하고 노드별 실제 사진·카피를 연결한다.
4. 신제품·리뷰를 데이터 기반 단일 슬라이더로 완성한다.
5. Care·브랜드 3단계·원형 큐레이션의 반응형 구조를 완성한다.
6. 모바일 레이아웃을 정리하고 모션을 추가한다.
7. 영상과 링크·컨트롤·접근성을 확인한다.
8. 빌드와 최종 디자인 대조를 완료한다.

## 11. 완료 기준

- npm run dev로 실행되고 npm run build가 성공한다.
- 이전 와이어프레임을 기준으로 한 메뉴·반높이 큐레이션·작은 리뷰 카드 목록이 남아 있지 않다.
- 최종의 섹션 순서와 6개 제품 / 3개 케어 / 3개 브랜드 상태 / 7개 기술 / 3개 리뷰가 구현돼 있다.
- 탄력 케어의 좌우 반전, 검정 브랜드 장면, 큰 회색 산세리프 문구, 문의 3열, 검정 푸터가 일치한다.
- 이미지 누락·잘못된 비율·텍스트 겹침·의도하지 않은 가로 넘침·콘솔 오류가 없다.
- 제품·리뷰 전환 시 카피와 사진이 일치한다.
- 11초 영상이 재생되고 실제 반복 지점과 모바일 크롭을 확인했다.
- 키보드와 감소된 모션 환경에서도 핵심 콘텐츠·기능을 사용할 수 있다.
- 미연결 목적지·미확정 콘텐츠는 남은 작업으로 명확히 보고한다.

## 12. Codex 시작 지시

> project.md와 design.md를 먼저 읽고 기존 소스와 package.json을 확인해 주세요. 이전 와이어프레임 기준은 폐기하고 피그마 140:669 완성본으로 메디필 홈을 구현해 주세요. 섹션별 컴포넌트를 만들고 최종 이미지·카피·색상·폰트·좌우 배치를 맞추세요. 제품 6종과 리뷰 3종은 각각 하나의 슬라이더로, Care는 탄력 패널의 좌우 반전을 포함한 3개 패널로, 브랜드 이미지는 3단계 장면으로 구현하세요. 원형 큐레이션·자연 소개·문의 영역을 빠뜨리지 마세요. 먼저 정적 화면과 반응형을 맞춘 뒤 모션을 연결하고, 빌드·영상 반복 재생·주요 화면 크기를 검증해 주세요.
