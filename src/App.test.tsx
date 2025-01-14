import { render, screen } from '@testing-library/react';

import App from '@/App';
import { renderWithUser } from '@/tests';

describe('App', () => {
  it('should display a display', () => {
    render(<App />);

    expect(screen.getByRole('alert', { name: /display/i })).toBeInTheDocument();
  });

  describe('should display digit buttons', () => {
    for (let i = 0; i < 10; i += 1) {
      it(`button ${i}`, () => {
        render(<App />);

        expect(
          screen.getByRole('button', { name: String(i) }),
        ).toBeInTheDocument();
      });
    }
  });

  describe('should display operation and clear buttons', () => {
    const buttonsNames = [
      'plus',
      'minus',
      'divide',
      'multiply',
      'equal',
      'clear',
      'clear all',
    ];
    const displayValues = ['+', '-', '/', '*', '=', 'C', 'AC'];

    for (let i = 0; i < buttonsNames.length; i += 1) {
      it(`${buttonsNames[i]} button`, () => {
        render(<App />);

        expect(
          screen.getByRole('button', { name: buttonsNames[i] }),
        ).toHaveTextContent(displayValues[i]);
      });
    }
  });

  describe('should display the digit of clicked digit button on the display', () => {
    for (let i = 0; i < 10; i += 1) {
      it(`button ${i}`, async () => {
        const { user } = renderWithUser(<App />);

        await user.click(screen.getByRole('button', { name: String(i) }));

        expect(
          screen.getByRole('alert', { name: /display/i }),
        ).toHaveDisplayValue(String(i));
      });
    }
  });

  it('should allow the user to enter a sequence of digits with a max length of 8', async () => {
    const { user } = renderWithUser(<App />);

    for (let i = 9; i >= 0; i -= 1) {
      await user.click(screen.getByRole('button', { name: String(i) }));
    }

    expect(screen.getByRole('alert', { name: /display/i })).toHaveDisplayValue(
      '98765432',
    );
  });
});
