import App from '@/App';
import {
  changeSign,
  enterNumber,
  expectDisplayValueToBe,
  renderWithUser,
} from '@/tests';

describe('Change sign button', () => {
  describe('number sign toggling', () => {
    const scenarios = [
      {
        description: 'to negative',
        expectedSign: '-',
        toggleCount: 1,
      },
      {
        description: 'back to positive',
        expectedSign: '',
        toggleCount: 2,
      },
    ];

    scenarios.forEach(({ description, toggleCount, expectedSign }) => {
      for (let i = 0; i < 10; i += 1) {
        it(`should change ${i} ${description}`, async () => {
          const digit = String(i);
          const { user } = renderWithUser(<App />);
          await enterNumber(user, digit);

          for (let i = 0; i < toggleCount; i += 1) {
            await changeSign(user);
          }

          expectDisplayValueToBe(`${expectedSign}${digit}`);
        });
      }
    });
  });
});
