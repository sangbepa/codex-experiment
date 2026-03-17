import { createPreview } from '../lib/diary';
import { formatDiaryDate } from '../lib/date';
import { EMOTION_META } from '../lib/emotions';
import { EmotionIcon } from './EmotionIcon';
import type { DiaryEntry } from '../types/diary';

interface HistoryListProps {
  entries: DiaryEntry[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function HistoryList({
  entries,
  selectedId,
  onSelect,
}: HistoryListProps) {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="section-kicker">History</p>
          <h2 className="section-title">기록된 날들</h2>
        </div>
        <span className="history-count">{entries.length}개의 기록</span>
      </div>

      {entries.length === 0 ? (
        <div className="history-empty">
          <p>아직 지난 기록이 없습니다.</p>
          <p>오늘의 첫 일기를 남기면 내일부터 이곳에 쌓이기 시작합니다.</p>
        </div>
      ) : (
        <ul className="history-list">
          {entries.map((entry) => {
            const meta = EMOTION_META[entry.emotion];
            const selected = selectedId === entry.id;

            return (
              <li key={entry.id}>
                <button
                  type="button"
                  className="history-item"
                  data-selected={selected}
                  aria-label={`${entry.id} ${meta.label} 기록 보기`}
                  onClick={() => onSelect(entry.id)}
                >
                  <div className="history-item-header">
                    <time dateTime={entry.id} className="history-date">
                      {formatDiaryDate(entry.date)}
                    </time>
                    <span
                      className="history-emotion"
                      style={{ color: meta.text }}
                    >
                      <EmotionIcon emotion={entry.emotion} size={18} />
                    </span>
                  </div>
                  <p className="history-preview">{createPreview(entry.text)}</p>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
