import React from 'react';
import { Link } from 'react-router-dom';
import deleteIcon from '../icons/bin.png';
import '../styles/deckTable.css';
import '../styles/icons.css';

function DeckTable({ decks, setSelectedDeckId, setIsModalOpen }) {
  const handleDeleteClick = (id) => {
    setSelectedDeckId(id);
    setIsModalOpen(true);
  };

  return (
    <table className="deck-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Number of cards</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {decks.map((deck) => (
          <tr key={deck._id}>
            <td><Link to={`/cards/${deck._id}`}>{deck.name}</Link></td>
            <td>{deck.cards.length || 0}</td>
            <td>
              <span className="delete-text"  onClick={() => handleDelete(deck._id)}>
                Delete
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DeckTable;
