import React from 'react';
import Mastercard from './images/mastercard.svg';
import Unknown from './images/unknown.svg';
import Visa from './images/visa.svg';
import { ProviderName } from './ProviderName';
import './ProviderIcon.sass';

interface Props {
  name: ProviderName;
}

export function ProviderIcon({ name }: Props): JSX.Element {
  return <div className="credit-card-form__image">{getIconImage(name)}</div>;
}

function getIconImage(name: ProviderName): JSX.Element {
  switch (name) {
    case ProviderName.MASTERCARD:
      return <Mastercard />;
    case ProviderName.VISA:
      return <Visa />;
    default:
      return <Unknown />;
  }
}
