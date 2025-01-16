import App from '@/App';
import {
  OPERATIONS,
  clickButtons,
  enterNumber,
  expectDisplayValueToBe,
  performOperation,
  renderWithUser,
} from '@/tests';
import { DECIMAL_PART_LIMIT, INTEGER_PART_LIMIT } from '@/utils';

describe('Operations', () => {
  describe('Operation button behavior', () => {
    Object.keys(OPERATIONS).forEach((operation) => {
      it(`should reset display to 0 after ${operation} with no previous number`, async () => {
        const { user } = renderWithUser(<App />);

        await enterNumber(user, '5');
        await clickButtons(user, [operation]);

        expectDisplayValueToBe('0');
      });
    });
  });

  describe('Basic operations', () => {
    Object.values(OPERATIONS).forEach(({ name, calculateResult }) => {
      it(`should correctly perform ${name}`, async () => {
        const { user } = renderWithUser(<App />);

        await performOperation(user, '8', name, '2');

        expectDisplayValueToBe(String(calculateResult(8, 2)));
      });
    });
  });

  describe('Chained operations', () => {
    Object.values(OPERATIONS).forEach(({ name, calculateResult }) => {
      it(`should chain ${name} operations correctly`, async () => {
        const { user } = renderWithUser(<App />);

        await performOperation(user, '8', name, '2');
        await clickButtons(user, [name]);
        await enterNumber(user, '4');
        await clickButtons(user, ['equal']);

        const firstResult = calculateResult(8, 2);
        const expectedResult = calculateResult(firstResult, 4).toString();

        expectDisplayValueToBe(expectedResult);
      });
    });
  });

  it(`should display ERR if result's integer part exceeds ${INTEGER_PART_LIMIT} digits`, async () => {
    const { user } = renderWithUser(<App />);

    await performOperation(user, '9'.repeat(INTEGER_PART_LIMIT), 'plus', '1');

    expectDisplayValueToBe('ERR');
  });

  it("shouldn't display ERR if both result's parts don't exceed their limits", async () => {
    const { user } = renderWithUser(<App />);

    await performOperation(
      user,
      `${'9'.repeat(INTEGER_PART_LIMIT)}.125`,
      'plus',
      `0.130`,
    );

    expectDisplayValueToBe(`${'9'.repeat(INTEGER_PART_LIMIT)}.255`);
  });

  it(`should limit result's decimal part to ${DECIMAL_PART_LIMIT} digits`, async () => {
    const { user } = renderWithUser(<App />);

    await performOperation(user, '0.001', 'plus', '0.008');

    expectDisplayValueToBe('0.009');
  });
});
