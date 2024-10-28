import React from 'react';
import CardItem from './CardItem';


const CardList = ({ cards, index, handleDelete }) => {
  return (
    <div className="card-list">
      {cards.map((card, index) => (
        <CardItem 
          key={card._id} 
          card={card} 
          index={index} 
          handleDelete={handleDelete} 
        />
      ))}
    </div>
  );
}

export default CardList;
