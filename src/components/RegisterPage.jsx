import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/authPages.css';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const register = async () => {
    const data = { username, password };

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        navigate('/login');
      } else {
        setError('User with this username already exists');
        setUsername('');
        setPassword('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='auth-form-container'>
      <form >
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
        <button type="button" onClick={register}>Register</button>
        <p>
          <Link to="/login" className="link-text">Already have an account?</Link>
        </p>
      </form>
     
    </div>
  );
}

export default RegisterPage;
