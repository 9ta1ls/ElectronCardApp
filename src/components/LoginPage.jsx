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
        console.log('settingAuth');
        await setAuthenticated(true);
        localStorage.setItem('authenticated', 'true');
        window.location.href = '/decks';
      } else {
        setError('Incorrect username or password');
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
        <label>Username:</label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />

        <label>Password:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />

        {error && <h4 style={{ color: '#cf1212' }}>{error}</h4>}
        <button type="button" onClick={login}>Log In</button>

        <p>Don't have an account yet?</p>
        <Link to="/register">
          <button type="button">Go to Registration Page</button>
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
