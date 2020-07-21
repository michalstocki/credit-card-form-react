const nonDigitRegex: RegExp = /[^\d]+/g;
const every4Digits: RegExp = /(\d{1,4})/g;

export function filterCardNumber(value: string): string {
  const digitsOnly: string = value.replace(nonDigitRegex, '');
  const first16digits: string = digitsOnly.slice(0, 16);
  const groupedBy4: RegExpMatchArray | null = first16digits.match(every4Digits);

  return (groupedBy4 || []).join(' ');
}
