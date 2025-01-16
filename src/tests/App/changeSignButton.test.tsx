import App from '@/App';
import {
  changeSign,
  enterNumber,
  expectDisplayValueToBe,
  renderWithUser,
} from '@/tests';

describe('Change sign button', () => {
  describe('number sign toggling', () => {
    for (let i = 0; i < 10; i += 1) {
      it(`should change ${i} to negative`, async () => {
        const { user } = renderWithUser(<App />);

        await enterNumber(user, String(i));
        await changeSign(user);

        expectDisplayValueToBe(`-${String(i)}`);
      });
    }

    for (let i = 0; i < 10; i += 1) {
      it(`should change ${i} back to positive`, async () => {
        const { user } = renderWithUser(<App />);

        await enterNumber(user, String(i));
        await changeSign(user);
        await changeSign(user);

        expectDisplayValueToBe(String(i));
      });
    }
  });
});
