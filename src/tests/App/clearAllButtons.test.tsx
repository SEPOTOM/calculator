import App from '@/App';
import {
  clickButtons,
  enterNumber,
  expectDisplayValueToBe,
  renderWithUser,
} from '@/tests';

describe('Clear all button', () => {
  it('should display 0 on the display', async () => {
    const { user } = renderWithUser(<App />);

    await enterNumber(user, '83');
    await clickButtons(user, ['clear all']);

    expectDisplayValueToBe('0');
  });

  it('should erase the previous number/result', async () => {
    const { user } = renderWithUser(<App />);

    await enterNumber(user, '9');
    await clickButtons(user, ['plus', 'clear all']);
    await enterNumber(user, '3');
    await clickButtons(user, ['equal']);

    expectDisplayValueToBe('3');
  });
});
