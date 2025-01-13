export interface CardProps {
  title: React.ReactNode;
  description?: string;
  imageUrl?: string;
  footer?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}
