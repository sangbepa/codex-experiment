import type { Emotion } from '../types/diary';

interface EmotionMeta {
  label: string;
  background: string;
  text: string;
}

export const EMOTION_ORDER: Emotion[] = [
  'happy',
  'sad',
  'calm',
  'angry',
  'neutral',
];

export const EMOTION_META: Record<Emotion, EmotionMeta> = {
  happy: {
    label: '행복',
    background: '#FFFBEB',
    text: '#F59E0B',
  },
  sad: {
    label: '슬픔',
    background: '#EFF6FF',
    text: '#3B82F6',
  },
  calm: {
    label: '평온',
    background: '#F0FDF4',
    text: '#16A34A',
  },
  angry: {
    label: '분노',
    background: '#FEF2F2',
    text: '#EF4444',
  },
  neutral: {
    label: '보통',
    background: '#F9FAFB',
    text: '#6B7280',
  },
};

export function isEmotion(value: unknown): value is Emotion {
  return typeof value === 'string' && EMOTION_ORDER.includes(value as Emotion);
}
