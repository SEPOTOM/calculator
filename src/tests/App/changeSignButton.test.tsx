import { screen } from '@testing-library/react';

import App from '@/App';
import { expectDisplayValueToBe, renderWithUser } from '@/tests';

describe('Change sign button', () => {
  describe('should change the sign of the entered number', () => {
    for (let i = 0; i < 10; i += 1) {
      it(`button ${i} to negative`, async () => {
        const { user } = renderWithUser(<App />);
        await user.click(screen.getByRole('button', { name: String(i) }));

        await user.click(
          screen.getByRole('button', { name: "change number's sign" }),
        );

        expectDisplayValueToBe(`-${String(i)}`);
      });
    }

    for (let i = 0; i < 10; i += 1) {
      it(`button ${i} to positive`, async () => {
        const { user } = renderWithUser(<App />);
        await user.click(screen.getByRole('button', { name: String(i) }));

        await user.click(
          screen.getByRole('button', { name: "change number's sign" }),
        );
        await user.click(
          screen.getByRole('button', { name: "change number's sign" }),
        );

        expectDisplayValueToBe(String(i));
      });
    }
  });
});
