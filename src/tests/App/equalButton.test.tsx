import App from '@/App';
import {
  clickButtons,
  enterNumber,
  expectDisplayValueToBe,
  renderWithUser,
} from '@/tests';

describe('Equal button', () => {
  it('should maintain display value when no operation is pending', async () => {
    const { user } = renderWithUser(<App />);

    await enterNumber(user, '9');
    await clickButtons(user, ['equal']);

    expectDisplayValueToBe('9');
  });
});
