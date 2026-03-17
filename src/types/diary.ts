export type Emotion = 'happy' | 'sad' | 'calm' | 'angry' | 'neutral';

export interface DiaryEntry {
  id: string;
  date: number;
  emotion: Emotion;
  text: string;
}
