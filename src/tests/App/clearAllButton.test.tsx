import App from '@/App';
import {
  clearAll,
  clickButtons,
  enterNumber,
  expectDisplayValueToBe,
  renderWithUser,
} from '@/tests';

describe('Clear all button', () => {
  it('should reset display to 0', async () => {
    const { user } = renderWithUser(<App />);
    await enterNumber(user, '83');

    await clearAll(user);

    expectDisplayValueToBe('0');
  });

  it("should clear app's history", async () => {
    const { user } = renderWithUser(<App />);
    await enterNumber(user, '9');
    await clickButtons(user, ['plus']);

    await clearAll(user);
    await enterNumber(user, '3');
    await clickButtons(user, ['equal']);

    expectDisplayValueToBe('3');
  });
});
