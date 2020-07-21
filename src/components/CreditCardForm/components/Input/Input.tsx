import React, { useCallback } from 'react';
import cx from 'classnames';
import './Input.sass';

export interface Props {
  onChange?: (newVal: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
  value?: string;
}

export function Input({
  onChange = (value: string) => {},
  value,
  placeholder,
  autoFocus,
  className = '',
}: Props): JSX.Element {
  const changeHandler = useCallback((event) => onChange(event.target.value), [
    onChange,
  ]);
  return (
    <input
      className={cx('credit-card-form__input', className)}
      type="text"
      value={value}
      onChange={changeHandler}
      placeholder={placeholder}
      autoFocus={autoFocus}
    />
  );
}
