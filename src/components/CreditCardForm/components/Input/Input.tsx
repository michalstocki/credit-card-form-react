import React, { useCallback } from 'react';
import cx from 'classnames';
import './Input.sass';

export interface Props {
  onChange?: (newVal: string) => void;
  width?: string;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
}

export function Input({
  onChange = () => {},
  placeholder,
  autoFocus,
  className = '',
  width = '',
}: Props): JSX.Element {
  const changeHandler = useCallback((event) => onChange(event.target.value), [
    onChange,
  ]);
  return (
    <input
      className={cx('credit-card-form__input', className)}
      type="text"
      onChange={changeHandler}
      placeholder={placeholder}
      autoFocus={autoFocus}
      style={{ width: `${width}px` }}
    />
  );
}
