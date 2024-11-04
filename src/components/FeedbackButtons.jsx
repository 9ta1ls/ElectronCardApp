import React from 'react';
import '../styles/feedbackButtons.css';

function FeedbackButtons({ handleBadFeedback, handleGoodFeedback, handleAwesomeFeedback }) {
  return (
    <div className="feedback-buttons">
      <button onClick={handleBadFeedback} className="feedback-button bad">Bad</button>
      <button onClick={handleGoodFeedback} className="feedback-button good">Good</button>
      <button onClick={handleAwesomeFeedback} className="feedback-button awesome">Awesome</button>
    </div>
  );
}

export default FeedbackButtons;
