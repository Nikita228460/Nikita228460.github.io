import React from 'react';

interface HistoryProps {
  items: string[];
  theme: 'light' | 'dark';
}

function History({ items, theme }: HistoryProps) {
  return (
    <div style={{
      width: '250px',
      backgroundColor: theme === 'light' ? '#fff' : '#444',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
      height: '462px',
      overflowY: 'auto'
    }}>
      <h3 style={{
        color: theme === 'light' ? '#333' : '#fff',
        marginTop: 0,
        marginBottom: '15px',
        textAlign: 'center'
      }}>
        История вычислений
      </h3>
      
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
              style={{
                padding: '8px 0',
                borderBottom: `1px solid ${theme === 'light' ? '#eee' : '#555'}`,
                color: theme === 'light' ? '#333' : '#fff',
                wordBreak: 'break-all'
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