import { screen } from '@testing-library/react';

import App from '@/App';
import { renderWithUser } from '@/tests';

describe('Change sign button', () => {
  describe('should change the sign of the entered number after a change sign button click', () => {
    it('positive to negative', async () => {
      const { user } = renderWithUser(<App />);
      await user.click(screen.getByRole('button', { name: '5' }));

      await user.click(
        screen.getByRole('button', { name: "change number's sign" }),
      );

      expect(
        screen.getByRole('alert', { name: /display/i }),
      ).toHaveDisplayValue('-5');
    });

    it('positive to negative', async () => {
      const { user } = renderWithUser(<App />);
      await user.click(screen.getByRole('button', { name: '1' }));

      await user.click(
        screen.getByRole('button', { name: "change number's sign" }),
      );
      await user.click(
        screen.getByRole('button', { name: "change number's sign" }),
      );

      expect(
        screen.getByRole('alert', { name: /display/i }),
      ).toHaveDisplayValue('1');
    });
  });
});
