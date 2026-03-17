import { describe, expect, it } from 'vitest';
import {
  loadEntries,
  persistEntries,
  STORAGE_KEY,
  upsertStoredEntry,
} from '../../src/lib/storage';
import { syncEntry } from '../../src/lib/diary';
import type { DiaryEntry } from '../../src/types/diary';

describe('storage', () => {
  it('returns an empty array when nothing is stored', () => {
    expect(loadEntries()).toEqual([]);
  });

  it('loads only valid diary entries in descending order', () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        {
          id: '2026-03-14',
          date: 100,
          emotion: 'sad',
          text: 'first',
        },
        {
          id: '2026-03-15',
          date: 200,
          emotion: 'happy',
          text: 'second',
        },
        {
          id: 'invalid',
          date: 'oops',
          emotion: 'none',
          text: 1,
        },
      ]),
    );

    expect(loadEntries()).toEqual([
      {
        id: '2026-03-15',
        date: 200,
        emotion: 'happy',
        text: 'second',
      },
      {
        id: '2026-03-14',
        date: 100,
        emotion: 'sad',
        text: 'first',
      },
    ]);
  });

  it('returns an empty array for malformed storage payloads', () => {
    window.localStorage.setItem(STORAGE_KEY, '{invalid json');

    expect(loadEntries()).toEqual([]);
  });

  it('returns an empty array when the storage payload is not an array', () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ id: '2026-03-15' }),
    );

    expect(loadEntries()).toEqual([]);
  });

  it('removes empty neutral drafts when syncing entries', () => {
    const existingEntries: DiaryEntry[] = [
      {
        id: '2026-03-15',
        date: 200,
        emotion: 'happy',
        text: 'still here',
      },
    ];

    const syncedEntries = syncEntry(existingEntries, {
      id: '2026-03-17',
      date: 300,
      emotion: 'neutral',
      text: '   ',
    });

    persistEntries(syncedEntries);

    expect(window.localStorage.getItem(STORAGE_KEY)).toBe(
      JSON.stringify(existingEntries),
    );
  });

  it('upserts entries through the storage helper', () => {
    expect(
      upsertStoredEntry(
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
          date: 200,
          emotion: 'happy',
          text: 'newer',
        },
      ),
    ).toEqual([
      {
        id: '2026-03-17',
        date: 200,
        emotion: 'happy',
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
