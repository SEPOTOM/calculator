import { screen } from '@testing-library/react';

import App from '@/App';
import { getDisplay, renderWithUser } from '@/tests';

describe('Clear all button', () => {
  it('should display 0 on the display', async () => {
    const { user } = renderWithUser(<App />);
    await user.click(screen.getByRole('button', { name: '8' }));
    await user.click(screen.getByRole('button', { name: '3' }));

    await user.click(screen.getByRole('button', { name: 'clear all' }));

    expect(getDisplay()).toHaveDisplayValue('0');
  });

  it('should erase the previous number/result', async () => {
    const { user } = renderWithUser(<App />);

    await user.click(screen.getByRole('button', { name: '9' }));
    await user.click(screen.getByRole('button', { name: 'plus' }));

    await user.click(screen.getByRole('button', { name: 'clear all' }));

    await user.click(screen.getByRole('button', { name: '3' }));
    await user.click(screen.getByRole('button', { name: 'equal' }));

    expect(getDisplay()).toHaveDisplayValue('3');
  });
});
