import { EmotionIcon } from './EmotionIcon';
import { formatDiaryDate } from '../lib/date';
import { EMOTION_META } from '../lib/emotions';
import type { DiaryEntry } from '../types/diary';

interface DiaryViewerProps {
  entry: DiaryEntry | null;
}

export function DiaryViewer({ entry }: DiaryViewerProps) {
  return (
    <section className="panel viewer-panel">
      <div className="panel-header">
        <div>
          <p className="section-kicker">Detail</p>
          <h2 className="section-title">선택한 일기</h2>
        </div>
      </div>

      {entry === null ? (
        <div className="viewer-empty">
          <p>아직 선택된 과거 기록이 없습니다.</p>
          <p>오른쪽 목록에서 기록을 선택하면 전체 내용을 읽을 수 있습니다.</p>
        </div>
      ) : (
        <article className="viewer-entry" aria-label="선택한 일기 상세">
          <div className="viewer-meta">
            <span
              className="viewer-emotion"
              style={{ color: EMOTION_META[entry.emotion].text }}
            >
              <EmotionIcon emotion={entry.emotion} size={18} />
              {EMOTION_META[entry.emotion].label}
            </span>
            <time className="viewer-date" dateTime={entry.id}>
              {formatDiaryDate(entry.date)}
            </time>
          </div>
          <p className="viewer-content">{entry.text}</p>
        </article>
      )}
    </section>
  );
}
