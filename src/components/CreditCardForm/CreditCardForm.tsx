import React, { Dispatch, SetStateAction, useState } from 'react';
import { Input } from './components/Input/Input';
import { ProviderIcon } from './components/ProviderIcon/ProviderIcon';
import { ProviderName } from './components/ProviderIcon/ProviderName';
import './CreditCardForm.sass';
import { filterCardNumber } from './value/filterCardNumber';

export function CreditCardForm(): JSX.Element {
  const [cardNumber, setCardNumber] = useState<string>('');

  return (
    <div className="credit-card-form">
      <ProviderIcon name={ProviderName.UNKNOWN} />
      <Input
        onChange={filterValue(filterCardNumber, setCardNumber)}
        value={cardNumber}
        placeholder="Card number"
        className="credit-card-form__input-card-number"
      />
      <Input
        placeholder="MM / YY"
        className="credit-card-form__input-expiration"
      />
      <Input placeholder="CVC" className="credit-card-form__input-cvc" />
    </div>
  );
}

function filterValue<T>(
  valueFilter: (v: T) => T,
  setValue: Dispatch<SetStateAction<T>>
): (v: T) => void {
  return (newValue: T) => {
    setValue(valueFilter(newValue));
  };
}
