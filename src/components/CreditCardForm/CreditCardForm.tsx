import React, { Dispatch, SetStateAction, useState } from 'react';
import { Input } from './components/Input/Input';
import { IssuerIcon } from './components/IssuerIcon/IssuerIcon';
import './CreditCardForm.sass';
import { filterCardNumber } from './value/filterCardNumber';
import { filterCVC } from './value/filterCVC';
import { filterExpiration } from './value/filterExpiration';
import { getCardIssuerByCardNumber } from './value/getCardIssuerByCardNumber';
import { validateExpiry } from './value/validateExpiry';

export const CARD_INPUT_CLASS = 'credit-card-form__input-card-number';
export const EXPIRY_INPUT_CLASS = 'credit-card-form__input-expiration';
export const CVC_INPUT_CLASS = 'credit-card-form__input-cvc';

export function CreditCardForm(): JSX.Element {
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expiration, setExpiration] = useState<string>('');
  const [cvc, setCVC] = useState<string>('');

  return (
    <div className="credit-card-form">
      <IssuerIcon name={getCardIssuerByCardNumber(cardNumber)} />
      <Input
        onChange={filterValue(filterCardNumber, setCardNumber)}
        value={cardNumber}
        placeholder="Card number"
        className={CARD_INPUT_CLASS}
      />
      <Input
        onChange={filterValue(filterExpiration, setExpiration)}
        errorMessage={validateExpiry(expiration)}
        value={expiration}
        placeholder="MM / YY"
        className={EXPIRY_INPUT_CLASS}
      />
      <Input
        onChange={filterValue(filterCVC, setCVC)}
        value={cvc}
        placeholder="CVC"
        className={CVC_INPUT_CLASS}
      />
    </div>
  );
}

function filterValue<T>(
  valueFilter: (v: T, prevValue: T) => T,
  setValue: Dispatch<SetStateAction<T>>
): (v: T) => void {
  return (newValue: T) => {
    setValue((prevValue) => {
      return valueFilter(newValue, prevValue);
    });
  };
}
