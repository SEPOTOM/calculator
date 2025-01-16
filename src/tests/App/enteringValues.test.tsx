import App from '@/App';
import {
  changeSign,
  enterNumber,
  expectDisplayValueToBe,
  renderWithUser,
} from '@/tests';
import { DECIMAL_PART_LIMIT, INTEGER_PART_LIMIT } from '@/utils';

describe('Entering values', () => {
  describe('single digit entry', () => {
    for (let i = 0; i < 10; i += 1) {
      it(`should display ${i} when clicked`, async () => {
        const { user } = renderWithUser(<App />);

        await enterNumber(user, String(i));

        expectDisplayValueToBe(String(i));
      });
    }
  });

  it(`should limit input's integer part to  ${INTEGER_PART_LIMIT} digits`, async () => {
    const { user } = renderWithUser(<App />);

    for (let i = 9; i >= 0; i -= 1) {
      await enterNumber(user, String(i));
    }

    expectDisplayValueToBe('98765432');
  });

  describe('zero replacement', () => {
    for (let i = 0; i < 10; i += 1) {
      it(`should replace positive zero with ${i}`, async () => {
        const { user } = renderWithUser(<App />);

        await enterNumber(user, `0${String(i)}`);

        expectDisplayValueToBe(String(i));
      });
    }

    for (let i = 0; i < 10; i += 1) {
      it(`should replace negative zero with ${i}`, async () => {
        const { user } = renderWithUser(<App />);

        await changeSign(user);
        await enterNumber(user, String(i));

        expectDisplayValueToBe(`-${String(i)}`);
      });
    }
  });

  it('should allow entering decimal numbers', async () => {
    const { user } = renderWithUser(<App />);

    await enterNumber(user, '5.2');

    expectDisplayValueToBe('5.2');
  });

  it(`should limit decimal places to ${DECIMAL_PART_LIMIT} digits`, async () => {
    const { user } = renderWithUser(<App />);

    await enterNumber(user, '7.11111');

    expectDisplayValueToBe('7.111');
  });

  it('should prohibit entering multiple dots in the same number', async () => {
    const { user } = renderWithUser(<App />);

    await enterNumber(user, '8...1');

    expectDisplayValueToBe('8.1');
  });

  it('should combine the integer and decimal limits resulting in a maximum of 11 digits in numbers', async () => {
    const { user } = renderWithUser(<App />);

    await enterNumber(
      user,
      `${'9'.repeat(INTEGER_PART_LIMIT)}.${'9'.repeat(DECIMAL_PART_LIMIT)}`,
    );

    expectDisplayValueToBe('99999999.999');
  });
});
