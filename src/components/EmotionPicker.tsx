import { EMOTION_META, EMOTION_ORDER } from '../lib/emotions';
import { EmotionIcon } from './EmotionIcon';
import type { Emotion } from '../types/diary';

interface EmotionPickerProps {
  value: Emotion;
  onChange: (emotion: Emotion) => void;
}

export function EmotionPicker({ value, onChange }: EmotionPickerProps) {
  return (
    <div className="emotion-picker" role="radiogroup" aria-label="오늘의 감정">
      {EMOTION_ORDER.map((emotion) => {
        const selected = value === emotion;
        const meta = EMOTION_META[emotion];

        return (
          <button
            key={emotion}
            type="button"
            className="emotion-button"
            role="radio"
            aria-checked={selected}
            aria-label={meta.label}
            data-selected={selected}
            onClick={() => onChange(emotion)}
          >
            <span className="emotion-icon-shell" style={{ color: meta.text }}>
              <EmotionIcon emotion={emotion} />
            </span>
            <span className="emotion-label">{meta.label}</span>
          </button>
        );
      })}
    </div>
  );
}
