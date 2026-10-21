# MEDIPEEL

React + Vite로 구현한 메디필 브랜드 홈입니다. 기준 문서는 [project.md](project.md), [design.md](design.md)입니다.

## 실행

이 폴더(`Medipeel`)에서 실행합니다.

```powershell
npm install
npm run dev
```

## 검증

```powershell
npm run build
npm run lint
npm run check
npx playwright install chromium
npm run check:browser
npm run check:care-scroll
```

`check`는 jsdom 인터랙션 검사와 FFmpeg 영상 무결성 검사입니다. 최초 설치 환경에서 ffmpeg 실행 파일이 없으면 `node node_modules/ffmpeg-static/install.js`로 해당 패키지의 공식 설치 스크립트를 실행합니다.

## 구조

- `src/pages/HomePage.jsx`: 섹션 순서
- `src/components/layout`: 헤더·푸터
- `src/components/sections`: 10개 본문 섹션
- `src/components/ui`: CTA, 컨트롤, 안내 dialog
- `src/data`: 제품·케어·리뷰·기술·링크·자산 대응
- `src/hooks`: 슬라이더, 모션 감소, 스크롤·진입 효과
- `src/styles`: 전역 스타일, 폰트, 토큰
- `public/images`, `public/videos`, `public/fonts`: 로컬 원본 자산

`check:browser`는 개발 서버가 http://127.0.0.1:5173 에서 실행 중일 때 사용합니다. 실제 영상 반복·터치·슬라이더·6개 너비를 검사하고 `reference/browser`에 결과를 저장합니다.
`check:care-scroll`은 같은 개발 서버에서 케어 고정, 실제 휠 입력, 연속 마스크 진행, 정지 유지, 역방향 복원과 모바일 전환을 검사합니다.

구현한 효과, 실제 레퍼런스 관찰, 검증 결과와 미연결 목적지는 [IMPLEMENTATION.md](IMPLEMENTATION.md)에 기록했습니다.
