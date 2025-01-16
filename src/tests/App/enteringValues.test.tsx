import { UserEvent } from '@testing-library/user-event';

import App from '@/App';
import {
  changeSign,
  clickButtons,
  enterNumber,
  expectDisplayValueToBe,
  performOperation,
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

  describe('length limitations', () => {
    it(`should limit input's integer part to ${INTEGER_PART_LIMIT} digits`, async () => {
      const { user } = renderWithUser(<App />);

      await enterNumber(user, '1234567890');

      expectDisplayValueToBe('12345678');
    });

    it(`should limit decimal places to ${DECIMAL_PART_LIMIT} digits`, async () => {
      const { user } = renderWithUser(<App />);

      await enterNumber(user, '7.11111');

      expectDisplayValueToBe('7.111');
    });

    it('should combine both integer and decimal limitations within one number', async () => {
      const { user } = renderWithUser(<App />);

      await enterNumber(
        user,
        `${'9'.repeat(INTEGER_PART_LIMIT)}.${'9'.repeat(DECIMAL_PART_LIMIT)}`,
      );

      expectDisplayValueToBe('99999999.999');
    });
  });

  describe('zero replacement', () => {
    const scenarios = [
      { description: 'positive zero', setup: vi.fn() },
      {
        description: 'negative zero',
        setup: async (user: UserEvent) => await changeSign(user),
      },
    ];

    scenarios.forEach(({ description, setup }) => {
      for (let i = 0; i < 10; i += 1) {
        it(`should replace ${description} with ${i}`, async () => {
          const digit = String(i);
          const { user } = renderWithUser(<App />);
          setup(user);

          await enterNumber(user, digit);

          expectDisplayValueToBe(
            description === 'positive zero' ? digit : `-${digit}`,
          );
        });
      }
    });
  });

  describe('ERR replacement', () => {
    for (let i = 0; i < 10; i += 1) {
      it(`should replace ERR with ${i}`, async () => {
        const digit = String(i);
        const { user } = renderWithUser(<App />);
        await performOperation(
          user,
          '9'.repeat(INTEGER_PART_LIMIT),
          'plus',
          '1',
        );

        await enterNumber(user, digit);

        expectDisplayValueToBe(digit);
      });
    }
  });

  describe('decimal numbers', () => {
    it('should allow entering decimal numbers', async () => {
      const { user } = renderWithUser(<App />);

      await enterNumber(user, '5.2');

      expectDisplayValueToBe('5.2');
    });

    it('should prohibit entering multiple dots in the same number', async () => {
      const { user } = renderWithUser(<App />);

      await enterNumber(user, '8...1');

      expectDisplayValueToBe('8.1');
    });

    it("shouldn't enter dot if display shows ERR", async () => {
      const { user } = renderWithUser(<App />);
      await performOperation(user, '9'.repeat(INTEGER_PART_LIMIT), 'plus', '1');

      await clickButtons(user, ['dot']);

      expectDisplayValueToBe('ERR');
    });
  });
});
