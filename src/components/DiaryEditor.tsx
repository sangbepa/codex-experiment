import { formatDiaryId, formatSavedAt } from '../lib/date';
import { isMeaningfulEntry } from '../lib/diary';
import { EmotionPicker } from './EmotionPicker';
import type { DiaryEntry, Emotion } from '../types/diary';

type SaveState = 'idle' | 'saving' | 'saved';

interface DiaryEditorProps {
  entry: DiaryEntry;
  saveState: SaveState;
  lastSavedAt: number | null;
  onEmotionChange: (emotion: Emotion) => void;
  onTextChange: (text: string) => void;
}

function getStatusMessage(
  saveState: SaveState,
  lastSavedAt: number | null,
  hasContent: boolean,
) {
  if (saveState === 'saving') {
    return '기록을 저장하는 중';
  }

  if (!hasContent) {
    return '오늘의 첫 문장을 기다리고 있습니다';
  }

  if (lastSavedAt !== null) {
    return `자동 저장됨 · ${formatSavedAt(lastSavedAt)}`;
  }

  return '자동 저장 준비 완료';
}

export function DiaryEditor({
  entry,
  saveState,
  lastSavedAt,
  onEmotionChange,
  onTextChange,
}: DiaryEditorProps) {
  const hasContent = isMeaningfulEntry(entry);
  const statusMessage = getStatusMessage(saveState, lastSavedAt, hasContent);

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="section-kicker">Today</p>
          <h2 className="section-title">오늘의 감정과 생각</h2>
        </div>
        <span className="status-pill">{statusMessage}</span>
      </div>

      <p className="diary-date">{formatDiaryId(entry.id)}</p>

      <EmotionPicker value={entry.emotion} onChange={onEmotionChange} />

      <label className="editor-label" htmlFor="diary-text">
        오늘의 생각
      </label>
      <textarea
        id="diary-text"
        className="diary-textarea"
        value={entry.text}
        onChange={(event) => onTextChange(event.target.value)}
        placeholder="오늘 하루를 지나며 가장 오래 남은 감정과 생각을 적어보세요."
      />
      <p className="editor-hint">
        별도의 저장 버튼 없이 입력 내용이 자동으로 저장됩니다.
      </p>
    </section>
  );
}
