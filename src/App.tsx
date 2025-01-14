import { MouseEvent, useState } from 'react';

const App = () => {
  const [displayValue, setDisplayValue] = useState('');

  const handleDigitButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    setDisplayValue(e.currentTarget.textContent ?? '');
  };

  return (
    <>
      <input
        role="alert"
        type="text"
        value={displayValue}
        readOnly
        aria-label="Calculator display"
      />
      <button type="button" onClick={handleDigitButtonClick}>
        0
      </button>
      <button type="button" onClick={handleDigitButtonClick}>
        1
      </button>
      <button type="button" onClick={handleDigitButtonClick}>
        2
      </button>
      <button type="button" onClick={handleDigitButtonClick}>
        3
      </button>
      <button type="button" onClick={handleDigitButtonClick}>
        4
      </button>
      <button type="button" onClick={handleDigitButtonClick}>
        5
      </button>
      <button type="button" onClick={handleDigitButtonClick}>
        6
      </button>
      <button type="button" onClick={handleDigitButtonClick}>
        7
      </button>
      <button type="button" onClick={handleDigitButtonClick}>
        8
      </button>
      <button type="button" onClick={handleDigitButtonClick}>
        9
      </button>
      <button type="button" aria-label="plus">
        +
      </button>
      <button type="button" aria-label="minus">
        -
      </button>
      <button type="button" aria-label="divide">
        /
      </button>
      <button type="button" aria-label="multiply">
        *
      </button>
      <button type="button" aria-label="equal">
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
