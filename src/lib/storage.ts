import { syncEntry } from './diary';
import { isEmotion } from './emotions';
import type { DiaryEntry } from '../types/diary';

export const STORAGE_KEY = 'vibeDiaryData';

function isDiaryEntry(value: unknown): value is DiaryEntry {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.date === 'number' &&
    typeof candidate.text === 'string' &&
    isEmotion(candidate.emotion)
  );
}

export function loadEntries(): DiaryEntry[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const saved = window.localStorage.getItem(STORAGE_KEY);

  if (saved === null) {
    return [];
  }

  try {
    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter(isDiaryEntry)
      .sort((left, right) => right.date - left.date);
  } catch {
    return [];
  }
}

export function persistEntries(entries: DiaryEntry[]): void {
  if (typeof window === 'undefined') {
    return;
  }

  const sortedEntries = [...entries].sort(
    (left, right) => right.date - left.date,
  );
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sortedEntries));
}

export function upsertStoredEntry(
  entries: DiaryEntry[],
  nextEntry: DiaryEntry,
): DiaryEntry[] {
  return syncEntry(entries, nextEntry);
}
