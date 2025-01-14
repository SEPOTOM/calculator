import { render, screen } from '@testing-library/react';

import App from '@/App';

describe('App', () => {
  it('should display a display', () => {
    render(<App />);

    expect(screen.getByRole('alert', { name: /display/i })).toBeInTheDocument();
  });
});
