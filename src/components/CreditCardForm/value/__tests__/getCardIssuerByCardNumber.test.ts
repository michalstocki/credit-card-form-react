import { using } from '../../../../testUtils/using';
import { IssuerName } from '../../components/IssuerIcon/IssuerName';
import range from 'lodash.range';
import { getCardIssuerByCardNumber } from '../getCardIssuerByCardNumber';

describe('getCardIssuerByCardNumber', () => {
  const unknownCases: number[] = [
    1,
    2,
    3,
    5,
    6,
    7,
    8,
    9,
    39,
    50,
    56,
    2220,
    2721,
  ];

  using(unknownCases).describe('when number starts with', (input) => {
    it(input + ', returns Unknown', () => {
      expect(getCardIssuerByCardNumber(input.toString())).toEqual(
        IssuerName.UNKNOWN
      );
    });
  });

  const masterCardCases: number[] = [...range(51, 56), ...range(2221, 2721)];

  using(masterCardCases).describe('when number starts with', (input) => {
    it(input + ', returns MasterCard', () => {
      expect(getCardIssuerByCardNumber(input.toString())).toEqual(
        IssuerName.MASTERCARD
      );
    });
  });

  const visaCases: number[] = [...range(40, 50)];

  using(visaCases).describe('when number starts with', (input) => {
    it(input + ', returns Visa', () => {
      expect(getCardIssuerByCardNumber(input.toString())).toEqual(
        IssuerName.VISA
      );
    });
  });
});
