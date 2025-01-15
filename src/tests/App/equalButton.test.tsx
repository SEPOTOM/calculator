import App from '@/App';
import { clickButtons, expectDisplayValueToBe, renderWithUser } from '@/tests';

describe('Equal button', () => {
  it("shouldn't update the display if there is no previous number", async () => {
    const { user } = renderWithUser(<App />);

    await clickButtons(user, ['9', 'equal']);

    expectDisplayValueToBe('9');
  });
});
