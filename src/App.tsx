import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { BookOpen, Clock } from 'react-feather';
import { DiaryEditor } from './components/DiaryEditor';
import { DiaryViewer } from './components/DiaryViewer';
import { HistoryList } from './components/HistoryList';
import { hexToRgba } from './lib/color';
import { getDateId } from './lib/date';
import { isMeaningfulEntry, syncEntry } from './lib/diary';
import { EMOTION_META } from './lib/emotions';
import { loadEntries, persistEntries } from './lib/storage';
import type { DiaryEntry, Emotion } from './types/diary';

type SaveState = 'idle' | 'saving' | 'saved';

interface InitialState {
  entries: DiaryEntry[];
  draft: DiaryEntry;
  selectedHistoryId: string | null;
}

function getInitialState(): InitialState {
  const entries = loadEntries();
  const todayId = getDateId();
  const storedDraft = entries.find((entry) => entry.id === todayId);

  return {
    entries,
    draft: storedDraft ?? {
      id: todayId,
      date: Date.now(),
      emotion: 'neutral',
      text: '',
    },
    selectedHistoryId:
      entries.find((entry) => entry.id !== todayId)?.id ?? null,
  };
}

export default function App() {
  const [initialState] = useState(getInitialState);
  const [entries, setEntries] = useState<DiaryEntry[]>(initialState.entries);
  const [draft, setDraft] = useState<DiaryEntry>(initialState.draft);
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(
    initialState.selectedHistoryId,
  );
  const [saveState, setSaveState] = useState<SaveState>(
    isMeaningfulEntry(initialState.draft) ? 'saved' : 'idle',
  );
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(
    isMeaningfulEntry(initialState.draft) ? initialState.draft.date : null,
  );
  const isHydrated = useRef(false);
  const todayId = draft.id;

  useEffect(() => {
    if (!isHydrated.current) {
      isHydrated.current = true;
      return;
    }

    setSaveState('saving');

    const timeoutId = window.setTimeout(() => {
      setEntries((currentEntries) => {
        const nextEntries = syncEntry(currentEntries, draft);
        persistEntries(nextEntries);
        return nextEntries;
      });
      setLastSavedAt(isMeaningfulEntry(draft) ? draft.date : null);
      setSaveState(isMeaningfulEntry(draft) ? 'saved' : 'idle');
    }, 300);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [draft]);

  useEffect(() => {
    const historyEntries = entries.filter((entry) => entry.id !== todayId);

    if (historyEntries.length === 0) {
      if (selectedHistoryId !== null) {
        setSelectedHistoryId(null);
      }
      return;
    }

    if (
      selectedHistoryId === null ||
      !historyEntries.some((entry) => entry.id === selectedHistoryId)
    ) {
      setSelectedHistoryId(historyEntries[0].id);
    }
  }, [entries, selectedHistoryId, todayId]);

  const historyEntries = entries.filter((entry) => entry.id !== todayId);
  const selectedEntry =
    historyEntries.find((entry) => entry.id === selectedHistoryId) ?? null;
  const theme = EMOTION_META[draft.emotion];

  const appStyle = {
    '--background': theme.background,
    '--accent': theme.text,
    '--accent-soft': hexToRgba(theme.text, 0.12),
    '--accent-border': hexToRgba(theme.text, 0.2),
    '--surface': 'rgba(255, 255, 255, 0.74)',
    '--surface-strong': 'rgba(255, 255, 255, 0.92)',
    '--text-main': '#111827',
    '--text-muted': '#4B5563',
    '--shadow-color': hexToRgba(theme.text, 0.16),
  } as CSSProperties;

  const handleEmotionChange = (emotion: Emotion) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      emotion,
      date: Date.now(),
    }));
  };

  const handleTextChange = (text: string) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      text,
      date: Date.now(),
    }));
  };

  return (
    <div className="app-shell" style={appStyle}>
      <main className="app-layout">
        <header className="hero">
          <p className="hero-kicker">Vibe Diary</p>
          <h1 className="hero-title">
            하루의 끝, 오직 당신의 감정과 생각에만 집중하는 공간.
          </h1>
          <p className="hero-copy">
            복잡한 기능과 불필요한 장식을 걷어내고, 오늘의 감정과 짧은 문장을
            남기는 경험만 남겼습니다.
          </p>
          <div className="hero-meta" aria-label="주요 특징">
            <span>
              <Clock size={16} />
              300ms 자동 저장
            </span>
            <span>
              <BookOpen size={16} />
              과거 기록 다시 읽기
            </span>
          </div>
        </header>

        <section className="content-grid">
          <DiaryEditor
            entry={draft}
            saveState={saveState}
            lastSavedAt={lastSavedAt}
            onEmotionChange={handleEmotionChange}
            onTextChange={handleTextChange}
          />

          <div className="history-column">
            <HistoryList
              entries={historyEntries}
              selectedId={selectedHistoryId}
              onSelect={setSelectedHistoryId}
            />
            <DiaryViewer entry={selectedEntry} />
          </div>
        </section>
      </main>
    </div>
  );
}
