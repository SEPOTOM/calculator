import App from '@/App';
import {
  OPERATIONS,
  clear,
  clickButtons,
  enterNumber,
  expectDisplayValueToBe,
  renderWithUser,
} from '@/tests';

describe('Clear button', () => {
  it('should reset display to 0', async () => {
    const { user } = renderWithUser(<App />);
    await enterNumber(user, '31');

    await clear(user);

    expectDisplayValueToBe('0');
  });

  describe('operation states', () => {
    Object.keys(OPERATIONS).forEach((operation) => {
      it(`should restore previous number after an ${operation} button click`, async () => {
        const { user } = renderWithUser(<App />);
        await enterNumber(user, '5');
        await clickButtons(user, [operation]);

        await clear(user);

        expectDisplayValueToBe('5');
      });

      it(`should reset display to 0 after entering second number during ${operation} operation`, async () => {
        const { user } = renderWithUser(<App />);
        await enterNumber(user, '8');
        await clickButtons(user, [operation]);
        await enterNumber(user, '92');

        await clear(user);

        expectDisplayValueToBe('0');
      });
    });
  });

  describe('impact on operations', () => {
    Object.values(OPERATIONS).forEach(({ name, calculateResult }) => {
      it(`shouldn't impact on the result of ${name} operation`, async () => {
        const { user } = renderWithUser(<App />);
        await enterNumber(user, '50');
        await clickButtons(user, [name]);

        await clear(user);
        await clickButtons(user, [name]);
        await enterNumber(user, '2');
        await clickButtons(user, ['equal']);

        expectDisplayValueToBe(String(calculateResult(50, 2)));
      });
    });
  });
});
