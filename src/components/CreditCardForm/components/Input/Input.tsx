import cx from 'classnames';
import React, { useCallback } from 'react';
import './Input.sass';

export const INPUT_CLASS = 'credit-card-form__input';
export const INPUT_ERROR_CLASS = 'credit-card-form__input--error';

export interface Props {
  onChange?: (newVal: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
  value?: string;
  errorMessage?: string;
}

export function Input({
  onChange = (value: string) => {},
  value,
  placeholder,
  autoFocus,
  className = '',
  errorMessage,
}: Props): JSX.Element {
  const changeHandler = useCallback((event) => onChange(event.target.value), [
    onChange,
  ]);

  const classNames = cx(INPUT_CLASS, className, {
    [INPUT_ERROR_CLASS]: !!errorMessage,
  });

  return (
    <input
      className={classNames}
      title={errorMessage}
      type="text"
      value={value}
      onChange={changeHandler}
      placeholder={placeholder}
      autoFocus={autoFocus}
    />
  );
}
