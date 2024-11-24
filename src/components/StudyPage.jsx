import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import StudyCard from "./StudyCard";
import FeedbackButtons from "./FeedbackButtons";
import '../styles/studyPage.css';
import backIcon from '../assets/icons/back.png';

function StudyPage() {
  const deckId = useParams().deckId;
  const [cards, setCards] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [noAnimation, setNoAnimation] = useState(false);
  const [loading, setLoading] = useState(true); // новий стан для контролю завантаження

  const fetchCards = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/cards/${deckId}`);
      const data = await response.json();
      setCards(data.cards);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const resetFlip = () => {
    setNoAnimation(true);
    setIsFlipped(false);
    setTimeout(() => setNoAnimation(false), 0);
  };

  const handleBadFeedback = () => {
    setCards((prevCards) => {
      if (prevCards.length > 2) {
        const updatedCards = [...prevCards];
        const [currentCard] = updatedCards.splice(0, 1);
        updatedCards.splice(2, 0, currentCard);
        resetFlip();
        return updatedCards;
      }
      return prevCards;
    });
  };

  const handleGoodFeedback = () => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards];
      const [currentCard] = updatedCards.splice(0, 1);
      updatedCards.push(currentCard);
      resetFlip();
      return updatedCards;
    });
  };

  const handleAwesomeFeedback = () => {
    setCards((prevCards) => {
      const updatedCards = prevCards.slice(1);
      resetFlip();
      return updatedCards;
    });
  };

  return (
    <div className="study-page">
      <Link to={`/cards/${deckId}`} className="back-link">
        <img src={backIcon} alt="Back" className="back-button" />
      </Link>
      <div className="study-container">
        {loading ? ( 
          <p>Завантаження карток...</p>
        ) : cards.length > 0 ? (
          <StudyCard
            key={cards[0].id}
            question={cards[0].question}
            answer={cards[0].answer}
            isFlipped={isFlipped}
            noAnimation={noAnimation}
            onFlip={() => setIsFlipped((prev) => !prev)}
          />
        ) : (
          <p>Вивчення завершене</p> // показуємо це тільки після завантаження
        )}
        {cards.length > 0 &&(
          <FeedbackButtons 
            handleBadFeedback={handleBadFeedback}
            handleGoodFeedback={handleGoodFeedback}
            handleAwesomeFeedback={handleAwesomeFeedback} 
         />
        )}

      </div>
    </div>
  );
}

export default StudyPage;
