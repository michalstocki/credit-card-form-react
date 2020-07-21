import moment from 'moment';

export function validateExpiry(expiryValue: string): string | undefined {
  const [montString, yearString] = expiryValue.split(' / ');

  if (montString.length < 2 || !yearString || yearString.length < 2) {
    return;
  }
  const givenDate: moment.Moment = moment(expiryValue, 'MM / YY').startOf(
    'month'
  );

  if (!givenDate.isValid()) {
    return 'It seems that you put incorrect month number';
  }

  if (givenDate.isBefore(moment())) {
    return 'Your card has expired';
  }

  if (givenDate.isAfter(moment().add(20, 'years'))) {
    return "It seems that you put incorrect expiry date – it's more than 20 years from now";
  }

  return;
}
