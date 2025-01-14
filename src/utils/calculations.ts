export const performCalculation = (
  firstNumber: string | number,
  secondNumber: string | number,
  operator: string,
): string => {
  switch (operator) {
    case '+': {
      return `${Number(firstNumber) + Number(secondNumber)}`;
      break;
    }
    case '-': {
      return `${Number(firstNumber) - Number(secondNumber)}`;
      break;
    }
    case '*': {
      return `${Number(firstNumber) * Number(secondNumber)}`;
      break;
    }
    case '/': {
      return `${Number(firstNumber) / Number(secondNumber)}`;
      break;
    }
    default: {
      throw new Error('Unknown operation');
    }
  }
};
