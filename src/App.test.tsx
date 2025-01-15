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

  it("shouldn't update the display after an equal button click with no previous number", async () => {
    const { user } = renderWithUser(<App />);
    await user.click(screen.getByRole('button', { name: '9' }));

    await user.click(screen.getByRole('button', { name: 'equal' }));

    expect(screen.getByRole('alert', { name: /display/i })).toHaveDisplayValue(
      '9',
    );
  });

  describe('should replace the single 0 on the display with the digit of the clicked digit button', () => {
    for (let i = 0; i < 10; i += 1) {
      it(`button ${i}`, async () => {
        const { user } = renderWithUser(<App />);
        await user.click(screen.getByRole('button', { name: '0' }));

        await user.click(screen.getByRole('button', { name: String(i) }));

        expect(
          screen.getByRole('alert', { name: /display/i }),
        ).toHaveDisplayValue(String(i));
      });
    }
  });

  it('should display ERR if any operation exceeds the 8 digit maximum', async () => {
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

  it("should display the change number's sign button", () => {
    render(<App />);

    expect(
      screen.getByRole('button', { name: "change number's sign" }),
    ).toHaveTextContent('+/-');
  });

  describe('should change the sign of the entered number after a change sign button click', () => {
    it('positive to negative', async () => {
      const { user } = renderWithUser(<App />);
      await user.click(screen.getByRole('button', { name: '5' }));

      await user.click(
        screen.getByRole('button', { name: "change number's sign" }),
      );

      expect(
        screen.getByRole('alert', { name: /display/i }),
      ).toHaveDisplayValue('-5');
    });

    it('positive to negative', async () => {
      const { user } = renderWithUser(<App />);
      await user.click(screen.getByRole('button', { name: '1' }));

      await user.click(
        screen.getByRole('button', { name: "change number's sign" }),
      );
      await user.click(
        screen.getByRole('button', { name: "change number's sign" }),
      );

      expect(
        screen.getByRole('alert', { name: /display/i }),
      ).toHaveDisplayValue('1');
    });
  });

  it('should display the dot button', () => {
    render(<App />);

    expect(screen.getByRole('button', { name: 'dot' })).toHaveTextContent('.');
  });
});

describe('operations', () => {
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
});

describe('clear button', () => {
  it('should clear the display', async () => {
    const { user } = renderWithUser(<App />);
    await user.click(screen.getByRole('button', { name: '3' }));
    await user.click(screen.getByRole('button', { name: '1' }));

    await user.click(screen.getByRole('button', { name: 'clear' }));

    expect(screen.getByRole('alert', { name: /display/i })).toHaveDisplayValue(
      '',
    );
  });

  describe('should display the previous number if is clicked after an operation button click', () => {
    const operations = ['plus', 'minus', 'divide', 'multiply'];

    for (const operation of operations) {
      it(`${operation} operation`, async () => {
        const { user } = renderWithUser(<App />);
        await user.click(screen.getByRole('button', { name: '5' }));
        await user.click(screen.getByRole('button', { name: operation }));

        await user.click(screen.getByRole('button', { name: 'clear' }));

        expect(
          screen.getByRole('alert', { name: /display/i }),
        ).toHaveDisplayValue('5');
      });
    }
  });
});

describe('clear all button', () => {
  it('should display 0 on the display', async () => {
    const { user } = renderWithUser(<App />);
    await user.click(screen.getByRole('button', { name: '8' }));
    await user.click(screen.getByRole('button', { name: '3' }));

    await user.click(screen.getByRole('button', { name: 'clear all' }));

    expect(screen.getByRole('alert', { name: /display/i })).toHaveDisplayValue(
      '0',
    );
  });

  it('should erase the previous number/result', async () => {
    const { user } = renderWithUser(<App />);

    await user.click(screen.getByRole('button', { name: '9' }));
    await user.click(screen.getByRole('button', { name: 'plus' }));

    await user.click(screen.getByRole('button', { name: 'clear all' }));

    await user.click(screen.getByRole('button', { name: '3' }));
    await user.click(screen.getByRole('button', { name: 'equal' }));

    expect(screen.getByRole('alert', { name: /display/i })).toHaveDisplayValue(
      '3',
    );
  });
});
