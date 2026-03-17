import type { DiaryEntry } from '../types/diary';

export function isMeaningfulEntry(entry: DiaryEntry): boolean {
  return entry.text.trim().length > 0 || entry.emotion !== 'neutral';
}

export function syncEntry(
  entries: DiaryEntry[],
  nextEntry: DiaryEntry,
): DiaryEntry[] {
  const withoutTarget = entries.filter((entry) => entry.id !== nextEntry.id);

  if (!isMeaningfulEntry(nextEntry)) {
    return withoutTarget.sort((left, right) => right.date - left.date);
  }

  return [nextEntry, ...withoutTarget].sort(
    (left, right) => right.date - left.date,
  );
}

export function createPreview(text: string, maxLength = 84): string {
  const normalized = text.replace(/\s+/g, ' ').trim();

  if (normalized.length === 0) {
    return '아직 기록된 문장이 없습니다.';
  }

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength).trimEnd()}...`;
}
