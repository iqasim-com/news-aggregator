import React from 'react';
import {CardProps} from "./types.ts";
import "./card-styles.css";

const CardComponent: React.FC<CardProps> = (
  {
    title,
    description,
    imageUrl,
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
      </div>
    </div>
  );
};

export default CardComponent;
