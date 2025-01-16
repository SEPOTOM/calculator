import { DECIMAL_PART_LIMIT, INTEGER_PART_LIMIT } from '@/utils';

export const isValidNumber = (number: string | number): boolean => {
  const parsedNumber = String(number);
  const [integerPart, decimalPart, ...otherParts] = parsedNumber.split('.');

  const falseChecks = [
    otherParts.length !== 0,
    integerPart.length > INTEGER_PART_LIMIT,
    decimalPart && decimalPart.length > DECIMAL_PART_LIMIT,
  ];

  if (falseChecks.some((check) => check === true)) {
    return false;
  }

  return true;
};
