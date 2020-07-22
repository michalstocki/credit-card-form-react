const nonDigitRegex: RegExp = /[^\d]+/g;

export function filterCVC(value: string): string {
  const digitsOnly: string = value.replace(nonDigitRegex, '');
  return digitsOnly.substr(0, 3);
}
