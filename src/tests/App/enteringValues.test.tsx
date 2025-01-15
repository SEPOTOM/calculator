import { screen } from '@testing-library/react';

import App from '@/App';
import { renderWithUser } from '@/tests';

describe('Entering values', () => {
  describe('should display the corresponding digits on a digit button click', () => {
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

  describe('should replace the single 0 with the corresponding digit on a digit button click', () => {
    for (let i = 0; i < 10; i += 1) {
      it(`button ${i} for positive 0`, async () => {
        const { user } = renderWithUser(<App />);
        await user.click(screen.getByRole('button', { name: '0' }));

        await user.click(screen.getByRole('button', { name: String(i) }));

        expect(
          screen.getByRole('alert', { name: /display/i }),
        ).toHaveDisplayValue(String(i));
      });
    }

    for (let i = 0; i < 10; i += 1) {
      it(`button ${i} for negative 0`, async () => {
        const { user } = renderWithUser(<App />);
        await user.click(screen.getByRole('button', { name: '0' }));
        await user.click(
          screen.getByRole('button', { name: "change number's sign" }),
        );

        await user.click(screen.getByRole('button', { name: String(i) }));

        expect(
          screen.getByRole('alert', { name: /display/i }),
        ).toHaveDisplayValue(`-${String(i)}`);
      });
    }
  });

  it('should allow the user to enter a floating point number', async () => {
    const { user } = renderWithUser(<App />);

    await user.click(screen.getByRole('button', { name: '5' }));
    await user.click(screen.getByRole('button', { name: 'dot' }));
    await user.click(screen.getByRole('button', { name: '2' }));

    expect(screen.getByRole('alert', { name: /display/i })).toHaveDisplayValue(
      '5.2',
    );
  });

  it('should allow the user to enter a maximum of 3 digits after the dot', async () => {
    const { user } = renderWithUser(<App />);

    await user.click(screen.getByRole('button', { name: '7' }));
    await user.click(screen.getByRole('button', { name: 'dot' }));

    for (let i = 0; i < 5; i += 1) {
      await user.click(screen.getByRole('button', { name: '1' }));
    }

    expect(screen.getByRole('alert', { name: /display/i })).toHaveDisplayValue(
      '7.111',
    );
  });
});
