import { render, screen } from '@testing-library/react';

import App from '@/App';

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
});
