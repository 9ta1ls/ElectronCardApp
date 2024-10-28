// CardTable.jsx
import React from 'react';
import deleteIcon from '../icons/bin.png';
import '../styles/cardTable.css';
import '../styles/icons.css';

function CardTable({ cards, handleDelete }) {
  return (
    <table className="card-table">
      <thead>
        <tr></tr>
      </thead>
      <tbody>
        {cards.map((card) => (
          <tr key={card._id}>
            <td>
              <div className="cardValues">
                <div className="question">{card.question}</div>
                <div className="answer">{card.answer}</div>
              </div>
            </td>
            <td>
              <img
                className="icon-button"
                src={deleteIcon}
                alt="Delete"
                onClick={() => handleDelete(card._id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CardTable;
