import App from '@/App';
import { clickButtons, expectDisplayValueToBe, renderWithUser } from '@/tests';

describe('Clear all button', () => {
  it('should display 0 on the display', async () => {
    const { user } = renderWithUser(<App />);

    await clickButtons(user, ['8', '3', 'clear all']);

    expectDisplayValueToBe('0');
  });

  it('should erase the previous number/result', async () => {
    const { user } = renderWithUser(<App />);

    await clickButtons(user, ['9', 'plus', 'clear all', '3', 'equal']);

    expectDisplayValueToBe('3');
  });
});
