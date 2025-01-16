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

  describe('should display the previous number after an operation button click', () => {
    const operations = ['plus', 'minus', 'divide', 'multiply'];

    for (const operation of operations) {
      it(`${operation} operation`, async () => {
        const { user } = renderWithUser(<App />);

        await enterNumber(user, '5');
        await clickButtons(user, [operation]);
        await clear(user);

        expectDisplayValueToBe('5');
      });
    }
  });
});
