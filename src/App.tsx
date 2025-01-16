import { MouseEvent, useState } from 'react';

import { Button, Display } from '@/components';
import { SPECIAL_VALUES, isValidNumber, performCalculation } from '@/utils';

const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const App = () => {
  const [currentValue, setCurrentValue] = useState<string>(SPECIAL_VALUES.ZERO);
  const [prevValue, setPrevValue] = useState<string>('');
  const [lastOperation, setLastOperation] = useState('');

  const handleDigitButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    const newDigit = e.currentTarget.textContent ?? '';

    switch (currentValue) {
      case SPECIAL_VALUES.ERROR:
      case SPECIAL_VALUES.ZERO: {
        setCurrentValue(newDigit);
        return;
      }
      case SPECIAL_VALUES.NEGATIVE_ZERO: {
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

    setCurrentValue(SPECIAL_VALUES.ZERO);
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
    if (currentValue !== SPECIAL_VALUES.ZERO) {
      setCurrentValue(SPECIAL_VALUES.ZERO);
    } else if (lastOperation !== '') {
      setCurrentValue(prevValue);
      setLastOperation('');
    } else {
      setCurrentValue(SPECIAL_VALUES.ZERO);
    }
  };

  const handleClearAllButtonClick = () => {
    setCurrentValue(SPECIAL_VALUES.ZERO);
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
    if (!currentValue.includes('.') && currentValue !== SPECIAL_VALUES.ERROR) {
      setCurrentValue((cv) => `${cv}.`);
    }
  };

  const operationButtonsMetadata = [
    {
      label: "change number's sign",
      symbol: '+/-',
      handleClick: handleChangeSignButtonClick,
    },
    {
      label: 'clear all',
      symbol: 'AC',
      handleClick: handleClearAllButtonClick,
    },
    {
      label: 'clear',
      symbol: 'C',
      handleClick: handleClearButtonClick,
    },
    {
      label: 'plus',
      symbol: '+',
      handleClick: handleOperationButtonClick,
    },
    {
      label: 'minus',
      symbol: '-',
      handleClick: handleOperationButtonClick,
    },
    {
      label: 'multiply',
      symbol: '*',
      handleClick: handleOperationButtonClick,
    },
    {
      label: 'divide',
      symbol: '/',
      handleClick: handleOperationButtonClick,
    },
    {
      label: 'equal',
      symbol: '=',
      handleClick: handleEqualButtonClick,
    },
  ];

  return (
    <div className="m-auto max-w-5xl p-3">
      <Display value={currentValue} />

      <div className="grid grid-cols-4 grid-rows-5 gap-3">
        {operationButtonsMetadata
          .slice(0, 4)
          .map(({ label, symbol, handleClick }) => (
            <Button
              aria-label={label}
              variant="border"
              onClick={handleClick}
              key={label}
            >
              {symbol}
            </Button>
          ))}

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

        {operationButtonsMetadata
          .slice(4)
          .map(({ label, symbol, handleClick }) => (
            <Button
              aria-label={label}
              variant="border"
              onClick={handleClick}
              key={label}
            >
              {symbol}
            </Button>
          ))}
      </div>
    </div>
  );
};

export default App;
