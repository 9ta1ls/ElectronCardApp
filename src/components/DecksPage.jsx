import React, { useState, useEffect } from 'react';
import DeckTable from './DeckTable';
import Modal from './Modal';
import '../styles/decksPage.css';

function DecksPage({ setAuthenticated }) {
  const [decks, setDecks] = useState([]);
  const [deckName, setDeckName] = useState(''); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeckId, setSelectedDeckId] = useState(null);

  const fetchDecks = async () => {
    try {
      setSelectedDeckId(null);
      setIsModalOpen(false);
      const response = await fetch('server/decks');
      const data = await response.json();
      setDecks(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDecks();
  }, []);

  const logout = async () => {
    await setAuthenticated(false);
    localStorage.removeItem('authenticated');
    document.cookie = 'access-token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'; 
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    try {
      const response = await fetch('server/decks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deckname: deckName }),
      });
    
      if (response.ok) {
        await fetchDecks();
        console.log('Deck added');
      } else {
        console.error('Failed to add deck');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setDeckName('');
  };

  const showModalWindow = (id) => {
    setSelectedDeckId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const handleDelete = async () => {
    const deckId = selectedDeckId;
    try {
      const response = await fetch(`server/decks/${deckId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
    
      if (response.ok) {
        fetchDecks();
        console.log('Deck deleted');
      } else {
        console.error('Failed to delete deck');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="decks-page">
      <h1>My Decks</h1>
      <button id="logoutButton" onClick={logout}>Log out</button>

      {isModalOpen && <Modal handleDelete={handleDelete} closeModal={closeModal} />}

      <div className="content-container">
        <form onSubmit={handleSubmit} className="deck-form">
          <input 
            type="text" 
            placeholder="Enter deck name" 
            value={deckName} 
            onChange={(e) => setDeckName(e.target.value)} 
            required 
          />
          <button type="submit">Add Deck</button>
        </form>

        <DeckTable
            decks={decks}
            setSelectedDeckId={setSelectedDeckId}
            setIsModalOpen={setIsModalOpen}
          />
      </div>
  </div>

  );
}

export default DecksPage;
