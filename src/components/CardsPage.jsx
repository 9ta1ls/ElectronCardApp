import { useState, useEffect } from 'react';

function CardsPage({ deckId }) {
  const [cards, setCards] = useState([]);
  const [deckName, setDeckName] = useState('');

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(`/api/cards/${deckId}`);
        const data = await response.json();
        setCards(data.cards);
        setDeckName(data.name);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCards();
  }, [deckId]);

  return (
    <div>
      <a href="/decks">Назад</a>
      <h1>Колода {deckName}</h1>

      {cards.length > 0 && <button>Вивчати</button>}

      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Питання</th>
            <th>Відповідь</th>
            <th>Операції</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card, index) => (
            <tr key={card._id}>
              <td>{index + 1}</td>
              <td>{card.question}</td>
              <td>{card.answer}</td>
              <td>
                <button>Видалити</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form>
        <input type="text" placeholder="Введіть питання" required />
        <input type="text" placeholder="Введіть відповідь" required />
        <button type="submit">Додати картку</button>
      </form>
    </div>
  );
}

export default CardsPage;
