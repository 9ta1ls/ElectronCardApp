import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CardTable from './CardTable'; 
import '../styles/cardsPage.css';
import backIcon from '../icons/back.png';
import useModal from './useModal';
import Modal from './Modal';

function CardsPage() {
  const deckId = useParams().deckId;
  const [cards, setCards] = useState([]);
  const [deckName, setDeckName] = useState('');
  const [cardAnswer, setCardAnswer] = useState('');
  const [cardQuestion, setCardQuestion] = useState('');
  const { isModalOpen, selectedId, openModal, closeModal } = useModal();

  const fetchCards = async () => {
    try {
      
      const response = await fetch(`/server/cards/${deckId}`);
      const data = await response.json();
      setCards(data.cards);
      setDeckName(data.name);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCards(); 
  }, []); 

  const handleSubmit = async (e) => { 
    try {
      e.preventDefault(); 
      const response = await fetch(`/server/cards/${deckId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: cardQuestion, answer: cardAnswer }),
      });
  
      if (response.ok) {
        await fetchCards(); 
        console.log('Card added');
      } else {
        console.error('Failed to add card');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setCardAnswer(''); 
    setCardQuestion(''); 
  };

  const handleDelete = async () => {
    const cardId = selectedId;
    try {
      const response = await fetch(`/server/cards/${deckId}/${cardId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
    
      if (response.ok) {
        closeModal();
        fetchCards();
        console.log('Card deleted');
      } else {
        console.error('Failed to delete card');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="cards-page">

     {isModalOpen && <Modal handleDelete={handleDelete} closeModal={closeModal} />}


      <Link to="/decks">
        <img
            className="back-button"
            src={backIcon}
            alt="Back"
        />
      </Link>
      <h1>Deck {deckName}</h1>

      <div className="content-container"> {/* Основний контейнер */}
        <div className="form-container"> {/* Контейнер для форми введення */}
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Enter question" 
              value={cardQuestion} 
              onChange={(e) => setCardQuestion(e.target.value)} 
              required 
              className="input-field"
            />
            <input 
              type="text" 
              placeholder="Enter answer" 
              value={cardAnswer} 
              onChange={(e) => setCardAnswer(e.target.value)} 
              required 
              className="input-field"
            />
            <button type="submit" className="add-card-button">Add card</button>
          </form>
        </div>
          {cards.length > 0 && (
            <Link to={`/study/${deckId}`}>
            <button className="add-card-button">Study</button>
          </Link>
          )}
        <CardTable 
          cards={cards} 
          openModal={openModal}
        />
      </div>
    </div>
  );
}

export default CardsPage;
