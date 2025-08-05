
import React from 'react';

interface CardProps {
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
}

const Card: React.FC<CardProps> = ({ title, description, children, className = '', titleClassName = 'text-lg' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md p-4 sm:p-6 h-full ${className}`}>
      <h3 className={`font-semibold text-gray-800 ${description ? 'mb-1' : 'mb-4'} ${titleClassName}`}>{title}</h3>
      {description && <div className="text-sm text-gray-500 mb-4">{description}</div>}
      {children}
    </div>
  );
};

export default Card;