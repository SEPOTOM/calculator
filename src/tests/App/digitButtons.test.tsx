import { screen } from '@testing-library/react';

import App from '@/App';
import { renderWithUser } from '@/tests';

describe('Digit buttons', () => {
  describe('should display the corresponding digits on the display', () => {
    for (let i = 0; i < 10; i += 1) {
      it(`button ${i}`, async () => {
        const { user } = renderWithUser(<App />);

        await user.click(screen.getByRole('button', { name: String(i) }));

        expect(
          screen.getByRole('alert', { name: /display/i }),
        ).toHaveDisplayValue(String(i));
      });
    }
  });

  it('should allow the user to enter a sequence of digits with a max length of 8', async () => {
    const { user } = renderWithUser(<App />);

    for (let i = 9; i >= 0; i -= 1) {
      await user.click(screen.getByRole('button', { name: String(i) }));
    }

    expect(screen.getByRole('alert', { name: /display/i })).toHaveDisplayValue(
      '98765432',
    );
  });

  describe('should replace the single 0 with the corresponding digit', () => {
    for (let i = 0; i < 10; i += 1) {
      it(`button ${i}`, async () => {
        const { user } = renderWithUser(<App />);
        await user.click(screen.getByRole('button', { name: '0' }));

        await user.click(screen.getByRole('button', { name: String(i) }));

        expect(
          screen.getByRole('alert', { name: /display/i }),
        ).toHaveDisplayValue(String(i));
      });
    }
  });
});
