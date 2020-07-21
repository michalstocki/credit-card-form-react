import { IssuerName } from '../components/IssuerIcon/IssuerName';

export function getCardIssuerByCardNumber(cardNumber: string): IssuerName {
  const firstDigit: number = parseInt(cardNumber[0], 10);
  const firstTwo: number = parseInt(cardNumber.substr(0, 2), 10);
  const firstFour: number = parseInt(cardNumber.substr(0, 4), 10);

  if (firstDigit === 4) {
    return IssuerName.VISA;
  }

  if (firstTwo >= 51 && firstTwo <= 55) {
    return IssuerName.MASTERCARD;
  }

  if (firstFour >= 2221 && firstFour <= 2720) {
    return IssuerName.MASTERCARD;
  }

  return IssuerName.UNKNOWN;
}
