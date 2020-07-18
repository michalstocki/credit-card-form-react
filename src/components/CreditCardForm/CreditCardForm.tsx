import React from 'react';
import { ProviderIcon } from './components/ProviderIcon/ProviderIcon';
import { ProviderName } from './components/ProviderIcon/ProviderName';
import './styles.sass';

export function CreditCardForm(): JSX.Element {
  return (
    <div className="credit-card-form">
      <ProviderIcon name={ProviderName.MASTERCARD} />
      Hello World!
    </div>
  );
}
