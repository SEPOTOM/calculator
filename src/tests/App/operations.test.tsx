import App from '@/App';
import {
  OPERATIONS,
  clickButtons,
  expectDisplayValueToBe,
  renderWithUser,
} from '@/tests';

describe('Operations', () => {
  describe('should clear the display after the button click with no previous number', () => {
    Object.values(OPERATIONS).forEach(({ name }) => {
      it(`${name} button`, async () => {
        const { user } = renderWithUser(<App />);

        await clickButtons(user, ['5', name]);

        expectDisplayValueToBe('');
      });
    });
  });

  describe('should display the result after two entered numbers and an equal button click', () => {
    Object.values(OPERATIONS).forEach(({ name, calculateResult }) => {
      it(`${name} operation`, async () => {
        const { user } = renderWithUser(<App />);

        await clickButtons(user, ['8', name, '2', 'equal']);

        expectDisplayValueToBe(String(calculateResult(8, 2)));
      });
    });
  });

  describe('should display the result of the previous result and a new number after an equal button click', () => {
    Object.values(OPERATIONS).forEach(({ name, calculateResult }) => {
      it(`${name} operation`, async () => {
        const { user } = renderWithUser(<App />);

        await clickButtons(user, ['8', name, '2', 'equal', name, '4', 'equal']);

        const firstResult = calculateResult(8, 2);
        const secondResult = calculateResult(firstResult, 4);

        expectDisplayValueToBe(String(secondResult));
      });
    });
  });

  it('should display ERR if the result exceeds the 8 digit maximum', async () => {
    const { user } = renderWithUser(<App />);

    await clickButtons(user, Array<string>(8).fill('9'));
    await clickButtons(user, ['plus', '1', 'equal']);

    expectDisplayValueToBe('ERR');
  });

  it('should limit the decimal part of the result to 3 digits', async () => {
    const { user } = renderWithUser(<App />);

    await clickButtons(user, [
      '0',
      'dot',
      '0',
      '0',
      '1',
      'plus',
      '0',
      'dot',
      '0',
      '0',
      '8',
      'equal',
    ]);

    expectDisplayValueToBe('0.009');
  });
});
