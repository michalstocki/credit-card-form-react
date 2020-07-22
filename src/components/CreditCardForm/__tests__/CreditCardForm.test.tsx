import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { CreditCardForm } from '../../../index';

describe('CreditCardForm', () => {
  it('renders Card Input', () => {
    const { getByPlaceholderText } = render(<CreditCardForm />);

    expect(getByPlaceholderText('Card number')).toBeInTheDocument();
  });

  it('renders expiry date input', () => {
    const { getByPlaceholderText } = render(<CreditCardForm />);

    expect(getByPlaceholderText('MM / YY')).toBeInTheDocument();
  });

  it('renders CVC code input', () => {
    const { getByPlaceholderText } = render(<CreditCardForm />);

    expect(getByPlaceholderText('CVC')).toBeInTheDocument();
  });

  describe('when typed 16 digits in card number input', () => {
    let cardInput: HTMLInputElement;
    let expiryInput: HTMLInputElement;

    beforeEach(() => {
      const { getByPlaceholderText } = render(<CreditCardForm />);

      cardInput = getByPlaceholderText('Card number') as HTMLInputElement;
      expiryInput = getByPlaceholderText('MM / YY') as HTMLInputElement;

      cardInput.focus();
      fireEvent.input(cardInput, {
        target: { value: '4444555522228888' },
      });
    });

    it('correctly formats the card number', async () => {
      await waitFor(() => {
        expect(cardInput.value).toEqual('4444 5555 2222 8888');
      });
    });

    it('moves focus to the expiry input', async () => {
      await waitFor(() => {
        expect(
          (document.activeElement as HTMLInputElement).placeholder
        ).toEqual('MM / YY');
      });
    });
  });
});
