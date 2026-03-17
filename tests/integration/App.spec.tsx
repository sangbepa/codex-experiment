import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from '../../src/App';
import { STORAGE_KEY } from '../../src/lib/storage';

describe('App', () => {
  it('saves today diary automatically after debounce', async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(screen.getByRole('radio', { name: '행복' }));
    await user.type(
      screen.getByLabelText('오늘의 생각'),
      '하루가 길었지만, 마지막에는 마음이 조금 가벼워졌다.',
    );

    await waitFor(() => {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      expect(saved).not.toBeNull();

      const parsed = JSON.parse(saved as string);
      expect(parsed).toHaveLength(1);
      expect(parsed[0]).toMatchObject({
        emotion: 'happy',
        text: '하루가 길었지만, 마지막에는 마음이 조금 가벼워졌다.',
      });
    });
  });

  it('shows the selected diary details from history', async () => {
    const user = userEvent.setup();

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        {
          id: '2026-03-15',
          date: new Date('2026-03-15T21:30:00').getTime(),
          emotion: 'calm',
          text: '조용한 밤에 창문을 열어두고 한참을 숨 고르듯 쉬었다.',
        },
        {
          id: '2026-03-14',
          date: new Date('2026-03-14T20:10:00').getTime(),
          emotion: 'sad',
          text: '오늘은 유난히 말보다 침묵이 편안하게 느껴졌고, 늦은 밤까지 창가에 기대어 아무 말 없이 오래 머물렀다.',
        },
      ]),
    );

    render(<App />);

    await user.click(
      screen.getByRole('button', { name: /2026-03-14 슬픔 기록 보기/ }),
    );

    const viewer = screen.getByRole('article', { name: '선택한 일기 상세' });

    expect(
      within(viewer).getByText(
        '오늘은 유난히 말보다 침묵이 편안하게 느껴졌고, 늦은 밤까지 창가에 기대어 아무 말 없이 오래 머물렀다.',
      ),
    ).toBeInTheDocument();
  });
});
