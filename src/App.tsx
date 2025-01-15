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
      <button type="button" aria-label="clear" onClick={handleClearButtonClick}>
        C
      </button>
      <button
        type="button"
        aria-label="clear all"
        onClick={handleClearAllButtonClick}
      >
        AC
      </button>
      <button
        type="button"
        aria-label="change number's sign"
        onClick={handleChangeSignButtonClick}
      >
        +/-
      </button>
    </>
  );
};

export default App;
