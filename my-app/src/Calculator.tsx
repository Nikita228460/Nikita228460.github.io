import { useState, useEffect } from 'react';
import Button from './Button.tsx';
import Input from './Input.tsx';
import History from './History.tsx';

function Calculator() {
  const [input, setInput] = useState('0');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [history, setHistory] = useState<string[]>([]);

  const handleClick = (value: string) => {
    if (value === 'C') {
      setInput('0');
    } else if (value === '⌫') {
      setInput((prev) => prev.length > 1 ? prev.slice(0, -1) : '0');
    } else if (value === '=') {
      try {
        const result = eval(input);
        const calculation = `${input} = ${result}`;
        setHistory(prev => [calculation, ...prev]);
        setInput(result.toString());
      } catch {
        setInput('Ошибка');
      }
    } else {
      setInput((prev) =>
        prev === '0' || prev === 'Ошибка' ? value : prev + value
      );
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      
      const allowedKeys = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        '+', '-', '*', '/', '.', 
        'Enter', 'Backspace', 'Escape', 'Delete'
      ];
      
      if (!allowedKeys.includes(key)) return;
      
      e.preventDefault();
      
      if (key === 'Enter') {
        handleClick('=');
      } else if (key === 'Backspace' || key === 'Delete') {
        handleClick('⌫');
      } else if (key === 'Escape') {
        handleClick('C');
      } else {
        handleClick(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [input]);

  return (
    <div style={{
      backgroundColor: theme === 'light' ? '#f5f5f5' : '#333',
      minHeight: '100vh',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        display: 'flex',
        gap: '20px',
        alignItems: 'flex-start'
      }}>
        <div style={{
          width: '320px',
          backgroundColor: theme === 'light' ? '#fff' : '#444',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 6px 12px rgba(0,0,0,0.15)'
        }}>
          <button 
            onClick={toggleTheme}
            style={{
              marginBottom: '20px',
              padding: '10px 20px',
              backgroundColor: theme === 'light' ? '#e0e0e0' : '#555',
              color: theme === 'light' ? '#333' : '#f5f5f5',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '16px',
              width: '100%'
            }}
          >
            {theme === 'light' ? 'Темная тема' : 'Светлая тема'}
          </button>
          
          <Input value={input} theme={theme} />
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '10px',
            marginTop: '20px'
          }}>
            <Button text="7" onClick={handleClick} theme={theme} />
            <Button text="8" onClick={handleClick} theme={theme} />
            <Button text="9" onClick={handleClick} theme={theme} />
            <Button text="/" onClick={handleClick} theme={theme} />
            
            <Button text="4" onClick={handleClick} theme={theme} />
            <Button text="5" onClick={handleClick} theme={theme} />
            <Button text="6" onClick={handleClick} theme={theme} />
            <Button text="*" onClick={handleClick} theme={theme} />
            
            <Button text="1" onClick={handleClick} theme={theme} />
            <Button text="2" onClick={handleClick} theme={theme} />
            <Button text="3" onClick={handleClick} theme={theme} />
            <Button text="-" onClick={handleClick} theme={theme} />
            
            <Button text="0" onClick={handleClick} theme={theme} />
            <Button text="." onClick={handleClick} theme={theme} />
            <Button text="⌫" onClick={handleClick} theme={theme} />
            <Button text="+" onClick={handleClick} theme={theme} />
            
            <Button text="C" onClick={handleClick} theme={theme} wide />
            <Button text="=" onClick={handleClick} theme={theme} wide />
          </div>
        </div>

        <History items={history} theme={theme} />
      </div>
    </div>
  );
}

export default Calculator;