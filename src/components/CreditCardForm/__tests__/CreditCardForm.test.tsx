import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import { CreditCardForm } from '../../../index';

it('renders welcome message', () => {
  const { getByText } = render(<CreditCardForm />);

  expect(getByText('Hello World!')).toBeInTheDocument();
});
