import { render, screen } from '@testing-library/react';

import App from '@/App';
import { getDisplay } from '@/tests/utils';

describe('App in initial state', () => {
  it('should display a display with a default value of 0', () => {
    render(<App />);

    expect(getDisplay()).toHaveDisplayValue('0');
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
      "change number's sign",
      'dot',
    ];
    const displayValues = ['+', '-', '/', '*', '=', 'C', 'AC', '+/-', '.'];

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
