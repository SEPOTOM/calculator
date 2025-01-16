import { render, screen } from '@testing-library/react';

import App from '@/App';
import { expectDisplayValueToBe } from '@/tests/utils';

describe('Initial calculator state', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('should display 0 by default', () => {
    expectDisplayValueToBe('0');
  });

  describe('digit buttons', () => {
    for (let i = 0; i < 10; i += 1) {
      it(`should display digit button ${i}`, () => {
        expect(
          screen.getByRole('button', { name: String(i) }),
        ).toBeInTheDocument();
      });
    }
  });

  describe('operation and control buttons', () => {
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
      it(`should display ${buttonsNames[i]} button with symbol ${displayValues[i]}`, () => {
        expect(
          screen.getByRole('button', { name: buttonsNames[i] }),
        ).toHaveTextContent(displayValues[i]);
      });
    }
  });
});
