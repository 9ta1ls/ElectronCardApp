// CardTable.jsx
import React from 'react';
import '../styles/cardTable.css';
import '../styles/icons.css';

function CardTable({ cards, openModal }) {


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
              <span className="delete-text"   onClick={() => openModal(card._id)}>
                  Delete
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CardTable;
