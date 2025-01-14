import React, { useMemo, ChangeEvent } from 'react';
import { debounce } from "../../utils/debounce"; // Adjust the relative path accordingly
import './input-styles.css';
import {InputComponentProps} from "../types.ts";

/**
 * A reusable React input component with debounce functionality,
 * customizable attributes, and support for labels, required fields,
 * and custom styles.
 */
const InputComponent: React.FC<InputComponentProps> = (
  {
    label,
    name,
    type = 'text',
    value,
    placeholder = '',
    onChange,
    onBlur,
    error,
    required = false,
    disabled = false,
    className = '',
    inputClass,
    debounceDelay, // Optional debounce delay in milliseconds
    isLoading = false, // Use isLoading to disable input and show a loader
  }: InputComponentProps
) => {
  // Memoize the debounced onChange function to prevent re-creating it on every render
  const debouncedOnChange = useMemo(() => {
    if (debounceDelay && onChange) {
      return debounce(onChange, debounceDelay);
    }
    return onChange;
  }, [onChange, debounceDelay])

  // Trigger the (debounced or normal) onChange handler
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (debouncedOnChange) {
      debouncedOnChange(e);
    }
  }

  return (
    <div className={`${className}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <div className="input-wrapper">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={handleChange} // Use the debounced handler
          onBlur={onBlur}
          required={required}
          disabled={isLoading || disabled} // Disable input when isLoading is true
          className={`${inputClass} ${error ? 'input-error' : ''}`}
        />
        {isLoading && (
          <span className="input-loading-spinner">Loading...</span>
        )}
      </div>
      {error && <span className="input-error-message">{error}</span>}
    </div>
  )
}

export default InputComponent;
