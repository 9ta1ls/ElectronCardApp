import { useState , useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DecksPage from './components/DecksPage';
import CardsPage from './components/CardsPage';
import StudyPage from './components/StudyPage';

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
          <Route path="/login" element={<LoginPage setAuthenticated={setAuthenticated} />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Якщо користувач намагається зайти на будь-який інший шлях */}
          <Route path="*" element={<Navigate to="/register" replace />} />
        </>
      ) : (
        <>
          <Route path="/decks" element={<DecksPage setAuthenticated={setAuthenticated} />} />
          <Route path="/cards/:deckId" element={<CardsPage setAuthenticated={setAuthenticated} />} />
          <Route path="/study/:deckId" element={<StudyPage/>}/>
          {/* Перенаправлення на /decks, якщо користувач намагається зайти на невизначений шлях */}
          <Route path="*" element={<Navigate to="/decks" replace />} />
        </>
      )}
    </Routes>
  </Router>

  );
}

export default App;
