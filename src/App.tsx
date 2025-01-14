import { MouseEvent, useState } from 'react';

import { performCalculation } from '@/utils';

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const App = () => {
  const [currentNumberStr, setCurrentNumberStr] = useState('');
  const [prevNumber, setPrevNumber] = useState<Nullable<number>>(null);
  const [lastOperation, setLastOperation] = useState('');

  const handleDigitButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (currentNumberStr.length < 8) {
      const newDigit = e.currentTarget.textContent;
      setCurrentNumberStr((dv) => `${dv}${newDigit}`);
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

    setCurrentNumberStr(result);
  };

  return (
    <>
      <input
        role="alert"
        type="text"
        value={currentNumberStr}
        readOnly
        aria-label="Calculator display"
      />
      {DIGITS.map((digit) => (
        <button type="button" onClick={handleDigitButtonClick} key={digit}>
          {digit}
        </button>
      ))}
      <button
        type="button"
        aria-label="plus"
        onClick={handleOperationButtonClick}
      >
        +
      </button>
      <button
        type="button"
        aria-label="minus"
        onClick={handleOperationButtonClick}
      >
        -
      </button>
      <button
        type="button"
        aria-label="divide"
        onClick={handleOperationButtonClick}
      >
        /
      </button>
      <button
        type="button"
        aria-label="multiply"
        onClick={handleOperationButtonClick}
      >
        *
      </button>
      <button type="button" aria-label="equal" onClick={handleEqualButtonClick}>
        =
      </button>
      <button type="button" aria-label="clear">
        C
      </button>
      <button type="button" aria-label="clear all">
        AC
      </button>
    </>
  );
};

export default App;
