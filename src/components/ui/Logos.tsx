import React from 'react';

export const LOGO_URL = 'https://coldicp.com/wp-content/uploads/2024/06/ColdICP-Main-Logo.svg';
export const FAVICON_URL = 'https://coldicp.com/wp-content/uploads/2024/06/cropped-ColdICP-Favicon-32x32.png';

interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <img 
      src={LOGO_URL} 
      alt="COLDICP" 
      className={`h-8 w-auto ${className}`}
    />
  );
}

export function Favicon({ className = '' }: LogoProps) {
  return (
    <img 
      src={FAVICON_URL} 
      alt="COLDICP" 
      className={`w-8 h-8 ${className}`}
    />
  );
}