# Vibe Diary

감정에 따라 화면 분위기가 바뀌는 미니멀 웹 일기장입니다. 서버 없이 브라우저 `localStorage`만 사용하며, 오늘의 감정과 짧은 문장을 빠르게 남기는 경험에 집중합니다.

## 소개

Vibe Diary는 복잡한 기능 대신 기록 자체에 집중하는 단일 페이지 앱입니다.

- 오늘의 감정을 5가지 테마 중 하나로 선택합니다.
- 입력 내용은 `300ms debounce` 뒤 자동 저장됩니다.
- 과거 기록 목록과 상세 보기를 제공합니다.
- 비어 있는 중립 초안은 저장하지 않습니다.

## 감정 테마

| Emotion   | Label | Background | Text      |
| --------- | ----- | ---------- | --------- |
| `happy`   | 행복  | `#FFFBEB`  | `#F59E0B` |
| `sad`     | 슬픔  | `#EFF6FF`  | `#3B82F6` |
| `calm`    | 평온  | `#F0FDF4`  | `#16A34A` |
| `angry`   | 분노  | `#FEF2F2`  | `#EF4444` |
| `neutral` | 보통  | `#F9FAFB`  | `#6B7280` |

모든 테마 변경은 부드러운 전환 애니메이션을 기준으로 동작합니다.

## 실행 방법

```bash
npm install
npm run dev
```

개발 서버가 실행되면 Vite가 출력한 로컬 주소로 접속하면 됩니다.

## 스크립트

- `npm run dev`: 개발 서버 실행
- `npm run build`: TypeScript 검사 후 프로덕션 번들 생성
- `npm run preview`: 빌드 결과 확인
- `npm run lint`: ESLint + Prettier 검사
- `npm run format`: Prettier 포맷 적용
- `npm run test`: Vitest 테스트 실행
- `npm run test:update`: 테스트 업데이트 실행

## 기술 스택

- React 19
- TypeScript
- Vite
- Vitest
- React Testing Library
- `react-feather` 아이콘

## 데이터 저장

- 저장 위치: 브라우저 `localStorage`
- 저장 키: `vibeDiaryData`
- 저장 형식:

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
- `neutral` + 빈 텍스트 조합은 저장 목록에서 제외됩니다.

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

- 자동 저장 후 `localStorage` 반영
- 과거 기록 선택 시 상세 내용 표시
- 저장/색상/일기 유틸리티 동작

```bash
npm run test
```
