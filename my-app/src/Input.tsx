import React from 'react';

interface InputProps {
  value: string;
  theme: 'light' | 'dark';
}

function Input({ value, theme }: InputProps) {
  return (
    <div style={{
      width: '90%',
      padding: '20px 15px',
      backgroundColor: theme === 'light' ? '#f8f8f8' : '#3a3a3a',
      color: theme === 'light' ? '#333' : '#fff',
      textAlign: 'right',
      fontSize: '28px',
      fontWeight: '500',
      border: theme === 'light' ? '1px solid #e0e0e0' : '1px solid #555',
      borderRadius: '8px',
      marginBottom: '10px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      transition: 'all 0.3s ease'
    }}>
      {value}
    </div>
  );
}

export default Input;