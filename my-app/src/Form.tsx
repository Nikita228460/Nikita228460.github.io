import React, { useState } from 'react';

function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email некорректен';
    } else if (email !== 'test@test.com') {
      newErrors.email = 'Пользователь не найден';
    }
    
    if (!password) {
      newErrors.password = 'Пароль обязателен';
    } else if (password !== 'test') {
      newErrors.password = 'Неверный пароль';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h2>Вход выполнен успешно!</h2>
        <p>Добро пожаловать, {email}!</p>
        <button onClick={resetForm}>Выйти</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Вход</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
          {errors.email && <div style={{ color: 'red', fontSize: '14px' }}>{errors.email}</div>}
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
          {errors.password && <div style={{ color: 'red', fontSize: '14px' }}>{errors.password}</div>}
        </div>
        
        <button 
          type="submit" 
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Войти
        </button>
      </form>
      
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button 
          onClick={() => console.log('Переход к регистрации')}
          style={{
            background: 'none',
            border: 'none',
            color: '#2196F3',
            cursor: 'pointer',
            textDecoration: 'underline',
            marginRight: '15px'
          }}
        >
          Зарегистрироваться
        </button>
        
        <button 
          onClick={() => console.log('Переход к восстановлению пароля')}
          style={{
            background: 'none',
            border: 'none',
            color: '#2196F3',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          Забыли пароль?
        </button>
      </div>
    </div>
  );
}

export default Form;