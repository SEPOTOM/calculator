import { MouseEvent, useState } from 'react';

import { Button } from '@/components';
import { performCalculation } from '@/utils';

const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const App = () => {
  const [currentNumberStr, setCurrentNumberStr] = useState('');
  const [prevNumber, setPrevNumber] = useState<Nullable<number>>(null);
  const [lastOperation, setLastOperation] = useState('');

  const handleDigitButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (currentNumberStr.length < 8) {
      const newDigit = e.currentTarget.textContent;
      setCurrentNumberStr((dv) =>
        dv === '0' ? (newDigit ?? '') : `${dv}${newDigit}`,
      );
    }
  };

  const handleOperationButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    setCurrentNumberStr('');
    setPrevNumber(Number(currentNumberStr));
    setLastOperation(e.currentTarget.textContent ?? '');
  };

  const handleEqualButtonClick = () => {
    if (!prevNumber) {
      return;
    }

    const result = performCalculation(
      prevNumber,
      currentNumberStr,
      lastOperation,
    );

    if (result.length > 8) {
      setCurrentNumberStr('ERR');
    } else {
      setCurrentNumberStr(result);
    }
  };

  const handleClearButtonClick = () => {
    if (lastOperation !== '') {
      setCurrentNumberStr(String(prevNumber));
    } else {
      setCurrentNumberStr('');
    }
  };

  const handleClearAllButtonClick = () => {
    setCurrentNumberStr('0');
    setPrevNumber(null);
  };

  const handleChangeSignButtonClick = () => {
    const currentNumber = Number(currentNumberStr);
    const absCurrentNumber = Math.abs(currentNumber);

    if (absCurrentNumber === currentNumber) {
      setCurrentNumberStr(`-${currentNumber}`);
    } else {
      setCurrentNumberStr(`${absCurrentNumber}`);
    }
  };

  return (
    <div className="m-auto max-w-5xl p-3">
      <input
        role="alert"
        type="text"
        value={currentNumberStr}
        readOnly
        aria-label="Calculator display"
        className="outline-focus mb-6 w-full max-w-full rounded-sm bg-main px-2 py-3 text-right font-mono text-5xl tracking-wider text-secondary sm:mb-9"
      />

      <div className="grid grid-cols-4 grid-rows-5 gap-3">
        <Button
          aria-label="change number's sign"
          variant="border"
          onClick={handleChangeSignButtonClick}
        >
          +/-
        </Button>
        <Button
          aria-label="clear all"
          variant="border"
          onClick={handleClearAllButtonClick}
        >
          AC
        </Button>
        <Button
          aria-label="clear"
          variant="border"
          onClick={handleClearButtonClick}
        >
          C
        </Button>
        <Button
          aria-label="plus"
          variant="border"
          onClick={handleOperationButtonClick}
        >
          +
        </Button>

        <div className="col-span-3 row-span-4 grid grid-cols-3 grid-rows-4 gap-3">
          {DIGITS.map((digit, index) => (
            <Button
              onClick={handleDigitButtonClick}
              key={digit}
              variant="fill"
              className={index === 9 ? 'col-span-2' : ''}
            >
              {digit}
            </Button>
          ))}

          <Button aria-label="dot" variant="fill">
            .
          </Button>
        </div>

        <Button
          aria-label="minus"
          variant="border"
          onClick={handleOperationButtonClick}
        >
          -
        </Button>
        <Button
          aria-label="multiply"
          variant="border"
          onClick={handleOperationButtonClick}
        >
          *
        </Button>
        <Button
          aria-label="divide"
          variant="border"
          onClick={handleOperationButtonClick}
        >
          /
        </Button>
        <Button
          aria-label="equal"
          variant="border"
          onClick={handleEqualButtonClick}
        >
          =
        </Button>
      </div>
    </div>
  );
};

export default App;
