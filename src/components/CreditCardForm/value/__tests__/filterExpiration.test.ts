import { using } from '../../../../testUtils/using';
import { filterExpiration } from '../filterExpiration';

describe('filterExpiration', () => {
  interface Case {
    caseName: string;
    input: string;
    previousValue: string;
    expectedOutput: string;
  }

  const cases: Case[] = [
    {
      caseName: 'empty string remains unchanged',
      input: '',
      previousValue: '',
      expectedOutput: '',
    },
    {
      caseName: 'contains less than 2 numbers, does not change the input',
      input: '0',
      previousValue: '',
      expectedOutput: '0',
    },
    {
      caseName:
        'contains 2 numbers, adds slash and space after the two numbers',
      input: '12',
      previousValue: '1',
      expectedOutput: '12 / ',
    },
    {
      caseName:
        'contains 2 numbers, but previous input were longer, do not add slash and space after the two numbers',
      input: '12 / ',
      previousValue: '12 / 4',
      expectedOutput: '12',
    },
    {
      caseName:
        'contains more than 2 numbers, adds slash after the first two numbers',
      input: '123',
      previousValue: '',
      expectedOutput: '12 / 3',
    },
    {
      caseName:
        'contains non-digit signs, removes non-digit signs before adding slash',
      input: '1e 234',
      previousValue: '',
      expectedOutput: '12 / 34',
    },
    {
      caseName: 'contains more than 4 digits, removes the additional digits',
      input: '4ee42143333',
      previousValue: '',
      expectedOutput: '44 / 21',
    },
  ];

  using(cases).describe(
    'when input',
    ({ caseName, input, previousValue, expectedOutput }) => {
      it(caseName, () => {
        expect(filterExpiration(input, previousValue)).toEqual(expectedOutput);
      });
    }
  );
});
