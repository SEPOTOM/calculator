import { screen } from '@testing-library/react';

import App from '@/App';
import { getDisplay, renderWithUser } from '@/tests';

describe('Clear button', () => {
  it('should clear the display', async () => {
    const { user } = renderWithUser(<App />);
    await user.click(screen.getByRole('button', { name: '3' }));
    await user.click(screen.getByRole('button', { name: '1' }));

    await user.click(screen.getByRole('button', { name: 'clear' }));

    expect(getDisplay()).toHaveDisplayValue('');
  });

  describe('should display the previous number after an operation button click', () => {
    const operations = ['plus', 'minus', 'divide', 'multiply'];

    for (const operation of operations) {
      it(`${operation} operation`, async () => {
        const { user } = renderWithUser(<App />);
        await user.click(screen.getByRole('button', { name: '5' }));
        await user.click(screen.getByRole('button', { name: operation }));

        await user.click(screen.getByRole('button', { name: 'clear' }));

        expect(getDisplay()).toHaveDisplayValue('5');
      });
    }
  });
});
