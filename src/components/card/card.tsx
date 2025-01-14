import React from 'react';
import {CardProps} from "./types.ts";

const CardComponent: React.FC<CardProps> = (
  {
    title,
    description,
    imageUrl,
    footer,
    onClick,
    className = '',
  }: CardProps) => {
  return (
    <div
      className={`card-component ${className}`}
      onClick={onClick}
      style={{cursor: onClick ? 'pointer' : 'default'}}
    >
      {imageUrl && (
        <div className="card-image" style={{backgroundImage: `url(${imageUrl})`}}></div>
      )}
      <div className="card-content">
        {title}
        {description && <p className="card-description">{description}</p>}
        {footer && <div className="card-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default CardComponent;
