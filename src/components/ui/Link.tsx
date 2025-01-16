import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export function Link({ children, className = '', ...props }: LinkProps) {
  return (
    <RouterLink
      to={props.href}
      {...props} 
      className={`text-sm font-medium ${className}`}
    >
      {children}
    </RouterLink>
  );
}