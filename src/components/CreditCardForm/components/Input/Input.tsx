import cx from 'classnames';
import React, { Ref, useCallback, useEffect, useRef } from 'react';
import './Input.sass';

export const INPUT_CLASS = 'credit-card-form__input';
export const INPUT_ERROR_CLASS = 'credit-card-form__input--error';

export interface Props {
  onChange?: (newVal: string) => void;
  placeholder?: string;
  className?: string;
  value?: string;
  errorMessage?: string;
  name: string;
  ref?: Ref<HTMLInputElement>;
  initFocus?: boolean;
  onFocus?: () => void;
}

export function Input({
  onChange = () => {},
  value,
  placeholder,
  className = '',
  errorMessage,
  name,
  initFocus,
  onFocus = () => {},
}: Props): JSX.Element {
  const changeHandler = useCallback((event) => onChange(event.target.value), [
    onChange,
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (
      initFocus &&
      inputRef.current &&
      inputRef.current !== document.activeElement
    ) {
      inputRef.current.focus();
    }
  });

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
      name={name}
      ref={inputRef}
      onFocus={onFocus}
    />
  );
}
