import App from '@/App';
import { clickButtons, expectDisplayValueToBe, renderWithUser } from '@/tests';
import { DECIMAL_PART_LIMIT, INTEGER_PART_LIMIT } from '@/utils';

describe('Entering values', () => {
  describe('should display the corresponding digits on a digit button click', () => {
    for (let i = 0; i < 10; i += 1) {
      it(`button ${i}`, async () => {
        const { user } = renderWithUser(<App />);

        await clickButtons(user, [String(i)]);

        expectDisplayValueToBe(String(i));
      });
    }
  });

  it(`should allow the user to enter a sequence of digits with a max length of ${INTEGER_PART_LIMIT}`, async () => {
    const { user } = renderWithUser(<App />);

    for (let i = 9; i >= 0; i -= 1) {
      await clickButtons(user, [String(i)]);
    }

    expectDisplayValueToBe('98765432');
  });

  describe('should replace the single 0 with the corresponding digit on a digit button click', () => {
    for (let i = 0; i < 10; i += 1) {
      it(`button ${i} for positive 0`, async () => {
        const { user } = renderWithUser(<App />);

        await clickButtons(user, ['0', String(i)]);

        expectDisplayValueToBe(String(i));
      });
    }

    for (let i = 0; i < 10; i += 1) {
      it(`button ${i} for negative 0`, async () => {
        const { user } = renderWithUser(<App />);

        await clickButtons(user, ['0', "change number's sign", String(i)]);

        expectDisplayValueToBe(`-${String(i)}`);
      });
    }
  });

  it('should allow the user to enter a floating point number', async () => {
    const { user } = renderWithUser(<App />);

    await clickButtons(user, ['5', 'dot', '2']);

    expectDisplayValueToBe('5.2');
  });

  it(`should allow the user to enter a maximum of ${DECIMAL_PART_LIMIT} digits after the dot`, async () => {
    const { user } = renderWithUser(<App />);

    await clickButtons(user, ['7', 'dot']);
    await clickButtons(user, Array<string>(5).fill('1'));

    expectDisplayValueToBe('7.111');
  });

  it('should prohibit the user from entering multiple dots in the same number', async () => {
    const { user } = renderWithUser(<App />);

    await clickButtons(user, ['8', 'dot', 'dot', 'dot', '1']);

    expectDisplayValueToBe('8.1');
  });

  it('should combine the integer and decimal limits resulting in a maximum of 11 digits in numbers', async () => {
    const { user } = renderWithUser(<App />);

    await clickButtons(user, [
      ...Array<string>(INTEGER_PART_LIMIT).fill('9'),
      'dot',
      ...Array<string>(DECIMAL_PART_LIMIT).fill('9'),
    ]);

    expectDisplayValueToBe('99999999.999');
  });
});
