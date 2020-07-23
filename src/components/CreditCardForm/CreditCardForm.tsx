import React, { useCallback, useState } from 'react';
import { Input } from './components/Input/Input';
import { IssuerIcon } from './components/IssuerIcon/IssuerIcon';
import './CreditCardForm.sass';
import { filterCardNumber } from './value/filterCardNumber';
import { filterCVC } from './value/filterCVC';
import { filterExpiration } from './value/filterExpiration';
import { getCardIssuerByCardNumber } from './value/getCardIssuerByCardNumber';
import { getExpiryValidationError } from './value/getExpiryValidationError';

export const CARD_INPUT_CLASS = 'credit-card-form__input-card-number';
export const EXPIRY_INPUT_CLASS = 'credit-card-form__input-expiration';
export const CVC_INPUT_CLASS = 'credit-card-form__input-cvc';

enum InputName {
  CARD_NUMBER = 'cardNumber',
  EXPIRY = 'expiry',
  CVC = 'cvc',
}

export function CreditCardForm(): JSX.Element {
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expiration, setExpiration] = useState<string>('');
  const [cvc, setCVC] = useState<string>('');
  const [pendingFocusInit, setPendingFocusInit] = useState<
    InputName | undefined
  >(InputName.CARD_NUMBER);

  const resetPendingFocusInit = useCallback(() => {
    setPendingFocusInit(undefined);
  }, [setPendingFocusInit]);

  const handleCardNumberChange = useCallback(
    (newVal) => {
      const formattedValue = filterCardNumber(newVal);
      setCardNumber((prevVal) => {
        if (formattedValue.length === 19 && prevVal.length < 19) {
          setPendingFocusInit(InputName.EXPIRY);
        }

        return formattedValue;
      });
    },
    [setCardNumber, setPendingFocusInit]
  );

  const handleExpiryChange = useCallback(
    (newVal) => {
      setExpiration((prevVal) => {
        const formattedValue = filterExpiration(newVal, prevVal);
        if (
          formattedValue.length === 7 &&
          prevVal.length < 7 &&
          !getExpiryValidationError(formattedValue)
        ) {
          setPendingFocusInit(InputName.CVC);
        }

        return formattedValue;
      });
    },
    [setExpiration, setPendingFocusInit]
  );

  const handleCVCChange = useCallback(
    (newVal) => {
      setCVC(filterCVC(newVal));
    },
    [setCVC]
  );

  return (
    <div className="credit-card-form">
      <IssuerIcon name={getCardIssuerByCardNumber(cardNumber)} />
      <Input
        onChange={handleCardNumberChange}
        value={cardNumber}
        placeholder="Card number"
        className={CARD_INPUT_CLASS}
        name={InputName.CARD_NUMBER}
        initFocus={pendingFocusInit === InputName.CARD_NUMBER}
        onFocus={resetPendingFocusInit}
      />
      <Input
        onChange={handleExpiryChange}
        errorMessage={getExpiryValidationError(expiration)}
        value={expiration}
        placeholder="MM / YY"
        className={EXPIRY_INPUT_CLASS}
        name={InputName.EXPIRY}
        initFocus={pendingFocusInit === InputName.EXPIRY}
        onFocus={resetPendingFocusInit}
      />
      <Input
        onChange={handleCVCChange}
        value={cvc}
        placeholder="CVC"
        className={CVC_INPUT_CLASS}
        name={InputName.CVC}
        initFocus={pendingFocusInit === InputName.CVC}
        onFocus={resetPendingFocusInit}
      />
    </div>
  );
}
