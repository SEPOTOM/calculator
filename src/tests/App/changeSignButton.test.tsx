import App from '@/App';
import { clickButtons, expectDisplayValueToBe, renderWithUser } from '@/tests';

describe('Change sign button', () => {
  describe('should change the sign of the entered number', () => {
    for (let i = 0; i < 10; i += 1) {
      it(`button ${i} to negative`, async () => {
        const { user } = renderWithUser(<App />);

        await clickButtons(user, [String(i), "change number's sign"]);

        expectDisplayValueToBe(`-${String(i)}`);
      });
    }

    for (let i = 0; i < 10; i += 1) {
      it(`button ${i} to positive`, async () => {
        const { user } = renderWithUser(<App />);

        await clickButtons(user, [
          String(i),
          "change number's sign",
          "change number's sign",
        ]);

        expectDisplayValueToBe(String(i));
      });
    }
  });
});
