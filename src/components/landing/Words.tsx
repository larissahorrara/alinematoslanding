import React from 'react';

/** Divide um texto em palavras (spans) para revelações palavra por palavra. */
export const Words: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  const parts = text.split(' ');
  return (
    <>
      {parts.map((word, i) => (
        <React.Fragment key={`${word}-${i}`}>
          <span className={`word ${className}`}>{word}</span>
          {i < parts.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </>
  );
};
