import App from '@/App';
import {
  clear,
  clickButtons,
  enterNumber,
  expectDisplayValueToBe,
  renderWithUser,
} from '@/tests';

describe('Clear button', () => {
  it('should clear the display', async () => {
    const { user } = renderWithUser(<App />);

    await enterNumber(user, '31');
    await clear(user);

    expectDisplayValueToBe('');
  });

  describe('operation states', () => {
    const operations = ['plus', 'minus', 'divide', 'multiply'];

    for (const operation of operations) {
      it(`should restore previous number after an ${operation} button click`, async () => {
        const { user } = renderWithUser(<App />);

        await enterNumber(user, '5');
        await clickButtons(user, [operation]);
        await clear(user);

        expectDisplayValueToBe('5');
      });
    }
  });
});
