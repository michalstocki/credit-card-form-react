import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { CreditCardForm } from '../../../index';
import { INPUT_ERROR_CLASS } from '../components/Input/Input';

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

  describe('when typed past expiration date in expiry input', () => {
    let expiryInput: HTMLInputElement;
    let cvcInput: HTMLInputElement;

    beforeEach(() => {
      const { getByPlaceholderText } = render(<CreditCardForm />);

      expiryInput = getByPlaceholderText('MM / YY') as HTMLInputElement;
      cvcInput = getByPlaceholderText('CVC') as HTMLInputElement;

      expiryInput.focus();
      fireEvent.input(expiryInput, {
        target: { value: '1211' },
      });
    });

    it('correctly formats the expiry date', async () => {
      await waitFor(() => {
        expect(expiryInput.value).toEqual('12 / 11');
      });
    });

    it('colors the input text', () => {
      expect(expiryInput).toHaveClass(INPUT_ERROR_CLASS);
    });

    it('provides error message as an input title', () => {
      expect(expiryInput).toHaveAttribute('title', 'Your card has expired');
    });

    it("doesn't move focus to the next input", async () => {
      await waitFor(() => {
        expect(
          (document.activeElement as HTMLInputElement).placeholder
        ).toEqual('MM / YY');
      });
    });
  });

  describe('when typed correct expiration date in expiry input', () => {
    let expiryInput: HTMLInputElement;
    let cvcInput: HTMLInputElement;

    beforeEach(() => {
      const { getByPlaceholderText } = render(<CreditCardForm />);

      expiryInput = getByPlaceholderText('MM / YY') as HTMLInputElement;
      cvcInput = getByPlaceholderText('CVC') as HTMLInputElement;

      expiryInput.focus();
      fireEvent.input(expiryInput, {
        target: { value: '0530' },
      });
    });

    it('correctly formats the expiry date', async () => {
      await waitFor(() => {
        expect(expiryInput.value).toEqual('05 / 30');
      });
    });

    it("doesn't change color the input text", async () => {
      expect(expiryInput).not.toHaveClass(INPUT_ERROR_CLASS);
    });

    it("doesn't set any title attribute", () => {
      expect(expiryInput).not.toHaveAttribute('title', expect.any(String));
    });

    it('moves focus to the next input', async () => {
      await waitFor(() => {
        expect(
          (document.activeElement as HTMLInputElement).placeholder
        ).toEqual('CVC');
      });
    });
  });
});
