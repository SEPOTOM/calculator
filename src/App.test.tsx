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
});
