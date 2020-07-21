import { using } from '../../../../testUtils/using';
import { filterCardNumber } from '../filterCardNumber';

describe('filterCardNumber', () => {
  interface Case {
    caseName: string;
    input: string;
    expectedOutput: string;
  }

  const cases: Case[] = [
    {
      caseName: 'contains less than 3 numbers, does not change the input',
      input: '0123',
      expectedOutput: '0123',
    },
    {
      caseName:
        'contains more than 3 numbers, adds single space after every 4 numbers',
      input: '123456789',
      expectedOutput: '1234 5678 9',
    },
    {
      caseName:
        'contains non-digit signs, removes non-digit signs before adding spaces',
      input: '1e 23rhj/456789',
      expectedOutput: '1234 5678 9',
    },
    {
      caseName: 'contains more than 16 digits, removes the additional digits',
      input: '4ee4443333222211115555',
      expectedOutput: '4444 3333 2222 1111',
    },
    {
      caseName: 'empty string remains unchanged',
      input: '',
      expectedOutput: '',
    },
  ];

  using(cases).describe('when input', ({ caseName, input, expectedOutput }) => {
    it(caseName, () => {
      expect(filterCardNumber(input)).toEqual(expectedOutput);
    });
  });
});
