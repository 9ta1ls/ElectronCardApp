// StudyCard.jsx
import React from 'react';
import '../styles/studyCard.css';

function StudyCard({ question, answer, isFlipped, onFlip, noAnimation }) {
  return (
    <div className="flip-card-container">
      <div
        className={`flip-card ${isFlipped ? 'flipped' : ''} ${noAnimation ? 'no-animation' : ''}`}
        onClick={onFlip}
      >
        <div className="flip-card-front">
          <div className="flip-card-content">
            <p>{question}</p>
          </div>
        </div>
        <div className="flip-card-back">
          <div className="flip-card-content">
            <p>{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudyCard;
