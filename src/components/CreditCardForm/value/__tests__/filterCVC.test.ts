import { using } from '../../../../testUtils/using';
import { filterCVC } from '../filterCVC';

describe('filterCVC', () => {
  interface Case {
    caseName: string;
    input: string;
    expectedOutput: string;
  }

  const cases: Case[] = [
    {
      caseName: 'empty string remains unchanged',
      input: '',
      expectedOutput: '',
    },
    {
      caseName: 'contains less than 3 digits, does not change the input',
      input: '01',
      expectedOutput: '01',
    },
    {
      caseName: 'contains more than 3 digits, remove the additional digits',
      input: '1234',
      expectedOutput: '123',
    },
    {
      caseName:
        'contains non-digit signs, removes non-digit signs before removing additional chars',
      input: '1e 23',
      expectedOutput: '123',
    },
  ];

  using(cases).describe('when input', ({ caseName, input, expectedOutput }) => {
    it(caseName, () => {
      expect(filterCVC(input)).toEqual(expectedOutput);
    });
  });
});
