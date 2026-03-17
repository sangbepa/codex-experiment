# Vibe Diary

감정에 따라 화면 분위기가 바뀌는 미니멀 웹 일기장입니다. 서버 없이 브라우저 `localStorage`만 사용하며, 오늘의 감정과 짧은 문장을 빠르게 남기는 경험에 집중합니다.

## 핵심 기능

- `happy`, `sad`, `calm`, `angry`, `neutral` 5가지 감정 선택
- 감정 선택에 따라 앱 전체 배경색과 포인트 색상 전환
- 오늘의 기록 자동 저장
  입력 후 `300ms debounce` 뒤 저장되며 별도 저장 버튼은 없습니다.
- 과거 기록 목록과 상세 보기 제공
- 의미 없는 초안은 저장하지 않음
  `neutral` 상태이면서 텍스트가 비어 있으면 저장 목록에서 제외됩니다.

## 감정 테마

| Emotion   | Label | Background | Text      |
| --------- | ----- | ---------- | --------- |
| `happy`   | 행복  | `#FFFBEB`  | `#F59E0B` |
| `sad`     | 슬픔  | `#EFF6FF`  | `#3B82F6` |
| `calm`    | 평온  | `#F0FDF4`  | `#16A34A` |
| `angry`   | 분노  | `#FEF2F2`  | `#EF4444` |
| `neutral` | 보통  | `#F9FAFB`  | `#6B7280` |

모든 테마 변경은 부드러운 전환 애니메이션을 기준으로 동작합니다.

## 기술 스택

- React 19
- TypeScript
- Vite
- Vitest
- React Testing Library
- `react-feather` 아이콘

## 빠른 시작

```bash
npm install
npm run dev
```

개발 서버가 실행되면 브라우저에서 Vite가 안내하는 로컬 주소로 접속하면 됩니다.

## 사용 가능한 스크립트

- `npm run dev`: 개발 서버 실행
- `npm run build`: TypeScript 검사 후 프로덕션 번들 생성
- `npm run preview`: 빌드 결과 미리보기
- `npm run lint`: ESLint + Prettier 검사
- `npm run format`: Prettier 포맷 적용
- `npm run test`: Vitest 테스트 실행
- `npm run test:update`: 테스트 스냅샷/업데이트 실행

## 데이터 저장 방식

- 저장 위치: 브라우저 `localStorage`
- 저장 키: `vibeDiaryData`
- 데이터 형태:

```ts
{
  id: "YYYY-MM-DD",
  date: number,
  emotion: "happy" | "sad" | "calm" | "angry" | "neutral",
  text: string
}
```

- `id`는 날짜 단위 식별자입니다.
- `date`는 마지막 수정 시각의 타임스탬프입니다.
- 저장된 목록은 최신 수정 순으로 정렬됩니다.

## 디렉토리 구조

```text
src/
  components/   UI 컴포넌트
  lib/          저장, 날짜, 감정, 텍스트 처리 유틸리티
  types/        공용 타입
tests/
  integration/  앱 통합 테스트
  lib/          유틸리티 단위 테스트
public/assets/  정적 자산
docs/           보조 문서
```

## 테스트

현재 테스트는 다음 동작을 검증합니다.

- 자동 저장 후 `localStorage` 반영
- 과거 기록 선택 시 상세 내용 표시
- 저장/색상/일기 유틸리티 동작

실행 예시:

```bash
npm run test
```
