import { useState } from 'react';
import { Link } from 'react-router-dom';

function LoginPage({ setAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const login = async () => {
    const data = { username, password };

    try {
      const response = await fetch('server/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("settingAuth");
        await setAuthenticated(true);
        localStorage.setItem('authenticated', 'true');
        window.location.href = '/decks';
      } else {
        setError("Неправильний логін або пароль");
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
        <button type="button" onClick={login}>Увійти</button>

        <p>Ще не маєте аккаунту?</p>
        <Link to="/register">
          <button type="button">Перейти на сторінку реєстрації</button>
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
