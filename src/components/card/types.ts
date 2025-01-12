import {ReactElement} from "react";

export interface CardProps {
  title: ReactElement;
  description?: string;
  imageUrl?: string;
  footer?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  fullLink?: string;
}
