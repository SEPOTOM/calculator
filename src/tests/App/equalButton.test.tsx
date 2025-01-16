import App from '@/App';
import {
  clickButtons,
  enterNumber,
  expectDisplayValueToBe,
  renderWithUser,
} from '@/tests';

describe('Equal button', () => {
  it("shouldn't update the display if there is no previous number", async () => {
    const { user } = renderWithUser(<App />);

    await enterNumber(user, '9');
    await clickButtons(user, ['equal']);

    expectDisplayValueToBe('9');
  });
});
