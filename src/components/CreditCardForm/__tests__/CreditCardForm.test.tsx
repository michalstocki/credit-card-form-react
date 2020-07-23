import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { CreditCardForm } from '../../../index';
import { INPUT_ERROR_CLASS } from '../components/Input/Input';
import {
  CARD_NUMBER_PLACEHOLDER,
  CVC_PLACEHOLDER,
  EXPIRY_PLACEHOLDER,
} from '../CreditCardForm';

describe('CreditCardForm', () => {
  it('renders Card Input', () => {
    const { getByPlaceholderText } = render(<CreditCardForm />);

    expect(getByPlaceholderText(CARD_NUMBER_PLACEHOLDER)).toBeInTheDocument();
  });

  it('renders expiry date input', () => {
    const { getByPlaceholderText } = render(<CreditCardForm />);

    expect(getByPlaceholderText(EXPIRY_PLACEHOLDER)).toBeInTheDocument();
  });

  it('renders CVC code input', () => {
    const { getByPlaceholderText } = render(<CreditCardForm />);

    expect(getByPlaceholderText(CVC_PLACEHOLDER)).toBeInTheDocument();
  });

  describe('when typed 16 digits in card number input', () => {
    let cardInput: HTMLInputElement;
    let expiryInput: HTMLInputElement;

    beforeEach(() => {
      const { getByPlaceholderText } = render(<CreditCardForm />);

      cardInput = getByPlaceholderText(
        CARD_NUMBER_PLACEHOLDER
      ) as HTMLInputElement;
      expiryInput = getByPlaceholderText(
        EXPIRY_PLACEHOLDER
      ) as HTMLInputElement;

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
        ).toEqual(EXPIRY_PLACEHOLDER);
      });
    });
  });

  describe('when typed past expiration date in expiry input', () => {
    let expiryInput: HTMLInputElement;
    let cvcInput: HTMLInputElement;

    beforeEach(() => {
      const { getByPlaceholderText } = render(<CreditCardForm />);

      expiryInput = getByPlaceholderText(
        EXPIRY_PLACEHOLDER
      ) as HTMLInputElement;
      cvcInput = getByPlaceholderText(CVC_PLACEHOLDER) as HTMLInputElement;

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
        ).toEqual(EXPIRY_PLACEHOLDER);
      });
    });
  });

  describe('when typed correct expiration date in expiry input', () => {
    let expiryInput: HTMLInputElement;
    let cvcInput: HTMLInputElement;

    beforeEach(() => {
      const { getByPlaceholderText } = render(<CreditCardForm />);

      expiryInput = getByPlaceholderText(
        EXPIRY_PLACEHOLDER
      ) as HTMLInputElement;
      cvcInput = getByPlaceholderText(CVC_PLACEHOLDER) as HTMLInputElement;

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
        ).toEqual(CVC_PLACEHOLDER);
      });
    });
  });

  describe('when cleared the CVC field', () => {
    let expiryInput: HTMLInputElement;
    let cvcInput: HTMLInputElement;

    beforeEach(() => {
      const { getByPlaceholderText } = render(<CreditCardForm />);

      expiryInput = getByPlaceholderText(
        EXPIRY_PLACEHOLDER
      ) as HTMLInputElement;
      cvcInput = getByPlaceholderText(CVC_PLACEHOLDER) as HTMLInputElement;

      cvcInput.focus();
      fireEvent.input(cvcInput, {
        target: { value: '33' },
      });
      fireEvent.input(cvcInput, {
        target: { value: '' },
      });
    });

    it('moves focus to the expiry field', async () => {
      await waitFor(() => {
        expect(
          (document.activeElement as HTMLInputElement).placeholder
        ).toEqual(EXPIRY_PLACEHOLDER);
      });
    });
  });

  describe('when cleared the expiry field', () => {
    let cardInput: HTMLInputElement;
    let expiryInput: HTMLInputElement;

    beforeEach(() => {
      const { getByPlaceholderText } = render(<CreditCardForm />);

      cardInput = getByPlaceholderText(
        CARD_NUMBER_PLACEHOLDER
      ) as HTMLInputElement;
      expiryInput = getByPlaceholderText(
        EXPIRY_PLACEHOLDER
      ) as HTMLInputElement;

      expiryInput.focus();
      fireEvent.input(expiryInput, {
        target: { value: '12' },
      });
      fireEvent.input(expiryInput, {
        target: { value: '' },
      });
    });

    it('moves focus to the card number field', async () => {
      await waitFor(() => {
        expect(
          (document.activeElement as HTMLInputElement).placeholder
        ).toEqual(CARD_NUMBER_PLACEHOLDER);
      });
    });
  });
});
