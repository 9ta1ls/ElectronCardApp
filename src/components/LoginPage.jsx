import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/authPages.css';

function LoginPage({ setAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const login = async () => {
    const data = { username, password };

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('settingAuth');
        await setAuthenticated(true);
        localStorage.setItem('authenticated', 'true');
        navigate('/decks');
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
    <div className='auth-form-container'>
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

        {error && <p style={{ color: '#cf1212' }}>{error}</p>}
        <button type="button" onClick={login}>Log In</button>

        <p>
          <Link to="/register" className="link-text">Don't have an account yet?</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
