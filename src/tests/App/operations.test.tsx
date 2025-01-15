import { screen } from '@testing-library/react';

import App from '@/App';
import { renderWithUser } from '@/tests';

describe('Operations', () => {
  const operations = ['plus', 'minus', 'divide', 'multiply'];

  describe('should clear the display after the button click with no previous number', () => {
    for (const operation of operations) {
      it(`${operation} button`, async () => {
        const { user } = renderWithUser(<App />);
        await user.click(screen.getByRole('button', { name: '5' }));

        await user.click(screen.getByRole('button', { name: operation }));

        expect(
          screen.getByRole('alert', { name: /display/i }),
        ).toHaveDisplayValue('');
      });
    }
  });

  describe('should display the result after two entered numbers and an equal button click', () => {
    const expectedResults = ['10', '6', '4', '16'];

    for (let i = 0; i < operations.length; i += 1) {
      it(`${operations[i]} operation`, async () => {
        const { user } = renderWithUser(<App />);
        await user.click(screen.getByRole('button', { name: '8' }));
        await user.click(screen.getByRole('button', { name: operations[i] }));
        await user.click(screen.getByRole('button', { name: '2' }));

        await user.click(screen.getByRole('button', { name: 'equal' }));

        expect(
          screen.getByRole('alert', { name: /display/i }),
        ).toHaveDisplayValue(expectedResults[i]);
      });
    }
  });

  describe('should display the result of the previous result and a new number after an equal button click', () => {
    const expectedResults = ['14', '2', '1', '64'];

    for (let i = 0; i < operations.length; i += 1) {
      it(`${operations[i]} operation`, async () => {
        const { user } = renderWithUser(<App />);

        await user.click(screen.getByRole('button', { name: '8' }));
        await user.click(screen.getByRole('button', { name: operations[i] }));
        await user.click(screen.getByRole('button', { name: '2' }));
        await user.click(screen.getByRole('button', { name: 'equal' }));

        await user.click(screen.getByRole('button', { name: operations[i] }));
        await user.click(screen.getByRole('button', { name: '4' }));
        await user.click(screen.getByRole('button', { name: 'equal' }));

        expect(
          screen.getByRole('alert', { name: /display/i }),
        ).toHaveDisplayValue(expectedResults[i]);
      });
    }
  });

  it('should display ERR if the result exceeds the 8 digit maximum', async () => {
    const { user } = renderWithUser(<App />);

    for (let i = 0; i < 8; i += 1) {
      await user.click(screen.getByRole('button', { name: '9' }));
    }

    await user.click(screen.getByRole('button', { name: 'plus' }));
    await user.click(screen.getByRole('button', { name: '1' }));

    await user.click(screen.getByRole('button', { name: 'equal' }));

    expect(screen.getByRole('alert', { name: /display/i })).toHaveDisplayValue(
      'ERR',
    );
  });
});
