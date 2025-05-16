import React from 'react';

interface ButtonProps {
  text: string;
  onClick: (value: string) => void;
  theme: 'light' | 'dark';
  wide?: boolean;
}

function Button({ text, onClick, theme, wide = false }: ButtonProps) {
  return (
    <button
      onClick={() => onClick(text)}
      style={{
        padding: '16px 0',
        fontSize: '18px',
        fontWeight: '500',
        backgroundColor: theme === 'light' ? '#e0e0e0' : '#555',
        color: theme === 'light' ? '#333' : '#f5f5f5',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        gridColumn: wide ? 'span 2' : 'span 1'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = theme === 'light' ? '#d0d0d0' : '#666';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = theme === 'light' ? '#e0e0e0' : '#555';
      }}
    >
      {text}
    </button>
  );
}

export default Button;