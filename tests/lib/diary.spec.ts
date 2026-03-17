import { describe, expect, it } from 'vitest';
import {
  createPreview,
  isMeaningfulEntry,
  syncEntry,
} from '../../src/lib/diary';

describe('diary utils', () => {
  it('treats emotion-only entries as meaningful', () => {
    expect(
      isMeaningfulEntry({
        id: '2026-03-17',
        date: 1,
        emotion: 'happy',
        text: '   ',
      }),
    ).toBe(true);
  });

  it('returns an empty-state preview for blank text', () => {
    expect(createPreview('   ')).toBe('아직 기록된 문장이 없습니다.');
  });

  it('truncates long text previews', () => {
    expect(
      createPreview('하루가 천천히 저물고 작은 감정들이 오래 남았다.', 12),
    ).toBe('하루가 천천히 저물고...');
  });

  it('keeps the newest meaningful entry at the top', () => {
    expect(
      syncEntry(
        [
          {
            id: '2026-03-16',
            date: 100,
            emotion: 'sad',
            text: 'older',
          },
        ],
        {
          id: '2026-03-17',
          date: 300,
          emotion: 'calm',
          text: 'newer',
        },
      ),
    ).toEqual([
      {
        id: '2026-03-17',
        date: 300,
        emotion: 'calm',
        text: 'newer',
      },
      {
        id: '2026-03-16',
        date: 100,
        emotion: 'sad',
        text: 'older',
      },
    ]);
  });
});
