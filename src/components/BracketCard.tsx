import { ReactNode } from 'react';

interface BracketCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function BracketCard({ children, className = '', hover = true }: BracketCardProps) {
  return (
    <div
      className={`bracket-card group relative overflow-hidden rounded-2xl bg-[var(--gray-50)] p-4 ${
        hover ? 'cursor-pointer transition-all duration-500 hover:shadow-[0_12px_37px_var(--shadow-sm)]' : ''
      } ${className}`}
    >
      {/* Bracket corners */}
      <div className="bracket-bl" />
      <div className="bracket-br" />
      {children}
    </div>
  );
}
