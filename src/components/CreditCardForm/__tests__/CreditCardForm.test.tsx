import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import { CreditCardForm } from '../../../index';

describe('CreditCardForm', () => {
  it('renders Card Input', () => {
    const { getByPlaceholderText } = render(<CreditCardForm />);

    expect(getByPlaceholderText('Card Number')).toBeInTheDocument();
  });

  it('renders expiry date input', () => {
    const { getByPlaceholderText } = render(<CreditCardForm />);

    expect(getByPlaceholderText('MM / YY')).toBeInTheDocument();
  });

  it('renders CVC code input', () => {
    const { getByPlaceholderText } = render(<CreditCardForm />);

    expect(getByPlaceholderText('CVC')).toBeInTheDocument();
  });
});
