const nonDigitRegex: RegExp = /[^\d]+/g;

export function filterExpiration(
  expiration: string,
  previousValue: string
): string {
  const digitsOnly: string = expiration.replace(nonDigitRegex, '');
  const deletedToMonthOnly =
    digitsOnly.length == 2 && previousValue.length > expiration.length;

  if (digitsOnly.length < 2 || deletedToMonthOnly) {
    return digitsOnly;
  }

  return `${digitsOnly.substr(0, 2)} / ${digitsOnly.substr(2, 2)}`;
}
