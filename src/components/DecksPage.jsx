import React, { useState, useEffect } from 'react';
import DeckTable from './DeckTable';
import Modal from './Modal';
import '../styles/decksPage.css';
import useModal from './useModal'; 

function DecksPage({ setAuthenticated }) {
  const [decks, setDecks] = useState([]);
  const [deckName, setDeckName] = useState(''); 
  const { isModalOpen, selectedId, openModal, closeModal } = useModal();

  const fetchDecks = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/decks`);
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
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/decks`, {
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


  const handleDelete = async () => {
    const deckId = selectedId;
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/decks/${deckId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
    
      if (response.ok) {
        closeModal();
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
            openModal={openModal}
          />
      </div>
  </div>

  );
}

export default DecksPage;
