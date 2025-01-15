import { screen } from '@testing-library/react';

import App from '@/App';
import { expectDisplayValueToBe, renderWithUser } from '@/tests';

describe('Equal button', () => {
  it("shouldn't update the display if there is no previous number", async () => {
    const { user } = renderWithUser(<App />);
    await user.click(screen.getByRole('button', { name: '9' }));

    await user.click(screen.getByRole('button', { name: 'equal' }));

    expectDisplayValueToBe('9');
  });
});
