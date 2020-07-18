import React from 'react';
import { Input } from './components/Input/Input';
import { ProviderIcon } from './components/ProviderIcon/ProviderIcon';
import { ProviderName } from './components/ProviderIcon/ProviderName';
import './CreditCardForm.sass';

export function CreditCardForm(): JSX.Element {
  return (
    <div className="credit-card-form">
      <ProviderIcon name={ProviderName.UNKNOWN} />
      <Input
        placeholder="Card Number"
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
