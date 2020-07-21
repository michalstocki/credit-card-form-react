import { using } from '../../../../testUtils/using';
import { validateExpiry } from '../validateExpiry';

describe('validateExpiry', () => {
  interface Case {
    caseName: string;
    input: string;
    expectedOutput: string | undefined;
  }

  const now: Date = new Date();

  const cases: Case[] = [
    {
      caseName: 'not a correct MM / YY format',
      input: '40',
      expectedOutput: undefined,
    },
    {
      caseName: 'not a correct MM / YY format',
      input: '03 / ',
      expectedOutput: undefined,
    },
    {
      caseName: 'not a date in MM / YY format',
      input: '44 / 20',
      expectedOutput: 'It seems that you put incorrect month number',
    },
    {
      caseName: 'a date from the past',
      input: `${twoDigitMonthNumber(now.getMonth() - 1)} / ${lastTwoDigits(
        now.getFullYear()
      )}`,
      expectedOutput: 'Your card has expired',
    },
    {
      caseName: 'a current month',
      input: `${twoDigitMonthNumber(now.getMonth())} / ${lastTwoDigits(
        now.getFullYear()
      )}`,
      expectedOutput: 'Your card has expired',
    },
    {
      caseName: 'a next month',
      input: `${twoDigitMonthNumber(now.getMonth() + 1)} / ${lastTwoDigits(
        now.getFullYear()
      )}`,
      expectedOutput: undefined,
    },
    {
      caseName: '20 years from now in the future',
      input: `${twoDigitMonthNumber(now.getMonth())} / ${lastTwoDigits(
        now.getFullYear() + 20
      )}`,
      expectedOutput: undefined,
    },
    {
      caseName: '20 years and 1 month from now in the future',
      input: `${twoDigitMonthNumber(now.getMonth() + 1)} / ${lastTwoDigits(
        now.getFullYear() + 20
      )}`,
      expectedOutput:
        "It seems that you put incorrect expiry date – it's more than 20 years from now",
    },
  ];

  using(cases).describe('when input', ({ caseName, input, expectedOutput }) => {
    it(`is ${input} – ${caseName}`, () => {
      expect(validateExpiry(input)).toEqual(expectedOutput);
    });
  });
});

function lastTwoDigits(year: number): string {
  return year.toString().substr(2, 2);
}

function twoDigitMonthNumber(monthIndex: number): string {
  const montNumber: number = monthIndex + 1;
  if (montNumber < 10) {
    return `0${montNumber}`;
  }

  return montNumber.toString();
}
