import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DecksPage from './components/DecksPage';
import CardsPage from './components/CardsPage';
import StudyPage from './components/StudyPage';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticated');
    console.log('Authenticated:', isAuthenticated); // Додайте лог
    
    setAuthenticated(isAuthenticated === 'true');
    
  }, []);
  

  return (
    <HashRouter>
      <Routes>
        {!authenticated ? (
          <>
            <Route path="/login" element={<LoginPage setAuthenticated={setAuthenticated} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/register" replace />} /> {/* Усе інше перенаправляє на реєстрацію */}
          </>
        ) : (
          <>
            <Route path="/decks" element={<DecksPage setAuthenticated={setAuthenticated} />} />
            <Route path="/cards/:deckId" element={<CardsPage setAuthenticated={setAuthenticated} />} />
            <Route path="/study/:deckId" element={<StudyPage />} />
            <Route path="*" element={<Navigate to="/decks" replace />} /> {/* Усе інше перенаправляє на decks */}
          </>
        )}
      </Routes>
    </HashRouter>
  );
}

export default App;
