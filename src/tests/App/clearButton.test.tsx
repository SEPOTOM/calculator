import App from '@/App';
import { clickButtons, expectDisplayValueToBe, renderWithUser } from '@/tests';

describe('Clear button', () => {
  it('should clear the display', async () => {
    const { user } = renderWithUser(<App />);

    await clickButtons(user, ['3', '1', 'clear']);

    expectDisplayValueToBe('');
  });

  describe('should display the previous number after an operation button click', () => {
    const operations = ['plus', 'minus', 'divide', 'multiply'];

    for (const operation of operations) {
      it(`${operation} operation`, async () => {
        const { user } = renderWithUser(<App />);

        await clickButtons(user, ['5', operation, 'clear']);

        expectDisplayValueToBe('5');
      });
    }
  });
});
