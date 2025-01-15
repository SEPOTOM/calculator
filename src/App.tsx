import { MouseEvent, useState } from 'react';

import clsx from 'clsx';

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
        <button
          type="button"
          aria-label="change number's sign"
          onClick={handleChangeSignButtonClick}
          className="h-16 rounded-md border-4 border-main font-mono text-3xl font-black text-main"
        >
          +/-
        </button>
        <button
          type="button"
          aria-label="clear all"
          onClick={handleClearAllButtonClick}
          className="h-16 rounded-md border-4 border-main font-mono text-3xl font-black text-main"
        >
          AC
        </button>
        <button
          type="button"
          aria-label="clear"
          onClick={handleClearButtonClick}
          className="h-16 rounded-md border-4 border-main font-mono text-3xl font-black text-main"
        >
          C
        </button>
        <button
          type="button"
          aria-label="plus"
          onClick={handleOperationButtonClick}
          className="h-16 rounded-md border-4 border-main font-mono text-3xl font-black text-main"
        >
          +
        </button>

        <div className="col-span-3 row-span-4 grid grid-cols-3 grid-rows-4 gap-3">
          {DIGITS.map((digit, index) => (
            <button
              type="button"
              onClick={handleDigitButtonClick}
              key={digit}
              className={clsx(
                'h-16 rounded-md bg-main font-mono text-3xl text-secondary',
                index === 9 && 'col-span-2',
              )}
            >
              {digit}
            </button>
          ))}

          <button
            type="button"
            aria-label="dot"
            className="h-16 rounded-md bg-main font-mono text-3xl text-secondary"
          >
            .
          </button>
        </div>

        <button
          type="button"
          aria-label="minus"
          onClick={handleOperationButtonClick}
          className="h-16 rounded-md border-4 border-main font-mono text-3xl font-black text-main"
        >
          -
        </button>
        <button
          type="button"
          aria-label="multiply"
          onClick={handleOperationButtonClick}
          className="h-16 rounded-md border-4 border-main font-mono text-3xl font-black text-main"
        >
          *
        </button>
        <button
          type="button"
          aria-label="divide"
          onClick={handleOperationButtonClick}
          className="h-16 rounded-md border-4 border-main font-mono text-3xl font-black text-main"
        >
          /
        </button>
        <button
          type="button"
          aria-label="equal"
          onClick={handleEqualButtonClick}
          className="h-16 rounded-md border-4 border-main font-mono text-3xl font-black text-main"
        >
          =
        </button>
      </div>
    </div>
  );
};

export default App;
