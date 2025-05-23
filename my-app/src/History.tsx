import React from 'react';

interface HistoryProps {
  items: string[];
  theme: 'light' | 'dark';
  onSelect: (item: string) => void;
  onClose: () => void;
}

function History({ items, theme, onSelect, onClose }: HistoryProps) {
  return (
    <div style={{
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      backgroundColor: theme === 'light' ? '#fff' : '#444',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
      zIndex: 10,
      maxHeight: '400px',
      overflowY: 'auto'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px'
      }}>
        <h3 style={{
          color: theme === 'light' ? '#333' : '#fff',
          margin: 0
        }}>
          История вычислений
        </h3>
        <button 
          onClick={onClose}
          style={{
            padding: '5px 10px',
            backgroundColor: theme === 'light' ? '#e0e0e0' : '#555',
            color: theme === 'light' ? '#333' : '#f5f5f5',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          ×
        </button>
      </div>
      
      {items.length === 0 ? (
        <div style={{
          color: theme === 'light' ? '#666' : '#aaa',
          textAlign: 'center',
          padding: '20px'
        }}>
          История пуста
        </div>
      ) : (
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0
        }}>
          {items.map((item, index) => (
            <li 
              key={index}
              onClick={() => onSelect(item)}
              style={{
                padding: '10px',
                borderBottom: `1px solid ${theme === 'light' ? '#eee' : '#555'}`,
                color: theme === 'light' ? '#333' : '#fff',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                ':hover': {
                  backgroundColor: theme === 'light' ? '#f0f0f0' : '#555'
                }
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default History;