import { useState } from 'react';
import { Link } from 'react-router-dom';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const register = async () => {
    const data = { username, password };

    try {
      const response = await fetch('server/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        window.location.href = '/login';
      } else {
        setError("Користувач з таким ім'ям вже існує");
        setUsername('');
        setPassword('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form>
        <label>Логін:</label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />

        <label>Пароль:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        
        {error && <h4 style={{ color: '#cf1212' }}>{error}</h4>}
        <button type="button" onClick={register}>Зареєструватися</button>
      </form>

      <p>Вже маєте аккаунт?</p>
      <Link to="/login">
        <button type="button">Перейти на сторінку логіну</button>
      </Link>
    </div>
  );
}

export default RegisterPage;
