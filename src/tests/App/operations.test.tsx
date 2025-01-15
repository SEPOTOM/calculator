import App from '@/App';
import { clickButtons, expectDisplayValueToBe, renderWithUser } from '@/tests';

describe('Operations', () => {
  const operations = ['plus', 'minus', 'divide', 'multiply'];

  describe('should clear the display after the button click with no previous number', () => {
    for (const operation of operations) {
      it(`${operation} button`, async () => {
        const { user } = renderWithUser(<App />);

        await clickButtons(user, ['5', operation]);

        expectDisplayValueToBe('');
      });
    }
  });

  describe('should display the result after two entered numbers and an equal button click', () => {
    const expectedResults = ['10', '6', '4', '16'];

    for (let i = 0; i < operations.length; i += 1) {
      it(`${operations[i]} operation`, async () => {
        const { user } = renderWithUser(<App />);

        await clickButtons(user, ['8', operations[i], '2', 'equal']);

        expectDisplayValueToBe(expectedResults[i]);
      });
    }
  });

  describe('should display the result of the previous result and a new number after an equal button click', () => {
    const expectedResults = ['14', '2', '1', '64'];

    for (let i = 0; i < operations.length; i += 1) {
      it(`${operations[i]} operation`, async () => {
        const { user } = renderWithUser(<App />);

        await clickButtons(user, [
          '8',
          operations[i],
          '2',
          'equal',
          operations[i],
          '4',
          'equal',
        ]);

        expectDisplayValueToBe(expectedResults[i]);
      });
    }
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
