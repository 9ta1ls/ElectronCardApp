import { useState , useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DecksPage from './components/DecksPage';

function App() {

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticated');
    setAuthenticated(isAuthenticated === 'true');
  }, []);

  return (
    <Router>
      <Routes>
        {/* Якщо користувач не аутентифікований */}
        {!authenticated ? (
          <>
            {/* Перенаправлення на логін або реєстрацію */}
            <Route path="/login" element={<LoginPage setAuthenticated={setAuthenticated} />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Якщо користувач намагається зайти на будь-який інший шлях */}
            <Route path="*" element={<Navigate to="/register" replace />} />
          </>
        ) : (
          <>
            {/* Якщо користувач аутентифікований */}
            <Route path="/decks" element={<DecksPage  setAuthenticated={setAuthenticated} />} />
            
            {/* Перенаправлення на колоди, якщо користувач намагається зайти на логін */}
            <Route path="*" element={<Navigate to="/decks" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
