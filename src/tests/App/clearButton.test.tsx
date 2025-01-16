import App from '@/App';
import {
  OPERATIONS,
  clear,
  clickButtons,
  enterNumber,
  expectDisplayValueToBe,
  performOperation,
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
    Object.values(OPERATIONS).forEach(({ name, calculateResult }) => {
      it(`should restore previous number after an ${name} button click`, async () => {
        const { user } = renderWithUser(<App />);
        await enterNumber(user, '5');
        await clickButtons(user, [name]);

        await clear(user);

        expectDisplayValueToBe('5');
      });

      it(`should reset display to 0 after entering second number during ${name} operation`, async () => {
        const { user } = renderWithUser(<App />);
        await enterNumber(user, '8');
        await clickButtons(user, [name]);
        await enterNumber(user, '92');

        await clear(user);

        expectDisplayValueToBe('0');
      });

      it(`should restore accumulated result after an ${name} button click during continual operations`, async () => {
        const { user } = renderWithUser(<App />);
        await performOperation(user, '100', name, '2');
        await clickButtons(user, [name]);
        await enterNumber(user, '4');
        await clickButtons(user, [name]);

        await clear(user);

        const firstResult = calculateResult(100, 2);
        const expectedResult = calculateResult(firstResult, 4).toString();

        expectDisplayValueToBe(expectedResult);
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
