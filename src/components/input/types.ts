import {ReactElement} from "react";

export interface InputComponentProps {
  label?: ReactElement;
  name: string;
  type?: 'text' | 'number' | 'email' | 'password' | 'tel';
  value?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  debounceDelay?: number;
  inputClass?: string;
  isLoading?: boolean;
}