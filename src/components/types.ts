import {ChangeEvent, ReactElement} from "react";


export interface SelectableListProps {
  label: string;
  id: string;
  options: string[];
  value: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface PreferenceTypesProps {
  AUTHORS: string,
  CATEGORIES: string,
  SOURCES: string
}

export interface InputComponentProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void; // Ensure React's expected type
  debounceDelay?: number; // Optional debounce delay
  label?: ReactElement;
  name?: string;
  type?: 'text' | 'number' | 'email' | 'password' | 'tel';
  value?: string;
  placeholder?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  inputClass?: string;
  isLoading?: boolean;
}

export interface CardProps {
  title: React.ReactNode;
  description?: string;
  imageUrl?: string;
  footer?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}
