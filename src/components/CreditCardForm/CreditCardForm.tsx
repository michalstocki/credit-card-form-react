import React, { Dispatch, SetStateAction, useState } from 'react';
import { Input } from './components/Input/Input';
import { IssuerIcon } from './components/IssuerIcon/IssuerIcon';
import './CreditCardForm.sass';
import { filterCardNumber } from './value/filterCardNumber';
import { filterCVC } from './value/filterCVC';
import { filterExpiration } from './value/filterExpiration';
import { getCardIssuerByCardNumber } from './value/getCardIssuerByCardNumber';

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
        className="credit-card-form__input-card-number"
      />
      <Input
        onChange={filterValue(filterExpiration, setExpiration)}
        value={expiration}
        placeholder="MM / YY"
        className="credit-card-form__input-expiration"
      />
      <Input
        onChange={filterValue(filterCVC, setCVC)}
        value={cvc}
        placeholder="CVC"
        className="credit-card-form__input-cvc"
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
