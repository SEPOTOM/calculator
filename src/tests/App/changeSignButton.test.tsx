import App from '@/App';
import {
  changeSign,
  enterNumber,
  expectDisplayValueToBe,
  renderWithUser,
} from '@/tests';

describe('Change sign button', () => {
  describe('should change the sign of the entered number', () => {
    for (let i = 0; i < 10; i += 1) {
      it(`button ${i} to negative`, async () => {
        const { user } = renderWithUser(<App />);

        await enterNumber(user, String(i));
        await changeSign(user);

        expectDisplayValueToBe(`-${String(i)}`);
      });
    }

    for (let i = 0; i < 10; i += 1) {
      it(`button ${i} to positive`, async () => {
        const { user } = renderWithUser(<App />);

        await enterNumber(user, String(i));
        await changeSign(user);
        await changeSign(user);

        expectDisplayValueToBe(String(i));
      });
    }
  });
});
