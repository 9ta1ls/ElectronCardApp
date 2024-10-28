import { Link } from 'react-router-dom';
import deleteIcon from '../icons/bin.png';
import '../styles/cardItem.css';

function CardItem({ card, index, handleDelete }) {
  return (
    <div className="card-item">
      <p>Question: {card.question}</p>
      <p>Answer: {card.answer}</p>
      <div className="card-actions">
        <img 
          className='icon-button' 
          src={deleteIcon} 
          alt="Delete" 
          onClick={() => handleDelete(card._id)} 
        />
      </div>
    </div>
  );
}

export default CardItem;
