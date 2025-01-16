import { MouseEvent, useState } from 'react';

import { Button } from '@/components';
import { isValidNumber, performCalculation } from '@/utils';

const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const App = () => {
  const [currentValue, setCurrentValue] = useState<string>('0');
  const [prevValue, setPrevValue] = useState<string>('');
  const [lastOperation, setLastOperation] = useState('');

  const handleDigitButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    const newDigit = e.currentTarget.textContent ?? '';

    switch (currentValue) {
      case '0': {
        setCurrentValue(newDigit);
        return;
      }
      case '-0': {
        setCurrentValue(`-${newDigit}`);
        return;
      }
    }

    const newValue = `${currentValue}${newDigit}`;

    if (isValidNumber(newValue)) {
      setCurrentValue(newValue);
    }
  };

  const handleOperationButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (lastOperation && prevValue !== '') {
      const result = performCalculation(prevValue, currentValue, lastOperation);

      setPrevValue(result);
    } else {
      setPrevValue(currentValue);
    }

    setCurrentValue('0');
    setLastOperation(e.currentTarget.textContent ?? '');
  };

  const handleEqualButtonClick = () => {
    if (prevValue === '') {
      return;
    }

    const result = performCalculation(prevValue, currentValue, lastOperation);

    if (isValidNumber(result)) {
      setCurrentValue(result);
    } else {
      setCurrentValue('ERR');
    }

    setLastOperation('');
  };

  const handleClearButtonClick = () => {
    if (lastOperation !== '') {
      setCurrentValue(prevValue);
      setLastOperation('');
    } else {
      setCurrentValue('0');
    }
  };

  const handleClearAllButtonClick = () => {
    setCurrentValue('0');
    setPrevValue('');
  };

  const handleChangeSignButtonClick = () => {
    const currentValueNum = Number(currentValue);
    const absCurrentNumber = Math.abs(currentValueNum);

    if (Object.is(absCurrentNumber, currentValueNum)) {
      setCurrentValue(`-${absCurrentNumber}`);
    } else {
      setCurrentValue(`${absCurrentNumber}`);
    }
  };

  const handleDotButtonClick = () => {
    if (!currentValue.includes('.')) {
      setCurrentValue((cv) => `${cv}.`);
    }
  };

  return (
    <div className="m-auto max-w-5xl p-3">
      <input
        role="alert"
        type="text"
        value={currentValue}
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

          <Button
            aria-label="dot"
            variant="fill"
            onClick={handleDotButtonClick}
          >
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
