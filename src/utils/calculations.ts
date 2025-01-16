import { DECIMAL_PART_LIMIT } from '@/utils/consts';

export const performCalculation = (
  firstNumber: string | number,
  secondNumber: string | number,
  operator: string,
): string => {
  let result: number;

  switch (operator) {
    case '+': {
      result = Number(firstNumber) + Number(secondNumber);
      break;
    }
    case '-': {
      result = Number(firstNumber) - Number(secondNumber);
      break;
    }
    case '*': {
      result = Number(firstNumber) * Number(secondNumber);
      break;
    }
    case '/': {
      result = Number(firstNumber) / Number(secondNumber);
      break;
    }
    default: {
      throw new Error('Unknown operation');
    }
  }

  return String(Number(result.toFixed(DECIMAL_PART_LIMIT)));
};
