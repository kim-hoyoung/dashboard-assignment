
## 1. 개발 환경

- Node.js: **20.19**
- 패키지 매니저: **npm**
- 프론트엔드 프레임워크: **React(19.2.0) + TypeScript(5.7.3)**
- 번들러/빌드 도구: **Vite**
- 스타일링: **Tailwind CSS(4.1.17)**
- 상태/데이터 관리
  - React Query (서버 상태 관리)
  - React Hooks + 컴포넌트 단위 상태
  - Zustand ( 상세페이지 모달 관리 )
- HTTP 통신: Axios
- 차트/시각화: **Chart.js(4.5.1)**
- 브라우저: 크롬 (142.0.7444.176)
---

## 2. 실행 방법

로컬에서 프로젝트를 실행하려면 아래 순서를 따릅니다.

```bash
# 0. 저장소를 클론해 주세요.
git clone https://github.com/kim-hoyoung/dashboard-assignment

# 1. 의존성 설치해 주세요
npm install

# 2. 환경변수를 설정해 주세요
API Base URL은 .env 파일로 관리하였습니다. 현재 git ignore로 인해 해당 파일을 추가해 주세요.
환경 변수는 const baseURL = import.meta.env.VITE_API_BASE_URL; 로 관리됩니다.
`VITE_API_BASE_URL=https://recruit.paysbypays.com/`
# 3. 개발 서버 실행
npm run dev
```

## 3.주요 기능 및 페이지 구성
3-1 대시보드 화면 (Dashboard)
- 전체 데이터 요약 카드 Key Performance Indicator(KPI) 표시
- 월별/일별 거래 변화 그래프
- 상위 매출 가맹점 Top 10 차트

3-2 가맹점 정보 페이지 (Merchants) </br>
`/merchants` 관련 API를 사용하여 가맹점 목록 및 정보 제공
가맹점 코드 검색 시 모달로 상세 정보 제공

3-3 거래 내역 리스트 페이지 (Payments) </br>
`/payments` 관련 API를 사용하여 거래 내역 리스트 렌더링

3-4 react-query 사용 및 axios instance 사용
- API body 구조를 interface로 명확히 정의하여 타입 일관성과 유지보수성에 집중했습니다.
- Axios Instance를 통해 공통 설정(Base URL, Header 등)을 관리하여 중복 코드 제거하였습니다.
- 각 API 엔드포인트는 React Query 기반의 커스텀 훅으로 구성하여 가독성과 재활용성을 강화했습니다.

## 4. 디자인 및 UI/UX 의도
본 프로젝트의 디자인은 다음과 같은 의도를 가지고 있습니다.

1. **PG 운영자 관점의 가독성 강화**
   - 당일 거래 지표와 주요 흐름을 즉시 이해할 수 있도록 상단에 KPI 차트를 배치하였습니다.
   - 하단에는 해당 데이터의 흐름을 한눈에 파악할 수 있는 그래프를 제공하였습니다.
2. **깔끔한 UI와 통일성 있는 컬러 시스템**
   - 거부감이 들지 않을만한 디자인과, 통일된 색상을 사용하여 사용자의 만족도를 높이고자 하였습니다.
3. **상태 식별성 강화**
   - 결제 상태 및 가맹점 상태(status)의 색상을 다르게 하여 운영자가 빠르게 상태를 파악할 수 있도록 하였습니다.
4. **디자인 출처**
   - 해당 디자인은 직접 개발했던 프로젝트의 디자인 경험을 참고하여 </br> 별도의 템플릿 및 라이브러리 사용 없이 피그마로 간단하게 제작 하였습니다.

