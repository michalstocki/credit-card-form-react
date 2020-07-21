import React from 'react';
import Mastercard from './images/mastercard.svg';
import Unknown from './images/unknown.svg';
import Visa from './images/visa.svg';
import { IssuerName } from './IssuerName';
import './IssuerIcon.sass';

interface Props {
  name: IssuerName;
}

export function IssuerIcon({ name }: Props): JSX.Element {
  return <div className="credit-card-form__image">{getIconImage(name)}</div>;
}

function getIconImage(name: IssuerName): JSX.Element {
  switch (name) {
    case IssuerName.MASTERCARD:
      return <Mastercard />;
    case IssuerName.VISA:
      return <Visa />;
    default:
      return <Unknown />;
  }
}
