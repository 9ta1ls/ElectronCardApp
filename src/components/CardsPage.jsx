import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CardTable from './CardTable'; // Створіть цей компонент подібно до DeckTable
import '../styles/cardsPage.css';

function CardsPage() {
  const deckId = useParams().deckId;
  const [cards, setCards] = useState([]);
  const [deckName, setDeckName] = useState('');
  const [cardAnswer, setCardAnswer] = useState('');
  const [cardQuestion, setCardQuestion] = useState('');

  const fetchCards = async () => {
    try {
      const response = await fetch(`/server/cards/${deckId}`);
      const data = await response.json();
      setCards(data.cards);
      setDeckName(data.name);
      console.log('Fetched cards:', data.cards); 
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

  return (
    <div className="cards-page">
      <Link to="/decks">
        <button className="back-button">Back</button>
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

        <CardTable cards={cards} /> {/* Таблиця карток */}
      </div>
    </div>
  );
}

export default CardsPage;
